import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbProps } from '@chakra-ui/react'
import NextLink from '@components/NextLink'
import React from 'react'

export interface BreadCrumbLinks {
    name: string
    href: string
}
interface Props extends BreadcrumbProps {
    links: BreadCrumbLinks[]
}

function BreadCrumbs(props: Props) {
    const { links, ...otherProps } = props
    return (
        <Breadcrumb {...otherProps} spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
            {
                links.map((l, i) =>
                    <BreadcrumbItem key={i}>
                        <NextLink href={l.href}>
                            <BreadcrumbLink >{l.name}</BreadcrumbLink>
                        </NextLink>
                    </BreadcrumbItem>
                )
            }
        </Breadcrumb>
    )
}

export default BreadCrumbs
