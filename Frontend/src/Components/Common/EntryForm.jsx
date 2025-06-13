import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getAgents, getCaseTypes, getCompanies, getMakes } from '../../services/operations/searchAPI';
import { createPolicy, updatePolicy } from '../../services/operations/creationAPI';
import { RiGeminiLine } from 'react-icons/ri';
import { getUserInfo } from '../../services/operations/searchAPI';

const EntryForm = ({vehicleType,updation,productType}) => {

    const dispatch = useDispatch();
    const [agents, setAgents] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [makes, setMakes] = useState([]);
    const {token} = useSelector((state) => state.auth);
    const [code,setCode] = useState(null);
    const [uploadPolicy,setUploadPolicy] = useState(null);
    const [uploadPYP,setUploadPYP] = useState(null);
    const [uploadRC,setUploadRC] = useState(null);
    const [uploadOtherDocs,setUploadOtherDocs] = useState(null);
    const [rmList,setRmList] = useState([]);

    const policyTypeOptions = [
        { value: "New", label: "NEW" },
        { value: "Renewal", label: "RENEWAL" },
        { value: "RollOver", label: "ROLLOVER" },
        { value: "Fresh", label: "FRESH" },
        { value: "Port", label: "PORT" },
    ];

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

    const agentNameOptions = agents.length > 0
    ? agents.map(agent => ({ value: agent?.username, label: agent?.username }))
    : [{ value: "", label: "No agents available" }];

    const companyNameOptions = companies.length > 0 
    ? companies.map((company) => ({value: company?.companyName,label: company?.companyName}))
    : [{ value: "", label: "No companies available" }]

    const companyCodeOptions = companies.length > 0 
    ? companies.map((company) => ({value: company?.companyCode,label: company?.companyCode}))
    : [{ value: "", label: "No companies available" }]

    const typeOfCaseOptions = [
        { value: "", label: "Select Case Type" },
        { value: "COMP", label: "COMP" },
        { value: "SAOD", label: "SAOD" },
        { value: "STP", label: "STP" }
    ];

    const caseTypeOptions = [
        { value: "Bounce", label: "Bounce" },
        { value: "Endorsement", label: "Endorsement" },
        { value: "Renewal", label: "Renewal" }
    ];


    const vehicleSpecificationOptions = [
        { value: "", label: "Select Vehicle Type" },
        { value: "Goods Carrying", label: "Goods Carrying" },
        { value: "Passenger Carrying", label: "Passenger Carrying" },
        { value: "Motor Bike", label: "Motor Bike" },
        { value: "PVT Car", label: "PVT Car" },
        { value: "Commercial Vehicle", label: "Commercial Vehicle" },
        { value: "Scooter", label: "Scooter" },
        { value: "Trailer", label: "Trailer" },
        { value: "Miscellaneous", label: "Miscellaneous" }
    ];

    const makesOptions = makes.length > 0 
    ? (makes.map((make) => ({value:make?.make, label:make?.make})))
    : [{value:"",label:"No makes Found"}];

    const{
        register,
        handleSubmit,
        formState:{errors},
        control,
        reset
    } = useForm();

    const handleUploadOtherDocs = (e) => {
        const file = e.target.files[0];
        if(file){
            setUploadOtherDocs(file);
        }
    }

    const handleUploadPolicy = (e) => {
        const file = e.target.files[0];
        if(file){
            setUploadPolicy(file);
        }
    }

    const handleUploadPYP = (e) => {
        const file = e.target.files[0];
        if(file){
            setUploadPYP(file);
        }
    }

    const handleUploadRC = (e) => {
        const file = e.target.files[0];
        if(file){
            setUploadRC(file);
        }
    }

    const rmNameOptions = rmList.length > 0
    ? rmList.map((rmData) => ({value: rmData?.username, label: rmData?.username}))
    : [{ value: "", label: "No RMs available" }];

    const submitHandler = async(data) => {
        console.log("Basic information data -> ",data);
        
        const formData = new FormData();

        if(vehicleType === "Motor Renewal"){
            formData.append('policyType',"Renewal");
        }
        else{
            data.policyType && formData.append('policyType',data.policyType?.value);
        }
        data.email && formData.append('email',data.email);
        data.agentName && formData.append('agentName',data.agentName?.value);
        data.policyStartDate && formData.append('policyStartDate',data.policyStartDate);
        data.companyCode && formData.append('companyCode',data.companyCode?.value);
        if(vehicleType === 'Motor Renewal'){
            code && formData.append('newPolicyNo',code);
        }
        code && formData.append('policyNo',vehicleType === "Motor Renewal" ? data.policyNo : code);
        data.mobileNo && formData.append('mobileNo',data.mobileNo);
        data.rmName && formData.append('rmName',data.rmName);
        data.policyExpiryDate && formData.append('policyExpiryDate',data.policyExpiryDate);
        data.customerName && formData.append('customerName',data.customerName);
        data.vehicleNo && formData.append('vehicleNo',data.vehicleNo);
        data.caseType && formData.append('caseType',data.caseType?.value);
        data.policyEntryDate && formData.append('policyEntryDate',data.policyEntryDate);
        data.companyName && formData.append('companyName',data.companyName?.value);
        data.odAmount && formData.append('odAmount',data.odAmount);
        data.netAmount && formData.append('netAmount',data.netAmount);
        data.totalAmount && formData.append('totalAmount',data.totalAmount);
        productType && formData.append('vehicleType',productType);
        data.model && formData.append('model',data.model?.value);
        data.fuelType && formData.append('fuelType',data.fuelType?.value);
        data.make && formData.append('make',data.make?.value);
        data.typeOfCase && formData.append('typeOfCase',data.typeOfCase?.value);
        data.vehicleSpecification && formData.append('vehicleSpecification',data.vehicleSpecification?.value);
        if(uploadPolicy) formData.append('uploadPolicy',uploadPolicy);
        if(uploadOtherDocs) formData.append('uploadOtherDocs',uploadOtherDocs);
        if(uploadRC) formData.append('uploadRC',uploadRC);
        if(uploadPYP) formData.append('uploadPYP',uploadPYP);

        console.log("vehicleType -> ",productType);

        if(!updation){
            await dispatch(createPolicy(formData,token));
        }
        else{
            await dispatch(updatePolicy(formData,token));
        }

        setCode('');
        reset();
    }

    useEffect(() => {

        const fetchAgents = async () => {
            const agentsData = await dispatch(getAgents(token));
            //console.log(agentsData);

            if(agentsData){
                setAgents(agentsData);
            }
        }

        fetchAgents();

        const fetchCompanies = async () => {
            const companiesData = await dispatch(getCompanies(token));
            if(companiesData){
                setCompanies(companiesData);
            }
        }

        fetchCompanies();

        const fetchMakes = async() => {
            const makesData = await dispatch(getMakes(token));
            if(makesData){
                setMakes(makesData);
            }
        }
        
        fetchMakes();

        const fetchRms = async() => {
            const result = await dispatch(getUserInfo("RM",token));
            if(result){
                setRmList(result);
            }
        }

        fetchRms();
        
    },[]);


  return (
    <div className='w-full'>
        <form onSubmit={handleSubmit((submitHandler))} className='w-full flex flex-col gap-10 rounded-md'>
            {/* BASIC INFORMATION */}
            <div className='w-full flex flex-col md:flex-row justify-between gap-5 p-3 bg-richblack-800 rounded-md'>
                {/* COLUMN 1 */}
                <div className='w-full flex flex-col gap-4'>
                    {
                        (vehicleType === 'Motor' || vehicleType === 'Non-Motor' || (vehicleType !== 'Non Motor Addon' && vehicleType !== 'Motor Renewal')) && (
                            <div className='flex flex-col gap-3'>
                                <label htmlFor='policyType'>Policy Type</label>
                                <Controller
                                    name='policyType'
                                    control={control}
                                    defaultValue={null}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            isClearable
                                            isSearchable
                                            options={policyTypeOptions}
                                            className='text-richblack-900 rounded-md w-full'
                                        />
                                    )}
                                />
                            </div>
                        )
                    }

                    {
                        vehicleType === 'Motor Renewal' && (
                            <div className='flex flex-col gap-3'>
                                <label htmlFor='policyNo'>OLD POLICY NO<sup className='text-red'>*</sup></label>
                                <input
                                    className='w-full p-[0.45rem] rounded-md text-richblack-900'
                                    placeholder='POLICY NO'
                                    type='text'
                                    name='policyNo'
                                    {...register('policyNo',{required:true})}
                                    required
                                />
                            </div>
                        )
                    }

                    {
                        vehicleType === "Non Motor Addon" && (
                            <div className='flex flex-col gap-3'>
                                <label htmlFor='typeOfCase'>TYPE OF CASE</label>
                                <Controller
                                    name='typeOfCase'
                                    control={control}
                                    defaultValue={null}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            isClearable
                                            isSearchable
                                            options={typeOfCaseOptions}
                                            className='text-richblack-900 rounded-md w-full'
                                        />
                                    )}
                                />
                            </div>
                        )
                    }

                    <div className='flex flex-col gap-3'>
                        <label htmlFor='email'>Email</label>
                        <input
                            className='w-full p-[0.45rem] rounded-md text-richblack-900'
                            placeholder='Enter your email'
                            type='email'
                            name='email'
                            {...register("email")}
                        />
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label htmlFor='agentName'>AGENT NAME</label>
                        <Controller
                            name='agentName'
                            control={control}
                            defaultValue={null}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    isClearable
                                    isSearchable
                                    options={agentNameOptions}
                                    className='text-richblack-900 rounded-md w-full'
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label htmlFor='policyStartDate'>POLICY START DATE</label>
                        <input
                            className='w-full p-[0.45rem] rounded-md text-richblack-900'
                            type='date'
                            name='policyStartDate'
                            {...register("policyStartDate")}
                        />
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label htmlFor='companyCode'>COMPANY CODE</label>
                        <Controller
                            name='companyCode'
                            control={control}
                            defaultValue={null}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    isClearable
                                    isSearchable
                                    options={companyCodeOptions}
                                    className='text-richblack-900 rounded-md w-full'
                                />
                            )}
                        />
                    </div>
                </div>

                {/* COLUMN 2 */}
                <div className='w-full flex flex-col gap-4'>
                    <div className='flex flex-col gap-3'>
                        {
                            vehicleType === 'Motor Renewal' ? (
                                <div className='relative flex flex-col gap-3'>
                                    <label htmlFor='newPolicyNo'>NEW POLICY NO<sup className='text-red'>*</sup></label>
                                    <input
                                        className='w-full p-[0.45rem] rounded-md text-richblack-900'
                                        placeholder='NEW POLICY NO'
                                        type='text'
                                        name='newPolicyNo'
                                        value={code ?? ''}
                                        onChange={e => setCode(e.target.value)}
                                        required
                                        defaultValue={null}
                                    />
                                    <div className='group absolute top-10 right-1'>
                                        <RiGeminiLine onClick={() => handleGenerate()} className='text-richblack-900 cursor-pointer rounded-full hover:bg-richblack-100 transition-all duration-100 p-1 text-3xl'/>
                                        <div className='opacity-0 absolute rounded-md text-xs -left-40 top-9 bg-primary group-hover:opacity-100 py-1 px-3 pointer-events-none'>Need help selecting policy no?</div>
                                    </div>
                                </div>
                            ) : (
                                <div className='relative flex flex-col gap-3'>
                                    <label htmlFor='policyNo'>POLICY NO<sup className='text-red'>*</sup></label>
                                    <input
                                        className='w-full p-[0.45rem] rounded-md text-richblack-900'
                                        placeholder='POLICY NO'
                                        type='text'
                                        name='policyNo'
                                        value={code ?? ''}
                                        onChange={e => setCode(e.target.value)}
                                        required
                                    />
                                    <div className='group absolute top-9 md:top-10 right-1'>
                                        <RiGeminiLine onClick={() => handleGenerate()} className='text-richblack-900 cursor-pointer rounded-full hover:bg-richblack-100 transition-all duration-100 p-1 text-3xl'/>
                                        <div className='opacity-0 absolute rounded-md top-9 -left-40 text-xs bg-primary group-hover:opacity-100 py-1 px-3 pointer-events-none'>Need help selecting policy no?</div>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    {
                        (vehicleType === "Motor" || vehicleType === 'Motor Renewal') && (
                            <div className='flex flex-col gap-3'>
                                <label htmlFor='vehicleNo'>VEHICLE NO</label>
                                <input
                                    className='w-full p-[0.45rem] rounded-md text-richblack-900'
                                    placeholder='VEHICLE NO'
                                    type='alphanumeric'
                                    name='vehicleNo'
                                    {...register("vehicleNo")}
                                />
                            </div>
                        )
                    }

                    <div className='flex flex-col gap-3'>
                        <label htmlFor='mobileNo'>MOBILE NO</label>
                        <input
                            className='w-full p-[0.45rem] rounded-md text-richblack-900'
                            placeholder='MOBILE NO'
                            type='tel'
                            name='mobileNo'
                            {...register("mobileNo")}
                        />
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label className='rmName'>RM NAME<sup className='text-red'>*</sup></label>
                        <Controller
                            name='rmName'
                            control={control}
                            defaultValue={null}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    isClearable
                                    isSearchable
                                    options={rmNameOptions}
                                    className='text-richblack-900 rounded-md w-full'
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label htmlFor='policyExpiryDate'>POLICY EXPIRY DATE</label>
                        <input
                            className='w-full p-[0.45rem] rounded-md text-richblack-900'
                            type='date'
                            name='policyExpiryDate'
                            {...register("policyExpiryDate")}
                        />
                    </div>
                </div>

                {/* COLUMN 3 */}
                <div className='w-full flex flex-col gap-4'>

                    <div className='flex flex-col gap-3'>
                        <label htmlFor='customerName'>CUSTOMER NAME<sup className='text-red'>*</sup></label>
                        <input
                            className='w-full p-[0.45rem] rounded-md text-richblack-900'
                            placeholder='CUSTOMER NAME'
                            type='text'
                            name='customerName'
                            {...register("customerName",{required: true })}
                        />
                        {
                            errors.customerName && (
                                <p className='text-red text-sm'>Customer name is required</p>
                            )
                        }
                    </div>

                    {
                        vehicleType !== "Motor" && (
                            <div className='flex flex-col gap-3'>
                                <label htmlFor='caseType'>CASE TYPE</label>
                                <Controller
                                    name='caseType'
                                    control={control}
                                    defaultValue={null}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            isClearable
                                            isSearchable
                                            options={caseTypeOptions}
                                            className='text-richblack-900 rounded-md w-full'
                                        />
                                    )}
                                />
                            </div>
                        )
                    }

                    <div className='flex flex-col gap-3'>
                        <label htmlFor='policyEntryDate'>POLICY ENTRY DATE</label>
                        <input
                            className='w-full p-[0.45rem] rounded-md text-richblack-900'
                            type='date'
                            name='policyEntryDate'
                            {...register("policyEntryDate")}
                        />
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label htmlFor='companyName'>COMPANY NAME</label>
                        <Controller
                            name='companyName'
                            control={control}
                            defaultValue={null}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    isClearable
                                    isSearchable
                                    options={companyNameOptions}
                                    className='text-richblack-900 rounded-md w-full'
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
            
            {/* PREMIUM INFORMATION */}
            <div className='w-full flex flex-col gap-2'>
                <p className='text-brown-50'>PREMIUM INFORMATION</p>
                <div className='w-full flex flex-col md:flex-row justify-between pb-12 items-center gap-4 bg-richblack-800 p-3 rounded-md'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='odAmount'>OD AMOUNT</label>
                        <input
                            className='w-full p-[0.45rem] rounded-md text-richblack-900'
                            placeholder='OD AMOUNT'
                            type='number'
                            name='odAmount'
                            {...register("odAmount")}
                        />
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='netAmount'>NET AMOUNT</label>
                        <input
                            className='w-full p-[0.45rem] rounded-md text-richblack-900'
                            placeholder='NET AMOUNT'
                            type='number'
                            name='netAmount'
                            {...register("netAmount")}
                        />
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor='totalAmount'>TOTAL AMOUNT</label>
                        <input
                            className='w-full p-[0.45rem] rounded-md text-richblack-900'
                            placeholder='TOTAL AMOUNT'
                            type='number'
                            name='totalAmount'
                            {...register("totalAmount")}
                        />
                    </div>
                </div>
            </div>

            {/* PRODUCT INFORMATION */}
            {
                (vehicleType !== 'Non-Motor' && vehicleType !== 'Non Motor Addon') && (
                    <div className='w-full flex flex-col gap-2'>
                        <p className='text-brown-50'>PRODUCT INFORMATION</p>
                        <div className='w-full flex flex-col md:flex-row justify-between gap-4 bg-richblack-800 p-3 rounded-md'>
                            <div className='flex flex-col gap-5 w-full'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='vehicleSpecification'>VEHICLE TYPE</label>
                                    <Controller
                                        name='vehicleSpecification'
                                        control={control}
                                        defaultValue={null}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                isClearable
                                                isSearchable
                                                options={vehicleSpecificationOptions}
                                                className='text-richblack-900 rounded-md w-full'
                                            />
                                        )}
                                    />
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='model'>VEHICLE MODEL</label>
                                    <Controller
                                        name='model'
                                        control={control}
                                        defaultValue={null}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                isClearable
                                                isSearchable
                                                options={[{value:"Self Loadings", label:"Self Loadings"}]}
                                                className='text-richblack-900 rounded-md w-full'
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-5 w-full'>
                                {
                                    vehicleType === "Motor Renewal" && (
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='policyType'>Policy Type</label>
                                            <Controller
                                                name='policyType'
                                                control={control}
                                                defaultValue={null}
                                                render={({field}) => (
                                                    <Select
                                                        {...field}
                                                        isClearable
                                                        isSearchable
                                                        options={policyTypeOptions}
                                                        className='text-richblack-900 rounded-md w-full'
                                                    />
                                                )}
                                            />
                                        </div>
                                    )
                                }

                                {
                                    (vehicleType === "Motor Addon" || vehicleType === "Motor") && (
                                        <div className='flex flex-col gap-2'>
                                            <label htmlFor='typeOfCase'>TYPE OF CASE</label>
                                            <Controller
                                                name='typeOfCase'
                                                control={control}
                                                defaultValue={null}
                                                render={({field}) => (
                                                    <Select
                                                        {...field}
                                                        isClearable
                                                        isSearchable
                                                        options={typeOfCaseOptions}
                                                        className='text-richblack-900 rounded-md w-full'
                                                    />
                                                )}
                                            />
                                        </div>
                                    )
                                }

                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='fuelType'>FUEL TYPE</label>
                                    <Controller
                                        name='fuelType'
                                        control={control}
                                        defaultValue={null}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                isClearable
                                                isSearchable
                                                options={[{value:"Petrol", label:"Petrol"},{value:"Diesel", label:"Diesel"},{value:"Other", label:"Other"}]}
                                                className='text-richblack-900 rounded-md w-full'
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-5 w-full'>
                                <div className='flex flex-col gap-2'>
                                    <label htmlFor='make'>MAKE</label>
                                    <Controller
                                        name='make'
                                        control={control}
                                        defaultValue={null}
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
                            </div>
                        </div>
                    </div>
                )
            }

            {/* UPLOAD DOCUMENT */}
            <div className='w-full flex flex-col gap-2'>
                <p className='text-brown-50'>UPLOAD DOCUMENTS</p>
                <div className='w-full  flex flex-col md:flex-row justify-between gap-4 bg-richblack-800 p-3 rounded-md'>
                    <div className='flex flex-col gap-5 w-full'>
                        <label htmlFor='uploadPolicy' className='flex flex-col gap-2'>
                            <p>Upload Policy</p>
                            <input
                                name='uploadPolicy'
                                id='uploadPolicy'
                                type='file'
                                className='bg-richblack-700 p-2 rounded-sm'
                                onChange={handleUploadPolicy}
                                accept='image/jpeg, image/png, image/webp, image/jpg'
                            />
                        </label>

                        {
                            vehicleType !== 'Non Motor Addon' && (
                                <label htmlFor='uploadOtherDocs' className='flex flex-col gap-2'>
                                    <p>Upload Other Documents</p>
                                    <input
                                        name='uploadOtherDocs'
                                        id='uploadOtherDocs'
                                        type='file'
                                        className='bg-richblack-700 p-2 rounded-sm'
                                        accept='image/jpeg, image/png, image/webp, image/jpg'
                                        onChange={handleUploadOtherDocs}
                                    />
                                </label>
                            )
                        }
                    </div>
                    
                    <div className='flex flex-col gap-5 w-full'>
                        {
                            (vehicleType !== 'Non-Motor' && vehicleType !== 'Non Motor Addon') && (
                                <label htmlFor='uploadRC' className='flex flex-col gap-2'>
                                    <p>Upload RC</p>
                                    <input
                                        name='uploadRC'
                                        id='uploadRC'
                                        type='file'
                                        className='bg-richblack-700 p-2 rounded-sm'
                                        onChange={handleUploadRC}
                                        accept='image/jpeg, image/png, image/webp, image/jpg'
                                    />
                                </label>
                            )
                        }

                        <label htmlFor='uploadPYP' className='flex flex-col gap-2'>
                            <p>Upload PYP</p>
                            <input
                                name='uploadPYP'
                                id='uploadPYP'
                                type='file'
                                className='bg-richblack-700 p-2 rounded-sm'
                                onChange={handleUploadPYP}
                                accept='image/jpeg, image/png, image/webp, image/jpg'
                            />
                        </label>
                    </div>
                </div>
                <button type='submit' className='w-fit bg-blue-300 py-2 px-4 rounded-sm mt-4 hover:bg-blue-400 transition-all duration-100 mb-10'>{vehicleType} Entry</button>
            </div>
        </form>
    </div>
  )
}

export default EntryForm