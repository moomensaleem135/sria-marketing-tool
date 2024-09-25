import { Providers } from '@/store/provider';
import { MuiThemeProvider } from '@/theme/provider';
import { ReactNode } from 'react';


interface Props {
  children: ReactNode;
}

// This is the place responsible for grouping all providers from the app
export const MainProvider = ({ children }: Props) => (
  <MuiThemeProvider>
    {' '}
    <Providers>{children}</Providers>
  </MuiThemeProvider>
);
