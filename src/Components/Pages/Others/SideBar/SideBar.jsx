import React, { useContext } from 'react'
import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import './SideBar.css'
import 'animate.css'
import { MdOutlineDashboard, MdOutlineSpaceDashboard } from 'react-icons/md';
import { contextVar } from '@/Components/context/contextVar'
import { BsBuildings, BsCaretRight } from 'react-icons/bs';
import profile from '@/Components/assets/profile.png'


const SideBar = (props) => {

  const { toggleBar, settoggleBar } = useContext(contextVar)

  let userDetails = JSON.parse(localStorage.getItem('userDetails'))

  const [dropDown, setdropDown] = useState(false)
  const [dropName, setdropName] = useState('')

  const location = useLocation()
  const navigate = useNavigate()


  if (location.pathname == '/login' || location.pathname == '/register') {
    return
  }

  const dropMenuBtn = `block w-full pl-7 py-2 px-6 clear-both whitespace-nowrap text-sm hover:bg-cyan-800 hover:text-cyan-50 rounded-md text-sm animate__animated animate__fadeIn animate__faster `

  const mobileMenuBtn = `block py-3 px-4 hover:bg-cyan-800 hover:text-cyan-50 rounded-md animate__animated animate__fadeIn animate__faster `

  const dropFun = (val) => {
    setdropDown(!dropDown)
    setdropName(val)
  }

  const open1 = 'animate__animated animate__slideInLeft animate__faster bg-cyan-900 w-[16rem] '
  const open2 = 'animate__animated animate__fadeInLeft animate__faster '
  const open3 = 'animate__animated animate__fadeInLeft animate__faster '

  const close1 = 'w-0 sm:w-3 bg-cyan-900 animate__animated '
  const close2 = 'animate__animated animate__fadeOutLeft animate__faster '
  const close3 = 'animate__animated animate__fadeOutLeft animate__faster '

  const reloadFun = (locate) => {
    const location = locate?.split('/')[1]
    if (location == 'safform') {
      navigate(`/${locate}`)
      window.location.reload()
    }
  }


  return (
    <>

      <header className={(toggleBar ? open1 : close1) + ' relative select-none transition-all duration-200 h-full text-white pt-2'}>


        {/* ======Menu========== */}
        {<div class={(toggleBar ? open3 : close3) + " bg-cyan-900 w-full inset-0"} id="mobile-menu">

          <nav id="mobile-nav" class="flex flex-col ltr:right-0 rtl:left-0 w-full top-0 py-4 ">

            <div class="mb-auto text-sm 2xl:text-base text-gray-50">

              {/* ========logo========== */}
              <div class="text-center mb-4">
                <div class="text-sm text-gray-200 flex flex-col items-start justify-center relative">
                  <span className='flex justify-center w-full'> 
                    <img src={profile} className='w-20 mb-2 border-2 drop-shadow-md rounded-full' alt="" srcset="" />
                  </span>
                  <span className='flex justify-center w-full font-semibold text-base'>{userDetails?.name}</span>
                  <span className='flex justify-center w-full'>{userDetails?.roles?.map((elem) => elem)}</span>
                </div>
                <hr className='my-4' />
              </div>

              {/* =====menus====== */}
              <div class=" text-sm px-4 overflow-y-auto scrollbar-width-10 scrollbar-track-blue-100 scrollbar-thumb-blue-700 scrollbar-thumb-rounded-full scrollbar-thumb-hover-blue-500 transition-all duration-200">
                <nav class="relative flex flex-wrap items-center justify-between overflow-x-hidden">
                  <ul id="side-menu" class="w-full float-none flex flex-col">
                    {
                      props?.menu?.map((item) => <>
                        <li className='relative cursor-pointer mb-1' onClick={() => { (window.innerWidth <= 763 && item?.children?.length == 0) && settoggleBar(!toggleBar) }}>
                          <NavLink to={item?.path == '' ? null : item?.path} className={({ isActive }) => ((isActive && item?.children?.length == 0) ? "bg-cyan-800 text-cyan-50 " : " ") + `${mobileMenuBtn} ` + 'flex gap-4 items-center'} onClick={() => {
                            dropFun(item?.name)
                            dropName == item?.name && setdropName('')
                          }}> <span><MdOutlineDashboard /></span> <div className='flex justify-between items-center flex-1'><span>{item?.name}</span>{item?.path == null && <span className={(dropName == item?.name) ? 'transition-all duration-200 ease-in-out rotate-90' : 'transition-all duration-200 ease-in-out rotate-0'}><BsCaretRight /></span>}</div> </NavLink>

                          {(item?.children?.length > 0 && (dropName == item?.name)) && <ul class="block rounded rounded-t-none top-full py-0.5 ltr:text-left rtl:text-right mb-4 bg-[#133e71]" >
                            {
                              item?.children?.map((elem) => <>
                                <li class="relative cursor-pointer" onClick={() => { window.innerWidth <= 763 && settoggleBar(!toggleBar) }}>
                                  <NavLink to={elem?.path} onClick={() => reloadFun(elem?.path)} className={({ isActive }) => (isActive ? "bg-cyan-800 text-cyan-50 " : " ") + `${dropMenuBtn} ` + 'flex gap-3 items-center'}><span><MdOutlineSpaceDashboard /></span> <span className=''>{elem?.name}</span></NavLink>
                                </li>
                              </>)
                            }
                          </ul>}
                        </li>
                      </>)
                    }
                  </ul>
                </nav>
              </div>

            </div>

          </nav>

        </div>}

      </header>

    </>
  )
}
export default SideBar