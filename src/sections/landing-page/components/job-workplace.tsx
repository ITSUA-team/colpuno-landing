import { Divider, Stack, Typography } from '@mui/material';

import { IconHospitalRed, IconExpSuitcaseRed } from '../../../assets/icon-components';
import type { Job } from '../../../interfaces';
import JobSection from './job-section';

interface JobWorkplaceProps {
    job: Job;
}

const JobWorkplace = ({ job }: JobWorkplaceProps) => {
    // Worksite & Environment Content
    const worksiteContent = (
        <Stack sx={{ gap: '16px', width: '100%' }}>
            {job.workplace && (
                <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                    <Typography variant='body1'>Worksite: </Typography>
                    <Typography variant='body1' fontWeight={700}>
                        {job.workplace}
                    </Typography>
                </Stack>
            )}

            {job.internationalWorkEnvironment && (
                <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                    <Typography variant='body1'>Work environment: </Typography>
                    <Typography variant='body1' fontWeight={700}>
                        {job.internationalWorkEnvironment}
                    </Typography>
                </Stack>
            )}
        </Stack>
    );

    // Accommodation & Conditions Content
    const accommodationContent = (
        <Stack sx={{ gap: '16px', width: '100%' }}>
            {job.accommodationCapability !== undefined && (
                <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                    <Typography variant='body1'>Accommodation: </Typography>
                    <Typography variant='body1' fontWeight={700}>
                        {job.accommodationCapability ? 'Available' : 'Not available'}
                    </Typography>
                </Stack>
            )}

            {job.workloadIntensity && (
                <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                    <Typography variant='body1'>Workload intensity: </Typography>
                    <Typography variant='body1' fontWeight={700}>
                        {job.workloadIntensity}
                    </Typography>
                </Stack>
            )}

            {job.genderPreference && job.genderPreference !== 'Any' && (
                <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                    <Typography variant='body1'>Gender preference: </Typography>
                    <Typography variant='body1' fontWeight={700}>
                        {job.genderPreference}
                    </Typography>
                </Stack>
            )}
        </Stack>
    );

    const hasWorksite = job.workplace || job.internationalWorkEnvironment;
    const hasAccommodation = job.accommodationCapability !== undefined || job.workloadIntensity || (job.genderPreference && job.genderPreference !== 'Any');

    // If no data available, show a message
    if (!hasWorksite && !hasAccommodation) {
        return (
            <Stack sx={{ p: 3, alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
                <Typography variant='body1' color='text.secondary'>
                    No workplace information available for this job.
                </Typography>
            </Stack>
        );
    }

    return (
        <Stack spacing={0}>
            {hasWorksite && (
                <>
                    <JobSection 
                        title='Worksite & Environment' 
                        icon={<IconHospitalRed />} 
                        content={worksiteContent} 
                    />
                    {hasAccommodation && <Divider sx={{ my: 3 }} />}
                </>
            )}
            
            {hasAccommodation && (
                <JobSection 
                    title='Accommodation & Conditions' 
                    icon={<IconExpSuitcaseRed />} 
                    content={accommodationContent} 
                />
            )}
        </Stack>
    );
};

export default JobWorkplace;
