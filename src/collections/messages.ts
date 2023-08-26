import { Client } from "..";
import { Message } from "../models";
import { Collection } from "./base";

export class Messages extends Collection< Message> {

    constructor(client: Client){
        super(client);
    };

    
};