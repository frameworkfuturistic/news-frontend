import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PIPIndex from '../../NaxatraComponents/Home/PIPIndex'

const MHeadComponent = (props) => {

    console.log("incoming media in mukhya component", props?.mediaList)

    const navigate = useNavigate()

    const videoData = {
        "id": 'C13M',
        "tag_name": "stream",
        "media_id": "C13MV",
        "created_date": "21-12-2023",
        "file_name": "https://smartstream.in/naxatra/",
        "media_upload_date": "21-12-2023"
    }

    return (
        <>
            <div className={`flex flex-row justify-between items-center flex-wrap-reverse md:flex-wrap w-full h-full text-white `}>

                <div className="w-full md:w-[45%] flex flex-col p-2 md:p-4 gap-2 ">

                    <h1 className='font-bold text-slate-50 text-lg md:text-2xl pt-4 md:pt-8 cursor-pointer hover:text-red-500' onClick={() => navigate(`/news-details/${props?.data?.story_id}/${props?.data?.category_id}/${props?.data?.category}/${props?.data?.story_title}`)}>
                        {props?.data?.story_title}
                    </h1>

                    {props?.data?.media_type == 'video' ?
                        <div className='md:p-2 py-8 object-cover w-full md:w-[50%]'>
                            <PIPIndex data={props?.data} className='md:p-2 object-cover ' />
                        </div>
                        :
                        <img src={props?.data?.file_name} alt="" className='md:p-2 bg-contain object-contain w-full  md:w-[50%]' srcset="" />
                    }

                    <p className={`text-gray-50 ${props?.data?.story_body ? '' : " border-2 h-full "}`}>
                        {!props?.data?.story_body && "Description"}
                        {
                            props?.data?.story_body && <div className="col-span-6 h-[10rem] overflow-auto" dangerouslySetInnerHTML={{ __html: props?.data?.story_body }}></div>
                        }
                    </p>


                </div>

                <div className='p-2 h-full object-cover w-full md:w-[50%] md:pt-0 pt-4 '>
                    {/* <PIPIndex data={props?.mediaList} className='md:p-2 h-full object-cover ' /> */}
                    {/* <PIPIndex data={videoData} className='md:p-2 h-full object-cover ' /> */}
                    <iframe className='w-full h-[250px] md:h-[500px]' src="https://smartstream.in/naxatra/" title="Naxatra News Live Stream" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>


            </div>
        </>
    )
}

export default MHeadComponent