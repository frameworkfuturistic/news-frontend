import React, { useState } from 'react'
import logo from '@/Components/assets/logohd.png'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ApiList } from '@/Components/Api/ApiList'
import { toast } from 'react-hot-toast'
import { RotatingLines } from 'react-loader-spinner'
import ErrorCard from '@/Components/Common/ErrorCard'
import ApiJsonHeader from '@/Components/Api/ApiJsonHeader'
import { RiLockPasswordLine } from 'react-icons/ri'
import { FiMail } from 'react-icons/fi'
import { FaRegCircleUser } from 'react-icons/fa6'

const MobileLogin = () => {

  const [loader, setloader] = useState(false)
  const [errorState, setErrorState] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const { apiLogin } = ApiList()

  const labelStyle = "text-base"
  const inputStyle = "focus:outline-none border rounded-sm focus:shadow-md px-2 py-1 text-base"
  const inputStyleR = "focus:outline-none border border-red-400 placeholder:text-red-400 rounded-sm focus:shadow-md px-2 py-1 text-base"

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: (values) => {
      console.log(values)
      loginFun(values)
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Enter email or username"),
      password: yup.string().required("Enter password")
    })
  })

  const activateErrorCard = (status, message) => {
    setErrorState(status)
    setErrorMessage(message)
  }

  const loginFun = (values) => {

    setloader(true)

    let payload = {
      email: values?.email,
      password: values?.password,
      type: 'mobile'
    }

    axios.post(apiLogin, payload, ApiJsonHeader())
      .then((res) => {

        console.log(res)

        if (res.data.status == true) {
          toast.success("Login Successfully !!!")
          window.localStorage.setItem('token', res?.data?.data?.token)
          window.localStorage.setItem('device', 'mobile')
          localStorage.setItem("userDetails", JSON.stringify(res?.data?.data))
          navigate('/mobile/report-master')
        } else {
          toast.error(res?.data?.message)
          activateErrorCard(true, res?.data?.message)
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error("Server Error! Please try again later.")
        activateErrorCard(true, "Server Error! Please try again later.")
      })
      .finally(() => {
        setloader(false)
      })
  }

  return (
    <>
      {<ErrorCard message={errorMessage} status={errorState} activateErrorCard={activateErrorCard} />}

      <form onChange={formik.handleChange} onSubmit={formik.handleSubmit} className='w-screen h-screen bg-zinc-900 flex justify-center items-center'>

        <div className='animate__animated animate__slideInDown animate__faster w-full flex flex-col justify-between py-20'>

          <span className='text-3xl text-center font-semibold text-zinc-50 flex flex-col items-center gap-4'>
            Naxatra News Login
            <span className='bg-zinc-400 w-14  h-[0.1rem] block'></span>
          </span>

          <div className='flex justify-center items-center my-10'>
            <img src={logo} alt="" srcSet="" className=' drop-shadow-lg' />
          </div>
          <div className='px-8'>

            <div className='flex flex-col gap-2 my-4'>
              {/* <label htmlFor="" className={labelStyle}>Username or Email <span className='text-red-500'>*</span> </label> */}
              {/* <input type="text" name="email" id="" className={formik.touched.email && formik.errors.email ? inputStyleR : inputStyle} placeholder='Enter email or username' /> */}
              <div class="flex items-center">
                <div class="relative w-full">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 ">
                    <span className={`${formik.touched.email && formik.errors.email ? "text-white" :  "text-zinc-400"}  text-2xl z-50`}><FaRegCircleUser /></span>
                  </div>
                  <input  type="text" name="email" id="simple-search" class={`${formik.touched.email && formik.errors.email ? 'bg-red-500 text-white placeholder:text-white' : 'bg-zinc-700 text-zinc-100'} border border-zinc-600 text-sm focus:outline-none focus:drop-shadow-lg block w-full ps-10 p-2.5  `} placeholder="Enter email or username..." />
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2 my-4'>
              {/* <label htmlFor="" className={labelStyle}>Password <span className='text-red-500'>*</span> </label> */}
              {/* <input type="password" name="password" id="" className={formik.touched.password && formik.errors.password ? inputStyleR : inputStyle} placeholder='Enter password' /> */}
              <div class="flex items-center">
                <div class="relative w-full">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 ">
                    <span className={`${formik.touched.password && formik.errors.password ? "text-white" :  "text-zinc-400"}  text-2xl z-50`}><RiLockPasswordLine/></span>
                  </div>
                  <input  type="password" name="password" id="simple-search" class={`${formik.touched.password && formik.errors.password ? 'bg-red-500 text-white placeholder:text-white' : 'bg-zinc-700 text-zinc-100'} border border-zinc-600 text-sm focus:outline-none focus:drop-shadow-lg block w-full ps-10 p-2.5  `} placeholder="Enter password..." />
                </div>
              </div>
            </div>



            <div className='mt-6 flex justify-center mb-4 w-full'>
              {
                loader ?
                  <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="25"
                    visible={true}
                  />
                  :
                  <button className='bg-green-500 hover:bg-green-600 text-base text-white px-4 py-1 w-full drop-shadow-md'>Login</button>
              }
            </div>

            <div className='flex justify-center mt-2 '>
              <span className='text-sm hover:underline text-blue-200 cursor-pointer ' onClick={() => navigate('/mobile')}>Back to Naxatra News</span>
            </div>

          </div>

        </div>

      </form>

    </>
  )
}

export default MobileLogin