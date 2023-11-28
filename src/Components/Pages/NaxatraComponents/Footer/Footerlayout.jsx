import React from 'react'
import footerlogo from '@/Components/assets/footer-logo.webp'
import footerimg1 from '@/Components/assets/footerimg1.jpg'
import footerimg2 from '@/Components/assets/footerimg2 (1).jpeg'
import footerimg3 from '@/Components/assets/footerimg3(2).jpeg'
import { BsFire } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";

const Footerlayout = () => {

  let wpx = JSON.parse(localStorage.getItem("layout"))?.Layout_width || "1366px";

  return (
    <div className='w-full bg-black flex justify-center items-center z-0 animate__animated animate__fadeIn animate__faster'>
      <div className={`max-w-[${wpx}] `} >
        <div className='grid grid-cols-12   p-2 m-2  my-2  '>
          <div className='col-span-12 lg:col-span-4'>
            <div>
              <img src={footerlogo} alt="" className='p-2 my-6' />
              <p className='p-3 text-white'>आपका अपने चहेते चैनल "नक्षत्र न्यूज़ हिंदी" में तहे दिल से स्वागत है। झारखंड-बिहार सहित देश के बड़े मुद्दों पर सवाल करना ही हमारी पहचान है। जन-जन तक की आवाज को हमने देश के कोने-कोने में पहुंचाया है इसी तरीके से आप "नक्षत्र न्यूज़ हिंदी" को प्यार देते रहिए। हम भी बेबाक, बेखौफ बोलते रहेंगे।</p>
              <div className='flex'><GoDotFill className='text-white my-1 mx-1' /> <p className='text-white'>Email:info@naxatranewshindi.com</p></div>
              <div className='flex'><GoDotFill className='text-white my-1 mx-1' /> <p className='text-white'>Phone: +91-8271776646</p></div>
            </div>
          </div>
          <div className='col-span-12 lg:col-span-4 my-5'>
            <div>
              <div className=" my-2  w-1/2 h-1 bg-red-500     ">
                <div className="h-px border-red-500  w-full "></div>
              </div>
            </div>
            <div className='text-white text-lg  font-semibold flex'>
              <BsFire className='  my-1 ' />
              <p className='mx-2'> Popular News  </p>
            </div>
            <div className="h-px w-80 bg-white my-2"></div>
            <div className='my-6 flex'>
              <img src={footerimg1} alt="" className='h-16 my-1' />
              <p className='text-white mx-2'>
                Durga Puja 2023: चक्रव्यूह को पार कर श्रद्धालु मां का कर…		</p>
            </div>
            <div className='my-6 flex'>
              <img src={footerimg2} alt="" className='h-16 my-1' />
              <p className='text-white mx-2'>
                रांची के हरमू मैदान में 28 अक्टूबर को बीजेपी की संकल्प …		</p>
            </div>
            <div className='my-6 flex'>
              <img src={footerimg3} alt="" className='h-16 my-1' />
              <p className='text-white mx-2'>	साहेबगंज : खटिया पर ढोकर 12 किमी की दूरी तय कर मरीजों को…</p>
            </div>
          </div>
          <div className='col-span-12 lg:col-span-4 text-white my-6 '>
            <div>
              <div className=" my-2  w-1/2 h-1 bg-red-500     ">
                <div className="h-px border-red-500  w-full "></div>
              </div>
            </div>
            <div className='text-white text-lg  font-semibold flex'>
              <BsFire className='  my-1 ' />
              <p className='mx-2'> Popular Categories  </p>
            </div>
            <div className="h-px w-80 bg-white my-1"></div>
            <div className=' flex group  justify-between my-4 '>
              <p className='text-start flex group-hover:text-red-500 text-xs '>झारखण्ड</p>
              <p className='box-border bg-slate-600 text-end text-white mx-2 group-hover:text-red-500 '>236</p>

            </div>
            <div className=" flex  h-px w-80 bg-gray-600 my-1"></div>
            <div className=' flex group justify-between my-2 '>
              <p className='text-start flex transition duration-300 group-hover:text-red-500 text-xs '>देश</p>
              <p className='box-border bg-slate-600 text-end text-white mx-2 group-hover:text-red-500 '>11</p>

            </div>
            <div className="h-px w-80 bg-gray-600 my-1"></div>
            <div className=' flex group justify-between my-2 '>
              <p className='text-start flex group-hover:text-red-500 text-sm'>धार्मिक</p>
              <p className='box-border bg-slate-600 text-end text-white mx-2 group-hover:text-red-500 '>11</p>

            </div>
            <div className="h-px w-80 bg-gray-600 my-1"></div>
            <div className=' flex group justify-between my-2 '>
              <p className='text-start flex  group-hover:text-red-500 text-xs'>मनोरंजन</p>
              <p className='box-border bg-slate-600 text-end text-white mx-2 group-hover:text-red-500 '>20</p>

            </div>
            <div className="h-px w-80 bg-gray-600 my-1"></div>
            <div className=' flex  group justify-between my-2 '>
              <p className='text-start flex group-hover:text-red-500 text-xs '>बिहार</p>
              <p className='box-border bg-slate-600 text-end text-white mx-2 group-hover:text-red-500 '>10</p>

            </div>
            <div className="h-px w-80 bg-gray-600 my-1"></div>
            <div className=' flex group justify-between my-3 '>
              <p className='text-start flex group-hover:text-red-500  text-xs '>राशिफल</p>
              <p className='box-border bg-slate-600 text-end text-white mx-2 group-hover:text-red-500 '>10</p>

            </div>
            <div className="h-px w-80 bg-gray-600 my-1"></div>
          </div>
          {/*
             <div className='col-span-3 text-white my-6'>
          
             <div className='my-8 mx-5 '>
            <p className='font-semibold text-gray-800 text-2xl'>Visitor Counter </p>
            <div className='mx-5'>
              <div className='flex my-1'>
                <img src={user} alt="" />
                <p className='text-sm'>Users Today :12 </p>
              </div>
              <div className='flex my-1'>
                <img src={totaluser} alt="" />
                <p className='text-sm'>Total Users :737 </p>
              </div>
              <div className='flex my-1'>
                <img src={viewstoday} alt="" />
                <p className='text-sm'>Views Today :92 </p>
              </div>
              <div className='flex my-1 '>
                <img src={totaluser} alt="" />
                <p className='text-sm'>Views Today :92 </p>
              </div>
              <div className='flex my-1 '>
                <img src= {viewstotal} alt="" />
                <p className='text-sm'> Total Views :2658 </p>
              </div>
              <div className='flex my-1 '>
                <img src={whoonline} alt="" />
                <p className='text-sm'>Whos Online :0 </p>
              </div>
              <div className='flex my-1'>
                <img src={useryear} alt="" />
                <p className='text-sm'>Your IP Address  :152.58.134.7 </p>
              </div> 
              <div className='flex my-1 '>
                <img src={useryear} alt="" />
              <p className='text-sm'>Server Time  : 2023-10-18 </p>
          </div>
           
          </div>
             </div> 
         
             </div>
              */}
        </div>
        <div className='h-14 bg-gray-900 w-full flex  flex-row  '>
          <p className='flex text-lg font-normal text-white mx-6 my-2  tex justify-start text-center'>Live Channel </p>
          <p className='flex text-lg font-normal text-white mx-4 my-2  tex justify-start text-center'>Contact Us  </p>
          <p className='flex text-lg font-normal text-white mx-4 my-2  tex justify-start text-center'>Privacy Policy  </p>
          <p className='flex text-lg font-normal text-white mx-4 my-2  tex justify-start text-center'>Terms & Conditions </p>
        </div>
        <div className='h-14'>
          <p className='text-white text-xs mx-4  my-6'>Naxatra News Hindi © 2023 - All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footerlayout
