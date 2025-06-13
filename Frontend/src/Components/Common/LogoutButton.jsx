import React, { useState } from 'react'
import { CiPower } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { logout } from '../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

const LogoutButton = () => {

    const [confirmationModal, setConfirmationModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <div className='hidden md:w-14 md:block bg-richblack-800 border-l p-2 h-screen'>
        <button 
            type='button' 
            className='bg-pink-200 rounded-md p-2 text-2xl hover:bg-pink-300 transition-all duration-200'
            onClick={() => {
                setConfirmationModal({
                    heading: "Are you sure you want to logout?",
                    para: "You will be logged out of your account.",
                    textBtn1: "Logout",
                    textBtn2: "Cancel",
                    textBtn1Action: () => {
                        dispatch(logout(navigate))
                    },
                    textBtn2Action: () => setConfirmationModal(null)
                })
            }}
        >
            <CiPower/>
        </button>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default LogoutButton