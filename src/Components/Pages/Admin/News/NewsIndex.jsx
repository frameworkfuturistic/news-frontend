// 👉 Importing Packages 👈
import React, { useEffect, useRef, useState } from "react";
import ListTable from "@/Components/Common/ListTable/ListTable";
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
import { useNavigate } from "react-router-dom";

const NewsIndex = () => {

    // 👉 API constants 👈
    const { api_getNews, api_deleteNews } = ApiList()

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
    const addButton = "float-right focus:outline-none border border-green-500 px-3 py-1 rounded-sm shadow-lg hover:drop-shadow-md hover:bg-green-500 hover:text-white text-green-500 flex items-center"
    const editButton = "float-right focus:outline-none border border-cyan-900 px-3 py-1 rounded-sm shadow-lg hover:drop-shadow-md hover:bg-cyan-900 hover:text-white text-cyan-900 flex items-center"
    const deleteButton = "float-right focus:outline-none border border-red-500 px-3 py-1 rounded-sm shadow-lg hover:drop-shadow-md hover:bg-red-500 hover:text-white text-red-500 flex items-center"
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
                navigate('/news-form')
            } break;
            case 'edit': {
                setViewData(data)
                navigate(`/news-form/${data?.id}`)
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
        },
        {
            Header: "Category",
            accessor: "category",
            Cell: ({ cell }) => (nullToNA(cell.row.original?.category)),
        },
        {
            Header: "File",
            accessor: "source",
            Cell: ({ cell }) => (nullToNA(cell.row.original?.source)),
        },
        {
            Header: "Heading",
            accessor: "heading",
            Cell: ({ cell }) => (nullToNA(cell.row.original?.heading)),
        },
        {
            Header: "Top News",
            accessor: "top_news",
            Cell: ({ cell }) => <>
                {
                    (cell.row.original?.top_news) ? <span className="font-semibold text-green-500">Yes</span> : <span className="font-semibold text-red-500">No</span>
                }
            </>,
        },
        // {
        //     Header: "Author Name",
        //     accessor: "author_name",
        //     Cell: ({ cell }) => (nullToNA(cell.row.original?.author_name)),
        // },
        {
            Header: "Created At",
            accessor: "created_at",
            Cell: ({ cell }) => (nullToNA(cell.row.original?.created_at)),
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
                        Edit
                    </button>
                    <button
                        onClick={() => handleModal('delete', cell?.row?.original)}
                        className={deleteButton}
                    >
                        Delete
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


    // 👉 To call Function 3 👈
    useEffect(() => {
        getNewsList()
    }, [])

    return (
        <>

            {/* 👉 Error Card 👈 */}
            <ErrorCard activateErrorCard={activateBottomErrorCard} status={errorState} message={errorMessage} />

            <div className="poppins p-4 px-6">

                {/* 👉 Heading 👈 */}
                <div className="uppercase font-semibold text-cyan-900 text-2xl py-2 text-center tracking-[0.3rem] border-b border-cyan-900">
                    News Master
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
                                >
                                    <button className={addButton + ' text-sm'} onClick={() => handleModal('add')}>Add News</button>
                                </ListTable>
                            </>
                            :
                            <>
                                <div className="my-4 bg-red-100 text-red-500 py-2 text-base font-semibold text-center border border-red-500 drop-shadow-sm">Oops! No Data Found.</div>
                            </>}

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
                        <button className='text-white bg-red-500 hover:bg-red-600 px-4 py-1 text-sm ' onClick={() => LogOutUser()}>Yes</button>
                    </div>
                </div>

            </dialog>

        </>
    )
}

export default NewsIndex