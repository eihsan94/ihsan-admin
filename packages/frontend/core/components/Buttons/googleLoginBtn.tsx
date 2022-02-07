import { Button } from '@chakra-ui/react'
import { signIn, SignInOptions } from 'next-auth/react'
import React, { FC } from 'react'
import { FcGoogle } from 'react-icons/fc'

interface Props {
    options?: SignInOptions
}

const GoogleLoginBtn: FC<Props> = ({ options }) => {
    return (
        <Button
            onClick={() => signIn('google', options || { callbackUrl: '/' })}
            rounded="full"
            size="lg"
            fontFamily={'heading'}
            w={'full'}
            bg="white"
            mb={3}
            leftIcon={<FcGoogle />}
            color="black"
            shadow="md"
            _hover={{
                boxShadow: 'xl',
            }}>
            Login with GOOGLE
        </Button>
    )
}

export default GoogleLoginBtn
