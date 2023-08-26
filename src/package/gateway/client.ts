import { WebSocket } from "ws";
import { EventEmitter } from 'events';
import { Logger } from 'tslog';

/** Enumeración para los estados de la conexión */
enum ConnectionState {
    /** Desconectado */
    Disconnected,
    /** Conectando */
    Connecting,
    /** Conectado */
    Connected,
}

/** Interfaz para los datos de un mensaje */
interface MessageData {
    event: string;
    data: any;
}

/** Interfaz para las opciones de conexión */
interface ConnectionOptions {
    version: string;
    protocol: string;
    flash: boolean;
}

/** Interfaz para los eventos de Pusher */
interface PusherEvent {
    event: string;
    data: any;
}

/** Clase que maneja la conexión con WebSocket */
export class WebSocketGateway extends EventEmitter {
    private connectionState: ConnectionState = ConnectionState.Disconnected;
    private websocket?: WebSocket;
    private connectionOptions: ConnectionOptions;
    private ping: number = 0;
    private heartbeatTimeout: number = 0;
    private lastHeartbeatSent: number = Date.now();
    private authToken: string;
    private websocketURI: string;
    private logger: Logger<any>;
    private heartbeatInterval?: NodeJS.Timeout; /** Timer para el envío periódico de latidos */

    /**
     * Constructor de la clase WebSocketGateway
     * @param authToken - Token de autenticación para la conexión
     * @param websocketURI - URI del WebSocket
     */
    constructor(
        authToken: string,
        websocketURI: string = "wss://ws-us2.pusher.com/app/eb1d5f283081a78b932c"
    ) {
        super();
        this.authToken = authToken;
        this.websocketURI = websocketURI;
        this.logger = new Logger({ type: "pretty", prefix: ["[WS MANAGER]"] });

        this.connectionOptions = {
            version: "7.4.0",
            protocol: "7",
            flash: false,
        };

        this.initializeWebSocket();
    }

    /** Inicializa la conexión WebSocket */
    private initializeWebSocket() {
        this.websocket = new WebSocket(`${this.websocketURI}?${new URLSearchParams(this.connectionOptions as any).toString()}`);
        
        this.websocket.on("open", this.onWebSocketOpen.bind(this));
        this.websocket.on("message", this.onWebSocketMessage.bind(this));
        this.websocket.on("close", this.onWebSocketClose.bind(this));
    }

    /** Envía un mensaje al servidor */
    private sendMessage(payload: MessageData) {
        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(JSON.stringify(payload));
        } else {
            throw new Error("WebSocket is not open!");
        }
    }

    /** Inicia el envío periódico de latidos */
    private startHeartbeat() {
        this.heartbeatTimeout = this.heartbeatTimeout || 30000; /** Valor por defecto de 30 segundos */
        
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
        }

        this.heartbeatInterval = setInterval(() => {
            if (this.connectionState === ConnectionState.Disconnected) {
                clearInterval(this.heartbeatInterval!);
                return;
            }

            this.sendMessage({ event: "ping", data: {} });
            this.lastHeartbeatSent = Date.now();

            this.logger.debug(`Sending heartbeat`);
        }, this.heartbeatTimeout);
    }

    /** Manejador para cuando la conexión se abre */
    private onWebSocketOpen() {
        this.logger.debug("Connected!");
        this.connectionState = ConnectionState.Connected;
    }

    /** Manejador para cuando se recibe un mensaje */
    private onWebSocketMessage(message: string) {
        const eventData: PusherEvent = JSON.parse(message);

        if (eventData.data && typeof eventData.data === "string") {
            try {
                eventData.data = JSON.parse(eventData.data);
            } catch (error) {
                /** Ignora errores de análisis, deja los datos como están */
            }
        }

        this.logger.info(`Received event: ${eventData.event}`);

        switch (eventData.event) {
            case "connected":
                this.heartbeatTimeout = eventData.data.activity_timeout * 1000;
                this.startHeartbeat();
                this.emit("ready", this);
                break;
            case "pong":
                this.ping = Date.now() - this.lastHeartbeatSent;
                this.logger.debug(`Heartbeat received | PING: ${this.ping}`);
                this.emit("pong", this);
                break;
            case "message_sent":
                this.emit("messageCreate", eventData.data);
                break;
            default:
                this.logger.info(`Event ${eventData.event} has no handler!`);
        }
    }

    /** Manejador para cuando la conexión se cierra */
    private onWebSocketClose() {
        this.logger.debug("Connection closed :(");
        this.connectionState = ConnectionState.Disconnected;
    }

    /**
     * Método público para conectar
     * @param authToken - Token de autenticación para la conexión
     */
    public connect(authToken: string) {
        this.authToken = authToken;
        this.connectionState = ConnectionState.Connecting;
        this.initializeWebSocket();
    };

    public send(data : string){this.websocket.send(data)};
}
