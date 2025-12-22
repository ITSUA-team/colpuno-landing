import { Box, Button, TextField,  Link, Typography, useTheme } from '@mui/material';
import { useState } from 'react';

import AppRegistration from '../../../AppRegistration';
import StyledModal from '../../../components/styled-modal';
import { trackRegStarted, trackCtaUnlockJobsClicked } from '../utils/tracking';

function LandingFinalCTA() {
    const theme = useTheme();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isRegOpen, setIsRegOpen] = useState(false);

    const validateEmail = (emailValue: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        trackRegStarted(email);
        trackCtaUnlockJobsClicked();
        setIsRegOpen(true);
    };

    return (
        <Box
            sx={{
                p: { xs: 4, md: 6 },
                textAlign: 'center',
            }}
        >
            <Typography
                variant='h4'
                sx={{
                    fontSize: { xs: '24px', md: '32px' },
                    fontWeight: 700,
                    mb: 2,
                    textAlign: 'center',
                    color: 'common.white',
                }}
            >
                Ready to start your nursing career with clarity?
            </Typography>

            <Box
                component='form'
                onSubmit={handleSubmit} 
                sx={{ maxWidth: 480, mx: 'auto' }}
            >

                <TextField
                    fullWidth
                    sx={{
                        backgroundColor: 'common.white',
                        borderRadius: '8px',
                    }}
                    label='Email address'
                    placeholder='you@example.com'
                    type='email'
                    variant='outlined'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                    }}
                    error={!!error}
                />

                {error && (
                    <Typography
                        variant='body2'
                        sx={{ color: 'error.main', mt: 1, textAlign: 'left' }}
                    >
                        {error}
                    </Typography>
                )}

                <Typography variant="body2" sx={{ color: 'white', my: 2 }}>
                    If you have any questions, feel free to contact us:{' '}
                    <Link
                        sx={{ textDecoration: 'none', color: 'white' }}
                        href="mailto:info@colpuno.com"
                    >
                        info@colpuno.com
                    </Link>
                </Typography>

                <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    fullWidth
                    sx={{
                        mt: 2,
                    }}
                >
                    Unlock jobs
                </Button>
            </Box>
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
                    overflow: 'hidden'
                }}
            >
                <AppRegistration initialEmail={email} embedded onClose={() => setIsRegOpen(false)} />
            </StyledModal>
        </Box>
    );
}

export default LandingFinalCTA;
