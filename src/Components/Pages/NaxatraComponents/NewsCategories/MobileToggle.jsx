import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '@/Components/assets/logo.webp'
import { FaXTwitter } from 'react-icons/fa6'
import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs'
import { VscThreeBars } from 'react-icons/vsc'
import { RxCross2 } from 'react-icons/rx'
import { BsChevronDown } from 'react-icons/bs'
import './style.css'
import ApiJsonHeader from '@/Components/Api/ApiJsonHeader'
import axios from 'axios'
import { ApiList } from '@/Components/Api/ApiList'
import BarLoader from '@/Components/Common/Loaders/BarLoader'

const MobileToggle = (props) => {

  const { api_getCategory } = ApiList()

  const [toggle, setToggle] = useState(false)
  const [dropDown, setdropDown] = useState(false)
  const [dropName, setdropName] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [loader, setLoader] = useState(false)

  const navigate = useNavigate()

  const newsCategoriesMenu = [

    { title: "झारखंड", route: "/Jharkhand", subMenu: [] },
    { title: "बिहार", route: "/Bihar", subMenu: [] },
    { title: "राज्य", route: "/Rajya", subMenu: [] },
    { title: "देश", route: "/Desh", subMenu: [] },
    { title: "मनोरंजन", route: "/Manoranjan", subMenu: [] },
    { title: "व्यापार", route: "/Vyapaar", subMenu: [] },
    { title: " टेक्नोलॉजी ", route: "/Technology", subMenu: [] },
    { title: "राशिफल", route: "/Rashifal", subMenu: [] },
    { title: "धार्मिक", route: "/Dharmik", subMenu: [] },
    {
      title: "खेल",
      route: "/Khel",
      subMenu: [],
    },
    { title: "विदेश", route: "/Videsh", subMenu: [] },
  ];

  const dropFun = (val) => {
    setdropDown(!dropDown)
    setdropName(val)
  }

  const dropClean = () => {
    setdropDown(false)
    setdropName("")
  }

  // Function to get category list
  const getCategoryList = () => {

    setLoader(true)

    let payload = {

    }

    axios
      .post(api_getCategory, payload, ApiJsonHeader())
      .then((res) => {
        if (res?.data?.status) {
          setCategoryList(res?.data?.data?.map((elem) => {
            return (
              { title: elem?.category, route: `/${elem?.id}/${elem?.category}`, subMenu: [] }
            )
          }))
        } else {
          // activateBottomErrorCard(true, checkErrorMessage(res?.data?.message))
        }
        console.log('category list response => ', res)
      })
      .catch((err) => {
        // activateBottomErrorCard(true, 'Server Error! Please try again later.')
        console.log('error category list => ', err)
      })
      .finally(() => {
        setLoader(false)
      })
  }

  useEffect(() => {
    getCategoryList()
  }, [])

  useEffect(() => {
    props?.toggle && setToggle(props?.setToggle)
  }, [props?.setToggle])

  if (loader) {
    return <BarLoader />
  }

  return (
    <>

      {toggle && <div className='h-screen w-screen absolute md:hidden top-0 left-0 border flex z-50'>
        <div className='w-[60%] h-full bg-blue-900 animate__animated animate__slideInLeft animate__faster text-zinc-50 '>

          <div className='relative flex justify-center items-center border-b border-blue-500 p-2 py-3 mb-4'>
            <span className='flex flex-col gap-2 items-center'><img src={logo} className='w-16 md:w-16 drop-shadow-md' alt="" srcSet="" /> <span className='text-sm font-semibold'>Naxatra News</span></span>
            <span onClick={() => setToggle(false)} className='text-xl absolute top-2 right-2'><RxCross2 /></span>
          </div>

          {
            Array.isArray(categoryList) && categoryList?.map((item) => <>
              <span className='flex flex-col justify-between text-xs transition-all duration-200 px-2'>
                <NavLink to={item?.route == '' ? null : item?.route} className={({ isActive }) => ((isActive && item?.subMenu?.length == 0) ? "bg-blue-800 " : " ") + ` p-2 border-b border-blue-800  ` + 'flex gap-1 items-center'} onClick={() => {
                  dropFun(item?.title)
                  setToggle(false)
                }}><span>{item?.title}</span> <span className={`${item?.subMenu?.length > 0 ? `block ${(dropDown && dropName == item?.title) && 'rotate-180 '}` : 'hidden'}`}><BsChevronDown /></span></NavLink>

                {(item?.subMenu?.length > 0 && (dropDown && dropName == item?.title)) && <ul class="block cursor-pointer mt-2 " >
                  {
                    item?.subMenu?.map((elem) => <>
                      <li class="relative cursor-pointer">
                        <NavLink to={elem?.route} className={({ isActive }) => (isActive ? "bg-blue-800 " : " ") + ' text-xs border-b pl-4 border-blue-800 px-2 py-1 flex items-center'} onClick={() => {
                        }}><span>{elem?.title}</span></NavLink>
                      </li>
                    </>)
                  }
                </ul>}
              </span>
            </>)
          }

          <div className='flex gap-x-4 gap-y-2 text-base md:text-xl  items-center px-4 my-4'>
            <span className='flex rounded-full cursor-pointer bg-red-600 p-1.5' onClick={() => window.open("https://www.youtube.com/channel/UCcQZe4GP_FGX6XRcH_EtG4Q", "_blank")}><BsYoutube /></span>
            <span className='flex rounded-full cursor-pointer bg-black p-1.5 ' onClick={() => window.open("https://twitter.com/home?logout=1699530545012", "_blank")}>  <FaXTwitter />  </span>
            <span className='flex rounded-full cursor-pointer bg-white text-blue-700 text-[28px]' onClick={() => window.open('https://www.facebook.com/naxatranewshindi', "_blank")}><BsFacebook /></span>
            <span className='flex rounded-full cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500  p-1.5' onClick={() => window.open("https://www.instagram.com/", "_blank")}><BsInstagram /></span>

          </div>

        </div>

        <div className='w-[40%] h-full bg-zinc-600 opacity-30' onClick={() => setToggle(false)}></div>

      </div>}


    </>
  )
}

export default MobileToggle