import { ITF_Chatroom } from "./chatroom";
import { ITF_User } from "./user";

export interface ITF_Channel {
    id: number;
    user_id: number;
    slug: string;
    is_banned: boolean;
    playback_url: string;
    name_updated_at: string | null;
    vod_enabled: boolean;
    subscription_enabled: boolean;
    followersCount: number;
    subscriber_badges: any[];
    banner_image: string | null;
    recent_categories: any[];
    livestream: any;
    role: string | null;
    muted: boolean;
    follower_badges: any[];
    offline_banner_image: string | null;
    can_host: boolean;
    chatroom: ITF_Chatroom;
    user: ITF_User;
    ascending_links: any[];
    plan: any;
    previous_livestreams: any[];
    verified: any;
    media: any[];
}

