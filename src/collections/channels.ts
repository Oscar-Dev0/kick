import { Client, ENDPOINTS } from "..";
import { Channel } from "../models";
import { Collection } from "./base";

/** Clase que representa una colección de canales. */
export class Channels extends Collection<Channel> {

    /**
     * Constructor de la clase Channels.
     * @param client - Instancia del cliente.
     */
    constructor(client: Client){
        super(client);
    };

    /**
     * Obtiene y agrega un canal a la colección.
     * @param username - Nombre de usuario relacionado con el canal.
     * @returns Promise con el canal obtenido.
     * @throws Error si no se puede obtener el canal.
     */
    async fetch(username: string): Promise<Channel> {
        try {
            const data: Channel | null = await this.client.rest.fetcher
                .get<Channel>(ENDPOINTS.getChannel(username))
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
        } catch (error) {
            throw new Error(`Error fetching channel: ${error.message}`);
        }
    }
};
