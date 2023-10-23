import React, { useEffect } from 'react'
import HeadComponent from './Components/HeadComponent'
import ClusterComponent from './Components/ClusterComponent';
import VideoIndex from '../NaxatraComponents/Home/VideoIndex';
import { useNavigate } from 'react-router-dom';


const Component13 = (props) => {

  const navigate = useNavigate()

useEffect(() => {
  window.scroll(0,-50);
},[])

  
  return (
    <>

      <div id={props?.data?.categoryId} className='border-t border-b h-[25rem] w-full bg-white flex flex-col md:px-4 px-2 mb-4 md:mb-6 relative'>

        <div className='w-full h-[80%]'>

          <HeadComponent
          index={props?.index}
            heading={props?.data?.news[0]?.heading}
            cid={props?.data?.news[0]?.id}
            content={props?.data?.news[0]?.sections[0]?.content}
            source={props?.data?.news[0]?.source}
            type={props?.data?.news[0]?.type}
          />

          <span className='text-sm bg-red-600 text-white font-semibold px-4 py-1 absolute top-0 left-6'>{props?.data?.category}</span>

        </div>

        <div className=' w-full h-[100px] '>
            <ClusterComponent index={props?.index} data={props?.data?.news} split={'3'} />
        </div>

      </div>

      {
            props?.data?.news?.length > 3 && 
            <>
             <div className="col-span-12 md:col-span-4 flex flex-col gap-6 md:h-[80vh] mt-10">
                <header className="w-full col-span-12 border-t border-b">
                  <span className="font-semibold pb-2 border-t-4 w-max border-red-600 pt-2 block">
                    You May Also Like
                  </span>
                </header>

                <div className="w-full flex flex-wrap h-[30rem] overflow-y-auto ">
                  {props?.data?.news?.map((elem) => (
                    <>
                      <div className="grid w-1/2 grid-cols-12 items-center gap-4 border-b pb-1 mb-2">

                        {
                          elem?.type == 'video'
                            ?
                            <div className=" h-14 w-full col-span-4 object-cover bg-cover">
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
                          <span className="text-zinc-800 text-sm cursor-pointer hover:text-red-500" onClick={() => navigate(`/news-details/${elem?.id}/${props?.index}`)}>
                            {elem?.heading}
                          </span>
                          <span className="text-sm text-zinc-500">{elem?.date}</span>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </> 
          }

    </>
  )
}

export default Component13