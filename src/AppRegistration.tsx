import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import MultiStepRegistrationForm from './components/multi-step-registration-form';
import LandingThemeProvider from './theme';

interface AppRegistrationProps {
    initialEmail?: string;
    embedded?: boolean;
    onClose?: () => void;
}

const AppRegistration = ({ initialEmail = '', embedded = true, onClose }: AppRegistrationProps) => {
    const [jobId, setJobId] = useState<string | undefined>();
    const [campaignId, setCampaignId] = useState<string | undefined>();
    const [landingPageId, setLandingPageId] = useState<string | undefined>();

    useEffect(() => {
        // Get hidden fields from URL params or sessionStorage
        const urlParams = new URLSearchParams(window.location.search);
        const sessionJobId = window.sessionStorage.getItem('pendingJobApplication');
        
        setJobId(urlParams.get('job_id') || sessionJobId || undefined);
        setCampaignId(urlParams.get('campaign_id') || urlParams.get('utm_campaign') || undefined);
        setLandingPageId(urlParams.get('landing_page_id') || urlParams.get('lp_id') || undefined);

        // Persist UTM parameters to sessionStorage for form submission
        const utmParams: Record<string, string> = {};
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
            const value = urlParams.get(key);
            if (value) {
                utmParams[key] = value;
            }
        });
        if (Object.keys(utmParams).length > 0) {
            sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
        }
    }, []);

    return (
        <LandingThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ height: '100%', width: '100%' }}>
                    <MultiStepRegistrationForm
                        initialEmail={initialEmail}
                        embedded={embedded}
                        jobId={jobId}
                        campaignId={campaignId}
                        landingPageId={landingPageId}
                        onClose={onClose}
                    />
                </Box>
            </LocalizationProvider>
        </LandingThemeProvider>
    );
};

export default AppRegistration;
