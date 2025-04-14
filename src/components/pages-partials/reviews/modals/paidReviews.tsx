import { COLORS } from '@/constants/colors';
import { Box, Rating, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ProhibitationModalHeader } from '../../performance-advertising/adProhibitation/index.styles';
import CustomModal from '@/components/core/Modal';
const userData = [
  {
    name: 'Ted S.',
    description:
      '"I’ve been working with Lisa and the team at Top Advisors for several months now, and I couldn’t be happier with their service. Their team is incredibly knowledgeable, responsive, and truly puts my financial goals first. I feel confident in their expertise, and they make complex investment strategies easy to understand and implement."'
  }
];
const PaidReviews = () => {
  const [isProhibitationModal, setIsProhibitaionModal] = useState<boolean>(false);

  return (
    <Box>
      <Typography sx={{ fontSize: '0.9rem' }}>
        <span
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
            margin: '0 0.2rem  ',
            fontWeight: 'bold'
          }}
          onClick={() => setIsProhibitaionModal(true)}
        >
          Click here
        </span>
        for an example of a paid review with the conflict of interest noted.
      </Typography>
      <CustomModal
        openValue={isProhibitationModal}
        closeFunction={() => setIsProhibitaionModal(false)}
        // mainHeading="Delete File?"
        closedIcon={true}
        modalWidth={'40rem'}
      >
        <Box>
          <ProhibitationModalHeader>Review</ProhibitationModalHeader>
          {userData.map((data) => (
            <Box
              key={data.name}
              sx={{ display: 'flex', flexDirection: 'column', rowGap: '0.7rem', margin: '1rem 0' }}
            >
              <Typography sx={{ fontSize: '1.15rem', color: COLORS.BLUE_600 }}>
                {data.name}
              </Typography>
              <Rating name="read-only" value={4.5} readOnly />
              <Typography sx={{ fontSize: '0.9rem' }}>{data.description}</Typography>
            </Box>
          ))}
          <hr style={{ height: '2px' }} />
          <Box>
            <Typography sx={{ fontSize: '0.9rem' }}>
              The client above was indirectly compensated with reduced fees that totaled $950
              dollars.{' '}
              <span style={{ color: COLORS.BLUE_600 }}>
                This offer of non-cash compensation represents a material conflict of interest that
                will affect the testimony given.{' '}
              </span>{' '}
              This review is for informational purposes only and does not represent all client
              experiences. It does not guarantee positive performance or future results. This review
              was provided for informational purposes only and is not representative of all client
              experiences. There is no assurance that a current or prospective client will
              experience a high level of satisfaction with Top Advisor services.
            </Typography>
            <Typography
              sx={{
                fontSize: '0.9rem',
                marginTop: '1rem'
              }}
            >
              Additional information is available upon request in our current brochure titled ADV 2A
              and the Form CRS, which discusses advisory services and fees. You can also view other
              testimonials and disclosures here:
              <span style={{ color: COLORS.BLUE_600 }}>www.samplewebsite/disclosure.</span>
            </Typography>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default PaidReviews;
