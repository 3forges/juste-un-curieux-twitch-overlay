import type { JSX } from 'preact'
import { IconContext } from "react-icons"
import { BsTwitterX, BsWhatsapp, BsReddit, BsTelegram } from "react-icons/bs"
import { FiFacebook } from "react-icons/fi"

export interface iconProps {
  size?: number,
  isUp?: boolean,
  urlOfLinkToShare?: string, 
  tailwindcss?: string,
}

const site_url="https://website-ar7.pages.dev/"
const title="Le site de justin curieux"

/*
whatsapp: https://api.whatsapp.com/send/?text=https%3A%2F%2Fyoutu.be%2F18grsGXFtYI%3Fsi%3DiC6q6IMv92MM1qeu&type=custom_url&app_absent=0
reddit: https://www.reddit.com/submit?url=https%3A%2F%2Fyoutube.com%2Fwatch%3Fv%3D18grsGXFtYI%26si%3DiC6q6IMv92MM1qeu&title=TOP%2010%20Logiciels%20de%20Mindmapping%20(Cartes%20Mentales)%20Gratuits%20(2022)
telegram: 
  tg://msg_url?url=https%3A%2F%2Fwww.example.com%3Ft=12
  https://telegram.me/share/url?url=<URL>&text=<TEXT>
vk: https%3A%2F%2Fvk.com%2Fshare.php%3Furl%3Dhttps%253A%2F%2Fyoutube.com%2Fwatch%253Fv%253D18grsGXFtYI%2526si%253DiC6q6IMv92MM1qeu&display=widget
ok.ru: https://connect.ok.ru/dk?st.cmd=OAuth2Login&st.layout=w&st.redirect=%252Fdk%253Fcmd%253DWidgetSharePreview%2526amp%253Bst.cmd%253DWidgetSharePreview%2526amp%253Bst.title%253DTOP%252B10%252BLogiciels%252Bde%252BMindmapping%252B%252528Cartes%252BMentales%252529%252BGratuits%252B%2525282022%252529%2526amp%253Bst.shareUrl%253Dhttps%25253A%25252F%25252Fyoutube.com%25252Fwatch%25253Fv%25253D18grsGXFtYI%252526si%25253DiC6q6IMv92MM1qeu&st._wt=1&st.client_id=-1
*/

export function RedditIcon( props: iconProps ): JSX.Element {
  return(
    <a href={`https://www.reddit.com/submit?url=${site_url}&title=${title}`}
      target="_blank"
      class={`focus:border-transparent transition-rotate duration-0 ease-in-out absolute rotate-[${props.isUp?`0deg`:`-180deg`}] ${props.tailwindcss}`}
    >
      <IconContext.Provider value={{ color: "currentColor", className: "", size: props.size }} >
        <BsReddit />
      </IconContext.Provider>
    </a>
  )
}

export function FacebookIcon( props: iconProps ): JSX.Element {
  return(
    <a href={`https://www.facebook.com/sharer.php?u=${site_url}`}
      target="_blank"
      class={`transition-rotate duration-0 ease-in-out absolute rotate-[${props.isUp?`0deg`:`-180deg`}] ${props.tailwindcss}`}
    >
      <IconContext.Provider value={{ color: "currentColor", className: "", size: props.size }} >
        <FiFacebook />
      </IconContext.Provider>
    </a>
  )
}

export function TwitterIcon( props: iconProps ): JSX.Element {
  return(
    <a href={`https://twitter.com/intent/tweet?text=${title}&url=${site_url}`}
      target="_blank"
      class={`transition-rotate duration-0 ease-in-out absolute rotate-[${props.isUp?`0deg`:`-180deg`}] ${props.tailwindcss}`}
    >
      <IconContext.Provider value={{ color: "currentColor", className: `md:size-[${props.size}]`, size: props.size }} >
        <BsTwitterX />
      </IconContext.Provider>
    </a>
  )
}

export function WhatsappIcon( props: iconProps ): JSX.Element {
  return (
    <a 
      href={`https://api.whatsapp.com/send/?text=${site_url}&type=custom_url&app_absent=0`}
      target="_blank"
      class={`transition-rotate duration-0 ease-in-out absolute rotate-[${props.isUp?`0deg`:`-180deg`}] ${props.tailwindcss}`}
    >
      <IconContext.Provider value={{ color: "currentColor", className: "", size: props.size }} >
        <BsWhatsapp />
      </IconContext.Provider>
    </a>
  )
}

BsTelegram
export function TelegramIcon( props: iconProps ): JSX.Element {
  return (
    <a 
      href={`https://telegram.me/share/url?url=${site_url}&text=${title}&type=custom_url&app_absent=0`}
      target="_blank"
      class={`transition-rotate duration-0 ease-in-out absolute rotate-[${props.isUp?`0deg`:`-180deg`}] ${props.tailwindcss}`}
    >
      <IconContext.Provider value={{ color: "currentColor", className: "", size: props.size }} >
        <BsTelegram />
      </IconContext.Provider>
    </a>
  )
}