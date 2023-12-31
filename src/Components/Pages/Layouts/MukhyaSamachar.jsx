import React, { useEffect } from 'react'
import MHeadComponent from './Components/MHeadComponent'
import MClusterComponent from './Components/MClusterComponent';
import AssignNews from '../NaxatraComponents/Home/AssignNews';


const MukhyaSamachar = (props) => {

  console.log(`incoming ${props?.code}01`, props?.data, props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}01`))[0])

  useEffect(() => {
    window.scroll(0, -50);
  }, [])


  return (
    <>

      <div id={props?.data?.categoryId} className='border-t border-b h-full md:h-max w-full bg-slate-600 shadow-xl rounded-xl flex flex-col md:px-4 px-2 mb-6 relative'>

        <div className='w-full h-[90%]  '>

          <AssignNews data={props?.data} code={`${props?.code}01`}  cList={props?.categoryList} storyList={props?.storyList} />


          <MHeadComponent
            data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}01`) == true)[0]}
            mediaList={props?.mediaList}
          />

        </div>

        <div className=' w-full h-[10%] pb-4'>
          <div className={`w-[100%*3] h-max flex flex-wrap gap-4 overflow-x-auto justify-start`}>
            <MClusterComponent  cList={props?.categoryList} data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}02`) == true)[0]} auth={props?.data?.section_renderer_code == `${props?.code}02`} code={`${props?.code}02`} storyList={props?.storyList} />
            <MClusterComponent  cList={props?.categoryList} data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}03`) == true)[0]} auth={props?.data?.section_renderer_code == `${props?.code}03`} code={`${props?.code}03`} storyList={props?.storyList} />
            <MClusterComponent  cList={props?.categoryList} data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}04`) == true)[0]} auth={props?.data?.section_renderer_code == `${props?.code}04`} code={`${props?.code}04`} storyList={props?.storyList} />
          </div>
        </div>

      </div>

    </>
  )
}

export default MukhyaSamachar