import React from 'react'
import './barloader.css'

function BarLoader() {
    return (
        <div className='p-4 w-screen h-screen fixed z-50 top-0 left-0 flex justify-center items-center backdrop-brightness-75' style={{ 'zIndex': 999 }}>
            <div class="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

    )
}

export default BarLoader