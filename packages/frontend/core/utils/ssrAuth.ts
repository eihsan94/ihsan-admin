import { getSession } from "next-auth/react"

const redirectHome = async (context: any, otherProps?: any) => {
    const session = await getSession({ req: context.req })
    return session
        ? {
            props: { session }
        }
        : {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
}

const redirectAuth = async (context: any, otherProps?: any) => {
    const session = await getSession({ req: context.req })
    const props = { session, ...otherProps }

    return session
        ? { props }
        : {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        }
}


export {
    redirectAuth,
    redirectHome,
}
