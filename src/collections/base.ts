import { Collection as C } from "@discordjs/collection";
import { Client } from "../package";


export class Collection<D> extends C<string, D> {

    public client: Client;

    constructor(client: Client){
        super();
        Object.defineProperty(this, "client", { value: client });
    };

    add(data: D){
        //@ts-ignore
        const id = String(data.id);
        if(this.has(id)) this.delete(id);
        this.set(id, data);
        return data;
    };
};