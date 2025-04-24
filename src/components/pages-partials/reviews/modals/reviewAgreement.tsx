import CustomModal from '@/components/core/Modal';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FlexCol, FlexRow } from '../index.styles';

import FieldInput from '@/components/core/FieldInput';
import { RegularText } from '../../testimonial-endorsements/Wriiten-Agreement/index.styles';
import { BoldText } from '@/components/core/Modal/SignModal/index.styles';

const ReviewAgreement = () => {
  const [isDisclouserModal, setIsDisclouserModal] = useState<boolean>(false);

  return (
    <Box>
      <Typography sx={{ fontSize: '0.8rem' }}>
        <span
          style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => setIsDisclouserModal(true)}
        >
          {' '}
          Click here&nbsp;
        </span>{' '}
        for an example of a written agreement between you (the firm) and the client or promoter.
      </Typography>
      <CustomModal
        openValue={isDisclouserModal}
        closeFunction={() => setIsDisclouserModal(false)}
        closedIcon={true}
        modalWidth={'40rem'}
      >
        <Box>
          <FlexCol style={{ paddingBottom: '1rem' }}>
            <BoldText style={{ textAlign: 'center' }}>Review Agreement</BoldText>
            <FlexRow>
              <BoldText>Date:</BoldText>
              <FieldInput name="advisor" variant="standard" width="16%" customPadding="10px" />
            </FlexRow>

            <BoldText>Review</BoldText>
            <Box>
              <FieldInput name="advisor" variant="standard" width="100%" customPadding="10px" />

              <br />
              <FieldInput name="advisor" variant="standard" width="100%" customPadding="10px" />

              <br />
              <FieldInput name="advisor" variant="standard" width="100%" customPadding="10px" />

              <br />
              <FieldInput name="advisor" variant="standard" width="100%" customPadding="10px" />

              <br />
            </Box>
            <Box sx={{ margin: '1.5rem 0' }}>
              <RegularText>
                I agree that my testimonial, as shown above, may be used for promoting and
                publicizing the firm. I hereby authorize the firm to use my name, bio, and
                testimonial as they see fit in connection with marketing and promoting the company.
              </RegularText>
              <RegularText>
                In exchange, the firm has agreed to compensate me for my testimonial in the amount
                and form detailed below.
              </RegularText>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '0.2rem' }}>
              <BoldText style={{ fontSize: '0.9rem !important' }}>Compensation Type: </BoldText>
              <RegularText style={{ padding: '0' }}> Circle one Cash / Non-Cash</RegularText>
            </Box>
            <FlexRow>
              <BoldText>Amount: $</BoldText>
              <FieldInput name="amount" variant="standard" width="16%" customPadding="10px" />
            </FlexRow>
            <Box>
              <FieldInput name="advisor" variant="standard" width="30%" />
              <BoldText>Advisor / Firm Name</BoldText>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <FieldInput name="signature" variant="standard" />
                <BoldText>Signature</BoldText>
              </Box>
              <Box>
                <FieldInput name="date" variant="standard" />
                <BoldText>Date</BoldText>
              </Box>
            </Box>
            <Box>
              <FieldInput name="clientName" variant="standard" />
              <BoldText>Client Name</BoldText>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <FieldInput name="signature" variant="standard" />
                <BoldText>Signature</BoldText>
              </Box>
              <Box>
                <FieldInput name="date" variant="standard" />
                <BoldText>Date</BoldText>
              </Box>
            </Box>
          </FlexCol>
        </Box>
      </CustomModal>
    </Box>
  );
};

export default ReviewAgreement;
