import React, { useEffect, useState } from 'react'
import { BsBuildingsFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { getMakes, getModals } from '../../services/operations/searchAPI';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { IconButton } from "@mui/material";
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import { FiEdit } from 'react-icons/fi';
import Table from '../../Components/Common/Table';
import { createAndUpdateModals } from '../../services/operations/creationAPI';
import { deleteModal } from '../../services/operations/deletionAPI';

const ManageModal = () => {

    const {
        register,
        handleSubmit,
        formState:{errors},
        control,
        reset
    } = useForm();

    const [editData,setEditData] = useState(null);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [makes,setMakes] = useState([]);
    const [modalList,setModalList] = useState([]);

    const makesOptions = makes.length > 0
    ? makes.map((make) => ({ value: make?.make, label: make?.make }))
    : [];

    const columns = [
        { name:"ID", label: "ID"},
        { name: "MAKE", label: "MAKE" },
        { name: "MODAL", label: "MODAL" },
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

    const editModal = (modalData) => {
        setEditData({
            make: modalData?.make || "",
            modal: modalData?.modal || "",
            status: modalData?.status || ""
        });

        reset({
            make: { value: modalData?.make, label: modalData?.make },
            modal: modalData?.modal || "",
            status: { value: modalData?.status, label: modalData?.status }
        })
    }

    const data = modalList.length > 0
    ? modalList.map((modalData,index) => ([index+1,modalData?.make,modalData?.modal,modalData?.status,<FiEdit onClick={() => editModal(modalData)} className='bg-richblack-100 p-1 px-2 rounded-md text-4xl cursor-pointer'/>]))
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

    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, { bookType:"xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "MODAL_REPORT.xlsx");
    }

    const fetchModal = async() => {
        const result = await dispatch(getModals(token));
        if(result){
            setModalList(result);
        }
    }

    const submitHandler = async(data,event) => {
        console.log("ADD MODAL INFORMATION -> ",data);
        const action = event.nativeEvent.submitter.value;

        const formData = new FormData();

        formData.append("make",data.make?.value);
        formData.append("modal",data.modal);
        formData.append("status",data.status?.value);

        if(action === "creation"){
            await dispatch(createAndUpdateModals(formData,token));
        }
        else if(action === "deletion"){
            await dispatch(deleteModal(formData,token));
        }

        reset({
            make:{ value: "", label: "Select"},
            modal: "",
            status: { value: "", label: "Select"}
        });
        setEditData(null);
        fetchModal();
    }

    useEffect(() => {
        const fetchMake = async() => {
            const result = await dispatch(getMakes(token));
            if(result){
                setMakes(result);
            }
        }

        fetchMake();
        fetchModal();
    },[]);

  return (
    <div className='w-full h-full overflow-auto'>
        <div className='w-full h-full flex flex-col gap-10 justify-center'>
            <div className='w-full flex flex-col gap-1 justify-center'>
                <p className='text-2xl font-mono'>Manage Modal</p>
                <p className='flex flex-row gap-2 items-center font-mono'><BsBuildingsFill className='text-blue-50' /> <span className='text-blue-50'>Manage User</span>/ Manage Modal</p> 
            </div>

            <div className='w-full h-full flex flex-col gap-4'>
                <p className='text-brown-50'>ADD MODAL INFORMATION</p>

                {/* ENTRY FORM */}
                <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-4 w-full bg-richblack-800 border border-richblack-700 rounded-md p-3'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='make'>MAKE</label>
                        <Controller
                            name='make'
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    isClearable
                                    isSearchable
                                    options={makesOptions}
                                    className='text-richblack-900 rounded-md w-full'
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='modal'>ADD MODAL<sup className='text-red'>*</sup></label>
                        <input
                            name='modal'
                            className='text-richblack-900 rounded-md w-full p-2'
                            {...register('modal')}
                            required
                            type='text'
                            placeholder='Enter modal'
                        />
                        {
                            errors.modal && (
                                <p className='text-red text-sm'>Please enter modal name</p>
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
                        <button type='submit' name='action' value={"creation"} className='btn btn-primary'>{editData === null ? 'Add Modal' : 'Update Modal'}</button>
                        <button type='submit' name='action' value={"deletion"} className={`${editData === null ? 'hidden' : 'btn btn-error'}`}>Delete Modal</button>
                    </div>
                </form>
            </div>

            {/* MODAL REPORT */}
            <div className='w-full h-full flex flex-col gap-2'>
                <p className='text-brown-50'>MODAL INFORMATION REPORT</p>
                <div className='w-full h-full'>
                    <Table options={options} columns={columns} data={data}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ManageModal