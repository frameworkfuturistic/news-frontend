import React, { useEffect, useRef } from 'react'
import HeadComponent from './Components/HeadComponent'
import ClusterComponent from './Components/ClusterComponent';
import VideoIndex from '../NaxatraComponents/Home/VideoIndex';
import { useNavigate, useParams } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import { LiaEditSolid } from 'react-icons/lia'
import AssignNews from '../NaxatraComponents/Home/AssignNews';
import BottomComponent from './Components/BottomComponent';
import { codeCheck } from '@/Components/Common/PowerUpFunctions';

const Component13 = (props) => {

  console.log(`incoming ${props?.code}01`, props?.data, props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}01`))[0])

  useEffect(() => {
    window.scroll(0, -50);
  }, [])


  return (
    <>

      <div id={props?.data?.categoryId} className='border-t border-b h-full md:h-[25rem] w-full bg-white flex flex-col md:px-4 px-2 mb-4 md:mb-6 relative'>

        <div className='w-full h-[80%]'>

          <AssignNews data={props?.data} code={`${props?.code}01`} storyList={props?.storyList} cId={props?.cdata?.id} cname={props?.cdata?.category} />

          <HeadComponent
            // auth={props?.data?.section_renderer_code == `${props?.code}01`}
            data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}01`))[0]}
          />

          <span className='text-sm bg-red-600 text-white font-semibold px-4 py-1 absolute top-0 left-6'>{props?.cdata?.category}</span>

        </div>

        <div className=' w-full h-[100px] '>
          <div className={`w-[100%*3] h-full flex flex-wrap gap-4 overflow-x-auto justify-start`}>
            <ClusterComponent cname={props?.cdata?.category}  cId={props?.cdata?.id} data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}02`))[0]} auth={props?.data?.section_renderer_code == `${props?.code}02`} code={`${props?.code}02`} storyList={props?.storyList} />
            <ClusterComponent cname={props?.cdata?.category}  cId={props?.cdata?.id} data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}03`))[0]} auth={props?.data?.section_renderer_code == `${props?.code}03`} code={`${props?.code}03`} storyList={props?.storyList} />
            <ClusterComponent cname={props?.cdata?.category}  cId={props?.cdata?.id} data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}04`))[0]} auth={props?.data?.section_renderer_code == `${props?.code}04`} code={`${props?.code}04`} storyList={props?.storyList} />
          </div>
        </div>

      </div>

      <div className="col-span-12 md:col-span-4 flex flex-col gap-6 h-auto mb-4  mt-10">
        <header className="w-full col-span-12 border-t border-b">
          <span className="font-semibold pb-2 border-t-4 w-max border-red-600 pt-2 block">
            You May Also Like
          </span>
        </header>

        <div className="w-full flex flex-wrap overflow-y-auto relative">

          <BottomComponent cname={props?.cdata?.category}  cId={props?.cdata?.id} auth={props?.data?.section_renderer_code == `${props?.code}05`} code={`${props?.code}05`} data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}05`))[0]} storyList={props?.storyList} />
          <BottomComponent cname={props?.cdata?.category}  cId={props?.cdata?.id} auth={props?.data?.section_renderer_code == `${props?.code}06`} code={`${props?.code}06`} data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}06`))[0]} storyList={props?.storyList} />
          <BottomComponent cname={props?.cdata?.category}  cId={props?.cdata?.id} auth={props?.data?.section_renderer_code == `${props?.code}07`} code={`${props?.code}07`} data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}07`))[0]} storyList={props?.storyList} />
          <BottomComponent cname={props?.cdata?.category}  cId={props?.cdata?.id} auth={props?.data?.section_renderer_code == `${props?.code}08`} code={`${props?.code}08`} data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}08`))[0]} storyList={props?.storyList} />
          <BottomComponent cname={props?.cdata?.category}  cId={props?.cdata?.id} auth={props?.data?.section_renderer_code == `${props?.code}09`} code={`${props?.code}09`} data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}09`))[0]} storyList={props?.storyList} />
          <BottomComponent cname={props?.cdata?.category}  cId={props?.cdata?.id} auth={props?.data?.section_renderer_code == `${props?.code}10`} code={`${props?.code}10`} data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}10`))[0]} storyList={props?.storyList} />
          <BottomComponent cname={props?.cdata?.category}  cId={props?.cdata?.id} auth={props?.data?.section_renderer_code == `${props?.code}11`} code={`${props?.code}11`} data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}11`))[0]} storyList={props?.storyList} />
          <BottomComponent cname={props?.cdata?.category}  cId={props?.cdata?.id} auth={props?.data?.section_renderer_code == `${props?.code}12`} code={`${props?.code}12`} data={props?.data?.filter(item => (item?.section_renderer_code == `${props?.code}12`))[0]} storyList={props?.storyList} />

        </div>
      </div>

    </>
  )
}

export default Component13