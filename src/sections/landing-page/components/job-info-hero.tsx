import { Avatar, Box, Button, CircularProgress, Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';

import { IconLocationRed, IconExpSuitcase } from '../../../assets/icon-components';
import IconCalendar from '../../../assets/icon-components/icon-calendar';
import type { Job } from '../../../interfaces';

interface JobInfoHeroProps {
    job: Job;
    onApply: () => void;
}

const JobInfoHero = ({ job, onApply }: JobInfoHeroProps) => {
    const theme = useTheme();
    const xsDown = useMediaQuery(theme.breakpoints.down(700));
    const mdDown = useMediaQuery(theme.breakpoints.down(790));

    const location = job.region?.name 
        ? `${job.country?.name}, ${job.region.name}`
        : job.country?.name || 'Location TBD';

    // Use fake demo values for visualization (always show progress)
    const baseJobFit = ((job.id || 1) % 40) + 45; // 45-85%
    const baseNurseFit = ((job.id || 1) % 35) + 50; // 50-85%
    const jobFit = (job.jobFit && job.jobFit > 0) ? job.jobFit : baseJobFit;
    const nurseFit = (job.nurseFit && job.nurseFit > 0) ? job.nurseFit : baseNurseFit;
    
    // Ensure values are in valid range
    const jobFitValue = Math.min(Math.max(jobFit, 0), 100);
    const nurseFitValue = Math.min(Math.max(nurseFit, 0), 100);

    return (
        <Box
            sx={{
                backgroundColor: 'primary.lighter',
                borderRadius: '16px',
                p: '24px',
            }}
        >
            <Grid container spacing={3} alignItems='center'>
                {/* Column 1: Logo */}
                <Grid item xs={12} sm={6} md={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: { xs: 'flex-start', md: 'center' },
                        }}
                    >
                        {job.employer?.logo?.contentUrl ? (
                            <Avatar
                                alt={job.employer.title}
                                src={job.employer.logo.contentUrl}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    backgroundColor: 'transparent',
                                    borderRadius: '4px',
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 80,
                                    height: 80,
                                }}
                            >
                                <IconExpSuitcase />
                            </Box>
                        )}
                    </Box>
                </Grid>

                {/* Column 2: Title and details */}
                <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={1.5}>
                        <Typography 
                            variant='h4' 
                            fontWeight={700}
                            sx={{ 
                                fontFamily: 'Magra, serif',
                                fontSize: { xs: '20px', md: '24px', lg: '28px' },
                                lineHeight: 1.2,
                            }}
                        >
                            {job.title}
                        </Typography>
                        {job.facilityTypeExperience && (
                            <Typography 
                                variant='body1' 
                                fontWeight={700}
                                sx={{ fontFamily: 'Open Sans, sans-serif' }}
                            >
                                {job.facilityTypeExperience.name}
                            </Typography>
                        )}
                        {job.expirationDate && (
                            <Stack direction='row' gap='8px' alignItems='center'>
                                <IconCalendar />
                                <Typography 
                                    variant='body2'
                                    sx={{ fontFamily: 'Open Sans, sans-serif' }}
                                >
                                    Expires on: <strong>{dayjs(job.expirationDate).format('MMM D, YYYY')}</strong>
                                </Typography>
                            </Stack>
                        )}
                        {location && (
                            <Stack direction='row' gap='8px' alignItems='center'>
                                <IconLocationRed />
                                <Typography 
                                    variant='body2'
                                    sx={{ fontFamily: 'Open Sans, sans-serif' }}
                                >
                                    {location}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                </Grid>

                {/* Column 3: Circular progress bars */}
                <Grid item xs={12} sm={6} md={3}>
                    <Stack 
                        spacing={2} 
                        justifyContent={{ xs: 'flex-start', md: 'center' }}
                        alignItems='center'
                    >
                        <Stack alignItems='center' spacing={0.5}>
                            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                <Box sx={{ position: 'relative', width: 80, height: 80 }}>
                                    <svg width={80} height={80} style={{ transform: 'rotate(-90deg)' }}>
                                        <defs>
                                            <linearGradient id={`jobFit-gradient-${job.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#CE1127" />
                                                <stop offset="100%" stopColor="#173AA8" />
                                            </linearGradient>
                                        </defs>
                                        {/* Background circle */}
                                        <circle
                                            cx={40}
                                            cy={40}
                                            r={34}
                                            fill="none"
                                            stroke="rgba(0, 0, 0, 0.1)"
                                            strokeWidth={8}
                                        />
                                        {/* Progress circle */}
                                        <circle
                                            cx={40}
                                            cy={40}
                                            r={34}
                                            fill="none"
                                            stroke={`url(#jobFit-gradient-${job.id})`}
                                            strokeWidth={8}
                                            strokeLinecap="round"
                                            strokeDasharray={`${2 * Math.PI * 34}`}
                                            strokeDashoffset={`${2 * Math.PI * 34 * (1 - jobFitValue / 100)}`}
                                        />
                                    </svg>
                                </Box>
                                <Box
                                    sx={{
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        fontWeight={700}
                                        sx={{ fontFamily: 'Open Sans, sans-serif' }}
                                    >
                                        {jobFitValue}%
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography 
                                variant='caption' 
                                fontWeight={600}
                                sx={{ fontFamily: 'Open Sans, sans-serif' }}
                            >
                                JobFit
                            </Typography>
                        </Stack>
                        <Stack alignItems='center' spacing={0.5}>
                            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                <Box sx={{ position: 'relative', width: 80, height: 80 }}>
                                    <svg width={80} height={80} style={{ transform: 'rotate(-90deg)' }}>
                                        <defs>
                                            <linearGradient id={`nurseFit-gradient-${job.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#CE1127" />
                                                <stop offset="100%" stopColor="#173AA8" />
                                            </linearGradient>
                                        </defs>
                                        {/* Background circle */}
                                        <circle
                                            cx={40}
                                            cy={40}
                                            r={34}
                                            fill="none"
                                            stroke="rgba(0, 0, 0, 0.1)"
                                            strokeWidth={8}
                                        />
                                        {/* Progress circle */}
                                        <circle
                                            cx={40}
                                            cy={40}
                                            r={34}
                                            fill="none"
                                            stroke={`url(#nurseFit-gradient-${job.id})`}
                                            strokeWidth={8}
                                            strokeLinecap="round"
                                            strokeDasharray={`${2 * Math.PI * 34}`}
                                            strokeDashoffset={`${2 * Math.PI * 34 * (1 - nurseFitValue / 100)}`}
                                        />
                                    </svg>
                                </Box>
                                <Box
                                    sx={{
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography
                                        variant='body2'
                                        component='div'
                                        fontWeight={700}
                                        sx={{ fontFamily: 'Open Sans, sans-serif' }}
                                    >
                                        {nurseFitValue}%
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography 
                                variant='caption' 
                                fontWeight={600}
                                sx={{ fontFamily: 'Open Sans, sans-serif' }}
                            >
                                NurseFit
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>

                {/* Column 4: Apply button */}
                <Grid item xs={12} sm={6} md={3}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'flex-start', md: 'flex-end' },
                        }}
                    >
                        <Button
                            variant='contained'
                            onClick={onApply}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: 999,
                                px: 3,
                                py: 1.5,
                                fontFamily: 'Open Sans, sans-serif',
                                ...(mdDown ? { width: '100%' } : {}),
                            }}
                        >
                            Apply for job
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default JobInfoHero;
