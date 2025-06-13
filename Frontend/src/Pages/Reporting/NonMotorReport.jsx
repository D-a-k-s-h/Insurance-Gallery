import React, { useEffect, useState } from 'react'
import { TbReportAnalytics } from 'react-icons/tb'
import Table from '../../Components/Common/Table'
import { getPolicyInfo } from '../../services/operations/searchAPI';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Link } from 'react-router-dom';

const NonMotorReport = () => {

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [nonMotorReport,setNonMotorReport] = useState([]);

    const columns = [
        { name:"ID", label: "ID"},
        { name: "CUST NAME", label: "CUST NAME" },
        { name: "MOBILE NO", label: "MOBILE NO" },
        { name: "POLICY NO", label: "POLICY NO" },
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

    const data = nonMotorReport.length > 0
    ? nonMotorReport.map((motorData,index) => ([index+1,motorData?.customerName,motorData?.mobileNo,motorData?.policyNo,motorData?.agentName,motorData?.premium,<Link to={"/reporting/non-motor-report-details"} state={{motorData}} className='text-sm btn btn-outline'>Details</Link>]))
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
        saveAs(dataBlob, "NON_MOTOR_REPORT.xlsx");
    }

    useEffect(() => {
        const fetchPolicyInfo = async() => {
            const result = await dispatch(getPolicyInfo("Non-Motor",token));
            if(result){
                setNonMotorReport(result);
            }
        }

        fetchPolicyInfo();
    },[]);

  return (
    <div className='w-full h-full overflow-auto'>
        <div className='w-full h-full flex flex-col gap-10 justify-center'>
            <div className='w-full flex flex-col gap-1 justify-center'>
                <p className='text-2xl font-mono'>Non Motor Report</p>
                <p className='flex flex-row gap-2 items-center font-mono'><TbReportAnalytics className='text-blue-50 text-lg' /> <span className='text-blue-50'>Reporting</span>/ Non Motor Report</p> 
            </div>

            <div className='w-full h-full flex flex-col gap-4'>
                <p className='text-brown-50'>NON MOTOR REPORT</p>
                <div className='w-full'>
                    <Table options={options} columns={columns} data={data}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NonMotorReport