import { h } from 'preact'
import { useRef, useState/*, useEffect*/ } from 'preact/compat'
import type { LivestreamChatMessage } from './../utils/LivestreamChatMessage';

import {
    DateTimeFormatter,
    LocalDate,
    LocalDateTime,
    LocalTime,
    Period,
} from '@js-joda/core'
// import ComfyJS/*, { type ComfyJSInstance }*/ from "comfy.js";
import { Toaster, toast, type ExternalToast } from 'sonner'
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
export interface ToastedLivestreamChatProps {
    channel: string;
    channelOwnerUSerName: string;
}

export default /* async */ function ToastedLivestreamChat({ channel, channelOwnerUSerName }: ToastedLivestreamChatProps) {
    const [messages, setMessages] = useState<LivestreamChatMessage[]>([]);
    const [twitchCientInitialized, setTwitchCientInitialized] = useState<boolean>(false);
    // const [chosenChannel, setChosenChannel] = useState<string>()
    const chosenChannelInputRef = useRef<HTMLInputElement>();
    console.log(` channel = ${channel}`)
    const messagesStateRef = useRef<LivestreamChatMessage[]>();
    messagesStateRef.current = messages
    const handleChosenChannelChange = (event: { target: { value: any } }) => {
        chosenChannel = event.target.value;
    };
    const handleSetChannelBtnClick = () => {
        console.log(` chosenChannel = ${chosenChannelInputRef.current.value}`)
        setTwitchCientInitialized(false);
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
        let currentTimeHour = LocalTime.now().hour()
        let currentTimeMinute = LocalTime.now().minute()
        let toastConfig: ExternalToast = {
            unstyled: true,
            classNames: {
                toast: 'transitisson-all ease-in-out duration-300 ml-1 p-1 bg-orange-500 rounded-lg hover:z-50 hover:bg-orange-400 text-[#ffffff]',
                title: 'p-1 text-sm text-[#ffffff]',
                description: 'p-1 text-[#ffffff]',
                //actionButton: 'bg-zinc-400',
                //cancelButton: 'bg-red-400',
                //closeButton: 'bg-lime-400',
            },
            duration: 9000,
            description: `${currentTimeHour}:${(currentTimeMinute < 10 ? "0" + currentTimeMinute : currentTimeMinute)} - ${tags['display-name']}, on Twitch`,
        }
        toast.message(`${message}`, toastConfig)
        // let newMessages: ToastedLivestreamChatMessage[] = [
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
            ...(messagesStateRef.current ? messagesStateRef.current : []),
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
            channels: [`${chosenChannelInputRef.current?chosenChannelInputRef.current.value:channel}`]
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
    console.log(`Fin du if Après l'appel de setMessages, on a le state 'messages' qui vaut : `, messagesStateRef.current)
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

                {// <!--Input + button to chanch channel -->
                }
                <div class="fixed p-4 rounded-lg bg-[rgba(120,231,237,0.6)] top-5 flex w-full max-w-[24rem]">
                    <div class="relative h-12 w-full min-w-[200px]">
                        <input 
                            type="email"
                            ref={chosenChannelInputRef}
                            class="peer h-full w-full rounded-[7px] border border-purple-400 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-purple-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-purple-400 placeholder-shown:border-t-purple-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:border-purple-200"
                            placeholder=" " value="" />
                        <label
                            class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-purple-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-purple-400 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-purple-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-purple-500">
                            Twitch Channel
                        </label>
                    </div>
                    <button 
                        onClick={handleSetChannelBtnClick}
                        class="!absolute right-5 top-[22px] bg-purple-600 disabled:bg-purple-200 select-none rounded py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-purple-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none border-purple-200 focus:border-purple-500 border-1 focus:border-2"
                        type="button">
                        connect
                    </button>
                </div>


                <ul role="list" class="divide-y divide-gray-100">
                    {//<Toaster expand duration={5} pauseWhenPageIsHidden toastOptions={{}} position="bottom-center" />

                    }
                    <Toaster visibleToasts={5} expand position="bottom-center" />
                </ul>
            </div>
        </>
    )
}
