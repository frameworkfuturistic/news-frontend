import React, { useEffect, useRef, useState } from "react";
import './style.css'
import Video from "./Video";

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
        <div className="w-screen flex justify-center items-center animate__animated animate__fadeIn animate__faster mt-8">
          <div
            className={`max-w-[${props?.wpx}] h-full w-full grid grid-cols-12 md:px-10 gap-8`}
          >
            {props?.data?.bigNews?.header && (
              <header className="w-full col-span-12 border-t border-b">
                <span className="font-semibold pb-2 border-t-4 w-max border-red-600 pt-2 block">
                  {props?.data?.bigNews?.header}
                </span>
              </header>
            )}

            <div className="col-span-12 md:col-span-4 flex flex-col">
              <img
                src={props?.data?.bigNews?.image}
                alt="Image"
                srcset=""
                className="border h-60 w-full"
              />

              <div className="py-2 text-zinc-700">
                <span className="font-semibold text-xl line-clamp-2 text-ellipsis cursor-pointer hover:text-red-500" onClick={() => props?.getFun(props?.data?.rightMenu?.id)}>
                  {props?.data?.bigNews?.heading}
                </span>
              </div>

              <div className="text-sm text-gray-500 flex justify-between">
                <span>{props?.data?.bigNews?.author}</span>
                <span>{props?.data?.bigNews?.date}</span>
              </div>

              <div className="text-sm text-gray-500 line-clamp-2 text-ellipsis">
                {props?.data?.bigNews?.content}
              </div>
            </div>

            <div className="col-span-12 md:col-span-4 flex flex-col gap-6 overflow-y-auto md:h-[45vh]">
              {props?.data?.smallNews?.map((elem) => (
                <>
                  <div className="flex items-center gap-2">
                    <div>
                      <img
                        src={elem?.image}
                        alt="image"
                        srcSet=""
                        className="border h-14"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-800 text-sm cursor-pointer hover:text-red-500" onClick={() => props?.getFun(elem?.id)}>
                        {elem?.heading}
                      </span>
                      <span className="text-sm text-zinc-500">{elem?.date}</span>
                    </div>
                  </div>
                </>
              ))}
            </div>

            <div className="col-span-12 md:col-span-4 flex flex-col">

              {props?.data?.rightMenu?.header && (
                <header className="w-full col-span-12 border-t border-b">
                  <span className="font-semibold pb-2 border-t-4 w-max border-red-600 pt-2 block">
                    {props?.data?.rightMenu?.header}
                  </span>
                </header>
              )}


              {props?.data?.rightMenu?.type == 'video'
                ?
                <>
                  {/* <video
                  controls
                  onError={(e) => console.log('Error loading video:', e)}
                  className={`border ${isPiPMode ? 'pip-mode' : ''}`}
                  onPlay={() => handleVideoPlay(props.data.rightMenu.source)}
                >
                  <source src={props.data.rightMenu.source} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {isPiPMode && (
                  <button onClick={handleExitPiPMode}>Exit PiP Mode</button>
                )}
                {!isPiPMode && (
                  <button onClick={handlePiPMode}>Enter PiP Mode</button>
                )} */}

                  <Video
                    data={props?.data?.rightMenu}
                    isPlaying={currentVideo === props?.data?.rightMenu?.id}
                    onPlay={handlePlay}
                    currentVideo={currentVideo}
                    setCurrentVideo={setCurrentVideo}
                  />
                  {/* {isPiPMode && (
                  <button onClick={() => handleExitPiPMode()}>Exit PiP Mode</button>
                )}
                {!isPiPMode && (
                  <button onClick={() => handleEnterPiPMode()}>Enter PiP Mode</button>
                )} */}

                </>
                :
                <img
                  src={props?.data?.bigNews?.image}
                  alt="Image"
                  srcset=""
                  className="border h-60 w-full"
                />}

              <div className="py-2 text-zinc-700">
                <span className="font-semibold text-xl line-clamp-2 text-ellipsis cursor-pointer hover:text-red-500" onClick={() => props?.getFun(props?.data?.rightMenu?.id)}>
                  {props?.data?.rightMenu?.heading}
                </span>
              </div>

              <div className="text-sm text-gray-500 flex justify-between">
                <span>{props?.data?.rightMenu?.author}</span>
                <span>{props?.data?.rightMenu?.date}</span>
              </div>

              <div className="text-sm text-gray-500 line-clamp-2 text-ellipsis">
                {props?.data?.rightMenu?.content}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default HomeLayout;
