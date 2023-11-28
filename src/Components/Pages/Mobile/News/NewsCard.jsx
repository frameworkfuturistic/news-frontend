import React from 'react'
import { MdOutlineEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'

const NewsCard = (props) => {
    return (
        <>
            <div className='bg-white drop-shadow-lg md:w-1/4 w-[90vw] mb-4 rounded'>

                <div className='flex justify-center bg-slate-100 p-2'>
                    {props?.image != '' ? <img src={props?.image} className='h-[30vh] bg-contain object-contain ' alt="" srcset="" />
                    :
                    <>
                        <div className="w-full h-[30vh] flex justify-center items-center">
                            <span>No Media Uploaded</span>
                        </div>
                    </>}
                </div>
                <h6 className='px-4 py-2 text-lg mt-4 font-semibold text-cyan-900'>{props?.title}</h6>
                <div className='px-4 py-2 text-sm break-words'  dangerouslySetInnerHTML={{ __html: props?.desc }}></div>
                <div className='flex w-full mt-2'>
                    <span className='py-1.5 bg-cyan-600 w-full text-center text-white hover:bg-cyan-600 text-sm cursor-pointer flex justify-center items-center gap-1' onClick={() => props?.handleContent('edit', props?.index)}> <MdOutlineEdit/> Edit</span>
                    <span className='py-1.5 bg-red-400 w-full text-center text-white hover:bg-red-600 text-sm cursor-pointer flex justify-center items-center gap-1' onClick={() => props?.handleContent('delete', props?.index)}> <RiDeleteBin6Line /> Delete</span>
                </div>

            </div>
        </>
    )
}

export default NewsCard