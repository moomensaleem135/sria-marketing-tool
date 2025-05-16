'use client';
import React, { useState } from 'react';
import { FlexCol, Row, FlexRow, Col, RegularText } from './index.styles';
import { Line } from '../../index.styles';
import Button from '@/components/core/Button';
import { BoldText } from '@/components/core/Modal/SignModal/index.styles';
import FieldInput from '@/components/core/FieldInput';
import { Box, Typography } from '@mui/material';
import CustomModal from '@/components/core/Modal';
import { Text } from '../../blogs-article/index.styles';
import { MainHeadingTypo } from '@/components/core/Modal/index.styles';

const WrittenAgreement = () => {
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
        for an example of a written agreement between you (the firm) and the client or promoter.
      </Typography>
      <CustomModal
        openValue={isDisclouserModal}
        closeFunction={() => setIsDisclouserModal(false)}
        closedIcon={true}
        modalWidth={'40rem'}
      > */}
      <Box>
        <FlexCol>
          <MainHeadingTypo>Testimonial/ Endorsements/ Review</MainHeadingTypo>
          <Text>Question</Text>
          <Line />
          <BoldText style={{ textAlign: 'center' }}>Testimonial Agreement</BoldText>
          <FlexRow>
            <BoldText>Date:</BoldText>
            <FieldInput name="advisor" variant="standard" width="16%" customPadding="10px" />
          </FlexRow>

          <BoldText>Testimonial</BoldText>
          <RegularText>
            _________________________________________________
            <br />
            _________________________________________________
            <br />
            _________________________________________________
            <br />
            _________________________________________________
            <br />
          </RegularText>
          <RegularText>
            I agree that my testimonial, as shown above, may be used for promoting and publicizing
            the firm. I hereby authorize the firm to use my name, bio, and testimonial as they see
            fit in connection with marketing and promoting the company.
          </RegularText>
          <RegularText>
            In exchange, the firm has agreed to compensate me for my testimonial in the amount and
            form detailed below.
          </RegularText>
          <FlexRow>
            <BoldText>Compensation Type: </BoldText>
            <RegularText style={{ padding: '0' }}> Circle one Cash / Non-Cash</RegularText>
          </FlexRow>
          <FlexRow>
            <BoldText>Amount: $</BoldText>
            <FieldInput name="amount" variant="standard" width="16%" customPadding="10px" />
          </FlexRow>
          <Col>
            <FieldInput name="advisor" variant="standard" />
            <BoldText>Advisor / Firm Name</BoldText>
          </Col>
          <Row>
            <Col>
              <FieldInput name="signature" variant="standard" />
              <BoldText>Signature</BoldText>
            </Col>
            <Col>
              <FieldInput name="date" variant="standard" />
              <BoldText>Date</BoldText>
            </Col>
          </Row>
          <Col>
            <FieldInput name="clientName" variant="standard" />
            <BoldText>Client Name</BoldText>
          </Col>
          <Row>
            <Col>
              <FieldInput name="signature" variant="standard" />
              <BoldText>Signature</BoldText>
            </Col>
            <Col>
              <FieldInput name="date" variant="standard" />
              <BoldText>Date</BoldText>
            </Col>
          </Row>
          <Line />
        </FlexCol>
      </Box>
      {/* </CustomModal> */}
    </Box>
  );
};

export default WrittenAgreement;
