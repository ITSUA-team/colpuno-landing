import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import type { Job } from '../../../interfaces';

export type JobCardVariant = 'list' | 'preview';

type Props = {
    job: Job;
    facilityType?: string;
    location?: string;
    shifts?: string | null;
    startWindow?: string;
    variant?: JobCardVariant;
    onClick?: () => void;
    onPrimaryAction?: () => void;
    toneIndex?: number;
};

const formatSalary = (salary?: Job['salary']) => {
    if (!salary) return 'Competitive';
    const { salaryLower, salaryHigher, currency } = salary;
    const lower = salaryLower?.toLocaleString() ?? '';
    const higher = salaryHigher?.toLocaleString();
    const range = higher ? `${lower} - ${higher}` : lower;
    return `${currency.code} ${range}`;
};

const getDaysRemaining = (expirationDate?: string) => {
    if (!expirationDate) return undefined;
    const diffMs = new Date(expirationDate).getTime() - Date.now();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

const JobCard = ({
    job,
    facilityType,
    location,
    shifts,
    startWindow,
    variant = 'list',
    onClick,
    onPrimaryAction,
    toneIndex,
}: Props) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const daysLeft = getDaysRemaining(job.expirationDate);
    const resolvedLocation = location || job.region?.name || job.country?.name || 'Location TBD';
    const resolvedWorkplace = job.workplace || facilityType || 'Not specified';
    const isInternational = job.country?.name !== 'Philippines';
    const employerLogo = job.employer?.logo?.contentUrl;
    const agencyLogo = job.agency?.logo?.contentUrl;

    const bgTones = ['rgb(250, 231, 233)', 'rgb(232, 235, 246)', '#FFFFFF'];
    const cardBg = toneIndex !== undefined ? bgTones[toneIndex % bgTones.length] : '#FFFFFF';

    if (variant === 'preview') {
        return (
            <Card
                sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                    },
                }}
                onClick={onClick}
            >
                <CardContent>
                    <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 0.5 }}>
                        {job.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary' sx={{ mb: 0.5 }}>
                        {resolvedLocation}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ mb: 0.5 }}
                    >
                        {resolvedWorkplace}
                    </Typography>
                    <Typography variant='caption' color='primary.main' fontWeight={600}>
                        View details →
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card
            sx={{
                flex: { xs: '1 1 100%', md: '1 1 calc(50% - 8px)', lg: '1 1 calc(33.333% - 11px)' },
                cursor: 'pointer',
                position: 'relative',
                borderRadius: 4,
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'grey.200',
                backgroundColor: cardBg,
                p: 0,
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: 'primary.main',
                },
            }}
            onClick={onClick}
        >
            <CardContent sx={{ p: 3, display: 'flex', gap: 2 }}>
                <Stack spacing={2} sx={{ width: 60, flexShrink: 0, pt: 1 }}>
                    {employerLogo && (
                        <Box
                            component='img'
                            src={employerLogo}
                            alt={job.employer?.title}
                            sx={{ width: '100%', borderRadius: 1, aspectRatio: '1/1', objectFit: 'contain' }}
                        />
                    )}
                    {isInternational && agencyLogo && (
                        <Box
                            component='img'
                            src={agencyLogo}
                            alt={job.agency?.title}
                            sx={{ width: '100%', borderRadius: 1, aspectRatio: '1/1', objectFit: 'contain' }}
                        />
                    )}
                </Stack>
                <Box sx={{ flexGrow: 1 }}>
                    <Stack direction='row' justifyContent='space-between' alignItems='flex-start' sx={{ mb: 2 }}>
                    <Stack direction='row' spacing={1} flexWrap='wrap'>
                        {typeof daysLeft === 'number' && (
                            <Box
                                sx={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 999,
                                    bgcolor: daysLeft <= 7 ? 'error.50' : 'success.50',
                                    color: daysLeft <= 7 ? 'error.700' : 'success.700',
                                }}
                            >
                                {daysLeft > 30 ? 'Featured' : `${daysLeft} days left`}
                            </Box>
                        )}
                        {job.yearsOfExperience === 0 && (
                            <Box
                                sx={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 999,
                                    bgcolor: 'rgba(219,234,254,1)',
                                    color: 'rgba(37,99,235,1)',
                                }}
                            >
                                Fresh Grads Welcome
                            </Box>
                        )}
                    </Stack>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsBookmarked(prev => !prev);
                        }}
                        sx={{
                            minWidth: 'auto',
                            p: 1,
                            borderRadius: '999px',
                            color: isBookmarked ? 'primary.main' : 'text.secondary',
                            '&:hover': {
                                bgcolor: 'rgba(239,246,255,1)',
                            },
                        }}
                    >
                        <Box
                            component='svg'
                            sx={{ width: 20, height: 20 }}
                            viewBox='0 0 24 24'
                            fill={isBookmarked ? 'currentColor' : 'none'}
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
                            />
                        </Box>
                    </Button>
                </Stack>

                <Typography
                    component='h3'
                    variant='h6'
                    sx={{
                        fontWeight: 700,
                        mb: 0.75,
                        lineHeight: 1.2,
                        fontSize: 20,
                        color: 'grey.900',
                        transition: 'color 0.2s ease',
                        '.MuiCard-root:hover &': {
                            color: 'primary.main',
                        },
                    }}
                >
                    {job.title}
                </Typography>
                <Typography
                    variant='body2'
                    sx={{
                        fontWeight: 500,
                        color: 'text.secondary',
                        mb: 2,
                    }}
                >
                    {job.employer?.title}
                </Typography>

                <Stack spacing={1.0} sx={{ mb: 2.5 }}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <Box
                            component='svg'
                            sx={{ width: 16, height: 16, flexShrink: 0, color: 'text.secondary' }}
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                            />
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                            />
                        </Box>
                        <Typography variant='body2' color='text.secondary'>
                            {resolvedLocation}
                        </Typography>
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <Box
                            component='svg'
                            sx={{ width: 16, height: 16, flexShrink: 0, color: 'text.secondary' }}
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                            />
                        </Box>
                        <Typography variant='body2' color='text.secondary'>
                            {resolvedWorkplace}
                        </Typography>
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={1}>
                        <Box
                            component='svg'
                            sx={{ width: 16, height: 16, flexShrink: 0, color: 'success.main' }}
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </Box>
                        <Typography
                            variant='body2'
                            sx={{ fontWeight: 600, color: 'success.main' }}
                        >
                            {formatSalary(job.salary)} / month
                        </Typography>
                    </Stack>
                </Stack>

                <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{
                        mb: 3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.6,
                    }}
                >
                    {job.description}
                </Typography>

                <Stack direction='row' spacing={1.5}>
                    <Button
                        fullWidth
                        variant='outlined'
                        sx={{
                            borderWidth: 2,
                            borderColor: 'grey.300',
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 3,
                            color: 'grey.700',
                            '&:hover': {
                                borderColor: 'primary.main',
                                color: 'primary.main',
                            },
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick?.();
                        }}
                    >
                        View Details
                    </Button>
                    <Button
                        fullWidth
                        variant='contained'
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 3,
                            backgroundImage: 'linear-gradient(to right,#2563eb,#1d4ed8)',
                            '&:hover': {
                                backgroundImage: 'linear-gradient(to right,#1d4ed8,#1e40af)',
                                transform: 'scale(1.03)',
                            },
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            (onPrimaryAction || onClick)?.();
                        }}
                    >
                        Apply Now
                    </Button>
                </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default JobCard;

