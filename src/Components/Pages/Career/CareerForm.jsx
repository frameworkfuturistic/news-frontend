///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 👉 Author      : R U Bharti
// 👉 Component   : CareerForm
// 👉 Date        : 20-09-2023
// 👉 Status      : Close
// 👉 Description : Infraction recording form (Apply and edit) for fines & penalty.
// 👉 Functions   :  
//                  1. buttonStyle             -> To style button by passing color name.
//                  2. inputBox                -> Function to map input field.
//                  3. activateBottonErrorCard -> To activate error card with status and message.
//                  4. getViolationList        -> To fetch violation type list.
//                  5. getViolationById        -> To fetch violation section and penalty amount by id.
//                  6. getLocationFromImage    -> To fetch geo location from image.
//                  7. handleChange            -> To handle dependent list on change.
//                  8. feedFormData            -> To feed form when comes to edit.
//                  9. fetchData               -> To fetch form data by id.
//                 10. editFun                 -> To send payload to PilotWorkflowFullDetailsTab.jsx .
//                 11. submitFun               -> To final submit data.
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// 👉 Importing Packages 👈
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { allowCharacterInput, allowCharacterNumberInput, allowMailInput, allowNumberInput, checkErrorMessage, checkSizeValidation, indianAmount, nullToNA } from '@/Components/Common/PowerupFunctions'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { FiAlertCircle } from 'react-icons/fi'
import { ApiMultipartHeader } from '@/Components/Api/ApiMultipartHeader'
import ErrorCard from '@/Components/Common/ErrorCard'
import { ApiList } from '@/Components/Api/ApiList'

const CareerForm = (props) => {

  const dialogRef = useRef()

  // 👉 Navigate constants 👈
  const navigate = useNavigate()

  // 👉 API constants 👈
  const { apiCareerForm } = ApiList()

  // 👉 State constants 👈
  const [loader, setLoader] = useState(false)
  const [errorState, setErrorState] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // 👉 CSS Constants 👈
  const labelStyle = 'text-gray-800 text-sm'
  const inputStyle = (key) => {
    const style = 'border focus:outline-none drop-shadow-sm focus:drop-shadow-md px-4 py-1 text-gray-700 shadow-black placeholder:text-sm'
    return `${style} ${(formik.touched[key] && formik.errors[key]) ? ' border-red-200 placeholder:text-red-400 ' : ' focus:border-zinc-300 border-zinc-200'}`
  }

  const fileStyle = (key) => {
    const style = 'block w-full border focus:outline-none drop-shadow-sm focus:drop-shadow-md p-1 text-sm text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded-sm file:border file:text-xs file:font-semibold file:bg-zinc-100 hover:file:bg-zinc-200'
    return `${style} ${(formik.touched[key] && formik.errors[key]) ? ' border-red-200 placeholder:text-red-400 text-red-400 file:border-red-200 file:text-red-400' : ' focus:border-zinc-300 border-zinc-200 file:border-zinc-300 file:text-gray-600'}`
  }

  // 👉 Basic Details Fields JSON👈
  const basicForm = [
    {
      title: "Applied For",
      key: "appliedFor",
      width: `w-full md:w-[25%]`,
      type: 'select',
      hint: "Enter violation section",
      required: true,
      options: [
        { id: 1, value: 'Reporter' },
        { id: 2, value: 'Anchor' },
        { id: 3, value: 'VT Editor' },
        { id: 4, value: 'Graphics Designer' },
        { id: 5, value: 'Camera Person' },
        { id: 6, value: 'Bulletin Producer/Producer' },
        { id: 7, value: 'Programming Producer' },
        { id: 8, value: 'Marketing Executives/Manager' },
        { id: 9, value: 'PCR Executives' },
        { id: 10, value: 'MCR Executives' },
        { id: 11, value: 'IT/Car Room' },
        { id: 12, value: 'INPUT Executives' },
        { id: 13, value: 'Social Media Executives' },
        { id: 14, value: 'Make Up Artist' },
        { id: 15, value: 'Research Executives' },
      ],
      okey: 'value',
      ovalue: 'value'
    },
    { title: "Upload Photo", key: "photo", type: 'file', hint: "Upload Photo", required: true, accept: '.jpg, .jpeg, .png', width: "w-full md:w-[20%]" },
    { title: "Name", key: "name", type: 'text', hint: "Enter your name", width: "w-full md:w-[20%]" },
    { title: "Present Address", key: "address", type: 'text', hint: "Enter present address", width: "w-full md:w-[50%]" },
    { title: "Email", key: "email", type: 'email', hint: "Enter email" },
    { title: "Permanent Address", key: "paddress", type: 'text', hint: "Enter permanent address", width: "w-full md:w-[50%]" },
    { title: "Mobile No.", key: "mobile", type: 'text', hint: "Enter mobile no." },

  ]

  // 👉 Formik initial values 👈
  const initialValues = {
    name: '',
    mobileNo: '',
    email: '',
    holdingNo: '',
    guardianName: '',
    tradeLicenseNo: '',
    wardId: '',

    streetAddress1: '',
    streetAddress2: '',
    city: '',
    region: '',
    pincode: '',

    department: "",
    violationSection: "",
    violationMade: '',
    violationPlace: '',

    isWitness: '0',
    witnessName: '',
    witnessMobile: '',

    geoTaggedPhoto: '',
    videoAudio: '',
    pdf: '',

    remarks: ''
  }

  // 👉 Formik validation schema 👈
  const schema = yup.object().shape(
    [...basicForm]?.reduce((acc, elem) => {
      if ((elem?.type != 'select' && elem?.type != 'option') && elem.required) {
        acc[elem.key] = yup.string().required(elem.hint);
      }
      if (elem?.type == 'select' || elem?.type == 'option') {
        if (elem?.check) {
          acc[elem.key] = yup.string().when(elem?.check, {
            is: (value) => value == '1',
            then: () => yup.string().required(elem?.hint)
          });
        } else {
          acc[elem.key] = yup.string().required(elem.hint);
        }
      }
      return acc;
    }, {})
  );

  // 👉 Formik constant 👈
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      console.log('enterd')

      submitFun(values)
    }
  })


  // 👉 Function 1 👈
  const buttonStyle = (color) => {
    return `px-4 py-1 text-sm bg-${color}-500 hover:bg-${color}-600 select-none rounded-sm hover:drop-shadow-md text-white cursor-pointer`
  }

  // 👉 Function 3 👈
  const activateBottomErrorCard = (state, message) => {
    setErrorState(state)
    setErrorMessage(message)
  }

  // 👉 Function 7 👈
  const handleChange = async (e) => {

    const name = e.target.name;
    const value = e.target.value;

    { name == "name" && formik.setFieldValue("name", allowCharacterInput(value, formik.values?.name, 50)) }
    { name == "mobileNo" && formik.setFieldValue("mobileNo", allowNumberInput(value, formik.values?.mobileNo, 10)) }
    { name == "email" && formik.setFieldValue("email", allowMailInput(value, formik.values?.email, 50)) }
    { name == "holdingNo" && formik.setFieldValue("holdingNo", allowCharacterNumberInput(value, formik.values?.holdingNo, 20)) }
    { name == "pincode" && formik.setFieldValue("pincode", allowNumberInput(value, formik.values?.pincode, 6)) }
    { name == 'city' && formik.setFieldValue("city", allowCharacterInput(value, formik.values.city, 100)) }
    { name == 'region' && formik.setFieldValue("region", allowCharacterInput(value, formik.values.region, 100)) }
    { name == "witnessName" && formik.setFieldValue("witnessName", allowCharacterInput(value, formik.values?.witnessName, 50)) }
    { name == "witnessMobile" && formik.setFieldValue("witnessMobile", allowNumberInput(value, formik.values?.witnessMobile, 10)) }


    switch (name) {
      case 'geoTaggedPhoto': {


      } break;

    }
  }

  // 👉 Function 11 👈
  const submitFun = (values) => {

    console.log(":::::::Submitting values::::::", values, violationData)

    let fd = new FormData()

    setLoader(true)

    axios
      .post(apiCareerForm, fd, ApiMultipartHeader)
      .then((res) => {
        setIsSubmit(res?.data?.status)
        if (res?.data?.status) {
          toast.success("Submitted Successfully !!!")
          setSubmissionData(res?.data?.data)
        } else {
          activateBottomErrorCard(true, checkErrorMessage(res?.data?.message))
        }
        console.log('submission fp response => ', res)
      })
      .catch((err) => {
        activateBottomErrorCard(true, 'Server Error! Please try again later.')
        console.log('error submission fp => ', err)
      })
      .finally(() => {
        setLoader(false)
      })
  }

  return (
    <>

      {/* 👉 Error Card 👈 */}
      <ErrorCard activateBottomErrorCard={activateBottomErrorCard} state={errorState} message={errorMessage} />

      {/* 👉 Main 👈 */}
      <form onChange={(e) => (formik.handleChange(e), handleChange(e))} onSubmit={formik.handleSubmit} className='w-full h-screen py-4 px-4 md:px-6 border-zinc-200 bg-zinc-50 max-w-[1366px] border border-zinc-100]'>

        {/* 👉 Header 👈 */}
        <header className='border-b pb-2 mb-6 justify-center items-center'>

          {/* 👉 Title 👈 */}
          <main>
            <article>
              <figure className='text-base md:text-2xl font-semibold text-center'>
                Naxatra Career Form
              </figure>
            </article>
          </main>

        </header>

        {/* 👉 Basic Details 👈 */}
        <section className='flex gap-4 flex-wrap '>

          <header className='w-full text-gray-700 -mb-3 font-semibold font-serif'>Basic Details</header>

          <div className='flex flex-col gap-1'>
            <label htmlFor="" className={labelStyle}>Applied For <span className='text-red-500 font-semibold'>*</span></label>
            <select name="appliedFor" {...formik.getFieldProps('appliedFor')} className={inputStyle('appliedFor')} id="">
              <option value="">Select</option>
              {
                [
                  { id: 1, value: 'Reporter' },
                  { id: 2, value: 'Anchor' },
                  { id: 3, value: 'VT Editor' },
                  { id: 4, value: 'Graphics Designer' },
                  { id: 5, value: 'Camera Person' },
                  { id: 6, value: 'Bulletin Producer/Producer' },
                  { id: 7, value: 'Programming Producer' },
                  { id: 8, value: 'Marketing Executives/Manager' },
                  { id: 9, value: 'PCR Executives' },
                  { id: 10, value: 'MCR Executives' },
                  { id: 11, value: 'IT/Car Room' },
                  { id: 12, value: 'INPUT Executives' },
                  { id: 13, value: 'Social Media Executives' },
                  { id: 14, value: 'Make Up Artist' },
                  { id: 15, value: 'Research Executives' },
                ]?.map((elem, index) => <option key={index} value={elem?.value}>{elem?.value}</option>)
              }
            </select>
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="" className={labelStyle}>Upload Photo <span className='text-red-500 font-semibold'>*</span></label>
            <input type="file" name="photo" className={fileStyle('photo')} id="" />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="" className={labelStyle}>Name <span className='text-red-500 font-semibold'>*</span></label>
            <input type="text" name="name" className={inputStyle('name')} id="" />
          </div>

        </section>

        {/* 👉 Address Details 👈 */}
        <section className='flex gap-4 flex-wrap my-6'>

          <header className='w-full text-gray-700 -mb-3 font-semibold font-serif'>Address</header>



        </section>
        {/* 👉 Evidence Documents 👈 */}
        <section className='flex gap-4 flex-wrap my-6'>

          <header className='w-full text-gray-700 -mb-3 font-semibold font-serif'>Evidence</header>

          <div className={`flex flex-col `}>
            <label htmlFor={'geoTaggedPhoto'} className={labelStyle}>Geo Tagged Photo <span className='text-red-500 text-xs font-bold'>*</span> : </label>
            <input type='file' accept='.png, .jpg, .jpeg' {...formik.getFieldProps('geoTaggedPhoto')} className={fileStyle + `${(formik.touched.geoTaggedPhoto && formik.errors.geoTaggedPhoto) ? ' border-red-200 placeholder:text-red-400 text-red-400 file:border-red-200 file:text-red-400' : ' focus:border-zinc-300 border-zinc-200 file:border-zinc-300 file:text-gray-600'}`} />
          </div>


        </section>

        <footer>
          <button type="submit" className={buttonStyle('green')}>Submit</button>
        </footer>

      </form >

      {/* 👉 Dialog form 👈 */}
      <dialog ref={dialogRef} className="relative overflow-clip animate__animated animate__zoomIn animate__faster">
        <div className=' z-50 px-6 py-4 flex flex-col gap-4 '>
          <div className='flex items-center gap-6'>
            <span className='text-green-500 p-2 block rounded-full drop-shadow-md shadow-green-300'><FiAlertCircle size={25} /></span>
            <div className='flex flex-col gap-2'>
              <span className='text-xl font-semibold border-b pb-1'>Confirmation</span>
              <span className='text-base'>Are you sure want to approve ?</span>
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <button className='text-white bg-slate-400 hover:bg-slate-500 px-4 py-1 text-sm ' onClick={() => dialogRef.current.close()}>No</button>
            <button className='text-white bg-green-500 hover:bg-green-600 px-4 py-1 text-sm ' onClick={() => editFun()}>Yes</button>
          </div>
        </div>
      </dialog>

    </>
  )
}

export default CareerForm