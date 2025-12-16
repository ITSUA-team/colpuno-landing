import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';

import { palette } from './theme/palette';
import * as overrides from './theme/overrides';

declare module '@mui/material/styles' {
    interface Theme {
        customShadows: {
            z8: string;
        };
    }
    interface ThemeOptions {
        customShadows?: {
            z8?: string;
        };
    }
}

const baseTheme = createTheme({
    palette: palette('light'),
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: 'Open Sans, sans-serif',
        h1: {
            fontFamily: 'Magra, serif',
        },
        h2: {
            fontFamily: 'Magra, serif',
        },
        h3: {
            fontFamily: 'Magra, serif',
        },
        h4: {
            fontFamily: 'Magra, serif',
        },
    },
    customShadows: {
        z8: '0px 8px 16px rgba(0, 0, 0, 0.12)',
    },
});

const theme = createTheme(baseTheme, {
    components: {
        ...overrides.typography(baseTheme),
        ...overrides.stepper(baseTheme),
        ...overrides.checkbox(baseTheme),
        ...overrides.button(baseTheme),
        ...overrides.accordion(baseTheme),
        ...overrides.textField(baseTheme),
        ...overrides.radio(baseTheme),
        ...overrides.formLabel(baseTheme),
        ...overrides.chip(baseTheme),
    },
});

type Props = {
    children: ReactNode;
};

const LandingThemeProvider = ({ children }: Props) => (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </MuiThemeProvider>
);

export default LandingThemeProvider;

