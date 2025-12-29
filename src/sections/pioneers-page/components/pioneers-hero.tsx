import { Box, Container, Typography } from '@mui/material';
import { useState } from 'react';
import HeroPioneerImg from '../../../public/images/hero-pioneer-v2.png';

interface PioneersHeroProps {
    onStartOnboarding: () => void;
}

function PioneersHero({ onStartOnboarding }: PioneersHeroProps) {
    const [imageError, setImageError] = useState(false);
    const heroImageSrc = typeof HeroPioneerImg === 'string' ? HeroPioneerImg : (HeroPioneerImg as any).src;

    return (
        <Box
            id="home"
            sx={{
                width: '100%',
                position: 'relative',
                cursor: 'pointer',
                '& img': {
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                },
            }}
            onClick={onStartOnboarding}
            onTouchEnd={(e) => {
                e.preventDefault();
                onStartOnboarding();
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    position: 'relative',
                    minHeight: { xs: '400px', md: '600px', lg: '700px' },
                    backgroundColor: 'primary.main',
                    backgroundImage: imageError ? 'linear-gradient(135deg, #173AA8 0%, #CE1127 100%)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {!imageError && (
                    <>
                        {/* Blurred background image */}
                        <Box
                            component="img"
                            src={heroImageSrc}
                            alt=""
                            sx={{
                                position: 'absolute',
                                top: '-20px',
                                left: '-20px',
                                width: 'calc(100% + 40px)',
                                height: 'calc(100% + 40px)',
                                objectFit: 'cover',
                                filter: 'blur(20px)',
                                opacity: 0.6,
                                zIndex: 0,
                                transform: 'scale(1.1)',
                            }}
                        />
                    </>
                )}
                
                <Container
                    maxWidth="lg"
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {!imageError && (
                        <Box
                            component="img"
                            src={heroImageSrc}
                            alt="Pioneers Hero"
                            onError={() => setImageError(true)}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: { xs: '400px', md: '600px', lg: '700px' },
                                objectFit: 'contain',
                                borderRadius: 2,
                            }}
                        />
                    )}
                    <Typography
                        variant="h2"
                        sx={{
                            color: 'common.white',
                            textAlign: 'center',
                            px: 3,
                            fontSize: { xs: '28px', md: '40px' },
                            fontWeight: 700,
                            position: 'absolute',
                            bottom: { xs: 20, md: 40 },
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 2,
                            textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                            width: '100%',
                        }}
                    >
                        Pioneers, Let the jobs come to YOU!
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}

export default PioneersHero;
