import { Client, ITF_Chatroom, ITF_Channel_Chatroom as Chan, ENDPOINTS, SUBSCRIBE_TO_CHATROOM, Messages  } from "..";
import { randomBytes } from 'crypto';

interface SendOptions {
    content: string;
};

export class Chatroom implements ITF_Chatroom {
    public id: number;
    public chatable_type: string;
    public channel_id: number;
    public created_at: string;
    public updated_at: string;
    public chat_mode_old: string;
    public chat_mode: string;
    public slow_mode: boolean;
    public chatable_id: number;
    public followers_mode: boolean;
    public subscribers_mode: boolean;
    public emotes_mode: boolean;
    public message_interval: number;
    public following_min_duration: number;
    public client: Client;
    public messages: Messages;

    constructor(data: ITF_Chatroom, client: Client) {
        Object.defineProperty(this, "client", { value: client });
        this.messages = new Messages(client);
        this.id = data.id;
        this.chatable_type = data.chatable_type;
        this.channel_id = data.channel_id;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.chat_mode_old = data.chat_mode_old;
        this.chat_mode = data.chat_mode;
        this.slow_mode = data.slow_mode;
        this.chatable_id = data.chatable_id;
        this.followers_mode = data.followers_mode;
        this.subscribers_mode = data.subscribers_mode;
        this.emotes_mode = data.emotes_mode;
        this.message_interval = data.message_interval;
        this.following_min_duration = data.following_min_duration;
    };

    /**
    * Envía un mensaje a la sala de chat actual.
    * @param options - Opciones para enviar el mensaje.
    */
    send({ content }: SendOptions) {
        const messageData = {
            chatroom_id: this.id,
            created_at: Math.round(Date.now() / 1000),
            message: content,
            id: randomBytes(32).toString("hex")
        };

        this.client.rest.fetcher.post(ENDPOINTS.sendChatMessage, messageData)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.error("Error sending message:", error);
            });
    }

    /**
     * Escucha eventos/mensajes para la sala de chat.
     */
    listen() {
        // Envía una solicitud para suscribirse a la sala de chat
        this.client.ws.send(String(SUBSCRIBE_TO_CHATROOM(String(this.id))));
    }
};

export class Channel_Chatroom {
    public id: number;
    public user_id: number;
    public slug: string;
    public is_banned: boolean;
    public playback_url: string;
    public name_updated_at: string | null;
    public vod_enabled: boolean;
    public subscription_enabled: boolean;
    public followersCount: number;
    public subscriber_badges: any[];
    public banner_image: string | null;
    public recent_categories: any[];
    public livestream: any;
    public role: string | null;
    public muted: boolean;
    public follower_badges: any[];
    public offline_banner_image: string | null;
    public can_host: boolean;
    public chatroom: Chatroom;
    public ascending_links: any[];
    public plan: any;
    public previous_livestreams: any[];
    public verified: any;
    public media: any[];
    public client: Client;

    constructor(data: Chan, client: Client) {
        Object.defineProperty(this, "client", { value: client });
        this.id = data.id;
        this.user_id = data.user_id;
        this.slug = data.slug;
        this.is_banned = data.is_banned;
        this.playback_url = data.playback_url;
        this.name_updated_at = data.name_updated_at;
        this.vod_enabled = data.vod_enabled;
        this.subscription_enabled = data.subscription_enabled;
        this.followersCount = data.followersCount;
        this.subscriber_badges = data.subscriber_badges;
        this.banner_image = data.banner_image;
        this.recent_categories = data.recent_categories;
        this.livestream = data.livestream;
        this.role = data.role;
        this.muted = data.muted;
        this.follower_badges = data.follower_badges;
        this.offline_banner_image = data.offline_banner_image;
        this.can_host = data.can_host;
        this.ascending_links = data.ascending_links;
        this.plan = data.plan;
        this.previous_livestreams = data.previous_livestreams;
        this.verified = data.verified;
        this.media = data.media;
        this.chatroom = new Chatroom(data.chatroom, client);
    };
};
