import config from "@/config/config";
import axios from "axios";


const api = axios.create({baseURL: config.rootUrl})


export const createStaffAccount = (access_token: string, payload: object, ) => {
    return api.post(`/api/staff`, payload, {headers: {'Authorization':`Bearer ${access_token}`}}).then((data) => data);
};


// export const createDepartment = ( payload: object ) => {
//     return api.post(`/api/departments`, payload).then((data) => data);
// };

export const createDepartment = (access_token: string, payload: object, ) => {
    return api.post(`/api/departments`, payload, {headers: {'Authorization':`Bearer ${access_token}`}}).then((data) => data);
};


export const createStudentAccount = (access_token: string, payload: object, ) => {
    return api.post(`/api/students`, payload, {headers: {'Authorization':`Bearer ${access_token}`}}).then((data) => data);
};