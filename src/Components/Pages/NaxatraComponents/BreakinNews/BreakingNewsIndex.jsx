import React from "react";
import { RxCross2 } from "react-icons/rx";
// import './style.css'
import Marquee from "react-fast-marquee";

const BreakingNewsIndex = (props) => {
  return (
    <>
      <div className=" z-0 w-screen mt-6 text-zinc-50 flex md:px-10 px-1 justify-center items-center">
        <div
          className={`max-w-[${props?.wpx}] bg-red-600 h-full w-full flex justify-between px-4 py-1 rounded-full font-semibold`}
        >
          <div className="font-semibold md:text-base text-xs flex">
            <span className="uppercase italic border-r-2 pr-1 md:mr-2 w-[15%]">
              News Update
            </span>
            <Marquee style={{ zIndex: 0 }} className="pl-1 md:pl-1 z-0">
            96 साल के हुए लालकृष्ण आडवाणी, पीएम मोदी ने ईमानदारी और समर्पण का प्रतीक बताया.

मिशन 2024: मध्य प्रदेश के चुनावी दौरे पर पीए मोदी, बिहार सीएम नीतीश कुमार के दिये बयान पर भड़के. 

छठ में घर जाना होगा आसान, हटिया– गोरखपुर और रांची- लहरिया सराय के बीच दौड़ेगी स्पेशल ट्रेन.

पीएम नरेंद्र मोदी के झारखंड आगमन पर झामुमो ने पूछे कई सवाल, कहा- कब बहुरेंगे HEC के दिन
            </Marquee>
          </div>

          <div
            className="flex items-center"
            onClick={() => props?.bClose(false)}
          >
            <button className="text-base md:text-xl">
              <RxCross2 />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreakingNewsIndex;
