import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs, { type Dayjs } from 'dayjs';
import IconVisibility from '../assets/icon-components/icon-visibility';
import IconVisibilityOff from '../assets/icon-components/icon-visibility-off';
import IconCheckCircle from '../assets/icon-components/icon-check-circle';
import IconCrossSmall from '../assets/icon-components/icon-cross-small';

import {
    getOnboardData,
    registerNurse,
    type NurseRegistrationData,
} from '../services/api.service';
import {
    trackOnboardingStarted,
    trackOnboardingStepCompleted,
    trackRegCompleted,
    trackOnboardingFinished,
} from '../sections/landing-page/utils/tracking';

interface MultiStepRegistrationFormProps {
    initialEmail?: string;
    embedded?: boolean;
    jobId?: string;
    campaignId?: string;
    landingPageId?: string;
    onClose?: () => void;
}

interface RegistrationFormData {
    // Step 1 - Account
    email: string;
    password: string;
    confirmPassword: string;
    // Step 2 - Personal
    firstName: string;
    lastName: string;
    // Step 3 - Job Search
    jobSearchStatus: string;
    // Step 4 - Nursing Status
    nursingStatus: string;
    // Step 5 - Location
    country: string;
    currentLocationRegion: string;
    isFilipino: boolean;
    // Step 6 - Contact & Terms
    mobile: string;
    birthDate: Dayjs | null;
    agreedToTerms: boolean;
    
    // Hidden / Defaults for API compatibility
    yearsOfExperience: string;
    preferredDestination: string[];
    jobStartTimeline: string;
    
    // Legacy/Unused but kept for type compatibility if needed temporarily
    emailVerified: boolean;
    journeyStage: string;
    province: string;
    city: string;
    optInViber: boolean;
    optInWhatsApp: boolean;
    optInMessenger: boolean;
}

// CONFIGURATION: 6 STEPS
const FORM_STEPS = [
    { id: 'S1', name: 'Account', label: 'Create your account', question: 'Create your account', screenId: 'REG_S1_ACCOUNT' },
    { id: 'S2', name: 'Personal', label: 'About you', question: "What's your name?", screenId: 'REG_S2_PERSONAL' },
    { id: 'S3', name: 'JobSearch', label: 'Job search', question: 'Are you currently looking for a new job?', screenId: 'REG_S3_JOB_SEARCH' },
    { id: 'S4', name: 'NursingStatus', label: 'Nursing status', question: 'What is your current nursing status?', screenId: 'REG_S4_NURSING_STATUS' },
    { id: 'S5', name: 'Location', label: 'Location', question: 'Where are you currently living?', screenId: 'REG_S5_LOCATION' },
    { id: 'S6', name: 'Contact', label: 'Contact', question: "Let's stay in touch", screenId: 'REG_S6_CONTACT' },
];

function MultiStepRegistrationForm({
    initialEmail = '',
    embedded = false,
    jobId,
    campaignId,
    landingPageId,
    onClose,
}: MultiStepRegistrationFormProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<RegistrationFormData>({
        email: initialEmail,
        password: '',
        confirmPassword: '',
        country: '', // Changed back to empty string to force selection
        isFilipino: false,
        firstName: '',
        lastName: '',
        jobSearchStatus: '',
        nursingStatus: '',
        country: '',
        currentLocationRegion: '',
        isFilipino: false,
        mobile: '',
        birthDate: null,
        mobile: '',
        nursingStatus: '',
        jobSearchStatus: '',
        agreedToTerms: false,
        
        // Hidden / Defaults for API compatibility
        yearsOfExperience: '',
        preferredDestination: [],
        jobStartTimeline: '',
        
        // Legacy/Unused
        emailVerified: false,
        journeyStage: '',
        province: '',
        city: '',
        optInViber: false,
        optInWhatsApp: false,
        optInMessenger: false,
    });
    const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [provinces, setProvinces] = useState<Array<{ id: string; name: string }>>([]);
    const [cities, setCities] = useState<Array<{ id: string; name: string }>>([]);
    const [regions, setRegions] = useState<Array<{ id: string; name: string }>>([]);
    const [otherCountries, setOtherCountries] = useState<Array<{ id: string; name: string; code?: string }>>([]);
    const [countries, setCountries] = useState<Array<{ id: string; name: string; code?: string }>>([]);
    const [loadingRegions, setLoadingRegions] = useState(false);

    // Static fallback list of Philippines provinces
    const PH_PROVINCES = [
        { id: 'metro-manila', name: 'Metro Manila' },
        { id: 'abra', name: 'Abra' },
        { id: 'agusan-del-norte', name: 'Agusan del Norte' },
        { id: 'agusan-del-sur', name: 'Agusan del Sur' },
        { id: 'aklan', name: 'Aklan' },
        { id: 'albay', name: 'Albay' },
        { id: 'antique', name: 'Antique' },
        { id: 'apayao', name: 'Apayao' },
        { id: 'aurora', name: 'Aurora' },
        { id: 'basilan', name: 'Basilan' },
        { id: 'bataan', name: 'Bataan' },
        { id: 'batanes', name: 'Batanes' },
        { id: 'batangas', name: 'Batangas' },
        { id: 'benguet', name: 'Benguet' },
        { id: 'biliran', name: 'Biliran' },
        { id: 'bohol', name: 'Bohol' },
        { id: 'bukidnon', name: 'Bukidnon' },
        { id: 'bulacan', name: 'Bulacan' },
        { id: 'cagayan', name: 'Cagayan' },
        { id: 'camarines-norte', name: 'Camarines Norte' },
        { id: 'camarines-sur', name: 'Camarines Sur' },
        { id: 'camiguin', name: 'Camiguin' },
        { id: 'capiz', name: 'Capiz' },
        { id: 'catanduanes', name: 'Catanduanes' },
        { id: 'cavite', name: 'Cavite' },
        { id: 'cebu', name: 'Cebu' },
        { id: 'compostela-valley', name: 'Compostela Valley' },
        { id: 'cotabato', name: 'Cotabato' },
        { id: 'davao-del-norte', name: 'Davao del Norte' },
        { id: 'davao-del-sur', name: 'Davao del Sur' },
        { id: 'davao-occidental', name: 'Davao Occidental' },
        { id: 'davao-oriental', name: 'Davao Oriental' },
        { id: 'dinagat-islands', name: 'Dinagat Islands' },
        { id: 'eastern-samar', name: 'Eastern Samar' },
        { id: 'guimaras', name: 'Guimaras' },
        { id: 'ifugao', name: 'Ifugao' },
        { id: 'ilocos-norte', name: 'Ilocos Norte' },
        { id: 'ilocos-sur', name: 'Ilocos Sur' },
        { id: 'iloilo', name: 'Iloilo' },
        { id: 'isabela', name: 'Isabela' },
        { id: 'kalinga', name: 'Kalinga' },
        { id: 'la-union', name: 'La Union' },
        { id: 'laguna', name: 'Laguna' },
        { id: 'lanao-del-norte', name: 'Lanao del Norte' },
        { id: 'lanao-del-sur', name: 'Lanao del Sur' },
        { id: 'leyte', name: 'Leyte' },
        { id: 'maguindanao', name: 'Maguindanao' },
        { id: 'marinduque', name: 'Marinduque' },
        { id: 'masbate', name: 'Masbate' },
        { id: 'misamis-occidental', name: 'Misamis Occidental' },
        { id: 'misamis-oriental', name: 'Misamis Oriental' },
        { id: 'mountain-province', name: 'Mountain Province' },
        { id: 'negros-occidental', name: 'Negros Occidental' },
        { id: 'negros-oriental', name: 'Negros Oriental' },
        { id: 'northern-samar', name: 'Northern Samar' },
        { id: 'nueva-ecija', name: 'Nueva Ecija' },
        { id: 'nueva-vizcaya', name: 'Nueva Vizcaya' },
        { id: 'occidental-mindoro', name: 'Occidental Mindoro' },
        { id: 'oriental-mindoro', name: 'Oriental Mindoro' },
        { id: 'palawan', name: 'Palawan' },
        { id: 'pampanga', name: 'Pampanga' },
        { id: 'pangasinan', name: 'Pangasinan' },
        { id: 'quezon', name: 'Quezon' },
        { id: 'quirino', name: 'Quirino' },
        { id: 'rizal', name: 'Rizal' },
        { id: 'romblon', name: 'Romblon' },
        { id: 'samar', name: 'Samar' },
        { id: 'sarangani', name: 'Sarangani' },
        { id: 'siquijor', name: 'Siquijor' },
        { id: 'sorsogon', name: 'Sorsogon' },
        { id: 'south-cotabato', name: 'South Cotabato' },
        { id: 'southern-leyte', name: 'Southern Leyte' },
        { id: 'sultan-kudarat', name: 'Sultan Kudarat' },
        { id: 'sulu', name: 'Sulu' },
        { id: 'surigao-del-norte', name: 'Surigao del Norte' },
        { id: 'surigao-del-sur', name: 'Surigao del Sur' },
        { id: 'tarlac', name: 'Tarlac' },
        { id: 'tawi-tawi', name: 'Tawi-Tawi' },
        { id: 'zambales', name: 'Zambales' },
        { id: 'zamboanga-del-norte', name: 'Zamboanga del Norte' },
        { id: 'zamboanga-del-sur', name: 'Zamboanga del Sur' },
        { id: 'zamboanga-sibugay', name: 'Zamboanga Sibugay' },
    ];

    // Load countries on mount - RESTORED ORIGINAL LOGIC
    useEffect(() => {
        const loadCountries = async () => {
            try {
                const response = await getOnboardData('countries');
                console.log('Countries API response:', response);
                
                // API returns data directly or in response.data
                const countriesData = response.data || response;
                
                if (countriesData && Array.isArray(countriesData) && countriesData.length > 0) {
                    const mappedCountries = countriesData.map((item: any) => ({
                        code: (item.code || '').toLowerCase(),
                        name: item.name || '',
                    })).filter((c: any) => c.code && c.name);
                    
                    console.log('Mapped countries:', mappedCountries.length);
                    setCountries(mappedCountries);
                } else {
                    console.warn('No countries data received, using fallback');
                    // Fallback countries
                    setCountries([
                        { code: 'ph', name: 'Philippines' },
                        { code: 'us', name: 'United States' },
                        { code: 'gb', name: 'United Kingdom' },
                        { code: 'ca', name: 'Canada' },
                        { code: 'au', name: 'Australia' },
                        { code: 'ae', name: 'United Arab Emirates' },
                        { code: 'sa', name: 'Saudi Arabia' },
                        { code: 'sg', name: 'Singapore' },
                        { code: 'jp', name: 'Japan' },
                        { code: 'de', name: 'Germany' },
                    ]);
                }
            } catch (error) {
                console.warn('Failed to load countries from API:', error);
                // Fallback countries
                setCountries([
                    { code: 'ph', name: 'Philippines' },
                    { code: 'us', name: 'United States' },
                    { code: 'gb', name: 'United Kingdom' },
                    { code: 'ca', name: 'Canada' },
                    { code: 'au', name: 'Australia' },
                    { code: 'ae', name: 'United Arab Emirates' },
                    { code: 'sa', name: 'Saudi Arabia' },
                    { code: 'sg', name: 'Singapore' },
                    { code: 'jp', name: 'Japan' },
                    { code: 'de', name: 'Germany' },
                ]);
            }
        };
        loadCountries();
    }, []);

    // Load cities when province changes
    useEffect(() => {
        const loadCities = async () => {
            if (!formData.province) {
                setCities([]);
                return;
            }
            try {
                const response = await getOnboardData('regions', formData.province);
                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setCities(
                        response.data.map((item: any) => ({
                            id: item.id || item.code || '',
                            name: item.name || '',
                        }))
                    );
                } else {
                    // Use static fallback if API returns empty or fails
                    const fallbackCities = PH_CITIES_BY_PROVINCE[formData.province] || [];
                    if (fallbackCities.length > 0) {
                        setCities(fallbackCities);
                    } else {
                        // If no static data, add a generic option
                        setCities([{ id: 'other', name: 'Other (Please specify)' }]);
                    }
                }
            } catch (error) {
                // Use static fallback if API fails
                console.warn('Failed to load cities from API, using fallback:', error);
                const fallbackCities = PH_CITIES_BY_PROVINCE[formData.province] || [];
                if (fallbackCities.length > 0) {
                    setCities(fallbackCities);
                } else {
                    // If no static data, add a generic option
                    setCities([{ id: 'other', name: 'Other (Please specify)' }]);
                }
            }
        };
        loadCities();
    }, [formData.province]);

    // Load countries list on mount
    useEffect(() => {
        const loadCountries = async () => {
            try {
                const response = await getOnboardData('countries');
                if (response.data && Array.isArray(response.data)) {
                    setCountries(
                        response.data.map((item: any) => ({
                            id: item.id?.toString() || '',
                            name: item.name || '',
                            code: item.code || '',
                        }))
                    );
                }
            } catch (error) {
                console.warn('Failed to load countries from API:', error);
            }
        };
        loadCountries();
    }, []);

    // Load regions or other countries when country changes
    useEffect(() => {
        const loadRegionsOrCountries = async () => {
            setRegions([]);
            setOtherCountries([]);
            setFormData(prev => ({ ...prev, currentLocationRegion: '' }));

            if (!formData.country) return;

            setLoadingRegions(true);

            try {
                // Find country ID
                const countryData = countries.find(c => c.name === formData.country);
                const countryId = countryData?.id;

                if (formData.country === 'Other') {
                    // Load list of other countries
                    const response = await getOnboardData('countries');
                    if (response.data && Array.isArray(response.data)) {
                        // Filter out main countries that are already in the dropdown
                        const mainCountries = ['Philippines', 'United States', 'United Kingdom', 'Canada', 'Australia', 'United Arab Emirates', 'Saudi Arabia'];
                        const filtered = response.data
                            .filter((item: any) => !mainCountries.includes(item.name))
                            .map((item: any) => ({
                                id: item.id?.toString() || '',
                                name: item.name || '',
                                code: item.code || '',
                            }));
                        setOtherCountries(filtered);
                    }
                } else if (countryId) {
                    // Try to load regions for any country
                    const response = await getOnboardData('regions', countryId);
                    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                        setRegions(
                            response.data.map((item: any) => ({
                                id: item.id?.toString() || item.code || '',
                                name: item.name || '',
                            }))
                        );
                    }
                }
            } catch (error) {
                console.warn('Failed to load regions/countries from API:', error);
            } finally {
                setLoadingRegions(false);
            }
        };

        loadRegionsOrCountries();
    }, [formData.country, countries]);

    // Track onboarding started
    useEffect(() => {
        if (currentStep === 0) {
            const source = jobId ? 'apply' : 'cta';
            trackOnboardingStarted(source, jobId ? Number(jobId) : undefined);
        }
    }, [jobId]);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateMobile = (mobile: string): boolean => {
        const phMobileRegex = /^(\+63|0)?9\d{9}$/;
        return phMobileRegex.test(mobile.replace(/\s/g, ''));
    };

    const normalizeMobile = (mobile: string): string => {
        const cleaned = mobile.replace(/\s/g, '');
        if (cleaned.startsWith('+63')) return cleaned;
        if (cleaned.startsWith('0')) return '+63' + cleaned.substring(1);
        if (cleaned.startsWith('9')) return '+63' + cleaned;
        return cleaned;
    };

    const validateName = (name: string): boolean => {
        const nameRegex = /^[a-zA-Z\s'-]+$/;
        return nameRegex.test(name) && name.trim().length > 0;
    };

    // Validation for 6 Steps
    const validateStep = (step: number): boolean => {
        const newErrors: Partial<Record<keyof RegistrationFormData, string>> = {};

        if (step === 0) {
            // Step 1 - Account
            if (!formData.email.trim()) newErrors.email = 'Email is required';
            else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address';
            
            if (!formData.password) newErrors.password = 'Password is required';
            else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
            
            if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
            else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        
        } else if (step === 1) {
            // Step 2 - Personal (Names)
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            else if (!validateName(formData.firstName)) newErrors.firstName = 'Invalid characters in first name';
            
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
            else if (!validateName(formData.lastName)) newErrors.lastName = 'Invalid characters in last name';
        
        } else if (step === 2) {
            // Step 3 - Job Search
            if (!formData.jobSearchStatus) newErrors.jobSearchStatus = 'Please select an option';
        
        } else if (step === 3) {
            // Step 4 - Nursing Status
            if (!formData.nursingStatus) newErrors.nursingStatus = 'Please select your nursing status';
        
        } else if (step === 4) {
            // Step 5 - Location
            if (!formData.country) {
                newErrors.country = 'Please select your country';
            }
            // Validate region if available for the selected country
            if (formData.country && formData.country !== 'Other' && regions.length > 0) {
                if (!formData.currentLocationRegion) {
                    newErrors.currentLocationRegion = 'Please select a region';
                }
            }
            // Validate other country if "Other" is selected
            if (formData.country === 'Other' && otherCountries.length > 0) {
                if (!formData.currentLocationRegion) {
                    newErrors.currentLocationRegion = 'Please select a country';
                }
            }
            if (!formData.isFilipino) {
                newErrors.isFilipino = 'You must confirm that you are a Filipino national';
            }
        } else if (step === 5) {
            // Step 6 - Contact & Terms (Birthdate, Mobile, Terms)
            if (!formData.birthDate) {
                newErrors.birthDate = 'Birth date is required';
            } else {
                const age = dayjs().diff(formData.birthDate, 'year');
                if (age < 18) newErrors.birthDate = 'You must be at least 18 years old';
                else if (age > 100) newErrors.birthDate = 'Please enter a valid birth date';
            }

            if (formData.mobile.trim() && !validateMobile(formData.mobile)) {
                newErrors.mobile = 'Please enter a valid Philippine mobile number';
            }

            if (!formData.agreedToTerms) {
                newErrors.agreedToTerms = 'You must agree to the Terms of Service';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            if (currentStep < FORM_STEPS.length - 1) {
                const currentStepId = FORM_STEPS[currentStep].screenId;
                trackOnboardingStepCompleted(currentStepId);
                setCurrentStep(currentStep + 1);
            } else {
                handleSubmit();
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(currentStep)) return;

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Determine country and region values - only include if not empty
            const registrationData: NurseRegistrationData = {
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                lookingForJob: formData.jobSearchStatus,
                nursingStatus: formData.nursingStatus,
                phone: formData.mobile ? normalizeMobile(formData.mobile) : '',
                birthDate: formData.birthDate ? formData.birthDate.format('YYYY-MM-DD') : undefined,
                currentLocationCountry: formData.country,
                lookingForJob: formData.jobSearchStatus,
                nursingStatus: formData.nursingStatus,
                
                phone: formData.mobile ? normalizeMobile(formData.mobile) : undefined,
                
                // Optional/Hidden fields (sending empty/defaults if not collected in 6 steps)
                yearsOfExperience: formData.yearsOfExperience,
                preferredDestination: formData.preferredDestination,
                jobStartTimeline: formData.jobStartTimeline,
                
                termsAccepted: formData.agreedToTerms,
                sourcingCenter: 'Landing Page Funnel',
                
                ...(jobId && { job_id: jobId }),
                ...(campaignId && { campaign_id: campaignId }),
                ...(landingPageId && { landing_page_id: landingPageId }),
                ...utmParams,
            };

            // Add currentLocationCountry and currentLocationRegion only if they have values
            if (formData.country === 'Other') {
                // For "Other", use the selected country ID as currentLocationCountry
                if (formData.currentLocationRegion && formData.currentLocationRegion.trim()) {
                    registrationData.currentLocationCountry = formData.currentLocationRegion.trim();
                }
            } else {
                // For regular countries, use country name
                if (formData.country && formData.country.trim()) {
                    registrationData.currentLocationCountry = formData.country.trim();
                }
                // Add region if available and not empty
                if (formData.currentLocationRegion && formData.currentLocationRegion.trim()) {
                    registrationData.currentLocationRegion = formData.currentLocationRegion.trim();
                }
            }

            const response = await registerNurse(registrationData);

            const isNetworkError = response.error && (
                response.error.includes('network') || 
                response.error.includes('fetch') || 
                response.error.includes('connection')
            );

            if (response.error && !isNetworkError) {
                let errorMessage = response.error;
                if (errorMessage.includes('email') && errorMessage.toLowerCase().includes('already')) {
                    errorMessage = 'This email address is already registered.';
                }
                setSubmitError(errorMessage);
                setIsSubmitting(false);
                return;
            }

            if (!response.error) {
                trackRegCompleted(formData.email);
            }
            trackOnboardingStepCompleted('REG_COMPLETED');
            trackOnboardingFinished();

            if (jobId) {
                window.location.href = `https://www.colpuno.com/jobs/${encodeURIComponent(jobId)}?openConfirmApplication=1`;
            } else {
                window.location.href = 'https://www.colpuno.com/login';
            }
        } catch (error) {
            trackOnboardingStepCompleted('REG_COMPLETED');
            trackOnboardingFinished();
            
            if (jobId) {
                window.location.href = `https://www.colpuno.com/jobs/${encodeURIComponent(jobId)}?openConfirmApplication=1`;
            } else {
                window.location.href = 'https://www.colpuno.com/login';
            }
        }
    };

    const utmParams = typeof window !== 'undefined' && sessionStorage.getItem('utm_params') 
        ? JSON.parse(sessionStorage.getItem('utm_params') || '{}') 
        : {};

    const renderStep = () => {
        const stepId = FORM_STEPS[currentStep]?.id;
        const currentQuestion = FORM_STEPS[currentStep]?.question || '';

        const renderQuestionTitle = (question: string) => {
            const words = question.split(' ');
            const lastWord = words.pop();
            const restOfQuestion = words.join(' ');
            
            return (
                <Typography 
                    variant="h4" 
                    sx={{ 
                        mb: 3, 
                        fontWeight: 600, 
                        textAlign: 'left', 
                        color: 'text.primary',
                        fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                        lineHeight: 1.3,
                        wordBreak: 'break-word',
                    }}
                >
                    {restOfQuestion}{' '}
                    <Box component="span" sx={{ borderBottom: '3px solid', borderColor: 'info.main', pb: 0.5 }}>
                        {lastWord}
                    </Box>
                </Typography>
            );
        };

        switch (stepId) {
            case 'S1': // Account
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderQuestionTitle(currentQuestion)}
                        <Stack spacing={3} sx={{ mt: 3 }}>
                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Email *</Typography>
                                <TextField
                                    fullWidth
                                    placeholder="your.email@example.com"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        setErrors({ ...errors, email: '' });
                                    }}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Password *</Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Create a secure password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value });
                                        setErrors({ ...errors, password: '' });
                                    }}
                                    error={!!errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                                    {showPassword ? <IconVisibilityOff /> : <IconVisibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                                />
                                <FormHelperText error={!!errors.password}>{errors.password || 'Minimum 8 characters.'}</FormHelperText>
                            </FormControl>
                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Confirm Password *</Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Re-enter your password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) => {
                                        setFormData({ ...formData, confirmPassword: e.target.value });
                                        setErrors({ ...errors, confirmPassword: '' });
                                    }}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">
                                                    {showConfirmPassword ? <IconVisibilityOff /> : <IconVisibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                                />
                            </FormControl>
                        </Stack>
                    </Box>
                );

            case 'S2': // Personal (Names)
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderQuestionTitle(currentQuestion)}
                        <Stack spacing={3}>
                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>First Name *</Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter your first name"
                                    value={formData.firstName}
                                    onChange={(e) => {
                                        setFormData({ ...formData, firstName: e.target.value });
                                        setErrors({ ...errors, firstName: '' });
                                    }}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Last Name *</Typography>
                                <TextField
                                    fullWidth
                                    placeholder="Enter your last name"
                                    value={formData.lastName}
                                    onChange={(e) => {
                                        setFormData({ ...formData, lastName: e.target.value });
                                        setErrors({ ...errors, lastName: '' });
                                    }}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                                />
                            </FormControl>
                        </Stack>
                    </Box>
                );

            case 'S3': // Job Search
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderQuestionTitle(currentQuestion)}
                        <FormControl error={!!errors.jobSearchStatus} fullWidth>
                            <RadioGroup
                                value={formData.jobSearchStatus}
                                onChange={(e) => {
                                    setFormData({ ...formData, jobSearchStatus: e.target.value });
                                    setErrors({ ...errors, jobSearchStatus: '' });
                                }}
                            >
                                <Stack spacing={1.5}>
                                    {[
                                        { value: 'actively-looking', label: 'Yes, actively looking' },
                                        { value: 'open-to-opportunities', label: 'Open to opportunities' },
                                        { value: 'not-currently-looking', label: 'Not currently looking' },
                                    ].map((option) => (
                                        <Box
                                            key={option.value}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: formData.jobSearchStatus === option.value ? 'primary.main' : 'grey.300',
                                                borderRadius: 1,
                                                p: 1.5,
                                                transition: 'all 0.2s',
                                                cursor: 'pointer',
                                                '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
                                                bgcolor: formData.jobSearchStatus === option.value ? 'primary.lighter' : 'transparent',
                                            }}
                                            onClick={() => {
                                                setFormData({ ...formData, jobSearchStatus: option.value });
                                                setErrors({ ...errors, jobSearchStatus: '' });
                                            }}
                                        >
                                            <FormControlLabel
                                                value={option.value}
                                                control={<Radio size="small" />}
                                                label={option.label}
                                                sx={{ width: '100%', m: 0 }}
                                            />
                                        </Box>
                                    ))}
                                </Stack>
                            </RadioGroup>
                            {errors.jobSearchStatus && <FormHelperText>{errors.jobSearchStatus}</FormHelperText>}
                        </FormControl>
                    </Box>
                );

            case 'S4': // Nursing Status
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderQuestionTitle(currentQuestion)}
                        <FormControl error={!!errors.nursingStatus} fullWidth>
                            <RadioGroup
                                value={formData.nursingStatus}
                                onChange={(e) => {
                                    setFormData({ ...formData, nursingStatus: e.target.value });
                                    setErrors({ ...errors, nursingStatus: '' });
                                }}
                            >
                                <Stack spacing={1.5}>
                                    {[
                                        { value: 'bsn-student', label: 'BSN Student' },
                                        { value: 'nle-student', label: 'NLE Reviewer / Waiting for results' },
                                        { value: 'newly-graduated', label: 'Newly Licensed Nurse (no experience yet)' },
                                        { value: 'philippines-experienced', label: 'Experienced Nurse in the Philippines' },
                                        { value: 'abroad-experienced', label: 'Experienced Nurse (worked abroad)' },
                                    ].map((option) => (
                                        <Box
                                            key={option.value}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: formData.nursingStatus === option.value ? 'primary.main' : 'grey.300',
                                                borderRadius: 1,
                                                p: 1.5,
                                                transition: 'all 0.2s',
                                                cursor: 'pointer',
                                                '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
                                                bgcolor: formData.nursingStatus === option.value ? 'primary.lighter' : 'transparent',
                                            }}
                                            onClick={() => {
                                                setFormData({ ...formData, nursingStatus: option.value });
                                                setErrors({ ...errors, nursingStatus: '' });
                                            }}
                                        >
                                            <FormControlLabel
                                                value={option.value}
                                                control={<Radio size="small" />}
                                                label={option.label}
                                                sx={{ width: '100%', m: 0 }}
                                            />
                                        </Box>
                                    ))}
                                </Stack>
                            </RadioGroup>
                            {errors.nursingStatus && <FormHelperText>{errors.nursingStatus}</FormHelperText>}
                        </FormControl>
                    </Box>
                );

            case 'S5': // Location
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderQuestionTitle(currentQuestion)}
                        <Stack spacing={3}>
                            <TextField
                                select
                                fullWidth
                                label="Country *"
                                value={formData.country}
                                onChange={(e) => {
                                    setFormData({ ...formData, country: e.target.value, currentLocationRegion: '' });
                                    setErrors({ ...errors, country: '', currentLocationRegion: '' });
                                }}
                                error={!!errors.country}
                                helperText={errors.country}
                                disabled={loadingRegions}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            >
                                <MenuItem value="Philippines">Philippines</MenuItem>
                                <MenuItem value="United States">United States</MenuItem>
                                <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                                <MenuItem value="Canada">Canada</MenuItem>
                                <MenuItem value="Australia">Australia</MenuItem>
                                <MenuItem value="United Arab Emirates">United Arab Emirates</MenuItem>
                                <MenuItem value="Saudi Arabia">Saudi Arabia</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>

                            {/* Region field - shown for any country that has regions */}
                            {formData.country && formData.country !== 'Other' && regions.length > 0 && (
                                <TextField
                                    select
                                    fullWidth
                                    label="Region *"
                                    value={formData.currentLocationRegion}
                                    onChange={(e) => {
                                        setFormData({ ...formData, currentLocationRegion: e.target.value });
                                        setErrors({ ...errors, currentLocationRegion: '' });
                                    }}
                                    error={!!errors.currentLocationRegion}
                                    helperText={errors.currentLocationRegion}
                                    disabled={loadingRegions}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                >
                                    <MenuItem value="">Select region</MenuItem>
                                    {regions.map((region) => (
                                        <MenuItem key={region.id} value={region.id}>
                                            {region.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}

                            {/* Other countries field - shown only when "Other" is selected */}
                            {formData.country === 'Other' && otherCountries.length > 0 && (
                                <TextField
                                    select
                                    fullWidth
                                    label="Select country *"
                                    value={formData.currentLocationRegion}
                                    onChange={(e) => {
                                        setFormData({ ...formData, currentLocationRegion: e.target.value });
                                        setErrors({ ...errors, currentLocationRegion: '' });
                                    }}
                                    error={!!errors.currentLocationRegion}
                                    helperText={errors.currentLocationRegion}
                                    disabled={loadingRegions}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                >
                                    <MenuItem value="">Select country</MenuItem>
                                    {otherCountries.map((country) => (
                                        <MenuItem key={country.id} value={country.id}>
                                            {country.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}

                            <Box
                                sx={{
                                    border: '1px solid',
                                    borderColor: errors.isFilipino ? 'error.main' : 'grey.300',
                                    borderRadius: 2,
                                    p: 2,
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.isFilipino}
                                            onChange={(e) => {
                                                setFormData({ ...formData, isFilipino: e.target.checked });
                                                setErrors({ ...errors, isFilipino: '' });
                                            }}
                                        />
                                    }
                                    label="I confirm that I am a Filipino national. *"
                                />
                            </Box>
                            {errors.isFilipino && <FormHelperText error sx={{ mt: -2 }}>{errors.isFilipino}</FormHelperText>}
                        </Stack>
                    </Box>
                );

            case 'S6': // Contact (Birthdate, Mobile, Terms)
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderQuestionTitle(currentQuestion)}
                        <Stack spacing={3}>
                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Date of Birth *</Typography>
                                <DatePicker
                                    value={formData.birthDate}
                                    onChange={(newValue) => {
                                        setFormData({ ...formData, birthDate: newValue });
                                        setErrors({ ...errors, birthDate: '' });
                                    }}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            error: !!errors.birthDate,
                                            helperText: errors.birthDate,
                                            placeholder: 'Select your birth date',
                                            sx: { '& .MuiOutlinedInput-root': { borderRadius: 1 } },
                                        },
                                    }}
                                    maxDate={dayjs().subtract(18, 'year')}
                                    minDate={dayjs().subtract(100, 'year')}
                                />
                            </FormControl>

                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>Phone Number</Typography>
                                <TextField
                                    fullWidth
                                    placeholder="+63 912 345 6789"
                                    value={formData.mobile}
                                    onChange={(e) => {
                                        setFormData({ ...formData, mobile: e.target.value });
                                        setErrors({ ...errors, mobile: '' });
                                    }}
                                    error={!!errors.mobile}
                                    helperText={errors.mobile || 'Optional - helps employers contact you directly.'}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                                />
                            </FormControl>

                            <Box sx={{ border: '1px solid', borderColor: errors.agreedToTerms ? 'error.main' : 'grey.300', borderRadius: 1, p: 2, bgcolor: 'grey.50' }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.agreedToTerms}
                                            onChange={(e) => {
                                                setFormData({ ...formData, agreedToTerms: e.target.checked });
                                                setErrors({ ...errors, agreedToTerms: '' });
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography variant="body2">
                                            I agree to the <a href="https://www.colpuno.com/privacy-notice" target="_blank" rel="noreferrer" style={{ color: '#173AA8' }}>Privacy Policy</a> and <a href="https://www.colpuno.com/terms-and-conditions" target="_blank" rel="noreferrer" style={{ color: '#173AA8' }}>Terms of Service</a> of COLPUNO. *
                                        </Typography>
                                    }
                                />
                            </Box>
                            {errors.agreedToTerms && <FormHelperText error>{errors.agreedToTerms}</FormHelperText>}
                        </Stack>
                        
                        {submitError && <Alert severity="error" sx={{ mt: 3 }}>{submitError}</Alert>}
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '100%',
                height: '100%',
                maxHeight: { xs: '100%', md: '90vh' },
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3,
                boxSizing: 'border-box',
            }}
        >
            {/* Header with Horizontal Stepper */}
            <Box sx={{ bgcolor: 'primary.main', color: 'white', px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 2.5, md: 3 }, position: 'relative' }}>
                {onClose && (
                    <IconButton 
                        onClick={onClose}
                        sx={{ position: 'absolute', top: 12, right: 12, color: 'white', zIndex: 10 }}
                    >
                        <IconCrossSmall />
                    </IconButton>
                )}

                <Typography 
                    variant="h6" 
                    align="center" 
                    sx={{ 
                        mb: 4, 
                        fontWeight: 700, 
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        color: 'white'
                    }}
                >
                    Your Nursing Journey
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', width: '100%', px: { xs: 0, md: 4 } }}>
                    {FORM_STEPS.map((step, index) => {
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;
                        const isLast = index === FORM_STEPS.length - 1;

                        return (
                            <Box key={step.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, position: 'relative' }}>
                                {!isLast && (
                                    <Box sx={{ position: 'absolute', top: 16, left: '50%', width: '100%', height: 2, bgcolor: 'white', zIndex: 0 }} />
                                )}
                                
                                <Box
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        bgcolor: isCompleted || isActive ? 'secondary.main' : 'primary.main',
                                        border: isCompleted || isActive ? 'none' : '2px solid white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        zIndex: 1,
                                        mb: 1,
                                        color: 'white',
                                        fontWeight: 600,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {isCompleted ? <IconCheckCircle sx={{ fontSize: 20, color: 'white' }} /> : isActive ? <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'white' }} /> : null}
                                </Box>
                                
                                <Typography 
                                    variant="caption" 
                                    align="center" 
                                    sx={{ 
                                        color: 'white', 
                                        fontWeight: isActive ? 700 : 400,
                                        opacity: isActive || isCompleted ? 1 : 0.7,
                                        display: { xs: 'none', sm: 'block' },
                                        fontSize: '0.75rem'
                                    }}
                                >
                                    {step.name}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            {/* Form Content */}
            <Box 
                sx={{ 
                    p: { xs: 2, sm: 3, md: 4 }, 
                    pb: 2,
                    flex: 1, 
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    minHeight: 0, 
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </Box>
            </Box>

            {/* Navigation buttons */}
            <Box 
                sx={{ 
                    borderTop: '1px solid', 
                    borderColor: 'grey.200', 
                    p: { xs: 2, md: 3 },
                    bgcolor: 'background.paper',
                    flexShrink: 0,
                }}
            >
                <Stack
                    direction="row"
                    spacing={{ xs: 1.5, sm: 2 }}
                    sx={{
                        justifyContent: currentStep > 0 ? 'space-between' : 'flex-end',
                        maxWidth: 500,
                        mx: 'auto',
                        width: '100%'
                    }}
                >
                    {currentStep > 0 && (
                        <Button
                            variant="outlined"
                            onClick={handleBack}
                            disabled={isSubmitting}
                            size="large"
                            sx={{ 
                                minWidth: { xs: 100, sm: 120 },
                                flex: { xs: 1, sm: 'unset' },
                                borderRadius: 1, 
                                height: { xs: 44, sm: 48 },
                                textTransform: 'none',
                                fontWeight: 500,
                                borderColor: 'grey.300',
                                color: 'text.primary',
                                '&:hover': { borderColor: 'grey.400', bgcolor: 'grey.50' }
                            }}
                        >
                            Previous
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={isSubmitting}
                        size="large"
                        sx={{ 
                            minWidth: { xs: 100, sm: 120 },
                            flex: { xs: currentStep > 0 ? 1 : 'unset', sm: 'unset' },
                            borderRadius: 1, 
                            height: { xs: 44, sm: 48 }, 
                            bgcolor: 'primary.main',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': { bgcolor: 'primary.dark' }
                        }}
                    >
                        {currentStep === FORM_STEPS.length - 1 ? (isSubmitting ? 'Creating account...' : 'Create Account') : 'Next Step'}
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default MultiStepRegistrationForm;