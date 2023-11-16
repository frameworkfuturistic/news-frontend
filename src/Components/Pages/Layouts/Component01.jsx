import React, { useEffect } from 'react'
import VideoIndex from '../NaxatraComponents/Home/VideoIndex';
import { useNavigate } from 'react-router-dom';
import AssignNews from '../NaxatraComponents/Home/AssignNews';

const Component01 = (props) => {

  const navigate = useNavigate()

  useEffect(() => {
    window.scroll(0, -50);
  }, [])

  let data = props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}01`))[0]

  return (
    <>

      <div id={data?.categoryId} className='border-t border-b h-full w-full bg-black text-gray-50 flex flex-col md:px-4 px-2 mb-4 md:mb-6 relative'>

        <div className='w-full h-full'>

          <AssignNews data={data} code={`${props?.code}01`} storyList={props?.storyList} cId={props?.cdata?.id} cname={props?.cdata?.category} type="br" />

          <div className={`flex flex-wrap justify-between w-full h-full flex-row `}>

            <div className="w-full md:w-[50%] flex flex-col p-4 gap-8">

              {data?.media_type == 'video' ?
                <div className='p-2 object-cover w-full md:w-[40%] '>
                  <VideoIndex data={data} className='p-2 h-full object-cover w-[50%]' />
                </div>
                :
                <img src={data?.file_name} alt="Image" className='p-2  bg-contain object-contain w-full  ' srcset="" />}

            </div>
            <div className="w-full md:w-[50%] flex flex-col p-4 gap-8 ">
              <h1 className={`font-bold text-2xl text-gray-50 pt-8 cursor-pointer hover:text-red-500 ${data?.story_title ? '' : " border-2 h-max flex justify-center items-center"}`} onClick={() => navigate(`/news-details/${data?.story_id}`)}>
                {data?.story_title ?? "Heading"}
              </h1>

              <p className={`text-gray-50 text-ellipsis line-clamp-3 ${data?.story_body ? '' : " border-2 h-full "}`}>
                {!data?.story_body && "Description"}
                {
                  data?.story_body && <div className="col-span-6 py-2 px-4 break-words" dangerouslySetInnerHTML={{ __html: data?.story_body }}></div>
                }
              </p>

            </div>


          </div>

          <span className='text-sm bg-red-600 text-white font-semibold px-4 py-1 absolute top-0 left-6'>Breaking News</span>

        </div>

      </div>

    </>
  )
}

export default Component01