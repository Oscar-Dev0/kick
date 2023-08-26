import { Client } from "..";
import { User } from "../models";
import { Collection } from "./base";

export class Users extends Collection<User> {

    constructor(client: Client){
        super(client);
    };

    
};