import React, { useEffect, useRef, useState } from 'react'
import Video from './Video';

const PIPIndex = (props) => {

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
    }, [props?.data, isPiPMode]);

    return (
        <>
            <Video
                data={props?.data}
                isPlaying={currentVideo === props?.data?.id}
                onPlay={handlePlay}
                currentVideo={currentVideo}
                setCurrentVideo={setCurrentVideo}
            />
        </>
    )
}

export default PIPIndex