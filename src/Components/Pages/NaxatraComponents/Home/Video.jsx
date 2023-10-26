import React, { useState, useEffect, useRef } from 'react';
import './style.css'

const Video = ({ data, onPlay, isPlaying, setCurrentVideo, currentVideo }) => {
  const [isPiPMode, setIsPiPMode] = useState(false);
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

  const handlePlayVideo = () => {
    // Pause the currently playing video before starting a new one
    if (currentVideo !== data?.id) {
      setCurrentVideo(data?.id);
      onPlay(data?.id);
    } else if (isPlaying) {
      onPlay(null); // Pause the video
      setCurrentVideo(null);
    } else {
      onPlay(data?.id);
      setCurrentVideo(data?.id);
    }
  };

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
  }, [data, isPiPMode]);

  console.log("main video component ::::::::", data)

  return (
    <div>
      <video
        ref={videoRef}
        controls
        onError={(e) => console.log('Error loading video:', e)}
        className={`border ${isPiPMode ? 'pip-mode' : ''}`}
        onPlay={handlePlayVideo}
      >
        <source src={data?.source} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* {isPiPMode ? (
        <button onClick={handleExitPiPMode}>Exit PiP Mode</button>
      ) : (
        <button onClick={handleEnterPiPMode}>Enter PiP Mode</button>
      )} */}
    </div>
  );
};

export default Video;
