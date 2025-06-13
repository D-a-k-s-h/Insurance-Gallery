import React from 'react'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed w-screen inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
      <div className='mx-auto flex flex-col text-lg gap-4 py-5 px-10 rounded-md border border-richblack-500 bg-richblack-900 text-richblack-5'>
        <p className='text-3xl'>{modalData.heading}</p>
        <p className='text-richblack-200'>{modalData.para}</p>
        <div className='flex flex-row gap-4'>
          <button onClick={modalData.textBtn1Action} className='bg-[#bc2828] rounded py-1 px-2 font-medium text-white'>{modalData.textBtn1}</button>
          <button onClick={modalData.textBtn2Action} className='py-1 px-2 bg-richblack-800 border border-richblack-500 rounded font-medium text-richblack-100'>{modalData.textBtn2}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal