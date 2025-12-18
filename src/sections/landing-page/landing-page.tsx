import { Box, Container } from '@mui/material';
import { useEffect } from 'react';

import LogoBlue from '../../assets/logo-blue.png';
import {
    CareerFeatures,
    JobBadge,
    JobsTicker,
    LandingFAQ,
    LandingFinalCTA,
    LandingFooter,
    LandingHero,
    LandingHowItWorks,
    LandingJobs,
    LandingProfileMotivator,
    LandingStickyCTA,
    LandingTrust,
    LogoCarousel,
} from './components';
import { trackPageVisit } from './utils/tracking';

function LandingPage() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source') || urlParams.get('source') || 'direct';
        trackPageVisit('homepage', utmSource);
    }, []);

    const vacancies = [
        { flag: '🇰🇼', country: 'Kuwait', count: 200 },
        { flag: '🇺🇸', country: 'United States', count: 1500 },
        { flag: '🇵🇭', country: 'Philippines', count: 1000 },
        { flag: '🇸🇬', country: 'Singapore', count: 2000 },
        { flag: '🇳🇱', country: 'Netherlands', count: 10 },
        { flag: '🇸🇦', country: 'Saudi Arabia', count: 2000 },
        { flag: '🇶🇦', country: 'Qatar', count: 200 },
        { flag: '🇦🇺', country: 'Australia', count: 100 },
        { flag: '🇮🇪', country: 'Ireland', count: 100 },
        { flag: '🇦🇪', country: 'United Arab Emirates', count: 100 },
        { flag: '🇬🇺', country: 'Guam', count: 10 },
        { flag: '🇯🇵', country: 'Japan', count: 20 },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'common.white',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
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
                        maxWidth: 1300,
                        width: '100%',
                        mx: 'auto',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        alignItems: 'center',
                    }}
                >
                    <Box
                        component="img"
                        src={LogoBlue.src}
                        alt="Сolpuno – empowering filipino nurses"
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

            <JobsTicker items={vacancies} />

            <LandingHero />

            <Box sx={{ backgroundColor: 'common.white', py: { xs: 4, md: 6 } }}>
                <Container maxWidth="lg">
                    <LandingJobs />
                </Container>
            </Box>

            {/* Career features */}
            <Container maxWidth="lg">
                <CareerFeatures />
            </Container>

            {/* Trust / Why COLPUNO */}
            <Container maxWidth="lg">
                <LandingTrust />
            </Container>

            {/* Partner logos carousel */}
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
                <LogoCarousel />
            </Container>

            {/* How it works */}
            <Box sx={{ backgroundColor: 'common.white', py: { xs: 4, md: 6 } }}>
                <Container maxWidth="lg">
                    <LandingHowItWorks />
                </Container>
            </Box>

            {/* Profile completion motivator */}
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
                <LandingProfileMotivator />
            </Container>

            {/* FAQ */}
            <Box sx={{ backgroundColor: 'common.white', py: { xs: 4, md: 6 } }}>
                <Container maxWidth="lg">
                    <LandingFAQ />
                </Container>
            </Box>

            {/* Final CTA */}
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
                <LandingFinalCTA />
            </Container>

            {/* Footer */}
            <LandingFooter />

            {/* Sticky CTA */}
            <LandingStickyCTA />
        </Box>
    );
}

export default LandingPage;
