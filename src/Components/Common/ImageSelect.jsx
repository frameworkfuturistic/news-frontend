import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegCopy } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import Select from 'react-select';

const ImageSelect = (props) => {

  const dialogRef = useRef()

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    props?.imageSelected(option[props?.okey], option[props?.ovalue])
    dialogRef.current.close()
  };

  const diaologCloseFun = () => {
    dialogRef.current.close()
  }

  const copyImageLink = (imageLink) => {
    navigator.clipboard.writeText(imageLink)
      .then(() => {
        toast.success('Image Link Copied')
        alert('Image Link Copied')
        console.log('Image link copied to clipboard:', imageLink);
        // You can add any additional logic or feedback here
      })
      .catch((error) => {
        console.error('Error copying image link to clipboard:', error);
        // Handle the error or provide user feedback
      });
  };


  return (
    <>
      <div className='cursor-pointer text-sm w-full text-center h-full bg-slate-300 py-1 hover:text-white hover:bg-slate-500' onClick={() => dialogRef.current.showModal()}>View Media</div>

      <dialog ref={dialogRef} className='backdrop:backdrop-brightness-75 animate__animated animate__faster animate__zoomIn p-4 w-full md:w-[70vw] h-[90vh] focus:outline-none bg-slate-50'>

        <span className='absolute top-2 right-2 text-sm p-1.5 bg-red-200 hover:bg-red-300 rounded-full cursor-pointer ' onClick={() => diaologCloseFun()}><RxCross2 /></span>

        <div className="w-full flex flex-wrap gap-2">

          <h1 className="w-full text-center text-xl font-bold border-b pb-1 mb-4">Media Selection</h1>

          <div className="w-full">
            <div className='w-full md:w-[48%] flex flex-col gap-1 '>
              <label htmlFor="" className={props?.style.label}>Select Tags to get media<span className='font-bold text-xs text-red-500'>*</span></label>
              <Select
                name='tags'
                isMulti
                options={props?.tagList?.map((elem) => {
                  return { label: elem?.tag_name, value: elem?.tag_name }
                }) ?? []}
                onChange={props?.handleChange}
                value={props?.selectedOptions}
              />
            </div>
          </div>

          {
            props?.options?.map((elem, index) =>
              <div className='w-full md:w-[24%] flex flex-col items-center justify-between'>
                <img onClick={() => handleOptionChange(elem)} src={elem[props?.ovalue]} className='border cursor-pointer hover:drop-shadow-lg hover:bg-slate-200 bg-white py-1 px-4 text-sm w-full rop-shadow-md object-contain bg-contain' alt="Media" srcset="" />
                <div onClick={() => copyImageLink(elem?.file_name)} className='cursor-pointer select-none text-center w-full text-sm flex items-center gap-2 justify-center my-2 bg-green-500 py-1 text-white hover:bg-green-600 hover:drop-shadow-lg '><FaRegCopy /> Copy Image Link</div>
              </div>)
          }

          {
            props?.options?.length == 0 && <div className='w-full text-center text-red-500 bg-red-100 py-2 '>Select tags to get media list</div>
          }

        </div>

      </dialog>
    </>
  );
};

export default ImageSelect;