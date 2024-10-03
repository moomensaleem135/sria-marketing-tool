'use client';
import React from 'react';
import {
  FlexCol,
  MainHeading,
  RegularText,
  ButtonRow,
  StyledList,
  StyledListItem
} from './index.styles';
import { Line } from '../QuestionSection/index.styles';
import Button from '@/components/core/Button';

interface Props {
  closeFunction: () => void;
}

const RecordKeepingReviewModal: React.FC<Props> = ({ closeFunction }) => {
  const listItems = [
    `'All advertisements distributed indirectly or directly, regardless of the number of the audience.'`,
    'Copies of all questionnaires or surveys used in the preparation of third-party reviews.',
    'Records of all disclosures provided to clients in connection with testimonials or endorsements.',
    'Copies of all investment letters, bulletins, videos, blogs, presentations, articles, or social posts that are not considered advertisements under the rule.',
    `'Documentation supporting the adviser's reasonable basis for believing a testimonial, endorsement, or third-party rating complies with the marketing rule.'`,
    'All original written communications received, as well as copies of all written communications sent by the adviser, regarding the performance of predecessor accounts, and the performance or returns of any managed accounts, portfolios, or securities recommendations.',
    'Copies of all information provided or offered in connection with the inclusion of hypothetical performance in an advertisement.',
    'A record of who the intended audience is for any hypothetical performance.'
  ];

  return (
    <FlexCol>
      <MainHeading>Recordkeeping Rule</MainHeading>
      <Line />
      <RegularText>
        Advisors are required by Rule 204-2 under the Advisors Act to make and keep true, accurate,
        and current records of all advertisements they disseminate, including all working papers,
        performance-related information, and documentation for oral ads, testimonials, and
        endorsements. They must maintain accounts, books, and all other documents necessary to form
        the basis for demonstrating their calculations and methodology for inclusion in the
        advertisement.
      </RegularText>
      <RegularText style={{ paddingBottom: '5px' }}>
        Specifically, advisors must keep all documents for:
      </RegularText>
      <StyledList>
        {listItems.map((item, index) => (
          <StyledListItem key={index}>{item}</StyledListItem>
        ))}
      </StyledList>
      <Line />
      <ButtonRow>
        <Button onClick={closeFunction}>Back</Button>
      </ButtonRow>
    </FlexCol>
  );
};

export default RecordKeepingReviewModal;
