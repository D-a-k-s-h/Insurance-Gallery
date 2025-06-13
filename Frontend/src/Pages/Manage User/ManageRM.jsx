import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FaUserFriends } from 'react-icons/fa'
import Select from 'react-select';
import Table from '../../Components/Common/Table';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../services/operations/searchAPI';
import { FiEdit } from 'react-icons/fi';
import { IconButton } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { createUser } from '../../services/operations/creationAPI';
import { deleteUser } from '../../services/operations/deletionAPI';

const ManageRM = () => {

    const {
        handleSubmit,
        formState:{errors},
        register,
        control,
        reset
    } = useForm();

    const columns = [
        { name: "ID", label: "ID" },
        { name: "RM NAME", label: "RM NAME" },
        { name: "MOBILE NO", label: "MOBILE NO" },
        { name: "EMAIL ID", label: "EMAIL ID" },
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

    const [rmList,setRmList] = useState([]);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [editData,setEditData] = useState(null);
    
    const editRM = (rmData) => {
        setEditData({
            username: rmData?.username || "",
            mobileNo: rmData?.mobileNo || "",
            email: rmData?.email || "",
            status: rmData?.status || ""
        });

        reset({
            username: rmData?.username || "",
            mobileNo: rmData?.mobileNo || "",
            email: rmData?.email || "",
            status: { value: rmData?.status, label: rmData?.status }
        })
    };

    const data = rmList.length > 0
    ? rmList.map((rmData,index) => ([index+1,rmData?.username,rmData?.mobileNo,rmData?.email,rmData?.status,<FiEdit onClick={() => editRM(rmData)} className='bg-richblack-100 p-1 px-2 rounded-md text-4xl cursor-pointer'/>]))
    : [];

    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, { bookType:"xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "RM_REPORT.xlsx");
    }

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

    const fetchRms = async() => {
        const result = await dispatch(getUserInfo("RM",token));
        if(result){
            setRmList(result);
        }
    }

    const submitHandler = async(data,event) => {
        console.log("MANAGE RM DATA -> ",data);
        const action = event.nativeEvent.submitter.value;

        const formData = new FormData();

        formData.append("email",data.email);
        formData.append('address',data.address);
        formData.append("username",data.username);
        formData.append('mobileNo',data.mobileNo);
        formData.append('status',data.status?.value);
        formData.append('accountType',"RM");

        if(action === "creation"){
            await dispatch(createUser(formData,token));
        }
        else if(action === "deletion"){
            await dispatch(deleteUser(formData,token));
        }

        reset({
            username: "",
            mobileNo: "",
            email: "",
            status: { value: "", label: "Select"}
        })
        setEditData(null);
        await fetchRms();
    }

    useEffect(() => {
        fetchRms();
    },[]);

  return (
    <div className='w-full h-full overflow-auto'>
        <div className='w-full h-full flex flex-col gap-10 justify-center'>
            <div className='w-full flex flex-col gap-1 justify-center'>
                <p className='text-2xl font-mono'>Manage RM</p>
                <p className='flex flex-row gap-2 items-center font-mono'><FaUserFriends className='text-blue-50 text-lg' /> <span className='text-blue-50'>Manage User</span>/ Manage RM</p> 
            </div>

            <div className='w-full flex flex-col gap-1'>
                <p className='text-brown-50'>ADD RM INFORMATION</p>

                <form onSubmit={handleSubmit(submitHandler)} className='w-full flex flex-col gap-4 bg-richblack-800 p-3 rounded-md border border-richblack-700'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='username'>RM NAME<sup className='text-red'>*</sup></label>
                        <input
                            type='text'
                            name='username'
                            className='w-full rounded-md p-[0.45rem] text-richblack-900'
                            {...register('username')}
                            placeholder='RM Name'
                            required
                        />
                        {
                            errors.username && (
                                <p className='text-red'>Please enter rm name</p>
                            )
                        }
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='email'>EMAIL ADDRESS</label>
                        <input
                            name='email'
                            type='email'
                            placeholder='Enter email address'
                            {...register('email')}
                            className='w-full rounded-md p-[0.45rem] text-richblack-900'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='mobileNo'>MOBILE NO</label>
                        <input
                            name='mobileNo'
                            className='w-full rounded-md p-[0.45rem] text-richblack-900'
                            type='tel'
                            {...register('mobileNo')}
                            placeholder='XXXXXXXXXX'
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
                        <button type='submit' name='action' value={"creation"} className='w-fit btn btn-primary'>{editData === null ? 'Add RM' : 'Update RM'}</button>
                        <button type='submit' name='action' value={"deletion"} className={`${editData === null ? 'hidden' : 'w-fit btn btn-error'}`}>Delete user</button>
                    </div>
                </form>
            </div>
            
            <div className='w-full h-full flex flex-col gap-2'>
                <p className='text-brown-50'>RM REPORT</p>
                <div className='w-full h-full'>
                    <Table options={options} columns={columns} data={data}/>
                </div>
            </div>
        </div>  

    </div>
  )
}

export default ManageRM