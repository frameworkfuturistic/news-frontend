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

    const [imageData, setImageData] = useState('') // to store image for preview

    // CSS Constants
    let style = {
        label: 'text-gray-800 text-sm',
        input: 'border focus:outline-none drop-shadow-sm focus:drop-shadow-md px-4 py-1 text-gray-700 shadow-black placeholder:text-sm',
        file: 'block w-full border focus:outline-none drop-shadow-sm focus:drop-shadow-md p-1 text-sm text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded-sm file:border file:text-xs file:font-semibold file:bg-zinc-100 hover:file:bg-zinc-200',
    }

    // Initial values for form
    const initialValues = {
        category: '',
        media: '',
        heading: ''
    }

    // validation schema for form
    const schema = yup.object().shape({
        category: yup.string().required(),
        media: yup.string().required(),
        heading: yup.string().required(),
    })

    // Formik constant or functions
    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        // validationSchema: schema,

        onSubmit: (values) => {

            if(finalData?.length == 0){
                toast.error("Add content for your news.")
                return;
            }

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


    return (
        <>

            {/* 👉 Error Card 👈 */}
            <ErrorCard activateErrorCard={activateBottomErrorCard} status={errorState} message={errorMessage} />

            {/* Loader */}
            {loader && <BarLoader />}

            {/* Main Section */}
            <div className='relative'>

                {/* Back Button */}
                <button className={"px-4 py-1 text-sm bg-zinc-400 hover:bg-zinc-600 select-none rounded-sm hover:drop-shadow-md text-white cursor-pointer absolute -top-8 -left-3"} onClick={() => window.history.back()}>Back</button>

                {/* 👉 Heading 👈 */}
                <div className="font-semibold text-cyan-900 text-xl py-1 tracking-[0.1rem] border-b border-cyan-900 mt-4">
                    News {id ? 'Update' : 'Add'} Form
                </div>

                <div className='bg-white mt-4'>

                    {/* News Form */}
                    <form className='p-4 grid grid-cols-12 gap-2'>

                        {/* Media Preview */}
                        {imageData != '' &&
                            <div className='col-span-12 flex flex-col gap-1 '>
                                <label htmlFor="" className={style.label + ' text-base font-semibold'}>Selected Media</label>
                                <img src="" className='border py-1 px-4 text-sm w-full drop-shadow-md object-contain bg-contain' alt="Media" srcset="" />
                            </div>
                        }

                        {/* Category */}
                        <div className='col-span-12 md:col-span-3 flex flex-col gap-1 '>
                            <label htmlFor="" className={style.label}>Select Category</label>
                            <select name='category' {...formik.getFieldProps('category')} className={style.input + ` ${(formik.touched.category && formik.errors.category) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}>

                                <option value="">Select</option>
                                {/* {
                                        options?.map((elem) => <option className='' value={elem[okey]}>{elem[ovalue]}</option>)
                                    } */}

                            </select>
                        </div>

                        {/* Media Selection */}
                        <div className='col-span-12 md:col-span-3 flex flex-col gap-1 '>
                            <label htmlFor="" className={style.label}>Select Media</label>
                            <select name='media' {...formik.getFieldProps('media')} className={style.input + ` ${(formik.touched.media && formik.errors.media) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}>

                                <option value="">Select</option>
                                {/* {
                                        options?.map((elem) => <option className='' value={elem[okey]}>{elem[ovalue]}</option>)
                                    } */}

                            </select>
                        </div>

                        {/* Heading */}
                        <div className='col-span-12 md:col-span-6 row-span-2 flex flex-col gap-1 '>
                            <label htmlFor="" className={style.label}>Heading</label>
                            <input
                                type="text"
                                placeholder="Enter Heading"
                                name='heading'
                                value={formik.values.heading}
                                className={style.input + ` ${(formik.touched.heading && formik.errors.heading) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}
                            />
                        </div>

                    </form>

                    <NewsSection
                        document={document}
                        setDocument={setDocument}
                        finalData={finalData}
                        setFinalData={setFinalData}
                    />

                    <div className="w-full flex justify-start px-4 pb-4">
                        <button type="submit" onClick={formik.handleSubmit} className='bg-green-500 text-white px-4 py-1 text-sm drop-shadow-md hover:bg-green-600'>{id ? 'Update' : 'Add'} News</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default NewsForm