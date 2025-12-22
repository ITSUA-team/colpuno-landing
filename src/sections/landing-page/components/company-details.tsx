import { Avatar, Card, Link, Stack, Typography } from '@mui/material';

import { IconExpSuitcase } from '../../../assets/icon-components';
import type { Job } from '../../../interfaces';

interface CompanyDetailsProps {
    job: Job;
}

const CompanyDetails = ({ job }: CompanyDetailsProps) => {
    const location = job.region?.name 
        ? `${job.country?.name}, ${job.region.name}`
        : job.country?.name || '';

    return (
        <Stack spacing={3}>
            {job.employer && (
                <Card
                    sx={{
                        p: 3,
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Stack direction='row' spacing={3} alignItems='center'>
                        <Avatar
                            alt={job.employer.title}
                            src={job.employer.logo?.contentUrl}
                            sx={{
                                width: 86,
                                height: 86,
                                backgroundColor: 'transparent',
                                borderRadius: '4px',
                                flexShrink: 0,
                            }}
                        >
                            {!job.employer.logo?.contentUrl && <IconExpSuitcase />}
                        </Avatar>
                        <Stack spacing={1} flex={1}>
                            <Typography variant='h6' fontWeight={700}>
                                {job.employer.title}
                            </Typography>
                            {location && (
                                <Typography variant='body1' color='text.secondary'>
                                    {location}
                                </Typography>
                            )}
                            {(job as any).employer?.url && (
                                <Link
                                    href={(job as any).employer.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    sx={{
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    {(job as any).employer.url}
                                </Link>
                            )}
                            {job.employer.dmwNumber && (
                                <Typography variant='body2' color='text.secondary'>
                                    DMW No.: {job.employer.dmwNumber}
                                </Typography>
                            )}
                        </Stack>
                    </Stack>
                </Card>
            )}

            {job.agency && (
                <Card
                    sx={{
                        p: 3,
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Stack spacing={2}>
                        <Typography variant='subtitle1' fontWeight={600}>
                            Agency Information
                        </Typography>
                        <Stack direction='row' spacing={3} alignItems='center'>
                            <Avatar
                                alt={job.agency.title}
                                src={job.agency.logo?.contentUrl}
                                sx={{
                                    width: 86,
                                    height: 86,
                                    backgroundColor: 'transparent',
                                    borderRadius: '4px',
                                    flexShrink: 0,
                                }}
                            >
                                {!job.agency.logo?.contentUrl && <IconExpSuitcase />}
                            </Avatar>
                            <Stack spacing={1} flex={1}>
                                <Typography variant='h6' fontWeight={700}>
                                    {job.agency.title}
                                </Typography>
                                {(job as any).agency?.url && (
                                    <Link
                                        href={(job as any).agency.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        sx={{
                                            color: 'primary.main',
                                            textDecoration: 'none',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        {(job as any).agency.url}
                                    </Link>
                                )}
                                {job.agency.dmwNumber && (
                                    <Typography variant='body2' color='text.secondary'>
                                        DMW No.: {job.agency.dmwNumber}
                                    </Typography>
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                </Card>
            )}
        </Stack>
    );
};

export default CompanyDetails;
