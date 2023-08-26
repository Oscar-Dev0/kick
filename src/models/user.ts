import { ITF_StreamerChannel, ITF_User } from "../types";

export class StreamerChannel {
    public id: number;
    public user_id: number;
    public slug: string;
    public is_banned: boolean;
    public playback_url: string | null;
    public vod_enabled: boolean;
    public subscription_enabled: boolean;
    public can_host: boolean;
    public verified: boolean | null;

    constructor(data: ITF_StreamerChannel) {
        this.id = data.id;
        this.user_id = data.user_id;
        this.slug = data.slug;
        this.is_banned = data.is_banned;
        this.playback_url = data.playback_url;
        this.vod_enabled = data.vod_enabled;
        this.subscription_enabled = data.subscription_enabled;
        this.can_host = data.can_host;
        this.verified = data.verified;
    };

};

export class User {
    public id: number;
    public email: string;
    public username: string;
    public agreed_to_terms: boolean;
    public email_verified_at: string;
    public enable_live_notifications: boolean;
    public enable_onscreen_live_notifications: boolean;
    public newsletter_subscribed: boolean;
    public enable_sms_promo: boolean;
    public enable_sms_security: boolean;
    public is_2fa_setup: boolean;
    public is_live: boolean;
    public streamer_channel: StreamerChannel;

    constructor(data: ITF_User) {
        this.id = data.id;
        this.email = data.email;
        this.username = data.username;
        this.agreed_to_terms = data.agreed_to_terms;
        this.email_verified_at = data.email_verified_at;
        this.enable_live_notifications = data.enable_live_notifications;
        this.enable_onscreen_live_notifications = data.enable_onscreen_live_notifications;
        this.newsletter_subscribed = data.newsletter_subscribed;
        this.enable_sms_promo = data.enable_sms_promo;
        this.enable_sms_security = data.enable_sms_security;
        this.is_2fa_setup = data.is_2fa_setup;
        this.is_live = data.is_live;
        this.streamer_channel = new StreamerChannel(data.streamer_channel);
    };
};