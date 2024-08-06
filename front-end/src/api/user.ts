import config from "@/config/config";
import axios from "axios";


const api = axios.create({baseURL: config.rootUrl})


export const loginUser = (payload: object) => {
    return api.post(`/api/auth/signin`, payload).then((data) => data);
};