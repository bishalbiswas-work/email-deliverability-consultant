import React from 'react'
import Head from 'next/head'

import LandingPagev2_AutomatedEmailWarmup_Consultant from './components/emailDeliverilityConsultant_landingPage/LandingPagev2_AutomatedEmailWarmup_Consultant';
import LandingPagev2_EmailWarmup_Consultant from './components/emailDeliverilityConsultant_landingPage/LandingPagev2_EmailWarmup_Consultant';

const Home = () => {
    return (
        <div>
            <Head>
                <title>Email Deliverability Consultant</title>
                <meta name="description" content="15-Minute Free Consultation with Top Rated Email Deliverability Consultant." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LandingPagev2_EmailWarmup_Consultant />
        </div>);

}



export default Home;