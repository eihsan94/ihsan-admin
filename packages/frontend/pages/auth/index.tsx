import {
  Box,
  Flex,
  Heading,
  Text,
  BoxProps,
} from '@chakra-ui/react';
import Logo from 'customs/icons/logo';
import { APP_NAME } from 'customs/config';
import AuthForm from '../../core/components/Forms/AuthForm'
import { primaryColorHex } from 'customs/theme/styles';

const LeftPart = () => {
  const authImage = "/images/auth.webp";
  const leftBgProps: BoxProps = {
    bgImage: authImage,
    bgRepeat: "no-repeat",
    bgSize: "cover",
    bgPosition: { base: "top", md: "center" },
  }
  return (
    <Flex
      h={{ base: "70%", md: "100%" }}
      w={{ base: "100%", md: "50%" }}
      p={{ base: 10, md: 20 }}
      {...leftBgProps}>
      <Heading>
        <Flex alignItems="flex-end">
          <Logo width="100px" height="100px" />
        </Flex>
        <Text color={'white'} fontSize={{ base: '2xl', sm: 'md', md: '4xl', lg: '4xl' }}>
          Admin for pros
        </Text>
      </Heading>
    </Flex>
  )
}
const RightPart = () => {
  const rightBgProps: BoxProps = {
    bgColor: primaryColorHex,
    opacity: 1,
    bgImage: `radial-gradient(circle at top right, #4FD1C5, ${primaryColorHex}), repeating-radial-gradient(circle at top right, #4FD1C5, #4FD1C5, 300px, transparent 400px, transparent 40px)`,
    bgBlendMode: "multiply",
  }
  return (
    <Flex
      {...rightBgProps}
      h={{ base: "30%", md: "100%" }}
      w={{ base: "100%", md: "50%" }}
      justifyContent={"center"}
      alignItems={{ base: "flex-start", md: "center" }}
    >
      <Box
        maxW="xl"
        w={{ base: "80%", md: "100%" }}
        pos={{ base: "fixed", md: "relative" }}
        top={{ base: "30vh", md: "-10vh" }}
        backdropFilter="saturate(180%) blur(20px)"
        boxShadow="xl"
        p={{ base: 8, xl: 16 }}
        color={"white"}
        opacity={.9}
        borderRadius={{ base: "2em", xl: "3em" }}>
        <Heading
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          <Text>
            {APP_NAME}!
          </Text>
        </Heading>
        <Text fontSize={{ base: 'sm', sm: 'md' }}>
          Your journey begins here 😉
        </Text>
        <AuthForm />
      </Box>
    </Flex>
  )
}
export default function Index() {


  return (
    <Flex
      h="100vh"
      flexWrap={"wrap"}
    >
      <LeftPart />
      <RightPart />
    </Flex>

  );
}
