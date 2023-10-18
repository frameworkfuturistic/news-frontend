import React, { useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { BiUser } from 'react-icons/bi'
import { FiAlertCircle } from 'react-icons/fi'
import axios from 'axios'
import { ApiList } from '@/Components/Api/ApiList'
import { ApiJsonHeader } from '@/Components/Api/ApiJsonHeader'
import { toast } from 'react-hot-toast'
import './Style.css'

const BrandingIndex = (props) => {

  const [toggle, setToggle] = useState(false)

  const {apiLogout} = ApiList()

  const dialogRef = useRef()
  let token = localStorage.getItem('token')

  const navigate = useNavigate()

  const LogOutUser = () => {
    axios.post(apiLogout, {}, ApiJsonHeader)
    .then((res) => {
      if(res?.data?.status){
        localStorage.clear()
        window.location.reload()
        toast.success("Logout Successfully !!!")
      }
    })
    .finally(() => dialogRef.current.close())
  }

  return (
    <>
      <div className='w-screen border-b flex justify-center items-center animate__animated animate__slideInDown animate__faster z-50'>
        <div className={`max-w-[${props?.wpx}] h-full w-full flex justify-between md:px-10`} >

          <div className='flex gap-2 md:gap-4 items-center md:px-0 px-2 md:py-0 py-2'>
            <span className='text-sm md:block hidden font-semibold cursor-pointer' onClick={() => navigate('/')}>Naxatra</span>
            {
              props?.menu?.slice(0, 10)?.map((elem, index) =>
                <>
                  <span className={`cursor-pointer ${elem?.path == "/career" ? " colorChange font-bold text-xs px-2 drop-shadow-md py-0.5" : " text-xs  font-semibold text-zinc-500" }`} onClick={() => navigate(elem?.path)} key={index}>{elem?.title}</span>
                </>)
            }

            {props?.menu?.length > 10 && <span className={`transition-all duration-200 bg-zinc-200 h-full p-2 text-sm cursor-pointer`} onClick={() => setToggle(!toggle)}> <span className={`${toggle ? 'rotate-180 ' : ' '} block transition-all duration-200`}> <FaChevronDown /> </span> </span>}
          </div>

          <div className='flex items-center'>
            {!token ? <button className='flex gap-2 items-center bg-red-600 hover:bg-red-500 select-none font-semibold text-white text-xs md:text-sm px-2 md:px-3 py-1.5' onClick={() => navigate('/login')}><span>Sign In</span> <span className='text-lg'><BiUser /></span></button>
              :
              <button className='flex gap-2 items-center bg-red-600 hover:bg-red-500 select-none font-semibold text-white text-xs md:text-sm px-2 md:px-3 py-1.5' onClick={() => dialogRef.current.showModal()}><span>Sign Out</span></button>}
          </div>

        </div>
      </div>

      {
        <div className={`${toggle ? 'h-[1.7rem] border-b' : 'h-[0rem]'} transition-all duration-200 w-screen absolute pt-1 bg-white justify-center items-center overflow-clip z-50`}>
          <div className={`max-w-[${props?.wpx}] h-full w-full px-10`} >

            <div className='flex gap-4 items-center'>
              {
                props?.menu?.slice(10,)?.map((elem, index) =>
                  <>
                    <span className='text-xs text-zinc-400 font-semibold' key={index}>{elem?.title}</span>
                  </>)
              }

            </div>
          </div>
        </div>
      }

      <dialog ref={dialogRef} className='backdrop:backdrop-brightness-75 animate__animated animate__slideInLeft animate__faster'>

        <div className='border bg-white z-50 px-6 py-4 flex flex-col gap-4'>
          <div className='flex items-center gap-6'>
            <span className='text-red-500 bg-red-100 p-2 block rounded-full drop-shadow-md shadow-red-300'><FiAlertCircle size={25} /></span>
            <div className='flex flex-col gap-2'>
              <span className='text-xl font-semibold border-b pb-1'>Confirmation</span>
              <span className='text-base'>Are you sure want to log out ?</span>
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <button className='text-white bg-slate-400 hover:bg-slate-500 px-4 py-1 text-sm ' onClick={() => dialogRef.current.close()}>No</button>
            <button className='text-white bg-red-500 hover:bg-red-600 px-4 py-1 text-sm ' onClick={() => LogOutUser()}>Yes</button>
          </div>
        </div>

      </dialog>
    </>
  )
}

export default BrandingIndex