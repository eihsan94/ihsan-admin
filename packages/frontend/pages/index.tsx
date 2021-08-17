import Layout from "../components/layout";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import UserCard from "@components/Card/UserCard";
import { getCookies, redirectAuth } from "@utils/ssrAuth";
import { GetServerSideProps } from "next";

import { FC } from "react";
import { noAppendCookiesGetLists } from "@utils/crudUtil";
import { Role, User, AppState } from "@libTypes/types";
import { useFormContext } from "contexts/FormContext";
import { adminConfig } from "constant/admin-page-setting";
import NormalTable from "@components/tables/normal";
import { useAppContext } from "contexts/AppContext";

interface Props {
  cookies: string;
  userDashboard: AppState;
}

const Home:FC<Props> = ({userDashboard}) => {
  const [session] = useSession()
  const [roles, setRoles] = useState<Role[] | null>(null)
  const [users, setUsers] = useState<User[] | null>(null)
  const {setInitialDataLists} = useFormContext()
  const {setCurrentAppState, appState} = useAppContext()
  const {admin} = userDashboard.json
  
    useEffect(() => {
      setCurrentAppState(userDashboard)
      if (admin) {
        setRoles(admin.roles)
        setUsers(admin.users)
        setInitialDataLists([
          {key: 'ROLES', val: [...admin.roles.map(r => ({name: r.role_name, val: r.pk}))]},
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
        ])
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Layout>
          {session && <UserCard name={session.user!.name!} email={session.user!.email!} image={session.user!.image!}/>}
          {admin &&
            <>
              <NormalTable config={adminConfig.role} data={roles} />
              <NormalTable config={adminConfig.user} data={users} />
            </>
          }
        </Layout>
    )
}
export  default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = getCookies(context)
  const userDashboard = await noAppendCookiesGetLists<AppState>('users/latest', {
    headers: {
      Authorization:  `Bearer ${cookies}`,
    }
  })
  return redirectAuth(context, {userDashboard})
};