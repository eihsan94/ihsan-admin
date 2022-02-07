import { Box, BoxProps } from "@chakra-ui/react"
import Link from "next/link"
import { FC } from "react"
interface Props extends BoxProps {
    href: string
}
const NextLink: FC<Props> = ({ href, children, ...props }) => {
    return (
        <Box cursor={"pointer"} {...props}>
            <Link href={href}>
                {children}
            </Link>
        </Box>
    )
}

export default NextLink
