import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

import { useResponsive } from '../../../hooks';
import { trackCtaUnlockJobsClicked } from '../utils/tracking';

function LandingStickyCTA() {
    const mdDown = useResponsive('down', 768);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const badgeElement = document.getElementById('job-vacancies-badge');
            if (badgeElement) {
                const rect = badgeElement.getBoundingClientRect();
                setIsVisible(rect.top < window.innerHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Check initial state
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        trackCtaUnlockJobsClicked();
        const heroSection = document.getElementById('landing-hero');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    if (!mdDown || !isVisible) {
        return null;
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'transparent',
                px: 3,
                py: 1,
                zIndex: 1000,
            }}
        >
            <Button
                variant='contained'
                fullWidth
                size='large'
                onClick={handleClick}
                sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 999,
                    px: 3,
                    py: 1.5,
                }}
            >
                Unlock jobs
            </Button>
        </Box>
    );
}

export default LandingStickyCTA;
