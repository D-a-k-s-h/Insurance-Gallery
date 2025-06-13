import React from 'react'
import { useState } from 'react';
import { TbReportAnalytics } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux';
import { getPolicyInfo } from '../../services/operations/searchAPI';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from "react-icons/fa";

const MotorReportDetails = () => {

    const location = useLocation();
    const {motorData} = location.state || {};
    const navigate = useNavigate();

    console.log("motorData -> ",motorData);

  return (
    <div className='w-full h-full overflow-auto'>
        <div className='w-full h-full flex flex-col gap-10 justify-center'>
            <div className='w-full flex flex-col gap-1 justify-center'>
                <p className='text-2xl font-mono'>Motor Report</p>
                <p className='flex flex-row gap-2 items-center font-mono'><TbReportAnalytics className='text-blue-50 text-lg' /> <span className='text-blue-50'>Reporting</span>/ Motor Report</p> 
            </div>

            <div className='w-full flex flex-col gap-2'>
                <p className='text-brown-50'>MOTOR REPORT DETAILS</p>
                <div className='w-full bg-richblack-800 border md:p-3 border-richblack-800 rounded-md grid grid-cols-2 md:grid-cols-4'>
                    
                    <p className='border p-2'>CASE TYPE</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.caseType}</p>
                    
                    <p className='border p-2'>POLICY NO</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.policyNo}</p>

                    <p className='border p-2'>CUSTOMER NAME</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.customerName}</p>

                    <p className='border p-2'>CUSTOMER MOBILE</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.mobileNo}</p>
                    
                    <p className='border p-2'>EMAIL ID</p>
                    <p className='w-fit bg-richblack-800 sm:w-full border p-2 text-richblack-50 border-white'>{motorData?.email}</p>

                    <p className='border p-2'>VEHICLE NO</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.vehicleNo}</p>
                    
                    <p className='border p-2'>VEHICLE TYPE</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.vehicleType}</p>

                    <p className='border p-2'>AGENT NAME</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.agentName}</p>

                    <p className='border p-2'>RM NAME</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.rmName}</p>

                    <p className='border p-2'>POLICY START DATE</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.policyStartDate}</p>
                   
                    <p className='border p-2'>POLICY EXPIRY DATE</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.policyExpiryDate}</p>

                    <p className='border p-2'>CASE TYPE</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.typeOfCase}</p>
        
                    <p className='border p-2'>POLICY ENTRY DATE</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.policyEntryDate}</p>

                    <p className='border p-2'>COMPANY CODE</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.companyCode}</p>

                    <p className='border p-2'>MAKE</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.make}</p>

                    <p className='border p-2'>MODEL</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.model}</p>

                    <p className='border p-2'>FUEL TYPE</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.fuelType}</p>

                    <p className='border p-2'>OD AMOUNT</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.odAmount}</p>

                    <p className='border p-2'>NET AMOUNT</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.netAmount}</p>

                    <p className='border p-2'>TOTAL AMOUNT</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.totalAmount}</p>

                    <p className='border p-2'>COMPANY NAME</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.companyName}</p>

                    <p className='border p-2'>COMPANY ID</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.companyName}</p>

                    <p className='border p-2'>PYP</p>
                    <a target='_blank' rel='noopener noreferrer' href={motorData?.uploadPYP} className='border p-2 text-caribbeangreen-200 border-white hover:underline'>{motorData?.uploadPYP !== '[object File]' ? 'Download' : 'No file uploaded'}</a>

                    <p className='border p-2'>RC</p>
                    <a target='_blank' rel='noopener noreferrer' href={motorData?.uploadRC} className='border p-2 text-caribbeangreen-200 border-white hover:underline'>{motorData?.uploadRC !== '[object File]' ? 'Download' : 'No file uploaded'}</a>

                    <p className='border p-2'>POLICY</p>
                    <a target='_blank' rel='noopener noreferrer' href={motorData?.uploadPolicy} className='border p-2 text-caribbeangreen-200 border-white hover:underline'>{motorData?.uploadPolicy !== '[object File]' ? 'Download' : 'No file uploaded'}</a>

                    <p className='border p-2'>OTHER DOCS</p>
                    <a target='_blank' rel='noopener noreferrer' href={motorData?.uploadOtherDocs} className='border p-2 text-caribbeangreen-200 border-white hover:underline'>{motorData?.uploadOtherDocs !== '[object File]' ? 'Download' : 'No file uploaded'}</a>
                </div>

                <button type='button' className='btn btn-info w-fit' onClick={() => navigate(-1)}><FaLongArrowAltLeft/>Back</button>
            </div>
        </div>
    </div>
  )
}

export default MotorReportDetails