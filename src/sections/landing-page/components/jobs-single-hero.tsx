import { Avatar, Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';

import { IconExpSuitcase, IconCalendar, IconPeopleGroup, IconLocationRed } from '../../../assets/icon-components';
import type { Job } from '../../../interfaces';

interface JobsSingleHeroProps {
    job: Job;
}

const JobsSingleHero = ({ job }: JobsSingleHeroProps) => {
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down(790));
    const xsDown = useMediaQuery(theme.breakpoints.down(700));

    return (
        <Stack
            sx={{
                backgroundColor: job?.importId ? 'neutral.200' : 'secondary.lighter',
                borderRadius: '16px',
                p: '24px',
                gap: '24px',
            }}
        >
            <Stack sx={{ flexDirection: mdDown ? 'column' : 'row', gap: '24px' }}>
                <Stack
                    sx={{
                        width: '86px',
                        gap: '16px',
                    }}
                >
                    {job?.agency && (
                        <Avatar
                            alt={job?.title}
                            src={job?.agency?.logo?.contentUrl}
                            sx={{
                                width: '86px',
                                height: '86px',
                                backgroundColor: 'transparent',
                                flexShrink: 0,
                                borderRadius: '4px',
                                img: { height: '86px' },
                                '& .MuiSvgIcon-root': {
                                    width: '86px',
                                    height: '86px',
                                },
                            }}
                        >
                            {!job?.agency?.logo?.contentUrl && <IconExpSuitcase />}
                        </Avatar>
                    )}
                    <Avatar
                        alt={job?.title}
                        src={job?.employer?.logo?.contentUrl}
                        sx={{
                            width: '86px',
                            height: '86px',
                            backgroundColor: 'transparent',
                            flexShrink: 0,
                            borderRadius: '4px',
                            img: { height: '86px' },
                            '& .MuiSvgIcon-root': {
                                width: '86px',
                                height: '86px',
                            },
                        }}
                    >
                        {!job?.employer?.logo?.contentUrl && <IconExpSuitcase />}
                    </Avatar>
                </Stack>
                <Stack
                    sx={{
                        maxWidth: '900px',
                        gap: '8px',
                        flexDirection: xsDown ? 'column' : 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <Stack sx={{ flexGrow: 1, gap: '8px' }}>
                        <Stack sx={{ alignItems: 'start', mb: '16px' }}>
                            <Typography variant='h4' sx={{ textAlign: 'left' }}>
                                {job?.title}
                            </Typography>
                            <Typography variant='body1' sx={{ color: 'text.disabled' }}>
                                {job?.employer?.title}
                            </Typography>
                        </Stack>
                        {job?.expirationDate && (
                            <Stack direction='row' gap='8px'>
                                <IconCalendar />
                                <Typography variant='body1'>Expires on:</Typography>
                                <Typography variant='body1'>
                                    {dayjs(job?.expirationDate).format('MMM D, YYYY')}
                                </Typography>
                            </Stack>
                        )}
                        {job?.country?.name && (
                            <Stack direction='row' gap='8px'>
                                <IconLocationRed />
                                <Typography variant='body1'>
                                    {job?.country?.name}
                                    {job?.region?.name && ', '}
                                    {job?.region?.name}
                                </Typography>
                            </Stack>
                        )}
                        {!!job?.numberOfVacancies && (
                            <Stack direction='row' gap='8px'>
                                <IconPeopleGroup />
                                <Typography variant='body1'>{job?.numberOfVacancies} vacancies</Typography>
                            </Stack>
                        )}
                        {job?.importId && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: '4px 8px',
                                    border: '1px solid',
                                    borderRadius: '16px',
                                    backgroundColor: 'common.white',
                                    borderColor: 'neutral.200',
                                    color: 'primary.main',
                                    fontSize: '12px',
                                    width: 'fit-content',
                                }}
                            >
                                Job sourced externally - info may change
                            </Box>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default JobsSingleHero;
