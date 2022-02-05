import { Box } from '@chakra-ui/react'
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
        <Box w="100vw">
            <DarkModeBtn />
            <Dashboard />
            <Billing />
            <Profile />
            <Tables />
            <SignIn />
            <SignUp />
            <Footer />
        </Box>
    )
}

export default Index
