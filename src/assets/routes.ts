interface Endpoint {
    uri: string;
    methods: string[];
    bindings?: { [key: string]: string };
}


type Endpoints = Record<ResourceKey, Endpoint>;

import json from "./routes.json";

export const routes: Endpoints = json;



type ResourceKey = 
  "user" |
  "resource_urls" |
  "channel.chat" |
  "chat.messages" |
  "message.react" |
  "channels.followed" |
  "channel.followers" |
  "channel.getFollowersForBadge" |
  "liveChannels.search" |
  "subscriptions.index" |
  "subscriptions.subscribers" |
  "subscriptions.history" |
  "subscriptions.connect_account" |
  "subscriptions.plan" |
  "subscriptions.get_default_payment_method" |
  "subscriptions.get_payment_methods" |
  "subscriptions.stripe_countries" |
  "subscriptions.create_setup_intent" |
  "subscriptions.resetable" |
  "subscriptions.get_payments_history" |
  "channel.getLivestream" |
  "liveStream.heartBeat" |
  "channel.followingSortBy" |
  "chatroom.show" |
  "channels.show" |
  "channels.links" |
  "user.show" |
  "categories.get" |
  "categories.top" |
  "user.categories.top" |
  "categories.show" |
  "user.livestreams" |
  "subcategories.get" |
  "subcategories.all" |
  "subcategories.show" |
  "video.show" |
  "banned-users";