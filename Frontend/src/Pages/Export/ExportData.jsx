import React, { useEffect, useState } from 'react'
import { TbReportAnalytics } from 'react-icons/tb'
import Table from '../../Components/Common/Table'
import { IconButton } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getAgents, getCompanies, getPolicyInfo, getUserInfo } from '../../services/operations/searchAPI';
import { useDispatch, useSelector } from 'react-redux';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Link } from 'react-router-dom';

const ExportData = () => {

    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [motorReport,setMotorReport] = useState([]);
    const [selectedSearchBy, setSelectedSearchBy] = useState(null);
    const [companyList,setCompanyList] = useState([]);
    const [rmList,setRmList] = useState([]);
    const [agents,setAgents] = useState([]);
    
    const {
        handleSubmit,
        reset,
        control,
        register,
        getValues
    } = useForm();

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
    ? motorReport.map((motorData,index) => ([index+1,motorData?.customerName,motorData?.mobileNo,motorData?.vehicleNo,motorData?.policyNo,motorData?.model,motorData?.make,motorData?.agentName,motorData?.premium,<Link to={"/reporting/non-motor-report-details"} state={{motorData}} className='text-sm btn btn-outline'>Details</Link>]))
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

    const searchValueOptionsMap = {
        agentName: agents.length > 0
        ? agents.map(agent => ({ value: agent?.username, label: agent?.username }))
        : [{ value: "", label: "No agents available" }],

        rmName: rmList.length > 0
        ? rmList.map((rmData) => ({value: rmData?.username, label: rmData?.username}))
        : [{ value: "", label: "No RMs available" }],

        companyName: companyList.length > 0 
        ? companyList.map((company) => ({value: company?.companyName,label: company?.companyName}))
        : [{ value: "", label: "No companies available" }],

        companyCode: companyList.length > 0 
        ? companyList.map((company) => ({value: company?.companyCode,label: company?.companyCode}))
        : [{ value: "", label: "No companies available" }],
    };

    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, { bookType:"xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "MOTOR_REPORT.xlsx");
    }

    const searchByOptions = [
        {value:"" ,label:"All"},
        {value:"agentName",label:"Agent"},
        {value:"rmName",label:"RM"},
        {value:"companyName",label:"Company Name"},
        {value:"companyCode",label:"Company Code"}
    ];

    const submitHandler = async(data) => {
        console.log("EXPORT DATA INFORMATION -> ",data);

        const filters = {};

        if(data.searchByValue && data.searchValue){
            filters[data.searchByValue?.value] = data.searchValue?.value;
        }
        if(data.startDate) filters.startDate = data.startDate;
        if(data.endDate) filters.endDate = data.endDate;

        console.log("Filters -> ",filters);

        const result = await dispatch(getPolicyInfo(null,token,filters));
        if(result){
            setMotorReport(result);
        }

        reset();
    }

    useEffect(() => {
        const fetchAgents = async() => {
            const result = await dispatch(getAgents(token));
            console.log("FETCH AGENTS -> ",result);
            if(result){
                setAgents(result);
            }
        }

        fetchAgents();

        const fetchRms = async() => {
            const result = await dispatch(getUserInfo("RM",token));
            if(result){
                setRmList(result);
            }
        }

        fetchRms();

        const fetchCompanies = async() => {
            const result = await dispatch(getCompanies(token));
            if(result){
                setCompanyList(result);
            }
        }

        fetchCompanies();

    },[]);

  return (
    <div className='w-full h-full overflow-auto'>
        <div className='w-full h-full flex flex-col gap-10 justify-center'>
            {/* HEADING 1 */}
            <div className='w-full flex flex-col gap-1'>
                <p className='text-2xl font-mono'>Export Data</p>
                <p className='flex flex-row gap-2 items-center font-mono'><TbReportAnalytics className='text-blue-50 text-lg' /> <span className='text-blue-50'>Export</span>/ Export Report</p> 
            </div>

            {/* HEADING 2 */}
            <div className='flex justify-between items-center'>
                <p className='text-brown-50'>RENEWAL EXPORT REPORT</p>
                <button type='button' className='btn btn-info' onClick={() => exportToExcel(data)}>Export to excel</button>
            </div>

            {/* SEARCH FORM */}
            <form onSubmit={handleSubmit(submitHandler)} className='w-full bg-richblack-800 rounded-md p-3 flex flex-col gap-4'>
                <div className='flex flex-col md:flex-row gap-4'>
                    <div className='w-full flex flex-col gap-1'>
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
                                    onChange={(option) => {
                                        field.onChange(option);
                                        setSelectedSearchBy(option ? option.value : null);
                                        // Optionally reset searchValue when searchByValue changes
                                        reset({ ...getValues(), searchValue: "" });
                                    }}
                                />
                            )}
                        />
                    </div>

                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor='searchValue'>Search value</label>
                        {selectedSearchBy && searchValueOptionsMap[selectedSearchBy] ? (
                            <Controller
                                name='searchValue'
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        isClearable
                                        isSearchable
                                        options={searchValueOptionsMap[selectedSearchBy]}
                                        className='text-richblack-900 rounded-md w-full'
                                    />
                                )}
                            />
                        ) : (
                            <input
                                name='searchValue'
                                type='text'
                                className='p-2 rounded-md w-full text-richblack-900'
                                placeholder='Enter search value'
                                {...register('searchValue')}
                            />
                        )}
                    </div>

                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor='startDate'>Start date</label>
                        <input
                            name='startDate'
                            className='p-2 rounded-md w-full text-richblack-900'
                            type='date'
                            {...register('startDate')}
                        />
                    </div>

                    <div className='w-full flex flex-col gap-1'>
                        <label htmlFor='endDate'>End date</label>
                        <input
                            name='endDate'
                            className='p-2 rounded-md w-full text-richblack-900'
                            type='date'
                            {...register('endDate')}
                        />
                    </div>
                </div>

                <button type='submit' className='btn btn-primary w-fit'>Search</button>
            </form>
            
            {/* TABULAR DATA */}
            <div className='w-full h-full'>
                <div className='w-full overflow-x-auto'>
                    <Table options={options} columns={columns} data={data}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ExportData