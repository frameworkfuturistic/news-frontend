// 👉 Importing Packages 👈
import React, { useEffect, useRef, useState } from "react";
import ListTable from "@/Components/Common/ListTable/ListTable";
import { ApiList } from "@/Components/api/ApiList";
import { checkErrorMessage, checkSizeValidation, getCurrentDate, indianDate, nullToNA } from "@/Components/Common/PowerupFunctions";
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
import ApiMultipartHeader from "@/Components/Api/ApiMultipartHeader";
import toast from "react-hot-toast";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashRestore } from "react-icons/fa";

const MediaMasterIndex = (props) => {

  // 👉 API constants 👈
  const { api_addMedia, api_getMedia, api_updateMedia, api_getTag, api_deleteMedia } = ApiList()

  // 👉 Dialog useRef 👈
  const dialogRef = useRef(null)
  const fileRef = useRef()

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
  const [document, setDocument] = useState(null)

  // 👉 CSS constants 👈
  const addButton = "float-right focus:outline-none border border-green-500 px-3 py-1 rounded-sm shadow-lg hover:drop-shadow-md hover:bg-green-500 hover:text-white text-green-500 flex items-center"
  const editButton = "float-right focus:outline-none border border-cyan-900 px-3 py-1 rounded-sm shadow-lg hover:drop-shadow-md hover:bg-cyan-900 hover:text-white text-cyan-900 flex items-center"
  const deleteButton = "float-right focus:outline-none border border-red-500 px-3 py-1 rounded-sm shadow-lg hover:drop-shadow-md hover:bg-red-500 hover:text-white text-red-500 flex items-center"
  const labelStyle = 'text-gray-800 text-sm'
  const inputStyle = 'border focus:outline-none drop-shadow-sm focus:drop-shadow-md px-4 py-1 text-gray-700 shadow-black placeholder:text-sm'
  const fileStyle = 'block w-full border focus:outline-none drop-shadow-sm focus:drop-shadow-md p-1 text-sm text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded-sm file:border file:text-xs file:font-semibold file:bg-zinc-100 hover:file:bg-zinc-200'

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

    setDocument(null)

    fileRef.current.value = '';

    switch (type) {
      case 'add': {
        setSelectedOptions([])
        dialogRef.current.showModal()
      } break;
      case 'edit': {
        setSelectedOptions(data?.tags?.split(",") ?? [])
        setViewData(data)
        dialogRef.current.showModal()
      } break;
      case 'delete': {
        setViewData(data)
        dialogRef.current.showModal()
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
        {
          cell.row.original?.media_type == 'video' ? 
          <>
            <iframe src={cell.row.origina?.file_name} frameborder="0"></iframe>
          </>
          :
          <img src={`${cell?.row?.original?.file_name}`} alt="" srcset="" />
        }
      </>),
      className: 'w-full md:w-[25%] px-2'
    },
    {
      Header: "Tags",
      accessor: "tags",
      Cell: ({ cell }) => (
        <>
          {nullToNA(cell?.row?.original?.tags)}
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
          <AiFillEdit />&nbsp; 
            Edit
          </button>
          <button
            onClick={() => handleModal('delete', cell?.row?.original)}
            className={deleteButton}
          > 
          <FaTrashRestore />&nbsp;
            Delete
          </button>
        </div>
      ),
    },
  ]

  const diaologCloseFun = () => {
    dialogRef.current.close()
    props?.addMedia && props.close()
  }

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
        console.log('media list response => ', res)
      })
      .catch((err) => {
        activateBottomErrorCard(true, 'Server Error! Please try again later.')
        console.log('error media list => ', err)
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

  // 👉 To call Function 3 👈
  useEffect(() => {
    !props?.addMedia && getNewsList()
    getTagList()
  }, [])

  useEffect(() => {
    if(props?.addMedia){
      setMType('add')
      dialogRef.current.showModal()
    }
  },[props])

  const handleDocChange = (e) => {

    const file = e.target.files[0]

    if (!checkSizeValidation(file)) {
      setDocument(null);
      fileRef.current.value = '';
      return;
    } else {
      setDocument(file)
    }

  }

  const submitNews = () => {

    let url;
    let fd = new FormData()

    const modifiedTags = selectedOptions?.map(elem => elem?.value)

    switch (mType) {

      case 'add': {

        if (document == null) {
          toast.error("Select Document")
          return;
        }

        if (modifiedTags?.length == 0) {
          toast.error("Add any tags")
          return;
        }

        url = api_addMedia

        fd.append('file', document)
        modifiedTags?.map((elem, index) => {
          fd.append(`tags[${index}]`, elem)
        }
        )

      } break;

      case 'edit': {
        url = api_updateMedia

        fd.append("mediaType", 'abc')
        fd.append("id", viewData?.id)
        document && fd.append('file', document)
        modifiedTags?.map((elem, index) => {
          fd.append(`tags[${index}]`, elem)
        })

      } break;

      case 'delete': {
        url = api_deleteMedia
        fd.append('id', viewData?.id)
      }

    }

    setLoader(true)

    axios
      .post(url, fd, ApiMultipartHeader())
      .then((res) => {
        console.log('media response => ', res)
        if (res?.data?.status) {
          toast.success(`Media ${mType == 'add' && 'Added'} ${mType == 'edit' && 'Updated'} ${mType == 'delete' && 'Deleted'} Successfully`)
        } else {
          activateBottomErrorCard(true, checkErrorMessage(res?.data?.message))
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        getNewsList()
        setLoader(false)
        diaologCloseFun()
      })
  }
const deleteFun = () => {

  setLoader (true) 
  
  axios 
  .post (api_deleteMedia  , {id : viewData?.id} , ApiJsonHeader () )
  .then((res) => {
    if (res?.data?.status) {
      toast.success ("Media Deleted Successfully !!!!")
      getNewsList();
    } else {
      activateBottomErrorCard(true , checkErrorMessage(res?.data?.message))
    }
  }) 
  .catch (err => {
    console.error (err) 
    activateBottomErrorCard (true , 'server Error ! Please try again later . ')
  })
  .finally ( () => {
    setLoader (false) 
    dialogRef.current.close()
  })
}
  return (
    <>

      {/* 👉 Error Card 👈 */}
      <ErrorCard activateErrorCard={activateBottomErrorCard} status={errorState} message={errorMessage} />

      {!props?.addMedia && <div className="poppins p-4 px-6">

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
                  <button className={addButton + ' text-sm'} onClick={() => handleModal('add')}> <IoMdAddCircle />&nbsp; Add Media</button>
                </ListTable>
              </>
              :
              <div className="relative flex flex-col justify-center">
                  <button className={addButton + ' text-sm self-end'} onClick={() => handleModal('add')}>Add Media</button>
                <div className="my-4 bg-red-100 text-red-500 py-2 text-base font-semibold text-center border border-red-500 drop-shadow-sm">Oops! No Data Found.</div>
              </div>}

          </>}
      </div>}

      <dialog ref={dialogRef} className={`backdrop:backdrop-brightness-75 relative ${mType != 'delete' ? 'px-4 py-10 md:w-[30vw] h-max' : ' '} animate__animated animate__zoomIn animate__faster`}>

        <div className={`border ${mType == 'delete' ? 'flex' : 'hidden'} bg-white z-50 px-6 py-4 flex flex-col gap-4`}>
          <div className='flex items-center gap-6'>
            <span className='text-red-500 bg-red-100 p-2 block rounded-full drop-shadow-md shadow-red-300'><FiAlertCircle size={25} /></span>
            <div className='flex flex-col gap-2'>
              <span className='text-xl font-semibold border-b pb-1'>Confirmation</span>
              <span className='text-base'>Are you sure want to delete ?</span>
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <button className='text-white bg-slate-400 hover:bg-slate-500 px-4 py-1 text-sm ' onClick={() => diaologCloseFun()}>No</button>
            <button className='text-white bg-red-500 hover:bg-red-600 px-4 py-1 text-sm ' onClick={() => deleteFun()}>Yes</button>
          </div>
        </div>

        <span className={`${mType != 'delete' ? 'block' : 'hidden'} absolute top-2 right-2 text-sm p-1.5 bg-red-200 hover:bg-red-300 rounded-full cursor-pointer `} onClick={() => diaologCloseFun()}><RxCross2 /></span>

        <div className={`${mType != 'delete' ? 'flex flex-col gap-2' : 'hidden'}`}>
          <h1 className="font-semibold text-xl border-b pb-1 mb-2">{mType == 'edit' ? "Edit" : "Add"} Media</h1>

          {mType == 'edit' && <div className="">
            <img src={`${viewData?.file_name}`} alt="" srcset="" />
          </div>}

          <div className="flex flex-col gap-1">
            <label htmlFor="" className={labelStyle}>Upload Image</label>
            <input type="file" ref={fileRef} onChange={handleDocChange} className={fileStyle} accept=".png, .jpg, .jpeg, .mp4" name="media" id="" />
            <span className="text-xs font-semibold italic">Image must be ".png, .jpg or .jpeg" and Video must be ".mp4"</span>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="" className={labelStyle}>Add Tags</label>
            <CreatableSelect
              isMulti
              options={tagList?.map((elem) => {
                return {label: elem?.tag_name, value: elem?.tag_name}
              }) ?? []}
              onChange={handleChange}
              value={selectedOptions}
            />
          </div>

          <div className="w-full flex justify-start mt-4">

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
                <button type="submit" onClick={() => submitNews()} className='bg-green-500 text-white px-4 py-1 text-sm drop-shadow-md hover:bg-green-600'>{mType == 'edit' ? 'Update' : 'Add'} Media</button>
            }
          </div>
        </div>

      </dialog>

    </>
  )
}

export default MediaMasterIndex