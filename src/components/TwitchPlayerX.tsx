import { useState } from 'preact/compat'
import { TwitchPlayer } from "./TwitchPlayer"; // <TwitchPlayer client:only="preact"/>
import { PlayLiveButton } from '~/components/PlayLiveButton'
// import { TikTokPlayer } from "~/components/TikTokPlayer"; // <TwitchPlayer client:only="preact"/>

// Inspired by https://upmostly.com/tutorials/calling-a-react-component-on-button-click
const twitchChannelName = 'Justin_Curieux';

export interface TwitchPlayerXProps {
    channel: string;
}

export function TwitchPlayerX(props: TwitchPlayerXProps) {

    // const [components, setComponents] = useState<string[]>(['justinastucieux']);
    const [displayButton, setDisplayButton] = useState<boolean>(true);
    
    /**
     *  This method will add the Twitch Player when playme is clicked
     */
    function addComponent() {
        // setComponents([...components, `${twitchChannelName}`])
        setDisplayButton(false)
    }
    
    return (
        <>
            
            
                {// <div id="twitch-embed" class= "absolute grid justify-items-center items-center min-w-[80%] min-h-[50%]" style="opacity: 0.3; z-index:5;"></div>
                }
                        {
                            displayButton?<PlayLiveButton onClick={addComponent} description="" altText="Play Me Baby!" social_icon='mdi:twitch'/> :<></>
                        }   
                        {
                        }      
                        {
                            displayButton?<></>:<TwitchPlayer channel={props.channel}/>
                        }
                        {
                            // displayButton?<></>:<TikTokPlayer channel={props.channel}/>
                        }
            
        </>
    )
}