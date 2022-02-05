import { Box } from '@chakra-ui/react'
import Layout from '@components/layout';
import React, { } from 'react'
import DarkModeBtn from '../components/Buttons/darkMode';
import Footer from '../components/Footer/Footer';
import Billing from '../views/Dashboard/Billing';
import Dashboard from '../views/Dashboard/Dashboard';
import Profile from '../views/Dashboard/Profile';
import Tables from '../views/Dashboard/Tables';
import SignIn from '../views/Pages/SignIn';
import SignUp from '../views/Pages/SignUp';

interface Props { }

function Index(props: Props) {
    return (
        <Layout>
            <DarkModeBtn />
            <Dashboard />
            <Billing />
            <Profile />
            <Tables />
            <SignIn />
            <SignUp />
            <Footer />
        </Layout>
    )
}

export default Index
