import { routes } from "../../assets/routes";

export const BASE_URL = `https://kick.com`;
export const REFERER = `https://kick.com`;

export const ENDPOINTS = {
    user: "/"+routes['user'].uri,
    sendChatMessage: "/"+routes['chat.messages'].uri,
    sendChatReaction: "/"+routes['message.react'].uri,
    getChannel: (username: string) => "/"+ routes['channels.show'].uri.replace("{channel}", username), 
    getChatroom: (username: string) => "/"+routes["chatroom.show"].uri.replace("{channel}", username),
};