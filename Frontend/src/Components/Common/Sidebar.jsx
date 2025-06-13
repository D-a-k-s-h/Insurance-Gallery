import React, { useState } from 'react'
import { CgMenu } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { sidebarLinks } from '../../Assets/data';
import { matchPath, NavLink, useLocation, useNavigate } from 'react-router-dom';
import * as Icons from 'react-icons/vsc'
import { FaLongArrowAltRight } from "react-icons/fa";
import { logout } from '../../services/operations/authAPI';
import ConfirmationModal from './ConfirmationModal';
import { TypeAnimation } from 'react-type-animation';

const Sidebar = () => {
    const {user} = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    const matchParentRoute = (route) => {
        const str = location.pathname.split("/").at(1);
        return matchPath({path:route}, "/".concat(str));
    }

    // Responsive sidebar classes
    const sidebarClasses = `
        fixed z-40 top-0 left-0 h-screen w-[16rem] bg-richblack-800 border-r p-4 text-richblack-5 flex flex-col gap-7
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:static md:translate-x-0 md:w-[20rem]
    `;

    return (
        <>
            {/* Hamburger menu for mobile */}
            <button
                className="md:hidden fixed top-4 right-4 z-50 bg-pink-300 p-2 rounded shadow"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Open sidebar"
            >
                <CgMenu className="text-2xl text-white" />
            </button>

            {/* Overlay for mobile when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={sidebarClasses}>
                <div className='w-full flex flex-row gap-4 items-center'>
                    <p className='text-lg'><CgMenu className="hidden md:block" onClick={() => setSidebarOpen(false)} /></p>
                    <p className='text-center font-fira text-lg'>Insurance Gallery</p>
                </div>

                <div className='w-full flex flex-row justify-center gap-4 items-center'>
                    <div className='w-[4rem] md:w-[5.25rem] aspect-square bg-richblack-700 shadow-[0px_0px_5px_0px_#ebf8ff] flex items-center justify-center rounded-md'>
                        <img src={user?.profilePic} alt='userImage' className='rounded-md w-12 md:w-16 p-1 aspect-square'/>
                    </div>
                    <TypeAnimation
                        sequence={[
                            'Insurance Gallery',
                            1000,
                            'Everything at one place!',
                            1000
                        ]}
                        wrapper='span'
                        speed={50}
                        className='w-full font-fira text-base md:text-lg'
                        repeat={Infinity}
                    />
                </div>

                <div className='w-full mt-4 overflow-y-auto overflow-x-hidden text-base md:text-lg self-start flex flex-col gap-3 font-fira flex-1'>
                    {
                        sidebarLinks.map((sidebarLink) => {
                            const Icon = Icons[sidebarLink.icon];
                            return (
                                <details key={sidebarLink?.id} className='w-full group flex flex-col gap-2'>
                                    <summary className='flex flex-row justify-between items-center hover:text-pink-100 cursor-pointer transition-all duration-100'>
                                        <div className={`${matchParentRoute(sidebarLink?.path) ? 'text-pink-100 [text-shadow:_0_0_1px_#0284C7]' : ''} flex flex-row items-center gap-2`} onClick={() => {sidebarLink?.name === "Dashboard" && navigate("/")}}>
                                            {Icon && <Icon className='text-lg'/>}
                                            {sidebarLink?.name}
                                        </div>
                                        {sidebarLink?.expansion && <FaLongArrowAltRight className='text-sm group-open:rotate-90 transition-all duration-300 justify-self-end'/>}
                                    </summary>
                                    <div className='flex flex-col gap-2'>
                                        {
                                            sidebarLink?.expansion && (
                                                sidebarLink?.expansion.map((expansionLink) => (
                                                    <NavLink to={expansionLink?.path} key={expansionLink?.id} className='flex flex-row text-sm items-center gap-2 pl-7 hover:text-pink-100 transition-all duration-100'>
                                                        <p>-</p>
                                                        <p className={`${matchRoute(expansionLink?.path) ? 'text-pink-100 [text-shadow:_0_0_1px_#0284C7]' : 'text-richblack-5'}`}>{expansionLink?.name}</p>
                                                    </NavLink>
                                                ))
                                            )
                                        }
                                    </div>
                                </details>
                            )
                        })
                    }
                    <button type='button' className='flex flex-row items-center gap-2 hover:text-pink-100 transition-all duration-100' onClick={() => {
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
                    }}><Icons.VscSignOut/>Logout</button>
                </div>
                {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
            </div>
        </>
    )
}

export default Sidebar