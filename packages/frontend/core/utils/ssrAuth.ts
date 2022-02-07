import { getSession } from "next-auth/react"

export const redirectTo = async (context: any, url?: string) => {
    const session = await getSession({ req: context.req })
    return session
        ? {
            props: { session }
        }
        : {
            redirect: {
                destination: `/${url}`,
                permanent: false,
            }
        }
}

export const redirectHome = async (context: any) => {
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

export const redirectAuth = async (context: any, otherProps?: any) => {
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
