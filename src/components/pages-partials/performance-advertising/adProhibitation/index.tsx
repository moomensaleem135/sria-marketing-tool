import CustomModal from '@/components/core/Modal';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { ProhibitationModalHeader } from './index.styles';

const AdProhibitation = () => {
  const [isProhibitationModal, setIsProhibitaionModal] = useState<boolean>(false);

  return (
    <Box>
      <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
        In addition to your advertisement addressing the 12 questions above, does it also comply
        with the seven general prohibitions{' '}
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => setIsProhibitaionModal(true)}
        >
          outlined here?
        </span>
      </Typography>
      <CustomModal
        openValue={isProhibitationModal}
        closeFunction={() => setIsProhibitaionModal(false)}
        // mainHeading="Delete File?"
        closedIcon={true}
        modalWidth={'40rem'}
      >
        <Box>
          <ProhibitationModalHeader>
            The 7 General Advertising Prohibitions
          </ProhibitationModalHeader>
          <Box>
            <ol>
              <li>Untrue statements of material fact or leaving out a material fact.</li>
              <li>Facts that cannot be substantiated by the SEC upon demand.</li>
              <li>
                Information that may cause an untrue or misleading implication by an investor
                regarding a material fact.
              </li>
              <li>
                Presenting the potential benefits of advice without providing the fair and balanced
                treatment of risks and limitations.
              </li>
              <li>Cherry-picking performance results.</li>
              <li>
                Including or excluding performance results or time periods that are not fair and
                balanced.
              </li>
              <li>
                Avoid words, statements, or phrases that are otherwise materially misleading such as
                “Top Rated, The Best, #1, etc.”
              </li>
            </ol>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default AdProhibitation;
