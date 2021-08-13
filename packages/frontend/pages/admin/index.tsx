import { getLists, postSingle, updateSingle } from '@utils/crudUtil';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FC } from 'react'
import {Role, User} from '@libTypes/types'
import { GetServerSideProps } from 'next';
import { getCookies, redirectAuth } from '@utils/ssrAuth';
import Layout from '@components/layout';
import NormalTable from '@components/tables/normal';
import { adminConfig } from 'constant/admin-page-setting';

interface Props {
    cookies:string;
}
interface AdminDashboard {
    roles: Role[];
    users: User[];
}


const Index:FC<Props> = ({cookies}) => {
    const [roles, setRoles] = useState<Role[]>([])
    const [users, setUsers] = useState<User[]>([])

    useEffect(() =>{
        (async () => {
            const apiRoles = await getLists<AdminDashboard>('roles/admin', {
                headers: {
                    Authorization:  `Bearer ${cookies}`,
                }
            })
            setRoles(apiRoles.roles)
            setUsers(apiRoles.users)
        })();
    }, [cookies])

    return (
        <Layout>
            <NormalTable config={adminConfig.role} data={roles} />
            <NormalTable config={adminConfig.user} data={users} />
        </Layout>
    )
}

export default Index


export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const cookies =  getCookies(context)
    return await redirectAuth(context, {cookies})
  };