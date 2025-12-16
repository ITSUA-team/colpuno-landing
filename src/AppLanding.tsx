import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LandingPage } from './sections/landing-page';
import LandingThemeProvider from './theme';

const queryClient = new QueryClient();

const AppLanding = () => (
    <LandingThemeProvider>
        <QueryClientProvider client={queryClient}>
            <LandingPage />
        </QueryClientProvider>
    </LandingThemeProvider>
);

export default AppLanding;

