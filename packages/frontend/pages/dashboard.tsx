import Layout from '@components/layout';
import ComingSoonLottie from '@components/Lottie/coming-soon';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Footer from '../core/components/Footer/Footer';
import Billing from '../core/views/Dashboard/Billing';
import Dashboard from '../core/views/Dashboard/Dashboard';
import Profile from '../core/views/Dashboard/Profile';
import Tables from '../core/views/Dashboard/Tables';
import SignIn from '../core/views/Pages/SignIn';
import SignUp from '../core/views/Pages/SignUp';

interface Props { }

function Index(props: Props) {
    const { status } = useSession()
    const router = useRouter()
    if (status === "unauthenticated") {
        router.push("/auth")
    }
    return (
        <>
            {
                status === "authenticated"
                && <Layout>
                    <Dashboard />
                    <Billing />
                    <Profile />
                    <Tables />
                    <SignIn />
                    <SignUp />
                    <ComingSoonLottie />
                    <Footer />
                </Layout>
            }
        </>
    )
}

export default Index
