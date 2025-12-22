import { Stack, Typography } from '@mui/material';

import type { Job } from '../../../interfaces';

interface JobAdditionalBenefitsProps {
    job: Job;
}

const JobAdditionalBenefits = ({ job }: JobAdditionalBenefitsProps) => {
    if (!job.benefitsDescription) {
        return null;
    }

    return (
        <Stack sx={{ gap: '8px', width: '100%' }}>
            <Typography variant='body1' sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                {job.benefitsDescription}
            </Typography>
        </Stack>
    );
};

export default JobAdditionalBenefits;
