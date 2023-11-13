import React from 'react'
import { useNavigate } from 'react-router-dom'
import PIPIndex from '../../NaxatraComponents/Home/PIPIndex'

const MHeadComponent = (props) => {

    console.log("--2--", props?.data)

    const navigate = useNavigate()

    return (
        <>
            <div className={`flex flex-wrap-reverse justify-between w-full h-full text-white flex-row`}>

                <div className="w-full md:w-[45%] flex flex-col p-4 gap-2">

                    <h1 className='font-bold text-slate-50 text-2xl pt-8 cursor-pointer hover:text-red-500' onClick={() => navigate(`/news-details/${props?.data?.story_id}`)}>
                        {props?.data?.story_title}
                    </h1>

                        {/* {props?.csource?.type == 'video' ?
                            <div className='p-2 h-full object-cover w-full md:w-[40%] '>
                                <VideoIndex data={props?.csource} className='p-4 h-full object-cover w-[50%] ' />
                            </div>
                            :
                            <img src={props?.csource?.source} alt="" className='p-2 object-contain h-max w-full md:w-[50%]  ' srcset="" />} */}

                    <p className={`text-slate-50 text-ellipsis line-clamp-4 flex object-cover ${props?.data?.story_body ? '' : " border h-full"}`}>
                        {
                            props?.data?.story_body
                        }
                    </p>


                </div>

                    {props?.data?.media_type == 'video' ?
                            <div className='p-2 py-8 h-full object-cover w-full md:w-[50%] '>
                                <PIPIndex data={props?.data} className='p-2 h-full object-cover w-[50%] ' />
                            </div>
                            :
                            <img src={props?.data?.file_name} alt="" className='p-2 h-full bg-contain object-contain w-full md:w-[50%]  ' srcset="" />}

            </div>
        </>
    )
}

export default MHeadComponent