import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { contextVar } from '@/Components/context/contextVar'
import { AiOutlineBars } from 'react-icons/ai'
import { BiLogOutCircle } from 'react-icons/bi';
import { Tooltip } from 'react-tooltip';
import { ApiList } from '@/Components/Api/ApiList';
import { FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';
import ApiJsonHeader from '@/Components/Api/ApiJsonHeader';
import { RxCross2 } from 'react-icons/rx';


const TopHeader = () => {

  const [isLoading, setisLoading] = useState(false)

  const { toggleBar, settoggleBar } = useContext(contextVar)

  const { apiLogout } = ApiList()

  const dialogRef = useRef()

  const navigate = useNavigate()

  // CALLBACK FUNCTION 
  const LogOutUser = () => {
    axios.post(apiLogout, {}, ApiJsonHeader())
      .then((res) => {
        if (res?.data?.status) {
          localStorage.clear()
          toast.success("Logout Successfully !!!")
        }
      })
      .finally(() => {
        dialogRef.current.close()
        navigate('/')
      })
  }


  return (
    <>















      <div className='bg-white flex flex-row justify-between px-2 sm:px-6 border shadow-sm print:hidden py-3'>
        <div className='flex items-center md:w-[11rem] justify-between gap-2 sm:gap-4'>
          <div onClick={() => {
            settoggleBar(!toggleBar)
          }}>
            <span className='cursor-pointer text-gray-700 text-xl' ><AiOutlineBars /></span>
          </div>
          <span className='font-semibold text-xl '>Naxatra News</span>
        </div>
        <div className='flex items-center sm:gap-4 gap-2'>
          <span className='sm:visible flex items-center '>
            <Tooltip anchorId="logout" className='z-50' />
            <button id='logout' data-tooltip-content="Log Out" onClick={() => dialogRef.current.showModal()} className='text-2xl font-semibold'><BiLogOutCircle /></button></span>
        </div>
      </div>

      <dialog ref={dialogRef} className='backdrop:backdrop-brightness-75 animate__animated animate__slideInLeft animate__faster'>

        <span className='absolute top-2 right-2 text-sm p-1.5 bg-red-200 hover:bg-red-300 rounded-full cursor-pointer ' onClick={() => dialogRef.current.close()}><RxCross2 /></span>

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

// export default HeaderIcons
export default TopHeader