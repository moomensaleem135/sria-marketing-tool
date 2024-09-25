import { Popover } from '@mui/material';

import React, { useState } from 'react';

import {
  Details,
  Frame,
  FrameBox,
  LowerContainer,
  Main,
  Name,
  Print,
  Schedule,
  StyledButton,
  SubTitle,
  Title,
  TopDiv,
  Typography1,
  Typography2,
  UpperContainer
} from './index.styles';

const MyPopover = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverOpen = () => {
    setPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  const popoverContent = (
    <>
      {/* <Typography variant="body1">VALUATION & FEES</Typography>
      <Typography variant="body2">
        Client Billing Review - Quarterly<br />
        Scheduled 3//10<br /><br />
        Every quarter you'll need to examine a sampling of your client's
        billing activity. The goal of this review is to ensure your
        client's bills are accurate and match the fee schedule set forth
        in their advisory agreement and form ADV 2A.
      </Typography>
      <Typography variant="body2">
        RESOURCES<br />
        Checklist<br />
        Billing Workbook<br />
        NOT STARTED<br />
        Begin Review
      </Typography> */}
      <Main>
        <UpperContainer>
          <TopDiv>
            <Typography1>VALUATION &amp; FEES</Typography1>
            <Typography2>Not Started</Typography2>
          </TopDiv>
          <Title>Client Billing Review - Quarterly</Title>
          <Schedule>Scheduled 3/10</Schedule>
          <Details>
            Every quarter you will need to examine a sampling of your clients billing activity. The
            goal of this review is to ensure your clients bills are accurate and match the fee
            schedule set forth in their advisory agreement and form ADV 2A.
          </Details>
          <hr />
        </UpperContainer>
        <LowerContainer>
          <SubTitle>RESOURCES</SubTitle>
          <FrameBox>
            <Frame>
              <Name>CheckList</Name>
              <Print src="/svgs/Image1.svg" width={160} height={160} alt="" />
            </Frame>
            <Frame>
              <Name>Billing WorkBook</Name>
              <Print src="/svgs/Image2.svg" width={160} height={160} alt="" />
            </Frame>
          </FrameBox>
          <StyledButton>Begin Review</StyledButton>
        </LowerContainer>
      </Main>
    </>
  );

  return (
    <div>
      <button onClick={handlePopoverOpen}>Open Popover</button>
      <Popover
        open={popoverOpen}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        {popoverContent}
      </Popover>
    </div>
  );
};

export default MyPopover;
