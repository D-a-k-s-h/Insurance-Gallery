import React from 'react'
import Sidebar from '../Components/Common/Sidebar'
import { Outlet } from 'react-router-dom'
import LogoutButton from '../Components/Common/LogoutButton'

const Dashboard = () => {
  return (
    <div className='w-screen h-screen bg-richblack-900 text-richblack-5 font-fira overflow-hidden'>
        <div className='w-full max-h-full flex flex-row justify-between overflow-hidden'>
            <Sidebar/>
            <div className='w-full max-h-full p-5'>
              <div className='w-full overflow-auto max-h-full'>
                <Outlet/>
              </div>
            </div>
            <LogoutButton/>
        </div>
    </div>
  )
}

export default Dashboard