import React from 'react'

const VideoIndex = (props) => {

    return (
        <>
            <iframe src={props?.data?.file_name} style={{border: '0'}}></iframe>
        </>
    )
}

export default VideoIndex