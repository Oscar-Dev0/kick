import { EventEmitter } from "events";
import { Channels, Chatrooms, Message } from "../../";
import { Logger } from 'tslog';
import { WebSocketGateway, RESTClient } from "../";

/**
 * Interfaz extendida para los eventos personalizados del cliente.
 */
export declare interface Client {
    on(event: 'messageCreate', listener: (message: Message) => void): this;
    on(event: "ready", listener: (client: this) => void): this;
    on(event: string, listener: Function): this;
}

/**
 * Opciones de configuración para el cliente.
 */
interface ClientOptions {
    /** URI del WebSocket opcional */
    wsURI?: string;
    /** Token XSRF para la autenticación */
    xsrfToken: string;
    /** Valor de la cookie para la autenticación */
    cookie: string;
}

/**
 * Clase que representa al cliente de la aplicación.
 */
export class Client extends EventEmitter {
    ws: WebSocketGateway; /** Instancia de la clase Gateway para manejar el WebSocket */
    token: string; /** Token de autenticación del cliente */
    rest: RESTClient; /** Instancia de la clase RESTClient para manejar las solicitudes HTTP */
    startTime: number; /** Marca de tiempo de inicio del cliente */
    channels: Channels; /** Instancia del administrador de canales */
    chatrooms: Chatrooms; /** Instancia del administrador de salas de chat */
    logger: Logger<any>; /** Instancia del logger para registros */

    /**
     * Constructor de la clase Client.
     * @param options - Opciones de configuración para el cliente.
     */
    constructor(options: ClientOptions) {
        super();

        this.logger = new Logger({});

        this.token = "";
        this.ws = new WebSocketGateway(options.wsURI || "");
        this.rest = new RESTClient(options.xsrfToken, options.cookie);
        this.startTime = Date.now();

        // Managers
        this.channels = new Channels(this);
        this.chatrooms = new Chatrooms(this);

        // Eventos
        this.ws.on("ready", () => this.emit("ready", this));

        // TODO: Limpieza
        this.ws.on("messageCreate", (d: any) => {
            // También podemos considerar cachear al usuario
            console.log(d);
            this.emit("messageCreate", this.chatrooms.get(d.message.chatroom_id).messages.add(d.message));
        });
    }

    /**
     * Inicia sesión en el cliente con el token proporcionado.
     * @param token - Token de autenticación.
     */
    login(token: string) {
        this.token = token;
        this.rest.setToken(this.token);
        this.ws.connect(this.token);
    }
}

export default Client; /** Exporta la clase Client */
