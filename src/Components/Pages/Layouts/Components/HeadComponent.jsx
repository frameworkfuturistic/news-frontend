import React from 'react'
import { useNavigate } from 'react-router-dom'
import VideoIndex from '../../NaxatraComponents/Home/VideoIndex'

const HeadComponent = (props) => {

    const navigate = useNavigate()

    return (
        <>
            <div className='flex flex-wrap-reverse justify-between w-full h-full'>

                <div className="w-[45%] flex flex-col p-4 gap-8">

                    <h1 className='font-bold text-2xl text-gray-800 pt-8 cursor-pointer hover:text-red-500' onClick={() => navigate(`/news-details/${props?.cid}/${props?.index}`)}>
                        {props?.heading}
                    </h1>

                    <p className='text-gray-600 text-ellipsis line-clamp-4'>
                        {props?.content}
                    </p>

                </div>

                {props?.type == 'video' ?
                    <div className='p-2 h-full object-cover w-[40%]'>
                        <VideoIndex data={props} className='p-2 h-full object-cover w-[50%]' />
                    </div>
                    :
                    <img src={props?.source} alt="" className='p-2 h-full object-cover w-[50%]' srcset="" />}

            </div>
        </>
    )
}

export default HeadComponent