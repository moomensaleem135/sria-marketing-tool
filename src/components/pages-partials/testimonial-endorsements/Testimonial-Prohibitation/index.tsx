import CustomModal from '@/components/core/Modal';
import { COLORS } from '@/constants/colors';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
const prohibitationData = [
  'Untrue statements of material fact or leaving out a material fact.',
  'Facts that cannot be substantiated by the SEC upon demand.',
  'Information that may cause an untrue or misleading implication by an investor regarding a material fact.',
  'Presenting the potential benefits of advice without providing the fair and balanced treatment of risks and limitations.',
  'Cherry-picking performance results.',
  'Including or excluding performance results or time periods that are not fair and balanced.',
  'Avoid words, statements, or phrases that are otherwise materially misleading, such as “Top Rated, The Best, #1, etc.”'
];
const TestimonialProhibitation = () => {
  const [isDisclouserModal, setIsDisclouserModal] = useState<boolean>(false);

  return (
    <Box>
      <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
        I have read the 7 marketing rule prohibitions and agree they are not present in my
        testimonials or endorsements
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => setIsDisclouserModal(true)}
        >
          {' '}
          Click here&nbsp;
        </span>{' '}
        to review the prohibitions.
      </Typography>
      <CustomModal
        openValue={isDisclouserModal}
        closeFunction={() => setIsDisclouserModal(false)}
        closedIcon={true}
        modalWidth={'40rem'}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: COLORS.BLUE_600,
              textAlign: 'center'
            }}
          >
            The 7 General Advertising Prohibitions
          </Typography>
          <ol>
            {prohibitationData.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </ol>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default TestimonialProhibitation;
