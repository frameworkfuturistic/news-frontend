import React from 'react'
import AssignNews from '../../NaxatraComponents/Home/AssignNews'
import { useNavigate } from 'react-router-dom'

const BottomComponent = (props) => {

    const navigate = useNavigate()
    return (
        <>
            <div className="grid w-full md:w-1/2 grid-cols-12 items-center gap-4 border-b pb-1 mb-2 relative">

                <AssignNews data={props?.data} code={props?.code} storyList={props?.storyList} />

                {
                    props?.media_type == 'video'
                        ?
                        <div className=" w-full col-span-4 object-cover bg-cover">
                            <VideoIndex data={props?.data} />
                        </div>
                        :
                        <img
                            src={props?.data?.file_name}
                            alt="image"
                            srcSet=""
                            className="border h-14 w-full col-span-4 object-cover bg-cover"
                        />
                }
                <div className="flex flex-col gap-1 col-span-8">
                    <span className={`text-zinc-800 text-sm cursor-pointer hover:text-red-500 ${props?.data?.story_title ? '' : 'h-full flex justify-center items-center border-2'}`}  onClick={() => navigate(`/news-details/${props?.data?.story_id}`)}>
                        {props?.data?.story_title ?? "Heading"}
                    </span>
                    <span className="text-sm text-zinc-500">{props?.data?.publication_date}</span>
                </div>
            </div>
        </>
    )
}

export default BottomComponent