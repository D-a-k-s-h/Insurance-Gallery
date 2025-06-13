import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { creation } from "../apis";

const {
    CREATE_POLICY,
    UPDATE_POLICY,
    CREATE_USER,
    CREATE_UPDATE_COMPANY_API,
    CREATE_UPDATE_MAKE_API,
    CREATE_UPDATE_MODAL_API
} = creation;

export function createPolicy(formData,token){
    return async() => {
        const toastd = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "POST",
                CREATE_POLICY,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization:`Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("RESPONSE WHILE CREATING POLICY -> ",response);

            toast.success("Policy created successfully");

        } catch(error){
            console.log("ERROR WHILE CREATING POLICY -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastd);
    }
}

export function updatePolicy(formData,token){
    return async() => {
        const toastd = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "POST",
                UPDATE_POLICY,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization:`Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("RESPONSE WHILE UPDATING POLICY -> ",response);

            toast.success("Policy updated successfully");

        } catch(error){
            console.log("ERROR WHILE UPDATING POLICY -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastd);

    }
}

export function createUser(formData,token){
    return async() => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "POST",
                CREATE_USER,
                formData,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("RESPONSE WHILE CREATING USER -> ",response);

            toast.success(response?.data?.message);

        } catch(error){
            console.log("ERROR WHILE CREATING USER -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export function createAndUpdateCompanies(formData,token){
    return async() => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "POST",
                CREATE_UPDATE_COMPANY_API,
                formData,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("RESPONSE WHILE CREATING/UPDATING COMPANY -> ",response);

            toast.success(response?.data?.message);

        } catch(error){
            console.log("ERROR WHILE CREATING/UPDATING COMPANY -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export function createAndUpdateMake(formData,token) {
    return async() => {
        try{
            const response = await apiConnector(
                "POST",
                CREATE_UPDATE_MAKE_API,
                formData,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("RESPONSE WHILE CREATING/UPDATING MAKE -> ",response);

            toast.success(response?.data?.message);

        } catch(error){
            console.log("ERROR WHILE CREATING/UPDATING MAKE -> ",error);
            toast.error(error?.response?.data?.message);
        }
    }
}

export function createAndUpdateModals(formData,token) {
    return async() => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "POST",
                CREATE_UPDATE_MODAL_API,
                formData,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("RESPONSE WHILE CREATING/UPDATING MODAL -> ",response);

            toast.success(response?.data?.message);

        } catch(error){
            console.log("ERROR WHILE CREATING/UPDATING MODAL -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}