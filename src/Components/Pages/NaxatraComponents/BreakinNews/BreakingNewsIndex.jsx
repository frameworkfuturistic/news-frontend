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
            <Marquee style={{zIndex: 0}} className='pl-1 md:pl-1 z-0'>बर्थडे ब्वॉय विराट कोहली ने बनाया अपना 49वां वनडे शतक,  सचिन तेंदुलकर के बराबरी की  ,

पीएम नरेंद्र मोदी ने छत्तीसगढ़ के डोंगरगढ़ में मां बम्लेश्वरी के दिव्य दर्शन और पूजन किया, राज्य समेत परिवारजनों की सुख-समृद्धि की कामना की ,

बिहार के मुजफ्फरपुर दौरे पर केंद्रीय गृह मंत्री अमित शाह, लालू यादव और नीतीश कुमार पर बोला हमला ,

छत्तीसगढ़ के केशकाल विधानसभा क्षेत्र में बीजेपी प्रत्याशी के पक्ष में झारखंड प्रदेश अध्यक्ष बाबूलाल मरांडी ने मांगे वोट ,

रांची के बिरसा मुंडा सेंट्रल जेल में ईडी के अधिकारियों पर हमला करने की साजिश का खुलासा, बीजेपी ने राज्य सराकर पर साधा निशाना ,

नई दिल्ली में बढ़ते प्रदूषण को देखते हुए आगामी 10 नवंबर तक प्राथमिक स्कूल बंद रहेंगे. शिक्षा मंत्री आतिशी ने की घोषणा ,</Marquee>
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