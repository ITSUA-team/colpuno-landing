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
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IconVisibility from '../assets/icon-components/icon-visibility';
import IconVisibilityOff from '../assets/icon-components/icon-visibility-off';
import IconCheckCircle from '../assets/icon-components/icon-check-circle';
import IconLocation from '../assets/icon-components/icon-location';

import {
    getOnboardData,
    registerNurse,
    sendVerificationEmail,
    checkEmailVerified,
    type NurseRegistrationData,
} from '../services/api.service';
import {
    trackOnboardingStarted,
    trackOnboardingStepCompleted,
    trackEmailVerificationSent,
    trackEmailVerified,
    trackRegCompleted,
} from '../sections/landing-page/utils/tracking';

interface MultiStepRegistrationFormProps {
    initialEmail?: string;
    embedded?: boolean;
    jobId?: string;
    campaignId?: string;
    landingPageId?: string;
}

interface FormData {
    // A1 - Email
    email: string;
    // A2 - Email verification
    emailVerified: boolean;
    // A3 - Password
    password: string;
    confirmPassword: string;
    // A4 - Name
    firstName: string;
    lastName: string;
    // A5 - Journey stage
    journeyStage: string;
    // A6 - Location
    province: string;
    city: string;
    // A7 - Mobile
    mobile: string;
    optInViber: boolean;
    optInWhatsApp: boolean;
    optInMessenger: boolean;
}

const PRE_LOGIN_STEPS = [
    { id: 'A1', name: 'Email', label: 'Enter your email', screenId: 'REG_FG_A1_EMAIL' },
    { id: 'A2', name: 'Verify Email', label: 'Verify your email', screenId: 'REG_FG_A2_VERIFY_EMAIL' },
    { id: 'A3', name: 'Account Details', label: 'Complete your profile', screenId: 'REG_FG_A3_PASSWORD' },
    { id: 'A4', name: 'Location', label: 'Select your location', screenId: 'REG_FG_A6_LOCATION' },
    { id: 'A5', name: 'Intent Bridge', label: 'Complete registration', screenId: 'REG_FG_A8_BRIDGE' },
];

function MultiStepRegistrationForm({
    initialEmail = '',
    embedded = false,
    jobId,
    campaignId,
    landingPageId,
}: MultiStepRegistrationFormProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        email: initialEmail,
        emailVerified: false,
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        journeyStage: '',
        province: '',
        city: '',
        mobile: '',
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
    const [resendCooldown, setResendCooldown] = useState(0);
    const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);

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

    // Resend cooldown timer
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    // Track onboarding started
    useEffect(() => {
        if (currentStep === 0 && initialEmail) {
            const source = jobId ? 'apply' : 'cta';
            trackOnboardingStarted(source, jobId ? Number(jobId) : undefined);
        }
    }, [initialEmail, jobId]);

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
            // A1 - Email
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!validateEmail(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
        } else if (step === 1) {
            // A2 - Verify email
            if (!formData.emailVerified) {
                newErrors.emailVerified = 'Please verify your email before continuing';
            }
        } else if (step === 2) {
            // A3 - Combined: Email (read-only), Password, Name, Journey Stage, Mobile
            if (!formData.password) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 10) {
                newErrors.password = 'Password must be at least 10 characters';
            }
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
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
            if (!formData.journeyStage) {
                newErrors.journeyStage = 'Please select your journey stage';
            }
            if (!formData.mobile.trim()) {
                newErrors.mobile = 'Mobile number is required';
            } else if (!validateMobile(formData.mobile)) {
                newErrors.mobile = 'Please enter a valid Philippine mobile number (e.g., +63 912 345 6789 or 0912 345 6789)';
            }
        } else if (step === 3) {
            // A4 - Location
            if (!formData.province) {
                newErrors.province = 'Please select your province';
            }
            if (!formData.city) {
                newErrors.city = 'Please select your city/municipality';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = async () => {
        if (!validateStep(currentStep)) {
            return;
        }

        // Special handling for A1 - send verification email
        if (currentStep === 0) {
            try {
                setIsVerifyingEmail(true);
                const response = await sendVerificationEmail(formData.email);
                // Always continue to next step, even if API fails
                if (!response.error) {
                    trackEmailVerificationSent();
                }
                trackOnboardingStepCompleted('REG_FG_A1_EMAIL');
                setCurrentStep(1);
            } catch (error) {
                // Continue even if API call fails
                trackOnboardingStepCompleted('REG_FG_A1_EMAIL');
                setCurrentStep(1);
            } finally {
                setIsVerifyingEmail(false);
            }
            return;
        }

        // A2 verification is handled in the button click, not here
        if (currentStep === 1) {
            return;
        }

        // Track step completion
        // For combined step A3, track all the individual steps that were combined
        if (currentStep === 2) {
            trackOnboardingStepCompleted('REG_FG_A3_PASSWORD');
            trackOnboardingStepCompleted('REG_FG_A4_NAME');
            trackOnboardingStepCompleted('REG_FG_A5_STAGE');
            trackOnboardingStepCompleted('REG_FG_A7_MOBILE');
        } else {
            const stepId = PRE_LOGIN_STEPS[currentStep]?.screenId;
            if (stepId) {
                trackOnboardingStepCompleted(stepId);
            }
        }

        if (currentStep < PRE_LOGIN_STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // A5 - Intent bridge - submit form
            await handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleResendEmail = async () => {
        if (resendCooldown > 0) return;
        try {
            setResendCooldown(30);
            const response = await sendVerificationEmail(formData.email);
            if (response.error) {
                setErrors({ emailVerified: response.error || 'Failed to resend email. Please try again.' });
            } else {
                trackEmailVerificationSent();
            }
        } catch (error) {
            setErrors({ emailVerified: 'Failed to resend email. Please try again.' });
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(currentStep)) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Get UTM parameters from sessionStorage
            const utmParamsStr = sessionStorage.getItem('utm_params');
            const utmParams = utmParamsStr ? JSON.parse(utmParamsStr) : {};

            const registrationData: NurseRegistrationData = {
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                phone: normalizeMobile(formData.mobile),
                currentLocationCountry: 'ph',
                currentLocationRegion: formData.province,
                sourcingCenter: 'Landing Page Funnel',
                // Add city if available
                ...(formData.city && { currentLocationCity: formData.city }),
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
            trackOnboardingStepCompleted('REG_FG_A8_BRIDGE');

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
            trackOnboardingStepCompleted('REG_FG_A8_BRIDGE');
            
            if (jobId) {
                window.location.href = `https://www.colpuno.com/jobs/${encodeURIComponent(jobId)}?openConfirmApplication=1`;
            } else {
                window.location.href = 'https://www.colpuno.com/login';
            }
        }
    };

    const renderStep = () => {
        const step = PRE_LOGIN_STEPS[currentStep];
        if (!step) return null;

        switch (step.id) {
            case 'A1':
                return (
                    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto' }}>
                        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, textAlign: 'center' }}>
                            Start with your email
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                            We&apos;ll send a verification email link. One email = one COLPUNO profile.
                        </Typography>
                        {errors.email && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {errors.email}
                            </Alert>
                        )}
                        <TextField
                            fullWidth
                            label="Email address"
                            placeholder="you@example.com"
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value });
                                setErrors({ ...errors, email: '' });
                            }}
                            error={!!errors.email}
                            helperText={errors.email ? '' : 'Enter your email address'}
                            disabled={isVerifyingEmail}
                        />
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Button
                                variant="text"
                                onClick={() => (window.location.href = 'https://www.colpuno.com/login')}
                                sx={{ textTransform: 'none' }}
                            >
                                I already have an account → Log in
                            </Button>
                        </Box>
                    </Box>
                );

            case 'A2':
                return (
                    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto' }}>
                        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, textAlign: 'center' }}>
                            Check your email
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                            Click the verification link we sent (check Spam/Promotions).
                        </Typography>
                        <Alert severity="info" sx={{ mb: 2 }}>
                            We sent a verification email link to <strong>{formData.email}</strong>
                        </Alert>
                        {errors.emailVerified && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {errors.emailVerified}
                            </Alert>
                        )}
                        <Stack spacing={2}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={async () => {
                                    try {
                                        const response = await checkEmailVerified(formData.email);
                                        // Always continue to next step, even if API fails
                                        if (!response.error && response.data?.verified) {
                                            trackEmailVerified();
                                        }
                                        setFormData({ ...formData, emailVerified: true });
                                        trackOnboardingStepCompleted('REG_FG_A2_VERIFY_EMAIL');
                                        setCurrentStep(2);
                                    } catch (error) {
                                        // Continue even if API call fails
                                        setFormData({ ...formData, emailVerified: true });
                                        trackOnboardingStepCompleted('REG_FG_A2_VERIFY_EMAIL');
                                        setCurrentStep(2);
                                    }
                                }}
                            >
                                I&apos;ve verified → Continue
                            </Button>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={handleResendEmail}
                                disabled={resendCooldown > 0}
                            >
                                {resendCooldown > 0 ? `Resend email (${resendCooldown}s)` : 'Resend email'}
                            </Button>
                            <Button
                                variant="text"
                                fullWidth
                                onClick={() => {
                                    setCurrentStep(0);
                                    setErrors({});
                                }}
                                sx={{ textTransform: 'none' }}
                            >
                                Change email
                            </Button>
                        </Stack>
                    </Box>
                );

            case 'A3':
                return (
                    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto' }}>
                        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, textAlign: 'center' }}>
                            Complete your profile
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                            Let&apos;s set up your account with your basic information.
                        </Typography>
                        <Stack spacing={2}>
                            {/* Email - Read-only */}
                            <TextField
                                fullWidth
                                label="Email address"
                                value={formData.email}
                                disabled
                                sx={{
                                    '& .MuiInputBase-input.Mui-disabled': {
                                        WebkitTextFillColor: 'text.primary',
                                    },
                                }}
                                helperText="This email was verified"
                            />
                            
                            {/* Password */}
                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData({ ...formData, password: e.target.value });
                                    setErrors({ ...errors, password: '' });
                                }}
                                error={!!errors.password}
                                helperText={errors.password || 'Minimum 10 characters'}
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
                            />
                            <TextField
                                fullWidth
                                label="Confirm password"
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
                            />
                            
                            {/* Name */}
                            <TextField
                                fullWidth
                                label="First name"
                                value={formData.firstName}
                                onChange={(e) => {
                                    setFormData({ ...formData, firstName: e.target.value });
                                    setErrors({ ...errors, firstName: '' });
                                }}
                                error={!!errors.firstName}
                                helperText={errors.firstName || 'Letters, hyphens, and apostrophes allowed'}
                            />
                            <TextField
                                fullWidth
                                label="Last name"
                                value={formData.lastName}
                                onChange={(e) => {
                                    setFormData({ ...formData, lastName: e.target.value });
                                    setErrors({ ...errors, lastName: '' });
                                }}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                            />
                            
                            {/* Journey Stage */}
                            <FormControl error={!!errors.journeyStage} fullWidth>
                                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                    Journey stage
                                </Typography>
                                <RadioGroup
                                    value={formData.journeyStage}
                                    onChange={(e) => {
                                        setFormData({ ...formData, journeyStage: e.target.value });
                                        setErrors({ ...errors, journeyStage: '' });
                                    }}
                                >
                                    <FormControlLabel
                                        value="newly_registered"
                                        control={<Radio />}
                                        label="Newly Registered RN (PRC Licensed)"
                                    />
                                    <FormControlLabel
                                        value="waiting_results"
                                        control={<Radio />}
                                        label="Waiting for board results"
                                    />
                                    <FormControlLabel
                                        value="student"
                                        control={<Radio />}
                                        label="Nursing student"
                                    />
                                </RadioGroup>
                                {errors.journeyStage && (
                                    <FormHelperText>{errors.journeyStage}</FormHelperText>
                                )}
                            </FormControl>
                            
                            {/* Mobile */}
                            <TextField
                                fullWidth
                                label="Mobile number"
                                placeholder="+63 912 345 6789 or 0912 345 6789"
                                value={formData.mobile}
                                onChange={(e) => {
                                    setFormData({ ...formData, mobile: e.target.value });
                                    setErrors({ ...errors, mobile: '' });
                                }}
                                error={!!errors.mobile}
                                helperText={errors.mobile || 'Philippine mobile format: +63 9XX XXX XXXX or 09XX XXX XXXX'}
                            />
                            <Box sx={{ mt: 1 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.optInViber}
                                            onChange={(e) =>
                                                setFormData({ ...formData, optInViber: e.target.checked })
                                            }
                                        />
                                    }
                                    label="Receive updates via Viber (when available)"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.optInWhatsApp}
                                            onChange={(e) =>
                                                setFormData({ ...formData, optInWhatsApp: e.target.checked })
                                            }
                                        />
                                    }
                                    label="Receive updates via WhatsApp (when available)"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.optInMessenger}
                                            onChange={(e) =>
                                                setFormData({ ...formData, optInMessenger: e.target.checked })
                                            }
                                        />
                                    }
                                    label="Receive updates via Messenger (when available)"
                                />
                            </Box>
                        </Stack>
                    </Box>
                );

            case 'A4':
                return (
                    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto' }}>
                        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, textAlign: 'center' }}>
                            Your location
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                            Where in the Philippines are you based?
                        </Typography>
                        <Stack spacing={2}>
                            <TextField
                                select
                                fullWidth
                                label="Province"
                                value={formData.province}
                                onChange={(e) => {
                                    setFormData({ ...formData, province: e.target.value, city: '' });
                                    setErrors({ ...errors, province: '' });
                                }}
                                error={!!errors.province}
                                helperText={errors.province || 'Select your province'}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconLocation sx={{ color: 'text.secondary', fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                {provinces.map((province) => (
                                    <MenuItem key={province.id} value={province.id}>
                                        {province.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                fullWidth
                                label="City/Municipality"
                                value={formData.city}
                                onChange={(e) => {
                                    setFormData({ ...formData, city: e.target.value });
                                    setErrors({ ...errors, city: '' });
                                }}
                                error={!!errors.city}
                                helperText={
                                    errors.city ||
                                    (formData.province
                                        ? cities.length > 0
                                            ? 'Select your city or municipality'
                                            : 'Loading cities...'
                                        : 'Please select a province first')
                                }
                                disabled={!formData.province || cities.length === 0}
                                placeholder={!formData.province ? 'Select province first' : 'Select city'}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconLocation sx={{ color: 'text.secondary', fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }}
                            >
                                {cities.length > 0 ? (
                                    cities.map((city) => (
                                        <MenuItem key={city.id} value={city.id}>
                                            {city.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled value="">
                                        {formData.province ? 'No cities available' : 'Select province first'}
                                    </MenuItem>
                                )}
                            </TextField>
                        </Stack>
                    </Box>
                );

            case 'A5':
                return (
                    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, textAlign: 'center' }}>
                            {jobId
                                ? "You're almost done... Continue to confirm application"
                                : 'Welcome... Go to my dashboard'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                            {jobId
                                ? 'Complete your registration to apply for this job.'
                                : 'Your profile is ready. Start exploring opportunities.'}
                        </Typography>
                        {submitError && !submitError.includes('Unable to connect') && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {submitError}
                            </Alert>
                        )}
                        {isSubmitting && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                Redirecting to {jobId ? 'job page' : 'login page'}...
                            </Typography>
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
                px: { xs: 2, md: 3 },
                py: { xs: 3, md: 4 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: { xs: 'auto', md: '100%' },
            }}
        >
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 3, md: 4 }}
                sx={{
                    alignItems: { xs: 'stretch', md: 'center' },
                    width: '100%',
                    justifyContent: 'center',
                }}
            >
                {/* Vertical Stepper */}
                <Box
                    sx={{
                        width: { xs: '100%', md: 280 },
                        flexShrink: 0,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 3,
                            fontWeight: 600,
                            fontSize: { xs: '1.125rem', md: '1.25rem' },
                        }}
                    >
                        Registration Steps
                    </Typography>
                    <Stack spacing={0}>
                        {PRE_LOGIN_STEPS.map((step, index) => {
                            const isCompleted = index < currentStep;
                            const isActive = index === currentStep;

                            return (
                                <Box key={step.id} sx={{ position: 'relative' }}>
                                    {/* Connector line */}
                                    {index < PRE_LOGIN_STEPS.length - 1 && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                left: 15,
                                                top: 40,
                                                width: 2,
                                                height: isCompleted ? '100%' : 'calc(100% - 40px)',
                                                bgcolor: isCompleted
                                                    ? 'primary.main'
                                                    : 'grey.300',
                                                transition: 'background-color 0.3s ease',
                                                zIndex: 0,
                                            }}
                                        />
                                    )}
                                    {/* Step content */}
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        sx={{
                                            position: 'relative',
                                            zIndex: 1,
                                            py: 1.5,
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        {/* Step icon */}
                                        <Box
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: isCompleted
                                                    ? 'primary.main'
                                                    : isActive
                                                      ? 'primary.main'
                                                      : 'grey.200',
                                                color: isCompleted || isActive ? 'white' : 'grey.500',
                                                fontWeight: 600,
                                                fontSize: '0.875rem',
                                                flexShrink: 0,
                                                transition: 'all 0.3s ease',
                                                border: isActive && !isCompleted ? '2px solid' : 'none',
                                                borderColor: isActive ? 'primary.main' : 'transparent',
                                            }}
                                        >
                                            {isCompleted ? (
                                                <IconCheckCircle
                                                    sx={{
                                                        fontSize: 20,
                                                        color: 'white',
                                                    }}
                                                />
                                            ) : (
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 600,
                                                        color: 'inherit',
                                                    }}
                                                >
                                                    {index + 1}
                                                </Typography>
                                            )}
                                        </Box>
                                        {/* Step label */}
                                        <Box sx={{ flex: 1, pt: 0.5 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: isActive ? 600 : 500,
                                                    color: isActive
                                                        ? 'primary.main'
                                                        : isCompleted
                                                          ? 'text.primary'
                                                          : 'text.secondary',
                                                    mb: 0.5,
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                {step.label}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: isActive
                                                        ? 'text.primary'
                                                        : 'text.secondary',
                                                    fontSize: '0.75rem',
                                                }}
                                            >
                                                {step.name}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                            );
                        })}
                    </Stack>
                </Box>

                {/* Step content */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: 0,
                        maxWidth: { xs: '100%', md: 600 },
                    }}
                >
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

                    {/* Navigation buttons */}
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            mt: 4,
                            position: isMobile ? 'fixed' : 'static',
                            bottom: isMobile ? 0 : 'auto',
                            left: isMobile ? 0 : 'auto',
                            right: isMobile ? 0 : 'auto',
                            p: isMobile ? 2 : 0,
                            bgcolor: isMobile ? 'background.paper' : 'transparent',
                            boxShadow: isMobile ? 3 : 'none',
                            zIndex: isMobile ? 1000 : 'auto',
                            justifyContent: 'center',
                            maxWidth: { xs: '100%', md: 500 },
                            mx: 'auto',
                        }}
                    >
                        {currentStep > 0 && (
                            <Button
                                variant="outlined"
                                onClick={handleBack}
                                disabled={isSubmitting}
                                sx={{ flex: isMobile ? 1 : 'none' }}
                            >
                                Back
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            disabled={isSubmitting || (isVerifyingEmail && currentStep === 0)}
                            sx={{ flex: isMobile ? 1 : 'none' }}
                            fullWidth={isMobile}
                        >
                            {currentStep === 0
                                ? isVerifyingEmail
                                    ? 'Sending...'
                                    : 'Continue'
                                : currentStep === PRE_LOGIN_STEPS.length - 1
                                  ? isSubmitting
                                      ? 'Creating account...'
                                      : 'Continue'
                                  : 'Continue'}
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
}

export default MultiStepRegistrationForm;
