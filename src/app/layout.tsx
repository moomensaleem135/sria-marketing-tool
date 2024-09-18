import '@/styles/globals.scss';

import { Metadata } from 'next';
import { ReactNode } from 'react';

import { MainProvider } from '@/components/providers/MainProvider';

export const metadata: Metadata = {
  title: 'Securia CCO Portal',
  description:
    '🚀'
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={'font-primary'} suppressHydrationWarning>
        <MainProvider>
            <main>{children}</main>
        </MainProvider>
      </body>
    </html>
  );
};

export default RootLayout;
