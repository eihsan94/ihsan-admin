import { getSession } from "next-auth/client"
import Cookies from 'cookies'

const redirectHome = async(context: any, otherProps?: any) => {
    const session = await getSession({req: context.req})
    return session 
        ? {
            redirect: {
            destination:'/',
            permanent: false,
            }
        }
        : {
            props: {session}
        }
}

const redirectAuth = async(context: any, otherProps?: any) => {
    const session = await getSession({req: context.req})
    const props = {session, ...otherProps}
    return session 
        ? {props}
        : {
            redirect: {
            destination:'/auth',
            permanent: false,
            },
        }
}

const getCookies = (context: any) => {
    const cookies = new Cookies(context.req, context.res)
    const sessionCookie = cookies.get('next-auth.session-token')
    console.log('your session cookie 🍪', sessionCookie);
    return `${sessionCookie}`
}
export  {
    redirectAuth,
    redirectHome,
    getCookies,
}
