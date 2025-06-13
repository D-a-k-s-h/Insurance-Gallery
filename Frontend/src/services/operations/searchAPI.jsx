import toast from "react-hot-toast";
import { search } from "../apis";
import { apiConnector } from "../apiConnector";

const {
    SEARCH_MOTOR_API,
    GET_AGENTS_API,
    GET_COMPANIES_API,
    GET_CASE_TYPES_API,
    GET_MAKES_API,
    GET_RM_NAMES,
    GET_USER_INFO_API,
    GET_MODAL_INFO_API,
    GET_POLICY_INFO_API
} = search;

export function searchMotor(formData,token){
    return async() => {
        const toastd = toast.loading("Searching...");
        let result = null;
        try{
            const response = await apiConnector(
                "POST",
                SEARCH_MOTOR_API,
                formData,
                {
                    Authorization:`Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            result = response?.data?.data;

            console.log("SEARCH RESPONSE -> ",response);
            toast.success("Search completed successfully");

        } catch(error){
            console.log("ERROR WHILE SEARCHING -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastd);
        return result;
    }
}

export function getAgents(token){
    return async() => {
        const toastId = toast.loading("Loading...");
        let result = null;
        try{
            const response = await apiConnector(
                "GET",
                GET_AGENTS_API,
                null,
                {
                    Authorization:`Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("AGENTS RESPONSE -> ",response);
            
            result = response?.data?.data;

            toast.success(response?.data?.message);

        } catch(error){
            console.log("ERROR WHILE GETTING AGENTS -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getCompanies(token){
    return async() => {
        const toastId = toast.loading("Loading...");
        let result = null;
        try{
            const response = await apiConnector(
                "GET",
                GET_COMPANIES_API,
                null,
                {
                    Authorization:`Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("COMPANIES RESPONSE -> ",response);
            toast.success(response?.data?.message);
            
            result = response?.data?.data;

        } catch(error){
            console.log("ERROR WHILE GETTING COMPANIES -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getCaseTypes(token){
    return async() => {
        const toastId = toast.loading("Loading...");
        let result = null;
        try{
            const response = await apiConnector(
                "GET",
                GET_CASE_TYPES_API,
                null,
                {
                    Authorization:`Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("CASE TYPES RESPONSE -> ",response);
            toast.success("Case types fetched successfully");
            result = response?.data?.data;

        } catch(error){
            console.log("ERROR WHILE GETTING CASE TYPES -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getMakes(token){
    return async() => {
        const toastId = toast.loading("Loading...");
        let result = null;
        try{
            console.log("TOKEN -> ",token);
            const response = await apiConnector(
                "GET",
                GET_MAKES_API,
                null,
                {
                    Authorization:`Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("MAKES RESPONSE -> ",response);
            toast.success("Makes fetched successfully");
            result = response?.data?.data;

        } catch(error){
            console.log("ERROR WHILE GETTING MAKES -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getRmNames(token){
    return async() => {
        const toastId = toast.loading("Loading");
        let result = null;
        try{
            const response = await apiConnector(
                "GET",
                GET_RM_NAMES,
                null,
                {
                    Authorization:`Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("RM NAMES RESPONSE -> ",response);
            toast.success("RM Names fetched successfully");
            result = response?.data?.data;

        } catch(error){
            console.log("ERROR WHILE GETTING RM NAMES -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getUserInfo(accountType,token){
    return async() => {
        let result = null;
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "POST",
                GET_USER_INFO_API,
                {accountType},
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log(`${accountType} INFO RESPONSE -> `,response);
            toast.success(response?.data?.message);
            result = response?.data?.data;

        } catch(error){
            console.log("ERROR WHILE GETTING USER INFO -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getModals(token){
    return async() => {
        let result = null;
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "GET",
                GET_MODAL_INFO_API,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("MODAL INFO RESPONSE -> ",response);
            toast.success(response?.data?.message);
            result = response?.data?.data;

        } catch(error){
            console.log("ERROR WHILE GETTING MODAL INFO -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getPolicyInfo(vehicleType,token,filters){
    return async() => {
        let result = null;
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector(
                "POST",
                GET_POLICY_INFO_API,
                {vehicleType, ...filters},
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log(`${vehicleType} POLICY INFO RESPONSE -> `,response);
            toast.success(response?.data?.message);
            result = response?.data?.data;

        } catch(error){
            console.log("ERROR WHILE GETTING POLICY INFO -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        return result;
    }
}