import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import RegistrationForm from './components/registration-form';
import LandingThemeProvider from './theme';

interface AppRegistrationProps {
    initialEmail?: string;
    embedded?: boolean;
}

const AppRegistration = ({ initialEmail = '', embedded = true }: AppRegistrationProps) => (
    <LandingThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RegistrationForm initialEmail={initialEmail} embedded={embedded} />
        </LocalizationProvider>
    </LandingThemeProvider>
);

export default AppRegistration;
