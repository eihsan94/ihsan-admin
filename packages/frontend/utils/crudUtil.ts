import axios, { AxiosRequestConfig } from "axios";
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_IHSAN_PAY_SERVER_BASE_URL}`;
axios.defaults.headers.post['Content-Type'] ='application/json';

const getLists = async<T>(url: string, reqConfig?:AxiosRequestConfig): Promise<T[]> => {
    try {
        const {data} =  await axios.get(`/api/${url}`, reqConfig)
        return data
    } catch (error) {
        return error.response
    }
}
const getSingle = async<T>(url: string, reqConfig?:AxiosRequestConfig): Promise<T> => {
    try {
        const {data} =  await axios.get(`/api/${url}`, reqConfig)
        return data
    } catch (error) {
        return error.response
    }
}
const postSingle = async<T>(url:string, body: T, reqConfig?:AxiosRequestConfig): Promise<T> => {
    try {
        const {data} =  await axios.post(`/api/${url}`, body, reqConfig)
        return data
    } catch (error) {
        return error.response
    }
}
const updateSingle = async<T>(url: string, body: T, reqConfig?:AxiosRequestConfig): Promise<T> => {
    try {
        const {data} =  await axios.put(`/api/${url}`, body, reqConfig)
        return data
    } catch (error) {
        return error.response
    }
}
const deleteSingle = async<T>(url: string, reqConfig?:AxiosRequestConfig): Promise<any> => {
    try {
        const {data, status} =  await axios.delete(`/api/${url}`, reqConfig)
        return {message: data.message, status}
    } catch (error) {
        return error.response
    }
}
const login = async<T>(body: T, reqConfig?:AxiosRequestConfig): Promise<T> => {
    try {
        const {data} =  await axios.post(`/api/users/login`, body, reqConfig)
        return data
    } catch (error) {
        return error.response
    }
}
const signUp = async<T>(body: T, reqConfig?:AxiosRequestConfig): Promise<T> => {
    try {
        const {data} =  await axios.post(`/api/users/`, body, reqConfig)
        return data
    } catch (error) {
        return error.response
    }
}

export {
    getLists,
    getSingle,
    postSingle,
    updateSingle,
    deleteSingle,
    login,
    signUp,
}

