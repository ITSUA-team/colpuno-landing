const API_BASE_URL = 'https://app.colpuno.com/api';

interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            let errorMessage = response.statusText || 'Unknown error';
            
            try {
                const errorData = await response.json();
                if (typeof errorData === 'string') {
                    errorMessage = errorData;
                } else if (errorData?.message) {
                    errorMessage = errorData.message;
                } else if (errorData?.error) {
                    errorMessage = typeof errorData.error === 'string' 
                        ? errorData.error 
                        : errorData.error?.message || errorMessage;
                } else if (errorData?.detail) {
                    errorMessage = errorData.detail;
                } else if (Array.isArray(errorData?.violations)) {
                    const violations = errorData.violations
                        .map((v: { propertyPath?: string; message?: string }) => 
                            v.propertyPath && v.message 
                                ? `${v.propertyPath}: ${v.message}` 
                                : v.message || ''
                        )
                        .filter(Boolean)
                        .join(', ');
                    errorMessage = violations || errorMessage;
                } else if (errorData?.hydra?.description) {
                    errorMessage = errorData.hydra.description;
                }
            } catch {
                try {
                    const errorText = await response.text();
                    if (errorText) {
                        errorMessage = errorText;
                    }
                } catch {
                }
            }
            
            return {
                error: errorMessage,
            };
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            return {
                error: 'Unable to connect to the server. Please check your internet connection and try again.',
            };
        }
        return {
            error: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.',
        };
    }
}

export interface NurseRegistrationData {
    lookingForJob?: string;
    nursingStatus?: string;
    experienceYears?: string;
    workedSpecialties?: string[];
    currentLocationCountry?: string;
    currentLocationRegion?: string;
    preferredWorkLocation?: string[];
    preferredCountries?: string[];
    preferredCountriesOther?: string[];
    desiredSpecialties?: string[];
    firstName: string;
    lastName: string;
    birthDate?: string;
    email: string;
    password?: string;
    phone: string;
    termsAccepted?: boolean;
    sourcingCenter?: string;
    [key: string]: unknown;
}

export async function registerNurse(
    nurseData: NurseRegistrationData
): Promise<ApiResponse<unknown>> {
    return apiFetch<unknown>('/onboard/nurse', {
        method: 'POST',
        body: JSON.stringify(nurseData),
    });
}

export async function getJobs(): Promise<ApiResponse<unknown[]>> {
    return apiFetch<unknown[]>('/jobs');
}

export async function getOnboardData(
    type: 'countries' | 'regions' | 'specialties',
    subtype?: string
): Promise<ApiResponse<unknown[]>> {
    const params = new URLSearchParams({ type });
    if (subtype) {
        params.append('subtype', subtype);
    }
    return apiFetch<unknown[]>(`/onboard/data?${params.toString()}`);
}

export interface KPIPoint {
    type: string;
    page?: string;
    data?: string;
    session_id?: string;
    [key: string]: unknown;
}

export async function sendKPIPoint(kpiData: KPIPoint): Promise<ApiResponse<unknown>> {
    return apiFetch<unknown>('/kpi/point', {
        method: 'POST',
        body: JSON.stringify(kpiData),
    });
}

export function generateSessionId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function getSessionId(): string {
    if (typeof window === 'undefined') {
        return generateSessionId();
    }

    const stored = sessionStorage.getItem('colpuno_session_id');
    if (stored) {
        return stored;
    }

    const newId = generateSessionId();
    sessionStorage.setItem('colpuno_session_id', newId);
    return newId;
}

