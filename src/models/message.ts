
import { ITF_Chatroom } from "../types";
import { ENDPOINTS, Client } from "../package";
import { randomBytes } from 'crypto';

/**
 * Interfaz para la información básica de un mensaje.
 */
interface MessageInfo {
    id: string;
    message: string;
    chatroom_id: string;
    user: any; // Puede ser un objeto más específico
}

/**
 * Clase que representa un mensaje en una sala de chat.
 */
export class Message {
    id: string;
    message: string;
    chatroom_id: string;
    user: any; // Puede ser un objeto más específico
    chatroom: ITF_Chatroom;
    client: Client;

    /**
     * Constructor de la clase Message.
     * @param message - Información del mensaje.
     * @param client - Instancia del cliente.
     */
    constructor(message: MessageInfo, client: Client) {
        this.id = message.id;
        this.message = message.message;
        this.chatroom_id = message.chatroom_id;
        this.user = message.user;
        const cht = client.chatrooms.get(this.chatroom_id);
        if(cht) this.chatroom = cht;
        else this.chatroom = {} as any;
        this.client = client;
    }

    /**
     * Responde a este mensaje.
     * @param content - Contenido de la respuesta.
     */
    reply({ content }: { content: string }) {
        const replyData = {
            chatroom_id: this.chatroom_id,
            created_at: Math.round(Date.now() / 1000),
            message: content,
            id: randomBytes(32).toString("hex"),
            replied_to: {
                id: this.id,
                message: this.message,
                username: this.user.username
            }
        };

        this.client.rest.fetcher.post(ENDPOINTS.sendChatMessage, replyData)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.error("Error sending reply:", error);
            });
    }

    /**
     * Reacciona a este mensaje.
     * @param reaction - Reacción a agregar.
     */
    react(reaction: string) {
        const reactionData = {
            chatroom_id: this.chatroom_id,
            message_id: this.id,
            reaction: reaction,
        };

        this.client.rest.fetcher.post(ENDPOINTS.sendChatReaction, reactionData)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.error("Error sending reaction:", error);
            });
    }
}

