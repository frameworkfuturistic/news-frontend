///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 👉 Author      : R U Bharti
// 👉 Component   : CareerIndex
// 👉 Date        : 21-09-2023
// 👉 Status      : Close
// 👉 Description : CRUD opeartion for department, section and violation master.
// 👉 Functions   :  
//                  1. activateBottomErrorCard -> Activate error card to show in screen.
//                  2. handleModal             -> To handle dialog type.
//                  3. getViolationList        -> To get violation list.
//                  4. inputBox                -> To map input field.
//                  5. submitFun               -> Submit final data
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// 👉 Importing Packages 👈
import React, { useEffect, useRef, useState } from "react";
import ListTable from "@/Components/Common/ListTable/ListTable";
import { ApiList } from "@/Components/api/ApiList";
import { checkErrorMessage, getCurrentDate, indianDate, nullToNA } from "@/Components/Common/PowerupFunctions";
import ShimmerEffectInline from "@/Components/Common/Loaders/ShimmerEffectInline";
import { RxCross2 } from "react-icons/rx";
import * as yup from 'yup'
import { useFormik } from "formik";
import ErrorCard from "@/Components/Common/ErrorCard";
import axios from "axios";
import { ApiJsonHeader } from "@/Components/Api/ApiJsonHeader";
import { RotatingLines } from "react-loader-spinner";
import CareerFormView from "./CareerFormView";

const CareerIndex = () => {

    // 👉 API constants 👈
    const { api_getCareerList } = ApiList()


    // 👉 Dialog useRef 👈
    const dialogRef = useRef()

    // 👉 State constants 👈
    const [careerData, setcareerData] = useState([])
    const [loader, setLoader] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorState, setErrorState] = useState(false)
    const [viewStatus, setViewStatus] = useState(false)
    const [viewData, setViewData] = useState(null)

    // 👉 CSS constants 👈
    const addButton = "float-right focus:outline-none border border-cyan-900 px-3 py-1 rounded-sm shadow-lg hover:drop-shadow-md hover:bg-cyan-900 hover:text-white text-cyan-900 flex items-center"
    const labelStyle = 'text-gray-800 text-sm'
    const inputStyle = 'border focus:outline-none drop-shadow-sm focus:drop-shadow-md px-4 py-1 text-gray-700 shadow-black placeholder:text-sm'


    // 👉 Function 1 👈
    const activateBottomErrorCard = (state, message) => {
        setErrorState(state)
        setErrorMessage(message)
    }

    // 👉 Function 2 👈
    const handleModal = (type, data = null) => {

        console.log(type, ":::::::::", data)

        switch(type){
            case 'view':{
                setViewStatus(true)
                setViewData(data)
            }break;
        }

    }

    // {
    //     "id": 118,
    //     "applied_for": "Anchor",
    //     "photo": "http://live.framework-futuristic.com/media/1698391846-PHOTO-4124589632.png",
    //     "name": "test",
    //     "email": "admin@gmail.com",
    //     "mobile": "4124589632",
    //     "dob": "2023-10-20",
    //     "qualification": "Masters",
    //     "present_address": "tstststs",
    //     "permanent_address": "tstststs",
    //     "is_working": "No",
    //     "present_salary": "",
    //     "salary_doc": "",
    //     "work_link": "",
    //     "expected_salary": "5000.00",
    //     "ref_name1": "anshu",
    //     "ref_name2": "",
    //     "ref_mobile2": "",
    //     "applied_date": "2023-10-27"
    //   },

    // 👉 Table Columns 👈
    const COLUMNS = [
        {
            Header: "#",
            Cell: ({ row }) => <div className="pr-2">{row?.index + 1}</div>,
        },
        {
            Header: "Applied For",
            accessor: "applied_for",
            Cell: ({ cell }) => (nullToNA(cell.row.original?.applied_for)),
        },
        {
            Header: "Name",
            accessor: "name",
            Cell: ({ cell }) => (nullToNA(cell.row.original?.name)),
        },
        {
            Header: "Mobile No.",
            accessor: "mobile",
            Cell: ({ cell }) => (nullToNA(cell.row.original?.mobile)),
        },
        {
            Header: "Working",
            accessor: "is_working",
            Cell: ({ cell }) => (nullToNA(cell.row.original?.is_working)),
        },
        {
            Header: "Action",
            accessor: "id",
            Cell: ({ cell }) => (
                <div className="flex flex-row flex-wrap gap-2">
                    <button
                        onClick={() => handleModal('view', cell?.row?.original)}
                        className={addButton}
                    >
                        Preview
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
            getCareerList(values)
        },
    });

    // 👉 Function 3 👈
    const getCareerList = () => {

        setcareerData([])

        setLoader(true)

        let payload = {
            fromDate: formik.values.fromDate,
            toDate: formik.values.uptoDate,
        }

        console.log(ApiJsonHeader)

        axios
            .post(api_getCareerList, payload, ApiJsonHeader)
            .then((res) => {
                if (res?.data?.status) {
                    setcareerData(res?.data?.data)
                } else {
                    activateBottomErrorCard(true, checkErrorMessage(res?.data?.message))
                }
                console.log('career list response => ', res)
            })
            .catch((err) => {
                activateBottomErrorCard(true, 'Server Error! Please try again later.')
                console.log('error career list => ', err)
            })
            .finally(() => {
                setLoader(false)
            })
    }


    // 👉 To call Function 3 👈
    useEffect(() => {
        getCareerList()
    }, [])

    return (
        <>

            {/* 👉 Error Card 👈 */}
            <ErrorCard activateErrorCard={activateBottomErrorCard} status={errorState} message={errorMessage} />

            <CareerFormView status={viewStatus} data={viewData} close={() => setViewStatus(false)} />

            <div className="poppins p-4 px-6">

                {/* 👉 Heading 👈 */}
                <div className="uppercase font-semibold text-cyan-900 text-2xl py-2 text-center tracking-[0.3rem] border-b border-cyan-900">
                    Career Applied List
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
                        {careerData?.length > 0 ?

                            <>
                                <ListTable
                                    columns={COLUMNS}
                                    dataList={careerData}
                                />
                            </>
                            :
                            <>
                                <div className="my-4 bg-red-100 text-red-500 py-2 text-base font-semibold text-center border border-red-500 drop-shadow-sm">Oops! No Data Found.</div>
                            </>}

                    </>}
            </div>

        </>
    );
}
export default CareerIndex;