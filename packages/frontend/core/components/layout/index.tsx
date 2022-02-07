import React from 'react'
import Nav from '../Nav/nav'
import {
    Container,
    Stack,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Box,
    Flex,
} from '@chakra-ui/react';
import Link from 'next/link'
import { MenuProps, SideNav } from '@components/Nav/sidenav';
import { HomeIcon, DashboardIcon } from '@components/Icons/Icons';
export interface BreadCrumbItemProps {
    href: string;
    name: string;
}
interface Props {
    breadCrumbs?: BreadCrumbItemProps[];
}

const Layout: React.FC<Props> = ({ breadCrumbs, children }) => {
    const size = "1em"
    const menus: MenuProps[] = [
        { label: "Top", icon: <HomeIcon h={size} w={size} />, href: '/' },
        { label: "Dashboard", icon: <DashboardIcon h={size} w={size} />, href: '/dashboard' },
    ]
    return (
        <Flex h="100vh">
            <SideNav menus={menus} />
            <Box w="100%" h="100%" overflow={"auto"}>
                <Nav />
                <Container maxW={'10xl'} p="30px">
                    {breadCrumbs &&
                        <Breadcrumb px={'20'} pt={'10'}>
                            {breadCrumbs.map((item, i) =>
                                <BreadcrumbItem key={i}>
                                    <Link href={item.href}>
                                        {item.name}
                                    </Link>
                                </BreadcrumbItem>
                            )}
                        </Breadcrumb>
                    }
                    {children}
                </Container>
            </Box>
        </Flex>
    )
}

export default Layout
