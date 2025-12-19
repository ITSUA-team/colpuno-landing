import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import AppRegistration from '../../../AppRegistration';
import StyledModal from '../../../components/styled-modal';
import { trackRegStarted } from '../utils/tracking';

function LandingFinalCTA() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isRegOpen, setIsRegOpen] = useState(false);

    const validateEmail = (emailValue: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        trackRegStarted(email);
        setIsRegOpen(true);
    };

    return (
        <Box
            sx={{
                backgroundColor: 'primary.main',
                borderRadius: 4,
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
                style={{
                    width: { xs: '95%', sm: '90%', md: '750px', lg: '850px' },
                    maxWidth: '900px',
                    p: { xs: 1.5, sm: 2, md: 2.5 },
                    borderRadius: '16px',
                    maxHeight: { xs: '95vh', md: '90vh' },
                }}
            >
                <AppRegistration initialEmail={email} embedded />
            </StyledModal>
        </Box>
    );
}

export default LandingFinalCTA;
