import axios from "axios";

export const API = axios.create({
    baseURL: 'http://10.16.50.111:5000/api/',
})