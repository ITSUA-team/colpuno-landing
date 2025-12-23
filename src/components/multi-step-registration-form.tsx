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
} from '../sections/landing-page/utils/tracking';

interface MultiStepRegistrationFormProps {
    initialEmail?: string;
    embedded?: boolean;
    jobId?: string;
    campaignId?: string;
    landingPageId?: string;
    onClose?: () => void;
}

interface FormData {
    // Step 1 - Account
    email: string;
    password: string;
    confirmPassword: string;
    // Step 2 - Name
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
    
    // Legacy/Unused but kept for type compatibility if needed temporarily
    emailVerified: boolean;
    journeyStage: string;
    province: string;
    city: string;
    optInViber: boolean;
    optInWhatsApp: boolean;
    optInMessenger: boolean;
}

const FORM_STEPS = [
    { id: 'S1', name: 'Account', label: 'Create your account', screenId: 'REG_S1_ACCOUNT' },
    { id: 'S2', name: 'Personal', label: 'About you', screenId: 'REG_S2_PERSONAL' },
    { id: 'S3', name: 'JobSearch', label: 'Job search status', screenId: 'REG_S3_JOB_SEARCH' },
    { id: 'S4', name: 'NursingStatus', label: 'Nursing status', screenId: 'REG_S4_NURSING_STATUS' },
    { id: 'S5', name: 'Location', label: 'Location', screenId: 'REG_S5_LOCATION' },
    { id: 'S6', name: 'Contact', label: 'Contact details', screenId: 'REG_S6_CONTACT' },
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
    const [formData, setFormData] = useState<FormData>({
        email: initialEmail,
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        jobSearchStatus: '',
        nursingStatus: '',
        country: 'Philippines',
        currentLocationRegion: '',
        isFilipino: false,
        mobile: '',
        birthDate: null,
        agreedToTerms: false,
        
        // Legacy
        emailVerified: false,
        journeyStage: '',
        province: '',
        city: '',
        optInViber: false,
        optInWhatsApp: false,
        optInMessenger: false,
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
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

    // Static fallback cities by province
    const PH_CITIES_BY_PROVINCE: Record<string, Array<{ id: string; name: string }>> = {
        'metro-manila': [
            { id: 'manila', name: 'Manila' },
            { id: 'makati', name: 'Makati' },
            { id: 'quezon-city', name: 'Quezon City' },
            { id: 'pasig', name: 'Pasig' },
            { id: 'taguig', name: 'Taguig' },
            { id: 'mandaluyong', name: 'Mandaluyong' },
            { id: 'san-juan', name: 'San Juan' },
            { id: 'pasay', name: 'Pasay' },
            { id: 'paranaque', name: 'Parañaque' },
            { id: 'las-pinas', name: 'Las Piñas' },
            { id: 'muntinlupa', name: 'Muntinlupa' },
            { id: 'marikina', name: 'Marikina' },
            { id: 'caloocan', name: 'Caloocan' },
            { id: 'valenzuela', name: 'Valenzuela' },
            { id: 'malabon', name: 'Malabon' },
            { id: 'navotas', name: 'Navotas' },
        ],
        'cebu': [
            { id: 'cebu-city', name: 'Cebu City' },
            { id: 'lapu-lapu', name: 'Lapu-Lapu' },
            { id: 'mandaue', name: 'Mandaue' },
            { id: 'talisay', name: 'Talisay' },
            { id: 'toledo', name: 'Toledo' },
            { id: 'danao', name: 'Danao' },
            { id: 'bogo', name: 'Bogo' },
        ],
        'davao-del-sur': [
            { id: 'davao-city', name: 'Davao City' },
            { id: 'digos', name: 'Digos' },
        ],
        'laguna': [
            { id: 'calamba', name: 'Calamba' },
            { id: 'san-pablo', name: 'San Pablo' },
            { id: 'santa-rosa', name: 'Santa Rosa' },
            { id: 'biñan', name: 'Biñan' },
            { id: 'los-banos', name: 'Los Baños' },
        ],
        'cavite': [
            { id: 'bacoor', name: 'Bacoor' },
            { id: 'imus', name: 'Imus' },
            { id: 'dasmarinas', name: 'Dasmariñas' },
            { id: 'cavite-city', name: 'Cavite City' },
            { id: 'tagaytay', name: 'Tagaytay' },
        ],
        'bulacan': [
            { id: 'malolos', name: 'Malolos' },
            { id: 'meycauayan', name: 'Meycauayan' },
            { id: 'san-jose-del-monte', name: 'San Jose del Monte' },
            { id: 'baliuag', name: 'Baliuag' },
        ],
        'pampanga': [
            { id: 'angeles', name: 'Angeles' },
            { id: 'san-fernando', name: 'San Fernando' },
            { id: 'mabalacat', name: 'Mabalacat' },
        ],
        'batangas': [
            { id: 'batangas-city', name: 'Batangas City' },
            { id: 'lipa', name: 'Lipa' },
            { id: 'tanauan', name: 'Tanauan' },
        ],
        'iloilo': [
            { id: 'iloilo-city', name: 'Iloilo City' },
            { id: 'passi', name: 'Passi' },
        ],
        'bohol': [
            { id: 'tagbilaran', name: 'Tagbilaran' },
        ],
    };

    // Load provinces on mount
    useEffect(() => {
        const loadProvinces = async () => {
            try {
                const response = await getOnboardData('regions', 'ph');
                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setProvinces(
                        response.data.map((item: any) => ({
                            id: item.id || item.code || '',
                            name: item.name || '',
                        }))
                    );
                } else {
                    // Use static fallback if API returns empty or fails
                    setProvinces(PH_PROVINCES);
                }
            } catch (error) {
                // Use static fallback if API fails
                console.warn('Failed to load provinces from API, using fallback:', error);
                setProvinces(PH_PROVINCES);
            }
        };
        loadProvinces();
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
        // PH mobile: ^(+63|0)9\d{9}$
        const phMobileRegex = /^(\+63|0)?9\d{9}$/;
        return phMobileRegex.test(mobile.replace(/\s/g, ''));
    };

    const normalizeMobile = (mobile: string): string => {
        // Normalize to E.164: +63XXXXXXXXXX
        const cleaned = mobile.replace(/\s/g, '');
        if (cleaned.startsWith('+63')) {
            return cleaned;
        }
        if (cleaned.startsWith('0')) {
            return '+63' + cleaned.substring(1);
        }
        if (cleaned.startsWith('9')) {
            return '+63' + cleaned;
        }
        return cleaned;
    };

    const validateName = (name: string): boolean => {
        // Letters, hyphen, apostrophe allowed
        const nameRegex = /^[a-zA-Z\s'-]+$/;
        return nameRegex.test(name) && name.trim().length > 0;
    };

    const validateStep = (step: number): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (step === 0) {
            // Step 1 - Account
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!validateEmail(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
            if (!formData.password) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 8) { // Screenshot says "Minimum 8 characters"
                newErrors.password = 'Password must be at least 8 characters';
            }
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        } else if (step === 1) {
            // Step 2 - Personal
            if (!formData.firstName.trim()) {
                newErrors.firstName = 'First name is required';
            } else if (!validateName(formData.firstName)) {
                newErrors.firstName = 'First name can only contain letters, hyphens, and apostrophes';
            }
            if (!formData.lastName.trim()) {
                newErrors.lastName = 'Last name is required';
            } else if (!validateName(formData.lastName)) {
                newErrors.lastName = 'Last name can only contain letters, hyphens, and apostrophes';
            }
        } else if (step === 2) {
            // Step 3 - Job Search
            if (!formData.jobSearchStatus) {
                newErrors.jobSearchStatus = 'Please select an option';
            }
        } else if (step === 3) {
            // Step 4 - Nursing Status
            if (!formData.nursingStatus) {
                newErrors.nursingStatus = 'Please select your nursing status';
            }
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
            // Step 6 - Contact
            if (!formData.mobile.trim()) {
                newErrors.mobile = 'Mobile number is required';
            } else if (!validateMobile(formData.mobile)) {
                newErrors.mobile = 'Please enter a valid Philippine mobile number';
            }
            if (!formData.birthDate) {
                newErrors.birthDate = 'Birth date is required';
            } else {
                const age = dayjs().diff(formData.birthDate, 'year');
                if (age < 18) {
                    newErrors.birthDate = 'You must be at least 18 years old';
                } else if (age > 100) {
                    newErrors.birthDate = 'Please enter a valid birth date';
                }
            }
            if (!formData.agreedToTerms) {
                newErrors.agreedToTerms = 'You must agree to the Privacy Policy and Terms of Service';
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
                jobSearchStatus: formData.jobSearchStatus,
                nursingStatus: formData.nursingStatus,
                country: formData.country,
                isFilipino: formData.isFilipino,
                mobile: normalizeMobile(formData.mobile),
                birthDate: formData.birthDate ? formData.birthDate.format('YYYY-MM-DD') : undefined,
                termsAccepted: formData.agreedToTerms,
                sourcingCenter: 'Landing Page Funnel',
                
                // Add hidden fields if intent=APPLY
                ...(jobId && { job_id: jobId }),
                ...(campaignId && { campaign_id: campaignId }),
                ...(landingPageId && { landing_page_id: landingPageId }),
                // Add UTM parameters
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

            // Check if it's a network/connection error - redirect anyway
            const isNetworkError = response.error && (
                response.error.includes('network') || 
                response.error.includes('fetch') || 
                response.error.includes('connection') ||
                response.error.includes('Unable to connect')
            );

            if (response.error && !isNetworkError) {
                let errorMessage = response.error;
                if (errorMessage.includes('email') && errorMessage.toLowerCase().includes('already')) {
                    errorMessage = 'This email address is already registered. Please use a different email or try logging in.';
                } else if (errorMessage.includes('phone') && errorMessage.toLowerCase().includes('invalid')) {
                    errorMessage = 'Please enter a valid phone number.';
                }
                setSubmitError(errorMessage);
                setIsSubmitting(false);
                return;
            }

            // Success or network error - track and redirect anyway
            // Even if there was a network error, redirect user to login page
            // They can try to log in with the credentials they just entered
            if (!response.error) {
                trackRegCompleted(formData.email);
            }
            trackOnboardingStepCompleted('REG_COMPLETED');

            // Apply routing: after registration (or network error), redirect to login or job page
            if (jobId) {
                // If applying to a job, redirect to job page with confirmation
                window.location.href = `https://www.colpuno.com/jobs/${encodeURIComponent(jobId)}?openConfirmApplication=1`;
            } else {
                // If just browsing, redirect to login page to access dashboard
                window.location.href = 'https://www.colpuno.com/login';
            }
        } catch (error) {
            // Even on error, redirect to login page
            // User can try to log in with the credentials they entered
            trackOnboardingStepCompleted('REG_COMPLETED');
            
            if (jobId) {
                window.location.href = `https://www.colpuno.com/jobs/${encodeURIComponent(jobId)}?openConfirmApplication=1`;
            } else {
                window.location.href = 'https://www.colpuno.com/login';
            }
        }
    };

    // Get UTM params for submission
    const utmParams = typeof window !== 'undefined' && sessionStorage.getItem('utm_params') 
        ? JSON.parse(sessionStorage.getItem('utm_params') || '{}') 
        : {};

    const renderStep = () => {
        const stepId = FORM_STEPS[currentStep]?.id;

        switch (stepId) {
            case 'S1': // Account
                return (
                    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
                        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center', color: 'primary.main' }}>
                            Create your account
                        </Typography>
                        <Stack spacing={3} sx={{ mt: 3 }}>
                            <TextField
                                fullWidth
                                label="Where can we send your job matches? *"
                                placeholder="your.email@example.com"
                                type="email"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                    setErrors({ ...errors, email: '' });
                                }}
                                error={!!errors.email}
                                helperText={errors.email}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                            <Box>
                                <TextField
                                    fullWidth
                                    label="Create your password *"
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
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <IconVisibilityOff /> : <IconVisibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                />
                                <FormHelperText error={!!errors.password} sx={{ mt: 1, mx: 1.5 }}>
                                    {errors.password || 'We care about your career -- but first, we care about your security. Minimum 8 characters.'}
                                </FormHelperText>
                            </Box>
                            <TextField
                                fullWidth
                                label="Confirm your password *"
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
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <IconVisibilityOff /> : <IconVisibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                        </Stack>
                    </Box>
                );

            case 'S2': // Personal
                return (
                    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
                        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, textAlign: 'center', color: 'primary.main' }}>
                            About you
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center' }}>
                            Thanks for sharing your nursing status! Let's start with your name.
                        </Typography>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="What's your first name? *"
                                value={formData.firstName}
                                onChange={(e) => {
                                    setFormData({ ...formData, firstName: e.target.value });
                                    setErrors({ ...errors, firstName: '' });
                                }}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                            <TextField
                                fullWidth
                                label="What's your last name? *"
                                value={formData.lastName}
                                onChange={(e) => {
                                    setFormData({ ...formData, lastName: e.target.value });
                                    setErrors({ ...errors, lastName: '' });
                                }}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />
                        </Stack>
                    </Box>
                );

            case 'S3': // Job Search
                return (
                    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
                        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center', color: 'primary.main' }}>
                            Are you looking for a new job?
                        </Typography>
                        <FormControl error={!!errors.jobSearchStatus} fullWidth>
                            <RadioGroup
                                value={formData.jobSearchStatus}
                                onChange={(e) => {
                                    setFormData({ ...formData, jobSearchStatus: e.target.value });
                                    setErrors({ ...errors, jobSearchStatus: '' });
                                }}
                            >
                                <Stack spacing={2}>
                                    {[
                                        { value: 'actively_looking', label: 'Actively looking' },
                                        { value: 'open_to_opportunities', label: 'Open to Opportunities' },
                                        { value: 'not_looking', label: 'Not currently looking' },
                                    ].map((option) => (
                                        <Box
                                            key={option.value}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: formData.jobSearchStatus === option.value ? 'primary.main' : 'grey.300',
                                                borderRadius: 2,
                                                p: 2,
                                                transition: 'all 0.2s',
                                                '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.lighter' },
                                                bgcolor: formData.jobSearchStatus === option.value ? 'primary.lighter' : 'transparent',
                                            }}
                                        >
                                            <FormControlLabel
                                                value={option.value}
                                                control={<Radio />}
                                                label={option.label}
                                                sx={{ width: '100%', m: 0 }}
                                            />
                                        </Box>
                                    ))}
                                </Stack>
                            </RadioGroup>
                            {errors.jobSearchStatus && (
                                <FormHelperText>{errors.jobSearchStatus}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                );

            case 'S4': // Nursing Status
                return (
                    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
                        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center', color: 'primary.main' }}>
                            Which of the following best describes your current nursing status?
                        </Typography>
                        <FormControl error={!!errors.nursingStatus} fullWidth>
                            <RadioGroup
                                value={formData.nursingStatus}
                                onChange={(e) => {
                                    setFormData({ ...formData, nursingStatus: e.target.value });
                                    setErrors({ ...errors, nursingStatus: '' });
                                }}
                            >
                                <Stack spacing={2}>
                                    {[
                                        { value: 'student_bsn', label: 'Bachelor of Science in Nursing (BSN) – Student' },
                                        { value: 'student_nle', label: 'Nurse Licensure Examination (NLE) – Student' },
                                        { value: 'newly_graduated', label: 'Newly NLE graduated Nurse (without experience)' },
                                        { value: 'experienced_ph', label: 'Experienced Nurse, in the Philippines' },
                                        { value: 'experienced_abroad', label: 'Experienced Nurse, have worked abroad' },
                                    ].map((option) => (
                                        <Box
                                            key={option.value}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: formData.nursingStatus === option.value ? 'primary.main' : 'grey.300',
                                                borderRadius: 2,
                                                p: 2,
                                                transition: 'all 0.2s',
                                                '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.lighter' },
                                                bgcolor: formData.nursingStatus === option.value ? 'primary.lighter' : 'transparent',
                                            }}
                                        >
                                            <FormControlLabel
                                                value={option.value}
                                                control={<Radio />}
                                                label={option.label}
                                                sx={{ width: '100%', m: 0 }}
                                            />
                                        </Box>
                                    ))}
                                </Stack>
                            </RadioGroup>
                            {errors.nursingStatus && (
                                <FormHelperText>{errors.nursingStatus}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                );

            case 'S5': // Location
                return (
                    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
                        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center', color: 'primary.main' }}>
                            Where are you currently living?
                        </Typography>
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
                            {errors.isFilipino && (
                                <FormHelperText error>{errors.isFilipino}</FormHelperText>
                            )}
                        </Stack>
                    </Box>
                );

            case 'S6': // Contact
                return (
                    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
                        <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, textAlign: 'center', color: 'primary.main' }}>
                            A bit more about you
                        </Typography>
                        <Stack spacing={3} sx={{ mt: 3 }}>
                            <DatePicker
                                label="Date of birth *"
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
                                        required: true,
                                        sx: { '& .MuiOutlinedInput-root': { borderRadius: 2 } },
                                    },
                                }}
                                maxDate={dayjs().subtract(18, 'year')}
                                minDate={dayjs().subtract(100, 'year')}
                            />
                            <TextField
                                fullWidth
                                label="What's your phone number?"
                                placeholder="+63 912 345 6789"
                                value={formData.mobile}
                                onChange={(e) => {
                                    setFormData({ ...formData, mobile: e.target.value });
                                    setErrors({ ...errors, mobile: '' });
                                }}
                                error={!!errors.mobile}
                                helperText={errors.mobile || 'Your phone number is optional, but it helps us and potential employers contact you. Please include your full country code (e.g. +63) - if you do not, we will try to add the Philippines country code for you.'}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                            />

                            <Box
                                sx={{
                                    border: '1px solid',
                                    borderColor: errors.agreedToTerms ? 'error.main' : 'grey.300',
                                    borderRadius: 2,
                                    p: 2,
                                    bgcolor: 'grey.50',
                                }}
                            >
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
                                            I agree to the <a href="https://www.colpuno.com/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a> and <a href="https://www.colpuno.com/terms-of-service" target="_blank" rel="noreferrer">Terms of Service</a> of COLPUNO. *
                                        </Typography>
                                    }
                                />
                            </Box>
                            {errors.agreedToTerms && (
                                <FormHelperText error>{errors.agreedToTerms}</FormHelperText>
                            )}
                        </Stack>
                        
                        {submitError && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {submitError}
                            </Alert>
                        )}
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
                height: '100%',
                maxWidth: { xs: '100%', md: 1200 },
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 1,
            }}
        >
            {/* Header with Horizontal Stepper */}
            <Box sx={{ bgcolor: 'primary.main', color: 'white', p: { xs: 2, md: 3 }, position: 'relative' }}>
                {onClose && (
                    <IconButton 
                        onClick={onClose}
                        sx={{ 
                            position: 'absolute', 
                            top: 16, 
                            right: 16, 
                            color: 'white',
                            zIndex: 10
                        }}
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
                                {/* Connecting Line */}
                                {!isLast && (
                                    <Box 
                                        sx={{ 
                                            position: 'absolute', 
                                            top: 16, 
                                            left: '50%', 
                                            width: '100%', 
                                            height: 2, 
                                            bgcolor: 'white',
                                            zIndex: 0 
                                        }} 
                                    />
                                )}
                                
                                {/* Circle */}
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
                                    {isCompleted ? (
                                        <IconCheckCircle sx={{ fontSize: 20, color: 'white' }} />
                                    ) : isActive ? (
                                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'white' }} />
                                    ) : null}
                                </Box>
                                
                                {/* Label */}
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
            <Box sx={{ p: { xs: 2, md: 4 }, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: 600 }}>
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

                {/* Navigation buttons */}
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        mt: 5,
                        justifyContent: 'center',
                        maxWidth: 600,
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
                            sx={{ flex: 1, borderRadius: 50, height: 48 }}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={isSubmitting}
                        size="large"
                        sx={{ flex: 1, borderRadius: 50, height: 48, bgcolor: 'primary.main' }}
                    >
                        {currentStep === FORM_STEPS.length - 1
                            ? isSubmitting
                                ? 'Creating account...'
                                : 'Create Account'
                            : 'Next Step'}
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default MultiStepRegistrationForm;
