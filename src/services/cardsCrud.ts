
//CRUD

import axios from "axios";

const apiCards:string = import.meta.env.VITE_API_CARDS;

// Cards

export const getAllCards = async () => {
    try {
        const response = axios.get(apiCards)
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getCardById = async (id:string) => {
    try {
        const response = axios.get(`${apiCards}/${id}`)
        return response;
    } catch (error) {
        console.log(error);
    }
}