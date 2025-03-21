//CRUD

import axios from "axios";
import Card from "../interfaces/Card/Card";

const API: string = import.meta.env.VITE_API_CARDS;

// Cards

export const getAllCards = async () => {
  try {
    const response = await axios.get(API);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCardById = async (id: string) => {
  try {
    const response = await axios.get(`${API}/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMyCards = async (token: string) => {
  try {
    const response = await axios.get(`${API}/my-cards`, {
      headers: {
        "x-auth-token": token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createCard = async (card: Card, token: string) => {
  try {
    const response = await axios.post(API, card, {
      headers: {
        "x-auth-token": token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const likeCard = async (id: string, token: string) => {
  try {
    const response = await axios.patch(
      `${API}/${id}`,
      {},
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCard = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${API}/${id}`, {
      headers: {
        "x-auth-token": token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateCard = async (id: string, card: Card, token: string) => {
  try {
    const response = await axios.put(`${API}/${id}`, card, {
      headers: {
        "x-auth-token": token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
