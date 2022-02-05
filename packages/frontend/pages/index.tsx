import Layout from "../core/components/layout";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirectAuth } from "core/utils/ssrAuth";
import { GetServerSideProps } from "next";

import { FC } from "react";
import { noAppendCookiesGetLists } from "core/utils/crudUtil";
import { UserDashboard, Role, User } from '@lib'
import { useAppContext } from "@contexts/AppContext";
import { Button, Flex, Spinner } from "@chakra-ui/react";

import Link from "next/link";
import UserTable from "core/components/Tables/UserTable";
import RoleTable from "core/components/Tables/RoleTable";
import UserCard from "core/components/Card/UserCard";

interface Props {
  session: string;
  userDashboard: UserDashboard;
}

const Home: FC<Props> = () => {

  const { data: session, status } = useSession()

  const [roles, setRoles] = useState<Role[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<User[] | null>(null)
  const { setCurrentAppState } = useAppContext()

  useEffect(() => {
    (async () => {
      if (session) {
        setIsLoading(true)
        const userDashboard = await noAppendCookiesGetLists<UserDashboard>('users/latest', {
          headers: {
            Current_User_Email: session!.user?.email as string,
          }
        })

        setError(userDashboard.error)
        const { admin } = userDashboard.json || { admin: '' }
        setIsAdmin(!!admin)
        setCurrentAppState({
          menus: userDashboard.json ? userDashboard.json.menus : [],
          roles: admin ? admin.roles : []
        })
        if (admin) {
          setRoles(admin.roles)
          setUsers(admin.users)
        }
        setIsLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  return (
    <Layout>
      {error && <div>{error}</div>}
      {status === "authenticated" && <UserCard name={session?.user?.name!} email={session?.user!.email!} image={session?.user!.image!} />}
      {isLoading
        ? <Flex justifyContent={"center"} p={16}>
          <Spinner color={"#775AF2"} size="xl" thickness='8px' emptyColor='pink' borderRadius={"full"} />
        </Flex>
        : isAdmin &&
        <>
          <Link href={"/dashboard"} passHref>
            <Button>Go to dashboard</Button>
          </Link>
          <RoleTable roles={roles} />
          <UserTable users={users} />
        </>
      }
    </Layout>
  )
}
export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return redirectAuth(context)
};