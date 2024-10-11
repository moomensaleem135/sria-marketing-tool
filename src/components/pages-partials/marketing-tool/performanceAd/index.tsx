'use client';
import SharedLayout from '@/components/layout/shared-layout';

import { Container, FlexRow, Text, TextBlue, TextBold, TopHeading } from './index.styles';

import IconButton from '@mui/material/IconButton';
import { Add, Remove } from '@mui/icons-material';

import { COLORS } from '@/constants/colors';

import React, { useState } from 'react';

import AddMarketingPieceForm from './MarketingPieceForm';
import QuestionSection from './QuestionSection';
import SignContainer from './SignContainer';

const questions = [
  {
    id: 1,
    question:
      'Are the results in your performance advertisement displayed in a way that is fair and balanced?',
    example:
      'Results and time periods displayed in any performance advertisement must be shown in a fair and balanced way. Excluding certain results or periods of time in your ad is strictly prohibitive.',
    subQuestions: [
      'Provide specific details how the ad is not fair and balanced.*',
      'How will the ad be corrected to ensure the performance results are presented in both a fair and balanced manner?*'
    ],
    dragAndDrop: 'Upload the corrected version of the ad here.*',
    isUpdated:
      'How will the ad be corrected to ensure the performance results are presented in both a fair and balanced manner?*',
    note: 'No'
  },
  {
    id: 2,
    question: 'Does your performance advertisement include gross performance and net performance?',
    example:
      'Gross performance in your ad must be accompanied with net performance, however net performance can stand alone without gross performance. Net performance is calculated after the deduction of fees and expenses that your client has paid. ',
    subQuestions: [],
    dragAndDrop: 'Upload the corrected version of the ad here.*',
    isUpdated:
      'Has the ad been updated to include gross and net performance? You cannot publish the ad if you don’t show net performance results.*',
    note: 'No'
  },
  {
    id: 3,
    question:
      'Is net performance displayed in your ad with equal prominence and calculated in the same manner as gross performance?',
    example:
      'In order for investors to perform a suitable comparison, gross and net performance must be displayed and calculated in the same manner. You must also use the same time period for both and use the same type of return and methodology.',
    subQuestions: [],
    dragAndDrop: 'Upload the corrected version of the ad here.*',
    isUpdated:
      'Has the ad been updated to include gross and net performance? You cannot publish the ad if you don’t show net performance results.*',
    note: 'No'
  },
  {
    id: 4,
    question:
      'Does the investment performance shown in your advertisement contain results for the same portfolio for each of the following?',
    example:
      'Other than private funds your results must meet each of the three criteria shown above to help facilitate comparison among different advertisements to avoid cherry picking the best results. If you can’t calculate the three required time periods immediately following the calendar year end, you may use more timely quarter end performance. ',
    subQuestions: [
      'Provide specific details on which of the three criteria hasn’t been met.*',
      'How will the ad be corrected to ensure all three criteria are met?*'
    ],
    dragAndDrop: '',
    isUpdated:
      'Has the ad been updated to include all three criteria? If no, it cannot be published all three are included in the ad.*',
    note: 'No'
  },
  {
    id: 5,
    question:
      'Was it implied or explicitly stated that the calculation or presentation of your performance results were approved or reviewed by the SEC?',
    example:
      'You cannot include a statement that implies or directly states that the SEC has reviewed or approved your performance results.',
    subQuestions: [
      'Provide specific details on which part of the add implies or states the SEC reviewed or approved it?*'
    ],
    dragAndDrop: 'Upload the corrected version of the ad here.*',
    isUpdated:
      'Has the ad been updated to remove the implication or statement that the SEC has approved the ad? If no, it cannot be published.*',
    note: 'No'
  },
  {
    id: 6,
    question:
      'Does the advertisement include the results of other portfolios with related performance?',
    example: `If you have related performances shown, then you must include all portfolios with similar investment policies, objectives and strategies of those being offered in the advertisement.
      Advisors will be required to calculate the performance of all related portfolios to ensure that the exclusion of certain portfolios from the advertisement meets the rules conditions. You
      can however exclude certain related portfolios if your advertised performance is not materially higher than if all the related portfolios were included.`,
    subQuestions: [
      'Provide the specific details of the related portfolios included in the ad. Portfolio names, policies, objectives and strategies. Also, detail the reason*'
    ],
    dragAndDrop: 'Upload the corrected version of the ad here.*',
    isUpdated:
      'Have performance been calculated for all related portfolios to ensure the exclusion meets the rules condition? You cant publish the ad until you calculate all related portfolios.*',
    isUpdated2:
      'Has the size of the portfolios been disclosed and the basis for which they were selected them? You cant publish the ad until you meet this disclosure.*',
    note: 'No'
  },
  {
    id: 7,
    question:
      'Are extracted performance results from a single portfolio shown in the advertisement?',
    example: `Extracted performance are results of a subset of investments extracted from a single portfolio. You can only include extracted performance results if the following conditions are met <br/>
      1.  The extracted performance is shown net of fees (after fees are deducted from the return)<br/>
      2.  The advertisement provides, or offers to provide promptly, the performance results of the total portfolio from which the performance was extracted. Keep in mind, these requirements
      only apply to a subset of investments extracted from a single portfolio. Carve outs from a composite of portfolios are allowed but subject to hypothetical performance rule see Q. 8.`,
    subQuestions: [],
    dragAndDrop: 'Upload the corrected version of the ad here.*',
    isUpdated:
      'Has the extracted performance been shown net of fees? You can’t publish the ad until the results are shown after fees have been deducted from return.*',
    isUpdated2:
      'Has the performance results of the total portfolio been shown? You can’t publish the ad until the total portfolio results are displayed.*',
    note: 'No'
  },
  {
    id: 8,
    question:
      'Does the content of the advertisement contain hypothetical performance? Read the detail scarefully.',
    example: `1. Hypothetical performance refers to results not actually achieved by a real portfolio of an investment advisor. Here are a few examples of hypothetical advertising : Model portfolio
      performance, back tested performance and targeted or projected performance returns. <br/>
      2. Examples of what does not constitute hypothetical performance. iAn interactive analysis tool that a client or potential client uses to create simulations and statistical analysis of      likely future results, provided the adviser: 1. Provides a description of the criteria and methodology used, including the tools limitations and exclusions. 2. Explains that the results may
      vary with each use and over time and if applicable describes all the investments considered in the analysis . <br/>
      3. Explains how the tool determines which investments to select and if the tool favors certain investments and why the selectivity. 4. States other investments not considered may have
      the same characteristics similar or better than those being analyzed. 5. And discloses that the tool generates outcomes that are hypothetical in nature.`,
    subQuestions: ['Why do you consider the ad hypothetical? *'],
    dragAndDrop: '',
    isUpdated: '',
    note: 'No'
  },
  {
    id: 9,
    question:
      'If the advertisement does contain hypothetical performance, has it met the following 3 conditions? All 3 conditions must be met to use hypothetical performance in your advertising.',
    example: `1. Implemented policies and procedures to ensure the hypothetical performance is relevant to the financial situation and objectives of the intended audience.<br/>
      2.  Provide relevant information to enable the intended audience to understand the criteria used and assumptions made in the calculation of the hypothetical performance.<br/>
      3.  Provide sufficient information to enable the intended audience to understand the risks and limitations of using such hypothetical performance in making investment decisions. If the
      intended audience is an investor in a private fund, offer to provide the information promptly.
`,
    subQuestions: [
      'Provide details on how and where the 3 conditions are met. If you can’t provide details and demonstrate all 3 conditions are met, then the ad can’t be published. *'
    ],
    dragAndDrop: 'Upload documentation to demonstrate the 3 conditions have been met.*',
    isUpdated: '',
    note: 'No'
  },
  {
    id: 10,
    question:
      'Will you distribute your  hypothetical performance advertisements to investors who fall into one of two categories? If the answer is yes to either scenario, you cannot distribute your performance advertisements to these investors.',
    example: `1. They don’t have access to the resources to independently analyze such hypothetical performance; or<br/>
      2.  They don’t have sufficient financial experience to understand the risks and limitations of hypothetical performance`,
    subQuestions: [],
    dragAndDrop: '',
    isUpdated:
      'Confirm that the ad will not be distributed to those that don’t have access to the resources to independently analyze such hypothetical performance; or those don’t have sufficient financial experience to understand the risks and limitations of hypothetical performance.',
    isConfirm: `Confirm that the ad will not be distributed to those that don’t have access to the resources to independently analyze such hypothetical performance; or
    those don’t have sufficient financial experience to understand the risks and limitations of hypothetical performance.`,
    note: 'No'
  },
  {
    id: 11,
    question: 'Is there predecessor performance in the performance advertising?',
    example:
      'Predecessor performance is defined as performance achieved by a group of investments within an account or private fund that was not advised 100% of the time during the period shown by the adviser who is showing the advertisement.',
    subQuestions: [],
    dragAndDrop: '',
    isUpdated: '',
    note: 'No'
  },
  {
    id: 12,
    question:
      'Are all 4 guidelines below being met with the predecessor performance? If you’re not meeting all four, you can’t use the predecessor performance in your advertising.',
    example: `1. The adviser responsible for achieving the prior performance results manage accounts at the advertising adviser.<br/>
      2.  The accounts managed at the prior firm are sufficiently similar to the present account.<br/>3.  All accounts managed that are substantially similar are advertised unless leaving out these accounts would not result in a higher performance and the exclusion doesn’t alter the
      1,5- and 10-year time periods.<br/>
      4.The advertisement clearly and prominently includes all relevant disclosures, including that the performance results were achieved at another firm.`,
    subQuestions: [
      'Provide details on how and where all 4 guidelines are being met for predecessor performance. If you can’t provide these details the ad can’t be published. *'
    ],
    dragAndDrop: 'Upload documentation to demonstrate the 4 guidelines have been met.*',
    isUpdated: '',
    note: 'No'
  },
  {
    id: 13,
    question: 'Do you have all the relevant documentation related to the predecessor performance?',
    example:
      'You must review all records related to the predecessor performance in order to substantiate performance. If you don’t have access to these records, you cannot use the advertisement. ',
    subQuestions: [],
    dragAndDrop: '',
    isUpdated: '',
    isConfirm:
      'Confirm that you will not publish the ad until you have all relevant documentation.*',
    note: 'No'
  }
];

export default function PartialPerformanceAd() {
  const [isAdd, setIsAdd] = useState(false);
  const [toggleQuestionsContainer, settoggleQuestionsContainer] = useState(false);
  const [toggleSignContainer, settoggleSignContainer] = useState(false);

  const handleClick = () => {
    setIsAdd(!isAdd);
  };

  const initialValues = {
    name: '',
    advisor: '',
    date: '',
    URL: '',
    upload: ''
  };

  const handleSubmit = () => {
    settoggleQuestionsContainer(!toggleQuestionsContainer);
  };

  const openSignContainer = () => {
    settoggleSignContainer(!toggleSignContainer);
  };

  return (
    <SharedLayout>
      <TopHeading>RIA Marketing Rule Review Tool</TopHeading>
      <Container>
        <Text>
          <TextBold>Instruction:</TextBold> Click the + sign to add a new marketing piece for
          review, then select from the dropdown to begin.
        </Text>
        <FlexRow>
          <IconButton
            onClick={handleClick}
            sx={{ color: `${COLORS.BLUE_TEXT}`, padding: '0px', marginRight: '5px' }}
          >
            {isAdd ? <Remove /> : <Add />}
            <TextBlue>Add Marketing Piece</TextBlue>
          </IconButton>
        </FlexRow>
        {isAdd && <AddMarketingPieceForm initialValues={initialValues} onSubmit={handleSubmit} />}
      </Container>
      {toggleQuestionsContainer && (
        <>
          <QuestionSection questions={questions} openSignContainer={openSignContainer} />
        </>
      )}

      {toggleSignContainer && <SignContainer />}
    </SharedLayout>
  );
}
