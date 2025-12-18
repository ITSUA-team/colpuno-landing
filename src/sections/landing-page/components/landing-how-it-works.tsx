import { Box, Typography } from '@mui/material';
import StepTracker from '../../../components/step-tracker';

function LandingHowItWorks() {
    const steps = [
        {
            step: 1,
            label: 'Register & verify your email',
        },
        {
            step: 2,
            label: 'Complete your profile',
        },
        {
            step: 3,
            label: 'Confirm your application',
        },
    ];

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

            <StepTracker steps={steps} currentStep={3} />
        </Box>
    );
}

export default LandingHowItWorks;
