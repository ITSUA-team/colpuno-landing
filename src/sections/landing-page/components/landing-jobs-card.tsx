import { Avatar, Box, Button, Stack, Typography, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { motion } from 'framer-motion';

dayjs.extend(relativeTime);

import type { Job } from '../../../interfaces';
import IconJobImages from "../../../public/icon-job-images";

// Simple SVG icons for the card details
const IconWatch = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const IconBriefcase = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const IconStar = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

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
        // theme.palette.secondary.lighter,
        theme.palette.primary.lighter,
        // theme.palette.neutral[100],
    ];
    
    // Header background color
    const headerBg = bgTones[index % bgTones.length];

    const isInternational = job.country?.name !== 'Philippines';
    const employerLogo = job.employer?.logo?.contentUrl;
    const agencyLogo = job.agency?.logo?.contentUrl;

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
                    overflow: 'hidden', // Ensure header bg doesn't overflow
                    flexDirection: 'column',
                    backgroundColor: theme.palette.common.white,
                    height: '100%',
                    width: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[4],
                        borderColor: 'primary.main',
                    },
                }}
            >
                {/* Header Section with Colored Background */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={compact ? 2 : 2.5}
                    sx={{
                        p: compact ? { xs: 1.5, md: 2 } : { xs: 2, md: 3 },
                        backgroundColor: headerBg,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Stack 
                        sx={{ 
                            gap: compact ? { xs: 1, md: 1.5 } : { xs: 1.5, md: 2 }, 
                            flexDirection: 'row',
                            alignItems: 'center',
                            flexShrink: 0,
                        }}
                    >
                        {employerLogo ? (
                            <Box
                                component='img'
                                src={employerLogo}
                                alt={job.employer?.title}
                                sx={{
                                    width: { xs: compact ? 48 : 56, md: compact ? 56 : 64 },
                                    height: { xs: compact ? 48 : 56, md: compact ? 56 : 64 },
                                    borderRadius: 1,
                                    objectFit: 'contain',
                                    bgcolor: 'white',
                                }}
                            />
                        ) : (
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
                        )}

                        {isInternational && agencyLogo && (
                            <Box
                                component='img'
                                src={agencyLogo}
                                alt={job.agency?.title}
                                sx={{
                                    width: { xs: compact ? 48 : 56, md: compact ? 56 : 64 },
                                    height: { xs: compact ? 48 : 56, md: compact ? 56 : 64 },
                                    borderRadius: 1,
                                    objectFit: 'contain',
                                    bgcolor: 'white',
                                }}
                            />
                        )}
                    </Stack>

                    <Stack sx={{ flex: 1, alignItems: 'flex-start' }}>
                        <Typography
                            variant='subtitle2'
                            sx={{
                                textAlign: 'left',
                                wordBreak: 'break-word',
                                mb: 0.5,
                                fontSize: { xs: '0.875rem', md: '1rem' },
                                fontWeight: 700,
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
                                mb: 0.5,
                                fontWeight: 500,
                            }}
                        >
                            {(isInternational && job.agency?.title) ? job.agency.title : job.employer?.title}
                        </Typography>
                        <Typography
                            variant='body2'
                            sx={{ 
                                textAlign: 'left', 
                                wordBreak: 'break-word',
                                fontSize: { xs: '0.8125rem', md: '0.875rem' },
                                color: 'text.secondary',
                            }}
                        >
                            {location}
                        </Typography>
                    </Stack>
                </Stack>

                {/* Body Section with White Background */}
                <Stack 
                    sx={{ 
                        p: compact ? { xs: 1.5, md: 2 } : { xs: 2, md: 3 },
                        flex: 1,
                        justifyContent: 'space-between',
                    }}
                >
                    <Stack 
                        direction='row' 
                        flexWrap='wrap' 
                        gap={2} 
                        sx={{ mb: 3 }}
                    >
                        {/* Posted Date */}
                        <Stack direction='row' alignItems='center' spacing={1}>
                            <Box sx={{ color: 'text.secondary', display: 'flex' }}>
                                <IconWatch />
                            </Box>
                            <Typography variant='body2' sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                                Posted {dayjs(job.createdAt).fromNow()}
                            </Typography>
                        </Stack>

                        {/* Country / Location */}
                        <Stack direction='row' alignItems='center' spacing={1}>
                            <Box sx={{ color: 'text.secondary', display: 'flex' }}>
                                <IconBriefcase />
                            </Box>
                            <Typography variant='body2' sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                                {job.country?.name || 'Location not specified'}
                            </Typography>
                        </Stack>

                        {/* Experience */}
                        {job.yearsOfExperience !== undefined && (
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <Box sx={{ color: 'text.secondary', display: 'flex' }}>
                                    <IconStar />
                                </Box>
                                <Typography variant='body2' sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                                    {job.yearsOfExperience > 0 
                                        ? `${job.yearsOfExperience} year${job.yearsOfExperience > 1 ? 's' : ''} experience` 
                                        : 'No experience required'}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>

                    <Stack 
                        sx={{ 
                            width: '100%',
                            mt: 'auto',
                        }}
                    >
                        {variant === 'preview' ? (
                            <Button
                                variant='contained'
                                onClick={onClick}
                                fullWidth
                            >
                                View job details
                            </Button>
                        ) : (
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={1}
                                sx={{ width: '100%' }}
                            >
                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={onClick}
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        borderRadius: 3,
                                        flex: 1,
                                    }}
                                >
                                    Apply now
                                </Button>
                                <Button
                                    variant='outlined'
                                    color='primary'
                                    onClick={onClick}
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        borderRadius: 3,
                                        flex: 1,
                                    }}
                                >
                                    View details
                                </Button>
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </motion.div>
    );
};

export default LandingJobsCard;


