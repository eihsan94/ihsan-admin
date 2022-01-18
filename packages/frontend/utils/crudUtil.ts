import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_IHSAN_PAY_SERVER_BASE_URL}`;
axios.defaults.headers.post['Content-Type'] ='application/json';

const noAppendCookiesGetLists = async<T>(url: string, reqConfig?:AxiosRequestConfig): Promise<T> => {
    try {
        const {data} =  await axios.get(`/api/${url}`, reqConfig)
        return data
    } catch (error: any) {
        return error.response
    }
}
const getLists = async<T>(url: string, reqConfig?:AxiosRequestConfig): Promise<T> => {
    try {
        const {data} =  await axios.get(`/api/${url}`, await appendAuth(reqConfig))
        return data
    } catch (error: any) {
        return error.response
    }
}
const getSingle = async<T>(url: string, reqConfig?:AxiosRequestConfig): Promise<T> => {
    try {
        const {data} =  await axios.get(`/api/${url}`, await appendAuth(reqConfig))
        return data
    } catch (error: any) {
        return error.response
    }
}
const postSingle = async<T>(url:string, body: T, reqConfig?:AxiosRequestConfig): Promise<T> => {
    try {
        const {data} =  await axios.post(`/api/${url}`, body, await appendAuth(reqConfig))
        return data
    } catch (error: any) {
        return error.response
    }
}
const updateSingle = async<T>(url: string, body: T, reqConfig?:AxiosRequestConfig): Promise<T> => {
    try {
        const {data} =  await axios.put(`/api/${url}`, body, await appendAuth(reqConfig))
        return data
    } catch (error: any) {
        return error.response
    }
}
const deleteSingle = async<T>(url: string, reqConfig?:AxiosRequestConfig): Promise<any> => {
    try {
        const {data, status} =  await axios.delete(`/api/${url}`, await appendAuth(reqConfig))
        return {message: data.message, status}
    } catch (error: any) {
        return error.response
    }
}
/**
 * 
 * @param body 
 * @param reqConfig 
 * @returns data or error
 * @description we don't use append auth here because append auth is for client side code login and signup is held in server side
 */
const login = async<T>(body: T, reqConfig?:AxiosRequestConfig): Promise<T> => {
    try {
        const {data} =  await axios.post(`/api/users/login`, body, reqConfig)
        return data
    } catch (error: any) {
        return error.response
    }
}
const signUp = async<T>(body: T, reqConfig?:AxiosRequestConfig): Promise<T> => {
    try {
        const {data} =  await axios.post(`/api/users/`, body, reqConfig)
        return data
    } catch (error: any) {
        return error.response
    }
}

export {
    getLists,
    noAppendCookiesGetLists,
    getSingle,
    postSingle,
    updateSingle,
    deleteSingle,
    login,
    signUp,
}

const appendAuth = async(reqConfig?: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const session = await getSession()
    return session
    ? {
        ...reqConfig,
        headers: {
            Current_User_Email: session!.user?.email as string,
        }
    }
    : {
        ...reqConfig
    }
}