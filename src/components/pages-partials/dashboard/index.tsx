'use client';
import SharedLayout from '@/components/layout/shared-layout';

import DashboardTable from './table';

import { Container, FlexRowGrid, FlexCol, TypographyStyle } from './index.styles';

export default function PartialDashboard() {
  return (
    <SharedLayout title={'Dashboard'}>
      <Container container>
        <FlexRowGrid item xs={12}>
          <FlexCol>
            <TypographyStyle>Campaigns Runing</TypographyStyle>
          </FlexCol>
        </FlexRowGrid>
        <DashboardTable />
      </Container>
    </SharedLayout>
  );
}
