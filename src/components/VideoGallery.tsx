import React from "preact/compat";
import { useState } from "preact/hooks";
import { videos, type VideoItem } from "./videosGalleryConfig"
import { Circle, CircleDot, XCircle, ChevronRightCircle, ChevronLeftCircle } from 'lucide-preact'
import PaginationButtonRight from './pagination/PaginationRightButton'
import PaginationButtonLeft from './pagination/PaginationLeftButton'
import getPlusGrosseUniteEnFrancais, { type SplittedPeriodFR } from '../utils/videos/getPlusGrosseUniteEnFrancais'
import {
  LocalDate, 
  Period,  
} from '@js-joda/core'
// import '@js-joda/timezone'
import VideoModal, {type VideoModalState} from './videos/VideoModal'


const paginationItemsNumber: number = 4 

export default function VideoGallery() {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0) 

  /**
   * Initalise le champs "elapsed" pour chacune des vidéos de la config
   */
  videos.map( (item: VideoItem, index: number) => {
    const dateStr: string = item.date.replaceAll('/','-').split("-").reverse().join("-")
    const currentDate: string = new Date().toJSON().slice(0, 10)

    const elapsed: Period = Period.between(
      LocalDate.parse(dateStr),
      LocalDate.parse(currentDate)
    )
    const {plusGrosseUniteEnFrancais, elapsedSplitted}: SplittedPeriodFR  = getPlusGrosseUniteEnFrancais(elapsed)
    videos[index].elapsed = `${elapsedSplitted[0]} ${plusGrosseUniteEnFrancais}`
  })

  const videoList = videos.slice(0,-1).slice(currentPageIndex * paginationItemsNumber, (currentPageIndex * paginationItemsNumber) + paginationItemsNumber)
  const lastVideo = videos.slice(-1)[0]
  const [modalVideoState, setModalVideoState] = React.useState<VideoModalState>({
    showModal: false,
    video: lastVideo
  });
  const defaultPlayingVideo = { url: "", title: "", elapsed: "", date: "" }
  const [playingVideo, setPlayingVideo] = useState(defaultPlayingVideo)

  const dots: number[] = []
  for (let i=0; i < Math.ceil((videos.length-1)/paginationItemsNumber); i++) {
    dots.push(i)
  }

  return(
    <>
    {//<VideoModal />
    }
    <VideoModal modalVideoState={modalVideoState} setModalVideoState={setModalVideoState} />
    <div class="grid place-items-center">
      <div class="m-0">
        {/* derniere video */}
        <div class="relative w-full flex flex-col place-content-center">
          <iframe 
            src={`https://www.youtube.com/embed/${lastVideo.url}?si=BUW-Hf9r-yCHLET&rel=0`} 
            title="YouTube video player" 
            frameBorder="0" 

            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            class="w-full aspect-video"
            allowFullScreen>
          </iframe>
          <div class="text-xs flex flex-raw mb-12">
            <div class="mx-8">{lastVideo.title}</div>
            <div class="mx-8">( il y as {lastVideo.elapsed} )</div>
          </div>
        </div>
        {/* currentPageIndex navigation */}
        <div class="
          p-2 
          grid grid-cols-1 
          place-items-center md:px-6
        ">
          <div class="flex flex-row rounded-xl p-2">
            <PaginationButtonLeft setPaginationState={setCurrentPageIndex} paginationState={currentPageIndex} />
            <span class="w-1"></span>
            { 
              dots.map( (index) => {
                if (currentPageIndex == index)
                  return(<CircleDot onClick={() => {
                    setCurrentPageIndex(index)
                  }} class="hover:cursor-pointer w-4 h-4 px-[1px] rounded-xl translate-y-[4px]" 
                  fill="currentColor"
                  />)
                else 
                  return(<Circle onClick={() => {
                    setCurrentPageIndex(index)
                  }} class="hover:cursor-pointer w-4 px-[1px]" 
                  stroke="currentColor"
                  />)
              })
            }
            <span class="w-1"></span>
            <PaginationButtonRight setPaginationState={setCurrentPageIndex} paginationState={currentPageIndex} itemsNumber={videos.length} itemsPerPage={paginationItemsNumber} />
            
          </div>
        </div>
        {/* video gallery */}
        <div class={`
          max-w-full margin-mx-auto mx-auto 
          grid place-items-center md:place-items-stretch grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lgxl:grid-cols-3 
          ${ paginationItemsNumber > 3 && "xxl:grid-cols-4" }
        `}>
        {
          videoList.map( (videoItem, index) => {
            return (
                <div class="m-4 hover:cursor-pointer" onMouseDown={ () => {
                    // setPlayingVideo(item)
                    // window.location.href="#modal"
                    setModalVideoState({ 
                      showModal: true,
                      video: videoItem
                    })
                  }
                }>
                <iframe 
                  src={`https://www.youtube.com/embed/${videoItem.url}?si=BUW-Hf9r-yCHLET&rel=0`} 
                  title={videoItem.title}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  style="pointer-events: none"
                  allowFullScreen
                  class="w-full aspect-video"
                  >
                </iframe>
                <div class="text-xs w-max-[300px] min-w-[300px] mt-2">
                  <div class="mx-2 text-xs w-[250px] whitespace-pre-wrap break-words" >{videoItem.title}</div>
                  <div class="mx-2">( il y as {videoList[index].elapsed} )</div>
                </div>
              </div>
            )
          }
        )}
        </div>
      </div>
    </div>
    </>
  )
}

