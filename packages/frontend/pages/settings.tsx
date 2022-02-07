import { Box, Text } from '@chakra-ui/react'
import DarkModeBtn from '@components/Buttons/darkMode'
import LanguageButton from '@components/Buttons/languageButton'
import Layout from '@components/layout'
import { useI18n } from 'core/hooks/useI18n'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

interface Props { }

function Settings(props: Props) {
    const { } = props
    const { translate } = useI18n()
    const { status } = useSession()
    const router = useRouter()
    if (status === "unauthenticated") {
        router.push("/auth")
    }
    return (
        <>
            {
                status === "authenticated"
                &&
                <Layout>
                    <Box>
                        <Text textTransform={"capitalize"} fontSize={"3xl"} fontWeight="bold">
                            settings
                        </Text>
                    </Box>
                    <DarkModeBtn />
                    <Box py="2em">
                        <Text pb="1em" fontSize={"xl"} fontWeight="bold">
                            {translate("LANGUAGE_LABEL")}
                        </Text>
                        <LanguageButton />
                    </Box>
                </Layout>
            }
        </>
    )
}

export default Settings
