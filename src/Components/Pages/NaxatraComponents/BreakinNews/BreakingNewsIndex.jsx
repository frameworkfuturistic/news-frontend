import React from 'react'
import {RxCross2} from 'react-icons/rx'
// import './style.css'
import Marquee from "react-fast-marquee";

const BreakingNewsIndex = (props) => {
  return (
    <>
      <div className=' z-0 w-screen mt-6 text-zinc-50 flex md:px-10 px-1 justify-center items-center'>
        <div className={`max-w-[${props?.wpx}] bg-red-600 h-full w-full flex justify-between px-4 py-1 rounded-full font-semibold`} >
            <div className='font-semibold md:text-base text-xs flex'>
            <span className='uppercase italic border-r-2 pr-1 md:mr-2 w-[15%]'>Breaking News</span>
            <Marquee style={{zIndex: 0}} className='pl-1 md:pl-1 z-0'>राज्यसभा में भी महिला आरक्षण विधेयक पारित, महिला सांसदों ने PM मोदी के साथ मनाया जश्न</Marquee>
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