import { h } from 'preact'
import type { SocialNetwork } from './utils/SocialNetwork';


export interface LivestreamChatMessage {
    message: string;
    username: string;
    userProfilePictureUrl?: string;
    socialNetwork: SocialNetwork;
}

export interface LivestreamChatMessageCardProps {
    message: string;
    username: string;
    userProfilePictureUrl?: string;
    socialNetwork: SocialNetwork;
}

export function LivestreamChatMessageCard({
    message,
    username,
    userProfilePictureUrl = `https://picsum.photos/24/24`,
    socialNetwork
}: LivestreamChatMessageCardProps) {

    return (
        <>
            <li class="flex justify-between gap-x-6 py-5">

                <div>
                    <div class="flex min-w-0 gap-x-4">
                        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src={userProfilePictureUrl} alt={`${username} ${socialNetwork} profile picture`} />
                        <div class="min-w-0 flex-auto">
                            <p class="text-sm font-semibold leading-6 text-gray-900">{`${socialNetwork}`}</p>
                            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{username}</p>
                        </div>
                        <div class="min-w-0 flex-auto">
                            <p class="text-sm font-semibold leading-6 text-gray-900">{`${message}`}</p>
                        </div>
                    </div>
                    <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p class="text-sm leading-6 text-gray-900">{`${socialNetwork}`}</p>
                        <div class="mt-1 flex items-center gap-x-1.5">
                            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                                <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                            </div>
                            <p class="text-xs leading-5 text-gray-500">Online</p>
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}
