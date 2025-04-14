import '@/styles/globals.scss';

import { Metadata } from 'next';
import { ReactNode } from 'react';

import { MainProvider } from '@/components/providers/MainProvider';
import SharedLayout from '@/components/layout/shared-layout';

export const metadata: Metadata = {
  title: 'Marketing Review Tool',
  description: '🚀'
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={'font-primary'} suppressHydrationWarning>
        <MainProvider>
          <SharedLayout>
            <main>{children}</main>
          </SharedLayout>
        </MainProvider>
      </body>
    </html>
  );
};

export default RootLayout;
