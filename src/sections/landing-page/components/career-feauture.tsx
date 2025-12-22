import { Box, Typography } from '@mui/material';
import CareerSupportImg from '../../../assets/stats.jpg';

type Props = {
    onRegisterClick?: (source: 'top' | 'bottom') => void;
};

export default function CareerFeatures({ onRegisterClick }: Props) {
    return (
        <Box component="section" sx={{ textAlign: 'center' }}>
            <Typography
                variant="h4"
                sx={{
                    fontSize: { xs: '24px', md: '32px' },
                    fontWeight: 700,
                    mb: 3,
                    textAlign: 'center',
                }}
            >
                Career Support Ecosystem
            </Typography>
            <Box
                sx={{
                    maxWidth: 720,
                    mx: 'auto',
                    px: { xs: 2, md: 0 },
                }}
            >
                <Box
                    component="img"
                    src={typeof CareerSupportImg === 'string' ? CareerSupportImg : (CareerSupportImg as any).src}
                    alt="Career Support Ecosystem"
                    sx={{
                        width: '100%',
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: 2,
                    }}
                />
            </Box>
        </Box>
    );
}
