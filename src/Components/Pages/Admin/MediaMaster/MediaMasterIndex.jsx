// 👉 Importing Packages 👈
import React, { useEffect, useRef, useState } from "react";
import ListTable from "@/Components/Common/ListTable/ListTable";
import { ApiList } from "@/Components/api/ApiList";
import { checkErrorMessage, getCurrentDate, indianDate, nullToNA } from "@/Components/Common/PowerupFunctions";
import ShimmerEffectInline from "@/Components/Common/Loaders/ShimmerEffectInline";
import * as yup from 'yup'
import { useFormik } from "formik";
import ErrorCard from "@/Components/Common/ErrorCard";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import ApiJsonHeader from "@/Components/Api/ApiJsonHeader";
import { FiAlertCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import CreatableSelect from 'react-select/creatable';

const MediaMasterIndex = () => {

  // 👉 API constants 👈
  const { api_addMedia, api_getMedia, api_updateMedia, api_getTag } = ApiList()

  // 👉 Dialog useRef 👈
  const dialogRef = useRef(null)
  const deleteRef = useRef(null)

  const navigate = useNavigate()

  const url = import.meta.env.VITE_REACT_APP_URL

  // 👉 State constants 👈
  const [mediaData, setmediaData] = useState([])
  const [loader, setLoader] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorState, setErrorState] = useState(false)
  const [mType, setMType] = useState('')
  const [viewData, setViewData] = useState(null)
  const [tagList, setTagList] = useState([])

  // 👉 CSS constants 👈
  const addButton = "float-right focus:outline-none border border-green-500 px-3 py-1 rounded-sm shadow-lg hover:drop-shadow-md hover:bg-green-500 hover:text-white text-green-500 flex items-center"
  const editButton = "float-right focus:outline-none border border-cyan-900 px-3 py-1 rounded-sm shadow-lg hover:drop-shadow-md hover:bg-cyan-900 hover:text-white text-cyan-900 flex items-center"
  const deleteButton = "float-right focus:outline-none border border-red-500 px-3 py-1 rounded-sm shadow-lg hover:drop-shadow-md hover:bg-red-500 hover:text-white text-red-500 flex items-center"
  const labelStyle = 'text-gray-800 text-sm'
  const inputStyle = 'border focus:outline-none drop-shadow-sm focus:drop-shadow-md px-4 py-1 text-gray-700 shadow-black placeholder:text-sm'

  // Multiselect logic start

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (newValue, actionMeta) => {
    setSelectedOptions(newValue);
  };

  // Multiselect logic end

  // 👉 Function 1 👈
  const activateBottomErrorCard = (state, message) => {
    setErrorState(state)
    setErrorMessage(message)
  }

  // 👉 Function 2 👈
  const handleModal = (type, data = null) => {

    setMType(type)

    switch (type) {
      case 'add': {
        setSelectedOptions([])
        dialogRef.current.showModal()
      } break;
      case 'edit': {
        setSelectedOptions(data?.tags ?? [])
        setViewData(data)
        dialogRef.current.showModal()
      } break;
      case 'delete': {
        setViewData(data)
        deleteRef.current.showModal()
      } break;
    }

  }

  // 👉 Table Columns 👈
  const column = [
    {
      Header: "#",
      Cell: ({ row }) => <div className="pr-2">{row?.index + 1}</div>,
    },
    {
      Header: "Media",
      accessor: "file_name",
      Cell: ({ cell }) => (<>
        <img src={`${url}/${cell?.row?.original?.file_name}`} alt="" srcset="" />
      </>),
      className: 'w-full md:w-[25%] px-2'
    },
    {
      Header: "Tags",
      accessor: "tags",
      Cell: ({ cell }) => (
        <>
          {Array.isArray(cell?.row?.original?.tags) ?
            (cell?.row?.original?.tags)?.map((elem, index) => <>
              <span>{elem}</span>
            </>) : 'N/A'}
        </>
      ),
    },
    {
      Header: "Uploaded At",
      accessor: 'created_date',
      Cell: ({ cell }) => (indianDate(cell.row.original.created_date))
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ cell }) => (
        <div className="flex flex-row flex-wrap gap-2">
          <button
            onClick={() => handleModal('edit', cell?.row?.original)}
            className={editButton}
          >
            Edit
          </button>
          <button
            onClick={() => handleModal('delete', cell?.row?.original)}
            className={deleteButton}
          >
            Delete
          </button>
        </div>
      ),
    },
  ]

  // 👉 Function 3 👈
  const getNewsList = () => {

    setmediaData([])

    setLoader(true)

    let payload = {

    }

    axios
      .post(api_getMedia, payload, ApiJsonHeader())
      .then((res) => {
        if (res?.data?.status) {
          setmediaData(res?.data?.data)
        } else {
          activateBottomErrorCard(true, checkErrorMessage(res?.data?.message))
        }
        console.log('career list response => ', res)
      })
      .catch((err) => {
        activateBottomErrorCard(true, 'Server Error! Please try again later.')
        console.log('error career list => ', err)
      })
      .finally(() => {
        setLoader(false)
      })
  }

  const getTagList = () => {

    setTagList([])

    setLoader(true)

    let payload = {

    }

    axios
      .post(api_getTag, payload, ApiJsonHeader())
      .then((res) => {
        if (res?.data?.status) {
          setTagList(res?.data?.data)
        } else {
          activateBottomErrorCard(true, checkErrorMessage(res?.data?.message))
        }
        console.log('tag list response => ', res)
      })
      .catch((err) => {
        activateBottomErrorCard(true, 'Server Error! Please try again later.')
        console.log('error tag list => ', err)
      })
      .finally(() => {
        setLoader(false)
      })
  }

  const schema = yup.object().shape({
    media: yup.string().required(),
    tags: yup.array().min(1, 'assign any tags').required()
  })

  // Formik
  const formik = useFormik({
    initialValues: {
      media: '',
      tags: [],
    },
    enableReinitialize: true,
    validationSchema: schema,
  })

  // 👉 To call Function 3 👈
  useEffect(() => {
    getNewsList()
    getTagList()
  }, [])

  return (
    <>

      {/* 👉 Error Card 👈 */}
      <ErrorCard activateErrorCard={activateBottomErrorCard} status={errorState} message={errorMessage} />

      <div className="poppins p-4 px-6">

        {/* 👉 Heading 👈 */}
        <div className="mb-4 uppercase font-semibold text-cyan-900 text-2xl py-2 text-center tracking-[0.3rem] border-b border-cyan-900">
          Media Master
        </div>

        {/* 👉 Table Loader 👈 */}
        {loader && <ShimmerEffectInline />}


        {/* 👉 Table 👈 */}
        {!loader &&
          <>
            {mediaData?.length > 0 ?

              <>
                <ListTable
                  columns={column}
                  dataList={mediaData}
                >
                  <button className={addButton + ' text-sm'} onClick={() => handleModal('add')}>Add Media</button>
                </ListTable>
              </>
              :
              <>
                <div className="my-4 bg-red-100 text-red-500 py-2 text-base font-semibold text-center border border-red-500 drop-shadow-sm">Oops! No Data Found.</div>
              </>}

          </>}
      </div>

      <dialog ref={deleteRef} className={`backdrop:backdrop-brightness-75 relative animate__animated animate__zoomIn animate__faster`}>

        <div className='border bg-white z-50 px-6 py-4 flex flex-col gap-4'>
          <div className='flex items-center gap-6'>
            <span className='text-red-500 bg-red-100 p-2 block rounded-full drop-shadow-md shadow-red-300'><FiAlertCircle size={25} /></span>
            <div className='flex flex-col gap-2'>
              <span className='text-xl font-semibold border-b pb-1'>Confirmation</span>
              <span className='text-base'>Are you sure want to delete ?</span>
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <button className='text-white bg-slate-400 hover:bg-slate-500 px-4 py-1 text-sm ' onClick={() => deleteRef.current.close()}>No</button>
            <button className='text-white bg-red-500 hover:bg-red-600 px-4 py-1 text-sm ' onClick={() => deleteFun()}>Yes</button>
          </div>
        </div>

      </dialog>


      <dialog ref={dialogRef} className='backdrop:backdrop-brightness-75 px-4 py-10 md:w-[40vw] w-full animate__animated animate__zoomIn animate__faster'>

        <span className='absolute top-2 right-2 text-sm p-1.5 bg-red-200 hover:bg-red-300 rounded-full cursor-pointer ' onClick={() => dialogRef.current.close()}><RxCross2 /></span>

        <CreatableSelect
          isMulti
          options={tagList}
          onChange={handleChange}
          value={selectedOptions}
        />

      </dialog>

    </>
  )
}

export default MediaMasterIndex