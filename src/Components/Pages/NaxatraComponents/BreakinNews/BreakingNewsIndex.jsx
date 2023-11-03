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
            <Marquee style={{zIndex: 0}} className='pl-1 md:pl-1 z-0'>श्रीलंका को रौंद कर सेमीफाइनल में पहुंचा भारत, 302 रन से हराकर विश्व कप में दर्ज की सबसे बड़ी जीत ,

झारखंड महिला एशियन चैंपियंस ट्रॉफी : भारत की लगातार पांचवीं जीत, कोरिया को 5-0 से किया पराजित ,

नियुक्ति दिलाने के नाम पर कोई घूस ले तो बताएं, भेजेंगे जेल- हेमंत सोरेन  , 

पीएम नरेंद्र मोदी के झारखंड आगमन को लेकर खूंटी में बीजेपी नेताओं ने की महत्वपूर्ण बैठक ,

रांची समेत इन इलाकों में हुई बारिश, बढ़ेगी ठंड ,

झारखंड बीजेपी ने हेमंत सरकार पर साधा निशाना, कहा- राज्य में विधि व्यवस्था ध्वस्त ,

झारखंड कैबिनेट ने कुल 23 प्रस्तावों पर लगाई मुहर, राज्य के सरकारी कर्मचारियों को केंद्र के बराबर मिलेगा 46 प्रतिशत महंगाई भत्ता , </Marquee>
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