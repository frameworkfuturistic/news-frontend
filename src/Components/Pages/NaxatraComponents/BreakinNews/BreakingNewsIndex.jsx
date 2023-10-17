import React from 'react'
import {RxCross2} from 'react-icons/rx'

const BreakingNewsIndex = (props) => {
  return (
    <>
      <div className='animate__animated animate__slideInRight animate__faster w-screen mt-5 text-zinc-50 flex md:px-10 px-1 justify-center items-center animate__animated animate__fadeIn animate__faster'>
        <div className={`max-w-[${props?.wpx}] bg-red-600 h-full w-full flex justify-between px-4 py-1 rounded-full font-semibold`} >
            <div className='font-semibold md:text-base text-xs'>
            <span className='uppercase italic border-r-2 pr-1 md:pr-2'>Breaking News</span>
            <span className='pl-1 md:pl-2'>राज्यसभा में भी महिला आरक्षण विधेयक पारित, महिला सांसदों ने PM मोदी के साथ मनाया जश्न</span>
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