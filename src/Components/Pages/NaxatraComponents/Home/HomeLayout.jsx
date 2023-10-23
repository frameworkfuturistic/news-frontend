import React, { useEffect, useRef, useState } from "react";
import './style.css'
import Video from "./Video";
import VideoIndex from "./VideoIndex";

const HomeLayout = (props) => {

  const [isPiPMode, setIsPiPMode] = useState(false);
  // State to track the currently playing video
  const [currentVideo, setCurrentVideo] = useState(null);

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
  }, [props?.data?.rightMenu?.source, isPiPMode]);


  return (
    <>
      <div
        className={`h-full w-full grid grid-cols-12 gap-8 md:px-4 p-2 py-4 mb-6 border-b ${props?.index % 2 == 0 && 'bg-zinc-50 shadow-sm border-t'}`}
      >
        {props?.data?.news?.header && (
          <header className="w-full col-span-12 border-t border-b">
            <span className="font-semibold pb-2 border-t-4 w-max border-red-600 pt-2 block">
              {props?.data?.news?.header}
            </span>
          </header>
        )}

        <div className="col-span-12 md:col-span-4 flex flex-col">
          <img
            src={props?.data?.news?.source}
            alt="Image"
            srcset=""
            className="border h-60 w-full"
          />

          <div className="py-2 text-zinc-700">
            <span className="font-semibold text-xl line-clamp-2 text-ellipsis cursor-pointer hover:text-red-500" onClick={() => props?.getFun(props?.data?.news?.id, props?.index)}>
              {props?.data?.news?.heading}
            </span>
          </div>

          <div className="text-sm text-gray-500 flex justify-between">
            <span>{props?.data?.news?.author}</span>
            <span>{props?.data?.news?.date}</span>
          </div>

          <div className="text-sm text-gray-500 line-clamp-2 text-ellipsis">
            {props?.data?.news?.content}
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 flex flex-col gap-6 md:h-[55vh]">

          <header className="w-full col-span-12 border-t border-b">
            <span className="font-semibold pb-2 border-t-4 w-max border-red-600 pt-2 block">
              You May Also Like
            </span>
          </header>

          <div className="overflow-y-auto">
            {props?.data?.news?.map((elem) => (
              <>
                <div className="grid grid-cols-12 items-center gap-4 border-b pb-1 mb-2">
                    <img
                      src={elem?.image}
                      alt="image"
                      srcSet=""
                      className="border h-14 w-full col-span-4 object-cover bg-cover"
                    />
                  <div className="flex flex-col gap-1 col-span-8">
                    <span className="text-zinc-800 text-sm cursor-pointer hover:text-red-500" onClick={() => props?.getFun(elem?.id, props?.index)}>
                      {elem?.heading}
                    </span>
                    <span className="text-sm text-zinc-500">{elem?.date}</span>
                  </div>
                </div>
              </>
            ))}
          </div>

        </div>

        <div className="col-span-12 md:col-span-4 flex flex-col">

          {props?.data?.news[props?.data?.news?.length - 1]?.header && (
            <header className="w-full col-span-12 border-t border-b">
              <span className="font-semibold pb-2 border-t-4 w-max border-red-600 pt-2 block">
                {props?.data?.news[props?.data?.news?.length - 1]?.header}
              </span>
            </header>
          )}


          {props?.data?.news[props?.data?.news?.length - 1]?.type == 'video'
            ?
            <>

              <VideoIndex
                data={props?.data}
              />
            </>
            :
            <img
              src={props?.data?.news[props?.data?.news?.length - 1]?.image}
              alt="Image"
              srcset=""
              className="border h-60 w-full"
            />}

          <div className="py-2 text-zinc-700">
            <span className="font-semibold text-xl line-clamp-2 text-ellipsis cursor-pointer hover:text-red-500" onClick={() => props?.getFun(props?.data?.news[props?.data?.news?.length - 1]?.id, props?.index)}>
              {props?.data?.news[props?.data?.news?.length - 1]?.heading}
            </span>
          </div>

          <div className="text-sm text-gray-500 flex justify-between">
            <span>{props?.data?.news[props?.data?.news?.length - 1]?.author}</span>
            <span>{props?.data?.news[props?.data?.news?.length - 1]?.date}</span>
          </div>

          <div className="text-sm text-gray-500 line-clamp-2 text-ellipsis">
            {props?.data?.news[props?.data?.news?.length - 1]?.content}
          </div>
        </div>

      </div>
    </>
  );
};

export default HomeLayout;
