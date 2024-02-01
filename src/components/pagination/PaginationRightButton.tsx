import { useState } from "preact/hooks";
import { ChevronRight } from 'lucide-preact'

export interface PaginationRightButtonProps {
  setPaginationState: Function
  paginationState: number
  itemsNumber: number
  itemsPerPage: number
}

export default function PaginationButtonRight(props: PaginationRightButtonProps) {
  const [disabled, SetDisabled] = useState<boolean>(false);
  const init = () => {
    let isEnabled = props.paginationState < Math.ceil(props.itemsNumber / props.itemsPerPage) - 1
    SetDisabled(!isEnabled)
  }
  init()
  const handlePagination = () => {
    props.setPaginationState(props.paginationState + 1)
    let isEnabled = props.paginationState + 1 < Math.ceil(props.itemsNumber / props.itemsPerPage) - 1
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
        <ChevronRight class={`${disabled ? ChevronDisabledCss : ChevronEnabledCss}`} stroke="currentColor" />
      </button>
    )
  } else {
    return (
      <button class={`${btnStyling}`} onClick={handlePagination}>
        <ChevronRight class={`${disabled ? ChevronDisabledCss : ChevronEnabledCss}`} stroke="currentColor" />
      </button>
    )
  }


}
