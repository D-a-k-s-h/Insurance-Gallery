import React from 'react'
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { TbReportAnalytics } from 'react-icons/tb'
import { useLocation, useNavigate } from 'react-router-dom';

const NonMotorReportDetails = () => {

    const location = useLocation();
    const {motorData} = location.state || {};
    const navigate = useNavigate();

  return (
    <div className='w-full h-full overflow-auto'>
        <div className='w-full h-full flex flex-col gap-10 justify-center'>
            <div className='w-full flex flex-col gap-1 justify-center'>
                <p className='text-2xl font-mono'>Non Motor Report</p>
                <p className='flex flex-row gap-2 items-center font-mono'><TbReportAnalytics className='text-blue-50 text-lg' /> <span className='text-blue-50'>Reporting</span>/ Non Motor Report</p> 
            </div>

            <div className='w-full flex flex-col gap-2'>
                <p className='text-brown-50'>NON MOTOR REPORT DETAILS</p>
                <div className='w-full bg-richblack-800 border p-3 border-richblack-800 rounded-md grid grid-cols-2 md:grid-cols-4'>
                    
                    <p className='border p-2'>CASE TYPE</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.caseType}</p>
                    
                    <p className='border p-2'>POLICY NO</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.policyNo}</p>

                    <p className='border p-2'>CUSTOMER NAME</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.customerName}</p>

                    <p className='border p-2'>CUSTOMER MOBILE</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.mobileNo}</p>
                    
                    <p className='border p-2'>EMAIL ID</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.email}</p>

                    <p className='border p-2'>POLICY TYPE</p>
                    <p className='border p-2 text-richblack-50 border-white'>{motorData?.policyType}</p>

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
                    <a href={motorData?.uploadPYP} className='border p-2 text-caribbeangreen-200 border-white hover:underline'>{motorData?.uploadPYP === '[object File]' ? 'Download' : 'No file uploaded'}</a>

                    <p className='border p-2'>POLICY</p>
                    <a href={motorData?.uploadPolicy} className='border p-2 text-caribbeangreen-200 border-white hover:underline'>{motorData?.uploadPolicy === '[object File]' ? 'Download' : 'No file uploaded'}</a>

                    <p className='border p-2'>OTHER DOCS</p>
                    <a href={motorData?.uploadOtherDocs} className='border p-2 text-caribbeangreen-200 border-white hover:underline'>{motorData?.uploadOtherDocs === '[object File]' ? 'Download' : 'No file uploaded'}</a>
                </div>

                <button type='button' className='btn btn-info w-fit' onClick={() => navigate(-1)}><FaLongArrowAltLeft/>Back</button>
            </div>
        </div>
    </div>
  )
}

export default NonMotorReportDetails