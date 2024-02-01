// import { icons } from 'lucide-preact';
import { Icon } from 'astro-icon/components'

export interface DiscordIconProps {
    name?: string
    color?: string
    size?: number
    stroke?: string
    strokeWidth?: number
    viewBox?: string
    alt?: string
    className?: string
}
export default function DiscordIcon (props: DiscordIconProps) {
  
  return (
    <Icon name={props.name} color={props.color} size={props.size} stroke={props.stroke} viewBox={props.viewBox} class={props.className} />
  );
};
