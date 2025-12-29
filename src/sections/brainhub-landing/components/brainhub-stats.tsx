import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material';

interface BrainhubStatsProps {
    onStartOnboarding: (trigger: string) => void;
}

const stats = [
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

function BrainhubStats({ onStartOnboarding }: BrainhubStatsProps) {
    const theme = useTheme();
    
    return (
        <Box
            sx={{
                py: { xs: 4, md: 6 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ mb: 4 }}>
                    {/* First row - 3 cards */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { 
                                xs: '1fr', 
                                sm: 'repeat(2, 1fr)', 
                                md: 'repeat(3, 1fr)'
                            },
                            gap: 3,
                            mb: 3,
                        }}
                    >
                        {stats.slice(0, 3).map((stat, index) => (
                            <Box 
                                key={index}
                                sx={{ 
                                    border: '1px solid',
                                    borderColor: 'neutral.300',
                                    borderRadius: '16px',
                                    backgroundColor: theme.palette.common.white,
                                    p: 3,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: theme.shadows[4],
                                        borderColor: 'primary.main',
                                    },
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        mb: 1.5,
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                                        fontFamily: 'Open Sans, sans-serif',
                                    }}
                                >
                                    {stat.number}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                        lineHeight: 1.6,
                                        fontFamily: 'Open Sans, sans-serif',
                                        flexGrow: 1,
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    
                    {/* Second row - 2 cards centered */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 3,
                            flexWrap: 'wrap',
                        }}
                    >
                        {stats.slice(3).map((stat, index) => (
                            <Box 
                                key={index + 3}
                                sx={{ 
                                    border: '1px solid',
                                    borderColor: 'neutral.300',
                                    borderRadius: '16px',
                                    backgroundColor: theme.palette.common.white,
                                    p: 3,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease',
                                    width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' },
                                    maxWidth: { md: '400px' },
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: theme.shadows[4],
                                        borderColor: 'primary.main',
                                    },
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        mb: 1.5,
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                                        fontFamily: 'Open Sans, sans-serif',
                                    }}
                                >
                                    {stat.number}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: { xs: '0.9rem', md: '1rem' },
                                        lineHeight: 1.6,
                                        fontFamily: 'Open Sans, sans-serif',
                                        flexGrow: 1,
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => onStartOnboarding('register-now-bottom')}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            fontFamily: 'Open Sans, sans-serif',
                        }}
                    >
                        REGISTER NOW
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default BrainhubStats;

