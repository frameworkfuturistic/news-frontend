// 👉 Importing Packages 👈
import React, { useEffect, useRef, useState } from "react";
import ListTable from "./ListTable/ListTable";
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
import { RxCross2 } from "react-icons/rx";
import { AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MobileNewsIndex = () => {

    // 👉 API constants 👈
    const { api_getNews, api_deleteActiveNews } = ApiList()

    // 👉 Dialog useRef 👈
    const dialogRef = useRef(null)

    const navigate = useNavigate()

    // 👉 State constants 👈
    const [newsData, setnewsData] = useState([])
    const [loader, setLoader] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorState, setErrorState] = useState(false)
    const [mType, setMType] = useState('')
    const [viewData, setViewData] = useState(null)

    // 👉 CSS constants 👈
    const addButton = "float-left mt-2 focus:outline-none border border-green-500 px-3 py-1 rounded-sm bg-green-500 text-white flex items-center"
    const editButton = "float-right focus:outline-none border border-cyan-900 px-3 py-1 rounded-sm hover:drop-shadow-md hover:bg-cyan-900 hover:text-white text-cyan-900 flex items-center"
    const deleteButton = "float-right focus:outline-none border border-red-500 px-3 py-1 rounded-sm hover:drop-shadow-md hover:bg-red-500 hover:text-white text-red-500 flex items-center"
    const labelStyle = 'text-gray-800 text-sm'
    const inputStyle = 'border focus:outline-none drop-shadow-sm focus:drop-shadow-md px-4 py-1 text-gray-700 shadow-black placeholder:text-sm'


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
                navigate('/mobile/news-form')
            } break;
            case 'edit': {
                setViewData(data)
                navigate(`/mobile/news-form/${data?.id}/edit`)
            } break;
            case 'delete': {
                setViewData(data)
                dialogRef.current.showModal()
            } break;
        }

    }

    // 👉 Table Columns 👈
    const COLUMNS = [
        {
            Header: "#",
            Cell: ({ row }) => <div className="pr-2">{row?.index + 1}</div>,
            className: "absolute top-2 left-2 text-blue-500 font-extrabold pl-2 drop-shadow-md text-sm bg-white text-center"
        },
        {
            Header: "Category",
            accessor: "category",
            Cell: ({ cell }) => <span className="items-center rounded-md px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                {(nullToNA(cell.row.original?.category))}
            </span>,
            className: "absolute top-2 right-2 text-blue-500 font-extrabold drop-shadow-md text-sm bg-white text-center"
        },
        {
            Header: "File",
            accessor: "file_name",
            Cell: ({ cell }) => {
                const fileName = cell.row.original?.file_name;

                if (fileName.endsWith('.jpeg') || fileName.endsWith('.png')) {
                    return <img src={fileName} alt="Image" className="" srcSet="" />;
                } else if (fileName.endsWith('.mp4')) {
                    return (
                        <video width="" height="240" controls>
                            <source src={fileName} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    );
                } else {
                    return 'N/A';
                }
            },
            className: 'w-full px-2 mb-4'
        },
        {
            Header: "Heading",
            accessor: "title",
            Cell: ({ cell }) => <><span className="font-bold my-1 px-2">Heading:</span> {nullToNA(cell.row.original?.title)}</>,
        },
        // {
        //     Header: "Top News",
        //     accessor: "top_news",
        //     Cell: ({ cell }) => <>
        //         {
        //             (cell.row.original?.top_news) ? <span className="font-semibold text-green-500">Yes</span> : <span className="font-semibold text-red-500">No</span>
        //         }
        //     </>,
        // },
        // {
        //     Header: "Author Name",
        //     accessor: "author_name",
        //     Cell: ({ cell }) => (nullToNA(cell.row.original?.author_name)),
        // },
        {
            Header: "Created At",
            accessor: "publication_date",
            Cell: ({ cell }) => <><span className="font-bold my-1 px-2">Created At:</span> {nullToNA(cell.row.original?.publication_date)}</>,
        },
        {
            Header: "Action",
            accessor: "id",
            Cell: ({ cell }) => (
                <div className="flex flex-row flex-wrap gap-2 my-2 px-2">
                    <button
                        onClick={() => handleModal('edit', cell?.row?.original)}
                        className={editButton}
                    >
                        <AiOutlineEdit />&nbsp; Edit
                    </button>
                    <button
                        onClick={() => handleModal('delete', cell?.row?.original)}
                        className={deleteButton}
                    >
                        <BiTrash /> &nbsp; Delete
                    </button>
                </div>
            ),
        },
    ];

    const formDataList = [
        { title: "From Date", key: "fromDate", width: 'md:w-[20%] w-full', type: 'date', hint: "", required: true, options: '', okey: '', ovalue: '' },
        { title: "Upto Date", key: "uptoDate", width: 'md:w-[20%] w-full', type: 'date', hint: "", required: true, options: '', okey: '', ovalue: '' },
    ]

    // 👉 Function 1 👈
    const inputBox = (key, title = '', type, width = '', hint = '', required = false, options = [], okey = '', ovalue = '') => {
        return (
            <div className={`flex flex-col ${width} `}>
                {title != '' && <label htmlFor={key} className={labelStyle}>{title} {required && <span className='text-red-500 text-xs font-bold'>*</span>} : </label>}
                {type != 'select' && type != 'file' && <input {...formik.getFieldProps(key)} type={type} className={inputStyle + ` ${(formik.touched[key] && formik.errors[key]) ? ' border-red-200 placeholder:text-red-400 ' : ' focus:border-zinc-300 border-zinc-200'}`} name={key} id="" placeholder={hint} />}
                {type == 'select' && <select {...formik.getFieldProps(key)} className={inputStyle + ` ${(formik.touched[key] && formik.errors[key]) ? ' border-red-200 placeholder:text-red-400 text-red-400' : ' focus:border-zinc-300 border-zinc-200 '}`}>

                    <option value="">All</option>
                    {
                        options?.map((elem) => <option className='' value={elem[okey]}>{elem[ovalue]}</option>)
                    }

                </select>}
            </div>
        );
    }

    // 👉 Validation Schema 👈
    const schema = yup.object().shape(
        [...formDataList]?.reduce((acc, elem) => {

            if (elem?.required) {
                acc[elem.key] = yup.string().required(elem?.hint)
            }

            return acc;
        }, {})
    );

    // 👉 Formik initial values 👈
    const initialValues = {
        fromDate: getCurrentDate(),
        uptoDate: getCurrentDate(),
    }

    // 👉 Formik constant 👈
    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: (values) => {
            getNewsList(values)
        },
    });

    // 👉 Function 3 👈
    const getNewsList = () => {

        setnewsData([])

        setLoader(true)

        let payload = {
            fromDate: formik.values.fromDate,
            toDate: formik.values.uptoDate,
        }

        axios
            .post(api_getNews, payload, ApiJsonHeader())
            .then((res) => {
                if (res?.data?.status) {
                    setnewsData(res?.data?.data)
                } else {
                    activateBottomErrorCard(true, checkErrorMessage(res?.data?.message))
                }
                console.log('news list response => ', res)
            })
            .catch((err) => {
                activateBottomErrorCard(true, 'Server Error! Please try again later.')
                console.log('error news list => ', err)
            })
            .finally(() => {
                setLoader(false)
            })
    }

    const deletFun = () => {

        setLoader(false)

        axios
            .post(api_deleteActiveNews, { id: viewData?.id }, ApiJsonHeader())
            .then((res) => {
                if (res?.data?.status) {
                    getNewsList();
                    toast.success("News Deleted Successfully !!!")
                } else {
                    activateBottomErrorCard(true, checkErrorMessage(res?.data?.message))
                }
            })
            .catch(err => {
                console.error(err)
                activateBottomErrorCard(true, 'Server Error! Please try again later.')
            })
            .finally(() => {
                setLoader(false)
                dialogRef.current.close()
            })
    }

    // 👉 To call Function 3 👈
    useEffect(() => {
        getNewsList()
    }, [])

    return (
        <>

            {/* 👉 Error Card 👈 */}
            <ErrorCard activateErrorCard={activateBottomErrorCard} status={errorState} message={errorMessage} />

            <div className="poppins p-4">

                {/* 👉 Heading 👈 */}
                <div className="uppercase font-semibold text-cyan-900 text-2xl py-2 text-center tracking-[0.3rem] border-b border-cyan-900">
                    News List
                </div>

                {/* 👉 Searching Form 👈 */}
                <form onSubmit={formik.handleSubmit} onChange={formik.handleChange} className="bg-white poppins p-4 mt-4 mb-8 drop-shadow-md">

                    <section className='flex gap-4 flex-wrap my-6'>

                        {
                            formDataList?.map((elem) => {
                                return inputBox(elem?.key, elem?.title, elem?.type, elem?.width, elem?.hint, elem?.required, elem?.options, elem?.okey, elem?.ovalue)
                            })
                        }
                        {/* 👉 Submit Button 👈 */}
                        <div className="mt-4 w-full md:w-[30%] flex flex-row flex-wrap items-center gap-x-4 gap-y-2 md:mt-4">
                            <div className=" ">{
                                loader ?
                                    <>
                                        {
                                            <div className='flex justify-center'>
                                                <RotatingLines
                                                    strokeColor="grey"
                                                    strokeWidth="5"
                                                    animationDuration="0.75"
                                                    width="25"
                                                    visible={true}
                                                />
                                            </div>
                                        }
                                    </>
                                    :

                                    <button
                                        type="submit"
                                        className=" flex items-center border border-green-600 bg-green-500 hover:bg-green-600 text-white shadow-md rounded-sm  text-sm px-5 py-1"
                                    >
                                        <span>Search Record</span>
                                    </button>

                            }
                            </div>
                        </div>
                    </section>

                </form>

                {/* 👉 Table Loader 👈 */}
                {loader && <ShimmerEffectInline />}


                {/* 👉 Table 👈 */}
                {!loader &&
                    <>
                        {newsData?.length > 0 ?

                            <>
                                <ListTable
                                    columns={COLUMNS}
                                    dataList={newsData}
                                    exportStatus={false}
                                >
                                        <button className={addButton + ' text-sm '} onClick={() => handleModal('add')}> <IoMdAddCircle />&nbsp; Add News</button>
                                </ListTable>
                            </>
                            :
                            <div className="relative flex flex-col justify-center">
                                <button className={addButton + ' text-sm self-end'} onClick={() => handleModal('add')}><IoMdAddCircle />&nbsp; Add News</button>
                                <div className="my-4 bg-red-100 text-red-500 py-2 text-base font-semibold text-center border border-red-500 drop-shadow-sm">Oops! No Data Found.</div>
                            </div>}

                    </>}
            </div>

            <dialog ref={dialogRef} className={`backdrop:backdrop-brightness-75 relative animate__animated animate__zoomIn animate__faster`}>

                <div className='border bg-white z-50 px-6 py-4 flex flex-col gap-4'>
                    <div className='flex items-center gap-6'>
                        <span className='text-red-500 bg-red-100 p-2 block rounded-full drop-shadow-md shadow-red-300'><FiAlertCircle size={25} /></span>
                        <div className='flex flex-col gap-2'>
                            <span className='text-xl font-semibold border-b pb-1'>Confirmation</span>
                            <span className='text-base'>Are you sure want to delete ?</span>
                        </div>
                    </div>
                    <div className='flex justify-end gap-2'>
                        <button className='text-white bg-slate-400 hover:bg-slate-500 px-4 py-1 text-sm ' onClick={() => dialogRef.current.close()}>No</button>
                        <button className='text-white bg-red-500 hover:bg-red-600 px-4 py-1 text-sm ' onClick={() => deletFun()}>Yes</button>
                    </div>
                </div>

            </dialog>

        </>
    )
}

export default MobileNewsIndex