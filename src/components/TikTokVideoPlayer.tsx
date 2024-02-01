import { h } from 'preact'
export interface TikTokVideoPlayerProps {
    channel: string;
    video_id: string;
}

export function TikTokVideoPlayer(props: TikTokVideoPlayerProps) {

    /**
     *  CONFIG YOUR FLAVOR
     */
    const chatLayout = true               // layout option [video|video-and-chat]
    const channel = props.channel         // your channel
    const webUrls = '"justincurieux_jbl_fix_twitch_connection_rejected.surge.sh"'   // your network
    const autoplay = true              // Twitch.Embed.VIDEO_READY action
    const verbose = true              // console feedback on|off

    const embedTwitchScript = 'const inject = document.createElement("script");' +
        'inject.type = "text/javascript";' +
        'inject.src = "https://embed.twitch.tv/embed/v1.js";' +
        'inject.onload = () => { startTwitch() };' +
        'document.getElementById("twitch-embed").append(inject);' +
        'function startTwitch() {' +
        'embed = new Twitch.Embed("twitch-embed", {' +
        'width: "100%",' +
        'height: "100%",' +
        'channel: "' + channel + '",' +
        'layout: "video' + ((chatLayout) ? "-and-chat" : "") + '",' +
        'parent: [' + webUrls + ']' +
        '});' +
        'embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {' +
        'var player = embed.getPlayer();' +
        ((autoplay) ? 'player.play();' : '') +
        ((verbose) ? 'console.log("TikTokVideoPlayer: VIDEO_READY");' : '') +
        '});' +
        'embed.addEventListener(Twitch.Embed.VIDEO_PLAY, () => {' +
        // ONLY LINE ADDED : TWITCH PLAYER OPAQUE WHEN LIVE/VIDEO IS PLAYING
        'document.getElementById("twitch-embed").style.opacity = 1;' +
        ((verbose) ? 'console.log("TikTokVideoPlayer: VIDEO_PLAY");' : '') +
        '});' +
        '};'

    return (
        <>
            {//<div id="twitch-embed" class="absolute grid justify-items-center items-center min-w-[80%] min-h-[50%]" style="opacity: 0.3; z-index:5;"></div>
            }
            <blockquote class="tiktok-embed" cite={`https://www.tiktok.com/${props.channel || "@scout2015"}/video/${props.video_id || "6718335390845095173"}`} data-video-id={props.video_id || "6718335390845095173"} style="max-width: 605px;min-width: 325px;" >
                <section>
                    <a target="_blank" title={`${props.channel || "@scout2015"}`} href={`https://www.tiktok.com/${props.channel || "@scout2015"}?refer=embed"}`}>@scout2015</a>

                    Scramble up ur name &#38; I’ll try to guess it😍❤️

                    <a title="foryoupage" target="_blank" href="https://www.tiktok.com/tag/foryoupage?refer=embed">#foryoupage</a>
                    <a title="petsoftiktok" target="_blank" href="https://www.tiktok.com/tag/petsoftiktok?refer=embed">#petsoftiktok</a>
                    <a title="aesthetic" target="_blank" href="https://www.tiktok.com/tag/aesthetic?refer=embed">#aesthetic</a>
                    <a target="_blank" title="♬ original sound - tiff" href="https://www.tiktok.com/music/original-sound-6689804660171082501?refer=embed">♬ original sound - tiff</a>
                </section>
            </blockquote>
            {
                /**
                 * <script async src="https://www.tiktok.com/embed.js"></script>
                 */
            }
            {
                    h(
                    'script',
                    {type: 'text/javascript', 
                    src: 'https://www.tiktok.com/embed.js'}
                    )
            }
        </>
    )
}






































