import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeadComponent = ({heading = '', content = '', image = '', cid = ''}) => {

    const navigate = useNavigate() 

    return (
        <>
            <div className='flex flex-wrap-reverse justify-between w-full h-full'>

                <div className="w-[45%] flex flex-col p-4 gap-8">

                    <h1 className='font-bold text-2xl text-gray-800 pt-8 cursor-pointer hover:text-red-500' onClick={() => navigate(`/news-details/${cid}/0`)}>
                        {heading}
                    </h1>

                    <p className='text-gray-600 text-ellipsis line-clamp-4'>
                        {content}
                    </p>

                </div>

                    <img src={image} alt="" className='p-2 h-full object-cover w-[50%]' srcset="" />

            </div>
        </>
    )
}

export default HeadComponent