import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  ButtonProps,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import Logo from '../../../customs/icons/logo';
import { FC, useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { signOut, useSession } from 'next-auth/react';
import { useAppContext } from '@contexts/AppContext';
import { useI18n } from 'core/hooks/useI18n';
import { primaryColorHex } from 'customs/theme/styles';


const AuthButton: FC<ButtonProps> = (props) => {
  const router = useRouter()
  const { translate } = useI18n()

  const authHandler = async () => {
    setIsLoggingOut(true)
    if (status === "authenticated") {
      localStorage.clear()
      return await signOut()
    }
    setIsLoggingOut(false)
    router.push('/auth')
  }
  const { data: session, status } = useSession()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  return (
    <Button
      {...props}
      fontSize={'sm'}
      fontWeight={600}
      color={'white'}
      bg={primaryColorHex}
      isLoading={isLoggingOut}
      onClick={authHandler}
      _hover={{
        opacity: .9,
      }}>
      {session ? translate("LOGOUT_LABEL") : translate("AUTH_LABEL")}
    </Button>
  )
}

export default function Nav() {
  const router = useRouter()
  const { isOpen, onToggle } = useDisclosure();
  const logoSize = { base: "50px", xl: "100px" }


  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} align={'center'}>
          <Link onClick={() => router.push('/')}>
            <Logo width={logoSize} height={logoSize} color={useColorModeValue('black', 'white')} />
          </Link>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <AuthButton display={{ base: 'none', md: 'inline-flex' }} />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const router = useRouter()
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const { appState } = useAppContext()
  const { menus } = appState

  return (
    <Stack direction={'row'} spacing={4}>
      {menus.map((navItem, i) => (
        <Box key={i}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                onClick={() => router.push(navItem.href ?? '#')}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child, i) => (
                    <DesktopSubNav key={i} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  const router = useRouter()

  return (
    <Link
      onClick={() => router.push(`${href}`)}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  const { appState } = useAppContext()
  const { menus } = appState

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {menus.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <AuthButton display={{ base: 'inherit', md: 'none' }} />
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        onClick={() => router.push(`${href ?? '#'}`)}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} onClick={() => router.push(`${child.href}`)}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: '特集記事管理✏️',
    children: [
      {
        label: '特集記事の作成、編集などなどこちへクリック',
        href: '/specials',
      },
    ],
  },
  {
    label: '連載記事管理📕',
    children: [
      {
        label: '連載記事の作成、編集などなどこちへクリック',
        href: '/regulars',
      },
    ],
  },
];