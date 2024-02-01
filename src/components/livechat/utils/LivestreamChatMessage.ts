import type { SocialNetwork } from './SocialNetwork';

/*  */
export interface LivestreamChatMessage {
    message: string;
    username: string;
    userProfilePictureUrl?: string;
    socialNetwork: SocialNetwork;
}