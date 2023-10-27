import React from 'react'
import './barloader.css'

function BarLoader() {
    return (
        <div className='p-4 w-screen h-screen fixed top-0 left-0 flex justify-center items-center' style={{ 'zIndex': 1000 }}>
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