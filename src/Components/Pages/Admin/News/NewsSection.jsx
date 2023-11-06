import { checkSizeValidation, nullToNA } from '@/Components/Common/PowerUpFunctions';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import * as yup from 'yup';
import NewsCard from './NewsCard';
import Select from 'react-select';
import ImageSelect from '@/Components/Common/ImageSelect';

const NewsSection = (props) => {

    const dialogRef = useRef()

    const [index, setIndex] = useState(0)
    const [mType, setMType] = useState('')

    // CSS Constants
    let style = {
        label: 'text-gray-800 text-sm',
        input: 'border focus:outline-none drop-shadow-sm focus:drop-shadow-md px-4 py-1 text-gray-700 shadow-black placeholder:text-sm',
        file: 'block bg-white w-full border focus:outline-none drop-shadow-sm focus:drop-shadow-md p-1 text-sm text-slate-500 file:mr-4 file:py-1 file:px-4 file:rounded-sm file:border file:text-xs file:font-semibold file:bg-zinc-100 hover:file:bg-zinc-200',
    }

    const schema = yup.object().shape(
        {
            desc: yup.string().required(),
        }
    )

    const formik = useFormik(
        {
            initialValues: {
                media: "",
                title: "",
                desc: "",
            },
            enableReinitialize: true,
            validationSchema: schema,
            onSubmit: (values) => {
                submitFun(values)
            }
        }
    )


    const handleContent = (type, index) => {

        setMType(type)
        setIndex(parseInt(index))

        switch (type) {
            case 'add': {
                dialogRef.current.showModal()
                setSelectedOptions([])
                formik.resetForm()
            } break;
            case 'edit': {
                dialogRef.current.showModal()
                formik.setFieldValue('media', props?.finalData[index]?.media)
                formik.setFieldValue('title', props?.finalData[index]?.title)
                formik.setFieldValue('desc', props?.finalData[index]?.desc)
                setSelectedOptions(props?.finalData[index]?.tags?.map((elem) => ({label: elem, value: elem})) ?? [])
                setSelectedImage({image: props?.finalData[index]?.image, id: props?.finalData[index]?.id})
            } break;
            case 'delete': {
                const sectionArray = [...props?.finalData.slice(0, index), ...props?.finalData.slice(index + 1)];

                props?.setFinalData(sectionArray)
            } break;
            default: {
                console.log("Type not passed...")
            }
        }
    }

    const handleForm = (e) => {
        let file = e.target.files[0]
        if (!checkSizeValidation(file)) {
            formik.setFieldValue('media', '')
            return;
        }

        if (file) {
            setTempDoc(file)
            console.log('entered with file')
        }
    }

    const diaologCloseFun = () => {
        dialogRef.current.close()
        setSelectedImage(null)
        setSelectedOptions([])
        formik.resetForm()
    }

    const submitFun = (values) => {

        diaologCloseFun();

        const modifiedTags = selectedOptions?.map(elem => elem?.value)

        switch (mType) {

            case "add": {

                props?.setFinalData(prev => [...prev, {...values,tags: modifiedTags, image: selectedImage?.image || ""}])

            } break;

            case 'edit': {


                const updatedFinalData = [...props.finalData];

                updatedFinalData[index] = {
                    ...updatedFinalData[index],
                    tags: modifiedTags,
                    image: selectedImage?.image || "",
                    media: values.media,
                    title: values.title,
                    desc: values.desc,
                };

                props.setFinalData(updatedFinalData);

            } break;
        }
    }

    // Multiselect logic start

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [mediaList, setMediaList] = useState([])

    const handleChange = (newValue, actionMeta) => {
        setSelectedImage(null)
        setSelectedOptions(newValue);
        const modifiedTags = newValue?.map(elem => elem?.value)
        console.log(newValue)
        setMediaList(() => {
            return props?.tagList.filter(item => modifiedTags?.includes(item?.tag_name));
        })
    };

    // Multiselect logic end

    // Image select logic start
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (obj) => {
        formik.setFieldValue('media', obj?.id)
        setSelectedImage(obj);
    };

    // Image select logic end

    console.log('props final data', props?.finalData)

    return (
        <>
            <div className="mx-auto p-4">

                <div className='flex item-center gap-4'>
                    <label htmlFor="" className={`text-base font-semibold text-gray-700`}>Content or Sub-Heading Section</label>
                    <button onClick={() => handleContent('add', '')} className="cursor-pointer w-max text-sm bg-amber-500 hover:bg-amber-700 text-white py-1 px-3 mb-2" >Add Content</button>
                </div>

                <div className="w-full md:block hidden">
                    <div className="grid grid-cols-12 bg-gray-100">
                        <div className="col-span-2 py-2 px-4 font-semibold border">Media</div>
                        <div className="col-span-2 py-2 px-4 font-semibold border">Title</div>
                        <div className="col-span-6  py-2 px-4 font-semibold border">Description</div>
                        <div className="col-span-2  py-2 px-4 font-semibold border">Actions</div>
                    </div>

                    <div className="bg-white w-full grid grid-cols-12 ">
                        {
                            Array.isArray(props?.finalData) && props?.finalData?.map((card, index) => (


                                <>
                                    <div key={index} className="col-span-2 py-2 px-4 border">{card?.image != "" ? <img src={card?.image} className='w-16' alt='' /> : 'N/A'}</div>
                                    <div className="col-span-2 py-2 px-4 border">{nullToNA(card.title)}</div>
                                    <div className="col-span-6 py-2 px-4 border break-words">{nullToNA(card.desc)}</div>
                                    <div className="col-span-2 py-2 px-4 border-b flex items-center justify-center">
                                        <div
                                            className="w-max cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-2 rounded mr-2"
                                            onClick={() => handleContent('edit', index)}
                                        >
                                            Edit
                                        </div>
                                        <div
                                            className="w-max cursor-pointer bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded"
                                            onClick={() => handleContent('delete', index)}
                                        >
                                            Delete
                                        </div>
                                    </div>
                                </>

                            ))}
                    </div>
                    {
                        props?.finalData?.length == 0 &&
                        <div className='w-full bg-slate-50 border text-center text-sm text-red-500 py-2'>No Content Section Added</div>
                    }
                </div>

                {
                    Array.isArray(props?.finalData) && props?.finalData?.map((card, index) =>
                        <div className='md:hidden flex justify-center flex-wrap gap-4'>
                            <NewsCard
                                key={index}
                                index={index}
                                image={card?.image || ""}
                                title={card.title}
                                desc={card.desc}
                                handleContent={(type, index) => handleContent(type, index)}
                            />
                        </div>
                    )
                }

                {
                    props?.finalData?.length == 0 &&
                    <div className='bg-slate-50 border md:hidden block'>
                        <span className='text-center text-sm text-red-500 p-2'>No Content Section Added</span>
                    </div>
                }

            </div>

            <dialog ref={dialogRef} className='backdrop:backdrop-brightness-75 shadow-lg md:w-[60vw] w-full animate__animated animate__zoomIn animate__faster'>

                <div className=" grid grid-cols-12 w-full">

                    <div className='col-span-12 md:col-span-4 '>
                        {
                            selectedImage != null ?
                                <div className='bg-slate-200 w-full justify-center items-center h-full'>
                                    <img src={selectedImage?.image} className='py-1 px-4 text-sm w-full h-full rop-shadow-md object-contain bg-contain' alt="" srcset="" />
                                </div>
                                :
                                <span className="bg-slate-500 flex justify-center items-center w-full h-full font-semibold text-sm text-white">
                                    No Image Selected
                                </span>
                        }
                    </div>

                    <form onChange={formik.handleChange} onSubmit={formik.handleSubmit} className="col-span-12 md:col-span-8 flex flex-row flex-wrap gap-2 rounded-md relative p-4">

                        <span className='absolute top-2 right-2 text-sm p-1.5 bg-red-200 hover:bg-red-300 rounded-full cursor-pointer ' onClick={() => diaologCloseFun()}><RxCross2 /></span>

                        <h1 className='w-full text-center border-b pb-1 mb-4 font-semibold'>Add Content Section</h1>
                        {/* {mType == 'edit' && props?.document[index] && <img src={URL.createObjectURL(props?.document[index])} className='w-full' alt="" srcset="" />} */}

                        <div className='w-full md:w-[48%] flex flex-col gap-1 '>
                            <label htmlFor="" className={style.label}>Select Tags </label>
                            <Select
                                isMulti
                                options={props?.tagList?.map((elem) => {
                                    return { label: elem?.tag_name, value: elem?.tag_name }
                                }) ?? []}
                                onChange={handleChange}
                                value={selectedOptions}
                            />
                        </div>

                        {/* Media Selection */}
                        <div className='w-full md:w-[48%] flex flex-col gap-1'>
                            <label htmlFor="" className={style.label}>Select Media </label>
                            <div className={`w-full `}>
                                <ImageSelect options={mediaList ?? []} okey={'media_id'} ovalue={'file_name'} imageSelected={(okey, ovalue) => handleImageSelect({ id: okey, image: ovalue })} />
                            </div>
                        </div>

                        <div className='w-full flex flex-col gap-1'>
                            <label htmlFor="" className={style.label}>Title</label>
                            <input
                                type="text"
                                placeholder="Enter Title"
                                name='title'
                                value={formik.values.title}
                                className={style.input + ` ${(formik.touched.title && formik.errors.title) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}
                            />
                        </div>

                        <div className='w-full flex flex-col gap-1'>
                            <label htmlFor="" className={style.label}>Description <span className='text-red-500 font-bold text-xs'>*</span> </label>
                            <textarea
                                rows={3}
                                type="text"
                                placeholder="Enter Description"
                                name='desc'
                                value={formik.values.desc}
                                className={style.input + ` ${(formik.touched.desc && formik.errors.desc) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}
                            />
                        </div>

                        <div className='w-full flex justify-center'>
                            <button
                                className="cursor-pointer w-max bg-green-500 hover:bg-green-700 text-white font-semibold py-1.5 px-4 text-sm"
                                type='submit'
                            >
                                {mType == 'edit' ? 'Update' : 'Add'}
                            </button>
                        </div>

                    </form>
                </div>

            </dialog>
        </>
    );
};

export default NewsSection;