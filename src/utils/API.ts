import axios from "axios";

export const API = axios.create({
    baseURL: 'http://10.16.20.164:5000/api/',
})