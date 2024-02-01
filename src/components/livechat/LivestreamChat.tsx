import { h } from 'preact'
import { useRef, useState/*, useEffect*/ } from 'preact/compat'
import type { SocialNetwork } from './utils/SocialNetwork';
import type { LivestreamChatMessage } from './LivestreamChatMessage';
import { LivestreamChatMessageCard } from './LivestreamChatMessage';
// import ComfyJS/*, { type ComfyJSInstance }*/ from "comfy.js";

//const ComfyJS = require("comfy.js").ComfyJS;
import tmi from 'tmi.js';

/*
export interface CommonUserstate {
    badges?: Badges | undefined;
    "badge-info"?: BadgeInfo | undefined;
    color?: string | undefined;
    "display-name"?: string | undefined;
    emotes?: { [emoteid: string]: string[] } | undefined;
    id?: string | undefined;
    mod?: boolean | undefined;
    turbo?: boolean | undefined;
    "emotes-raw"?: string | undefined;
    "badges-raw"?: string | undefined;
    "badge-info-raw"?: string | undefined;
    "room-id"?: string | undefined;
    subscriber?: boolean | undefined;
    "user-type"?: "" | "mod" | "global_mod" | "admin" | "staff" | undefined;
    "user-id"?: string | undefined;
    "tmi-sent-ts"?: string | undefined;
    flags?: string | undefined;
    [paramater: string]: any;
}
*/
export interface LivestreamChatProps {
    channel: string;
    channelOwnerUSerName: string;
}

export default /* async */ function LivestreamChat({channel, channelOwnerUSerName}: LivestreamChatProps) {
    const [messages, setMessages] = useState<LivestreamChatMessage[]>([]);
    const [twitchCientInitialized, setTwitchCientInitialized] = useState<boolean>(false);
    console.log(` channel = ${channel}`)
    const messagesStateRef = useRef<LivestreamChatMessage[]>();
    messagesStateRef.current = messages
    const getCurrentMessagesList = (): LivestreamChatMessage[] => {
        return messages;
    }
    const handleOnTwitchMessage = (channel: string, tags: tmi.ChatUserstate, message: string, self: any) => {
        console.log(` voici le message de ${tags['display-name']} : ${message}`)
        console.log(` voici les badges du user twitch  : `, JSON.stringify(tags.badges, null, 2))
        console.log(` voici les emotes du user twitch  : `, JSON.stringify(tags.emotes, null, 2))
        console.log(` voici les flags du user twitch  : `, JSON.stringify(tags.flags, null, 2))
        console.log(` voici la couleur du user twitch  : `, JSON.stringify(tags.color, null, 2))
        console.log(` voici le type du user twitch  : ${tags['user-type']}`)
        console.log(` voici le 'tmi-sent-ts' du user twitch  : ${tags['tmi-sent-ts']}`)
        console.log(` Le user twitch est-il un subscriber? : ${tags.subscriber}`)
        // let newMessages: LivestreamChatMessage[] = [
        //     ...messages,
        //     {
        //         message: `${message}`,
        //         socialNetwork: 'Twitch',
        //         username: `${tags['display-name']}`
        //     }
        // ];
        // setMessages(newMessages)
        console.log(`Avant l'appel de setMessages, on a le state 'messages' qui vaut : `, messagesStateRef.current)
        setMessages([
            //...getCurrentMessagesList(),
            ...(messagesStateRef.current?messagesStateRef.current:[]),
            {
                message: `${message}`,
                socialNetwork: 'Twitch',
                username: `${tags['display-name']}`
            }
        ])
        console.log(`Après l'appel de setMessages, on a le state 'messages' qui vaut : `, messagesStateRef.current)

        //if(self) return;
        /*
        if(message.toLowerCase() === '!hello') {
            client.say(channel, `@${tags.username}, heya!`);
        }
        */
    }
    if (!twitchCientInitialized) {
        const client = new tmi.Client({
            options: { debug: true },
            connection: {
                reconnect: true,
                secure: true
            },
            /*identity: {
                username: 'bot-name',
                password: 'oauth:my-bot-token'
            },*/
            channels: [ `${channel}` ]
        });
        client.connect().catch(console.error);
        client.on('connected', () => {
            setTwitchCientInitialized(true)
            console.log(`Astro: Ok now I know the Twitch client is connected to the chat`);
        })
        client.on('message', handleOnTwitchMessage);
        
    } else {
        console.log(`Twitch Client is already initialized and connected`)
    }
    console.log(`Fin du if Après l'appel de setMessages, on a le state 'messages' qui vaut : `, getCurrentMessagesList())
    // const initComFyJs = async (): Promise<ComfyJSInstance> => {
    //     ComfyJS.Init(channelOwnerUSerName, undefined, [channel] /*watchedChannels.split(' ')*/);
    //     return ComfyJS
    // }
    // const ComfyJSsession = await initComFyJs()
    // const initComFyJs = (): void => {
    //     ComfyJS.Init(channelOwnerUSerName, undefined, [channel] /*watchedChannels.split(' ')*/);
    // }
    //const ComfyJSsession = initComFyJs()
    
    return (
        <>
            <div className={`z-7 bg-[rgba(138,228,240,0.4)] absolute grid justify-items-center items-center min-w-[80%] min-h-[50%]`} >
                <ul role="list" class="divide-y divide-gray-100">
                    {
                    messages.slice().reverse().slice(0, 5).reverse().map(({ message, username, userProfilePictureUrl, socialNetwork }) => (
                        <LivestreamChatMessageCard message={message} socialNetwork={socialNetwork} username={username} userProfilePictureUrl={userProfilePictureUrl} />
                        ))
                    }
                </ul>
            </div>
        </>
    )
}
