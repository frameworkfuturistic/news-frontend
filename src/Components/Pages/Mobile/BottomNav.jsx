import React from 'react'
import { FaPhotoVideo, FaRegUser } from 'react-icons/fa'
import { RiHome2Fill, RiHome2Line, RiProfileFill, RiProfileLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

const BottomNav = () => {
    return (
        <>
            <nav className='flex justify-between bg-blue-800 text-white font-normal border-t border-blue-800'>

                <NavLink to='/mobile/media-master' className={({ isActive }) => (isActive ? "text-blue-800 bg-white " : "text-white ") + " w-1/3 py-1 flex flex-col items-center justify-center text-xs"}>
                    <FaPhotoVideo size={22} />
                    Media
                </NavLink>

                <NavLink to='/mobile/report-master' className={({ isActive }) => (isActive ? "text-blue-800 bg-white " : "text-white ") + " w-1/3 py-1 flex flex-col items-center justify-center text-xs"}>
                    <RiProfileLine size={22} />
                    News
                </NavLink>

                <NavLink to='/mobile/profile' className={({ isActive }) => (isActive ? "text-blue-800 bg-white " : "text-white ") + " w-1/3 py-1 flex flex-col items-center justify-center text-xs"}>
                    <FaRegUser size={22} />
                    Profile
                </NavLink>

            </nav>
        </>
    )
}

export default BottomNav