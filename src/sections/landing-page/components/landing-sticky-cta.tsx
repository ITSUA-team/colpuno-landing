import { Box, Button } from '@mui/material';

import { useResponsive } from '../../../hooks';

function LandingStickyCTA() {
    const mdDown = useResponsive('down', 768);

    const handleClick = () => {
        const heroSection = document.getElementById('landing-hero');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    if (!mdDown) {
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
                p: 2,
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
