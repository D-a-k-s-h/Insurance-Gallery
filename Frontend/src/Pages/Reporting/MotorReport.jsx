import React, { useEffect, useState } from 'react'
import { TbReportAnalytics } from "react-icons/tb";
import Table from '../../Components/Common/Table';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getPolicyInfo } from '../../services/operations/searchAPI';
import { Link } from 'react-router-dom';

const MotorReport = () => {

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [motorReport,setMotorReport] = useState([]);

    const columns = [
        { name:"ID", label: "ID"},
        { name: "CUST NAME", label: "CUST NAME" },
        { name: "MOBILE NO", label: "MOBILE NO" },
        { name: "VEHICLE NO", label: "VEHICLE NO" },
        { name: "POLICY NO", label: "POLICY NO" },
        { name: "MODEL", label: "MODEL" },
        { name: "MAKE", label: "MAKE" },
        { name: "AGENT NAME", label: "AGENT NAME" },
        { 
            name: "PREMIUM", label: "PREMIUM",
            options:{
                customBodyRender: (value) => (
                    <span className=' text-caribbeangreen-200'>{value}</span>
                )
            }
        },
        { name:"ACTION", label: "ACTION"}
    ];

    const data = motorReport.length > 0
    ? motorReport.map((motorData,index) => ([index+1,motorData?.customerName,motorData?.mobileNo,motorData?.vehicleNo,motorData?.policyNo,motorData?.model,motorData?.make,motorData?.agentName,motorData?.premium,<Link to={"/reporting/motor-report-details"} state={{motorData}} className='text-sm btn btn-outline'>Details</Link>]))
    : [];

    const options = {
        filterType: "checkbox",
        download: true,
        print: true,
        search: true,
        selectableRows: "none",
        rowsperPage: 5,
        rowsPerPageOptions: [5, 10, 20],
        responsive:"standard",
        customToolbar: () => (
            <IconButton onClick={() => exportToExcel(data)} className='relative group'>
                <PiMicrosoftExcelLogoFill/>
                <span className="absolute z-[10000] top-0.5 -right-6 mt-14 px-1 py-1 rounded bg-richblack-400 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Download excel file
                </span>
            </IconButton>
        )
    };

    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, { bookType:"xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "MOTOR_REPORT.xlsx");
    }

    const fetchPolicyInfo = async() => {
        const result = await dispatch(getPolicyInfo("Motor",token));
        if(result){
            setMotorReport(result);
        }
    }

    useEffect(() => {
        fetchPolicyInfo();
    },[]);

  return (
    <div className='w-full h-full overflow-auto'>
        <div className='w-full h-full flex flex-col gap-10 justify-center'>
            <div className='w-full h-full flex flex-col gap-1 justify-center'>
                <p className='text-2xl font-mono'>Motor Report</p>
                <p className='flex flex-row gap-2 items-center font-mono'><TbReportAnalytics className='text-blue-50 text-lg' /> <span className='text-blue-50'>Reporting</span>/ Motor Report</p> 
            </div>

            <div className='w-full h-full flex flex-col gap-4'>
                <p className='text-brown-50'>MOTOR REPORT</p>
                <div className='w-full'>
                    <Table options={options} columns={columns} data={data}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MotorReport