import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LandingPage } from './sections/landing-page';
import PioneersPage from './sections/pioneers-page/pioneers-page';
import LandingThemeProvider from './theme';
import { PAGE_CONFIGS, type PageVariant } from './config';

const queryClient = new QueryClient();

interface AppLandingProps {
    variant?: PageVariant | 'pioneers';
}

const AppLanding = ({ variant = 'fresh-grads' }: AppLandingProps) => {
    if (variant === 'pioneers') {
        return (
            <LandingThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <PioneersPage />
                </QueryClientProvider>
            </LandingThemeProvider>
        );
    }

    const config = PAGE_CONFIGS[variant];
    
    return (
        <LandingThemeProvider>
            <QueryClientProvider client={queryClient}>
                <LandingPage config={config} />
            </QueryClientProvider>
        </LandingThemeProvider>
    );
};

export default AppLanding;

