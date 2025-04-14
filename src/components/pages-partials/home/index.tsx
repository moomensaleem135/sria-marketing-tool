'use client';
import SharedLayout from '@/components/layout/shared-layout';
import { SelectMarketingType, SelectMarketingTypeDis, TopHeading } from '../index.styles';
import { Box, Container } from '@mui/material';

export default function PartialHome() {
  return (
    // <SharedLayout>
    <>
      <TopHeading>RIA Marketing Rule Review Tool</TopHeading>
      <Box display="flex" justifyContent="center">
        <iframe
          width="60%"
          height="400"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="RIA Marketing Rule Review"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </Box>
      <SelectMarketingType>
        Select your marketing type from the left to begin the review.
      </SelectMarketingType>
      <SelectMarketingTypeDis>
        The SEC&lsquo;s updated marketing rule for Registered Investment Advisers (RIAs),
        implemented in May 2021, revamps how firms advertise and solicit clients. It permits the use
        of testimonials, endorsements, and past performance but requires adherence to strict
        disclosure and oversight standards. Its goal is to improve transparency and protect
        investors by ensuring that marketing materials are accurate, clear, and not misleading.
        Additionally, the rule establishes guidelines for social media and digital marketing,
        expanding the definition of &ldquo;advertisement&ldquo; to reflect modern marketing
        practices.
      </SelectMarketingTypeDis>
      <SelectMarketingTypeDis>
        Our tool will streamline and automate compliance with the SEC&lsquo;s new marketing rule,
        ensuring all advertisements and client communications meet the rule&lsquo;s stringent
        requirements, reducing the risk of violations and enhancing compliance efficiency.
      </SelectMarketingTypeDis>
    </>
    // </SharedLayout>
  );
}
