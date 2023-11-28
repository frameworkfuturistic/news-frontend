///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 👉 Author      : R U Bharti
// 👉 Component   : Protected Routes
// 👉 Status      : Closed
// 👉 Description : Restrict the outlets to open without authorization and show sidebar
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// 👉 Importing Components and libraries 👈
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import TopHeader from './TopHeader'
import DashboardSidebarIndex from './SideBar/DashboardSidebarIndex'
import BottomNav from '../Mobile/BottomNav'

const MobileRoutes = () => {

    // 👉 Navigation constant 👈
    const navigate = useNavigate()

    const token = window.localStorage.getItem('token');

    const device = window.localStorage.getItem('device') ?? "";

    useEffect(() => {

        console.log('Token:', token);

        if (device != 'mobile') {
            navigate('/login')
            return;
        }

        if (token == null || token == '' || token == undefined) {
            console.log('Navigating to /mobile-login');
            navigate('/mobile-login');
            return;
        }

    }, [])

    return (
        <>
            {/* 👉 Main Screen 👈 */}
            <div className='relative flex justify-center items-center h-[100vh] w-full '>

                <div className='flex flex-row flex-wrap w-full md:w-[100%] h-full md:h-[100%] bg-[#eff2f7] drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)] overflow-clip '>

                    <div className='flex-1 h-full w-[60%] relative overflow-auto border md:border-none' >

                        {/* 👉 Checking Authentication to show outlets or navigate to login 👈 */}
                        <div className={` mb-10`}>
                            <Outlet />
                        </div>

                        {/* 👉 Bottom header 👈 */}
                        <div className="w-full animate__animated animate__slideInDown animate__faster fixed bottom-0 " style={{ zIndex: 999 }}>
                            <BottomNav />
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default MobileRoutes