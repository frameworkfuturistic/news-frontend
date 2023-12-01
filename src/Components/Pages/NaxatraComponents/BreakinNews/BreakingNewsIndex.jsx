import React from 'react'
import {RxCross2} from 'react-icons/rx'
// import './style.css'
import Marquee from "react-fast-marquee";
import { indianDate } from '@/Components/Common/PowerUpFunctions';

const BreakingNewsIndex = (props) => {
  
  // let data = props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}01`))
  const mDataFun = (content ='', last = false) => {
    return (
      <>
        <span>{content}</span> {last == true && <span className='mx-4'>|</span>}
      </>
    )
  }
  
  return (
    <>
      <div className=' z-0 text-zinc-50 flex md:px-10 px-1 justify-center items-center mb-4'>
        <div className={`max-w-[${props?.wpx}] bg-red-600 h-full w-full flex justify-between px-4 py-1 rounded-full font-semibold`} >
            <div className='font-semibold md:text-base text-xs flex w-full'>
            <span className='uppercase italic border-r-2 pr-1 md:mr-2 w-[15%]'>News Update</span>
            <Marquee style={{zIndex: 0}} className='pl-1 md:pl-1 z-0 flex'>
              {/* <span className='bg-white px-2 py-2 text-sm text-black mr-4'>{indianDate(data?.publication_date)} - {data?.publication_time} </span>  */}
              {/* {data?.story_title} */}
              {
                Array.isArray(props?.data) && 
                props?.data?.map((elem, index) => {
                  return mDataFun(elem?.story_title, index == (props?.data?.length - 1))
                })
              }
              </Marquee>
            </div>

            <div className='flex items-center' onClick={() => props?.bClose(false)}>
                <button className='text-base md:text-xl'><RxCross2 /></button>
            </div>

        </div>
      </div>
    </>
  )
}

export default BreakingNewsIndex