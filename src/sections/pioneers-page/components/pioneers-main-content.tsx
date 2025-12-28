import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';

interface PioneersMainContentProps {
    onStartOnboarding: (source: string) => void;
}

const STATS = [
    {
        number: '100% Career Support',
        label: 'Through tech-powered features.',
    },
    {
        number: '360° Career View',
        label: 'Know yourself. Find your job match.',
    },
    {
        number: '12+ Countries',
        label: 'Opening doors worldwide – from Asia to Europe and US.',
    },
    {
        number: '5000+ verified Jobs',
        label: 'From DMW recruiters and local employers.',
    },
    {
        number: '1 Perfect Job Match',
        label: 'Just for you.',
    },
];

function PioneersMainContent({ onStartOnboarding }: PioneersMainContentProps) {
    return (
        <Box
            component="section"
            sx={{
                py: { xs: 4, md: 6 },
                backgroundColor: 'background.paper',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ maxWidth: { xs: '100%', md: '800px' }, mx: 'auto', textAlign: 'center' }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '28px', md: '40px' },
                            fontWeight: 700,
                            mb: 3,
                            color: 'text.primary',
                        }}
                    >
                        Pioneers, Let the jobs come to YOU!
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            mb: 4,
                            color: 'text.secondary',
                            lineHeight: 1.7,
                        }}
                    >
                        Whether you're a fresh graduate, a practicing nurse, or exploring international work, COLPUNO is your trusted, lifelong nursing career mentor-helping you move forward with clarity, growth, and guidance.
                        <br />
                        <br />
                        As a true pioneer, you gain a limited-time first-mover advantage: be the first to access new job openings and the first to react - so you can seize the best opportunities before anyone else!
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => onStartOnboarding('register-now-top')}
                        sx={{
                            mb: 4,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            fontSize: { xs: '1rem', md: '1.125rem' },
                        }}
                    >
                        REGISTER NOW
                    </Button>

                    <Grid 
                        container 
                        spacing={{ xs: 2, sm: 3 }} 
                        sx={{ 
                            mb: 6,
                            justifyContent: 'center',
                        }}
                    >
                        {STATS.map((stat, index) => (
                            <Grid 
                                item 
                                xs={12} 
                                sm={6} 
                                md={index < 4 ? 6 : 12} 
                                key={index}
                                sx={{
                                    display: 'flex',
                                    justifyContent: index < 4 ? 'stretch' : 'center',
                                }}
                            >
                                <Box
                                    sx={{
                                        textAlign: 'center',
                                        p: { xs: 2.5, sm: 3, md: 3 },
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        borderRadius: 3,
                                        width: index < 4 ? '100%' : { xs: '100%', md: '50%' },
                                        maxWidth: index < 4 ? 'none' : '600px',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease-in-out',
                                        backgroundColor: 'background.paper',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                                            borderColor: 'primary.main',
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            mb: 1.5,
                                            color: 'primary.main',
                                            fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.25rem' },
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {stat.number}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '0.9375rem' },
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => onStartOnboarding('register-now-bottom')}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            fontSize: { xs: '1rem', md: '1.125rem' },
                        }}
                    >
                        REGISTER NOW
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default PioneersMainContent;
