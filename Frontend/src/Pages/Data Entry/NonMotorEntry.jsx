import React from 'react'
import { TiHome } from 'react-icons/ti'
import EntryForm from '../../Components/Common/EntryForm'

const NonMotorEntry = () => {
  return (
    <div className='w-full h-full overflow-auto'>
        <div className='w-full h-full flex flex-col gap-10 justify-center'>
            {/*Heading etc*/}
            <div>
                <p className='font-mono text-2xl'>Add Non-Motor Entry</p>
                <p className='flex flex-col md:flex-row gap-2 items-center font-mono'><TiHome className='text-blue-50 text-lg -translate-y-0.5' /> <p className='flex flex-row gap-2'><span className='text-blue-50'>Data Entry</span>/ Add Non Motor Entry</p></p>
            </div>

            {/*Form for Non-Motor Entry*/}
            <div className='w-full'>
                <p className='text-brown-50'>COLOR PICKERS</p>
                <EntryForm vehicleType={"Non-Motor"} updation={false} productType={"Non-Motor"}/>
            </div>
        </div>

    </div>
  )
}

export default NonMotorEntry