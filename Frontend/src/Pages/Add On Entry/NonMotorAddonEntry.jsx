import React from 'react'
import { TiHome } from 'react-icons/ti'
import EntryForm from '../../Components/Common/EntryForm'

const NonMotorAddonEntry = () => {
  return (
    <div className='w-full h-full overflow-auto'>
        <div className='w-full h-full flex flex-col gap-10 justify-center'>
            <div className='w-full flex flex-col gap-1 justify-center'>
                <p className='text-2xl font-mono'>Non Motor Addon Entry</p>
                <p className='flex flex-col md:flex-row gap-2 items-center font-mono'><TiHome className='text-blue-50 text-lg -translate-y-0.5' /> <p className='flex flex-row gap-2'><span className='text-blue-50'>Data Entry</span>/ Non Motor Addon Entry</p></p>
            </div>
            <div className='w-full'>
                <p className='text-brown-50'>BASIC INFORMATION</p>
                <EntryForm vehicleType={"Non Motor Addon"} updation={true} productType={"Non-Motor"}/>
            </div>
        </div>
    </div>
  )
}

export default NonMotorAddonEntry