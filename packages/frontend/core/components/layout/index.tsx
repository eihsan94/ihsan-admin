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
import { SideNav } from '@components/Nav/sidenav';
export interface BreadCrumbItemProps {
    href: string;
    name: string;
}
interface Props {
    breadCrumbs?: BreadCrumbItemProps[];
}

const Layout: React.FC<Props> = ({ breadCrumbs, children }) => {

    return (
        <Flex h="100vh">
            <SideNav />
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
