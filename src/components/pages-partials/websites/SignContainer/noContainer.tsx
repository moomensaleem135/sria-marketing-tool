import React, { useState } from 'react';

import { SignContainerText, SignContainerTextBold } from '../index.styles';
import { Container } from '../../blogs-article/index.styles';

const NoContainer = () => {
  const [openSignModal, setOpenSignModal] = useState(false);
  const [openReportReview, setOpenReportReview] = useState(false);

  const handleApproveSignature = () => {
    setOpenSignModal(false);
    setOpenReportReview(true);
  };

  return (
    <Container>
      <SignContainerText>
        According to your answers the marketing material above needs to be updated before
        publishing.
      </SignContainerText>
      <SignContainerText>
        If this is accurate, <SignContainerTextBold>Click Here</SignContainerTextBold> to send a
        marketing revision request to the advisor.
      </SignContainerText>
      <SignContainerText>
        Your review for this content is saved in the Reports section of MRT and the main archive.
      </SignContainerText>
    </Container>
  );
};

export default NoContainer;
