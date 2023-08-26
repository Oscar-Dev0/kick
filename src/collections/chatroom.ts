import { Client, ENDPOINTS } from "..";
import { Chatroom } from "../models";
import { Collection } from "./base";

/** Clase que representa una colección de salas de chat (canales). */
export class Chatrooms extends Collection<Chatroom> {

    /**
     * Constructor de la clase Channels.
     * @param client - Instancia del cliente.
     */
    constructor(client: Client){
        super(client);
    };

    /**
     * Obtiene y agrega una sala de chat a la colección.
     * @param username - Nombre de usuario relacionado con la sala de chat.
     * @returns Promise con la sala de chat obtenida.
     * @throws Error si no se puede obtener la sala de chat.
     */
    async fetch(username: string): Promise<Chatroom> {
        try {
            const data: Chatroom | null = await this.client.rest.fetcher
                .get<Chatroom>(ENDPOINTS.getChatroom(username))
                .then((res) => res.data)
                .catch(err => {
                    console.log(err.response);
                    return null;
                });

            if (!data) {
                throw new Error("Failed to fetch");
            }

            this.add(data);
            return data;
        } catch (error: any) {
            throw new Error(`Error fetching chatroom: ${error.message}`);
        }
    };
};
