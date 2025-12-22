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
    InputLabel,
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
    // Step 2 - Location
    country: string;
    isFilipino: boolean;
    // Step 3 - Name
    firstName: string;
    lastName: string;
    // Step 4 - Birthday
    birthDate: Dayjs | null;
    // Step 5 - Contact
    mobile: string;
    // Step 6 - Nursing Status
    nursingStatus: string;
    // Step 7 - Experience
    yearsOfExperience: string;
    // Step 8 - Destination
    preferredDestination: string[];
    // Step 9 - Job Search
    jobSearchStatus: string;
    // Step 10 - Timeline
    jobStartTimeline: string;
    // Step 11 - Terms
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
    { id: 'S1', name: 'Account', label: 'Create your account', question: 'Create your account', screenId: 'REG_S1_ACCOUNT' },
    { id: 'S2', name: 'Location', label: 'Location', question: 'Where are you currently living?', screenId: 'REG_S2_LOCATION' },
    { id: 'S3', name: 'Personal', label: 'About you', question: "What's your name?", screenId: 'REG_S3_PERSONAL' },
    { id: 'S4', name: 'Birthday', label: 'Birthday', question: 'When is your birthday?', screenId: 'REG_S4_BIRTHDAY' },
    { id: 'S5', name: 'Contact', label: 'Contact', question: "What's your phone number?", screenId: 'REG_S5_CONTACT' },
    { id: 'S6', name: 'NursingStatus', label: 'Nursing status', question: 'What is your current nursing status?', screenId: 'REG_S6_NURSING_STATUS' },
    { id: 'S7', name: 'Experience', label: 'Experience', question: 'How many years of nursing experience do you have?', screenId: 'REG_S7_EXPERIENCE' },
    { id: 'S8', name: 'Destination', label: 'Destination', question: 'Where would you like to work?', screenId: 'REG_S8_DESTINATION' },
    { id: 'S9', name: 'JobSearch', label: 'Job search', question: 'Are you currently looking for a new job?', screenId: 'REG_S9_JOB_SEARCH' },
    { id: 'S10', name: 'Timeline', label: 'Timeline', question: 'When are you planning to start a new job?', screenId: 'REG_S10_TIMELINE' },
    { id: 'S11', name: 'Terms', label: 'Terms', question: 'Almost there!', screenId: 'REG_S11_TERMS' },
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
        country: '',
        isFilipino: false,
        firstName: '',
        lastName: '',
        birthDate: null,
        mobile: '',
        nursingStatus: '',
        yearsOfExperience: '',
        preferredDestination: [],
        jobSearchStatus: '',
        jobStartTimeline: '',
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
    const [countries, setCountries] = useState<Array<{ code: string; name: string }>>([]);

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

    // Load countries on mount
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
            } else if (formData.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters';
            }
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        } else if (step === 1) {
            // Step 2 - Location
            if (!formData.country) {
                newErrors.country = 'Please select your country';
            }
            if (!formData.isFilipino) {
                newErrors.isFilipino = 'You must confirm that you are a Filipino national';
            }
        } else if (step === 2) {
            // Step 3 - Personal
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
        } else if (step === 3) {
            // Step 4 - Birthday
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
        } else if (step === 4) {
            // Step 5 - Contact (optional phone)
            if (formData.mobile.trim() && !validateMobile(formData.mobile)) {
                newErrors.mobile = 'Please enter a valid Philippine mobile number';
            }
        } else if (step === 5) {
            // Step 6 - Nursing Status
            if (!formData.nursingStatus) {
                newErrors.nursingStatus = 'Please select your nursing status';
            }
        } else if (step === 6) {
            // Step 7 - Experience
            if (!formData.yearsOfExperience) {
                newErrors.yearsOfExperience = 'Please select your years of experience';
            }
        } else if (step === 7) {
            // Step 8 - Destination
            if (formData.preferredDestination.length === 0) {
                newErrors.preferredDestination = 'Please select at least one destination';
            }
        } else if (step === 8) {
            // Step 9 - Job Search
            if (!formData.jobSearchStatus) {
                newErrors.jobSearchStatus = 'Please select an option';
            }
        } else if (step === 9) {
            // Step 10 - Timeline
            if (!formData.jobStartTimeline) {
                newErrors.jobStartTimeline = 'Please select a timeline';
            }
        } else if (step === 10) {
            // Step 11 - Terms
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
            const registrationData: NurseRegistrationData = {
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                
                // API required fields with correct format
                filipinoNational: formData.isFilipino ? 'yes' : 'no',
                birthDate: formData.birthDate ? formData.birthDate.format('YYYY-MM-DD') : undefined,
                currentLocationCountry: formData.country, // country code (ph, us, etc.)
                lookingForJob: formData.jobSearchStatus, // actively-looking, open-to-opportunities, not-currently-looking
                nursingStatus: formData.nursingStatus, // bsn-student, nle-student, newly-graduated, philippines-experienced, abroad-experienced
                
                // Optional phone
                phone: formData.mobile ? normalizeMobile(formData.mobile) : undefined,
                
                // Additional fields
                yearsOfExperience: formData.yearsOfExperience,
                preferredDestination: formData.preferredDestination,
                jobStartTimeline: formData.jobStartTimeline,
                termsAccepted: formData.agreedToTerms,
                sourcingCenter: 'Landing Page Funnel',
                
                // Add hidden fields if intent=APPLY
                ...(jobId && { job_id: jobId }),
                ...(campaignId && { campaign_id: campaignId }),
                ...(landingPageId && { landing_page_id: landingPageId }),
                // Add UTM parameters
                ...utmParams,
            };

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
        const currentQuestion = FORM_STEPS[currentStep]?.question || '';

        // Helper function to render question title with underlined last word
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
                        fontSize: { xs: '1.5rem', md: '1.75rem' },
                        lineHeight: 1.3
                    }}
                >
                    {restOfQuestion}{' '}
                    <Box 
                        component="span" 
                        sx={{ 
                            borderBottom: '3px solid',
                            borderColor: 'info.main',
                            pb: 0.5
                        }}
                    >
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
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                    Email *
                                </Typography>
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
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                    Password *
                                </Typography>
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
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    size="small"
                                                >
                                                    {showPassword ? <IconVisibilityOff /> : <IconVisibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                                />
                                <FormHelperText error={!!errors.password}>
                                    {errors.password || 'Minimum 8 characters.'}
                                </FormHelperText>
                            </FormControl>
                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                    Confirm Password *
                                </Typography>
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
                                                <IconButton
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                    size="small"
                                                >
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

            case 'S2': // Location
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderQuestionTitle(currentQuestion)}
                        <Stack spacing={3}>
                            <FormControl fullWidth error={!!errors.country}>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                    Country *
                                </Typography>
                                <Select
                                    value={formData.country}
                                    onChange={(e) => {
                                        setFormData({ ...formData, country: e.target.value });
                                        setErrors({ ...errors, country: '' });
                                    }}
                                    displayEmpty
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 300,
                                            },
                                        },
                                    }}
                                    sx={{ 
                                        borderRadius: 1,
                                        '& .MuiSelect-select': {
                                            color: formData.country ? 'inherit' : 'text.secondary',
                                        }
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Select your country
                                    </MenuItem>
                                    {countries.map((country) => (
                                        <MenuItem key={country.code} value={country.code}>
                                            {country.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.country && (
                                    <FormHelperText>{errors.country}</FormHelperText>
                                )}
                            </FormControl>

                            <Box
                                sx={{
                                    border: '1px solid',
                                    borderColor: errors.isFilipino ? 'error.main' : 'grey.300',
                                    borderRadius: 1,
                                    p: 2,
                                    bgcolor: 'background.paper',
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
                            <Typography variant="body2" color="text.secondary" sx={{ mt: -2 }}>
                                We can only accept Filipino nurses at the moment.
                            </Typography>
                            {errors.isFilipino && (
                                <FormHelperText error sx={{ mt: -2 }}>{errors.isFilipino}</FormHelperText>
                            )}
                        </Stack>
                    </Box>
                );

            case 'S3': // Personal - Name
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderQuestionTitle(currentQuestion)}
                        <Stack spacing={3}>
                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                    First Name *
                                </Typography>
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
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                    Last Name *
                                </Typography>
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

            case 'S4': // Birthday
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderQuestionTitle(currentQuestion)}
                        <Stack spacing={3}>
                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                    Date of Birth *
                                </Typography>
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
                        </Stack>
                    </Box>
                );

            case 'S5': // Contact - Phone
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderQuestionTitle(currentQuestion)}
                        <Stack spacing={3}>
                            <FormControl fullWidth>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                    Phone Number
                                </Typography>
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
                        </Stack>
                    </Box>
                );

            case 'S6': // Nursing Status
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
                            {errors.nursingStatus && (
                                <FormHelperText>{errors.nursingStatus}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                );

            case 'S7': // Experience
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderQuestionTitle(currentQuestion)}
                        <FormControl error={!!errors.yearsOfExperience} fullWidth>
                            <RadioGroup
                                value={formData.yearsOfExperience}
                                onChange={(e) => {
                                    setFormData({ ...formData, yearsOfExperience: e.target.value });
                                    setErrors({ ...errors, yearsOfExperience: '' });
                                }}
                            >
                                <Stack spacing={1.5}>
                                    {[
                                        { value: 'none', label: 'No experience yet' },
                                        { value: 'less_than_1', label: 'Less than 1 year' },
                                        { value: '1_to_2', label: '1-2 years' },
                                        { value: '3_to_5', label: '3-5 years' },
                                        { value: '5_to_10', label: '5-10 years' },
                                        { value: 'more_than_10', label: 'More than 10 years' },
                                    ].map((option) => (
                                        <Box
                                            key={option.value}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: formData.yearsOfExperience === option.value ? 'primary.main' : 'grey.300',
                                                borderRadius: 1,
                                                p: 1.5,
                                                transition: 'all 0.2s',
                                                cursor: 'pointer',
                                                '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
                                                bgcolor: formData.yearsOfExperience === option.value ? 'primary.lighter' : 'transparent',
                                            }}
                                            onClick={() => {
                                                setFormData({ ...formData, yearsOfExperience: option.value });
                                                setErrors({ ...errors, yearsOfExperience: '' });
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
                            {errors.yearsOfExperience && (
                                <FormHelperText>{errors.yearsOfExperience}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                );

            case 'S8': // Destination
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderQuestionTitle(currentQuestion)}
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Select all that apply
                        </Typography>
                        <FormControl error={!!errors.preferredDestination} fullWidth>
                            <Stack spacing={1.5}>
                                {[
                                    { value: 'philippines', label: 'Philippines' },
                                    { value: 'usa', label: 'USA' },
                                    { value: 'uk', label: 'United Kingdom' },
                                    { value: 'canada', label: 'Canada' },
                                    { value: 'australia', label: 'Australia' },
                                    { value: 'middle_east', label: 'Middle East (UAE, Saudi Arabia, Qatar)' },
                                    { value: 'singapore', label: 'Singapore' },
                                    { value: 'europe', label: 'Europe (Germany, Ireland, etc.)' },
                                    { value: 'anywhere', label: 'Open to anywhere' },
                                ].map((option) => (
                                    <Box
                                        key={option.value}
                                        sx={{
                                            border: '1px solid',
                                            borderColor: formData.preferredDestination.includes(option.value) ? 'primary.main' : 'grey.300',
                                            borderRadius: 1,
                                            p: 1.5,
                                            transition: 'all 0.2s',
                                            cursor: 'pointer',
                                            '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
                                            bgcolor: formData.preferredDestination.includes(option.value) ? 'primary.lighter' : 'transparent',
                                        }}
                                        onClick={() => {
                                            const newDestinations = formData.preferredDestination.includes(option.value)
                                                ? formData.preferredDestination.filter(d => d !== option.value)
                                                : [...formData.preferredDestination, option.value];
                                            setFormData({ ...formData, preferredDestination: newDestinations });
                                            setErrors({ ...errors, preferredDestination: '' });
                                        }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.preferredDestination.includes(option.value)}
                                                    size="small"
                                                />
                                            }
                                            label={option.label}
                                            sx={{ width: '100%', m: 0 }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                            {errors.preferredDestination && (
                                <FormHelperText>{errors.preferredDestination}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                );

            case 'S9': // Job Search
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
                            {errors.jobSearchStatus && (
                                <FormHelperText>{errors.jobSearchStatus}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                );

            case 'S10': // Timeline
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderQuestionTitle(currentQuestion)}
                        <FormControl error={!!errors.jobStartTimeline} fullWidth>
                            <RadioGroup
                                value={formData.jobStartTimeline}
                                onChange={(e) => {
                                    setFormData({ ...formData, jobStartTimeline: e.target.value });
                                    setErrors({ ...errors, jobStartTimeline: '' });
                                }}
                            >
                                <Stack spacing={1.5}>
                                    {[
                                        { value: 'immediately', label: 'Immediately / As soon as possible' },
                                        { value: '1_to_3_months', label: 'Within 1-3 months' },
                                        { value: '3_to_6_months', label: 'Within 3-6 months' },
                                        { value: '6_to_12_months', label: 'Within 6-12 months' },
                                        { value: 'more_than_1_year', label: 'More than 1 year from now' },
                                        { value: 'not_sure', label: "I'm not sure yet" },
                                    ].map((option) => (
                                        <Box
                                            key={option.value}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: formData.jobStartTimeline === option.value ? 'primary.main' : 'grey.300',
                                                borderRadius: 1,
                                                p: 1.5,
                                                transition: 'all 0.2s',
                                                cursor: 'pointer',
                                                '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
                                                bgcolor: formData.jobStartTimeline === option.value ? 'primary.lighter' : 'transparent',
                                            }}
                                            onClick={() => {
                                                setFormData({ ...formData, jobStartTimeline: option.value });
                                                setErrors({ ...errors, jobStartTimeline: '' });
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
                            {errors.jobStartTimeline && (
                                <FormHelperText>{errors.jobStartTimeline}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                );

            case 'S11': // Terms
                return (
                    <Box sx={{ width: '100%' }}>
                        {renderQuestionTitle(currentQuestion)}
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Review and accept our terms to complete your registration.
                        </Typography>
                        <Stack spacing={3}>
                            <Box
                                sx={{
                                    border: '1px solid',
                                    borderColor: errors.agreedToTerms ? 'error.main' : 'grey.300',
                                    borderRadius: 1,
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
                                            I agree to the{' '}
                                            <a 
                                                href="https://www.colpuno.com/privacy-notice" 
                                                target="_blank" 
                                                rel="noreferrer"
                                                style={{ color: '#173AA8' }}
                                            >
                                                Privacy Policy
                                            </a>{' '}
                                            and{' '}
                                            <a 
                                                href="https://www.colpuno.com/terms-and-conditions" 
                                                target="_blank" 
                                                rel="noreferrer"
                                                style={{ color: '#173AA8' }}
                                            >
                                                Terms of Service
                                            </a>{' '}
                                            of COLPUNO. *
                                        </Typography>
                                    }
                                />
                            </Box>
                            {errors.agreedToTerms && (
                                <FormHelperText error>{errors.agreedToTerms}</FormHelperText>
                            )}
                        </Stack>
                        
                        {submitError && (
                            <Alert severity="error" sx={{ mt: 3 }}>
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
                maxHeight: { xs: '100%', md: '90vh' },
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.paper',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3,
            }}
        >
            {/* Header with Linear Progress Bar */}
            <Box sx={{ bgcolor: 'primary.main', color: 'white', px: { xs: 3, md: 4 }, py: { xs: 2.5, md: 3 }, position: 'relative' }}>
                {onClose && (
                    <IconButton 
                        onClick={onClose}
                        sx={{ 
                            position: 'absolute', 
                            top: 12, 
                            right: 12, 
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
                        mb: 2.5, 
                        fontWeight: 700, 
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        fontSize: { xs: '0.85rem', md: '1rem' },
                        color: 'white'
                    }}
                >
                    Your Nursing Journey
                </Typography>
                
                {/* Linear Progress Bar */}
                <Box sx={{ width: '100%', mb: 1.5, px: { xs: 0, md: 2 } }}>
                    <Box 
                        sx={{ 
                            width: '100%', 
                            height: 4, 
                            bgcolor: 'rgba(255,255,255,0.3)', 
                            borderRadius: 2,
                            overflow: 'hidden'
                        }}
                    >
                        <Box 
                            sx={{ 
                                width: `${((currentStep + 1) / FORM_STEPS.length) * 100}%`, 
                                height: '100%', 
                                bgcolor: 'white',
                                borderRadius: 2,
                                transition: 'width 0.3s ease'
                            }} 
                        />
                    </Box>
                </Box>
                
                {/* Step Counter */}
                <Typography 
                    variant="body2" 
                    align="center" 
                    sx={{ 
                        color: 'rgba(255,255,255,0.85)',
                        fontSize: '0.8rem'
                    }}
                >
                    Step {currentStep + 1} of {FORM_STEPS.length}
                </Typography>
            </Box>

            {/* Form Content - Scrollable */}
            <Box 
                sx={{ 
                    p: { xs: 3, md: 4 }, 
                    pb: 2,
                    flex: 1, 
                    overflowY: 'auto',
                    minHeight: 0, // Important for flex scroll
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

            {/* Navigation buttons - Fixed at bottom */}
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
                    spacing={2}
                    sx={{
                        justifyContent: 'flex-end',
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
                                minWidth: 120,
                                borderRadius: 1, 
                                height: 48,
                                textTransform: 'none',
                                fontWeight: 500,
                                borderColor: 'grey.300',
                                color: 'text.primary',
                                '&:hover': {
                                    borderColor: 'grey.400',
                                    bgcolor: 'grey.50'
                                }
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
                            minWidth: 120,
                            borderRadius: 1, 
                            height: 48, 
                            bgcolor: 'primary.main',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                                bgcolor: 'primary.dark'
                            }
                        }}
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
