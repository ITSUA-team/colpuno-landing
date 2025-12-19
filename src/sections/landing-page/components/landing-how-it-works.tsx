import { Box, Stack, Typography } from '@mui/material';
import Step1Img from '../../../assets/step_1.png';
import Step2Img from '../../../assets/step_2.png';
import Step3Img from '../../../assets/step_3.png';

function LandingHowItWorks() {
    const steps = [
        {
            image: Step1Img,
            text: 'Start onboarding and add key details',
        },
        {
            image: Step2Img,
            text: 'Verify your email link and create your account',
        },
        {
            image: Step3Img,
            text: 'Confirm your application and track progress',
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
                    fontWeight: 700,
                }}
            >
                From Job to Application in Minutes!
            </Typography>

            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 3, md: 2 }}
                sx={{
                    justifyContent: 'center',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    maxWidth: 1000,
                    mx: 'auto',
                }}
            >
                {steps.map((step, index) => (
                    <Box key={index}>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            spacing={{ xs: 0, md: 2 }}
                            alignItems="center"
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flex: 1,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={typeof step.image === 'string' ? step.image : (step.image as any).src}
                                    alt={`Step ${index + 1}`}
                                    sx={{
                                        width: { xs: 200, md: 240 },
                                        height: 'auto',
                                        mb: 2,
                                    }}
                                />
                                <Typography
                                    variant="body1"
                                    sx={{
                                        textAlign: 'center',
                                        fontWeight: 600,
                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                        maxWidth: 240,
                                    }}
                                >
                                    {step.text}
                                </Typography>
                            </Box>
                            {index < steps.length - 1 && (
                                <Box
                                    sx={{
                                        display: { xs: 'none', md: 'block' },
                                        fontSize: 32,
                                        color: 'primary.main',
                                        mt: 8,
                                    }}
                                >
                                    →
                                </Box>
                            )}
                        </Stack>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}

export default LandingHowItWorks;
