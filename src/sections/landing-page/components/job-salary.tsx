import { Stack, Typography } from '@mui/material';

import type { Job } from '../../../interfaces';

interface JobSalaryProps {
    jobOffer: Job;
}

const JobSalary = ({ jobOffer }: JobSalaryProps) => {
    const job = jobOffer;

    return (
        <Stack
            sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                gap: '12px',
                justifyContent: 'space-between',
                alignItems: { xs: 'center', md: 'flex-start' },
            }}
        >
            <Stack sx={{ gap: '8px', width: '100%' }}>
                {(job.salary?.salaryLower && job.salary.salaryLower > 0) || (job.salary?.salaryHigher && job.salary.salaryHigher > 0) ? (
                    <>
                        <Stack sx={{ flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap' }}>
                            {job.salary?.currency?.code && (
                                <Typography variant='subtitle1' fontWeight={700} sx={{ mr: '5px' }}>
                                    {job.salary?.currency?.code}
                                </Typography>
                            )}
                            <Typography variant='subtitle1' fontWeight={700}>
                                {job.salary?.salaryLower && job.salary.salaryLower > 0 ? job.salary.salaryLower.toLocaleString() : 'N/A'}
                            </Typography>
                            <Typography variant='subtitle1' fontWeight={700} sx={{ m: '0 5px' }}>
                                {' '}
                                -{' '}
                            </Typography>
                            {job.salary?.currency?.code && (
                                <Typography variant='subtitle1' fontWeight={700} sx={{ mr: '5px' }}>
                                    {job.salary?.currency?.code}
                                </Typography>
                            )}
                            <Typography variant='subtitle1' fontWeight={700}>
                                {job.salary?.salaryHigher && job.salary.salaryHigher > 0 ? job.salary.salaryHigher.toLocaleString() : 'N/A'}
                            </Typography>
                            {job.salary?.salaryPeriod && (
                                <Typography variant='subtitle1' fontWeight={700} sx={{ ml: '5px', textTransform: 'capitalize' }}>
                                    {job.salary?.salaryPeriod}
                                </Typography>
                            )}
                        </Stack>
                    </>
                ) : (
                    <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                        Salary information not available
                    </Typography>
                )}
                {job?.jobBenefits && job?.jobBenefits?.length > 0 && (
                    <Stack sx={{ gap: '8px', mt: 1 }}>
                        <Typography variant='body1' sx={{ color: 'text.disabled' }}>
                            Benefits available
                        </Typography>
                        <Typography variant='body1' sx={{ color: 'text.primary', fontWeight: 700 }}>
                            {job?.jobBenefits.map((item: any, index: number) => (
                                <span key={index}>
                                    {item.benefitPriority?.name || item.name || item}
                                    {job?.jobBenefits && index < job.jobBenefits.length - 1 && ' • '}
                                </span>
                            ))}
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};

export default JobSalary;
