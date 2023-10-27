import React from 'react'
import { useNavigate } from 'react-router-dom'
import VideoIndex from '../../NaxatraComponents/Home/VideoIndex'

const MHeadComponent = (props) => {

    console.log("--2--", props?.cIndex)

    const navigate = useNavigate()

    return (
        <>
            <div className={`flex flex-wrap-reverse justify-between w-full h-full text-white ${parseInt(props?.cIndex) % 2 == 0 ? 'flex-row ' : 'flex-row-reverse '}`}>

                <div className="w-full md:w-[45%] flex flex-col p-4 gap-2">

                    <h1 className='font-bold text-slate-50 text-2xl pt-8 cursor-pointer hover:text-red-500' onClick={() => navigate(`/news-details/${props?.cid}/${props?.source?.categoryId}`)}>
                        {props?.heading}
                    </h1>

                        {props?.csource?.type == 'video' ?
                            <div className='p-2 h-full object-cover w-full md:w-[40%] '>
                                <VideoIndex data={props?.csource} className='p-4 h-full object-cover w-[50%] ' />
                            </div>
                            :
                            <img src={props?.csource?.source} alt="" className='p-2 object-contain h-max w-full md:w-[50%]  ' srcset="" />}

                    <p className='text-slate-50 text-ellipsis line-clamp-4 flex object-cover '>
                        {
                            props?.content
                        }
                    </p>


                </div>

                    {props?.source?.type == 'video' ?
                            <div className='p-2 py-8 h-full object-cover w-full md:w-[50%] '>
                                <VideoIndex data={props?.source} className='p-2 h-full object-cover w-[50%] ' />
                            </div>
                            :
                            <img src={props?.source?.source} alt="" className='p-2 h-full object-cover w-full md:w-[50%]  ' srcset="" />}

            </div>
        </>
    )
}

export default MHeadComponent