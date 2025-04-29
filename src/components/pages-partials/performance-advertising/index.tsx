'use client';

import React, { useState } from 'react';

import { Box, Typography } from '@mui/material';
import { Answer } from '@/store/app/types';
import AdProhibitation from './adProhibitation';
import { Question } from '../index.styles';
import MainComponentForm from '../main-component';

const questions = [
  {
    id: 1,
    question:
      'Are the results in your performance advertising displayed in a way that is fair and balanced?',
    answerInstructions: 'If no, complete forms below. If yes, move on to 2.',
    details:
      'Results and time periods displayed in any performance advertisement must be shown in a fair and balanced way. Excluding certain results or periods of time in your ad is strictly prohibitive.',

    subQuestions: [
      {
        text: '*Provide specific details how the ad is not fair and balanced.',
        isCheckbox: false
      },
      {
        text: '*How will the ad be corrected to ensure the performance results are presented in both a fair and balanced manner?',
        isCheckbox: false
      },
      {
        text: '*Has the ad been updated to include performance results that are fair and balanced?',
        isCheckbox: true
      }
    ],
    dragAndDrop: '*Updated the corrected version of the ad here.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 2,
    question:
      'Does your performance advertisement include both gross and net performance presentation?',
    answerInstructions: 'If no, complete forms below. If yes, move on to 3.',
    details:
      'Gross performance in your ad must be accompanied with net performance; however net performance can stand alone without gross performance. Net performance is calculated after the deduction of fees and expenses that your client has paid.',

    subQuestions: [
      {
        text: '*Provide specific details on how your performance is presented if both gross and net returns are not included.',
        isCheckbox: false
      },
      {
        text: '*Has the ad been updated to include gross and net performance? You cannot publish the ad if you don’t show net performance results.',
        isCheckbox: true
      }
    ],
    dragAndDrop: '*Updated the corrected version of the ad here.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 3,
    question:
      'Is net performance displayed in your ad with equal prominence and calculated in the same manner as gross performance?',
    answerInstructions: 'If no, complete forms below. If yes, move on to 3.',

    details:
      'In order for investors to perform a suitable comparison, gross and net performance must be displayed and calculated in the same manner. You must also use the same time period for both and use the same type of return and methodology.',

    subQuestions: [
      {
        text: '*Provide specific details how they are not displayed equally or calculated in the same manner.',
        isCheckbox: false
      },
      {
        text: '*How will the ad be corrected to ensure gross and net are displayed equally or calculated in the same manner?',
        isCheckbox: false
      },
      {
        text: '*Has the ad been updated to ensure prominence and same manner of calculation? It cannot be published until corrected.',
        isCheckbox: true
      }
    ],
    dragAndDrop: '*Updated the corrected version of the ad here.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 4,
    question: (
      <Box>
        <Question>
          Does the investment performance shown in your advertisement contain results for the same
          portfolio for each of the following?
        </Question>
        <Box>
          <Question>
            - &nbsp; &nbsp;&nbsp; One, five and ten-year periods or since inception if one, five and
            ten year do not exist.
          </Question>
          <Question>- &nbsp; &nbsp;&nbsp; All results are shown with equal prominence.</Question>
          <Question>
            - &nbsp; &nbsp;&nbsp; Each has an ending date no less recent than the most recent
            calendar year-end.
          </Question>
        </Box>
      </Box>
    ),
    answerInstructions: 'If no, complete forms below. If yes, move on to 4.',
    details:
      'Other than private funds, your results must meet each of the three criteria shown above to help facilitate comparison among different advertisements to avoid cherry-picking the best results. If you can’t calculate the three required time periods immediately following the calendar year-end, you may use more timely quarter-end performance (e.g., 1, 5, and 8 years).',
    subQuestions: [
      {
        text: '*Provide specific details on which of the three criteria haven’t been met.',
        isCheckbox: false
      },
      {
        text: '*How will the ad be corrected to ensure all three criteria are met?',
        isCheckbox: false
      },
      {
        text: '*Has the ad been updated to include all three criteria? If no, it cannot be published until all three criteria are met.',
        isCheckbox: true
      }
    ],
    dragAndDrop: '*Updated Marketing Piece',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 5,
    question:
      'Was it implied or explicitly stated that the calculation or presentation of your performance results were approved or reviewed by the SEC?',
    answerInstructions: 'If no, move onto 5. If yes, complete forms below.',

    notes:
      'You cannot include a statement that implies or directly states that the SEC has reviewed or approved your performance results.',
    subQuestions: [
      {
        text: '*Provide specific details on which part of the ad implies or states the SEC reviewed or approved it?',
        isCheckbox: false
      },

      {
        text: '*Has the ad been updated to remove the implication or statement that the SEC has approved the ad? If no, it cannot be published.',
        isCheckbox: true
      }
    ],
    dragAndDrop: '*Updated Marketing Piece',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 6,
    question:
      'Does the advertisement include the results of other portfolios with related performance?',
    answerInstructions: 'If no, move onto 6. If yes, complete forms below.',

    notes:
      'If you have related performances shown, then you must include all portfolios with similar investment policies, objectives, and strategies to those being offered in the advertisement. Advisors will be required to calculate the performance of all related portfolios to ensure that the exclusion of certain portfolios from the advertisement meets the rule’s conditions. You can, however, exclude certain related portfolios if your advertised performance is not materially higher than if all the related portfolios were included. Verify that the related performance, if included, passes the 7 general prohibitions.',
    subQuestions: [
      {
        text: '*Has performance been calculated for all related portfolios to ensure the exclusion meets the rules condition? You can’t publish the ad until you calculate all related portfolios.',
        isCheckbox: true
      },

      {
        text: '*Has the size of the portfolios been disclosed and the basis for which they were selected? You can’t publish the ad until you meet this disclosure.',
        isCheckbox: true
      },
      {
        text: '*Provide the specific details of the related portfolios included in the ad. Portfolio names, policies, objectives, and strategies. Also, detail the reason why you selected them.',
        isCheckbox: false
      }
    ],
    dragAndDrop: '*Upload documentation of the related portfolios calculation.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 7,
    question:
      'Are performance results from a subset of investments extracted from a single portfolio shown in the advertisement?',
    answerInstructions: 'If no, move onto 7. If yes, complete forms below.',

    notes: (
      <Box>
        <Typography sx={{ fontSize: '0.8rem' }}>
          Extracted performance refers to results from a subset of investments taken from a single
          portfolio. You can only include extracted performance results if the following conditions
          are met:
        </Typography>
        <ol>
          <li style={{ fontSize: '0.8rem' }}>
            The extracted performance is shown net of fees (after fees are deducted from the
            return).
          </li>
          <li style={{ fontSize: '0.8rem' }}>
            The advertisement provides, or offers to provide promptly, the performance results of
            the total portfolio from which the performance was extracted.
          </li>
        </ol>
        <Typography sx={{ fontSize: '0.8rem' }}>
          <span style={{ fontWeight: 'bold' }}>Keep in mind:</span> These requirements only apply to
          a subset of investments extracted from a single portfolio. Carve-outs from a composite of
          portfolios are allowed but subject to hypothetical performance rules (see Q. 7).
        </Typography>
      </Box>
    ),
    subQuestions: [
      {
        text: '*Has the extracted performance been shown net of fees? You can’t publish the ad until the results are shown after fees have been deducted from the return.',
        isCheckbox: true
      },

      {
        text: '*Has the performance results of the total portfolio been shown? You can’t publish the ad until the total portfolio results are displayed.',
        isCheckbox: true
      }
    ],
    dragAndDrop: '*Upload the ad showing both net of fees and the total portfolio are included.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 8,
    question:
      'Are performance results from a subset of investments extracted from a single portfolio shown in the advertisement?',
    answerInstructions: 'If no, move onto 10. If yes, complete forms below.',

    notes: (
      <Box>
        <Typography sx={{ fontSize: '0.8rem' }}>
          Hypothetical performance refers to results not actually achieved by a real portfolio of an
          investment advisor. Here are a few examples of hypothetical advertising: Model portfolio
          performance, back-tested performance, and targeted or projected performance returns.
        </Typography>

        <Typography sx={{ fontSize: '0.8rem' }}>
          Examples of what does not constitute hypothetical performance: Predecessor performance
          that is displayed in compliance with requirements and performance.
        </Typography>
      </Box>
    ),
    notes2: (
      <Box>
        <Typography sx={{ fontSize: '0.8rem' }}>
          An interactive analysis tool that a client or potential client uses to create simulations
          and statistical analysis of likely future results, provided the adviser:
        </Typography>
        <ol>
          <li>
            Provides a description of the criteria and methodology used, including the tool&apos;s
            limitations and exclusions.
          </li>
          <li>
            Explains that the results may vary with each use and over time and, if applicable,
            describes all the investments considered in the analysis.
          </li>
          <li>
            Explains how the tool determines which investments to select and if the tool favors
            certain investments and why the selectivity.
          </li>
          <li>
            States other investments not considered may have the same characteristics, similar or
            better than those being analyzed.
          </li>
          <li>Discloses that the tool generates outcomes that are hypothetical in nature.</li>
        </ol>
      </Box>
    ),
    isMultipleNotes: true,
    subQuestions: [
      {
        text: '*Why do you consider the ad hypothetical?',
        isCheckbox: false
      }
    ],
    // dragAndDrop: '*Upload the ad showing both net of fees and the total portfolio are included.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 9,
    question:
      'If the advertisement does contain hypothetical performance, has it met the following 3 conditions?',
    answerInstructions:
      'If N/A, move onto 10. If no, complete the questions below. If yes, move onto 9.',

    isQuestionWithNA: true,
    notes: (
      <Box>
        <ol>
          <li>
            Implemented policies and procedures to ensure the hypothetical performance is relevant
            to the financial situation and objectives of the intended audience.
          </li>
          <li>
            Explains that the results may vary with each use and over time and, if applicable,
            Provide relevant information to enable the intended audience to understand the criteria
            used and assumptions made in the calculation of the hypothetical performance.
          </li>
          <li>
            Provide sufficient information to enable the intended audience to understand the risks
            and limitations of using such hypothetical performance in making investment decisions.
            If the intended audience is an investor in a private fund, offer to provide the
            information promptly.
          </li>
        </ol>
      </Box>
    ),
    isMultipleNotes: false,
    subQuestions: [
      {
        text: '*Provide details on which, if any, of the three conditions have been met. If you can’t provide details and demonstrate all 3 conditions are met, then the ad can’t be published.',
        isCheckbox: false
      }
    ],
    dragAndDrop: '*Upload documentation to demonstrate the 3 conditions have been met.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 10,
    question:
      'Will you distribute your hypothetical performance advertisements to investors who fall into one of two categories?If the answer is yes to either scenario, you cannot distribute your performance advertisements to these investors.',
    answerInstructions:
      'If N/A, move onto 10. If no, move onto 10. If yes, complete the confirmation below.',

    isQuestionWithNA: true,
    notes: (
      <Box>
        <ol>
          <li>
            Investors who don’t have access to the resources to independently analyze such
            hypothetical performance; or
          </li>
          <li>
            Investors who don’t have sufficient financial experience to understand the risks and
            limitations of hypothetical performance.
          </li>
        </ol>
      </Box>
    ),
    isMultipleNotes: false,
    subQuestions: [
      {
        text: '*I confirm the ad. will not be distributed to those that don’t have access to the resources to independently analyze such hypothetical performance; or those that don’t have sufficient financial experience to understand the risks and limitations of hypothetical performance.',
        isRadio: true
      }
    ],
    // dragAndDrop: '*Upload documentation to demonstrate the 3 conditions have been met.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 11,
    question: 'Is there predecessor performance in the performance advertising?',
    answerInstructions: 'If no, move onto 13. If yes, move onto 11.',

    isQuestionWithNA: false,
    notes:
      'Predecessor performance is defined as performance achieved by a group of investments within an account or private fund that was not advised 100% of the time during the period shown by the adviser who is showing the advertisement.',
    isMultipleNotes: false,
    // subQuestions: [
    //   {
    //     text: '*I confirm the ad. will not be distributed to those that don’t have access to the resources to independently analyze such hypothetical performance; or those that don’t have sufficient financial experience to understand the risks and limitations of hypothetical performance.',
    //     isRadio: true
    //   }
    // ],
    // dragAndDrop: '*Upload documentation to demonstrate the 3 conditions have been met.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'Yes',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 12,
    question:
      'Are all 4 guidelines below being met with the predecessor performance? If you’re not meeting all four, you can’t use the predecessor performance in your advertising.',
    answerInstructions: 'If Yes, move onto 13. If no, complete the forms. If N/A, move onto 13.',

    isQuestionWithNA: true,
    notes: (
      <Box>
        <ol>
          <li>
            The adviser responsible for achieving the prior performance results manages accounts at
            the advertising adviser.
          </li>
          <li>
            The accounts managed at the prior firm are sufficiently similar to the present account.
          </li>
          <li>
            All accounts managed that are substantially similar are advertised unless leaving out
            these accounts would not result in a higher performance and the exclusion doesn’t alter
            the 1-, 5-, and 10-year time periods
          </li>
          <li>
            The advertisement clearly and prominently includes all relevant disclosures, including
            that the performance results were achieved at another firm.
          </li>
        </ol>
      </Box>
    ),
    isMultipleNotes: false,
    subQuestions: [
      {
        text: '*Provide details on how you plan to meet the guidelines for predecessor performance.',
        isRadio: false
      }
    ],
    dragAndDrop: '*Upload documentation to demonstrate the 4 guidelines have been met.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 13,
    question: 'Do you have all the relevant documentation related to the predecessor performance?',
    answerInstructions:
      'If N/A, move onto 13. If no, complete the confirmation below. If yes, move onto 13.',

    isQuestionWithNA: true,
    notes:
      'You must review all records related to the predecessor performance in order to substantiate performance. If you don’t have access to these records, you cannot use the advertisement.',
    isMultipleNotes: false,
    subQuestions: [
      {
        text: '*I confirm that I will not publish the ad until I have all relevant documentation.',
        isRadio: true
      }
    ],
    // dragAndDrop: '*Upload documentation to demonstrate the 3 conditions have been met.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  },
  {
    id: 14,
    question: <AdProhibitation />,
    // 'In addition to your advertisement addressing the 12 questions above, does it also comply with the seven general prohibitions outlined here?',
    answerInstructions: 'If no, complete the confirmation. If yes, complete review.',

    isQuestionWithNA: false,
    // notes: 'You must review all records related to the predecessor performance in order to substantiate performance. If you don’t have access to these records, you cannot use the advertisement.',
    isMultipleNotes: false,
    subQuestions: [
      {
        text: '*I confirm that I will not publish the advertisement until it complies with the 7 general advertisement prohibitions.',
        isRadio: true
      }
    ],
    // dragAndDrop: '*Upload documentation to demonstrate the 3 conditions have been met.',
    // isUpdated:
    //   'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    note: 'No',
    isUpdated:
      'Has the updated marketing piece been corrected? If no, you cannot publish or send to clients or prospective clients until addressed.',
    isUpdatedTrue: 'Great. Move on to the next question.',
    isUpdatedFalse:
      'Be sure to correct the marketing material before you publish or send out to clients. Not correcting this error results in a violation of the marketing rule.'
  }
];
const fieldData = [
  {
    id: 1,
    name: 'ad_name',
    fieldTitle: 'Name of Performance Advertising:',
    type: 'text',
    isFileUpload: false,
    columnSize: 5
  },
  {
    id: 2,
    name: 'advisor',
    fieldTitle: 'Advisor(s)',
    type: 'text',
    isFileUpload: false,
    columnSize: 5
  },
  {
    id: 3,
    name: 'date',
    fieldTitle: 'Review Date:',
    type: 'date',
    isFileUpload: false,
    columnSize: 2
  },
  {
    id: 4,
    name: 'audience',
    fieldTitle: 'Intended Audience:',
    type: 'text',
    isFileUpload: false,
    columnSize: 6
  },
  {
    id: 5,
    name: 'ad_location',
    fieldTitle: '  Location of ad:',
    type: 'text',
    isFileUpload: false,
    columnSize: 6
  },

  {
    id: 6,
    name: 'upload',
    fieldTitle: ' Upload your Advertisement (Screenshot, PDF, Word Doc or PPT):',
    type: 'upload',
    isFileUpload: true,
    columnSize: 12
  }
];

const PartialPerformanceAd = () => {
  const [presentationAnswers, setPresentationAnswers] = useState<Answer[]>([]);
  const initialValues = {
    ad_name: '',
    ad_location: '',

    advisor: '',
    date: '',
    audience: '',
    upload: ''
  };

  return (
    <MainComponentForm
      answers={presentationAnswers}
      setAnswers={setPresentationAnswers}
      formInitialValues={initialValues}
      fieldData={fieldData}
      questions={questions}
      topHeading={'Performance Advertising'}
    />
  );
};
export default PartialPerformanceAd;
