import React, { useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

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

  return (
    <>
        <div className='cursor-pointer text-sm w-full text-center h-full bg-slate-300 py-1 hover:text-white hover:bg-slate-500' onClick={() => dialogRef.current.showModal()}>View Media</div>

        <dialog ref={dialogRef} className='backdrop:backdrop-brightness-75 animate__animated animate__faster animate__zoomIn p-4 w-full md:w-[70vw] focus:outline-none bg-slate-50'>

        <span className='absolute top-2 right-2 text-sm p-1.5 bg-red-200 hover:bg-red-300 rounded-full cursor-pointer ' onClick={() => diaologCloseFun()}><RxCross2 /></span>

            <div className="w-full flex flex-wrap gap-2">
                
                <h1 className="w-full text-center text-xl font-bold border-b pb-1 mb-4">Media Selection</h1>

                {
                    props?.options?.map((elem, index) => 
                    <>
                        <img onClick={() => handleOptionChange(elem)} src={elem[props?.ovalue]} className='border cursor-pointer hover:drop-shadow-lg hover:bg-slate-200 bg-white py-1 px-4 text-sm w-full md:w-1/4 rop-shadow-md object-contain bg-contain' alt="Media" srcset="" />
                    </>)
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