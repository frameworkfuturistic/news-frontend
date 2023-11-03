import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import ApiJsonHeader from '@/Components/Api/ApiJsonHeader'
import { useParams } from 'react-router-dom'
import ApiMultipartHeader from '@/Components/Api/ApiMultipartHeader'
import toast from 'react-hot-toast'
import BarLoader from '@/Components/Common/Loaders/BarLoader'
import { checkErrorMessage } from '@/Components/Common/PowerUpFunctions'
import ErrorCard from '@/Components/Common/ErrorCard'
import NewsSection from './NewsSection'

const NewsForm = () => {

    // URL constants
    const { id } = useParams()

    const [loader, setLoader] = useState(false) // loader
    const [newsData, setNewsData] = useState(null) // to store news data for modification
    const [errorState, setErrorState] = useState(false) // to store status of error
    const [errorMessage, setErrorMessage] = useState('') // to store error message

    const [document, setDocument] = useState([]) // for news section passed by props
    const [finalData, setFinalData] = useState([]) // for news section passed by props

    // CSS Constants
    let style = {
        label: 'text-gray-800 text-sm',
        input: 'border focus:outline-none drop-shadow-sm focus:drop-shadow-md px-4 py-1 text-gray-700 shadow-black placeholder:text-sm',
        file: 'block w-full border focus:outline-none drop-shadow-sm focus:drop-shadow-md p-1 text-sm text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded-sm file:border file:text-xs file:font-semibold file:bg-zinc-100 hover:file:bg-zinc-200',
    }

    // Initial values for form
    const initialValues = {

    }

    // validation schema for form
    const schema = yup.object().shape({

    })

    // Formik constant or functions
    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: schema,

        onSubmit: (values) => {
            submitFun(values)
        }
    })

    // To handle error card
    const activateBottomErrorCard = (state, message) => {
        setErrorState(state)
        setErrorMessage(message)
    }

    // To get news data to modify
    const getNewsDataFun = () => {

        setLoader(true)

        let url;
        let body;

        axios.post(url, body, ApiJsonHeader())
            .then((res) => {
                if (res?.data?.status) {
                    setNewsData(res?.data?.data)
                } else {
                    activateBottomErrorCard(true, checkErrorMessage(res?.data?.message))
                }
                console.log('getting news response => ', res)
            })
            .catch((err) => {
                activateBottomErrorCard(true, 'Server Error! Please try again later.')
                console.log('getting news error => ', err)
            })
            .finally(() => {
                setLoader(false)
            })
    }

    // To submit the news to server
    const submitFun = (values) => {

        let url;
        let fd = new FormData;

        if (id) {
            url = '/api/news/' + id;

        } else {
            url = '/api/news';

        }

        setLoader(true)

        axios.post(apiCareerForm, fd, ApiMultipartHeader())
            .then((res) => {
                if (res?.data?.status) {
                    toast.success("News Added Successfully !!!")
                } else {
                    activateBottomErrorCard(true, checkErrorMessage(res?.data?.message))
                }
                console.log('News Adding Response => ', res)
            })
            .catch((err) => {
                activateBottomErrorCard(true, 'Server Error! Please try again later.')
                console.log('error news adding => ', err)
            })
            .finally(() => {
                setLoader(false)
            })
    }

    // To call function when having id
    useEffect(() => {
        // getNewsDataFun()
    }, [id])

    console.log('object ::::: ', document, finalData)
    console.log('asdfdas')

    return (
        <>

            {/* 👉 Error Card 👈 */}
            <ErrorCard activateErrorCard={activateBottomErrorCard} status={errorState} message={errorMessage} />

            {/* Loader */}
            {loader && <BarLoader />}

            {/* Main Section */}
            <div className='relative'>

                {/* Back Button */}
                <button className={"px-4 py-1 text-sm bg-zinc-400 hover:bg-zinc-600 select-none rounded-sm hover:drop-shadow-md text-white cursor-pointer absolute -top-4 -left-3"} onClick={() => window.history.back()}>Back</button>

                {/* 👉 Heading 👈 */}
                <div className="uppercase font-semibold text-cyan-900 text-2xl py-2 text-center tracking-[0.2rem] border-b border-cyan-900">
                    News {id ? 'Edit' : 'Add'} Form
                </div>

                {/* News Form */}
                <form>
                </form>
                <NewsSection
                    document={document}
                    setDocument={setDocument}
                    finalData={finalData}
                    setFinalData={setFinalData}
                />
            </div>
        </>
    )
}

export default NewsForm