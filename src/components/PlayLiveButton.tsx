import styles from './PlayLiveButton.module.css'
import { Play } from 'lucide-preact'
/**
 * Astro Icon cannot be used into 
 * a React / Preact component, it is 
 * designed to be compiled as an 
 * '*.astro', not as an '*.tsx' 
 */
// import { Icon } from 'astro-icon/components'

export interface PlayLiveButtonProps {
    onClick: any;
    altText?: string;
    description?: string;
	link_url?: string;
	social_icon: string;	
}
export const defaultDescription = `Play Live Button`
export function PlayLiveButton(props: PlayLiveButtonProps) {

    // const tailwindCssAnimation = `animate-jump-in animate-delay-300 animate-thrice`

    // const tailwindCssAnimation = `animate-jump animate-delay-300 animate-twice`
	// const tailwindCssAnimation = `animate-infinite animate-jump animate-duration-[2000ms]`
	// const tailwindCssAnimation = `animate-infinite animate-jump animate-duration-[1250ms] animate-delay-150 animate-ease-in`
	// const tailwindCssAnimation = `animate-infinite animate-shake animate-duration-[1250ms] animate-delay-150 animate-ease-in`
	// const tailwindCssAnimation = `animate-once animate-jump animate-duration-[1250ms] animate-delay-[400ms] animate-ease-in`
	// const tailwindCssAnimation = `animate-none animate-jump animate-duration-[1250ms] animate-delay-[400ms] animate-ease-in`
	const tailwindCssAnimation = ``
	// animate-shake
	// const tailwindCssAnimation = `animate-infinite animate-spin animate-ease-in-out animate-duration-[1250ms]` // celui là est proche du battement de coeur
	
	
    return (
        <>
			
			<div className={`${tailwindCssAnimation} z-7 absolute grid justify-items-center items-center min-w-[80%] min-h-[50%]`} >
				<a 
				   name={props.description?props.description:defaultDescription}
				   aria-label={props.description?props.description:defaultDescription}
				   onClick={props.onClick}
				   href="#_"
				   alt={props.altText?props.altText:(props.description?props.description:defaultDescription)}
				   class="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-9 hover:ring-purple-500"
				>

					{/*

                    <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                    <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>

					<span class="relative text-transparent">
					
					<!-- svg 
					    xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 22 22"
						strokeWidth={1.5}
						stroke="white"
						className="w-48 h-48">
							<path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
					</span>
	</svg -->*/}
					<Play color={`rgb(255,96,2)`} class="animate-pulse w-24 h-24 sm:w-36 sm:h-36 md:w-64 md:h-64 " />
					<span class="sr-only">

                    {props.description?props.description:defaultDescription}
					</span>
                </a>
			</div>

        </>
    )
}










































