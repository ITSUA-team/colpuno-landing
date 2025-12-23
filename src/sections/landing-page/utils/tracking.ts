import mixpanel from 'mixpanel-browser';

import { sendKPIPoint, getSessionId } from '../../../services/api.service';

declare global {
    interface Window { 
        gtag?(...args: unknown[]): void;
    }
}

let isMixpanelInitialized = false;

const initMixpanel = () => {
    if (isMixpanelInitialized) return;
    if (typeof window === 'undefined') return;

    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const mixpanelToken = isLocalhost
        ? '11955f3dcf8d2d4bb0ffca64e1e7c288' // dev/localhost
        : '3864adab461bca7ac6860f25e7dba29a'; // prod

    mixpanel.init(mixpanelToken, {
        autocapture: true,
        record_sessions_percent: 100,
        api_host: 'https://api-eu.mixpanel.com',
    });

    isMixpanelInitialized = true;
};

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
    }

    if (typeof window !== 'undefined') {
        initMixpanel();
        mixpanel.track(eventName, params as Record<string, unknown> | undefined);
    }
};

export const trackRegStarted = (email?: string) => {
    trackEvent('reg_started', { email });
};

export const trackRegCompleted = (email?: string) => {
    trackEvent('reg_completed', { email });
};

export const trackJobView = (jobId: string | number) => {
    trackEvent('job_view', { job_id: jobId });
};

export const trackApplicationCreated = (jobId: string | number) => {
    trackEvent('application_created', { job_id: jobId });
};

export const trackLpView = () => {
    trackEvent('lp_view', {});
};

export const trackOnboardingStarted = (source: 'cta' | 'apply', jobId?: string | number) => {
    trackEvent('onboarding_started', { source, job_id: jobId });
};

export const trackOnboardingStepCompleted = (stepName: string) => {
    trackEvent('onboarding_step_completed', { step_name: stepName });
};

export const trackOnboardingFinished = () => {
    trackEvent('onboarding_finished', {});
};

export const trackEmailVerificationSent = () => {
    trackEvent('email_verification_sent', {});
};

export const trackEmailVerified = () => {
    trackEvent('email_verified', {});
};

export const trackCtaUnlockJobsClicked = () => {
    trackEvent('cta_unlock_jobs_clicked', {});
};

export const trackJobModalOpened = (jobId: string | number) => {
    trackEvent('job_modal_opened', { job_id: jobId });
};

export const trackApplyClicked = (jobId: string | number) => {
    trackEvent('apply_clicked', { job_id: jobId });
};

export const trackConfirmApplicationOpened = (jobId: string | number) => {
    trackEvent('confirm_application_opened', { job_id: jobId });
};

export const trackKPIPoint = async (
    type: string,
    page?: string,
    data?: string
): Promise<void> => {
    try {
        const sessionId = getSessionId();
        await sendKPIPoint({
            type,
            page,
            data,
            session_id: sessionId,
        });
    } catch (error) {
    }
};

export const trackPageVisit = (page: string, data?: string) => {
    trackKPIPoint('VISIT', page, data);
};
