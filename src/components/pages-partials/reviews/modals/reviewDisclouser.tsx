import CustomModal from '@/components/core/Modal';
import { Box, Rating, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ProhibitationModalHeader } from '../../performance-advertising/adProhibitation/index.styles';
import { COLORS } from '@/constants/colors';
const userData = [
  {
    name: 'Ted S.',
    description:
      '"I’ve been working with Lisa and the team at Top Advisors for several months now, and I couldn’t be happier with their service. Their team is incredibly knowledgeable, responsive, and truly puts my financial goals first. I feel confident in their expertise, and they make complex investment strategies easy to understand and implement."'
  }
];
const ReviewDisclouser = ({
  colorText,
  text1,
  text2
}: {
  colorText: string;
  text1: string;
  text2: string;
}) => {
  const [isProhibitationModal, setIsProhibitaionModal] = useState<boolean>(false);

  return (
    <Box>
      {/* <Typography sx={{ fontSize: '0.9rem' }}>
        {text1}
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
        {text2}
      </Typography>
      <CustomModal
        openValue={isProhibitationModal}
        closeFunction={() => setIsProhibitaionModal(false)}
        // mainHeading="Delete File?"
        closedIcon={true}
        modalWidth={'40rem'}
      > */}
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
            <span style={{ color: colorText === 'currentClient' ? COLORS.BLUE_600 : 'black' }}>
              The above review was given by a current client,
            </span>{' '}
            <span style={{ color: colorText === 'noCompensation' ? COLORS.BLUE_600 : 'black' }}>
              and no compensation was given for the remarks made.
            </span>
            <span style={{ color: colorText === 'noConflicts' ? COLORS.BLUE_600 : 'black' }}>
              Since there wasn&apos;t compensation given, there are no conflicts of interest present
              that would affect the review.{' '}
            </span>
            This review was provided for informational purposes only and is not representative of
            all client experiences. There is no assurance that a current or prospective client will
            experience a high level of satisfaction with Top Advisor services.
          </Typography>
          <Typography
            sx={{
              fontSize: '0.9rem',
              marginTop: '1rem',
              color: colorText === 'noConflicts' ? COLORS.BLUE_600 : 'black'
            }}
          >
            Additional information is available upon request in our current brochure titled ADV 2A
            and the Form CRS, which discusses advisory services and fees. You can also view other
            testimonials and disclosures here:
            <span style={{ color: COLORS.BLUE_600 }}>www.samplewebsite/disclosure.</span>
          </Typography>
        </Box>
      </Box>
      {/* </CustomModal> */}
    </Box>
  );
};

export default ReviewDisclouser;
