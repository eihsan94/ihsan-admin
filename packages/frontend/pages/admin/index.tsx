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
import { useFormContext } from 'contexts/FormContext';

interface Props {
    cookies:string;
}
interface AdminDashboard {
    roles: Role[];
    users: User[];
}

const Index:FC<Props> = ({cookies}) => {
    const [roles, setRoles] = useState<Role[] | null>(null)
    const [users, setUsers] = useState<User[] | null>(null)
    const {formSubmitted, setInitialDataLists} = useFormContext()
    const [error, setError] = useState({loaded: false, message: ''})
    useEffect(() =>{
        (async () => {
            await localStorage.setItem('cookies', cookies);
            const adminApi = await getLists<AdminDashboard>('roles/admin')
            setRoles(adminApi.roles)
            setUsers(adminApi.users)
            if (adminApi.roles) {
                setInitialDataLists(
                    [
                        {key: 'ROLE_PERMISSIONS', val: [
                            {name: 'ALL', val: 'ALL'},
                            {name: 'CAN_EDIT_SHOP', val: 'CAN_EDIT_SHOP'},
                            {name: 'CAN_EDIT_USER', val: 'CAN_EDIT_USER'},
                            {name: 'CAN_EDIT_PROFILE', val: 'CAN_EDIT_PROFILE'},
                            {name: 'CAN_EDIT_ROLE', val: 'CAN_EDIT_ROLE'},
                            {name: 'CAN_EDIT_COURSE', val: 'CAN_EDIT_COURSE'},
                            {name: 'CAN_EDIT_PERMISSION', val: 'CAN_EDIT_PERMISSION'},
                            {name: 'CAN_SEE_ANALYTICS', val: 'CAN_SEE_ANALYTICS'},
                            {name: 'CAN_HAVE_1_SHOP', val: 'CAN_HAVE_1_SHOP'},
                            {name: 'CAN_HAVE_3_SHOP', val: 'CAN_HAVE_3_SHOP'},
                            {name: 'CAN_HAVE_UNLIMITED_SHOP', val: 'CAN_HAVE_UNLIMITED_SHOP'},
                            {name: 'CAN_HAVE_10_COURSE_MAX', val: 'CAN_HAVE_10_COURSE_MAX'},
                            {name: 'CAN_HAVE_100_COURSE_MAX', val: 'CAN_HAVE_100_COURSE_MAX'},
                            {name: 'CAN_HAVE_UNLIMITED_COURSE_MAX', val: 'CAN_HAVE_UNLIMITED_COURSE_MAX'},
                        ]},
                        {key: 'ROLES', val: [...adminApi.roles.map(r => ({name: r.role_name, val: r.pk}))]},
                    ]   
                )
            } else if((adminApi as any).data) {
                const message = (adminApi as any).data.error
                setError({loaded: true, message})
            }
            
        })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookies, formSubmitted])

    return (
        <Layout>
            {error.loaded && <div>{error.message}😱</div>}
            {!error.message && !error.loaded &&
            <>
                <NormalTable config={adminConfig.role} data={roles} />
                <NormalTable config={adminConfig.user} data={users} />
            </>
            }
        </Layout>
    )
}

export default Index


export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const cookies = getCookies(context)
    return await redirectAuth(context, {cookies})
};