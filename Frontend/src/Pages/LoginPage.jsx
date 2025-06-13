import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { login } from '../services/operations/authAPI';


const LoginPage = () => {

    const {
        handleSubmit,
        formState:{errors},
        register
    } = useForm();

    const [isVisible,setIsVisible] = useState(false);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async(data) => {
        setLoading(true);
        console.log("LOGIN DATA -> ",data);

        const formData = new FormData();

        formData.append("username",data.username);
        formData.append("password",data.password);

        await dispatch(login(formData,navigate));
        setLoading(false);
    }

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-richblack-900 text-richblack-5 font-inter p-2 md:p-0'>
        <div className='w-full md:w-1/3 bg-richblack-800 p-5 rounded-md flex justify-center items-center'>
            <div className='w-full flex flex-col gap-4'>
                <p className='text-center text-4xl text-blue-200 font-semibold'>Insurance Gallery</p>
                <p className='text-center text-3xl font-semibold'>Login</p>

                <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <label htmlFor='username'>Username<sup className='text-red'>*</sup></label>
                        <input
                            type='text'
                            className='bg-richblack-700 rounded-md p-2 border'
                            placeholder='Enter username'
                            name='username'
                            {...register("username",{required:true})}
                        />
                        {
                            errors.username && (
                                <p className='text-red'>Please enter username.</p>
                            )
                        }
                    </div>
                    <div className='flex flex-col relative'>
                        <label htmlFor='password'>Password<sup className='text-red'>*</sup></label>
                        <input
                            className='p-2 border bg-richblack-700 rounded-md'
                            type={`${isVisible ? 'text' : 'password'}`}
                            name='password'
                            placeholder='Enter password'
                            {...register('password',{required:true})}
                        />
                        {
                            errors.password && (
                                <p className='text-red'>Please enter password</p>
                            )
                        }
                        <FaEye className={`${!isVisible ? 'hidden' : 'absolute right-4 top-9 cursor-pointer'}`} onClick={() => {setIsVisible(!isVisible)}}/>
                        <FaEyeSlash className={`${!isVisible ? 'absolute right-4 top-9 cursor-pointer' : 'hidden'}`} onClick={() => {setIsVisible(!isVisible)}}/>
                    </div>

                    <button disabled={loading} className='bg-blue-300 rounded-md py-2 px-4 w-fit self-center hover:underline hover:scale-95 transition-all duration-200' type='submit'>{loading ? 'Loading...' : 'Login Now'}</button>
                </form>

                <p className='text-richblack-300 mt-4'>Don't have a account? <Link to={"/signup"} className='text-richblack-400 hover:underline'>Create account</Link></p>
            </div>
        </div>
    </div>
  )
}

export default LoginPage