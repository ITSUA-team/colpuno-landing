import { Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useMediaQuery, useTheme } from '@mui/material';

import { IconCalendarTick, IconHospitalRed } from '../../../assets/icon-components';
import type { Job } from '../../../interfaces';

interface JobDescriptionProps {
    job: Job;
}

const JobDescription = ({ job }: JobDescriptionProps) => {
    const theme = useTheme();
    const xsDown = useMediaQuery(theme.breakpoints.down(450));

    const cleanDescription = (desc?: string) => {
        if (!desc) return 'Job details available after registration.';
        const parts = desc.split(/CONTACT PERSONS/i);
        return parts[0].trim();
    };

    const description = cleanDescription(job.description);
    const jobTypeLabel = job.jobType 
        ? job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1).replace('-', ' ')
        : '';

    const hasJobDetails = job.startDate || job.facilityTypeExperience || job.workplace || job.numberOfVacancies || job.jobType;
    const hasEmployerAgency = job.employer?.title || job.agency;
    const hasDMW = job.employer?.dmwNumber || job.dmwNumber || job.agency?.dmwNumber;

    return (
        <Stack sx={{ gap: '20px', width: '100%' }}>
            {/* Description */}
            <Typography
                variant='body1'
                sx={{ width: { xs: '100%', md: '90%' }, whiteSpace: 'pre-line', wordBreak: 'break-word' }}
            >
                {description}
            </Typography>

            {/* Job Details Group */}
            {hasJobDetails && (
                <>
                    <Divider />
                    <Stack sx={{ gap: '12px', width: '100%' }}>
                        {job.jobType && (
                            <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                                <Typography variant='body1'>Job type: </Typography>
                                <Typography variant='body1' fontWeight={700}>
                                    {jobTypeLabel}
                                </Typography>
                            </Stack>
                        )}
                        {job.startDate && (
                            <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                                <IconCalendarTick />
                                <Stack sx={{ width: '100%', flexDirection: 'row', gap: '4px', alignItems: 'center' }}>
                                    <Typography variant='body1'>Start date: </Typography>
                                    <Typography variant='body1' fontWeight={700}>
                                        {dayjs(job.startDate).format('MMM D, YYYY')}
                                    </Typography>
                                </Stack>
                            </Stack>
                        )}
                        {job.facilityTypeExperience && (
                            <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                                <IconHospitalRed />
                                <Typography variant='body1' fontWeight={700}>
                                    {job.facilityTypeExperience?.name || null}
                                </Typography>
                            </Stack>
                        )}
                        {job.workplace && (
                            <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                                <Typography variant='body1'>Worksite: </Typography>
                                <Typography variant='body1' fontWeight={700}>
                                    {job.workplace}
                                </Typography>
                            </Stack>
                        )}
                        {job.numberOfVacancies && (
                            <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                                <Typography variant='body1'>Number of vacancies: </Typography>
                                <Typography variant='body1' fontWeight={700}>
                                    {job.numberOfVacancies}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                </>
            )}

            {/* Employer & Agency Group */}
            {hasEmployerAgency && (
                <>
                    <Divider />
                    <Stack sx={{ gap: '12px', width: '100%' }}>
                        {job.employer?.title && (
                            <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                                <Typography variant='body1'>Employer: </Typography>
                                <Typography variant='body1' fontWeight={700}>
                                    {job.employer.title}
                                </Typography>
                            </Stack>
                        )}
                        {job.agency && (
                            <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Typography variant='body1'>Agency: </Typography>
                                <Typography variant='body1' fontWeight={700}>
                                    {job.agency?.title}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                </>
            )}

            {/* DMW Information Group */}
            {hasDMW && (
                <>
                    <Divider />
                    <Stack sx={{ gap: '12px', width: '100%' }}>
                        {job.employer?.dmwNumber && (
                            <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                                <Typography variant='body1'>Employer DMW No.: </Typography>
                                <Typography variant='body1' fontWeight={700}>
                                    {job.employer.dmwNumber}
                                </Typography>
                            </Stack>
                        )}
                        {job.agency?.dmwNumber && (
                            <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                                <Typography variant='body1'>Agency DMW No.: </Typography>
                                <Typography variant='body1' fontWeight={700}>
                                    {job.agency.dmwNumber}
                                </Typography>
                            </Stack>
                        )}
                        {job.dmwNumber && (
                            <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                                <Typography variant='body1'>Job order number: </Typography>
                                <Typography variant='body1' fontWeight={700}>
                                    {job.dmwNumber}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                </>
            )}
        </Stack>
    );
};

export default JobDescription;
