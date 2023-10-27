import React, { useEffect, useRef } from 'react';
import { Preview, print } from 'react-html2pdf';
import { RxCross2 } from 'react-icons/rx';
import PreviewForm from './PreviewForm';

function CareerFormView(props) {

    const modalRef = useRef(null)

    useEffect(() => {
        props?.status && modalRef.current.showModal()
    }, [props?.status])

    const closeFun = () => {
        props?.close()
        modalRef.current.close()
    }

    return (
        <>
            <dialog ref={modalRef} className='backdrop:backdrop-brightness-75 p-4 max-h-[90vh] max-w-[90vw] md:max-w-[50vw] relative'>

                <span className='absolute top-2 right-2 text-sm p-1.5 bg-red-200 hover:bg-red-300 rounded-full cursor-pointer ' onClick={() => closeFun()}><RxCross2 /></span>

                <Preview id={'jsx-template'}>
                    <PreviewForm data={props?.data} status={props?.status} />
                </Preview>
                <div className='w-full flex justify-center my-4'>
                    <button onClick={() => print('career-pdf', 'jsx-template')} className='px-4 py-1 text-sm bg-cyan-900 text-white select-none hover:bg-cyan-950'>Download PDF</button>
                </div>
            </dialog>
        </>
    );
}

export default CareerFormView;
