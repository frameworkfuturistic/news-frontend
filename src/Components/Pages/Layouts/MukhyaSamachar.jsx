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

          <AssignNews type={'top'} data={props?.data} />

          <MHeadComponent
            cIndex={props?.ind}
            categoryId={props?.data?.categoryId}
            heading={props?.data?.news[0]?.heading}
            cid={props?.data?.news[0]?.id}
            content={props?.data?.news[0]?.sections[0]?.content}
            source={props?.data?.news[0]}
            type={props?.data?.news[0]?.type}
            csource={props?.data?.news[0]?.sections[0]}
          />

          {/* <span className='text-sm bg-red-600 text-white font-semibold px-4 py-1 absolute top-0 left-6'>{props?.data?.category}</span> */}

        </div>

        <div className=' w-full h-[100px] '>
          <MClusterComponent data={props?.data?.news} allData={props?.data} split={'3'} />
        </div>

      </div>

      {
        type != 'edit' && props?.data?.news?.length > 4 &&
        <>
          <div className="col-span-12 md:col-span-4 flex flex-col gap-6 h-auto mb-4 mt-10">
            <header className="w-full col-span-12 border-t border-b">
              <span className="font-semibold pb-2 border-t-4 w-max border-red-600 pt-2 block">
                You May Also Like
              </span>
            </header>

            <div className="w-full flex flex-wrap overflow-y-auto relative">

              {props?.data?.news?.length > 12 && <span className='text-xs select-none cursor-pointer absolute bottom-1 right-1 bg-slate-300 px-4 py-1 hover:bg-slate-400 hover:text-white' onClick={() => dialogRef.current.showModal()}>See More &gt;&gt;</span>}

              {props?.data?.news?.slice(4, 12)?.map((elem) => (
                <>
                  <div className="grid w-full md:w-1/2 grid-cols-12 items-center gap-4 border-b pb-1 mb-2">

                    {
                      elem?.type == 'video'
                        ?
                        <div className=" overflow-hidden w-full col-span-4 object-cover bg-cover">
                          <VideoIndex data={elem} />
                        </div>
                        :
                        <img
                          src={elem?.source}
                          alt="image"
                          srcSet=""
                          className="border h-20 w-full col-span-4 object-cover bg-cover"
                        />
                    }
                    <div className="flex flex-col gap-1 col-span-8">
                      <span className="text-slate-50 text-sm cursor-pointer hover:text-red-500" onClick={() => navigate(`/news-details/${elem?.id}/${elem?.categoryId}`)}>
                        {elem?.heading}
                      </span>
                      <span className="text-sm text-slate-50">{elem?.date}</span>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>

          <dialog ref={dialogRef} className='p-4 focus:outline-none backdrop:backdrop-brightness-75 animate__animated animate__zoomIn animate__faster md:w-1/2 w-full relative'>

            <span className='p-1 rounded-full bg-red-400 hover:bg-red-500 text-white cursor-pointer absolute top-1 right-1' onClick={() => dialogRef.current.close()}><RxCross2 /></span>

            <div>

              <h1 className=' text-2xl font-semibold text-center border-b pb-1 mb-4'>{props?.data?.category} News</h1>

              {props?.data?.news?.map((elem) => (
                <>
                  <div className="grid w-full grid-cols-12 items-center gap-4 bg-slate-100 hover:bg-slate-200 border drop-shadow-md py-1 mb-2">

                    {
                      elem?.type == 'video'
                        ?
                        <div className=" w-full col-span-4 object-cover bg-cover">
                          <VideoIndex data={elem} />
                        </div>
                        :
                        <img
                          src={elem?.source}
                          alt="image"
                          srcSet=""
                          className="border h-14 w-full col-span-4 object-cover bg-cover"
                        />
                    }
                    <div className="flex flex-col gap-1 col-span-8">
                      <span className="text-zinc-800 text-sm cursor-pointer hover:text-red-500" onClick={() => navigate(`/news-details/${elem?.id}/${props?.data?.categoryId}`)}>
                        {elem?.heading}
                      </span>
                      <span className="text-sm text-zinc-500">{elem?.date}</span>
                    </div>
                  </div>
                </>
              ))}
            </div>

          </dialog>

        </>
      }

    </>
  )
}

export default MukhyaSamachar