import React, { useEffect, useState } from 'react'
import BrandingIndex from '../NaxatraComponents/Branding/BrandingIndex';
import NewsCategoriesIndex from '../NaxatraComponents/NewsCategories/NewsCategoriesIndex';
import BreakingNewsIndex from '../NaxatraComponents/BreakinNews/BreakingNewsIndex';
import { Outlet } from 'react-router-dom';
import Footerlayout from '../NaxatraComponents/Footer/Footerlayout';

const NavBarRoutes = () => {

    const [bClose, setBClose] = useState(true);
    let wpx = JSON.parse(localStorage.getItem("layout"))?.Layout_width || "1366px";

    let breakingNews = "राज्यसभा में भी महिला आरक्षण विधेयक पारित, महिला सांसदों ने PM मोदी के साथ मनाया जश्न";

    useEffect(() => {
        window.scroll(0,-100);
      },[])

    return (
        <>
            <div className='fixed top-0 bg-white z-50'>
                <BrandingIndex wpx={wpx} />
                <div className='h-[1.7rem]'></div>
                <NewsCategoriesIndex wpx={wpx} />
                {bClose && <BreakingNewsIndex wpx={wpx} bnews={breakingNews} bClose={(status) => setBClose(status)} />}
            </div>

            <div className={`w-screen flex justify-center items-center animate__animated animate__fadeIn animate__faster ${bClose ? ' mt-[48rem] md:mt-[190px]' : ' mt-[48rem] md:mt-[160px]' } `}>
                <div className={`max-w-[${wpx}] h-full w-full`}>
                    <Outlet />
                    <Footerlayout />
                </div>
            </div>
        </>
    )
}

export default NavBarRoutes