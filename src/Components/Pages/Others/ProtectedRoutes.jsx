///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 👉 Author      : R U Bharti
// 👉 Component   : Protected Routes
// 👉 Status      : Closed
// 👉 Description : Restrict the outlets to open without authorization and show sidebar
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// 👉 Importing Components and libraries 👈
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { contextVar } from '@/Components/context/contextVar'
import { useContext } from 'react'
import TopHeader from './TopHeader'
import DashboardSidebarIndex from './SideBar/DashboardSidebarIndex'

const ProtectedRoutes = () => {

    // 👉 Navigation constant 👈
    const navigate = useNavigate() 

    return (
        <>
        {/* 👉 Main Screen 👈 */}
            <div className='relative flex justify-center items-center h-[100vh] w-full '>
                
                <div className='flex flex-row flex-wrap w-full md:w-[100%] h-full md:h-[100%] bg-[#eff2f7] drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)] overflow-clip '>


                    {/* 👉 Side Bar 👈 */}
                    <div className={'md:flex md:relative absolute top-[3.4rem] md:top-0 h-full'} style={{ zIndex: 5 }}>
                        <DashboardSidebarIndex />
                    </div>

                    <div className='flex-1 h-full w-[60%] relative overflow-auto border md:border-none' >

                    {/* 👉 Top header 👈 */}
                   <div className="w-full animate__animated animate__slideInDown animate__faster " style={{ zIndex: 999 }}>
                        <TopHeader />
                    </div>

                        {/* 👉 Checking Authentication to show outlets or navigate to login 👈 */}
                        <div className={` md:px-5 md:my-2 pt-6 md:pt-4 `}>
                            {localStorage.getItem('token') ? <Outlet /> : navigate('/')}
                            
                            {/* 👉 Bottom Space 👈 */}
                            <div className="h-[20vh]"></div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default ProtectedRoutes