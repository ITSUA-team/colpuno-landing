import { Avatar, Box, Button, Stack, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

import type { Job } from '../../../interfaces';

type Props = {
    job: Job;
    index: number;
    onClick?: () => void;
    compact?: boolean;
};

const LandingJobsCard = ({ job, index, onClick, compact }: Props) => {
    const theme = useTheme();
    const bgTones = [
        theme.palette.secondary.lighter,
        theme.palette.primary.lighter,
        theme.palette.neutral[100],
    ];
    const bg = bgTones[index % bgTones.length];

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
                        alignItems: { xs: 'center', md: 'flex-start' },
                    }}
                >
                    <Avatar
                        alt={job.title}
                        src={job.employer?.logo?.contentUrl}
                        sx={{
                            width: { xs: compact ? 48 : 56, md: compact ? 56 : 64 },
                            height: { xs: compact ? 48 : 56, md: compact ? 56 : 64 },
                            backgroundColor: 'common.white',
                            borderRadius: 1,
                            fontWeight: 600,
                        }}
                    >
                        {(job.employer?.title || job.title || 'C')[0]}
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
                        {job.country?.name && (
                            <Stack direction='row' flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
                                <Typography 
                                    variant='body2' 
                                    sx={{ 
                                        width: { xs: compact ? 60 : 70, md: compact ? 80 : 96 },
                                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    }}
                                >
                                    Country
                                </Typography>
                                <Typography 
                                    variant='body2' 
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                >
                                    {job.country.name}
                                </Typography>
                            </Stack>
                        )}
                        {job.region?.name && (
                            <Stack direction='row' flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
                                <Typography 
                                    variant='body2' 
                                    sx={{ 
                                        color: 'text.secondary',
                                        width: { xs: compact ? 60 : 70, md: compact ? 80 : 96 },
                                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    }}
                                >
                                    Region
                                </Typography>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        textAlign: 'left',
                                        wordBreak: 'break-word',
                                        flex: 1,
                                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    }}
                                >
                                    {job.region.name}
                                </Typography>
                            </Stack>
                        )}
                        {job.salary && (
                            <Stack direction='row' flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
                                <Typography 
                                    variant='body2' 
                                    sx={{ 
                                        width: { xs: compact ? 60 : 70, md: compact ? 80 : 96 },
                                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    }}
                                >
                                    Salary range
                                </Typography>
                                <Stack direction='row' alignItems='center' spacing={0.5} flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
                                    {job.salary.currency?.code && (
                                        <Typography 
                                            variant='body2' 
                                            sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                        >
                                            {job.salary.currency.code}
                                        </Typography>
                                    )}
                                    <Typography 
                                        variant='body2' 
                                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                    >
                                        {job.salary.salaryLower > 0
                                            ? job.salary.salaryLower.toLocaleString()
                                            : 'N/A'}
                                    </Typography>
                                    <Typography 
                                        variant='body2' 
                                        sx={{ 
                                            mx: 0.5,
                                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                                        }}
                                    >
                                        –
                                    </Typography>
                                    <Typography 
                                        variant='body2' 
                                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                    >
                                        {job.salary.salaryHigher > 0
                                            ? job.salary.salaryHigher.toLocaleString()
                                            : 'N/A'}
                                    </Typography>
                                </Stack>
                            </Stack>
                        )}
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
                    </Stack>
                </Stack>

                <Stack 
                    sx={{ 
                        ml: { xs: 0, sm: 'auto' }, 
                        alignSelf: { xs: 'stretch', sm: 'center' },
                        width: { xs: '100%', sm: 'auto' },
                    }}
                >
                    <Button
                        variant='contained'
                        onClick={onClick}
                        sx={{
                            width: { xs: '100%', sm: 'auto' },
                        }}
                    >
                        View job details
                    </Button>
                </Stack>
            </Stack>
        </motion.div>
    );
};

export default LandingJobsCard;


