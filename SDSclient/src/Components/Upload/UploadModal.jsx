import React from 'react'

const UploadModal = ({isVisible, onClose, children}) => {
    if(!isVisible) return null;

    const handleClose = (e) => {
        if(e.target.id === 'wrapper') onClose();
    }
  return (
    <div className=' fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id='wrapper'>
        <div className='w-[480px] flex flex-col'>
            <div className='bg-white p-2 rounded-md'>
                <button className=' ml-10 rounded-md p-2 hover:bg-slate-200' onClick={() => onClose()}>X</button>
                {children}
            </div>
        </div>
    </div>
  )
}

export default UploadModal