import { h } from 'preact'
import { useState/*, useEffect*/ } from 'preact/compat'
import type { SocialNetwork } from './utils/SocialNetwork';
import type { LivestreamChatMessage } from './LivestreamChatMessage';
import { LivestreamChatMessageCard } from './LivestreamChatMessage';
// import ComfyJS/*, { type ComfyJSInstance }*/ from "comfy.js";

//const ComfyJS = require("comfy.js").ComfyJS;
import tmi from 'tmi.js';


export interface LivestreamChatProps {
    channel: string;
    channelOwnerUSerName: string;
}

export default /* async */ function LivestreamChat({channel, channelOwnerUSerName}: LivestreamChatProps) {
    const [messages, setMessages] = useState<LivestreamChatMessage[]>([]);
    const [twitchCientInitialized, setTwitchCientInitialized] = useState<boolean>(false);
    console.log(` channel = ${channel}`)

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
        client.on('message', (channel, tags, message, self) => {
            console.log(` voici le message de ${tags['display-name']} : ${message}`)
            // let newMessages: LivestreamChatMessage[] = [
            //     ...messages,
            //     {
            //         message: `${message}`,
            //         socialNetwork: 'Twitch',
            //         username: `${tags['display-name']}`
            //     }
            // ];
            // setMessages(newMessages)
            console.log(`Avant l'appel de setMessages, on a le state 'messages' qui vaut : `, messages)
            setMessages([
                ...messages,
                {
                    message: `${message}`,
                    socialNetwork: 'Twitch',
                    username: `${tags['display-name']}`
                }
            ])
            console.log(`Après l'appel de setMessages, on a le state 'messages' qui vaut : `, messages)
    
            //if(self) return;
            /*
            if(message.toLowerCase() === '!hello') {
                client.say(channel, `@${tags.username}, heya!`);
            }
            */
        });
        
    } else {
        console.log(`Twitch Client is already initialized and connected`)
    }
    console.log(`Fin du if Après l'appel de setMessages, on a le state 'messages' qui vaut : `, messages)
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

            <ul role="list" class="divide-y divide-gray-100">
            {
            messages.map(({ message, username, userProfilePictureUrl, socialNetwork }) => (
                <LivestreamChatMessageCard message={message} socialNetwork={socialNetwork} username={username} userProfilePictureUrl={userProfilePictureUrl} />
            ))
            }

            </ul>
        </>
    )
}
