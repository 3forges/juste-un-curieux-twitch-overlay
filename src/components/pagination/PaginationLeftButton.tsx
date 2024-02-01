import { useState } from "preact/hooks";
import { ChevronLeft } from 'lucide-preact'


export interface PaginationLeftButtonProps {
  setPaginationState: Function
  paginationState: number
}

export default function PaginationButtonLeft(props: PaginationLeftButtonProps) {
  const [disabled, SetDisabled] = useState<boolean>(true);
  const init = () => {
    let isEnabled = props.paginationState > 0
    SetDisabled(!isEnabled)
  }
  init()
  const handlePagination = () => {
    props.setPaginationState(props.paginationState - 1)
    let isEnabled = props.paginationState > 0 // + 1 < Math.ceil(props.itemsNumber / props.itemsPerPage) - 1
    SetDisabled(!isEnabled)
  }
  const ChevronDisabledCss = `opacity-20 pl-0`
  const ChevronEnabledCss = `hover:cursor-pointer pl-0`

  const btnStyling = `
    ring-1 bg-transparent 
    focus:outline-none focus:ring-4 focus:ring-white-800 
    font-medium rounded-full text-sm p-0 text-center ml-0 mb-0 
    focus:-p-[1px] -p-[.5px] dark:focus:ring-white-800`
  if (disabled) {
    return (
      <button disabled class={`${btnStyling}`} onClick={handlePagination}>
        <ChevronLeft class={`${disabled ? ChevronDisabledCss : ChevronEnabledCss}`} stroke="currentColor" />
      </button>
    )
  } else {
    return (
      <button class={`${btnStyling}`} onClick={handlePagination}>
        <ChevronLeft class={`${disabled ? ChevronDisabledCss : ChevronEnabledCss}`} stroke="currentColor" />
      </button>
    )
  }


}