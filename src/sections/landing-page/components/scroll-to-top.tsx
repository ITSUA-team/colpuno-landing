import { Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: { xs: 8, md: 12 },
                right: { xs: 8, md: 12 },
                zIndex: 1000,
            }}
        >
            <IconButton
                onClick={scrollToTop}
                sx={{
                    backgroundColor: 'common.white',
                    color: 'text.primary',
                    width: { xs: 48, md: 56 },
                    height: { xs: 48, md: 56 },
                    boxShadow: 3,
                    '&:hover': {
                        backgroundColor: 'grey.100',
                    },
                    transition: 'all 0.3s ease',
                }}
                aria-label="scroll to top"
            >
                <Box
                    component="svg"
                    sx={{
                        width: { xs: 28, md: 32 },
                        height: { xs: 28, md: 32 },
                    }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                </Box>
            </IconButton>
        </Box>
    );
}

export default ScrollToTop;
