
import { useFormik } from 'formik'
import React, { useState, useRef, useEffect } from "react";
import EXIF from 'exif-js'
import * as yup from 'yup'
import { FcCamera } from 'react-icons/fc'
import { RxCross2 } from 'react-icons/rx'
import exifr from 'exifr';
import { FaCamera } from 'react-icons/fa'
import { getCurrentDate } from '@/Components/Common/PowerUpFunctions';

const CameraCap = (props) => {

    // =====fetching application data============

    const [cameraUpload, setcameraUpload] = useState()
    const [cameraUrl, setcameraUrl] = useState(null)

    // ===========fetching application data end=========

    const modal = useRef(null)


    function dataURLtoFile(dataurl, filename) {

        const arr = dataurl.split(",");

        const mime = arr[0].match(/:(.*?);/)[1];

        const bstr = atob(arr[1]);

        let n = bstr.length;

        const u8arr = new Uint8Array(n);

        while (n--) {

            u8arr[n] = bstr.charCodeAt(n);

        }

        return new File([u8arr], filename, { type: mime });

    }



    //  ====enable camera========

    const videoRef = useRef(null);

    const canvasRef = useRef(null);

    const [imageData, setImageData] = useState(null);


    const startCamera = async (val) => {

        navigator.mediaDevices

            .getUserMedia({ video: true })

            .then((stream) => {

                videoRef.current && (videoRef.current.srcObject = stream)

                videoRef.current && (videoRef.current.onloadedmetadata = () => {

                    // set the canvas size to match the video stream size

                    canvasRef.current.width = videoRef.current.videoWidth;

                    canvasRef.current.height = videoRef.current.videoHeight;

                })

            })

            .catch((error) => {

                if (error.name === 'NotAllowedError') {

                    alert('Permission to access camera was not granted');

                } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {

                    alert('No camera found');
                    modal.current.close()

                } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {

                    alert('Could not start camera');

                } else {

                    alert('Error accessing camera');

                }

                console.log("Error accessing camera:", error);

            });

    };



    const stopCamera = () => {

        const stream = videoRef?.current?.srcObject;


        if (stream) {

            const tracks = stream.getTracks();



            tracks.forEach(track => track.stop());

            videoRef.current.srcObject = null;

        }

    };



    const captureImage = () => {

        const context = canvasRef.current.getContext("2d");

        context.drawImage(videoRef.current, 0, 0);

        const data = canvasRef.current.toDataURL("image/jpg");

        setImageData(data);

        // console.log('image data captured => ', data)

    };

    //  ====enable camera end ========


    const emptyFun = (val) => {


    }

    // ===========to get location from image end here==================

    // =====download image==========

    const handleDownload = () => {

        const link = document.createElement("a");

        link.href = imageData;

        // link.download = "./Images/CapturedImage.jpg";

        setcameraUrl(imageData)

        let data = dataURLtoFile(imageData, `CAM-${getCurrentDate()}.jpg`)

        props?.image(data)
        props?.imageUrl(imageData)

        // link.click();

        modal.current.close()

    };

    const handleModal = () => {
        modal.current.showModal()
        setImageData(null)
        startCamera()
    }

    const handleCloseModal = () => {
        stopCamera()
        modal.current.close()
    }

    return (

        <>

            <FaCamera size={22} className="text-blue-700" onClick={() => handleModal()} />

            {/* ========Modal==========*/}

            < dialog ref={modal} className="bg-gray-50 px-2 py-8 relative focus:outline-none animate__animated animate__zoomIn animate__faster backdrop:backdrop-brightness-50 backdrop:backdrop-blur-md w-full">

                <div className="absolute top-1 z-10 bg-red-200 hover:bg-red-300 right-1 rounded-full p-2 cursor-pointer" onClick={() => handleCloseModal()}>

                    <RxCross2 fontSize={16} />

                </div>


                {/* =======To open camera and take picture */}

                {/* <div className='flex justify-center gap-2'>

                    <button onClick={startCamera} className="text-sm px-4 py-1 bg-green-100 hover:bg-green-600 focus:bg-green-500 text-green-800 rounded-sm border border-green-600 hover:text-white focus:text-white shadow-md">Start Camera</button>

                    <button onClick={stopCamera} className="text-sm px-4 py-1 bg-red-100 hover:bg-red-600 focus:bg-red-500 text-red-800 rounded-sm border border-red-600 hover:text-white focus:text-white shadow-md">Stop Camera</button>

                </div> */}

                <div className='mt-6 w-full flex flex-wrap gap-4'>

                    {!imageData && <div>

                        <video ref={videoRef} autoPlay className='-scale-x-1' />

                        <canvas ref={canvasRef} style={{ display: "none" }} />

                        <div className='w-full flex justify-center gap-2 text-center my-4'>
                            <button onClick={captureImage} className="text-sm px-4 py-1 border border-blue-600 text-blue-600 bg-blue-100 hover:bg-blue-600 focus:bg-blue-600 hover:text-white focus:text-white shadow-md">Capture</button>
                        </div>

                    </div>}

                    {imageData && <>

                        <div className='mx-auto'>

                            <img src={imageData} alt="Captured Image" />

                            <div className='w-full my-4 flex gap-2 justify-center items-center'>

                                <button onClick={() => (setImageData(null), startCamera())} className="text-sm px-4 py-1 border border-blue-600 text-blue-600 bg-blue-100 hover:bg-blue-600 focus:bg-blue-600 hover:text-white focus:text-white shadow-md">Re-Capture</button>
                                <button onClick={handleDownload} className="text-sm px-4 py-1 border border-green-600 text-green-600 bg-green-100 hover:bg-green-600 focus:bg-green-600 hover:text-white focus:text-white shadow-md">Confirm</button>

                            </div>

                        </div>

                    </>}


                </div>




            </dialog >


        </>

    )

}



export default CameraCap
