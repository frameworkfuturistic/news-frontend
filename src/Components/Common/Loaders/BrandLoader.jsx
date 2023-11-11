import React from 'react'
import logo from '@/Components/assets/logohd.png'

function BarLoader() {
    return (
        <div className='p-4 w-screen h-screen absolute top-0 left-0 flex justify-center items-center backdrop-brightness-50 ' style={{ 'zIndex': 1000 }}>
            <div className='relative '>
                <img src={logo} alt="" srcset="" className='rounded-full h-20 w-20' />
                <div className='h-20 w-20 absolute top-0 rounded-full border-red-200 border-t-4 border-b-4 animate-spin'></div>
            </div>
        </div>

    )
}

export default BarLoader