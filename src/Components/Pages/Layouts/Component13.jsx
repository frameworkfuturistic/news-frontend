import React, { useEffect } from 'react'
import HeadComponent from './Components/HeadComponent'
import ClusterComponent from './Components/ClusterComponent';


const Component13 = (props) => {

useEffect(() => {
  window.scroll(0,-50);
},[])

console.log(props?.data?.news[0]?.id)
  
  return (
    <>

      <div className='border-t border-b h-[25rem] w-full bg-white flex flex-col md:px-4 px-2 mb-4 md:mb-6 relative'>

        <div className='w-full h-[80%]'>

          <HeadComponent
            heading={props?.data?.news[0]?.heading}
            cid={props?.data?.news[0]?.id}
            content={props?.data?.news[0]?.sections[0]?.content}
            source={props?.data?.news[0]?.source}
            type={props?.data?.news[0]?.type}
          />

          <span className='text-xs bg-red-600 text-white font-semibold px-4 py-1 absolute top-0 left-6'>मुख्य समाचार</span>

        </div>

        <div className=' w-full h-[100px] '>
            <ClusterComponent data={props?.data?.news} split={'3'} />
        </div>

      </div>
    </>
  )
}

export default Component13