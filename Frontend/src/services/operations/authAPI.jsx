import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { auth } from "../apis";
import { setToken, setUser } from "../../slices/authSlice";

const {
    LOGIN_API,
    SIGNUP_API
} = auth;

export function login(formData,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",LOGIN_API,formData);

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            console.log("LOGIN RESPONSE -> ",response);
            
            const user = response?.data?.user;
            const token = response?.data?.token;

            dispatch(setUser(user));
            dispatch(setToken(token));

            localStorage.setItem("user",JSON.stringify(user));
            localStorage.setItem("token",JSON.stringify(token));

            toast.success("Login successfull");
            navigate("/");

        } catch(error){
            console.log("ERROR WHILE LOGIN -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export function signup(formData,navigate){
    return async() => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST",SIGNUP_API,formData);

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            toast.success("SignUp Successfull");

            console.log("SIGNUP RESPONSE -> ",response);

            navigate("/login");

        } catch(error){
            console.log("ERROR WHILE SIGNUP -> ",error);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export function logout(navigate){
    return async(dispatch) => {
        dispatch(setUser(null));
        dispatch(setToken(null));

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        toast.success("logged out successfully");
        navigate("/login");
    }
}