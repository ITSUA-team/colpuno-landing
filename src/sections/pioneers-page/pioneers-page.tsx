import { Box, Container } from '@mui/material';
import { useState } from 'react';

import AppRegistration from '../../AppRegistration';
import StyledModal from '../../components/styled-modal';
import { trackCtaUnlockJobsClicked } from '../landing-page/utils/tracking';
import PioneersHeader from './components/pioneers-header';
import PioneersHero from './components/pioneers-hero';
import PioneersMainContent from './components/pioneers-main-content';
import PioneersVideo from './components/pioneers-video';
import PioneersCTA from './components/pioneers-cta';
import JobsTicker from '../landing-page/components/jobs-ticker';
import LogoCarousel from '../landing-page/components/logo-carousel';
import LandingFooter from '../landing-page/components/landing-footer';

const VACANCY_TICKER_ITEMS = [
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

function PioneersPage() {
    const [isRegOpen, setIsRegOpen] = useState(false);
    const [initialEmail, setInitialEmail] = useState('');

    const handleStartOnboarding = (source: string, email?: string) => {
        trackCtaUnlockJobsClicked();
        if (email) {
            setInitialEmail(email);
        }
        setIsRegOpen(true);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: 'background.default',
            }}
        >
            <PioneersHeader />
            
            <PioneersHero onStartOnboarding={() => handleStartOnboarding('hero-image')} />
            
            <Box sx={{ py: { xs: 2, md: 3 } }}>
                <JobsTicker items={VACANCY_TICKER_ITEMS} />
            </Box>

            <PioneersMainContent onStartOnboarding={handleStartOnboarding} />

            <PioneersVideo onStartOnboarding={() => handleStartOnboarding('complete-profile')} />

            <LogoCarousel />

            <PioneersCTA onStartOnboarding={() => handleStartOnboarding('join-the-pioneers')} />

            <LandingFooter />

            <StyledModal
                open={isRegOpen}
                onClose={() => setIsRegOpen(false)}
                smallHeightModal={false}
                noCloseIcon
                style={{
                    width: { xs: '95%', sm: '90%', md: '750px', lg: '850px' },
                    maxWidth: '900px',
                    p: 0,
                    borderRadius: '16px',
                    maxHeight: { xs: '95vh', md: '90vh' },
                    overflow: 'hidden',
                }}
            >
                <AppRegistration 
                    initialEmail={initialEmail} 
                    embedded 
                    onClose={() => setIsRegOpen(false)} 
                />
            </StyledModal>
        </Box>
    );
}

export default PioneersPage;
