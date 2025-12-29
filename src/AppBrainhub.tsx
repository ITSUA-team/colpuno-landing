import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrainhubLanding } from './sections/brainhub-landing';
import LandingThemeProvider from './theme';

const queryClient = new QueryClient();

const AppBrainhub = () => {
    return (
        <LandingThemeProvider>
            <QueryClientProvider client={queryClient}>
                <BrainhubLanding />
            </QueryClientProvider>
        </LandingThemeProvider>
    );
};

export default AppBrainhub;

