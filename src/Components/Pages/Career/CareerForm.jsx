///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 👉 Author      : R U Bharti
// 👉 Component   : CareerForm
// 👉 Date        : 20-09-2023
// 👉 Status      : Close
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
import { allowCharacterInput, allowCharacterNumberInput, allowMailInput, allowNumberInput, checkErrorMessage, checkSizeValidation, getCurrentDate, indianAmount, nullToNA } from '@/Components/Common/PowerupFunctions'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { FiAlertCircle } from 'react-icons/fi'
import { ApiMultipartHeader } from '@/Components/Api/ApiMultipartHeader'
import ErrorCard from '@/Components/Common/ErrorCard'
import { ApiList } from '@/Components/Api/ApiList'
import { RotatingLines } from 'react-loader-spinner'
import { BiBadgeCheck } from 'react-icons/bi'

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
  const [profileDoc, setProfileDoc] = useState(null)
  const [workVideo, setWorkVideo] = useState(null)
  const [salaryDocument, setSalaryDocument] = useState(null)

  // 👉 CSS Constants 👈
  const labelStyle = 'text-gray-800 text-sm'
  // const inputStyle = (key) => {
  //   const style = 'border focus:outline-none drop-shadow-sm focus:drop-shadow-md px-4 py-1 text-gray-700 shadow-black placeholder:text-sm'
  //   return `${style} ${(formik.touched[key] && formik.errors[key]) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`
  // }

  // const fileStyle = (key) => {
  //   const style = 'block w-full border focus:outline-none drop-shadow-sm focus:drop-shadow-md p-1 text-sm text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded-sm file:border file:text-xs file:font-semibold file:bg-zinc-100 hover:file:bg-zinc-200'
  //   return `${style} ${(formik.touched[key] && formik.errors[key]) ? ' border-red-200 placeholder:text-red-500 text-red-400 file:border-red-200 file:text-red-400' : ' focus:border-zinc-300 border-zinc-200 file:border-zinc-300 file:text-gray-600'}`
  // }

  const inputStyle = 'border focus:outline-none drop-shadow-sm focus:drop-shadow-md px-4 py-1 text-gray-700 shadow-black placeholder:text-sm'
  const fileStyle = 'block w-full border focus:outline-none drop-shadow-sm focus:drop-shadow-md p-1 text-sm text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded-sm file:border file:text-xs file:font-semibold file:bg-zinc-100 hover:file:bg-zinc-200'

  // 👉 Basic Details Fields JSON👈
  const basicForm = [
    {
      title: "Applied For",
      key: "appliedFor",
      width: "w-full md:w-[20%]",
      type: 'select',
      hint: "Select Applied For",
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
      ovalue: 'value',
      required: true
    },
    { title: "Upload Photo", key: "photo", type: 'file', hint: "Upload Photo", required: true, accept: '.jpg, .jpeg, .png', width: "w-full md:w-[20%]" },
    { title: "Name", key: "name", type: 'text', hint: "Enter your name", width: "w-full md:w-[20%]", required: true },
    { title: "Email", key: "email", type: 'email', hint: "Enter your email", required: true, width: "w-full md:w-[20%]", },
    { title: "Mobile No.", key: "mobile", type: 'text', hint: "Enter your mobile no.", required: true, width: "w-full md:w-[20%]", },
    { title: "DOB", key: "dob", type: 'date', hint: "Enter your dob", required: true, width: "w-full md:w-[20%]", },
    {
      title: "Qualification", key: "qualification", type: 'select', hint: "Select qualification", options: [
        { id: 1, value: "Masters" },
        { id: 2, value: "Graduate" },
        { id: 3, value: "BA" },
        { id: 4, value: "BSc" },
        { id: 5, value: "BCom" },
        { id: 6, value: "Matriculation" },
        { id: 7, value: "Mass Communication" },
        { id: 8, value: "Others" },
      ], okey: 'value', ovalue: 'value', required: true, width: "w-full md:w-[20%]"
    },

  ]

  let addresForm = [
    { title: "Present Address", key: "address", type: 'text', hint: "Enter present address", width: "w-full md:w-[100%]", required: true },
    { title: "Permanent Address", key: "paddress", type: 'text', hint: "Enter permanent address", width: "w-full md:w-[100%]", required: true },
  ]

  // 👉 Work Experience Fields JSON👈
  const workForm = [
    { title: "Currently Working", key: 'isWorking', type: 'select', hint: 'Select isWorking', options: [{ title: 'Yes', value: '1' }, { title: "No", value: '0' }], okey: 'value', ovalue: 'title', required: true, width: 'md:w-[15%] w-full' },
    { title: "Company Name", key: 'companyName', type: 'text', width: "", hint: "Enter company name", check: "isWorking", checkValue: '1', width: 'md:w-[15%] w-full', required: true },
    { title: "Present Salary", key: 'pSalary', type: 'text', width: "", hint: "Enter present salary", check: "isWorking", checkValue: '1', width: 'md:w-[15%] w-full', required: true },
    { title: "Salary Proof", key: 'salaryDoc', type: 'file', width: "", hint: "Upload Salary Proof", check: "isWorking", checkValue: '2', width: 'md:w-[15%] w-full' },
  ]

  const expectedForm = [
    { title: "Expected Salary", key: 'eSalary', type: 'text', width: "", hint: "Enter expected salary", check: "", required: true, width: 'md:w-[15%] w-full' },
    { title: "Reference Name", key: 'rName1', type: 'text', width: "", hint: "Enter first reference name", check: "", required: true, width: 'md:w-[15%] w-full' },
    { title: "Reference Mobile No.", key: 'rMobile1', type: 'text', width: "", hint: "Enter first reference mobile no.", check: "", required: true, width: 'md:w-[15%] w-full' },
    { title: "Reference Name 2", key: 'rName2', type: 'text', width: "", hint: "Enter second reference name", check: "", required: false, width: 'md:w-[15%] w-full' },
    { title: "Reference Mobile No. 2", key: 'rMobile2', type: 'text', width: "", hint: "Enter second reference mobile no.", check: "", required: false, width: 'md:w-[15%] w-full' },
    { title: "Work Link URL", key: 'workLink', type: 'url', width: "", hint: "Enter work link only url", check: "", required: false, width: 'md:w-[15%] w-full' },
    // { title: "Work Video", key: 'workVideo', type: 'file', width: "", hint: "Enter work video", check: "", accept: ".mp4, .webm, .mkv", required: false, width: 'md:w-[15%] w-full' },
  ]

  // 👉 Formik initial values 👈
  const initialValues = {
    appliedFor: "",
    photo: "",
    name: "",
    email: "",
    mobile: "",
    dob: "",
    qualification: "",
    address: "",
    paddress: "",
    isWorking: "0",
    pSalary: "",
    salaryDoc: "",
    eSalary: "",
    companyName: "",
    rName1: "",
    rName2: "",
    rMobile1: "",
    rMobile2: "",
    workLink: "",
    workVideo: "",
    remarks: ''
  }

  // 👉 Formik validation schema 👈
  const schema = yup.object().shape(
    [...basicForm, ...addresForm, ...workForm, ...expectedForm]?.reduce((acc, elem) => {
      if(elem?.type != 'date'){
        if ((elem?.type != 'select' && elem?.type != 'option') && elem.required && !elem?.check) {
          if(elem?.key == "mobile" || elem?.key == "rMobile1" || elem?.key == "rMobile2")
          {
            acc[elem.key] = yup.string().min(10, `Invalid! ${elem?.hint}`).required(elem.hint);
          } else {
            acc[elem.key] = yup.string().required(elem.hint);
          }
          return acc;
        }
      } else {
        acc[elem.key] = yup.string().required(elem.hint)?.max(new Date(getCurrentDate()), "Wrong Date! Re-enter your dob");
      }
      if (elem?.type == 'select' || elem?.type == 'option' || elem?.check) {
        if (elem?.check == 'isWorking') {
          acc[elem.key] = yup.string().when(elem?.check, {
            is: (value) => value == elem?.checkValue,
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
      submitFun(values)
      // navigate('/')
    }
  })

  const checkValidaion = () => {
    const array = Object.entries(formik.errors).map(([key, value]) => value);
    array && array?.length > 0 && (toast.error(JSON.stringify(array)), activateBottomErrorCard(true, JSON.stringify(array)))
  }

  console.log("formik", formik.errors, formik.values.isWorking)

  const inputBox = (key, title = '', type, width = '', hint = '', required = false, accept, value = '', options = [], okey = '', ovalue = '') => {
    return (
      <div className={`flex flex-col ${width} `}>
        {title != '' && <label htmlFor={key} className={labelStyle}>{title} {required && <span className='text-red-500 text-xs font-bold'>*</span>} : </label>}
        {type != 'disabled' && type != 'select' && type != 'file' && <input {...formik.getFieldProps(key)} max={type == 'date' ? getCurrentDate() : null} type={type} className={inputStyle + ` ${(formik.touched[key] && formik.errors[key]) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`} name={key} id="" placeholder={hint} />}
        {type != 'disabled' && type == 'file' && <input {...formik.getFieldProps(key)} type={type} className={fileStyle + `${(formik.touched[key] && formik.errors[key]) ? ' border-red-200 placeholder:text-red-500 text-red-400 file:border-red-200 file:text-red-400' : ' focus:border-zinc-300 border-zinc-200 file:border-zinc-300 file:text-gray-600'}`} name={key} id="" placeholder={hint} accept={accept} />}
        {type != 'disabled' && type == 'select' && <select {...formik.getFieldProps(key)} className={inputStyle + ` ${(formik.touched[key] && formik.errors[key]) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}>

          <option value="">Select</option>
          {
            options?.map((elem) => <option className='' value={elem[okey]}>{elem[ovalue]}</option>)
          }

        </select>}
        {type == 'disabled' &&
          <input disabled className={inputStyle + ' focus:border-zinc-300 border-zinc-200'} value={value} />
        }
      </div>
    );
  }

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

    console.log(name, ":", value)
    { name == "name" && formik.setFieldValue("name", allowCharacterInput(value, formik.values?.name, 50)) }
    { name == "mobile" && formik.setFieldValue("mobile", allowNumberInput(value, formik.values?.mobile, 10)) }
    { name == "rMobile1" && formik.setFieldValue("rMobile1", allowNumberInput(value, formik.values?.rMobile1, 10)) }
    { name == "rMobile2" && formik.setFieldValue("rMobile2", allowNumberInput(value, formik.values?.rMobile2, 10)) }
    { name == "pSalary" && formik.setFieldValue("pSalary", allowNumberInput(value, formik.values?.pSalary, 20)) }
    { name == "eSalary" && formik.setFieldValue("eSalary", allowNumberInput(value, formik.values?.eSalary, 20)) }
    { name == "email" && formik.setFieldValue("email", allowMailInput(value, formik.values?.email, 50)) }

    switch (name) {
      case 'photo': {

        let file = e.target.files[0]
        if (!checkSizeValidation(file)) {
          formik.setFieldValue('photo', '')
          return;
        }
        setProfileDoc(file)

      } break;
      case "workVideo": {
        let file = e.target.files[0]
        setWorkVideo(file)
      } break;
      case "salaryDoc": {
        let file = e.target.files[0]
        if (!checkSizeValidation(file)) {
          formik.setFieldValue('salaryDoc', '')
          return;
        }
        setSalaryDocument(file)
      } break;
      case "addressCheck": {
        let checked = e.target.checked;
        if (checked) {
          formik.setFieldValue('paddress', formik.values.address)
        } else {
          formik.setFieldValue('paddress', '')
        }
      } break;
    }
  }

  // 👉 Function 11 👈
  const submitFun = (values) => {

    console.log(":::::::Submitting values::::::", values)

    let fd = new FormData()

    fd.append("appliedFor", values?.appliedFor)
    fd.append("photo", profileDoc)
    fd.append("name", values?.name)
    fd.append("email", values?.email)
    fd.append("mobile", values?.mobile)
    fd.append("dob", values?.dob)
    fd.append("qualification", values?.qualification)
    fd.append("presentAddress", values?.address)
    fd.append("permanentAddress", values?.paddress)
    fd.append("isWorking", values?.isWorking)
    fd.append("presentSalary", values?.pSalary)
    salaryDocument && fd.append("salaryDoc", salaryDocument)
    fd.append("expectedSalary", values?.eSalary)
    fd.append("companyName", values?.companyName)
    fd.append("rName1", values?.rName1)
    fd.append("rName2", values?.rName2)
    fd.append("rMobile1", values?.rMobile1)
    fd.append("rMobile2", values?.rMobile2)
    fd.append("workLink", values?.workLink)
    // workVideo && fd.append("workVideo", workVideo)
    fd.append("remarks", values?.remarks)

    setLoader(true)

    axios.post(apiCareerForm, fd, ApiMultipartHeader)
      .then((res) => {
        // setIsSubmit(res?.data?.status)
        if (res?.data?.status) {
          toast.success("Submitted Successfully !!!")
          dialogRef.current.showModal()
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
      <ErrorCard activateErrorCard={activateBottomErrorCard} status={errorState} message={errorMessage} />

      {loader &&
        <div className='fixed h-screen w-screen z-50 flex justify-center items-center backdrop-brightness-50 '>
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="55"
            visible={true}
          />
        </div>}

      <div className='h-full w-screen flex justify-center relative'>

        <button className={"px-4 py-1 text-sm bg-zinc-400 hover:bg-zinc-600 select-none rounded-sm hover:drop-shadow-md text-white cursor-pointer absolute top-2 left-2"} onClick={() => window.history.back()}>Back</button>

        {/* 👉 Main 👈 */}
        <form onChange={(e) => (formik.handleChange(e), handleChange(e))} onSubmit={formik.handleSubmit} className='w-full h-full py-4 px-4 md:px-6 border-zinc-200 bg-zinc-50 max-w-[1366px] border '>

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

            <note className="text-sm font-semibold text-slate-100 border px-4 py-1 bg-slate-500">Note: Document must be less than 2Mb</note>

            <header className='w-full text-gray-700 -mb-3 font-semibold font-serif'>Basic Details</header>

            {
              basicForm?.map((elem) => {
                return inputBox(elem?.key, elem?.title, elem?.type, elem?.width, elem?.hint, elem?.required, elem?.accept, '', elem?.options, elem?.okey, elem?.ovalue)
              })
            }
          </section>

          {/* 👉 Address Details 👈 */}
          <section className='flex gap-4 flex-wrap items-center my-6'>

            <header className='w-full text-gray-700 -mb-3 font-semibold font-serif'>Address</header>

            {
              inputBox(addresForm[0]?.key, addresForm[0]?.title, addresForm[0]?.type, addresForm[0]?.width, addresForm[0]?.hint, addresForm[0]?.required, "", '', addresForm[0]?.options, "", addresForm[0]?.ovalue)
            }

            <div className='flex flex-col justify-center w-full md:[5%]'>
              <label htmlFor="" className={labelStyle}>Same As Present Address: </label>
              <input type="checkbox" name="addressCheck" className={"cursor-pointer form-checkbox h-5 w-5 text-slate-800"} onChange={(e) => handleChange(e)} id="" />
            </div>

            {
              inputBox(addresForm[1]?.key, addresForm[1]?.title, addresForm[1]?.type, addresForm[1]?.width, addresForm[1]?.hint, addresForm[1]?.required, "", '', addresForm[1]?.options, "", addresForm[1]?.ovalue)
            }

          </section>

          {/* 👉 Witness Details 👈 */}
          <section className='flex gap-4 flex-wrap my-6'>

            <header className='w-full text-gray-700 -mb-3 font-semibold font-serif'>Work Experience</header>

            {
              workForm?.slice(0, (formik.values?.isWorking == '0' ? 1 : 5))?.map((elem) => {
                return inputBox(elem?.key, elem?.title, elem?.type, elem?.width, elem?.hint, elem?.required, elem?.accept, '', elem?.options, elem?.okey, elem?.ovalue)
              })
            }

            {
              expectedForm?.map((elem) => {
                return inputBox(elem?.key, elem?.title, elem?.type, elem?.width, elem?.hint, elem?.required, "", '', elem?.options, elem?.ovalue, elem?.otitle)
              })
            }

          </section>

          <section className='flex gap-4 flex-wrap mb-6'>

            <header className='w-full text-gray-700 -mb-3 font-semibold font-serif'>Remarks</header>

            <div className={`flex flex-col md:w-[40%] w-full `}>
              <input {...formik.getFieldProps('remarks')} type='text' className={inputStyle + ` ${(formik.touched.remarks && formik.errors.remarks) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`} name='remarks' id="" placeholder='Enter remarks' />
            </div>

          </section>

          <footer className=''>
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
                <button onClick={() => checkValidaion()} type="submit" className={buttonStyle('green')}>Submit</button>
            }
          </footer>

        </form >
      </div>


      {/* 👉 Dialog form 👈 */}
      <dialog ref={dialogRef} className="fixed overflow-clip animate__animated animate__zoomIn animate__faster">
        <div className=' z-50 px-6 py-4 pb-6 flex flex-col gap-4 '>
          <div className='flex flex-col items-center gap-2'>
            <span className='text-green-500 p-2 block rounded-full drop-shadow-md shadow-green-300'><BiBadgeCheck size={80} /></span>
            <div className='flex flex-col gap-2 text-xl font-semibold text-slate-700'>
              <span>Successfully Applied Naxatra Career Form</span>
            </div>
          </div>
          <div className='flex justify-center gap-2 mt-4'>
            <button className='text-white bg-slate-400 hover:bg-slate-500 px-4 py-1 text-sm ' onClick={() => (dialogRef.current.close(), navigate('/'))}>Close</button>
          </div>
        </div>
      </dialog>

    </>
  )
}

export default CareerForm