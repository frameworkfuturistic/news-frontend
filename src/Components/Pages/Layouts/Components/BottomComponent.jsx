import React from 'react'
import AssignNews from '../../NaxatraComponents/Home/AssignNews'

const BottomComponent = (props) => {
    return (
        <>
            <div className="grid w-full md:w-1/2 grid-cols-12 items-center gap-4 border-b pb-1 mb-2 relative">

                <AssignNews data={props?.data} code={props?.code} />

                {
                    props?.type == 'video'
                        ?
                        <div className=" w-full col-span-4 object-cover bg-cover">
                            <VideoIndex data={props} />
                        </div>
                        :
                        <img
                            src={props?.source}
                            alt="image"
                            srcSet=""
                            className="border h-14 w-full col-span-4 object-cover bg-cover"
                        />
                }
                <div className="flex flex-col gap-1 col-span-8">
                    <span className="text-zinc-800 text-sm cursor-pointer hover:text-red-500"  onClick={() => navigate(`/news-details/${props?.data?.id}`)}>
                        {props?.heading}
                    </span>
                    <span className="text-sm text-zinc-500">{props?.date}</span>
                </div>
            </div>
        </>
    )
}

export default BottomComponent