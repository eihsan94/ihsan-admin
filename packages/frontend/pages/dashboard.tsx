import { Box } from '@chakra-ui/react'
import LanguageButton from '@components/Buttons/languageButton';
import Layout from '@components/layout';
import ComingSoonLottie from '@components/Lottie/coming-soon';
import { useI18n } from 'core/hooks/useI18n';
import React, { } from 'react'
import DarkModeBtn from '../core/components/Buttons/darkMode';
import Footer from '../core/components/Footer/Footer';
import Billing from '../core/views/Dashboard/Billing';
import Dashboard from '../core/views/Dashboard/Dashboard';
import Profile from '../core/views/Dashboard/Profile';
import Tables from '../core/views/Dashboard/Tables';
import SignIn from '../core/views/Pages/SignIn';
import SignUp from '../core/views/Pages/SignUp';

interface Props { }

function Index(props: Props) {
    const { translate } = useI18n()
    return (
        <Layout>
            {translate("LANGUAGE_LABEL")}
            <LanguageButton />
            <DarkModeBtn />
            <Dashboard />
            <Billing />
            <Profile />
            <Tables />
            <SignIn />
            <SignUp />
            <ComingSoonLottie />
            <Footer />
        </Layout>
    )
}

export default Index
