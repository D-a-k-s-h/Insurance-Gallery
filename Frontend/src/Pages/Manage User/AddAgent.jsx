import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { FaUserFriends } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getUserInfo } from '../../services/operations/searchAPI';
import { createUser } from '../../services/operations/creationAPI';
import { deleteUser } from '../../services/operations/deletionAPI';
import { useLocation, useNavigate } from 'react-router-dom';

const AddAgent = () => {

    const dispatch = useDispatch();
    const [rmNames,setRmNames] = useState([]);
    const {token} = useSelector((state) => state.auth);
    const location = useLocation();
    const agent = location.state?.agent;
    const navigate = useNavigate();

    const {
        handleSubmit,
        formState: {errors},
        register,
        control,
        reset,
    } = useForm();

    const rmNamesOptions = rmNames.length > 0 
    ? (rmNames.map((rmName) => ({ value: rmName?.username, label: rmName?.username}))) 
    : ([{ value: "", label: "No RM Found"}]);

    const statusOptions = [
        { value: "Active", label: "Active"},
        { value: "Inactive", label: "Inactive"}
    ];

    const submitHandler = async(data,event) => {
        console.log("ADD AGENT DATA -> ",data);
        const action = event.nativeEvent.submitter.value;

        const formData = new FormData();

        formData.append('rmAssigned',data.rmName?.value);
        formData.append('email',data.email);
        formData.append('address',data.address);
        formData.append('username',data.username);
        formData.append('mobileNo',data.mobileNo);
        formData.append('status',data.status?.value);
        formData.append('accountType',"Agent");

        if(action === "creation"){
            await dispatch(createUser(formData,token));
        }
        else if(action === "deletion"){
            await dispatch(deleteUser(formData,token));
        }

        navigate("/manage-user/view-agent");
        reset();
    }

    useEffect(() => {

        const fetchRmNames = async() => {
            const result = await dispatch(getUserInfo("RM",token));
            if(result){
                setRmNames(result);
            }
        }

        fetchRmNames();

    },[]);

  return (
    <div className='w-full h-full overflow-auto'>
        <div className='w-full h-full flex flex-col gap-10 justify-center'>
            <div className='w-full flex flex-col gap-1 justify-center'>
                <p className='text-2xl font-mono'>Add Agent</p>
                <p className='flex flex-row gap-2 items-center font-mono'><FaUserFriends className='text-blue-50 text-lg' /> <span className='text-blue-50'>Manage User</span>/ Add Agent</p>
            </div>

            <div className='w-full'>
                <p className='text-brown-50'>PERSONAL INFORMATION</p>
                <form onSubmit={handleSubmit((data,event) => submitHandler(data,event))} className='w-full flex flex-col gap-10 rounded-md bg-richblack-800 p-3'>
                    {/* PERSONAL INFORMATION */}
                    <div className='w-full flex flex-col md:flex-row gap-4 md:gap-10'>
                        {/* COLUMN 1 */}
                        <div className='w-full flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='rmName'>Select RM</label>
                                <Controller
                                    name='rmName'
                                    control={control}
                                    defaultValue={
                                        agent 
                                        ? rmNamesOptions.find(option => option.value === agent?.rmName)
                                        : null
                                    }
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            isClearable
                                            isSearchable
                                            options={rmNamesOptions}
                                            className='text-richblack-900 rounded-md w-full'
                                        />
                                    )}
                                />
                            </div>
                            
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='email'>Email id</label>
                                <input
                                    name='email'
                                    type='email'
                                    defaultValue={agent ? agent.email : ''}
                                    {...register('email')}
                                    className='w-full rounded-md p-[0.45rem] text-richblack-900'
                                    placeholder='Enter email id'
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor='address'>Address</label>
                                <input
                                    name='address'
                                    className='w-full rounded-md p-[0.45rem] text-richblack-900'
                                    placeholder='Enter address'
                                    {...register("address")}
                                    type='text'
                                    defaultValue={agent ? agent?.address : ''}
                                />
                            </div>
                        </div>
                        
                        {/* COLUMN 2 */}
                        <div className='w-full flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label className='username'>Agent Name<sup className='text-red'>*</sup></label>
                                <input
                                    name='username'
                                    {...register('username',{required:true})}
                                    type='text'
                                    className='rounded-md w-full text-richblack-900 p-[0.45rem]'
                                    placeholder='Agent Name'
                                    defaultValue={agent ? agent?.username : ''}
                                />
                                {
                                    errors.username && (
                                        <p className='text-red text-sm'>Please enter agent name</p>
                                    )
                                }
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor='mobileNo'>Mobile No</label>
                                <input
                                    name='mobileNo'
                                    type='tel'
                                    className='rounded-md text-richblack-900 p-[0.45rem] w-full'
                                    placeholder='XXXXXXXXXX'
                                    {...register('mobileNo')}
                                    defaultValue={agent ? agent?.mobileNo : ''}
                                />
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor='status'>STATUS</label>
                                <Controller
                                    name="status"
                                    control={control}
                                    defaultValue={
                                        agent 
                                        ? statusOptions.find(option => option.value === agent?.status)
                                        : null
                                    }
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
                        </div>
                    </div>
                    
                    {/* BUTTONS */}
                    {
                        agent ? (
                            <div className='flex flex-row gap-3'>
                                <button type='submit' name='action' value={"creation"} className='btn btn-primary w-fit'>Update Agent</button>
                                <button type='submit' name='action' value={"deletion"} className='w-fit btn btn-error'>Delete Agent</button>
                            </div>
                        ) : (
                            <button type='submit' name='action' value={'creation'} className='btn btn-secondary w-fit'>Add Agent</button>
                        )
                    }
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddAgent