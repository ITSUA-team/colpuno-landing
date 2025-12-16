import { Box, Container } from '@mui/material';
import { useEffect } from 'react';

import LogoBlue from '../../assets/logo-blue.png';
import {
    LandingFAQ,
    LandingFinalCTA,
    LandingFooter,
    LandingHero,
    LandingHowItWorks,
    LandingJobs,
    LandingProfileMotivator,
    LandingStickyCTA,
    LandingTrust,
} from './components';
import { trackPageVisit } from './utils/tracking';

function LandingPage() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source') || urlParams.get('source') || 'direct';
        trackPageVisit('homepage', utmSource);
    }, []);
    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'common.white',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    width: '100vw',
                    position: 'relative',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    backgroundColor: 'common.white',
                    px: { xs: 2, md: 3 },
                    py: { xs: 1, md: 1.5 },
                    height: { xs: 120, md: 160 },
                    maxHeight: 200,
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'visible',
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1460,
                        width: '100%',
                        mx: 'auto',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        alignItems: 'center',
                    }}
                >
                    <Box
                        component='img'
                        src={LogoBlue.src}
                        alt='Сolpuno – empowering filipino nurses'
                        sx={{
                            width: { xs: '100%', md: '33vw' },
                            maxWidth: { xs: '100%', md: 480 },
                            height: 'auto',
                            position: 'relative',
                            display: 'block',
                        }}
                    />
                </Box>
            </Box>
            <LandingHero />
            <Box sx={{ backgroundColor: 'common.white', py: { xs: 4, md: 6 } }}>
                <Container maxWidth='lg'>
                    <LandingJobs />
                </Container>
            </Box>
            <Container maxWidth='lg' sx={{ py: { xs: 4, md: 6 } }}>
                <LandingTrust />
            </Container>
            <Box sx={{ backgroundColor: 'common.white', py: { xs: 4, md: 6 } }}>
                <Container maxWidth='lg'>
                    <LandingHowItWorks />
                </Container>
            </Box>
            <Container maxWidth='lg' sx={{ py: { xs: 4, md: 6 } }}>
                <LandingProfileMotivator />
            </Container>
            <Box sx={{ backgroundColor: 'common.white', py: { xs: 4, md: 6 } }}>
                <Container maxWidth='lg'>
                    <LandingFAQ />
                </Container>
            </Box>
            <Container maxWidth='lg' sx={{ py: { xs: 4, md: 6 } }}>
                <LandingFinalCTA />
            </Container>
            <LandingFooter />
            <LandingStickyCTA />
        </Box>
    );
}

export default LandingPage;
