import { Box } from '@mui/material';
import HeroBrainhubImg from '../../../public/hero-brainhub.png';

interface BrainhubHeroProps {
    onStartOnboarding?: (trigger: string) => void;
}

function BrainhubHero({ onStartOnboarding }: BrainhubHeroProps) {
    const imageSrc = typeof HeroBrainhubImg === 'string' ? HeroBrainhubImg : (HeroBrainhubImg as any).src;
    
    return (
        <Box
            id="home"
            sx={{
                width: '100vw',
                position: 'relative',
                left: '50%',
                right: '50%',
                marginLeft: '-50vw',
                marginRight: '-50vw',
                overflow: 'hidden',
            }}
        >
            {/* Blur background */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '-20px',
                    left: '-20px',
                    right: '-20px',
                    bottom: '-20px',
                    backgroundImage: `url(${imageSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(20px) grayscale(0.6)',
                    opacity: 0.3,
                    zIndex: -1,
                }}
            />
            
            {/* White blur overlay */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
            />
            
            {/* Main image */}
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    aspectRatio: '1000 / 625',
                    zIndex: 2,
                }}
            >
                <Box
                    component="img"
                    src={imageSrc}
                    alt="Nurses working in modern healthcare facility"
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        objectFit: 'contain',
                    }}
                />
            </Box>
        </Box>
    );
}

export default BrainhubHero;

