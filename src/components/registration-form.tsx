import {
    Alert,
    Box,
    Button,
    Checkbox,
    Chip,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs, { type Dayjs } from 'dayjs';

import StepTracker from './step-tracker';
import { trackRegCompleted } from '../sections/landing-page/utils/tracking';
import { registerNurse, type NurseRegistrationData, getOnboardData } from '../services/api.service';

interface RegistrationFormData {
    email: string;
    lookingForJob: string;
    nursingStatus: string;
    experienceYears: string;
    workedSpecialties: string[];
    currentLocationCountry: string;
    currentLocationRegion: string;
    preferredWorkLocation: string[];
    preferredCountries: string[];
    preferredCountriesOther: string[];
    desiredSpecialties: string[];
    firstName: string;
    lastName: string;
    birthDate: Dayjs | null;
    phone: string;
    termsAccepted: boolean;
}

interface RegistrationFormProps {
    initialEmail?: string;
    embedded?: boolean;
}

interface OptionItem {
    id: string;
    name: string;
    code?: string;
}

const steps = [
    'Email',
    'Job Search',
    'Nursing Status',
    'Experience',
    'Location',
    'Preferences',
    'Personal Info',
    'Complete',
];

function RegistrationForm({ initialEmail = '', embedded = false }: RegistrationFormProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState<RegistrationFormData>({
        email: initialEmail,
        lookingForJob: '',
        nursingStatus: '',
        experienceYears: '',
        workedSpecialties: [],
        currentLocationCountry: 'ph',
        currentLocationRegion: '',
        preferredWorkLocation: [],
        preferredCountries: [],
        preferredCountriesOther: [],
        desiredSpecialties: [],
        firstName: '',
        lastName: '',
        birthDate: null,
        phone: '',
        termsAccepted: false,
    });
    const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [countries, setCountries] = useState<OptionItem[]>([]);
    const [regions, setRegions] = useState<OptionItem[]>([]);
    const [specialties, setSpecialties] = useState<OptionItem[]>([]);
    const [loadingData, setLoadingData] = useState(false);

    useEffect(() => {
        if (initialEmail && !formData.email) {
            setFormData((prev) => ({ ...prev, email: initialEmail }));
        }
    }, [initialEmail]);

    useEffect(() => {
        const loadData = async () => {
            setLoadingData(true);
            try {
                const countriesRes = await getOnboardData('countries');
                if (countriesRes.data && Array.isArray(countriesRes.data)) {
                    setCountries(
                        countriesRes.data.map((item: any) => ({
                            id: item.id || item.code || '',
                            name: item.name || '',
                            code: item.code || item.id || '',
                        }))
                    );
                }

                const specialtiesRes = await getOnboardData('specialties');
                if (specialtiesRes.data && Array.isArray(specialtiesRes.data)) {
                    setSpecialties(
                        specialtiesRes.data.map((item: any) => ({
                            id: String(item.id || ''),
                            name: item.name || '',
                        }))
                    );
                }
            } catch (error) {
            } finally {
                setLoadingData(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        const loadRegions = async () => {
            if (!formData.currentLocationCountry) return;
            
            try {
                const regionsRes = await getOnboardData('regions', formData.currentLocationCountry);
                if (regionsRes.data && Array.isArray(regionsRes.data)) {
                    setRegions(
                        regionsRes.data.map((item: any) => ({
                            id: item.id || item.code || '',
                            name: item.name || '',
                            code: item.code || item.id || '',
                        }))
                    );
                } else {
                    setRegions([]);
                }
            } catch (error) {
                setRegions([]);
            }
        };

        if (formData.currentLocationCountry) {
            loadRegions();
        }
    }, [formData.currentLocationCountry]);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateStep = (step: number): boolean => {
        const newErrors: Partial<Record<keyof RegistrationFormData, string>> = {};

        if (step === 0) {
            if (!formData.email) {
                newErrors.email = 'Email is required';
            } else if (!validateEmail(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        if (step === 1) {
            if (!formData.lookingForJob) {
                newErrors.lookingForJob = 'Please select your job search status';
            }
        }

        if (step === 2) {
            if (!formData.nursingStatus) {
                newErrors.nursingStatus = 'Please select your nursing status';
            }
        }

        if (step === 3) {
            if (!formData.experienceYears) {
                newErrors.experienceYears = 'Please select your experience level';
            }
        }

        if (step === 4) {
            if (!formData.currentLocationCountry) {
                newErrors.currentLocationCountry = 'Please select your country';
            }
        }

        if (step === 5) {
            if (formData.preferredWorkLocation.length === 0) {
                newErrors.preferredWorkLocation = 'Please select at least one preferred work location';
            }
        }

        if (step === 6) {
            if (!formData.firstName.trim()) {
                newErrors.firstName = 'First name is required';
            }
            if (!formData.lastName.trim()) {
                newErrors.lastName = 'Last name is required';
            }
            if (!formData.birthDate) {
                newErrors.birthDate = 'Birth date is required';
            }
            if (!formData.phone.trim()) {
                newErrors.phone = 'Phone number is required';
            }
            if (!formData.termsAccepted) {
                newErrors.termsAccepted = 'You must accept the terms and conditions';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(activeStep)) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = async () => {
        if (!validateStep(activeStep)) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const registrationData: NurseRegistrationData = {
                lookingForJob: formData.lookingForJob,
                nursingStatus: formData.nursingStatus,
                experienceYears: formData.experienceYears,
                workedSpecialties: formData.workedSpecialties,
                currentLocationCountry: formData.currentLocationCountry,
                currentLocationRegion: formData.currentLocationRegion || undefined,
                preferredWorkLocation: formData.preferredWorkLocation,
                preferredCountries: formData.preferredCountries,
                preferredCountriesOther: formData.preferredCountriesOther,
                desiredSpecialties: formData.desiredSpecialties,
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim().toLowerCase(),
                phone: formData.phone.trim(),
                birthDate: formData.birthDate ? formData.birthDate.format('YYYY-MM-DD') : undefined,
                termsAccepted: formData.termsAccepted,
                sourcingCenter: 'Landing Page Funnel',
            };
            
            const cleanedData = Object.fromEntries(
                Object.entries(registrationData).filter(([_, value]) => value !== undefined)
            ) as NurseRegistrationData;

            const response = await registerNurse(cleanedData);

            if (response.error) {
                let errorMessage = response.error;
                if (errorMessage.includes('email') && errorMessage.toLowerCase().includes('already')) {
                    errorMessage = 'This email address is already registered. Please use a different email or try logging in.';
                } else if (errorMessage.includes('phone') && errorMessage.toLowerCase().includes('invalid')) {
                    errorMessage = 'Please enter a valid phone number in the format: +63 1234567890';
                } else if (errorMessage.includes('validation') || errorMessage.includes('required')) {
                    errorMessage = 'Please check that all required fields are filled correctly.';
                } else if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorMessage.includes('connection')) {
                    errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
                }
                
                setSubmitError(errorMessage);
                setIsSubmitting(false);
                return;
            }

            trackRegCompleted(formData.email);

            const pendingJobId = window.sessionStorage.getItem('pendingJobApplication');

            if (pendingJobId) {
                window.location.href = `https://www.colpuno.com/jobs/${encodeURIComponent(
                    pendingJobId
                )}?openConfirmApplication=1`;
            } else {
                window.location.href = '/';
            }
        } catch (error) {
            let errorMessage = 'An unexpected error occurred. Please try again.';
            
            if (error instanceof TypeError && error.message.includes('fetch')) {
                errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
            } else if (error instanceof Error) {
                errorMessage = error.message || errorMessage;
            }
            
            setSubmitError(errorMessage);
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof RegistrationFormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleArrayChange = (field: 'workedSpecialties' | 'preferredWorkLocation' | 'preferredCountries' | 'desiredSpecialties') => (
        value: string
    ) => {
        setFormData((prev) => {
            const currentArray = prev[field] as string[];
            const newArray = currentArray.includes(value)
                ? currentArray.filter((item) => item !== value)
                : [...currentArray, value];
            return { ...prev, [field]: newArray };
        });
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleDateChange = (date: Dayjs | null) => {
        setFormData((prev) => ({ ...prev, birthDate: date }));
        if (errors.birthDate) {
            setErrors((prev) => ({ ...prev, birthDate: undefined }));
        }
    };

    const handleCheckboxChange = (field: 'termsAccepted') => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.checked }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Stack spacing={{ xs: 2, md: 3 }}>
                        <Typography
                            variant='h6'
                            sx={{ mb: 1, fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
                        >
                            Start with your email
                        </Typography>
                        <Typography
                            variant='body2'
                            sx={{ mb: 2, fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
                        >
                            We&apos;ll send you a verification link to get started.
                        </Typography>
                        <TextField
                            fullWidth
                            label='Email address'
                            type='email'
                            placeholder='you@example.com'
                            value={formData.email}
                            onChange={handleChange('email')}
                            error={!!errors.email}
                            helperText={errors.email}
                            required
                            size='medium'
                            variant='outlined'
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'common.white',
                                    '& fieldset': {
                                        borderColor: 'neutral.300',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    backgroundColor: 'common.white',
                                    color: 'text.primary',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'text.secondary',
                                },
                            }}
                        />
                    </Stack>
                );

            case 1:
                return (
                    <Stack spacing={{ xs: 2, md: 3 }}>
                        <Typography
                            variant='h6'
                            sx={{ mb: 1, fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
                        >
                            Are you looking for a job?
                        </Typography>
                        <Typography
                            variant='body2'
                            sx={{ mb: 2, fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
                        >
                            Help us understand your current job search status.
                        </Typography>
                        <FormControl error={!!errors.lookingForJob} required>
                            <RadioGroup
                                value={formData.lookingForJob}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, lookingForJob: e.target.value }));
                                    if (errors.lookingForJob) {
                                        setErrors((prev) => ({ ...prev, lookingForJob: undefined }));
                                    }
                                }}
                            >
                                <FormControlLabel value='actively-looking' control={<Radio />} label='Actively looking' />
                                <FormControlLabel value='passively-looking' control={<Radio />} label='Passively looking' />
                                <FormControlLabel value='not-looking' control={<Radio />} label='Not looking right now' />
                            </RadioGroup>
                            {errors.lookingForJob && (
                                <Typography variant='caption' color='error' sx={{ mt: 0.5 }}>
                                    {errors.lookingForJob}
                                </Typography>
                            )}
                        </FormControl>
                    </Stack>
                );

            case 2:
                return (
                    <Stack spacing={{ xs: 2, md: 3 }}>
                        <Typography
                            variant='h6'
                            sx={{ mb: 1, fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
                        >
                            What is your nursing status?
                        </Typography>
                        <Typography
                            variant='body2'
                            sx={{ mb: 2, fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
                        >
                            Tell us about your nursing background.
                        </Typography>
                        <FormControl error={!!errors.nursingStatus} required>
                            <RadioGroup
                                value={formData.nursingStatus}
                                onChange={(e) => {
                                    setFormData((prev) => ({ ...prev, nursingStatus: e.target.value }));
                                    if (errors.nursingStatus) {
                                        setErrors((prev) => ({ ...prev, nursingStatus: undefined }));
                                    }
                                }}
                            >
                                <FormControlLabel
                                    value='philippines-experienced'
                                    control={<Radio />}
                                    label='Experienced nurse in Philippines'
                                />
                                <FormControlLabel
                                    value='philippines-new'
                                    control={<Radio />}
                                    label='New nurse in Philippines'
                                />
                                <FormControlLabel
                                    value='international-experienced'
                                    control={<Radio />}
                                    label='Experienced international nurse'
                                />
                            </RadioGroup>
                            {errors.nursingStatus && (
                                <Typography variant='caption' color='error' sx={{ mt: 0.5 }}>
                                    {errors.nursingStatus}
                                </Typography>
                            )}
                        </FormControl>
                    </Stack>
                );

            case 3:
                return (
                    <Stack spacing={{ xs: 2, md: 3 }}>
                        <Typography
                            variant='h6'
                            sx={{ mb: 1, fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
                        >
                            Your experience and specialties
                        </Typography>
                        <Typography
                            variant='body2'
                            sx={{ mb: 2, fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
                        >
                            Help us match you with the right opportunities.
                        </Typography>
                        <TextField
                            fullWidth
                            select
                            label='Years of experience'
                            value={formData.experienceYears}
                            onChange={handleChange('experienceYears')}
                            error={!!errors.experienceYears}
                            helperText={errors.experienceYears}
                            required
                            size='medium'
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value=''>Select experience level</option>
                            <option value='0'>Newly graduated (0 years)</option>
                            <option value='1-2'>1-2 years</option>
                            <option value='3-5'>3-5 years</option>
                            <option value='6-10'>6-10 years</option>
                            <option value='10+'>10+ years</option>
                        </TextField>
                        <Box>
                            <Typography variant='body2' sx={{ mb: 1 }}>
                                Specialties you&apos;ve worked in (optional)
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {specialties.slice(0, 10).map((specialty) => (
                                    <Chip
                                        key={specialty.id}
                                        label={specialty.name}
                                        onClick={() => handleArrayChange('workedSpecialties')(specialty.id)}
                                        color={formData.workedSpecialties.includes(specialty.id) ? 'primary' : 'default'}
                                        variant={formData.workedSpecialties.includes(specialty.id) ? 'filled' : 'outlined'}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Stack>
                );

            case 4:
                return (
                    <Stack spacing={{ xs: 2, md: 3 }}>
                        <Typography
                            variant='h6'
                            sx={{ mb: 1, fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
                        >
                            Your current location
                        </Typography>
                        <Typography
                            variant='body2'
                            sx={{ mb: 2, fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
                        >
                            Where are you currently located?
                        </Typography>
                        <TextField
                            fullWidth
                            select
                            label='Country'
                            value={formData.currentLocationCountry}
                            onChange={handleChange('currentLocationCountry')}
                            error={!!errors.currentLocationCountry}
                            helperText={errors.currentLocationCountry}
                            required
                            size='medium'
                            SelectProps={{
                                native: true,
                            }}
                            disabled={loadingData}
                        >
                            <option value=''>Select country</option>
                            {countries.map((country) => (
                                <option key={country.id} value={country.code || country.id}>
                                    {country.name}
                                </option>
                            ))}
                        </TextField>
                        {formData.currentLocationCountry && regions.length > 0 && (
                            <TextField
                                fullWidth
                                select
                                label='Region'
                                value={formData.currentLocationRegion}
                                onChange={handleChange('currentLocationRegion')}
                                size='medium'
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option value=''>Select region (optional)</option>
                                {regions.map((region) => (
                                    <option key={region.id} value={region.code || region.id}>
                                        {region.name}
                                    </option>
                                ))}
                            </TextField>
                        )}
                    </Stack>
                );

            case 5:
                return (
                    <Stack spacing={{ xs: 2, md: 3 }}>
                        <Typography
                            variant='h6'
                            sx={{ mb: 1, fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
                        >
                            Where would you like to work?
                        </Typography>
                        <Typography
                            variant='body2'
                            sx={{ mb: 2, fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
                        >
                            Select your preferred work locations and countries.
                        </Typography>
                        <FormControl error={!!errors.preferredWorkLocation} required>
                            <FormLabel>Preferred work location</FormLabel>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                {['international', 'philippines', 'both'].map((option) => (
                                    <Chip
                                        key={option}
                                        label={option.charAt(0).toUpperCase() + option.slice(1)}
                                        onClick={() => handleArrayChange('preferredWorkLocation')(option)}
                                        color={formData.preferredWorkLocation.includes(option) ? 'primary' : 'default'}
                                        variant={formData.preferredWorkLocation.includes(option) ? 'filled' : 'outlined'}
                                    />
                                ))}
                            </Box>
                            {errors.preferredWorkLocation && (
                                <Typography variant='caption' color='error' sx={{ mt: 0.5 }}>
                                    {errors.preferredWorkLocation}
                                </Typography>
                            )}
                        </FormControl>
                        {formData.preferredWorkLocation.includes('international') && (
                            <Box>
                                <Typography variant='body2' sx={{ mb: 1 }}>
                                    Preferred countries (optional)
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {countries
                                        .filter((c) => c.code !== 'ph')
                                        .slice(0, 10)
                                        .map((country) => (
                                            <Chip
                                                key={country.id}
                                                label={country.name}
                                                onClick={() => handleArrayChange('preferredCountries')(country.code || country.id)}
                                                color={formData.preferredCountries.includes(country.code || country.id) ? 'primary' : 'default'}
                                                variant={formData.preferredCountries.includes(country.code || country.id) ? 'filled' : 'outlined'}
                                            />
                                        ))}
                                </Box>
                            </Box>
                        )}
                        <Box>
                            <Typography variant='body2' sx={{ mb: 1 }}>
                                Desired specialties (optional)
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {specialties.slice(0, 10).map((specialty) => (
                                    <Chip
                                        key={specialty.id}
                                        label={specialty.name}
                                        onClick={() => handleArrayChange('desiredSpecialties')(specialty.id)}
                                        color={formData.desiredSpecialties.includes(specialty.id) ? 'primary' : 'default'}
                                        variant={formData.desiredSpecialties.includes(specialty.id) ? 'filled' : 'outlined'}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Stack>
                );

            case 6:
                return (
                    <Stack spacing={{ xs: 2, md: 3 }}>
                        <Typography
                            variant='h6'
                            sx={{ mb: 1, fontSize: { xs: '1.125rem', sm: '1.25rem' } }}
                        >
                            Personal information
                        </Typography>
                        <Typography
                            variant='body2'
                            sx={{ mb: 2, fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
                        >
                            Tell us about yourself.
                        </Typography>
                        <TextField
                            fullWidth
                            label='First name'
                            value={formData.firstName}
                            onChange={handleChange('firstName')}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                            required
                            size='medium'
                        />
                        <TextField
                            fullWidth
                            label='Last name'
                            value={formData.lastName}
                            onChange={handleChange('lastName')}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                            required
                            size='medium'
                        />
                        <DatePicker
                            label='Birth date'
                            value={formData.birthDate}
                            onChange={handleDateChange}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    error: !!errors.birthDate,
                                    helperText: errors.birthDate,
                                    required: true,
                                    size: 'medium' as const,
                                },
                            }}
                        />
                        <TextField
                            fullWidth
                            label='Phone number'
                            type='tel'
                            placeholder='+63 912 345 6789'
                            value={formData.phone}
                            onChange={handleChange('phone')}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            required
                            size='medium'
                        />
                        <FormControl error={!!errors.termsAccepted} required>
                            <FormControlLabel
                                control={<Checkbox checked={formData.termsAccepted} onChange={handleCheckboxChange('termsAccepted')} />}
                                label='I accept the terms and conditions'
                            />
                            {errors.termsAccepted && (
                                <Typography variant='caption' color='error' sx={{ mt: 0.5 }}>
                                    {errors.termsAccepted}
                        </Typography>
                            )}
                        </FormControl>
                    </Stack>
                );

            case 7:
                return (
                    <Stack spacing={{ xs: 2, md: 3 }} sx={{ textAlign: 'center', py: { xs: 1, md: 2 } }}>
                        <Typography
                            variant='h5'
                            sx={{ mb: 1, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                        >
                            🎉 Almost there!
                        </Typography>
                        <Typography
                            variant='body1'
                            sx={{ mb: { xs: 2, md: 3 }, fontSize: { xs: '0.875rem', sm: '1rem' } }}
                        >
                            Review your information and click &quot;Complete Registration&quot; to finish.
                        </Typography>
                        <AnimatePresence>
                            {submitError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Alert
                                        severity='error'
                                        onClose={() => setSubmitError(null)}
                                        sx={{
                                            mb: 2,
                                            borderRadius: 2,
                                            '& .MuiAlert-icon': {
                                                alignItems: 'center',
                                            },
                                            '& .MuiAlert-message': {
                                                fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                                                lineHeight: 1.5,
                                            },
                                        }}
                                    >
                                        {submitError}
                                    </Alert>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <Box
                            sx={{
                                backgroundColor: 'neutral.50',
                                borderRadius: 2,
                                p: { xs: 2, md: 3 },
                                textAlign: 'left',
                            }}
                        >
                            <Typography variant='body2' sx={{ mb: 1, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                                <strong>Email:</strong> {formData.email}
                            </Typography>
                            <Typography variant='body2' sx={{ mb: 1, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                                <strong>Name:</strong> {formData.firstName} {formData.lastName}
                            </Typography>
                            <Typography variant='body2' sx={{ mb: 1, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                                <strong>Phone:</strong> {formData.phone}
                            </Typography>
                            <Typography variant='body2' sx={{ mb: 1, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                                <strong>Experience:</strong> {formData.experienceYears} years
                            </Typography>
                            <Typography variant='body2' sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                                <strong>Location:</strong> {countries.find((c) => c.code === formData.currentLocationCountry)?.name || formData.currentLocationCountry}
                            </Typography>
                        </Box>
                    </Stack>
                );

            default:
                return null;
        }
    };

    const stepItems = steps.map((label, index) => ({ step: index + 1, label }));

    // Форма всегда используется в модалке (embedded режим)
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '100%', md: '100%' },
                mx: 'auto',
                p: { xs: 1, sm: 2, md: 2.5 },
                backgroundColor: 'transparent',
            }}
        >
            <StepTracker steps={stepItems} currentStep={activeStep + 1} />

            <Box sx={{ mb: { xs: 2.5, md: 3 } }}>{renderStepContent(activeStep)}</Box>

                    <Stack
                        direction='row'
                        spacing={2}
                        sx={{
                            justifyContent: 'space-between',
                            flexWrap: { xs: 'wrap', sm: 'nowrap' },
                            gap: { xs: 2, sm: 0 },
                        }}
                    >
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{
                                minWidth: { xs: '80px', sm: '100px' },
                                order: { xs: 2, sm: 1 },
                                width: { xs: 'calc(50% - 8px)', sm: 'auto' },
                            }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: { xs: 'none', sm: '1 1 auto' }, display: { xs: 'none', sm: 'block' } }} />
                        {activeStep === steps.length - 1 ? (
                            <Button
                                variant='contained'
                                onClick={handleSubmit}
                        disabled={isSubmitting}
                                sx={{
                                    minWidth: { xs: 'calc(50% - 8px)', sm: '180px' },
                                    order: { xs: 1, sm: 2 },
                                    width: { xs: '100%', sm: 'auto' },
                                }}
                            >
                        {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                            </Button>
                        ) : (
                            <Button
                                variant='contained'
                                onClick={handleNext}
                                sx={{
                                    minWidth: { xs: 'calc(50% - 8px)', sm: '100px' },
                                    order: { xs: 1, sm: 2 },
                                    width: { xs: '100%', sm: 'auto' },
                                }}
                            >
                                Next
                            </Button>
                        )}
                    </Stack>
        </Box>
    );
}

export default RegistrationForm;

