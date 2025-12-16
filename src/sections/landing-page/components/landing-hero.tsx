import { Box, Button, Stack, TextField, Typography, alpha } from '@mui/material';
import { useState } from 'react';

import AppRegistration from '../../../AppRegistration';
import StyledModal from '../../../components/styled-modal';
import { trackRegStarted } from '../utils/tracking';
import LandingJobPreview from './landing-job-preview';
import IconStar2 from "../../../assets/icon-components/icon-star";
import IconMatchingPilotRocket from "../../../assets/icon-components/icon-rocket";

function LandingHero() {
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
        <>
            <Box
                id='landing-hero'
                sx={{
                    width: '100vw',
                    position: 'relative',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    backgroundColor: 'common.white',
                    px: { xs: 2, md: 3 },
                    py: { xs: 4, md: 6 },
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1260,
                        mx: 'auto',
                        p: { xs: 3, md: 4 },
                        borderRadius: 3,
                        background: (theme) => `linear-gradient(0deg, ${theme.palette.secondary.main} -54.4%, ${theme.palette.primary.main} 100%)`,
                        position: 'relative',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <Box sx={{ position: 'absolute', top: '29px', left: '47px' }}>
                        <IconStar2 />
                    </Box>

                    <Stack
                        direction={{ xs: 'column', lg: 'row' }}
                        spacing={{ xs: 4, lg: 4 }}
                        sx={{
                            alignItems: { xs: 'stretch', lg: 'flex-start' },
                        }}
                    >
                        <Box
                            sx={{
                                flex: { lg: '0 0 40%' },
                                maxWidth: { lg: '40%' },
                                display: 'grid',
                                justifyContent: 'center',
                                gap: '1rem',
                                p: { xs: 2, md: 3 },
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    textAlign: 'center',
                                    mx: 'auto',
                                }}
                            >
                                <Typography
                                    variant='h2'
                                    sx={{
                                        fontSize: { xs: '26px', md: '34px', lg: '40px' },
                                        mb: 2,
                                        lineHeight: 1.2,
                                        color: 'common.white',
                                    }}
                                >
                                    Your first nursing job shouldn&apos;t be a guessing game.
                                </Typography>
                                <Typography
                                    variant='body1'
                                    sx={{
                                        mb: 3,
                                        fontSize: { xs: '16px', md: '18px' },
                                        color: (theme) => theme.palette.font.white60,
                                    }}
                                >
                                    Colpuno is your digital career mentor built for Filipino nurses, helping you build your
                                    profile, understand your strengths, and apply to trusted job openings faster.
                                </Typography>

                                <Box sx={{
                                    flex: 1,
                                    display: 'grid',
                                    rowGap: '24px',
                                    p: { xs: 2, md: 3 },
                                    backgroundColor: 'primary.dark',
                                    borderRadius: '16px',
                                    justifyContent: 'center',
                                     }}>
                                    <Box component='form' onSubmit={handleSubmit} sx={{ maxWidth: '395px', width: '100%', textAlign: 'center' }}>

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
                                            helperText={error}
                                        />
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            size='large'
                                            fullWidth
                                            sx={{
                                                mt: 2,
                                            }}
                                        >
                                          Unlock  jobs
                                        </Button>

                                        <Box sx={{ position: 'absolute', top: '20px', right: '20px' }}>
                                            <IconMatchingPilotRocket />
                                        </Box>
                                    </Box>
                                    <Stack spacing={1.25}>
                                        <Typography
                                            variant='body1'
                                            sx={{
                                                textAlign: 'center',
                                                color: 'common.white',
                                                fontSize: { xs: '15px', md: '16px' },
                                            }}
                                        >
                                            Already have an account?{' '}
                                            <Button
                                                variant='text'
                                                onClick={() => (window.location.href = '/login')}
                                                sx={{
                                                    p: 0,
                                                    minWidth: 'auto',
                                                    fontSize: { xs: '15px', md: '16px' },
                                                    textDecoration: 'underline',
                                                    color: 'primary.lighter',
                                                    '&:hover': {
                                                        textDecoration: 'underline',
                                                        color: 'common.white',
                                                    },
                                                }}
                                            >
                                                Log in
                                            </Button>
                                        </Typography>
                                        <Typography
                                            variant='caption'
                                            sx={{
                                                textAlign: 'center',
                                                color: (theme) => theme.palette.font.white60,
                                                display: 'block',
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            By continuing, you&apos;ll receive a verification link/code and updates from
                                            Colpuno.
                                        </Typography>
                                        <Box sx={{ textAlign: 'center', pt: 0.5 }}>
                                            <Typography
                                                variant='caption'
                                                sx={{ color: (theme) => theme.palette.font.white60, fontSize: '0.8125rem' }}
                                            >
                                                It takes 2 minutes to get started • Free to join • Data-protected • Verified
                                                job listings
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                mt: { xs: 4, lg: 0 },
                                p: { xs: 2, md: 3 },
                            }}
                        >
                            <LandingJobPreview />
                        </Box>
                    </Stack>
                </Box>
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
        </>
    );
}

export default LandingHero;
