import { Button } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

interface Props { }

function GoogleLoginBtn(props: Props) {
    return (
        <Button
            onClick={() => signIn('google')}
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
