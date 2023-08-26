/**
 * Códigos de operación del servidor.
 */
export const SERVER_OP_CODES = {
    // Eventos de Pusher
    CONNECTED: "pusher:connection_established",
    PONG: "pusher:pong",
    // Eventos personalizados
    MESSAGE_SENT: "App\\Events\\ChatMessageSentEvent",
    MESSAGE_REACT: "App\\Events\\ChatMessageReact"
};

/**
 * Códigos de operación del cliente.
 */
export const CLIENT_OP_CODES = {
    // Eventos de Pusher
    PING: "pusher:ping",
    SUBSCRIBE: "pusher:subscribe"
};

/**
 * Objeto que representa un mensaje PING.
 */
export const PING = {
    event: CLIENT_OP_CODES.PING,
    data: {}
};

/**
 * Genera una solicitud de suscripción a una sala de chat.
 * @param id - ID de la sala de chat a la que suscribirse.
 */
export const SUBSCRIBE_TO_CHATROOM = (id: string) => ({
    event: CLIENT_OP_CODES.SUBSCRIBE,
    data: {
        auth: "",
        channel: `chatrooms.${id}`
    }
});
