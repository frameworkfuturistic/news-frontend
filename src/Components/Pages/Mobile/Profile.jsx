import ApiJsonHeader from '@/Components/Api/ApiJsonHeader'
import { ApiList } from '@/Components/Api/ApiList'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { FcBusinessman } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  let data = JSON.parse(localStorage.getItem('userDetails'))

  const { apiLogout } = ApiList()
  const navigate = useNavigate()

  const logoutFun = () => {

    axios.post(apiLogout, {}, ApiJsonHeader())
      .then((res) => {
        if (res?.data?.status) {
          window.localStorage.clear()
          toast.success("Logout Successfully !!!")
        }
      })
      .finally(() => {
        navigate('/mobile')
      })
      
  }

  return (
    <>

      <div className='flex flex-col items-center w-full h-full mt-10 justify-center'>
       
        <div className='border-4 drop-shadow-lg border-slate-700 rounded-full w-max overflow-clip p-4 bg-slate-50 flex items-center justify-center'>
          <FcBusinessman size={180} />
        </div>

        <div className='flex flex-col gap-2 my-10 text-lg'>

          <span className='bg-white px-5 py-2 font-semibold border shadow-md'> <span className='text-base font-normal mr-2'>Name: </span> {data?.name}</span>
          <span className='bg-white px-5 py-2 font-semibold border shadow-md'> <span className='text-base font-normal mr-2'>Email: </span> {data?.email}</span>
          <span className='bg-white px-5 py-2 font-semibold border shadow-md'> <span className='text-base font-normal mr-2'>User Type: </span> {data?.usertype}</span>

          <span className='my-4 bg-red-200 px-5 py-2 font-semibold border border-red-500 hover:bg-red-500 hover:text-white text-red-600 text-center cursor-pointer shadow-md' onClick={() => logoutFun()}> Logout</span>

      </div>

    </div >

    </>
  )
}

export default Profile