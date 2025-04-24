import { Box, Typography } from '@mui/material';
import React from 'react';
import { RecordKeepDescription, RecordKeepHeader, RecordRuleListItem } from './index.styles';
import ButtonWitnLoading from '@/components/core/ButtonWithLoading';
const rulesData = [
  'All advertisements distributed indirectly or directly, regardless of number of the audience.',
  'Copies of all questionnaires or surveys used in the preparation of third-party reviews.',
  'Records of all disclosures provided to clients in connection with testimonials or endorsements.',
  'Copies of all investment letters, bulletins, videos, blogs, presentations, articles, or social posts that are not considered advertisements under the rule.',
  'Documentation supporting the adviser’s reasonable basis for believing a testimonial, endorsement, or third-party rating complies with the marketing rule.',
  'All original written communications received, as well as copies of all written communications sent by the adviser, regarding the performance of predecessor accounts, and the performance or returns of any managed accounts, portfolios, or securities recommendations.',
  'Copies of all information provided or offered in connection with the inclusion of hypothetical performance in an advertisement.',
  'A record of who the intended audience is for any hypothetical performance.'
];
const RecordKeepingModal = ({
  setIsRecordKeepModal
}: {
  setIsRecordKeepModal: (value: boolean) => void;
}) => {
  return (
    <Box>
      <RecordKeepHeader>Recordkeeping Rule</RecordKeepHeader>
      <Box>
        <RecordKeepDescription>
          Advisors are required by Rule 204-2 under the Advisors Act to make and keep true, accurate
          and current records of all advertisements they disseminate including all working papers,
          performance related information and documentation for oral ads, testimonials and
          endorsements.
        </RecordKeepDescription>
        <RecordKeepDescription>
          They must maintain accounts, books and all other documents necessary to form the basis for
          demonstrating their calculations and methodology for inclusion in the advertisement.
        </RecordKeepDescription>
        <Box>
          <RecordKeepDescription sx={{ fontWeight: 'bold' }}>
            Specifically, advisors must keep all documents for:
          </RecordKeepDescription>
          <ul>
            {rulesData.map((rule, index) => (
              <RecordRuleListItem key={index}>{rule}</RecordRuleListItem>
            ))}
          </ul>
        </Box>
      </Box>
      <Box sx={{ textAlign: 'end' }}>
        <ButtonWitnLoading
          text="Cancel"
          bg="black"
          textColor="white"
          handleClick={() => setIsRecordKeepModal(false)}
        />
      </Box>
    </Box>
  );
};

export default RecordKeepingModal;
