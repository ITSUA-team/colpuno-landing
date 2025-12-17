import { Box, LinearProgress, Stack, Typography } from '@mui/material';

function LandingProfileMotivator() {
    return (
        <Box>
            <Typography
                variant='h4'
                sx={{
                    fontSize: { xs: '24px', md: '32px' },
                    mb: 2,
                    textAlign: 'center',
                }}
            >
                A stronger profile = better matches
            </Typography>

            <Typography
                variant='body1'
                sx={{ mb: 4, textAlign: 'center', maxWidth: '700px', mx: 'auto' }}
            >
                Completing your profile helps employers review you faster and improves match accuracy.
            </Typography>

            <Stack spacing={2} sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}>
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Box
                        sx={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                        }}
                    />
                    <Typography variant='body1'>Better visibility to employers</Typography>
                </Stack>
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Box
                        sx={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                        }}
                    />
                    <Typography variant='body1'>More accurate matches</Typography>
                </Stack>
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Box
                        sx={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                        }}
                    />
                    <Typography variant='body1'>Faster employer review</Typography>
                </Stack>
            </Stack>

            <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
                <Stack spacing={1}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='body2'>Profile Completion</Typography>
                        <Typography variant='body2'>0% → 100%</Typography>
                    </Stack>
                    <LinearProgress variant='determinate' value={0} sx={{ height: 8, borderRadius: 1 }} />
                    <Typography
                        variant='caption'
                        sx={{ textAlign: 'center', fontStyle: 'italic' }}
                    >
                        A complete profile becomes matchable.
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
}

export default LandingProfileMotivator;
