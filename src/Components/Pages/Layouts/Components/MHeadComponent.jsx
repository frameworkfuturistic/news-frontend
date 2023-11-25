import React from 'react'
import { useNavigate } from 'react-router-dom'
import PIPIndex from '../../NaxatraComponents/Home/PIPIndex'

const MHeadComponent = (props) => {

    console.log("incoming media", props?.mediaList)

    const navigate = useNavigate()

    return (
        <>
            <div className={`flex flex-row justify-between items-center flex-wrap-reverse md:flex-wrap w-full h-full text-white `}>

                <div className="w-full md:w-[45%] flex flex-col p-4 gap-2 ">

                    <h1 className='font-bold text-slate-50 text-2xl pt-8 cursor-pointer hover:text-red-500' onClick={() => navigate(`/news-details/${props?.data?.story_id}/${props?.data?.category_id}`)}>
                        {props?.data?.story_title}
                    </h1>

                    {props?.data?.media_type == 'video' ?
                        <div className='p-2 py-8 object-cover w-full md:w-[50%]'>
                            <PIPIndex data={props?.data} className='p-2 object-cover ' />
                        </div>
                        :
                        <img src={props?.data?.file_name} alt="" className='p-2 bg-contain object-contain w-full  md:w-[50%]' srcset="" />
                    }

                    <p className={`text-gray-50 ${props?.data?.story_body ? '' : " border-2 h-full "}`}>
                        {!props?.data?.story_body && "Description"}
                        {
                            props?.data?.story_body && <div className="col-span-6 h-[10rem] overflow-auto" dangerouslySetInnerHTML={{ __html: props?.data?.story_body }}></div>
                        }
                    </p>


                </div>

                <div className='p-2 h-full object-cover w-full md:w-[50%]'>
                    <PIPIndex data={props?.mediaList} className='p-2 h-full object-cover ' />
                </div>


            </div>
        </>
    )
}

export default MHeadComponent