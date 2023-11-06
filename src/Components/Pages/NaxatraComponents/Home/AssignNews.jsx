import ApiJsonHeader from '@/Components/Api/ApiJsonHeader'
import { ApiList } from '@/Components/Api/ApiList'
import ErrorCard from '@/Components/Common/ErrorCard'
import BarLoader from '@/Components/Common/Loaders/BarLoader'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { LiaEditSolid } from 'react-icons/lia'
import { RxCross2 } from 'react-icons/rx'
import VideoIndex from './VideoIndex'
import { useParams } from 'react-router-dom'

const AssignNews = (props) => {

    const { api_updateActiveNews } = ApiList()

    const dialogRef = useRef()

    const [loader, setLoader] = useState(false)
    const [errorState, setErrorState] = useState(false) // to store status of error
    const [errorMessage, setErrorMessage] = useState('') // to store error message

    let userDetails = JSON.parse(localStorage.getItem('userDetails'))

    const {type} = useParams()

    const editButton = (data) => {
        return <button onClick={() => dialogRef.current.showModal()} className={`${(type == 'edit' && (userDetails?.usertype)?.toLowerCase() == 'admin') ? 'block': 'hidden'} absolute top-0 right-0 flex gap-1 items-center px-4 py-1 bg-green-500 hover:bg-green-600 text-white text-sm font-bold`}> <span className='text-white text-lg'><LiaEditSolid /> </span>Edit</button>
    }

    // To handle error card
    const activateBottomErrorCard = (state, message) => {
        setErrorState(state)
        setErrorMessage(message)
    }


    const actionFun = () => {

        let payload = {
            sectionId: props?.sectionId,
            categoryId: props?.data?.categoryId,
            newsId: props?.data?.newsId
        }

        console.log('updating news stories => ', payload)

        return;

        setLoader(true)

        axios
            .post(api_updateActiveNews, payload, ApiJsonHeader())
            .then((res) => {
                if (res?.data?.status) {
                    dialogRef.current.showModal()
                    toast.success("News Assigned Successfully!!!")
                } else {
                    activateBottomErrorCard(true, res?.data?.msg ?? "Something went wrong!")
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

                    <h1 className=' text-2xl font-semibold text-center border-b pb-1 mb-4'>Assign {props?.data?.category} News</h1>

                    {props?.data?.news?.map((elem) => (
                        <>
                            <div className="grid w-full grid-cols-12 items-center gap-4 bg-slate-100 hover:bg-slate-200 border drop-shadow-md py-1 mb-2 cursor-pointer " onClick={() => actionFun()}>

                                {
                                    elem?.type == 'video'
                                        ?
                                        <div className=" w-full col-span-4 object-cover bg-cover">
                                            <VideoIndex data={elem} />
                                        </div>
                                        :
                                        <img
                                            src={elem?.source}
                                            alt="image"
                                            srcSet=""
                                            className="border h-14 w-full col-span-4 object-cover bg-cover"
                                        />
                                }
                                <div className="flex flex-col gap-1 col-span-8">
                                    <span className="text-zinc-800 text-sm cursor-pointer" >
                                        {elem?.heading}
                                    </span>
                                    <span className="text-sm text-zinc-500">{elem?.date}</span>
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