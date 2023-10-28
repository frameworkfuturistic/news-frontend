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
            <Marquee style={{zIndex: 0}} className='pl-1 md:pl-1 z-0'>बीजेपी के राष्ट्रीय अध्यक्ष जेपी नड्डा रांची में संकल्प सभा को किया संबोधित. 

            पीएम नरेंद्र मोदी ने 51,000 से अधिक नियुक्ति पत्र वितरित कार्यक्रम का किया उद्घाटन.
            
            झारखंड के मंत्री चंपई सोरेन 29 अक्टूबर को धनबाद में कई योजनाओं का करेंगे शिलान्यास.
            
            श्रीनगर में होने वाले स्कूल नेशनल गेम्स के लिए झारखंड टीम में खरसावां के पांच खिलाड़ियों का हुआ चयन.
            
            पलामू में आठ वर्षीय दिव्यांग बच्ची के साथ किया गया दुष्कर्म. पुलिस ने आरोपी को किया गिरफ्तार.
            
            गुमला में शराब के लिए पैसा नहीं देने पर पूर्व प्रमुख ने पत्नी की हत्या की.
            
            बाबानगरी देवघर में 5000 लोगों ने जलाभिषेक कर पीएम मोदी के नाम पर पूजा-अर्चना की.
            
            दिल्ली में अमृत कलश वाटिका की स्थापना समारोह में शामिल होने दरभंगा के 38 सदस्यीय टीम रवाना.
            
            नालंदा में बेखौफ अपराधियों ने जेडीयू विधायक पर हमले का किया प्रयास.
            
            शरद पूर्णिमा पर गंगा घाटों में श्रद्धालुओं ने लगाई आस्था की डुबकी.</Marquee>
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