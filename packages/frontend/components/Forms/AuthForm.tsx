import React, { FC, useState } from 'react'
import { Box, Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { FcGoogle } from 'react-icons/fc';
import { useEffect } from 'react';
import { signIn } from "next-auth/react"

const AuthForm: FC = () => {
    const toast = useToast()
    const router = useRouter()
    useEffect(() => {
        const error = router.query.error
        if (error) {
            toast({
                title: `エラー`,
                description: `${error}`,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            router.replace("?error", '', { shallow: true });
      }
    }, [router, toast])
    const auth0: {name: 'LINE' | 'GOOGLE' | '', bg?: string, bgGradient?: string, color: string, icon?: JSX.Element}[] = [
        {name: 'GOOGLE', bg:'white', color: 'black', icon: <FcGoogle />},
    ]
    return (
        <Box mt={5}>
            {auth0.map((a, i) => 
                <Button
                  key={i}
                  onClick={() => signIn('google')}
                  rounded="full" 
                  size="lg"
                  fontFamily={'heading'}
                  w={'full'}
                  bg={a.bg}
                  bgGradient={a.bgGradient}
                  mb={3}
                  leftIcon={a.icon}
                  color={a.color}
                  shadow="md"
                  _hover={{
                    boxShadow: 'xl',
                  }}>
                  Login with {a.name}
                </Button>
              )}
        </Box>   
    )
}

export default AuthForm
