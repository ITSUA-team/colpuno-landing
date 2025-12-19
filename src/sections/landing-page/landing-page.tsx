import { Box, Container } from '@mui/material';
import { useEffect } from 'react';

import LogoBlue from '../../assets/logo-blue.png';
import {
    CareerFeatures,
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
    ScrollToTop,
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
                background: 'linear-gradient(rgba(23, 58, 168, 0.2) 45%, rgba(206, 17, 39, 0.2) 75%), rgb(255, 255, 255)',
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

            {/* Jobs */}
            <Box sx={{ py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        justifyContent: 'center',
                        backgroundColor: 'common.white',
                        borderRadius: 2,
                        maxWidth: { xs: '100%', md: '1260px' },
                        alignItems: 'center',
                        width: '100%',
                        px: { xs: 2, md: 3 },
                        py: { xs: 3, md: 4 },
                    }}
                >
                    <LandingJobs />
                </Box>
            </Box>

            {/* Career features */}
            <Box sx={{ py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        backgroundColor: 'common.white',
                        borderRadius: 2,
                        width: '100%',
                        maxWidth: { xs: '100%', md: '980px' },
                        px: { xs: 2, md: 3 },
                        py: { xs: 3, md: 4 },
                    }}
                >
                    <CareerFeatures />
                </Box>
            </Box>

            <Box sx={{ py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        backgroundColor: 'common.white',
                        borderRadius: 2,
                        width: '100%',
                        maxWidth: { xs: '100%', md: '1260px' },
                        px: { xs: 2, md: 3 },
                        py: { xs: 3, md: 4 },
                    }}
                >
                    <LandingTrust />
                </Box>
            </Box>

            {/* Partner logos carousel */}
            <Box sx={{ py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        backgroundColor: 'common.white',
                        borderRadius: 2,
                        width: '100%',
                        maxWidth: { xs: '100%', md: '1260px' },
                        px: { xs: 2, md: 3 },
                        py: { xs: 3, md: 4 },
                    }}
                >
                    <LogoCarousel />
                </Box>
            </Box>

            <Box sx={{ py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        backgroundColor: 'common.white',
                        borderRadius: 2,
                        width: '100%',
                        maxWidth: { xs: '100%', md: '1260px' },
                        px: { xs: 2, md: 3 },
                        py: { xs: 3, md: 4 },
                    }}
                >
                    <LandingHowItWorks />
                </Box>
            </Box>

            <Box sx={{ py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        borderRadius: 2,
                        width: '100%',
                        maxWidth: { xs: '100%', md: '980px' },
                        px: { xs: 2, md: 3 },
                        py: { xs: 3, md: 4 },
                    }}
                >
                    <LandingProfileMotivator />
                </Box>
            </Box>
            <Box sx={{ py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        backgroundColor: 'common.white',
                        borderRadius: 2,
                        width: '100%',
                        maxWidth: { xs: '100%', md: '1260px' },
                        px: { xs: 2, md: 3 },
                        py: { xs: 3, md: 4 },
                    }}
                >
                    <LandingFAQ />
                </Box>
            </Box>

            <Box sx={{ py: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        borderRadius: 2,
                        width: '100%',
                        maxWidth: { xs: '100%', md: '1260px' },
                        px: { xs: 2, md: 3 },
                        py: { xs: 3, md: 4 },
                    }}
                >
                    <LandingFinalCTA />
                </Box>
            </Box>

            <LandingFooter />

            <LandingStickyCTA />

            <ScrollToTop />
        </Box>
    );
}

export default LandingPage;
