import React, { useEffect } from 'react'
import VideoIndex from '../NaxatraComponents/Home/VideoIndex';
import { useNavigate } from 'react-router-dom';
import AssignNews from '../NaxatraComponents/Home/AssignNews';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Component01 = (props) => {

  const navigate = useNavigate()

  useEffect(() => {
    window.scroll(0, -50);
  }, [])

  let data = props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}01`))[0]

  return (
    <>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >

        {Array.isArray(props?.data) &&
          props?.data?.map((elem, index) =>
            <SwiperSlide>
              <div id={data?.categoryId} className='border-t border-b h-full w-full   rounded-xl text-black flex flex-col md:px-4 px-2 mb-4 md:mb-6 relative'  >

                <div className='w-full h-full'>

                  <AssignNews data={elem} code={`${props?.code}0${index + 1}`} storyList={props?.storyList} cList={props?.categoryList} cId={props?.cdata?.id} cname={props?.cdata?.category} type="br" />

                  <div className={`flex flex-wrap justify-between w-full h-full flex-row `}>

                    <div className="w-full md:w-[50%] flex flex-col p-4 gap-8">

                      {elem?.media_type == 'video' ?
                        <div className='p-2 object-cover w-full md:w-[40%] '>
                          <VideoIndex elem={elem} className='p-2 h-full object-cover w-[50%]' />
                        </div>
                        :
                        <img src={elem?.file_name} alt="Image" className='p-2  bg-contain object-contain w-full  ' srcset="" />}

                    </div>
                    <div className="w-full md:w-[50%] flex flex-col p-4 gap-8 ">
                      <h1 className={`font-bold text-2xl text-black pt-8 cursor-pointer hover:text-red-500 ${elem?.story_title ? '' : " border-2 h-max flex justify-center items-center"}`} onClick={() => navigate(`/news-details/${elem?.story_id}/${props?.elem?.category_id ?? '0'}/${props?.cdata?.category ?? 'breaking'}/${elem?.story_title}`)}>
                        <span className='text-red-500'>Breaking News:</span> {elem?.story_title ?? "Heading"}
                      </h1>

                      <p className={`text-black  ${elem?.story_body ? '' : " border-2 h-full "}`}>
                        {!elem?.story_body && "Description"}
                        {
                          elem?.story_body && <div className="col-span-6 h-[20rem] overflow-auto" dangerouslySetInnerHTML={{ __html: elem?.story_body }}></div>
                        }
                      </p>
                    </div>


                  </div>

                  <span className='text-sm bg-red-600 text-white font-semibold px-4 py-1 absolute top-0 left-6'>Breaking News</span>

                </div>

              </div>
            </SwiperSlide>
          )}

      </Swiper>

    </>
  )
}

export default Component01