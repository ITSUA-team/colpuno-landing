import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StepBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
    border: `2px solid ${theme.palette.primary.main}`,
    textAlign: 'center',
    flex: 1,
    [theme.breakpoints.down('md')]: {
        minWidth: '100%',
    },
    [theme.breakpoints.up('md')]: {
        minWidth: '200px',
    },
}));

function LandingHowItWorks() {
    return (
        <Box>
            <Typography
                variant='h4'
                sx={{
                    fontSize: { xs: '24px', md: '32px' },
                    mb: 4,
                    textAlign: 'center',
                }}
            >
                From ad → job → onboarding → application (in minutes)
            </Typography>

            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={3}
                sx={{ justifyContent: 'center', alignItems: 'stretch' }}
            >
                <StepBox>
                    <Typography variant='h3' sx={{ color: 'primary.main', mb: 2 }}>
                        1
                    </Typography>
                    <Typography variant='subtitle1' sx={{ mb: 1 }}>
                        Register & verify your email
                    </Typography>
                    <Typography variant='body2'>
                        Start with your email address. We&apos;ll send you a verification link to get started.
                    </Typography>
                </StepBox>

                <StepBox>
                    <Typography variant='h3' sx={{ color: 'primary.main', mb: 2, fontWeight: 700 }}>
                        2
                    </Typography>
                    <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 1 }}>
                        Complete your profile (so employers can match you)
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Build your professional profile with your skills, experience, and career preferences.
                    </Typography>
                </StepBox>

                <StepBox>
                    <Typography variant='h3' sx={{ color: 'primary.main', mb: 2, fontWeight: 700 }}>
                        3
                    </Typography>
                    <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 1 }}>
                        Confirm your application and track progress inside COLPUNO
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Apply to jobs and track your application status all in one place.
                    </Typography>
                </StepBox>
            </Stack>
        </Box>
    );
}

export default LandingHowItWorks;
