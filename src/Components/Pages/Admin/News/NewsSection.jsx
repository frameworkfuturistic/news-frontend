import { checkSizeValidation, nullToNA } from '@/Components/Common/PowerUpFunctions';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import * as yup from 'yup';
import NewsCard from './NewsCard';

const NewsSection = (props) => {

    const dialogRef = useRef()

    const [tempDoc, setTempDoc] = useState(null)
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
                formik.resetForm()
                setTempDoc(null)
            } break;
            case 'edit': {
                setTempDoc(null)
                console.log(props?.document[index])
                dialogRef.current.showModal()
                formik.setFieldValue('media', '')
                formik.setFieldValue('title', props?.finalData[index]?.title)
                formik.setFieldValue('desc', props?.finalData[index]?.desc)
            } break;
            case 'delete': {
                const newDocArray = [...props?.document.slice(0, index), ...props?.document.slice(index + 1)];
                const sectionArray = [...props?.finalData.slice(0, index), ...props?.finalData.slice(index + 1)];

                props?.setDocument(newDocArray)
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

    const submitFun = (values) => {

        dialogRef.current.close();

        switch (mType) {

            case "add": {

                props?.setFinalData(prev => [...prev, values])
                props?.setDocument(prev => [...prev, tempDoc])

            } break;

            case 'edit': {


                const updatedDocument = [...props.document];
                const updatedFinalData = [...props.finalData];

                console.log('in edit case : ', tempDoc, updatedDocument[index])

                updatedDocument[index] = tempDoc != null ? tempDoc : updatedDocument[index];
                updatedFinalData[index] = {
                    ...updatedFinalData[index],
                    media: values.media,
                    title: values.title,
                    desc: values.desc,
                };

                props.setDocument(updatedDocument);
                props.setFinalData(updatedFinalData);

            } break;
        }
    }

    useEffect(() => {
        formik.values.media == '' && setTempDoc(null)
    }, [formik.values.media])

    return (
        <>
            <div className="container mx-auto mt-4">

                <div className='w-full flex justify-end'>
                    <button onClick={() => handleContent('add', '')} className="cursor-pointer w-max text-sm bg-green-500 hover:bg-green-700 text-white py-1.5 px-4 mb-2" >Add Section</button>
                </div>

                <div className="w-full md:block hidden">
                    <div className="grid grid-cols-12 bg-gray-100">
                        <div className="col-span-2 py-2 px-4 font-semibold border">File</div>
                        <div className="col-span-2 py-2 px-4 font-semibold border">Title</div>
                        <div className="col-span-6  py-2 px-4 font-semibold border">Description</div>
                        <div className="col-span-2  py-2 px-4 font-semibold border">Actions</div>
                    </div>

                    <div className="bg-white w-full grid grid-cols-12 ">
                        {
                            Array.isArray(props?.finalData) && props?.finalData?.map((card, index) => (


                                <>
                                    <div key={index} className="col-span-2 py-2 px-4 border">{props?.document[index] != null ? <img src={URL.createObjectURL(props?.document[index])} className='w-16' alt='' /> : 'N/A'}</div>
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
                        <tr className='bg-white'>
                            <div colSpan={4} className='text-center text-sm text-red-500 py-2'>No Content Section Added</div>
                        </tr>
                    }
                </div>

                {
                    Array.isArray(props?.finalData) && props?.finalData?.map((card, index) =>
                        <div className='md:hidden flex justify-center flex-wrap gap-4'>
                            <NewsCard
                                key={index}
                                index={index}
                                image={URL.createObjectURL(props?.document[index])}
                                title={card.title}
                                desc={card.desc}
                                handleContent={(type, index) => handleContent(type, index)}
                            />
                        </div>
                    )
                }

                {
                    props?.finalData?.length == 0 &&
                    <div className='bg-white'>
                        <span className='text-center text-sm text-red-500 p-2'>No Content Section Added</span>
                    </div>
                }

            </div>

            <dialog ref={dialogRef} className='backdrop:backdrop-brightness-75 px-4 py-10 md:w-[40vw] w-full animate__animated animate__zoomIn animate__faster'>

                <span className='absolute top-2 right-2 text-sm p-1.5 bg-red-200 hover:bg-red-300 rounded-full cursor-pointer ' onClick={() => dialogRef.current.close()}><RxCross2 /></span>

                <h1 className='text-center border-b pb-1 mb-4 font-semibold'>Add Content Section</h1>

                <form onChange={formik.handleChange} onSubmit={formik.handleSubmit} className=" rounded-md flex flex-col flex-wrap gap-4">

                    {mType == 'edit' && props?.document[index] && <img src={URL.createObjectURL(props?.document[index])} className='w-full' alt="" srcset="" />}

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className={style.label}>Upload Media</label>
                        <input
                            type="file"
                            placeholder="File"
                            name='media'
                            value={formik.values.media}
                            onChange={(e) => handleForm(e)}
                            className={style.file + ` ${(formik.touched.media && formik.errors.media) ? ' border-red-200 placeholder:text-red-500 text-red-400 file:border-red-200 file:text-red-400' : ' focus:border-zinc-300 border-zinc-200 file:border-zinc-300 file:text-gray-600'}`}
                            accept='.jpg, .jpeg, .png, .mp4'
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className={style.label}>Title</label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            name='title'
                            value={formik.values.title}
                            className={style.input + ` ${(formik.touched.title && formik.errors.title) ? ' border-red-200 placeholder:text-red-500 ' : ' focus:border-zinc-300 border-zinc-200'}`}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="" className={style.label}>Description</label>
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
            </dialog>
        </>
    );
};

export default NewsSection;