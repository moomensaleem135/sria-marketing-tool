import '@/styles/globals.scss';

import { Metadata } from 'next';
import React, { ReactNode } from 'react';

import { MainProvider } from '@/components/providers/MainProvider';
import SharedLayout from '@/components/layout/shared-layout';
import { COLORS } from '@/constants/colors';
import NextTopLoader from 'nextjs-toploader';
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
          <NextTopLoader
            color={COLORS.BLUE_600}
            initialPosition={0.08}
            crawlSpeed={200}
            height={4}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={2000}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          <React.Suspense>
            <SharedLayout>
              <main>{children}</main>
            </SharedLayout>
          </React.Suspense>
        </MainProvider>
      </body>
    </html>
  );
};

export default RootLayout;
