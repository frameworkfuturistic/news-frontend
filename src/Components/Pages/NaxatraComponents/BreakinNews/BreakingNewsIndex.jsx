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
            <Marquee style={{zIndex: 0}} className='pl-1 md:pl-1 z-0'>रांची में वुमेंस एशियन हॉकी चैंपियनशिप ट्रॉफी का गुरुवार से हो रहा आगाज ,
झारखंड प्रशासनिक सेवा के 36 अधिकारियों का हुआ तबादला  ,
बीजेपी के राष्ट्रीय अध्यक्ष जेपी नड्डा 28 अक्टूबर को आएंगे रांची ,
पूर्व सीएम रघुवर दास बीजेपी के सभी पदों से देंगे इस्तीफा, ओडिशा के राज्यपाल की लेंगे शपथ
झारखंड में बढ़ने लगी ठंड, और गिरेगा पारा
अयोध्या पहुंची बॉलीवुड की एक्ट्रेस कंगना रनौत, रामलला की दर्शन की
चुनाव आयोग ने एक्टर राजकुमार राव को बनाया नेशनल आईकन</Marquee>
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