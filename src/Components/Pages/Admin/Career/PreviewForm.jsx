import { indianAmount, indianDate, nullToNA } from '@/Components/Common/PowerUpFunctions'
import React from 'react'
const PreviewForm = ({data, status}) => {

    console.log(data)

  return (
    <div className={`${status ? 'block' : 'hidden'} p-6 text-sm`}>
      <div className='p-2 h-max  border border-black'>
        <div className='  flex flex-row justify-center bg-cyan-600'>
          <p className='text-xl font-semibold text-white my-2 '>Applicant Details </p>
        </div>
        <div className='flex flex-row flex-wrap gap-2 my-2 '>
          <p className='border border-black w-full flex items-center'> <img src={data?.photo} className='w-32' alt="" />   </p>
        <div className='w-full p-2 border border-cyan-600 '>
            <div>
              <p className='text-base font-bold font-serif text-cyan-600'>Basic Details  </p>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '>Applied for :  </p>
                <p className=' mx-2 '> {data?.applied_for} </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '>Name  :  </p>
                <p className=' mx-12 '> {data?.name} </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '>Email  :  </p>
                <p className=' mx-10 '> {data?.email} </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '>Mobile  :  </p>
                <p className=' mx-10 '> {data?.mobile} </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '>DOB  :  </p>
                <p className=' mx-14 '> {indianDate(data?.dob)} </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '>Qualification   :  </p>
                <p className=' mx-2 '> {data?.qualification}  </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '>Permanent Address    :  </p>
                <p className=' mx-2 '> {data?.permanent_address}  </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '>Present Address    :  </p>
                <p className=' mx-2 '> {data?.present_address}  </p>
              </div>
            </div>
          </div>
          </div>
        <div className='grid grid-cols-12'>
          
          <div className='col-span-12 md:col-span-12 p-2 border my-2 mx-1  border-blue-600 '>
            <div className=''>
              <p className='text-sm font-bold font-serif text-blue-600'>Work Experience   </p>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '>Currently Working  :  </p>
                <p className=' mx-2 '> {data?.is_working} </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '> Company Name   :  </p>
                <p className=' mx-6 '> {nullToNA(data?.company_name)} </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '> Present Salary   :  </p>
                <p className=' mx-6 '> {indianAmount(data?.present_salary)} </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '> Salary  Proof :  </p>
                <p className=' mx-6 '> <a href={data?.salary_doc} target='_blank'>{data?.salary_doc ? "View" : "N/A"}</a> </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '> Expected Salary   :  </p>
                <p className=' mx-6 '> {indianAmount(data?.expected_salary)} </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '> Refrence Name    :  </p>
                <p className=' mx-6 '> {nullToNA(data?.ref_name1)}  </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '> Refrence Mobile No.    :  </p>
                <p className=' '> {nullToNA(data?.ref_mobile1)}  </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '> Refrence Name 2   :  </p>
                <p className=' mx-6 '> {nullToNA(data?.ref_name2)}  </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '> Refrence Mobile No. 2   :  </p>
                <p className=' '> {nullToNA(data?.ref_mobile2)}  </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '> Work Link Url   :  </p>
                <p className=' '>  {nullToNA(data?.work_link)}  </p>
              </div>
              <div className='  flex my-2 '>
                <p className='text-sm font-medium mx-2 '> Remarks    :  </p>
                <p className=' '> {nullToNA(data?.remarks)}  </p>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default PreviewForm