import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { BsBuildingsFill } from "react-icons/bs";
import { FiEdit } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { IconButton } from "@mui/material";
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import Table from '../../Components/Common/Table';
import { getCompanies } from '../../services/operations/searchAPI';
import { createAndUpdateCompanies } from '../../services/operations/creationAPI';
import { deleteCompany } from '../../services/operations/deletionAPI';
import { RiGeminiLine } from "react-icons/ri";

const ManageCompany = () => {

    const {
        register,
        handleSubmit,
        formState:{errors},
        control,
        reset
    } = useForm();

    const [editData,setEditData] = useState(null);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [companyList,setCompanyList] = useState([]);
    const [code, setCode] = useState(null);

    const columns = [
        { name: "COMPANY CODE", label: "COMPANY CODE" },
        { name: "COMPANY NAME", label: "COMPANY NAME" },
        { name: "REMARKS", label: "REMARKS" },
        { 
            name: "STATUS", label: "STATUS",
            options:{
                customBodyRender: (value) => (
                    <span className={value === "Active" ? ' text-caribbeangreen-200' : 'text-red'}>{value}</span>
                )
            }
        },
        { name:"ACTION", label: "ACTION"}
    ];

    const editCompany = (companyData) => {
        setEditData({
            companyName: companyData?.companyName || "",
            companyCode: companyData?.companyCode || "",
            remarks: companyData?.remarks || "",
            status: companyData?.status || ""
        });

        setCode(companyData?.companyCode || "");

        reset({
            companyName: companyData?.companyName || "",
            companyCode: companyData?.companyCode || "",
            remarks: companyData?.remarks || "",
            status: { value: companyData?.status, label: companyData?.status }
        })
    };

    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, { bookType:"xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "COMPANY_REPORT.xlsx");
    }

    const data = companyList.length > 0
    ? companyList.map((companyData) => ([companyData?.companyCode,companyData?.companyName,companyData?.remarks,companyData?.status,<FiEdit onClick={() => editCompany(companyData)} className='bg-richblack-100 p-1 px-2 rounded-md text-4xl cursor-pointer'/>]))
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

    const statusOptions = [
        { value: "Active", label: "Active"},
        { value: "Inactive", label: "Inactive"}
    ];

    const fetchCompanies = async() => {
        const result = await dispatch(getCompanies(token));
        if(result){
            setCompanyList(result);
        }
    }
    const handleGenerate = () => {
        const random = generateRandomString(10);
        setCode(random);
    };

    const generateRandomString = (length = 10) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const submitHandler = async(data,event) => {
        console.log("ADD COMPANY INFORMATION DATA -> ",data);
        const action = event.nativeEvent.submitter.value;

        const formData = new FormData();

        formData.append("companyName",data.companyName);
        formData.append('companyCode',code);
        formData.append("remarks",data.remarks);
        formData.append('status',data.status?.value);

        if(action === "creation"){
            await dispatch(createAndUpdateCompanies(formData,token));
        }
        else if(action === "deletion"){
            await dispatch(deleteCompany(formData,token));
        }
        console.log("Reached here");

        reset({
            companyName: "",
            companyCode: "",
            remarks: "",
            status: { value: "", label: "Select"}
        });

        setCode("");
        setEditData(null);
        fetchCompanies();
    }

    useEffect(() => {
        fetchCompanies();
    },[]);

  return (
    <div className='w-full h-full overflow-auto'>
        <div className='w-full h-full flex flex-col gap-10 justify-center'>
            <div className='w-full flex flex-col gap-1 justify-center'>
                <p className='text-2xl font-mono'>Manage RM</p>
                <p className='flex flex-row gap-2 items-center font-mono'><BsBuildingsFill className='text-blue-50' /> <span className='text-blue-50'>Manage User</span>/ Manage RM</p> 
            </div>

            {/* ENTRY FORM */}
            <div className='w-full flex flex-col gap-2'>
                <p className='text-brown-50'>ADD COMPANY INFORMATION</p>

                <form onSubmit={handleSubmit(submitHandler)} className='w-full h-full flex flex-col gap-4 bg-richblack-800 rounded-md p-3'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='companyName'>COMPANY NAME<sup className='text-red'>*</sup></label>
                        <input
                            type='text'
                            name='companyName'
                            className='w-full rounded-md p-[0.45rem] text-richblack-900'
                            {...register('companyName')}
                            placeholder='Company Name'
                            required
                        />
                        {
                            errors.companyName && (
                                <p className='text-red'>Please enter company name</p>
                            )
                        }
                    </div>

                    <div className='flex flex-col gap-2 relative'>
                        <label htmlFor='companyCode'>COMPANY CODE<sup className='text-red'>*</sup></label>
                        <input
                            name='companyCode'
                            type='text'
                            placeholder='Enter company code'
                            {...register('companyCode')}
                            className='w-full rounded-md p-[0.45rem] text-richblack-900'
                            required
                            value={code ?? ''}
                            onChange={e => setCode(e.target.value)}
                        />
                        {
                            errors.companyCode && (
                                <p className='text-red'>Please enter company code</p>
                            )
                        }
                        <div className='group absolute top-9 left-[69rem]'>
                            <RiGeminiLine onClick={() => handleGenerate()} className='text-richblack-900 cursor-pointer rounded-full hover:bg-richblack-100 transition-all duration-100 p-1 text-3xl'/>
                            <div className='opacity-0 absolute rounded-md text-xs -left-44 top-9 bg-primary group-hover:opacity-100 py-1 px-3 pointer-events-none'>Need help selecting company code?</div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='remarks'>REMARKS</label>
                        <input
                            name='remarks'
                            className='w-full rounded-md p-[0.45rem] text-richblack-900'
                            type='text'
                            {...register('remarks')}
                            placeholder='Enter remarks'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='status'>STATUS</label>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isClearable
                                    isSearchable
                                    options={statusOptions}
                                    className="text-richblack-900 rounded-md w-full"
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-row gap-2'>
                        <button type='submit' name='action' value={"creation"} className='btn btn-primary'>{editData === null ? 'Add Company' : 'Update Company'}</button>
                        <button type='submit' name='action' value={"deletion"} className={`${editData === null ? 'hidden' : 'btn btn-error'}`}>Delete company</button>
                    </div>
                </form>
            </div>
            
            {/* COMPANY REPORT */}
            <div className='w-full h-full flex flex-col gap-2'>
                <p className='text-brown-50'>COMPANIES INFORMATION REPORT</p>
                <div className='w-full h-full'>
                    <Table options={options} columns={columns} data={data}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ManageCompany