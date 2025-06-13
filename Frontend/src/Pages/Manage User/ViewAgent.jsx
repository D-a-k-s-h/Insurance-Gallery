import React, { useEffect, useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { getAgents } from '../../services/operations/searchAPI';
import { IconButton } from "@mui/material";
import { FiEdit } from "react-icons/fi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import Table from '../../Components/Common/Table';

const ViewAgent = () => {

    const [agents,setAgents] = useState([]);
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const exportToExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        const excelBuffer = XLSX.write(workbook, { bookType:"xlsx", type: "array" });
        const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(dataBlob, "VIEW_AGENT.xlsx");
    }

    const editAgent = (agent) => {
        navigate('/manage-user/add-agent',{ state: { agent } });
    }

    const columns = [
        { name: "ID", label: "ID" },
        { name: "AGENT NAME", label: "AGENT NAME" },
        { name: "MOBILE NO", label: "MOBILE NO" },
        { name: "EMAIL ID", label: "EMAIL ID" },
        { 
            name: "STATUS", label: "STATUS",
            options:{
                customBodyRender: (value) => (
                    <span className={value === "Active" ? ' text-caribbeangreen-100' : 'text-red'}>{value}</span>
                )
            }
        },
        { name:"ACTION", label: "ACTION"}
    ];

    const data = agents.length > 0
    ? agents.map((agent,index) => ([index+1,agent?.username,agent?.mobileNo,agent?.email,agent?.status,<FiEdit onClick={() => editAgent(agent)} className='bg-richblack-100 p-1 px-2 rounded-md text-4xl cursor-pointer'/>]))
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

    useEffect(() => {

        const fetchAgents = async() => {
            const result = await dispatch(getAgents(token));
            console.log("FETCH AGENTS -> ",result);
            if(result){
                setAgents(result);
            }
        }

        fetchAgents();

        console.log("DATA -> ",agents);

    },[]);

  return (
    <div className='w-full h-full overflow-auto'>
        <div className='w-full h-full flex flex-col gap-10 justify-center'>
            {/* HEADING AND ROUTE */}
            <div className='w-full flex flex-col gap-1'>
                <p className='text-2xl font-mono'>Add Agent</p>
                <p className='flex flex-row gap-2 items-center font-mono'><FaUserFriends className='text-blue-50 text-lg'/> <span className='text-blue-50'>Manage User</span>/ Add Agent</p>
            </div>

            {/* VIEW AGENT */}
            <div className='w-full'>
                <Table options={options} data={data} columns={columns}/>
            </div>
        </div>
    </div>
  )
}

export default ViewAgent