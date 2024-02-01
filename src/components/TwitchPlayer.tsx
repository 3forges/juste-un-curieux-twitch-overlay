import { h } from 'preact'
export interface TwitchPlayerProps {
    channel: string;
}

export function TwitchPlayer(props: TwitchPlayerProps) {

    /**
     *  CONFIG YOUR FLAVOR
     */
    const chatLayout = true               // layout option [video|video-and-chat]
    const channel = props.channel         // your channel
    const webUrls = '"justincurieux_jbl_fix_twitch_connection_rejected.surge.sh"'   // your network
    const autoplay = true              // Twitch.Embed.VIDEO_READY action
    const verbose = true              // console feedback on|off

    const embedTwitchScript = 'const inject = document.createElement("script");'+
    'inject.type = "text/javascript";'+
    'inject.src = "https://embed.twitch.tv/embed/v1.js";'+
    'inject.onload = () => { startTwitch() };'+
    'document.getElementById("twitch-embed").append(inject);'+
    'function startTwitch() {' + 
        'embed = new Twitch.Embed("twitch-embed", {'+
            'width: "100%",'+
            'height: "100%",'+
            'channel: "'+channel+'",'+
            'layout: "video'+((chatLayout)?"-and-chat":"")+'",'+
            'parent: ['+webUrls+']'+
        '});'+
        'embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {'+
            'var player = embed.getPlayer();'+
            ((autoplay)?'player.play();':'')+
            ((verbose)?'console.log("TwitchPlayer: VIDEO_READY");':'')+
        '});'+
        'embed.addEventListener(Twitch.Embed.VIDEO_PLAY, () => {'+
            // ONLY LINE ADDED : TWITCH PLAYER OPAQUE WHEN LIVE/VIDEO IS PLAYING
            'document.getElementById("twitch-embed").style.opacity = 1;'+
            ((verbose)?'console.log("TwitchPlayer: VIDEO_PLAY");':'')+
        '});'+
    '};'

    return (
        <>
            <div id="twitch-embed" class="absolute grid justify-items-center items-center min-w-[80%] min-h-[50%]" style="opacity: 1; z-index:5;"></div>
            {
                h(
                    'script',
                    { type: 'text/javascript'},
                    embedTwitchScript
                )
            }
        </>
    )
}
