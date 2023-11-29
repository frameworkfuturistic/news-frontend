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
// import NewsSection from './NewsSection'
import Select from 'react-select'
import Creatable from 'react-select/creatable'
import MediaMasterIndex from '../MediaMaster/MediaMasterIndex'
import { ApiList } from '@/Components/Api/ApiList'
import ImageSelect from '@/Components/Common/ImageSelect'
import TinyEditor from '../Editor/TinyEditor'

const NewsForm = () => {

    // URL constants
    const { id, type } = useParams()

    // Destructuring api list
    const { api_getTag, api_getCategory, api_addNews, api_updateNews, api_getNews, api_addActiveNews } = ApiList()
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false) // loader
    const [newsData, setNewsData] = useState(null) // to store news data for modification
    const [errorState, setErrorState] = useState(false) // to store status of error
    const [errorMessage, setErrorMessage] = useState('') // to store error message

    const [finalData, setFinalData] = useState([]) // for news section passed by props

    const [tagList, setTagList] = useState([]) // to store tag list
    const [keywordList, setKeywordList] = useState([]) // to store tag list
    const [addMedia, setAddMedia] = useState(false) // to toggle pop-up for adding new media
    const [mediaList, setMediaList] = useState([]) // to store media list by tags
    const [categoryList, setCategoryList] = useState([]) // to store category list
    const [categories, setCategories] = useState([])

    const [submitType, setSubmitType] = useState('')

    // CSS Constants
    let style = {
        label: 'text-gray-900 font-semibold text-sm',
        input: 'border focus:outline-none drop-shadow-sm focus:drop-shadow-md px-4 py-1 text-gray-700 shadow-black placeholder:text-sm',
        reactSelect: 'border focus:outline-none drop-shadow-sm focus:drop-shadow-md text-gray-700 shadow-black placeholder:text-sm',
        file: 'block w-full border focus:outline-none drop-shadow-sm focus:drop-shadow-md p-1 text-sm text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded-sm file:border file:text-xs file:font-semibold file:bg-zinc-100 hover:file:bg-zinc-200',
    }

    // Initial values for form
    const initialValues = {
        category: "",
        // category: [],
        media: '',
        tags: [],
        newsTags: [],
        keywords:[],
        media: '',
        // topNews: false,
        heading: '',
        desc: ""
    }

    // validation schema for form
    const schema = yup.object().shape({
        category: yup.string().required(),
        // category: yup.array().min(1, 'select atleast one').required(),
        media: yup.string().required(),
        heading: yup.string().required(),
        tags: yup.array().min(1, 'select atleast one').required(),
        newsTags: yup.array().min(1, 'select atleast one').required(),
        keywords: yup.array().min(1, 'select atleast one').required(),
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

        console.log(tagList)

        formik.setFieldValue('category', values?.category_id)
        // formik.setFieldValue('category', Array.isArray(values?.category_id) && values?.category_id?.map((elem) => ({ label: elem?.cateogry, value: elem?.id })))
        formik.setFieldValue('media', values?.feature_image_id)
        formik.setFieldValue('heading', values?.title)
        formik.setFieldValue('desc', values?.body)
        formik.setFieldValue('tags', Array.isArray(values?.mediaTags) && values?.mediaTags?.map((elem) => ({ label: elem?.tag_name, value: elem?.id })))
        formik.setFieldValue('newsTags', Array.isArray(values?.storyTags) && values?.storyTags?.map((elem) => ({ label: elem?.tag_name, value: elem?.tag_name })))
        formik.setFieldValue('keywords', Array.isArray(values?.keywords) && values?.storyTags?.map((elem) => ({ label: elem?.keyword, value: elem?.keyword })))
        // formik.setFieldValue('topNews', values?.is_top_news == '1' ? true : false)
        // const contentSec = values?.storySections?.map((elem) => (
        //     {
        //         id: elem?.id,
        //         tags: elem?.tags,
        //         image: elem?.media || '',
        //         media: elem?.mediaId,
        //         title: elem?.title,
        //         desc: elem?.content
        //     }
        // ))
        setSelectedImage({ image: values?.file_name || "", id: values?.feature_image_id })
        setSelectedOptions(Array.isArray(values?.mediaTags) && values?.mediaTags?.map((elem) => ({ label: elem?.tag_name, value: elem?.tag_name })))
        setNewsTags(Array.isArray(values?.storyTags) && values?.storyTags?.map((elem) => ({ label: elem?.tag_name, value: elem?.tag_name })))
        setKeywordList(Array.isArray(values?.keywords) && values?.keywords?.map((elem) => ({ label: elem?.keyword, value: elem?.keyword })))
        getTagList(values?.mediaTags)
        // setMediaList(() => {
        //     const modifiedTags = values?.mediaTags?.map(elem => elem?.value)
        //     return tagList.filter(item => values?.mediaTags?.includes(item?.tag_name));
        // })
        // setFinalData(contentSec)
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

        if (type == 'edit') {
            url = api_updateNews

            payload = {
                id: id,
                categoryId: values?.category,
                //categoryId: categories?.map(item => item?.value),
                tags: values?.newsTags,
                featureImageId: values?.media,
                title: values?.heading,   //featureTitle  ->  title 
                body: values?.desc,    //featureContent ->  body 
                contentTags: newsTags?.map(item => item?.label),
                keywords: keywordList?.map(item => item?.label),
                toPublish: submitType == 'publish'
                // topNews: values?.topNews == 'true' ? 1 : 0, //add topnews payload 
                // storySections: finalData?.map((data) => ({     //contentSection -> storySections
                //     mediaId: data?.media,
                //     title: data?.title,
                //     content: data?.desc
                // }))
            }

        } else {
            url = api_addNews

            payload = {
                categoryId: values?.category,
                //categoryId: categories?.map(item => item?.value),
                tags: values?.newsTags, // story tags
                featureImageId: values?.media,
                title: values?.heading,   //featureTitle  ->  title 
                body: values?.desc,   //featureContent ->  body 
                contentTags: newsTags?.map(item => item?.label),
                keywords: keywordList?.map(item => item?.label),
                toPublish: submitType == 'publish'
                // topNews: values?.topNews == 'true' ? 1 : 0,  //add topnews payloadNN
                // storySections: finalData?.map((data) => ({   //contentSection -> storySections
                //     mediaId: data?.media,
                //     title: data?.title,
                //     content: data?.desc
                // }))
            }

        }

        console.log(`${type == 'edit' ? 'Update' : 'Add'} news body => `, payload)

        setLoader(true)

        axios.post(url, payload, ApiJsonHeader())
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
    const getTagList = (values = []) => {

        setTagList([])

        setLoader(true)

        let payload = {

        }

        axios
            .post(api_getTag, payload, ApiJsonHeader())
            .then((res) => {
                if (res?.data?.status) {
                    setTagList(res?.data?.data)
                    setMediaList(() => {
                        const modifiedTags = values?.map(elem => elem?.tag_name)
                        return res?.data?.data?.filter(item => modifiedTags?.includes(item?.tag_name));
                    })
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
                    //setCategoryList([{id:12, category: "Breaking News"}, ...res?.data?.data])
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
    const [newsTags, setNewsTags] = useState([]);

    const handleNewsChange = (newValue, actionMeta) => {
        setNewsTags(newValue);
        const modifiedTags = newValue?.map(elem => {
            return ({ tagId: elem?.value })
        })
        formik.setFieldValue('newsTags', modifiedTags)
    };

    const handleKeywordsChange = (newValue, actionMeta) => {
        setKeywordList(newValue);
        const modifiedTags = newValue?.map(elem => {
            return ({ label: elem?.value })
        })
        formik.setFieldValue('keywords', modifiedTags)
    };

    const handleCategoryChange = (newValue, actionMeta) => {
        setCategories(newValue);
        const modifiedTags = newValue?.map(elem => {
            return ({ label: elem?.value })
        })
        formik.setFieldValue('category', modifiedTags)
    };

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

    // Tinymy Change
    const tinyChange = (code) => {
        formik.setFieldValue('desc', code)
    }

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
                    News {id ? 'Edit' : 'Add'} Form
                </div>

                <div className='bg-white mt-4'>

                    <div className='w-full justify-start flex flex-wrap gap-2 px-4 py-4'>
                        <h1 className='font-semibold text-orange-700'>Note: If you can't find your media or file, then click here to add new media: </h1>
                        <button className='md:mx-4 bg-blue-400 text-white px-4 py-1 text-sm drop-shadow-md hover:bg-blue-600' onClick={() => setAddMedia(true)}>Add Media</button>
                    </div>

                    {/* News Form */}
                    <form className='p-4 grid grid-cols-12 gap-2'>

                        {/* Media Preview */}
                        {
                            selectedImage != null && selectedImage?.image != "" ?
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
                            <div className='w-full md:w-[48%] flex flex-col gap-1'>
                                <label htmlFor="" className={style.label}>Select Category <span className='font-bold text-xs text-red-500'>*</span></label>
                                <select name='category' {...formik.getFieldProps('category')} className={style.input + ` ${(formik.touched.category && formik.errors.category) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}>

                                    <option value="">Select</option>
                                 <option className='' value={"12"}>Breaking News</option> 
                                    {
                                        categoryList?.map((elem) => 
                                        <option className='' value={elem?.id}>{elem?.category}</option>
                                        )
                                    }

                                </select>

                                {/* <Select
                                    name='category'
                                    {...formik.getFieldProps('category')}
                                    className={` ${(formik.errors.category) ? ' border border-red-300 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}
                                    isMulti
                                    options={categoryList?.map((elem) => {
                                        return { label: elem?.category, value: elem?.id }
                                    }) ?? []}
                                    onChange={handleCategoryChange}
                                    value={categories}
                                /> */}

                            </div>

                            <div className='w-full md:w-[48%] flex flex-col gap-1 '>
                                <label htmlFor="" className={style.label}>Assign News Tags <span className='font-bold text-xs text-red-500'>*</span></label>
                                <Creatable
                                    name='newsTags'
                                    {...formik.getFieldProps('newsTags')}
                                    className={` ${(formik.errors.newsTags) ? ' border border-red-300 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}
                                    isMulti
                                    options={tagList?.map((elem) => {
                                        return { label: elem?.tag_name, value: elem?.id }
                                    }) ?? []}
                                    onChange={handleNewsChange}
                                    value={newsTags}
                                />
                            </div>

                            {/* <div className='w-full md:w-[48%] flex flex-col gap-1 '>
                                <label htmlFor="" className={style.label}>Select Tags to get media<span className='font-bold text-xs text-red-500'>*</span></label>
                                <Select
                                    name='tags'
                                    {...formik.getFieldProps('tags')}
                                    className={` ${(formik.errors.tags) ? ' border border-red-300 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}
                                    isMulti
                                    options={tagList?.map((elem) => {
                                        return { label: elem?.tag_name, value: elem?.tag_name }
                                    }) ?? []}
                                    onChange={handleChange}
                                    value={selectedOptions}
                                />
                            </div> */}

                            {/* Media Selection */}
                            <div className='w-full md:w-[48%] flex flex-col gap-1 '>
                            <label htmlFor="" className={style.label}>Assign News Keywords <span className='font-bold text-xs text-red-500'>*</span></label>
                            <Creatable
                                name='keywords'
                                {...formik.getFieldProps('keywords')}
                                className={` ${(formik.errors.keywords) ? ' border border-red-300 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}
                                isMulti
                                // options={keywordList?.map((elem) => {
                                //     return { label: elem?.keyword, value: elem?.keyword }
                                // }) ?? []}
                                onChange={handleKeywordsChange}
                                value={keywordList}
                            />
                        </div>
                            <div className='w-full md:w-[48%] flex flex-col gap-1'>
                                <label htmlFor="" className={style.label}>Select Media <span className='font-bold text-xs text-red-500'>*</span></label>
                                <div name='media' {...formik.getFieldProps('media')} className={style.input + ` ${(formik.touched.media && formik.errors.media) ? ' w-full border-red-200 placeholder:text-red-500 ' : ' w-full focus:border-zinc-300 border-zinc-200'}`} >
                                    <ImageSelect
                                    style={style}
                                    tagList={tagList}
                                    handleChange={handleChange}
                                    selectedOptions={selectedOptions}
                                    options={mediaList ?? []} okey={'media_id'} ovalue={'file_name'} imageSelected={(okey, ovalue) => handleImageSelect({ id: okey, image: ovalue })} />
                                </div>
                            </div>

                            {/* Media Selection */}
                            {/* <div className='w-full md:w-[48%] flex flex-col gap-1'>
                                <label htmlFor="" className={style.label}>Top News <span className='font-bold text-xs text-red-500'>*</span></label>
                                <select name='topNews' {...formik.getFieldProps('topNews')} className={style.input + ` ${(formik.touched.topNews && formik.errors.topNews) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}>
                                    <option value={true}>Yes</option>
                                    <option value={false} selected>No</option>
                                </select>
                            </div> */}

                            {/* Heading */}
                            <div className='w-full flex flex-col gap-1 '>
                                <label htmlFor="" className={style.label}>Heading <span className='font-bold text-xs text-red-500'>*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter Heading"
                                    name='heading'
                                    {...formik.getFieldProps('heading')}
                                    className={style.input + ` ${(formik.touched.heading && formik.errors.heading) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}
                                />
                            </div>


                        </div>

                    </form>
                    {/* Description */}
                    <div className='w-full row-span-2 flex flex-col gap-1 '>
                        <label htmlFor="" className={style.label}>Description <span className='font-bold text-xs text-red-500'>*</span></label>
                        {/* <textarea
                                    cols={5}
                                    type="text"
                                    placeholder="Enter Description"
                                    name='desc'
                                    {...formik.getFieldProps('desc')}
                                    className={style.input + ` ${(formik.touched.desc && formik.errors.desc) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}
                                /> */}
                        <div className={` ${(formik.touched.desc && formik.errors.desc) ? ' border rounded-md border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}>
                            <TinyEditor tinyChange={code => tinyChange(code)} initial={newsData?.body} />
                        </div>
                    </div>

                    {/* <NewsSection
                        tagList={tagList}
                        finalData={finalData}
                        setFinalData={setFinalData}
                    /> */}

                    <div className="w-full flex justify-start px-4 pb-4 gap-2">
                        <button type="submit" onClick={() => (formik.handleSubmit(), setSubmitType(""))} className='bg-green-500 text-white px-4 py-1 text-sm drop-shadow-md hover:bg-green-600'>{id ? 'Update' : 'Add'} News</button>
                        <button type="submit" onClick={() => (formik.handleSubmit(), setSubmitType("publish"))} className='bg-blue-500 text-white px-4 py-1 text-sm drop-shadow-md hover:bg-blue-600'>Publish News</button>
                    </div>

                </div>
            </div>

            {addMedia && <MediaMasterIndex addMedia={addMedia} close={() => closeMediaAddFun()} />}
        </>
    )
}

export default NewsForm