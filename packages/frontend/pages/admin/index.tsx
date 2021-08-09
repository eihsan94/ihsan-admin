import { getLists } from '@utils/crudUtil';
import { getSession } from 'next-auth/client';
import { useState } from 'react';
import { useEffect } from 'react';
import { FC } from 'react'
import {Role} from '@libTypes/types'
import { GetServerSideProps } from 'next';
import { getCookies } from '@utils/ssrAuth';

interface Props {
    cookies:string;
}

const Index:FC<Props> = ({cookies}) => {
    const [roles, setRoles] = useState<Role[]>([])
    useEffect(() =>{
        (async () => {
            const apiRoles = await getLists<Role>('roles', {
                headers: {
                    Authorization:  `Bearer ${cookies}`,
                }
            })
            setRoles(apiRoles)
        })();
    }, [cookies])
    return (
        <>
            {roles.map((r, i) => <div key={i}>{r.role_name}</div>)}
        </>
    )
}

export default Index


export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const cookies =  getCookies(context)
    return {props: {cookies}}
  };