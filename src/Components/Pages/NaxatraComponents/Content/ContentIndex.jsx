import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCalendarAlt, FaRegShareSquare, FaUserCircle } from "react-icons/fa";
import Video from "../Home/Video";
import "../Home/style.css";
import { useNavigate, useParams } from "react-router-dom";
import { contextVar } from "@/Components/Context/ContextVar";
import { newsJson } from "../Home/NewsJson";
import VideoIndex from "../Home/VideoIndex";
import toast from "react-hot-toast";
import ApiJsonHeader from "@/Components/Api/ApiJsonHeader";
import axios from "axios";
import { ApiList } from "@/Components/Api/ApiList";
import { codeCheck, indianDate } from "@/Components/Common/PowerUpFunctions";
import BrandLoader from "@/Components/Common/Loaders/BrandLoader";
import { FaShareFromSquare } from "react-icons/fa6";

const ContentIndex = () => {

  const { id, cId } = useParams()

  const { wpx, refresh } = useContext(contextVar)

  const { api_getActiveNewsList, api_getNews } = ApiList()

  const navigate = useNavigate()

  const [isPiPMode, setIsPiPMode] = useState(false);
  // State to track the currently playing video
  const [currentVideo, setCurrentVideo] = useState(null);
  const [data, setdata] = useState(null)

  const [newsList, setNewsList] = useState([])
  const [newsData, setNewsData] = useState(null)
  const [loader, setLoader] = useState(false)

  // Function to handle playing/pausing a video
  const handlePlay = (source) => {
    setCurrentVideo(source);
  };

  const videoRef = useRef(null);

  const handleEnterPiPMode = () => {
    if (videoRef.current && document.pictureInPictureEnabled) {
      videoRef.current.requestPictureInPicture().catch((error) => {
        console.error("Failed to enter PiP mode:", error);
      });
      setIsPiPMode(true);
    }
  };

  const handleExitPiPMode = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch((error) => {
        console.error("Failed to exit PiP mode:", error);
      });
      setIsPiPMode(false);
    }
  };

  // const handlePlayVideo = () => {
  //   // Pause the currently playing video before starting a new one
  //   if (currentVideo !== data.source) {
  //     setCurrentVideo(data.source);
  //     onPlay(data.source);
  //   } else if (isPlaying) {
  //     onPlay(null); // Pause the video
  //     setCurrentVideo(null);
  //   } else {
  //     onPlay(data.source);
  //     setCurrentVideo(data.source);
  //   }

  useEffect(() => {

    window.scroll(0, -100);

    const videoElement = videoRef.current;

    if (videoElement) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPiPMode(false);
          } else if (!isPiPMode) {
            // It's important to call handleEnterPiPMode within a user gesture
            // Here, we're using the Intersection Observer callback
            handleEnterPiPMode();
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(videoElement);

      return () => {
        observer.disconnect();
      };
    }
  }, [newsData?.rightMenu?.source, isPiPMode]);


  const getActiveStories = () => {

    setLoader(true)

    axios.post(api_getNews, { id: id }, ApiJsonHeader()).then((res) => {
      console.log("News by id data => ", res);
      if (res?.data?.status) {
        setNewsData(res?.data?.data)
      } else {
        toast.error(res?.data?.message)
      }
    }).finally(() => setLoader(false))
  };

  const getCategoryStories = () => {

    setLoader(true)

    axios.post(api_getActiveNewsList, {}, ApiJsonHeader()).then((res) => {
      console.log("Category news list response => ", res);
      if (res?.data?.status) {
        setNewsList(() => {
          return res?.data?.data?.filter(item => (item?.category_id == cId && !codeCheck(item?.section_renderer_code, 'COTTP')))
        })
      } else {
        toast.error(res?.data?.message)
      }
    }).finally(() => setLoader(false))
  };

  useEffect(() => {
    getActiveStories()
    getCategoryStories()
  }, [refresh, id, cId])

  const handleShare = async () => {
    try {
      if (navigator?.share) {

        const originalUrl = window.location.href;
        const trimmedUrl = originalUrl.substring(0, originalUrl.lastIndexOf('/'));

        await navigator.share({
          title: 'Check out this news',
          text: newsData?.title,
          url: trimmedUrl,
        });
      } else {
        throw new Error('Web Share API not supported.');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  const navigateFun = () => {
    const type = window.localStorage?.getItem('type')
    type == 'mobile' ? navigate('/mobile') : navigate('/')
  }



  return (
    <>

      {
        loader && <BrandLoader />
      }
      {!loader && <div className=" flex justify-center items-center animate__animated animate__fadeIn animate__faster p-2 md:p-0 md:mt-2 relative">

        <div
          className={` h-full w-full grid grid-cols-12 md:px-10 gap-8`}
        >
          <div className="w-full col-span-12 -mb-20 ">
            <button className={"px-4 py-1 text-xs md:text-sm bg-zinc-400 hover:bg-zinc-600 select-none rounded-sm hover:drop-shadow-md text-white cursor-pointer"} onClick={() => navigateFun()}>Back</button>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="w-full flex gap-2 flex-wrap my-2">
              {
                newsData?.storyTags?.map((elem) =>
                  <span className="w-max px-4 text-xs md:text-base py-0.5 rounded-full border border-zinc-600 text-zinc-700">
                    {elem?.tag_name}
                  </span>)
              }
            </div>
            <h1 className="text-lg md:text-xl">
              <span className=" font-semibold">{newsData?.title} </span>
            </h1>
            <div className="flex justify-between items-center text-sm my-2">
              <div className="flex gap-2 items-center">
                <span className="text-zinc-500 text-lg md:text-xl"><FaCalendarAlt /></span>
                {indianDate(newsData?.publication_date)} - {newsData?.publication_time}

                <attr className="text-blue-900 text-lg md:text-xl font-bold ml-10 cursor-pointer" title="Share Link" onClick={() => handleShare()}><FaShareFromSquare size={22} /></attr>
              </div>
              <div>
              </div>
            </div>
            <div className="flex justify-center">
              {
                newsData?.media_type == 'video' ?
                  <VideoIndex data={newsData} />
                  :
                  <img src={newsData?.file_name} alt="" srcset="" />
              }
            </div>
            <div className="my-4 mb-6">
              <div className="col-span-6 break-words" dangerouslySetInnerHTML={{ __html: newsData?.body }}></div>
            </div>

            {/* {
                newsData?.storySections?.map((elem) =>
                  <div className="mb-6">
                    <h3 className="mb-2 font-semibold">{elem.title}</h3>
                    {
                      elem?.media_type == 'video' ?
                        <VideoIndex data={elem} />
                        :
                        <img src={elem?.file_name} alt="" srcset="" />
                    }
                    <div className="mb-2">{elem.content}</div>
                  </div>
                )
              } */}
          </div>

          {Array.isArray(newsList) && newsList?.length > 0 && <div className="col-span-12 md:col-span-4 flex flex-col">

            {newsList[0]?.media_type == 'video'
              ?
              <>

                <Video
                  data={newsList[0]}
                  isPlaying={currentVideo === newsList[0]?.id}
                  onPlay={handlePlay}
                  currentVideo={currentVideo}
                  setCurrentVideo={setCurrentVideo}
                />
              </>
              :
              <img
                src={newsList[0]?.file_name}
                alt="Image"
                srcset=""
                className="border h-60 w-full"
              />}

            <div className="py-2 text-zinc-700">
              <span className="font-semibold text-xl line-clamp-2 text-ellipsis cursor-pointer hover:text-red-500" onClick={() => navigate(`/news-details/${newsList[0]?.story_id}/${newsList[0]?.category_id}/${newsList[0]?.category}/${newsList[0]?.story_title}`)}>
                {newsList[0]?.story_title}
              </span>
            </div>

            <div className="text-sm text-gray-500 flex justify-between">
              <span>{indianDate(newsList[0]?.publication_date)}</span>
            </div>

            <div className="text-sm text-gray-500 line-clamp-2 text-ellipsis">
              {newsList[0]?.story_body && <div dangerouslySetInnerHTML={{ __html: newsList[0]?.story_body }} />}
            </div>

            {newsList?.length > 1 && <div className="col-span-12 md:col-span-4 flex flex-col gap-6 md:h-[80vh] mt-10">
              <header className="w-full col-span-12 border-t border-b">
                <span className="font-semibold pb-2 border-t-4 w-max border-red-600 pt-2 block">
                  You May Also Like
                </span>
              </header>

              <div className=" overflow-y-auto ">
                {newsList?.slice(1,)?.map((elem) => (
                  <>
                    <div className="grid grid-cols-12 items-center gap-4 border-b pb-1 mb-2">

                      {
                        elem?.type == 'video'
                          ?
                          <div className=" h-14 w-full col-span-4 object-cover bg-cover">
                            <VideoIndex data={elem} />
                          </div>
                          :
                          <img
                            src={elem?.file_name}
                            alt="image"
                            srcSet=""
                            className="border h-14 w-full col-span-4 object-cover bg-cover"
                          />
                      }
                      <div className="flex flex-col gap-1 col-span-8">
                        <span className="text-zinc-800 text-sm cursor-pointer hover:text-red-500" onClick={() => navigate(`/news-details/${elem?.story_id}/${elem?.category_id}/${elem?.category}/${elem?.story_title}`)}>
                          {elem?.story_title}
                        </span>
                        <span className="text-sm text-zinc-500">{indianDate(elem?.publication_date)}</span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>}

          </div>}

        </div>

      </div>}
    </>
  );
};

export default ContentIndex;