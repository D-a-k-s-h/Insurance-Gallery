import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/operations/authAPI';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignupPage = () => {

  const{
    handleSubmit,
    formState:{errors},
    register
  } = useForm();

  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisiblePassword,setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword,setIsVisibleConfirmPassword] = useState(false);

  const submitHandler = async(data) => {
    console.log("SIGNUP DATA -> ",data);
    setLoading(true);

    const formData = new FormData();
    formData.append("username",data.username);
    formData.append("email",data.email);
    formData.append("password",data.password);
    formData.append("confirmPassword",data.confirmPassword);
    formData.append("accountType",data.accountType);

    dispatch(signup(formData,navigate));
    setLoading(false);
  }

  return (
    <div className='w-screen bg-richblack-900 text-richblack-5 flex items-center justify-center'>
      <div className='w-full md:w-1/3 bg-richblack-800 p-5 rounded-md'>
        <div className='flex flex-col gap-4'>
          <p className='text-center text-4xl text-blue-200 font-semibold'>Insurance Gallery</p>
          <p className='text-center text-3xl font-semibold'>Sign Up</p>

          <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-3'>
            <div className='flex flex-col'>
              <label htmlFor=''>Username<sup className='text-red'>*</sup></label>
              <input
                name='username'
                type='text'
                placeholder='Enter username'
                className='p-2 rounded-md bg-richblack-700 border'
                {...register("username",{required:true})}
              />
              {
                errors.username && (
                  <p className='text-red'>Please enter username</p>
                )
              }
            </div>

            <div className='flex flex-col'>
              <label htmlFor='email'>Email<sup className='text-red'>*</sup></label>
              <input
                type='email'
                placeholder='Enter email address'
                name='email'
                className='p-2 bg-richblack-700 rounded-md border'
                {...register("email",{required:true})}
              />
              {
                errors.email && (
                  <p className='text-red'>Please enter username</p>
                )
              }
            </div>

            <div className='flex flex-col md:flex-row gap-2 w-full'>
              <div className='md:w-[49.5%] flex flex-col relative'>
                <label htmlFor='password'>Password<sup className='text-red'>*</sup></label>
                <input
                  type={`${isVisiblePassword ? 'text' : 'password'}`}
                  name='password'
                  placeholder='Enter password'
                  className='p-2 rounded-md bg-richblack-700 border'
                  {...register("password",{required:true})}
                />
                {
                  errors.password && (
                    <p className='text-red'>Please enter password</p>
                  )
                }
                <FaEye className={`${isVisiblePassword ? 'absolute top-9 right-3 cursor-pointer' : 'hidden'}`} onClick={() => {setIsVisiblePassword(!isVisiblePassword)}}/>
                <FaEyeSlash onClick={() => {setIsVisiblePassword(!isVisiblePassword)}} className={`${isVisiblePassword ? 'hidden' : 'absolute right-3 top-9 cursor-pointer'}`}/>
              </div>
              <div className='md:w-[49.5%] flex flex-col relative'>
                <label htmlFor='confirmPassword'>Confirm Password<sup className='text-red'>*</sup></label>
                <input 
                  name='confirmPassword'
                  type={`${isVisibleConfirmPassword ? 'text' : 'password'}`}
                  placeholder='Confirm password'
                  className='p-2 rounded-md bg-richblack-700 border'
                  {...register("confirmPassword",{required:true})}
                />
                <FaEye className={`${isVisibleConfirmPassword ? 'absolute top-9 right-3 cursor-pointer' : 'hidden'}`} onClick={() => {setIsVisibleConfirmPassword(!isVisibleConfirmPassword)}}/>
                <FaEyeSlash onClick={() => {setIsVisibleConfirmPassword(!isVisibleConfirmPassword)}} className={`${isVisibleConfirmPassword ? 'hidden' : 'absolute right-3 top-9 cursor-pointer'}`}/>
              </div>
            </div>

            <div className='flex flex-col'>
              <label htmlFor='accountType'>Account Type<sup className='text-red'>*</sup></label>
              <select className='p-2 rounded-md bg-richblack-700 border' {...register("accountType",{required:true})}>
                <option disabled value={""}>Select account type</option>
                <option value={"Admin"}>Admin</option>
                <option value={"Company"}>Company</option>
                <option value={"RM"}>RM</option>
              </select>
              {
                errors.accountType && (
                  <p className='text-red'>Please select account type</p>
                )
              }
            </div>

            <button type='submit' className='py-2 px-4 bg-blue-100 hover:scale-95 hover:underline rounded-sm mt-2 transition-all duration-200 w-fit self-center text-lg font-semibold' disabled={loading}>{loading ? 'Loading...' : 'Sign up'}</button>
            <p className='text-richblack-600 mt-3'>Already have a account? <Link className='text-richblack-500 hover:underline' to={"/login"}>Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupPage