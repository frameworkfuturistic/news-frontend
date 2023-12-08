import React, { useEffect, useState } from 'react'
import BrandingIndex from '../NaxatraComponents/Branding/BrandingIndex';
import NewsCategoriesIndex from '../NaxatraComponents/NewsCategories/NewsCategoriesIndex';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footerlayout from '../NaxatraComponents/Footer/Footerlayout';
import logo from '@/Components/assets/logo.webp'
import { BiLogOutCircle, BiUser } from 'react-icons/bi';
import { VscThreeBars } from 'react-icons/vsc';
import MobileToggle from '../NaxatraComponents/NewsCategories/MobileToggle';
import toast from 'react-hot-toast';

const NavBarRoutes = () => {

    const [toggle, setToggle] = useState(false)

    const navigate = useNavigate()

    let wpx = "1366px";

    const location = useLocation()

    useEffect(() => {

        window.scroll(0, -100);

        if (location?.pathname == '/mobile') {
            window.localStorage.setItem('device', 'mobile')
        }

    }, [])

    const logoutFun = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('userDetails')
        toast.success("Logout Successfully !!!")
        navigate('/mobile')
    }

    const token = window.localStorage.getItem('token') ?? ''
    const device = window.localStorage.getItem('device') ?? 'web'

    return (
        <>
            {device != 'mobile' &&
                <div className='fixed top-0 bg-white z-50'>
                    <BrandingIndex wpx={wpx} />
                    <div className='h-[1.7rem]'></div>
                    <NewsCategoriesIndex wpx={wpx} />
                </div>
            }

            {
                device == 'mobile' &&
                <div className='flex items-center justify-between p-2 fixed top-0 z-50 bg-white w-screen border-b'>
                    <div className='flex items-center gap-2'>
                        <span onClick={() => setToggle(!toggle)}><VscThreeBars size={24} /></span>
                        <span className=' text-sm font-semibold cursor-pointer relative ' onClick={() => navigate('/mobile')}>
                            <img src={logo} className='w-16' alt="" srcSet="" />
                        </span>
                        <span className='font-bold text-blue-950'>Naxatra News</span>
                    </div>

                    <div>
                        {
                            !token ? <button className='flex gap-1 items-center bg-green-600 hover:bg-green-500 select-none font-semibold text-white text-xs md:text-sm px-2 md:px-3 py-1.5' onClick={() => navigate('/mobile-login')}><BiUser size={18} />Login</button>
                                :
                                <button className='flex gap-1 items-center bg-red-600 hover:bg-red-500 select-none font-semibold text-white text-xs md:text-sm px-2 md:px-3 py-1.5' onClick={() => logoutFun()}><BiLogOutCircle size={18} />Logout</button>
                        }
                    </div>

                    <MobileToggle setToggle={toggle} />

                </div>
            }

            <div className={`w-full overflow-x-hidden flex justify-center items-center animate__animated animate__fadeIn animate__faster scroll-smooth ${device != 'mobile' ? "mt-[9.5rem] md:mt-[150px]" : "mt-[4.3rem]"} `}>
                <div className={`max-w-[${wpx}] h-full w-full`}>
                    <Outlet />
                </div>
            </div>
            {device != 'mobile' && <Footerlayout />}
        </>
    )
}

export default NavBarRoutes