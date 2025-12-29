import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import AppRegistration from '../../AppRegistration';
import StyledModal from '../../components/styled-modal';
import Logo from '../../assets/logo-white.png';
import { LandingFooter, JobsTicker } from '../landing-page/components';
import type { VacancyItem } from '../landing-page/components/jobs-ticker';
import BrainhubHero from './components/brainhub-hero';
import BrainhubMainContent from './components/brainhub-main-content';
import BrainhubCTA from './components/brainhub-cta';
import BrainhubVideoSection from './components/brainhub-video-section';
import BrainhubStats from './components/brainhub-stats';

const vacancyTicker: VacancyItem[] = [
    { flag: '🇺🇸', country: 'United States', count: 2500 },
    { flag: '🇬🇧', country: 'United Kingdom', count: 800 },
    { flag: '🇨🇦', country: 'Canada', count: 600 },
    { flag: '🇦🇺', country: 'Australia', count: 450 },
    { flag: '🇸🇬', country: 'Singapore', count: 350 },
    { flag: '🇦🇪', country: 'UAE', count: 300 },
    { flag: '🇸🇦', country: 'Saudi Arabia', count: 280 },
    { flag: '🇳🇿', country: 'New Zealand', count: 200 },
    { flag: '🇩🇪', country: 'Germany', count: 150 },
    { flag: '🇯🇵', country: 'Japan', count: 120 },
    { flag: '🇮🇪', country: 'Ireland', count: 100 },
    { flag: '🇳🇱', country: 'Netherlands', count: 80 },
];

function BrainhubLanding() {
    const [showRegistration, setShowRegistration] = useState(false);
    const [registrationTrigger, setRegistrationTrigger] = useState<string>('');

    const handleStartOnboarding = (trigger: string) => {
        setRegistrationTrigger(trigger);
        setShowRegistration(true);
    };

    const handleCloseRegistration = () => {
        setShowRegistration(false);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    backgroundColor: '#183aa6',
                    zIndex: 999,
                    width: '100vw',
                    position: 'fixed',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    px: { xs: 2, md: 3 },
                    py: { xs: 2, md: 3 },
                    maxHeight: 200,
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'visible',
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box
                        component="a"
                        href="#home"
                        sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        <Box
                            component="img"
                            src={Logo.src}
                            alt="COLPUNO – empowering filipino nurses"
                            sx={{
                                maxHeight: { xs: '50px', md: '80px' },
                                height: 'auto',
                                position: 'relative',
                                display: 'block',
                            }}
                        />
                    </Box>
                    <Box
                        component="nav"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 3,
                        }}
                    >
                        <Button
                            component="a"
                            href="#home"
                            sx={{ color: 'white', textTransform: 'none' }}
                        >
                            Home
                        </Button>
                        <Button
                            component="a"
                            href="https://www.colpuno.com/login"
                            target="_blank"
                            sx={{ color: 'white', textTransform: 'none' }}
                        >
                            Login
                        </Button>
                        <Button
                            component="a"
                            href="https://www.colpuno.com/"
                            target="_blank"
                            sx={{ color: 'white', textTransform: 'none' }}
                        >
                            About
                        </Button>
                        <Button
                            component="a"
                            href="https://www.colpuno.com/faq"
                            target="_blank"
                            sx={{ color: 'white', textTransform: 'none' }}
                        >
                            FAQ
                        </Button>
                    </Box>
                </Container>
            </Box>

            <Box sx={{ pt: { xs: '80px', md: '120px' } }}>
                {/* Hero Image Section */}
                <BrainhubHero onStartOnboarding={handleStartOnboarding} />

                {/* Vacancy Ticker */}
                <Box sx={{ py: 2, backgroundColor: '#ffffff' }}>
                    <Container maxWidth="lg">
                        <JobsTicker items={vacancyTicker} />
                    </Container>
                </Box>

                {/* Main Content Section */}
                <BrainhubMainContent onStartOnboarding={handleStartOnboarding} />

                {/* CTA Section */}
                <BrainhubCTA onStartOnboarding={handleStartOnboarding} />

                {/* Video Sections */}
                <BrainhubVideoSection onStartOnboarding={handleStartOnboarding} />

                {/* Stats Section */}
                <BrainhubStats onStartOnboarding={handleStartOnboarding} />

                {/* Footer */}
                <Box sx={{ mt: { xs: 4, md: 6 } }}>
                    <LandingFooter />
                </Box>
            </Box>

            {/* Registration Modal */}
            <StyledModal
                open={showRegistration}
                onClose={handleCloseRegistration}
                smallHeightModal={false}
                noCloseIcon
                style={{
                    width: { xs: 'calc(100vw - 32px)', sm: '90%', md: '750px', lg: '850px' },
                    maxWidth: '900px',
                    p: 0,
                    borderRadius: '16px',
                    height: { xs: '95vh', md: 'auto' },
                    maxHeight: { xs: '95vh', md: '90vh' },
                    overflow: 'hidden'
                }}
            >
                <AppRegistration
                    embedded={true}
                    onClose={handleCloseRegistration}
                />
            </StyledModal>
        </Box>
    );
}

export default BrainhubLanding;

