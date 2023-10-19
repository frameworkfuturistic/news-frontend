import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '@/Components/assets/logo.webp'
// import { FaXTwitter } from 'react-icons/fa6'
// import { FiFacebook } from 'react-icons/fi'
// import { BsInstagram } from 'react-icons/bs'
// import { FiYoutube } from 'react-icons/fi'
import { VscThreeBars } from 'react-icons/vsc'
import { RxCross2 } from 'react-icons/rx'
import { BsChevronDown } from 'react-icons/bs'
import './style.css'
import styled, { keyframes } from 'styled-components';
import { SocialIcon } from 'react-social-icons'
const NewsCategoriesIndex = (props) => {

  const [toggle, setToggle] = useState(false)
  const [dropDown, setdropDown] = useState(false)
  const [dropName, setdropName] = useState('')
  const flipWithRotate = keyframes`
  0% {
      transform: perspective(400px) scaleX(1);
  }
  100% {
      transform: perspective(400px) scaleX(-1);
  }
`;
const MyStyledComponent = styled.div`
    animation: ${flipWithRotate} 2s linear infinite;
`;

  const navigate = useNavigate()

  const dropFun = (val) => {
    setdropDown(!dropDown)
    setdropName(val)
  }

  const dropClean = () => {
    setdropDown(false)
    setdropName("")
  }

  return (
    <>
      <div className='w-screen bg-blue-900 text-zinc-50 flex justify-center items-center relative animate__animated animate__flipInX animate__faster' onMouseLeave={() => dropClean()}>
        <div className={`max-w-[${props?.wpx}] h-full w-full flex justify-between px-1 md:px-10`} >

          <div className='flex gap-4 items-center'>

            <span className='md:pl-0 pl-1 md:hidden block cursor-pointer text-sm font-semibold relative md:px-4' onClick={() => setToggle(true)}>
              <VscThreeBars />
            </span>

            <span className='md:pl-0 pl-2 text-sm font-semibold cursor-pointer relative md:px-4 ' onClick={() => navigate('/')}>
            <MyStyledComponent>  <img src={logo} className='w-12  md:w-16 scale-150 zoom-in-out-box' alt="" srcSet=""   /></MyStyledComponent>
            
            </span>

            {
              props?.menu?.map((item) => <>
                <span className='text-base text-zinc-50 font-semibold cursor-pointer md:block hidden relative transition-all duration-200 z-50'>
                  <NavLink to={item?.route == '' ? null : item?.route} className={({ isActive }) => ((isActive && item?.subMenu?.length == 0) ? " " : " ") + ' hover:underline flex gap-1 items-center'} onClick={() => {
                    dropFun(item?.title)
                  }}><span>{item?.title}</span> <span className={`${item?.subMenu?.length > 0 ? `block ${(dropDown && dropName == item?.title) && 'rotate-180 '}` : 'hidden'}`}><BsChevronDown /></span></NavLink>

                  {(item?.subMenu?.length > 0 && (dropDown && dropName == item?.title)) && <ul className ="block absolute cursor-pointer z-50 animate__animated animate__fadeIn animate__faster" >
                    {
                      item?.subMenu?.map((elem) => <>
                        <li class="relative cursor-pointer">
                          <NavLink to={elem?.path} className={({ isActive }) => (isActive ? " " : " ") + '  z-50 bg-blue-900 hover:bg-blue-800 text-sm border-b px-2 py-1 flex items-center'} onClick={() => {
                          }}><span>{elem?.title}</span></NavLink>
                        </li>
                      </>)
                    }
                  </ul>}
                </span>
              </>)
            }

          </div>

          <div className='flex gap-x-4 gap-y-2 text-base md:text-xl items-center'>
          <span className='cursor-pointer text-lg md:text-2xl' onClick={() => window.open("https://www.youtube.com/channel/UCcQZe4GP_FGX6XRcH_EtG4Q", "_blank")}><SocialIcon url="https://www.youtube.com/channel/UCcQZe4GP_FGX6XRcH_EtG4Q" /></span>
            <span className='cursor-pointer ' onClick={() => window.open("https://twitter.com/i/flow/login?redirect_after_login=%2Fnaxatrahindi")}> <SocialIcon url="https://twitter.com" /></span>
            <span className='cursor-pointer ' onClick={() => window.open('https://www.facebook.com/naxatranewshindi', "_blank")}><SocialIcon url="https://www.facebook.com/naxatranewshindi" /></span>
            <span className='cursor-pointer ' onClick={() => window.open("https://www.instagram.com/", "_blank")}><SocialIcon url="https://www.instagram.com/" /></span>
       
          </div>

        </div>

      </div>

      {toggle && <div className='h-screen w-screen absolute md:hidden top-0 left-0 border flex z-50'>
        <div className='w-[60%] h-full bg-blue-900 animate__animated animate__slideInLeft animate__faster text-zinc-50 '>

          <div className='flex justify-between items-center border-b border-blue-800 p-2'>
            <span><img src={logo} className='w-10 md:w-16 drop-shadow-md' alt="" srcset="" /></span>
            <span onClick={() => setToggle(false)} className='text-xl'><RxCross2 /></span>
          </div>

          {
            props?.menu?.map((item) => <>
              <span className='flex flex-col justify-between text-sm transition-all duration-200'>
                <NavLink to={item?.route == '' ? null : item?.route} className={({ isActive }) => ((isActive && item?.subMenu?.length == 0) ? "bg-blue-800 " : " ") + ` p-2 border-b border-blue-800  ` + 'flex gap-1 items-center'} onClick={() => {
                  dropFun(item?.title)
                }}><span>{item?.title}</span> <span className={`${item?.subMenu?.length > 0 ? `block ${(dropDown && dropName == item?.title) && 'rotate-180 '}` : 'hidden'}`}><BsChevronDown /></span></NavLink>

                {(item?.subMenu?.length > 0 && (dropDown && dropName == item?.title)) && <ul class="block cursor-pointer mt-2 " >
                  {
                    item?.subMenu?.map((elem) => <>
                      <li class="relative cursor-pointer">
                        <NavLink to={elem?.path} className={({ isActive }) => (isActive ? "bg-blue-800 " : " ") + ' text-xs border-b pl-4 border-blue-800 px-2 py-1 flex items-center'} onClick={() => {
                        }}><span>{elem?.title}</span></NavLink>
                      </li>
                    </>)
                  }
                </ul>}
              </span>
            </>)
          }

        </div>

        <div className='w-[40%] h-full bg-zinc-600 opacity-30' onClick={() => setToggle(false)}></div>

      </div>}


    </>
  )
}

export default NewsCategoriesIndex