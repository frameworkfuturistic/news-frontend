import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import ApiJsonHeader from '@/Components/Api/ApiJsonHeader'
import { useNavigate, useParams } from 'react-router-dom'
import ApiMultipartHeader from '@/Components/Api/ApiMultipartHeader'
import toast from 'react-hot-toast'
import BarLoader from '@/Components/Common/Loaders/BarLoader'
import { checkErrorMessage } from '@/Components/Common/PowerUpFunctions'
import ErrorCard from '@/Components/Common/ErrorCard'
import NewsSection from './NewsSection'
import Select from 'react-select'
import MediaMasterIndex from '../MediaMaster/MediaMasterIndex'
import { ApiList } from '@/Components/Api/ApiList'
import ImageSelect from '@/Components/Common/ImageSelect'
 
const NewsForm = () => {

    // URL constants
    const { id } = useParams()

    // Destructuring api list
    const { api_getTag, api_getCategory, api_addNews, api_updateNews, api_getNews , api_addActiveNews } = ApiList()
      const navigate = useNavigate()  
    const [loader, setLoader] = useState(false) // loader
    const [newsData, setNewsData] = useState(null) // to store news data for modification
    const [errorState, setErrorState] = useState(false) // to store status of error
    const [errorMessage, setErrorMessage] = useState('') // to store error message

    const [finalData, setFinalData] = useState([]) // for news section passed by props

    const [tagList, setTagList] = useState([]) // to store tag list
    const [addMedia, setAddMedia] = useState(false) // to toggle pop-up for adding new media
    const [mediaList, setMediaList] = useState([]) // to store media list by tags
    const [categoryList, setCategoryList] = useState([]) // to store category list

    // CSS Constants
    let style = {
        label: 'text-gray-800 text-sm',
        input: 'border focus:outline-none drop-shadow-sm focus:drop-shadow-md px-4 py-1 text-gray-700 shadow-black placeholder:text-sm',
        reactSelect: 'border focus:outline-none drop-shadow-sm focus:drop-shadow-md text-gray-700 shadow-black placeholder:text-sm',
        file: 'block w-full border focus:outline-none drop-shadow-sm focus:drop-shadow-md p-1 text-sm text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded-sm file:border file:text-xs file:font-semibold file:bg-zinc-100 hover:file:bg-zinc-200',
    }

    // Initial values for form
    const initialValues = {
        category: '',
        media: '',
        tags: [],
        media: '',
        topNews: false,
        heading: '',
        desc: ""
    }

    // validation schema for form
    const schema = yup.object().shape({
        category: yup.string().required(),
        media: yup.string().required(),
        heading: yup.string().required(),
        tags: yup.array().min(1, 'select atleast one').required(),
        desc: yup.string().required()
    })

    // Formik constant or functions
    const formik = useFormik({

        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: schema,

        onSubmit: (values) => {

            // Function to check there is any content section
            // if (finalData?.length == 0) {
            //     toast.error("Add content for your news.")
            //     return;
        
            // }

            submitFun(values)
        }
    })

    // To handle error card
    const activateBottomErrorCard = (state, message) => {
        setErrorState(state)
        setErrorMessage(message)
    }

    // Function to make form pre-filled
    const feedNewsForm = (values) => {

        formik.setFieldValue('category', values?.categoryId)
        formik.setFieldValue('media', values?.featureImageId)
        formik.setFieldValue('heading', values?.featureTitle)
        formik.setFieldValue('desc', values?.featureContent)
        const contentSec = values?.contentSection?.map((elem) => (
            {
                media: elem?.mediaId,
                title: elem?.title,
                desc: elem?.content
            }
        ))
        setFinalData(contentSec)
    }

    // To get news data to modify
    const getNewsDataFun = () => {

        setLoader(true)

        axios.post(api_getNews, { id: id }, ApiJsonHeader())
            .then((res) => {
                if (res?.data?.status) {
                    setNewsData(res?.data?.data)
                    feedNewsForm(res?.data?.data)
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
        let payload;

        if (id) {
            url = api_updateNews

            payload = {
                id: id,
                categoryId: values?.category,
                featureImageId: values?.media,
                title: values?.heading,   //featureTitle  ->  title 
                body: values?.desc,    //featureContent ->  body 
                topNews: values?.topNews == 'true' ? 1 : 0, //add topnews payload 
                storySections: finalData?.map((data) => ({     //contentSection -> storySections
                    mediaId: data?.media,
                    title: data?.title,
                    content: data?.desc
                }))
            }

        } else {
            url = api_addNews

            payload = {
                categoryId: values?.category,
                featureImageId: values?.media,
                title: values?.heading,   //featureTitle  ->  title 
                body: values?.desc,   //featureContent ->  body 
                topNews: values?.topNews == 'true' ? 1 : 0,  //add topnews payloadNN
                storySections: finalData?.map((data) => ({   //contentSection -> storySections
                    mediaId: data?.media,
                    title: data?.title,
                    content: data?.desc
                }))
            }

        }

        console.log(`${id ? 'Update' : 'Add'} news body => `, payload)

        setLoader(true)

        axios.post(api_addNews, payload, ApiJsonHeader())
            .then((res) => {
                if (res?.data?.status) {
                    toast.success("News Added Successfully !!!")
                    navigate('/news-master')
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

    // Function to get tag list
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

    // Function to get category list
    const getCategoryList = () => {

        setTagList([])

        setLoader(true)

        let payload = {

        }

        axios
            .post(api_getCategory, payload, ApiJsonHeader())
            .then((res) => {
                if (res?.data?.status) {
                    setCategoryList(res?.data?.data)
                } else {
                    activateBottomErrorCard(true, checkErrorMessage(res?.data?.message))
                }
                console.log('category list response => ', res)
            })
            .catch((err) => {
                activateBottomErrorCard(true, 'Server Error! Please try again later.')
                console.log('error category list => ', err)
            })
            .finally(() => {
                setLoader(false)
            })
    }

    // Function to close add media dialog and refresh the tag list
    const closeMediaAddFun = () => {
        setAddMedia(false)
        getTagList()
    }

    // To call function when having id
    useEffect(() => {
        id && getNewsDataFun()
        getCategoryList()
        getTagList()
    }, [id])

    // Multiselect logic start

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (newValue, actionMeta) => {
        setSelectedImage(null)
        setSelectedOptions(newValue);
        const modifiedTags = newValue?.map(elem => elem?.value)
        formik.setFieldValue('tags', modifiedTags)
        console.log(newValue)
        setMediaList(() => {
            return tagList.filter(item => modifiedTags?.includes(item?.tag_name));
        })
    };

    // Multiselect logic end

    // Image select logic start
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (obj) => {
        setSelectedImage(obj);
        formik.setFieldValue('media', obj?.id || '')
    };

    // Image select logic end

    console.log('formik errors => ', formik.errors)

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

                    <div className='w-full justify-start flex flex-wrap gap-2 px-4 py-4'>
                        <h1 className='font-semibold text-orange-700'>Note: If you can't find your media or file, then click here to add new media: </h1>
                        <button className='md:mx-4 bg-blue-400 text-white px-4 py-1 text-sm drop-shadow-md hover:bg-blue-600' onClick={() => setAddMedia(true)}>Add Media</button>
                    </div>

                    {/* News Form */}
                    <form className='p-4 grid grid-cols-12 gap-2'>

                        {/* Media Preview */}
                        {selectedImage != null ?
                            <div className='col-span-12 md:col-span-4 flex flex-col gap-1 justify-center border bg-slate-200'>
                                <img src={selectedImage?.image} className=' py-1 px-4 text-sm w-50 rop-shadow-md object-contain bg-contain' alt="Media" srcset="" />
                            </div>
                            :
                            <div className='col-span-12 md:col-span-4 flex flex-col gap-1 bg-gray-500'>
                                <span className='border h-full py-1 px-4 text-sm w-50 rop-shadow-md  flex justify-center items-center font-semibold text-white'>
                                    No Media Selected
                                </span>
                            </div>
                        }

                        <div className='col-span-12 md:col-span-8 w-full flex flex-wrap items-center gap-2'>
                            {/* Category */}
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="" className={style.label}>Select Category <span className='font-bold text-xs text-red-500'>*</span></label>
                                <select name='category' {...formik.getFieldProps('category')} className={style.input + ` ${(formik.touched.category && formik.errors.category) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}>

                                    <option value="">Select</option>
                                    {
                                        categoryList?.map((elem) => <option className='' value={elem?.id}>{elem?.category}</option>)
                                    }

                                </select>
                            </div>

                            <div className='w-full flex flex-col gap-1 '>
                                <label htmlFor="" className={style.label}>Select Tags <span className='font-bold text-xs text-red-500'>*</span></label>
                                <Select
                                    name='tags'
                                    {...formik.getFieldProps('category')}
                                    className={` ${(formik.touched.category && formik.errors.category) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}
                                    isMulti
                                    options={tagList?.map((elem) => {
                                        return { label: elem?.tag_name, value: elem?.tag_name }
                                    }) ?? []}
                                    onChange={handleChange}
                                    value={selectedOptions}
                                />
                            </div>

                            {/* Media Selection */}
                            <div className='w-full md:w-[48%] flex flex-col gap-1'>
                                <label htmlFor="" className={style.label}>Select Media <span className='italic text-xs font-semibold'>(Select tags to get media list)</span> <span className='font-bold text-xs text-red-500'>*</span></label>
                                <div name='media' {...formik.getFieldProps('media')} className={style.input + ` ${(formik.touched.media && formik.errors.media) ? ' w-full border-red-200 placeholder:text-red-500 ' : ' w-full focus:border-zinc-300 border-zinc-200'}`} >
                                    <ImageSelect options={mediaList ?? []} okey={'media_id'} ovalue={'file_name'} imageSelected={(okey, ovalue) => handleImageSelect({ id: okey, image: ovalue })} />
                                </div>
                            </div>

                            {/* Media Selection */}
                            <div className='w-full md:w-[48%] flex flex-col gap-1'>
                                <label htmlFor="" className={style.label}>Top News <span className='font-bold text-xs text-red-500'>*</span></label>
                                <select name='topNews' {...formik.getFieldProps('topNews')} className={style.input + ` ${(formik.touched.topNews && formik.errors.topNews) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}>
                                    <option value={true}>Yes</option>
                                    <option value={false} selected>No</option>
                                </select>
                            </div>

                            {/* Heading */}
                            <div className='w-full row-span-2 flex flex-col gap-1 '>
                                <label htmlFor="" className={style.label}>Heading <span className='font-bold text-xs text-red-500'>*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter Heading"
                                    name='heading'
                                    {...formik.getFieldProps('heading')}
                                    className={style.input + ` ${(formik.touched.heading && formik.errors.heading) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}
                                />
                            </div>

                            {/* Description */}
                            <div className='w-full row-span-2 flex flex-col gap-1 '>
                                <label htmlFor="" className={style.label}>Description <span className='font-bold text-xs text-red-500'>*</span></label>
                                <textarea
                                    cols={3}
                                    type="text"
                                    placeholder="Enter Description"
                                    name='desc'
                                    {...formik.getFieldProps('desc')}
                                    className={style.input + ` ${(formik.touched.desc && formik.errors.desc) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}
                                />
                            </div>

                        </div>

                    </form>

                    <NewsSection
                        tagList={tagList}
                        finalData={finalData}
                        setFinalData={setFinalData}
                    />

                    <div className="w-full flex justify-start px-4 pb-4">
                        <button type="submit" onClick={formik.handleSubmit} className='bg-green-500 text-white px-4 py-1 text-sm drop-shadow-md hover:bg-green-600'>{id ? 'Update' : 'Add'} News</button>
                    </div>

                </div>
            </div>

            {addMedia && <MediaMasterIndex addMedia={addMedia} close={() => closeMediaAddFun()} />}
        </>
    )
}

export default NewsForm