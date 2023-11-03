import React from 'react'

const NewsCard = (props) => {
  return (
    <>
        <div className='bg-white drop-shadow-lg md:w-1/4 w-[90vw] mb-4 rounded'>

            <div className='flex justify-center'>
            <img src={props?.image} className='h-[30vh] bg-contain object-contain bg-slate-100 ' alt="" srcset="" />
            </div>
            <h6 className='px-4 py-2 text-lg font-semibold text-cyan-900'>{props?.title}</h6>
            <p className='px-4 py-2 text-sm text-ellipsis line-clamp-5 truncate'>{props?.desc}</p>
            <div className='flex w-full'>
                <span className='py-1.5 bg-cyan-600 w-full text-center text-white block hover:bg-cyan-600 text-sm cursor-pointer' onClick={() => props?.handleContent('edit', props?.index)}>Edit</span>
                <span className='py-1.5 bg-red-400 w-full text-center text-white block hover:bg-red-600 text-sm cursor-pointer' onClick={() => props?.handleContent('delete', props?.index)}>Delete</span>
            </div>

        </div>
    </>
  )
}

export default NewsCard