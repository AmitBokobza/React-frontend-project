import axios from "axios";
import User from "../interfaces/User";

const API:string = import.meta.env.VITE_API_USERS;

// register user

export const registerUser = async (user: User) => {
    try {
        const response = await axios.post(API, user)
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (user : any) => {
    try {
        const response = await axios.post(`${API}/login`, user)
        return response;
    } catch (error) {
        console.log(error);
    }
}