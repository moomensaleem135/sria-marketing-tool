import CustomModal from '@/components/core/Modal';
import { COLORS } from '@/constants/colors';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
const userData = [
  {
    name: 'Lynn J.',
    description:
      '“I’ve been a client for 17 years. I couldn’t recommend John enough. If you’re looking for someone to provide trusted and honest advice, the team here always delivers. I’m more than happy to refer John and the entire team as my investment advisor.” (April 2024)'
  }
];
const PaidTestimonial = () => {
  const [isDisclouserModal, setIsDisclouserModal] = useState<boolean>(false);

  return (
    <Box>
      {/* <Typography sx={{ fontSize: '0.8rem' }}>
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => setIsDisclouserModal(true)}
        >
          {' '}
          Click here&nbsp;
        </span>{' '}
        for an example of a paid testimonial with the conflict of interest noted.
      </Typography>

      <CustomModal
        openValue={isDisclouserModal}
        closeFunction={() => setIsDisclouserModal(false)}
        closedIcon={true}
        modalWidth={'37rem'}
      > */}
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
            The client above was indirectly compensated with reduced fees that totaled $950. This
            offer of non-cash compensation represents a material conflict of interest that will
            affect the testimony given. This testimony is for informational purposes only and does
            not represent all client experiences. It does not guarantee positive performance or
            future results.
          </Typography>
        </Box>
      </Box>
      {/* </CustomModal>   */}
    </Box>
  );
};

export default PaidTestimonial;
