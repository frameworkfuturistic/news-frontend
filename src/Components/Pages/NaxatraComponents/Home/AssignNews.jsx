import ApiJsonHeader from '@/Components/Api/ApiJsonHeader'
import { ApiList } from '@/Components/Api/ApiList'
import ErrorCard from '@/Components/Common/ErrorCard'
import BarLoader from '@/Components/Common/Loaders/BarLoader'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { RxCross2 } from 'react-icons/rx'
import VideoIndex from './VideoIndex'
import { useParams } from 'react-router-dom'
import { BiSolidAddToQueue } from 'react-icons/bi'
import { useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { contextVar } from '@/Components/Context/ContextVar'

const AssignNews = (props) => {

    const { api_addActiveNews, api_getNews } = ApiList()

    const {refresh, setrefresh} = useContext(contextVar)

    const dialogRef = useRef()

    const [loader, setLoader] = useState(false)
    const [errorState, setErrorState] = useState(false) // to store status of error
    const [errorMessage, setErrorMessage] = useState('') // to store error message
    const [storyList, setstoryList] = useState([])

    let userDetails = JSON.parse(localStorage.getItem('userDetails'))

    const {type} = useParams()

    const editButton = (data) => {
        return <button onClick={() => (getStoryList())} className={`${(type == 'edit' && (userDetails?.usertype)?.toLowerCase() == 'admin') ? 'block': 'hidden'} absolute top-0 right-0 flex gap-1 items-center px-4 py-1 bg-green-500 hover:bg-green-600 text-white text-sm font-bold`}> <span className='text-white text-lg'><BiSolidAddToQueue /> </span>Add</button>
    }

    // To handle error card
    const activateBottomErrorCard = (state, message) => {
        setErrorState(state)
        setErrorMessage(message)
    }

    const getStoryList = () => {

        setLoader(true)

        axios.post(api_getNews, {categoryId: props?.cId}, ApiJsonHeader()).then((res) => {
          console.log("Page response => ", res);
          if (res?.data?.status) {
            setstoryList(res?.data?.data)
          } else {
            toast.error(res?.data?.message)
          }
        })
        .finally(() => {
            dialogRef.current.showModal()
            setLoader(false)
        })
      };

    const actionFun = (id) => {

        let payload = {
            storyId: id,
            rendererCode: props?.code
        }

        console.log('updating news stories => ', payload)

        setLoader(true)

        axios
            .post(api_addActiveNews, payload, ApiJsonHeader())
            .then((res) => {
                if (res?.data?.status) {
                    dialogRef.current.showModal()
                    toast.success("News Assigned Successfully!!!")
                    setrefresh(refresh + 1)
                } else {
                    activateBottomErrorCard(true, res?.data?.message ?? "Something went wrong!")
                }
                console.log('assign news response => ', res)
            }
            )
            .catch(err => {
                console.error(err)
                activateBottomErrorCard(true, 'Server Error! Please try again later.')
            })
            .finally(() => {
                setLoader(false)
            })

    }

    useEffect(() => {
        // getStoryList()
    },[])

    return (
        <>

            {/* 👉 Error Card 👈 */}
            <ErrorCard activateErrorCard={activateBottomErrorCard} status={errorState} message={errorMessage} />

            {/* Loader */}
            {loader && <BarLoader />}

            {editButton()}

            <dialog ref={dialogRef} className='p-4 focus:outline-none backdrop:backdrop-brightness-75 animate__animated animate__zoomIn animate__faster md:w-1/2 w-full fixed'>

                <span className='p-1 rounded-full bg-red-400 hover:bg-red-500 text-white cursor-pointer absolute top-1 right-1' onClick={() => dialogRef.current.close()}><RxCross2 /></span>

                <div>

                    <h1 className=' text-2xl font-semibold text-center border-b pb-1 mb-4'>Assign {props?.cname} News</h1>

                    {storyList?.map((elem) => (
                        <>
                            <div className="grid w-full grid-cols-12 items-center gap-4 bg-slate-100 hover:bg-slate-200 border drop-shadow-md py-1 mb-2 cursor-pointer " onClick={() => actionFun(elem?.id)}>

                                {
                                    elem?.media_type == 'video'
                                        ?
                                        <div className=" w-full col-span-4 object-cover bg-cover">
                                            <VideoIndex data={elem} />
                                        </div>
                                        :
                                        <img
                                            src={elem?.file_name}
                                            alt="image"
                                            srcSet=""
                                            className="border h-28 w-full col-span-4 object-cover bg-cover"
                                        />
                                }
                                <div className="flex flex-col gap-1 col-span-8">
                                    <span className="text-zinc-800 text-sm cursor-pointer" >
                                        {elem?.title}
                                    </span>
                                    <span className="text-sm text-zinc-500">{elem?.publication_date}</span>
                                </div>
                            </div>
                        </>
                    ))}
                </div>

            </dialog>
        </>
    )
}

export default AssignNews