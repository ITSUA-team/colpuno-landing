import { Avatar, Box, Button, Stack, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

import type { Job } from '../../../interfaces';
import IconJobImages from "../../../public/icon-job-images";

type Props = {
    job: Job;
    index: number;
    onClick?: () => void;
    compact?: boolean;
    // variant: 'full' — main jobs list, 'preview' — compact cards in hero section
    variant?: 'full' | 'preview';
};

const LandingJobsCard = ({ job, index, onClick, compact, variant = 'full' }: Props) => {
    const theme = useTheme();
    const bgTones = [
        theme.palette.secondary.lighter,
        theme.palette.primary.lighter,
        theme.palette.neutral[100],
    ];
    const bg =
        variant === 'preview'
            ? bgTones[index % bgTones.length]
            : theme.palette.common.white;

    // Module 2 — helper fields (role title, facility, location, optional shift, start window)
    const facilityType = job.facilityTypeExperience?.name || job.workplace || 'Not specified';
    const location =
        job.region?.name || job.country?.name || 'Location TBD';
    const shifts =
        job.jobShiftPatterns
            ?.map((sp: any) => sp.shiftPattern?.name)
            .filter(Boolean)
            .join(', ') || null;

    let startWindow: string | undefined = undefined;
    if (job.startDate) {
        const date = new Date(job.startDate);
        const now = new Date();
        const diffMonths =
            (date.getFullYear() - now.getFullYear()) * 12 +
            (date.getMonth() - now.getMonth());
        if (diffMonths <= 0) {
            startWindow = 'Immediate';
        } else if (diffMonths <= 1) {
            startWindow = 'This month';
        } else if (diffMonths <= 3) {
            startWindow = 'Within 3 months';
        }
    }

    return (
        <motion.div 
            initial={{ x: -40, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ type: 'spring', delay: index * 0.04 }}
            style={{ width: '100%' }}
        >
            <Stack
                sx={{
                    border: '1px solid',
                    borderColor: 'neutral.300',
                    borderRadius: '16px',
                    p: compact ? { xs: 1.5, md: 2 } : { xs: 2, md: 3 },
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: compact ? 2 : 2.5,
                    backgroundColor: bg,
                    height: '100%',
                    width: '100%',
                }}
            >
                <Stack 
                    sx={{ 
                        width: { xs: compact ? 48 : 56, md: compact ? 56 : 64 }, 
                        gap: compact ? { xs: 1, md: 1.5 } : { xs: 1.5, md: 2 }, 
                        flexDirection: { xs: 'row', md: 'column' },
                        alignItems: { xs: 'center'},
                    }}
                >
                    <Avatar
                        alt={job.title}
                        sx={{
                            width: { xs: compact ? 48 : 56, md: compact ? 56 : 64 },
                            height: { xs: compact ? 48 : 56, md: compact ? 56 : 64 },
                            bgcolor: 'transparent',
                        }}
                    >
                        <IconJobImages />
                    </Avatar>
                </Stack>

                <Stack sx={{ flex: 1, maxWidth: { md: compact ? 360 : 420 } }}>
                    <Stack sx={{ alignItems: 'flex-start', mb: compact ? 1.5 : 2 }}>
                        <Typography
                            variant='subtitle2'
                            sx={{
                                textAlign: 'left',
                                wordBreak: 'break-word',
                                mb: 0.5,
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            }}
                        >
                            {job.title}
                        </Typography>
                        <Typography
                            variant='body2'
                            sx={{ 
                                textAlign: 'left', 
                                wordBreak: 'break-word',
                                fontSize: { xs: '0.8125rem', md: '0.875rem' },
                            }}
                        >
                            {job.employer?.title}
                        </Typography>
                    </Stack>

                    <Stack spacing={0.5}>
                        {/* In preview variant карточки укороченные — без дат/сроков действия */}
                        {variant === 'full' && (
                            <>
                                <Stack direction='row' flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
                                    <Typography 
                                        variant='body2' 
                                        sx={{ 
                                            width: { xs: compact ? 60 : 70, md: compact ? 80 : 96 },
                                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                                        }}
                                    >
                                        Posted
                                    </Typography>
                                    <Typography 
                                        variant='body2' 
                                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                    >
                                        {dayjs(job.createdAt).format('MMM D, YYYY')}
                                    </Typography>
                                </Stack>
                                {job.expirationDate && (
                                    <Stack direction='row' flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
                                        <Typography 
                                            variant='body2' 
                                            sx={{ 
                                                color: 'text.secondary',
                                                width: { xs: compact ? 60 : 70, md: compact ? 80 : 96 },
                                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                                            }}
                                        >
                                            Expires
                                        </Typography>
                                        <Typography 
                                            variant='body2' 
                                            sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                        >
                                            {dayjs(job.expirationDate).format('MMM D, YYYY')}
                                        </Typography>
                                    </Stack>
                                )}
                            </>
                        )}
                        {/* Location (Module 2 — location) */}
                        {location && (
                            <Stack direction='row' flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
                                <Typography 
                                    variant='body2' 
                                    sx={{ 
                                        width: { xs: compact ? 60 : 70, md: compact ? 80 : 96 },
                                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    }}
                                >
                                    Location
                                </Typography>
                                <Typography 
                                    variant='body2' 
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                >
                                    {location}
                                </Typography>
                            </Stack>
                        )}
                        {/* Facility type */}
                        {facilityType && (
                            <Stack direction='row' flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
                                <Typography 
                                    variant='body2' 
                                    sx={{ 
                                        width: { xs: compact ? 60 : 70, md: compact ? 80 : 96 },
                                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    }}
                                >
                                    Facility
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                                        wordBreak: 'break-word',
                                    }}
                                >
                                    {facilityType}
                                </Typography>
                            </Stack>
                        )}
                        {/* Optional: Shift */}
                        {shifts && (
                            <Stack direction='row' flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
                                <Typography 
                                    variant='body2' 
                                    sx={{ 
                                        color: 'text.secondary',
                                        width: { xs: compact ? 60 : 70, md: compact ? 80 : 96 },
                                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    }}
                                >
                                    Shift
                                </Typography>
                                <Typography 
                                    variant='body2' 
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                >
                                    {shifts}
                                </Typography>
                            </Stack>
                        )}
                        {/* Employer / agency icons row */}
                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{ pt: 1 }}
                        >
                            <Stack direction="row" spacing={0.75} alignItems="center">
                                <Box
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: '50%',
                                        bgcolor: 'primary.main',
                                    }}
                                />
                                <Typography
                                    variant="caption"
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' } }}
                                >
                                    Company
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={0.75} alignItems="center">
                                <Box
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: '50%',
                                        bgcolor: 'secondary.main',
                                        opacity: job.agency ? 1 : 0.3,
                                    }}
                                />
                                <Typography
                                    variant="caption"
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' } }}
                                >
                                    Agency
                                </Typography>
                            </Stack>
                        </Stack>
                        {!!job.numberOfVacancies && (
                            <Stack direction='row' spacing={1} pt={1}>
                                <Typography 
                                    variant='body2'
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                >
                                    {job.numberOfVacancies} vacancies
                                </Typography>
                            </Stack>
                        )}
                        {/* Start window */}
                        {startWindow && (
                            <Stack direction='row' flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
                                <Typography 
                                    variant='body2' 
                                    sx={{ 
                                        color: 'text.secondary',
                                        width: { xs: compact ? 60 : 70, md: compact ? 80 : 96 },
                                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    }}
                                >
                                    Start
                                </Typography>
                                <Typography 
                                    variant='body2' 
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                >
                                    {startWindow}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                </Stack>

                <Stack 
                    sx={{ 
                        ml: { xs: 0, sm: 'auto' }, 
                        alignSelf: { xs: 'stretch', sm: 'center' },
                        width: { xs: '100%', sm: 'auto' },
                    }}
                >
                    {variant === 'preview' ? (
                        <Button
                            variant='contained'
                            onClick={onClick}
                            sx={{
                                width: { xs: '100%', sm: 'auto' },
                            }}
                        >
                            View job details
                        </Button>
                    ) : (
                        <Stack
                            direction='column'
                            spacing={1}
                            sx={{ width: { xs: '100%', sm: 220 } }}
                        >
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={onClick}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    width: '100%',
                                }}
                            >
                                Apply now
                            </Button>
                            <Button
                                variant='text'
                                color='primary'
                                onClick={onClick}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    width: '100%',
                                    justifyContent: 'center',
                                }}
                            >
                                View job details
                            </Button>
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </motion.div>
    );
};

export default LandingJobsCard;


