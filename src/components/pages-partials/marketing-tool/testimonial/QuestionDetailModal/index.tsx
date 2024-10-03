'use client';
import React from 'react';
import { FlexCol, MainHeading, Text, Name, RegularText, ButtonRow } from './index.styles';
import { BoldUnderline, Line } from '../QuestionSection/index.styles';
import Button from '@/components/core/Button';

const Reviews = [
  {
    id: 1,
    username: 'Ron',
    review:
      '“I’ve worked with Sam from Top Advisors for the last 5 years. She has been such a pleasure to work with. She never makes me feel rushed or that my questions or requests are a burden. I can’t recommend Sam and the team of Top Advisors enough.”'
  },
  {
    id: 2,
    username: 'Patrick and Sarah H.',
    review:
      '“What we love the most about the team at Top Advisors is their attention to detail. We always felt so confused about our financial plan, especially the investments. Tim always makes sure each detail is covered and all our questions are answered. They are extremely professional and always make us feel that we are a top priority.”'
  },
  {
    id: 3,
    username: 'Sally A.',
    review:
      '“I’ve been a client of Top Advisors for 12 years and am always pleased with their insightful plans and advice. Each member of their team is available for questions and are very approachable. My quarterly review is always handled on time with the utmost care and quality. Thank you so much.”'
  }
];

interface Props {
  closeFunction: () => void;
}

const QuestionDetailModal: React.FC<Props> = ({ closeFunction }) => {
  return (
    <FlexCol>
      <MainHeading>Testimonial/ Endorsements/ Review</MainHeading>
      <Text>Question</Text>
      <Line />

      {Reviews.map((r) => (
        <>
          <Name>{r.username}</Name>
          <RegularText>{r.review}</RegularText>
        </>
      ))}
      <Line />
      <RegularText>
        The above testimonials were made from current clients and no compensation was given for the
        remarks made. Since there wasn’t compensation given, there are no conflicts of interest
        present that would affect the testimonial. Top Advisors reached out to all clients
        requesting voluntary feedback and these were the clients who responded. These testimonials
        were provided for informational purposes only and is not representative of all client
        experiences. There is no assurance that a current or prospective client will experience a
        high level of satisfaction with Top Advisors services. Past performance is no guarantee of
        future results.
      </RegularText>
      <RegularText>
        Additional information is available upon request in our current brochure titled ADV 2A and
        the Form CRS which discusses advisory services and fees. You can also view these disclosures
        here
        <BoldUnderline>www.samplewebsite/disclosure</BoldUnderline>.
      </RegularText>
      <Line />
      <ButtonRow>
        <Button onClick={closeFunction}>Back</Button>
      </ButtonRow>
    </FlexCol>
  );
};

export default QuestionDetailModal;
