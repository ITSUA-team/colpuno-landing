import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

export type CareerFeature = {
    title: string;
    description: string;
};

type Props = {
    items?: CareerFeature[];
    onRegisterClick?: (source: 'top' | 'bottom') => void;
};

const MOCK_CAREER_FEATURES: CareerFeature[] = [
    { title: '100% Career Support', description: 'Through tech-powered features.' },
    { title: '360° Career View', description: 'Know yourself. Find your job match.' },
    { title: '12+ Countries', description: 'Opening doors worldwide – from Asia to Europe and US.' },
    { title: '5000+ Verified Jobs', description: 'From DMW recruiters and local employers.' },
    { title: '1 Perfect Job Match', description: 'Just for you.' },
];

export default function CareerFeatures({ items = MOCK_CAREER_FEATURES, onRegisterClick }: Props) {
    const theme = useTheme();

    return (
        <Box component="section" sx={{ textAlign: 'center', py: { xs: 5, md: 8 } }}>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 3, md: 6 }} // больше gap между карточками
                sx={{
                    maxWidth: 720,
                    mx: 'auto',
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 3,
                    p: { xs: 3, md: 5 }, // увеличенный padding
                    border: 1,
                    borderColor: theme.palette.grey[200],
                    boxShadow: 3,
                    flexWrap: 'wrap',
                }}
            >
                {items.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            flex: '1 1 240px',
                            minWidth: 0,
                            textAlign: 'center',
                            p: { xs: 2, md: 3 },
                            borderBottom: { xs: 1, md: 0 },
                            borderColor: alpha(theme.palette.grey[200], 0.5),
                            '&:last-child': { borderBottom: 0 },
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="span"
                            sx={{
                                display: 'block',
                                fontWeight: 600,
                                color: theme.palette.primary.main,
                                lineHeight: 1.3,
                                wordBreak: 'break-word',
                            }}
                        >
                            {item.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            component="span"

                        >
                            {item.description}
                        </Typography>
                    </Box>
                ))}
            </Stack>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 6 } }}>
                <Button
                    variant="contained"
                    size="large"

                    onClick={() => onRegisterClick?.('bottom')}
                >
                    REGISTER NOW
                </Button>
            </Box>
        </Box>
    );
}
