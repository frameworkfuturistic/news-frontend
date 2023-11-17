import React from 'react'
import { useNavigate } from 'react-router-dom'
import VideoIndex from '../../NaxatraComponents/Home/VideoIndex'

const HeadComponent = (props) => {

    const navigate = useNavigate()

    console.log('01 data', props?.data)

    return (
        <>
            <div className={`flex flex-wrap-reverse justify-between w-full h-full flex-row`}>

                <div className="w-full md:w-[45%] flex flex-col p-4 gap-8">

                    <h1 className={`font-bold text-2xl text-gray-800 pt-8 cursor-pointer hover:text-red-500 ${props?.data?.story_title ? '' : " border-2 h-max flex justify-center items-center"}`} onClick={() => navigate(`/news-details/${props?.data?.story_id}`)}>
                        {props?.data?.story_title ?? "Heading"}
                    </h1>

                    <p className={`text-gray-600 text-ellipsis line-clamp-5 ${props?.data?.story_body ? '' : " border-2 h-full flex justify-center items-center"}`}>
                        {!props?.data?.story_body && "Description"}
                        {
                            props?.data?.story_body && <div className="col-span-6 py-2 px-4 break-words" dangerouslySetInnerHTML={{ __html: props?.data?.story_body }}></div>
                        }
                    </p>

                </div>

                {props?.data?.media_type == 'video' ?
                    <div className='p-2 h-full object-cover w-full md:w-[40%]'>
                        <VideoIndex data={props?.data} className='p-2 h-full object-cover w-[50%]' />
                    </div>
                    :
                    <img src={props?.data?.file_name} alt="Image" className='p-2 h-full  bg-contain object-contain w-full md:w-[50%] ' srcset="" />}

            </div>
        </>
    )
}

export default HeadComponent