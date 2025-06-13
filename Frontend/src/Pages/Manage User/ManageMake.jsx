import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { BsBuildingsFill, BsFillJournalBookmarkFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { IconButton } from "@mui/material";
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import { FiEdit } from 'react-icons/fi';
import Table from '../../Components/Common/Table';
import { createAndUpdateMake } from '../../services/operations/creationAPI';
import { deleteMake } from '../../services/operations/deletionAPI';
import { getMakes } from '../../services/operations/searchAPI';

const ManageMake = () => {

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
    const [makeList,setMakeList] = useState([]);

    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, { bookType:"xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "MAKE_REPORT.xlsx");
    }

    const editMake = (makeData) => {
        setEditData({
            make: makeData?.make || "",
            status: makeData?.status || ""
        });

        reset({
            make: makeData?.make || "",
            status: { value: makeData?.status, label: makeData?.status }
        })
    };

    const columns = [
        { name:"ID", label: "ID"},
        { name: "MAKE", label: "MAKE" },
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

    const data = makeList.length > 0
    ? makeList.map((makeData,index) => ([index+1,makeData?.make,makeData?.status,<FiEdit onClick={() => editMake(makeData)} className='bg-richblack-100 p-1 px-2 rounded-md text-4xl cursor-pointer'/>]))
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

    const fetchMake = async() => {
        const result = await dispatch(getMakes(token));
        if(result){
            setMakeList(result);
        }
    }

    const submitHandler = async(data,event) => {
        console.log("ADD MAKE INFORMATION -> ",data);
        const action = event.nativeEvent.submitter.value;

        const formData = new FormData();

        formData.append("make",data.make);
        formData.append("status",data.status?.value);

        if(action === "creation"){
            await dispatch(createAndUpdateMake(formData,token));
        }
        else if(action === "deletion"){
            await dispatch(deleteMake(formData,token));
        }

        reset({
            make:"",
            status: { value: "", label: "Select"}
        });
        setEditData(null);
        fetchMake();
    }

    useEffect(() => {
        fetchMake();
    },[]);

  return (
    <div className='w-full h-full overflow-auto'>
        <div className='w-full h-full flex flex-col gap-10 justify-center'>
            <div className='w-full flex flex-col gap-1 justify-center'>
                <p className='text-2xl font-mono'>Manage Make</p>
                <p className='flex flex-row gap-2 items-center font-mono'><BsBuildingsFill className='text-blue-50' /> <span className='text-blue-50'>Manage User</span>/ Manage Make</p> 
            </div>
        
            {/* ENTRY FORM */}
            <div className='w-full flex flex-col gap-2'>
                <p className='text-brown-50'>ADD MAKE INFORMATION</p>

                <form onSubmit={handleSubmit(submitHandler)} className='w-full h-full flex flex-col gap-4 bg-richblack-800 rounded-md p-3'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='make'>ADD MAKE<sup className='text-red'>*</sup></label>
                        <input
                            type='text'
                            name='make'
                            className='w-full rounded-md p-[0.45rem] text-richblack-900'
                            {...register('make')}
                            placeholder='Enter make'
                            required
                        />
                        {
                            errors.companyName && (
                                <p className='text-red'>Please enter make</p>
                            )
                        }
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
                        <button type='submit' name='action' value={"creation"} className='btn btn-primary'>{editData === null ? 'Add Make' : 'Update Make'}</button>
                        <button type='submit' name='action' value={"deletion"} className={`${editData === null ? 'hidden' : 'btn btn-error'}`}>Delete Make</button>
                    </div>
                </form>

            </div>
            
            {/* MAKE REPORT */}
            <div className='w-full h-full flex flex-col gap-2'>
                <p className='text-brown-50'>MAKE INFORMATION REPORT</p>
                <div className='w-full h-full'>
                    <Table options={options} columns={columns} data={data}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ManageMake