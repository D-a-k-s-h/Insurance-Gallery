import React, { useEffect, useState } from 'react'
import { TiHome } from "react-icons/ti";
import ProgressBar from "@ramonak/react-progress-bar";
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getPolicyInfo } from '../services/operations/searchAPI';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import '../../node_modules/react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import MUIDataTable from 'mui-datatables';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import Select from 'react-select';
import { IconButton } from "@mui/material";

const data = [
  [1, "John Doe", 1000, 1200, 1300, 200],
  [2, "Jane Smith", 900, 1100, 1150, 180],
  [3, "John Doe", 1000, 1200, 1300, 200],
  [4, "Jane Smith", 900, 1100, 1150, 180],
  [5, "John Doe", 1000, 1200, 1300, 200],
  [6, "Jane Smith", 900, 1100, 1150, 180],
];

const HomePage = () => {

    const{
        register,
        handleSubmit,
        control,
        reset
    } = useForm();

    const dispatch = useDispatch();
    const [result, setResult] = useState([]);
    const columns = ["ID", "RM Name", "LYMTD", "LMTD", "MTD", "Today"];
    const {token} = useSelector((state) => state.auth);
    const [tabData,setTabData] = useState([]);

    let motorAmount = 0;
    let motorToday = 0;
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    tabData.length > 0 &&  tabData.forEach((tab) => {
        if(tab?.vehicleType === "Motor"){
            motorAmount += tab?.totalAmount;
        }

        if(tab?.vehicleType === "Motor" && tab?.policyEntryDate && tab?.policyEntryDate.split("T")[0] === todayString){
            motorToday += tab?.totalAmount;
        }
    });

    let nonMotorAmount = 0;
    let nonMotorToday = 0;
    tabData.length > 0 &&  tabData.forEach((tab) => {
        if(tab?.vehicleType === "Non-Motor"){
            nonMotorAmount += tab?.totalAmount;
        }

        if(tab?.vehicleType === "Non-Motor" && tab?.policyEntryDate && tab?.policyEntryDate.split("T")[0] === todayString){
            nonMotorToday += tab?.totalAmount;
        }
    });

    const TabsData = [
        {
            id: 1,
            name: "MOTOR (MONTHLY)",
            value: `Rs. ${motorAmount}`,
            percentage: "2% higher than last month",
            progress: 2
        },
        {
            id: 2,
            name: "NON-MOTOR (MONTHLY)",
            value: `Rs. ${nonMotorAmount}`,
            percentage: "6% higher than last month",
            progress: 6
        },
        {
            id: 3,
            name: "MOTOR (TODAY)",
            value: `Rs. ${motorToday}`,
            percentage: "Total Today Motor",
            progress: 2
        },
        {
            id: 4,
            name: "NON-MOTOR (TODAY)",
            value: `Rs. ${nonMotorToday}`,
            percentage: "Total Today Non Motor",
            progress: 2
        }
    ];

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

    const searchByOptions = [
        {value:"agentName",label:"Agent Name"},
        {value:"rmName",label:"RM Name"},
        {value:"companyName",label:"Company Name"},
        {value:"customerName",label:"Customer Name"},
    ];

    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, { bookType:"xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "RM_Report.xlsx");
    }

    const submitHandler = async(data) => {
        console.log("Motor Search Data: ", data);
        
        const filters = {};
        
        if(data.searchByValue && data.searchValue){
            filters[data.searchByValue?.value] = data.searchValue;
        }

        const result = await dispatch(getPolicyInfo("Motor",token,filters));
        if(result){
            setResult(result);
        }
        else{
            setResult("");
        }

        reset();
    }

    useEffect(() => {
        const fetchData = async() => {
            const result = await dispatch(getPolicyInfo(null,token));
            if(result){
                setTabData(result);
            }
        }

        fetchData();
    },[]);

  return (
    <div className='w-full h-full overflow-auto'>
        <div className='w-full h-full flex flex-col gap-1 justify-center'>
            <p className='font-medium text-2xl font-mono'>Dashboard</p>
            <p className='flex flex-row gap-2 items-center font-mono'><TiHome className='text-blue-50 text-lg -translate-y-0.5' /> <span className='text-blue-50'>Data Entry</span>/ Dashboard</p>
            <div className='w-full h-full flex flex-col mt-6 gap-20'>
                {/* TABS SECTION */}
                <div className='w-full flex flex-col md:flex-row gap-4 items-center justify-between'>
                    {
                        TabsData.map((tab) => (
                            <div key={tab.id} className='w-full flex flex-col gap-2 p-4 bg-richblack-800 rounded-md'>
                                <p>{tab?.name}</p>
                                <p className=' text-richblack-100 text-3xl -mt-2'>{tab?.value}</p>
                                <div className='flex flex-col gap-1'>
                                    <p className='text-sm'>{tab?.percentage}</p>
                                    <ProgressBar
                                        completed={tab?.progress}
                                        maxCompleted={10}
                                        bgColor="#3b82f6"
                                        baseBgColor="#e5e7eb"
                                        height="8px"
                                        isLabelVisible={false}
                                        borderRadius='0px'
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* SEARCH SECTION */}
                <div className='flex flex-col gap-1'>
                    <p className=' text-brown-100'>MOTOR SEARCH</p>
                    <form onSubmit={handleSubmit(submitHandler)} className='w-full p-4 rounded-sm bg-richblack-800 flex flex-col gap-4'>
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='w-full flex flex-col gap-2'>
                                <label htmlFor='searchByValue'>Search By</label>
                                <Controller
                                    name='searchByValue'
                                    control={control}
                                    defaultValue={null}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            isClearable
                                            isSearchable
                                            options={searchByOptions}
                                            className='text-richblack-900 rounded-md w-full'
                                        />
                                    )}
                                />
                            </div>
                            <div className='w-full flex flex-col gap-2'>
                                <label htmlFor='searchValue'>Search Value<sup className='text-red'>*</sup></label>
                                <input
                                    name='searchValue'
                                    type='text'
                                    placeholder='Search'
                                    className='w-full p-2 text-richblack-900 rounded-md border'
                                    {...register('searchValue', { required: true })}
                                    required
                                />
                            </div>
                        </div>

                        <button type='submit' className='px-4 py-2 bg-blue-100 hover:bg-blue-200 transition-all duration-100 w-fit rounded-sm'>Search Now</button>
                    </form>
                    {
                        result.length > 0 && (
                            <div className='w-full p-2 -mt-1 bg-richblack-800'>
                                <Table className='w-full border border-richblack-500'>
                                    <Thead className='bg-richblack-700 text-richblack-5'>
                                        <Tr>
                                            <Th className='p-2 px-8 text-left'>ID</Th>
                                            <Th className='p-2 text-left border-l border-l-richblack-500'>Customer Name</Th>
                                            <Th className='p-2 text-left border-l border-l-richblack-500'>Mobile</Th>
                                            <Th className='p-2 text-left border-l border-l-richblack-500'>Agent Name</Th>
                                            <Th className='p-2 text-left border-l border-l-richblack-500'>RM Name</Th>
                                            <Th className='p-2 text-left border-l border-l-richblack-500'>Company Name</Th>
                                            <Th className='p-2 text-left border-l border-l-richblack-500'>Vehicle No</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            result.map((item,index) => (
                                                <Tr key={index} className='even:bg-richblack-700'>
                                                    <Td className='p-2 px-8 text-left'>{item?.policyNo}</Td>
                                                    <Td className='p-2 text-left border-l border-l-richblack-500'>{item?.customerName}</Td>
                                                    <Td className='p-2 text-left border-l border-l-richblack-500'>{item?.mobileNo}</Td>
                                                    <Td className='p-2 text-left border-l border-l-richblack-500'>{item?.agentName}</Td>
                                                    <Td className='p-2 text-left border-l border-l-richblack-500'>{item?.rmName}</Td>
                                                    <Td className='p-2 text-left border-l border-l-richblack-500'>{item?.companyName}</Td>
                                                    <Td className='p-2 text-left border-l border-l-richblack-500'>{item?.vehicleNo}</Td>
                                                </Tr>
                                            ))
                                        }
                                    </Tbody>
                                </Table>
                            </div>
                        )
                    }
                </div>
                
                {/* RM REPORT SECTION */}
                <div className='relative w-full h-full p-4 bg-richblack-800 rounded-sm'>
                    <MUIDataTable
                        title={"RM REPORT"}
                        data={data}
                        columns={columns}
                        options={options}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage