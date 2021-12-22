import axios, { AxiosInstance } from 'axios';


const BASE_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';


export const createAPI = (): AxiosInstance => {
  const api = axios.create({baseURL: BASE_URL});
  return api;
};
