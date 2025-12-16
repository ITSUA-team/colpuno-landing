import { Step, StepLabel, Stepper } from '@mui/material';

interface StepTrackerProps {
    steps: { step: number; label: string }[];
    currentStep: number;
    jobApply?: boolean;
}

const StepTracker = ({ steps, currentStep, jobApply }: StepTrackerProps) => (
    <Stepper
        alternativeLabel
        activeStep={currentStep - 1}
        sx={{
            width: jobApply ? '312px' : '100%',
            maxWidth: '100%',
            margin: { xs: '10px auto 20px auto', sm: '20px auto 40px auto' },
        }}
    >
        {steps.map(({ step, label }) => (
            <Step key={step}>
                <StepLabel>{label}</StepLabel>
            </Step>
        ))}
    </Stepper>
);

export default StepTracker;
