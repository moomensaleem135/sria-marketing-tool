import CustomModal from '@/components/core/Modal';
import { COLORS } from '@/constants/colors';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
const userData = [
  {
    name: 'Ron J.',
    description:
      '“I’ve worked with Sam from Top Advisors for the last 5 years. She has been such a pleasure to work with. She never makes me feel rushed or that my questions or requests are a burden. I can’t recommend Sam and the team of Top Advisors enough.” (June 2024)'
  },
  {
    name: 'Patrick and Sarah H.',
    description:
      '“What we love the most about the team at Top Advisors is their attention to detail. We always felt so confused about our financial plan, especially the investments. Tim always makes sure each detail is covered and all our questions are answered. They are extremely professional and always make us feel that we are a top priority.” (May 2024)'
  },
  {
    name: 'Sally A.',
    description:
      '“I’ve been a client of Top Advisors for 12 years and am always pleased with their insightful plans and advice. Each member of their team is available for questions and are very approachable. My quarterly review is always handled on time with the utmost care and quality. Thank you so much.” (April 2024)'
  }
];
const CompensationModal = () => {
  const [isDisclouserModal, setIsDisclouserModal] = useState<boolean>(false);

  return (
    <Box>
      <Typography sx={{ fontSize: '0.8rem' }}>
        The SEC requires each disclosure to state if any compensation was exchanged and what type,
        cash or non-cash.
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => setIsDisclouserModal(true)}
        >
          {' '}
          Click here&nbsp;
        </span>{' '}
        to see an example.
      </Typography>

      <CustomModal
        openValue={isDisclouserModal}
        closeFunction={() => setIsDisclouserModal(false)}
        closedIcon={true}
        modalWidth={'37rem'}
      >
        <Box sx={{ paddingBottom: '1rem' }}>
          {userData.map((data) => (
            <Box
              key={data.name}
              sx={{ display: 'flex', flexDirection: 'column', rowGap: '0.7rem', margin: '1rem 0' }}
            >
              <Typography sx={{ fontSize: '1.15rem', color: COLORS.BLUE_600 }}>
                {data.name}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>{data.description}</Typography>
            </Box>
          ))}
          <hr style={{ height: '2px' }} />
          <Box>
            <Typography sx={{ fontSize: '0.9rem' }}>
              The above testimonials were made from current clients and
              <span style={{ color: COLORS.BLUE_600 }}>
                no compensation was given for the remarks made.
              </span>{' '}
              Since there wasn’t compensation given, there are no conflicts of interest present that
              would affect the testimonial. Top Advisors reached out to all clients requesting
              voluntary feedback and these were the clients who responded. These testimonials were
              provided for informational purposes only and is not representative of all client
              experiences. There is no assurance that a current or prospective client will
              experience a high level of satisfaction with Top Advisors services. Past performance
              is no guarantee of future results.
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', marginTop: '1rem' }}>
              Additional information is available upon request in our current brochure titled ADV 2A
              and the Form CRS which discusses advisory services and fees. You can also view these
              disclosures here
              <span style={{ color: COLORS.BLUE_600 }}>www.samplewebsite/disclosure.</span>
            </Typography>
            <Typography sx={{ fontSize: '0.9rem', marginTop: '1rem' }}>
              If there is compensation, either cash or non-cash, given to the person supplying the
              testimonial there is a material conflict of interest present. Due to the compensation
              received the promoter has an incentive to recommend us as the investment adviser.
            </Typography>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default CompensationModal;
