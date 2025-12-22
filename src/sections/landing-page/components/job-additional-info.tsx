import { Divider, Stack, Typography } from '@mui/material';

import { IconPeopleGroupRed, IconTaskFillRed, IconMedalStar } from '../../../assets/icon-components';
import type { Job } from '../../../interfaces';
import JobSection from './job-section';

interface JobAdditionalInfoProps {
    job: Job;
}

const JobAdditionalInfo = ({ job }: JobAdditionalInfoProps) => {
    // Languages Content
    const languagesContent = (
        <Stack sx={{ gap: '16px', width: '100%' }}>
            {job.jobOpeningLanguages && job.jobOpeningLanguages.length > 0 && (
                <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant='body1'>Languages: </Typography>
                    <Typography variant='body1' fontWeight={700}>
                        {job.jobOpeningLanguages.map((lang: any, index: number) => (
                            <span key={index}>
                                {lang.language?.name || lang.name}
                                {lang.languageProficiency?.title && ` (${lang.languageProficiency.title})`}
                                {index < job.jobOpeningLanguages.length - 1 && ', '}
                            </span>
                        ))}
                    </Typography>
                </Stack>
            )}
        </Stack>
    );

    // Physical Capabilities Content
    const physicalCapabilitiesContent = (
        <Stack sx={{ gap: '16px', width: '100%' }}>
            {job.jobOpeningPhysicalCapabilities && job.jobOpeningPhysicalCapabilities.length > 0 && (
                <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant='body1'>Physical Capabilities: </Typography>
                    <Typography variant='body1' fontWeight={700}>
                        {job.jobOpeningPhysicalCapabilities.map((cap: any, index: number) => (
                            <span key={index}>
                                {cap.physicalCapability?.name || cap.name}
                                {index < job.jobOpeningPhysicalCapabilities.length - 1 && ', '}
                            </span>
                        ))}
                    </Typography>
                </Stack>
            )}
        </Stack>
    );

    // Specialized Practice Areas Content
    const practiceAreasContent = (
        <Stack sx={{ gap: '16px', width: '100%' }}>
            {job.jobOpeningSpecializedPracticeAreas && job.jobOpeningSpecializedPracticeAreas.length > 0 && (
                <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant='body1'>Specialized Practice Areas: </Typography>
                    <Typography variant='body1' fontWeight={700}>
                        {job.jobOpeningSpecializedPracticeAreas.map((area: any, index: number) => (
                            <span key={index}>
                                {area.specializedPracticeArea?.name || area.name}
                                {index < job.jobOpeningSpecializedPracticeAreas.length - 1 && ', '}
                            </span>
                        ))}
                    </Typography>
                </Stack>
            )}
        </Stack>
    );

    // Technical/Clinical Skills Content
    const skillsContent = (
        <Stack sx={{ gap: '16px', width: '100%' }}>
            {job.jobTechnicalClinicalSkills && job.jobTechnicalClinicalSkills.length > 0 && (
                <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant='body1'>Technical/Clinical Skills: </Typography>
                    <Typography variant='body1' fontWeight={700}>
                        {job.jobTechnicalClinicalSkills.map((skill: any, index: number) => (
                            <span key={index}>
                                {skill.name || skill}
                                {index < job.jobTechnicalClinicalSkills.length - 1 && ', '}
                            </span>
                        ))}
                    </Typography>
                </Stack>
            )}
        </Stack>
    );

    const hasLanguages = job.jobOpeningLanguages && job.jobOpeningLanguages.length > 0;
    const hasPhysicalCapabilities = job.jobOpeningPhysicalCapabilities && job.jobOpeningPhysicalCapabilities.length > 0;
    const hasPracticeAreas = job.jobOpeningSpecializedPracticeAreas && job.jobOpeningSpecializedPracticeAreas.length > 0;
    const hasSkills = job.jobTechnicalClinicalSkills && job.jobTechnicalClinicalSkills.length > 0;

    return (
        <Stack spacing={0}>
            {hasLanguages && (
                <>
                    <JobSection 
                        title='Languages' 
                        icon={<IconPeopleGroupRed />} 
                        content={languagesContent} 
                    />
                    {(hasPhysicalCapabilities || hasPracticeAreas || hasSkills) && <Divider sx={{ my: 3 }} />}
                </>
            )}

            {hasPhysicalCapabilities && (
                <>
                    <JobSection 
                        title='Physical Capabilities' 
                        icon={<IconTaskFillRed />} 
                        content={physicalCapabilitiesContent} 
                    />
                    {(hasPracticeAreas || hasSkills) && <Divider sx={{ my: 3 }} />}
                </>
            )}

            {hasPracticeAreas && (
                <>
                    <JobSection 
                        title='Specialized Practice Areas' 
                        icon={<IconMedalStar />} 
                        content={practiceAreasContent} 
                    />
                    {hasSkills && <Divider sx={{ my: 3 }} />}
                </>
            )}

            {hasSkills && (
                <JobSection 
                    title='Technical/Clinical Skills' 
                    icon={<IconTaskFillRed />} 
                    content={skillsContent} 
                />
            )}
        </Stack>
    );
};

export default JobAdditionalInfo;
