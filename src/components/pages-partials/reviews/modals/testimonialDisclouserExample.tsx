import CustomModal from '@/components/core/Modal';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { RecordKeepHeader } from '../../websites/SignContainer/RecordKeepingModal/index.styles';
const testimonialData = [
  'About the client or investor’s experience with the investment adviser or its supervised persons.',
  'That directly or indirectly solicits any current or prospective client or investor to be a client of, or an investor in a private fund advised by, the investment adviser; or',
  'That refers any current or prospective client or investor to be a client of, or an investor in a private fund advised by, the investment adviser.'
];
const endorsementData = [
  'Indicates approval, support, or recommendation of the investment adviser or its supervised persons or describes that person’s experience with the investment adviser or its supervised persons.',
  'Directly or indirectly solicits any current or prospective client or investor to be a client of, or an investor in a private fund advised by, the investment adviser; or',
  'Refers any current or prospective client or investor to be a client of, or an investor in a private fund advised by, the investment adviser.'
];
const disclouserExemptions = [
  'Testimonials or endorsements made by SEC-registered broker-dealers are exempt from disclosure requirements when the recommendations are directed at retail customers and are in compliance with Regulation Best Interest.',
  'Testimonials or endorsements from a partner, officer, director, or employee of a Registered Investment Adviser (RIA), or from someone who controls, is controlled by, or is under common control with the RIA, or is a partner, officer, director, or employee of such an entity, are exempt from disclosure and written agreement requirements, as long as the relationship between the RIA and the person providing the testimonial or endorsement is clear to the client or investor at the time the testimonial is shared. Additionally, the investment adviser must document the person’s status at that time.',
  'Testimonials or endorsements disseminated for no compensation or for de minimis compensation (less than $1,000 during the preceding 12 months) are exempt from the Written Agreement.'
];
const TestimonialDisclouserExample = () => {
  const [isTestEndModal, setIsTestEndModal] = useState<boolean>(false);

  return (
    <Box>
      {/* <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
        Is a disclosure displayed clearly and prominently besides the review?
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => setIsTestEndModal(true)}
        >
          {' '}
          Click here&nbsp;
        </span>
        for the definition of testimonials and endorsements and the disclosure exemptions.
      </Typography>
      <CustomModal
        openValue={isTestEndModal}
        closeFunction={() => setIsTestEndModal(false)}
        modalWidth={'45rem'}
        closedIcon={true}
      > */}
      <Box sx={{ paddingBottom: '0.1rem' }}>
        <Box>
          <RecordKeepHeader>Testimonial / Endorsement Definitions</RecordKeepHeader>
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '0.5rem' }}>
            <Typography sx={{ fontSize: '1rem', margin: '0.8rem 0' }}>
              A <span style={{ fontWeight: 'bold' }}>testimonial</span> is any statement by a
              current client or investor in a private fund advised by the investment adviser:
            </Typography>
            {testimonialData.map((data, index) => (
              <Typography sx={{ fontSize: '0.9rem' }} key={index}>
                {index + 1}. {data}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '0.5rem' }}>
            <Typography sx={{ fontSize: '1rem', margin: '1rem 0' }}>
              An <span style={{ fontWeight: 'bold' }}>endorsement</span> is any statement by a
              person other than a current client or investor in a private fund advised by the
              investment adviser that:
            </Typography>
            {endorsementData.map((data, index) => (
              <Typography sx={{ fontSize: '0.9rem' }} key={index}>
                {index + 1}. {data}
              </Typography>
            ))}
          </Box>
        </Box>
        <Typography sx={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '1rem' }}>
          <i>(1) Advisers Act Rule 206(4)-1(a).</i>
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '0.5rem', margin: '3rem 0' }}>
          <RecordKeepHeader sx={{ marginBottom: '1rem' }}>
            Disclosure Exemptions for Testimonials and Endorsements
          </RecordKeepHeader>
          {disclouserExemptions.map((data, index) => (
            <Typography sx={{ fontSize: '0.9rem' }} key={index}>
              {index + 1}. {data}
            </Typography>
          ))}
        </Box>
      </Box>
      {/* </CustomModal> */}
    </Box>
  );
};

export default TestimonialDisclouserExample;
