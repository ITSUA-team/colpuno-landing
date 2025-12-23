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
            </Grid>
        </Box>
    );
};

export default JobInfoHero;
