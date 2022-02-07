import {
    Box,
    Flex,
    VStack,
    BoxProps,
    Avatar,
    AvatarGroup,
    Text,
    Tooltip,
    useColorModeValue,
} from "@chakra-ui/react"
import { HomeIcon, DashboardIcon, UserIcon } from "@components/Icons/Icons"
import NextLink from "@components/NextLink"
import { Separator } from "@components/Separator/Separator"
import { primaryColorHex, primaryColorRgba } from "customs/theme/styles"
import { APP_NAME } from "customs/config"
import Logo from "customs/icons/logo"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { FC } from "react"

export interface MenuProps extends BoxProps {
    label: string
    icon: JSX.Element
    href: string
}

const Menu: FC<MenuProps> = ({ label, icon, href, ...otherProps }) => {
    const router = useRouter()
    const selected = router.pathname === href
    const selectedIconProps = {
        bg: selected ? primaryColorHex : "transparent",
        color: useColorModeValue(selected ? "white" : "black", "white"),
        borderRadius: { base: "1em", md: ".5em" },
        px: { base: "1em", md: ".5em" },
        py: { base: "1em", md: ".3em" },
    }
    const selectedBoxShadow = { base: "", xl: selected ? `0px 10px 40px 0px ${primaryColorRgba(.5)}` : "none" }
    return (
        <NextLink {...otherProps} href={href}>
            <Flex
                pt={{ base: "", md: ".5em" }}
                fontWeight="bold"
                opacity={selected ? 1 : .5}
                w="100%"
                alignItems={"center"}
                justifyContent={{ base: "center", xl: "flex-start" }}
            >
                <Box display={{ base: "inherit", md: "none" }} {...selectedIconProps}>
                    {icon}
                </Box>
                <Flex
                    borderRadius="14px"
                    alignItems={"center"}
                    py={{ base: "0px", md: "1em" }}
                    pl={{ base: "", xl: "20px" }}
                    w={{ base: "fit-content", xl: "100%" }}
                    boxShadow={selectedBoxShadow}>
                    <Box display={{ base: "none", md: "inherit" }}>
                        <Tooltip label={label} fontSize='md'>
                            <Box  {...selectedIconProps}>
                                {icon}
                            </Box>
                        </Tooltip>
                    </Box>
                    <Box display={{ base: "none", xl: "inherit" }} pl="10px" >
                        {label}
                    </Box>
                </Flex>
            </Flex>
        </NextLink>
    )
}

const UserMenu = (props: BoxProps) => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const avatarSize = { base: '1em', md: '1.5rem' }
    const avatarText = status === "authenticated" ? `${session?.user?.name}` : 'Login / Sign up'
    const src = session ? session?.user?.image : null

    const onClickHandler = () => {
        if (status === "authenticated") {
            router.push('/settings')
        } else {
            signIn('google', { callbackUrl: router.pathname })
        }

    }
    const AvatarProfile =
        <>
            <Box display={{ base: "none", md: "inherit" }}>
                {
                    src
                        ? <Avatar bg='#6441F1' size="sm" icon={<UserIcon color="white" fontSize={avatarSize} />} src={src} ignoreFallback={true} />
                        : <Avatar bg='#6441F1' size="sm" icon={<UserIcon color="white" fontSize={avatarSize} />} />
                }
            </Box>
            <Box display={{ base: "inherit", md: "none" }}>
                {
                    src
                        ? <Avatar bg='#6441F1' size="sm" icon={<UserIcon color="white" fontSize={avatarSize} />} src={src} ignoreFallback={true} />
                        : <Avatar bg='#6441F1' size="sm" icon={<UserIcon color="white" fontSize={avatarSize} />} />
                }
            </Box>
        </>
    return (
        <Flex
            {...props}
            alignItems={"center"}
            as="button"
            onClick={onClickHandler}>
            <AvatarGroup>
                {AvatarProfile}
            </AvatarGroup>
            <Text ml=".5em" display={{ base: "none", xl: "inherit" }} fontWeight={"bold"}>{avatarText}</Text>
        </Flex>
    )
}


interface NavProps {
    menus: MenuProps[]
}
const DesktopNav: FC<NavProps> = ({ menus }) => {
    const logoSize = "50px"

    return (
        <Box
            display={"flex"}
            flexDirection="column"
            borderRight={"solid 1px rgba(0,0,0,.05)"}
            h="100vh"
            w={{ base: "", xl: "250px" }}
            px={{ base: "20px", xl: "30px" }}
            pos="relative"
        >
            <NextLink href="/">
                <Flex py="2em" w="fit-content" alignItems={"center"} >
                    <Logo h={logoSize} w={logoSize} color={useColorModeValue('black', 'white')} />
                    <Text ml=".5em" display={{ base: "none", xl: "inherit" }} fontWeight={"bold"} textTransform="uppercase">{APP_NAME}</Text>
                </Flex>
            </NextLink>
            <Separator />
            <Box flex={1}>
                {menus.map((m, i) => <Menu key={i} {...m} />)}
            </Box>
            <UserMenu py="2em" />
        </Box >
    )
}
const MobileNav: FC<NavProps> = ({ menus }) => {
    const logoSize = "30px"
    return (
        <Flex
            pos="fixed"
            bottom="0"
            borderTop={"solid 1px rgba(0,0,0,.1)"}
            w="100vw"
            py="1em"
            alignItems={"center"}
            zIndex={4}
            shadow="md"
            backdropFilter="saturate(180%) blur(15px)"
        >
            <NextLink href="/" flex={1}>
                <Flex w="100%" justifyContent="center" overflow={"hidden"} alignItems={"center"}>
                    <Logo h={logoSize} w={logoSize} color={useColorModeValue('black', 'white')} />
                </Flex>
            </NextLink>
            {menus.map((m, i) => <Menu flex={1} key={i} {...m} />)}
            <UserMenu flex={1} display={"flex"} justifyContent="center" />
        </Flex>
    )
}

export interface SideNavProps extends BoxProps {
    menus: MenuProps[]
}

export const SideNav: FC<SideNavProps> = ({ menus = [] }) => {
    return (
        <>
            <Box display={{ base: "inherit", md: "none" }}>
                <MobileNav menus={menus} />
            </Box>
            <Box display={{ base: "none", md: "inherit" }}>
                <DesktopNav menus={menus} />
            </Box>
        </>
    )
}







interface LeftNavProps extends BoxProps {

}

export const LeftBar: FC<LeftNavProps> = (props) => {
    const { children } = props
    return (
        <VStack {...props}>
            leftbar
        </VStack>
    )
}