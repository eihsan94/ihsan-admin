import React, { FC } from 'react'
import { Box, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import GoogleLoginBtn from '@components/Buttons/googleLoginBtn';

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
  const auth0: { btn: JSX.Element }[] = [
    { btn: <GoogleLoginBtn /> },
  ]
  return (
    <Box mt={5}>
      {auth0.map((a, i) => <Box key={i}> {a.btn}</Box>)}
    </Box>
  )
}

export default AuthForm
