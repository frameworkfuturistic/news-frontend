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
            <span className='uppercase italic border-r-2 pr-1 md:mr-2 w-[15%]'>News Update</span>
            <Marquee style={{zIndex: 0}} className='pl-1 md:pl-1 z-0'>
महिला एशियन हॉकी चैंपियंस में भारत की लगातार दूसरी जीत, टीम इंडिया ने मलेशिया को 5-0 से हराया, 
रांची में खेले जा रहे दूसरे दिन के मैच में चीन ने थाइलैंड को और जापान ने कोरिया को हराया, 
 धनबाद के व्यवसायी दीपक अग्रवाल को अपराधियों ने मारी गोली, हालत गंभीर, कोलकाता रेफर,
67वीं बीपीएससी का रिजल्ट जारी, बाढ़ के अमन आनंद बने टॉपर, जहानाबाद की निकिता कुमारी सेकेंड टॉपर,
केरल के एर्नाकुलम स्थित कलामासेरी के एक कन्वेंशन सेंटर में विस्फोट, एक व्यक्ति की मौत, कई घायल,
भारतीय स्टेट बैंक ने एमएस धोनी को बनाया ब्रांड एंबेसडर,</Marquee>
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