import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { deletion } from "../apis";

const {
    DELETE_USER,
    DELETE_COMPANY,
    DELETE_MAKE,
    DELETE_MODAL
} = deletion;

export function deleteUser(formData,token){
    return async() => {
        const toastId = toast.loading('Loading');
        try{
            
            const response = await apiConnector(
                "POST",
                DELETE_USER,
                formData,
                {
                    Authorization:`Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("RESPONSE WHILE DELETING USER -> ",response);

            toast.success(response?.data?.message);

        } catch(error){
            console.log("ERROR WHILE DELETING USER -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export function deleteCompany(formData,token){
    return async() => {
        try{
            const response = await apiConnector(
                "POST",
                DELETE_COMPANY,
                formData,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("RESPONSE WHILE DELETING COMPANY -> ",response);

            toast.success(response?.data?.message);


        } catch(error){
            console.log("ERROR WHILE DELETING COMPANY -> ",error);
            toast.error(error?.response?.data?.message);
        }
    }
}

export function deleteMake(formData,token){
    return async() => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "POST",
                DELETE_MAKE,
                formData,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("RESPONSE WHILE DELETING MAKE -> ",response);

            toast.success(response?.data?.message);

        } catch(error){
            console.log("ERROR WHILE DELETING MAKE -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export function deleteModal(formData,token) {
    return async() => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "POST",
                DELETE_MODAL,
                formData,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("RESPONSE WHILE DELETING MODAL -> ",response);

            toast.success(response?.data?.message);
             
        } catch(error){
            console.log("ERROR WHILE DELETING MAKE -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}