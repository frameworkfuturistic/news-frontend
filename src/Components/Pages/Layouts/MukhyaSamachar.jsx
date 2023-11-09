import React, { useEffect } from 'react'
import MHeadComponent from './Components/MHeadComponent'
import MClusterComponent from './Components/MClusterComponent';
import VideoIndex from '../NaxatraComponents/Home/VideoIndex';
import { useNavigate, useParams } from 'react-router-dom';
import AssignNews from '../NaxatraComponents/Home/AssignNews';
import { useRef } from 'react';


const MukhyaSamachar = (props) => {

  const navigate = useNavigate()

  const { type } = useParams()

  const dialogRef = useRef()

  useEffect(() => {
    window.scroll(0, -50);
  }, [])


  return (
    <>

      <div id={props?.data?.categoryId} className='border-t border-b h-full md:h-[35rem] w-full bg-slate-600  flex flex-col md:px-4 px-2 mb-4 md:mb-6 relative'>

        <div className='w-full h-[80%]  '>

          <AssignNews data={props?.data} code={`${props?.code}01`} />


          <MHeadComponent
            auth={props?.data?.section_rendered_code == `${props?.code}01`}
            data={props?.data}
          />

        </div>

        <div className=' w-full h-[100px] '>
          <div className={`w-[100%*3] h-full flex flex-wrap gap-4 overflow-x-auto justify-start`}>
            <MClusterComponent data={props?.data} auth={props?.data?.section_rendered_code == `${props?.code}02`} code={`${props?.code}02`} />
            <MClusterComponent data={props?.data} auth={props?.data?.section_rendered_code == `${props?.code}03`} code={`${props?.code}03`} />
            <MClusterComponent data={props?.data} auth={props?.data?.section_rendered_code == `${props?.code}04`} code={`${props?.code}04`} />
          </div>
        </div>

      </div>

    </>
  )
}

export default MukhyaSamachar