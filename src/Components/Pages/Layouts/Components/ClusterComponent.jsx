import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ClusterComponent = ({ data = [], split = '1' }) => {

    const [width, setWidth] = useState('w-full md:w-full')
    const [container, setContainer] = useState('w-full')

    const navigate = useNavigate()

    useEffect(() => {
        switch(split){
            case '1': {
                setWidth('w-full md:w-[calc(100%/1.2)]')
                setContainer('w-[100%*1]')
            } break;
            case '2': {
                setWidth('w-full md:w-[calc(100%/2.2)]')
                setContainer('w-[100%*2]')
            } break;
            case '3': {
                setWidth('w-full md:w-[calc(100%/3.2)]')
                setContainer('w-[100%*3]')
            } break;
            case '4': {
                setWidth('w-full md:w-[calc(100%/4.2)]')
                setContainer('w-[100%*4]')
            } break;
            case '5': {
                setWidth('w-full md:w-[calc(100%/5.2)]')
                setContainer('w-[100%*5]')
            } break;
        }
    },[split])
    
    
    return (
        <div className={`${container} h-full flex flex-wrap gap-4 overflow-x-auto justify-between`}>
            {
                data?.slice(1, parseInt(split)+1)?.map((elem, index) =>
                    <>
                        <div className={`${width} grid grid-cols-12 border-t border-gray-300 p-2`} key={index}>
                            
                                <img src={elem?.image} alt="" srcset="" className='col-span-4 object-contain bg-contain h-16' />

                            <div className="col-span-8">
                                <h1 className='hover:text-red-500 text-ellipsis line-clamp-3 font-semibold text-gray-700 text-sm cursor-pointer' onClick={() => navigate(`/news-details/${elem?.id}/0`)}>
                                    {elem?.heading}
                                </h1>
                            </div>

                        </div>
                    </>
                )
            }
        </div>
    )
}

export default ClusterComponent