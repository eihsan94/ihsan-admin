import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
import { fetchPostJSON, StripeLineItem, StripePayload } from "./stripe/api-helpers";
import getStripe from "./stripe/get-stripejs";
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const noAppendCookiesGetLists = async<T>(url: string, reqConfig?: AxiosRequestConfig): Promise<T> => {
    try {
        const { data } = await axios.get(`/api/${url}`, reqConfig)
        return data
    } catch (error: any) {
        return error.response
    }
}
const getLists = async<T>(url: string, reqConfig?: AxiosRequestConfig): Promise<T> => {
    try {
        const { data } = await axios.get(`/api/${url}`, await appendAuth(reqConfig))
        return data
    } catch (error: any) {
        return error.response
    }
}
const getSingle = async<T>(url: string, reqConfig?: AxiosRequestConfig): Promise<T> => {
    try {
        const { data } = await axios.get(`/api/${url}`, await appendAuth(reqConfig))
        return data
    } catch (error: any) {
        return error.response
    }
}
const postSingle = async<T>(url: string, body: T, reqConfig?: AxiosRequestConfig): Promise<T> => {
    try {
        const { data } = await axios.post(`/api/${url}`, body, await appendAuth(reqConfig))
        return data
    } catch (error: any) {
        return error.response
    }
}
const updateSingle = async<T>(url: string, body: T, reqConfig?: AxiosRequestConfig): Promise<T> => {
    try {
        const { data } = await axios.put(`/api/${url}`, body, await appendAuth(reqConfig))
        return data
    } catch (error: any) {
        return error.response
    }
}
const deleteSingle = async<T>(url: string, reqConfig?: AxiosRequestConfig): Promise<any> => {
    try {
        const { data, status } = await axios.delete(`/api/${url}`, await appendAuth(reqConfig))
        return { message: data.message, status }
    } catch (error: any) {
        return error.response
    }
}

const paymentHandler = async (args: StripePayload) => {
    const { success_url, cancel_url, line_items, customer_email } = args

    const response = await fetchPostJSON('/api/checkout_sessions', {
        line_items,
        customer_email,
        success_url,
        cancel_url,
        client_reference_id: 1
    })
    if (response.statusCode === 500) {
        console.error(response.message)
        return alert(response.message)
    }
    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: response.id,
    })
    if (error.message) {
        return alert(error.message)
    }
}

export {
    getLists,
    noAppendCookiesGetLists,
    getSingle,
    postSingle,
    updateSingle,
    deleteSingle,
    paymentHandler,
}

const appendAuth = async (reqConfig?: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
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