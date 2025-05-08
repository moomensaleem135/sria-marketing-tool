'use client';
import React, { useEffect, useRef } from 'react';
import { FlexCol, Footer, ReportRow, UserDataBox } from './index.styles';
import { Line } from '../../../index.styles';

import {
  Col,
  RegularText,
  Row
} from '../../../testimonial-endorsements/Wriiten-Agreement/index.styles';
import { Box, Typography } from '@mui/material';
import ReactSignatureCanvas from 'react-signature-canvas';
import moment from 'moment';
import { IQuestionReportContainer } from '@/store/app/types';
import { BoldText } from '@/components/core/Modal/SignModal/index.styles';
import { COLORS } from '@/constants/colors';
import ReviewReportPDF from './reviewReport';

interface IReviewReport extends IQuestionReportContainer {
  signatureText: string;
}
const ReviewReport = ({ answers, questions, fieldData, formik, signatureText }: IReviewReport) => {
  const sigCanvas = useRef<ReactSignatureCanvas>(null);
  console.log('answers', answers, 'questions', questions);
  useEffect(() => {
    if (signatureText && sigCanvas.current) {
      const canvas = sigCanvas.current.getCanvas();
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Clear canvas with slight transparency to show "sign here" hint
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Signature styling
        const signatureFonts = [
          '"Great Vibes", cursive',
          '"Allura", cursive',
          '"Alex Brush", cursive',
          '"Parisienne", cursive'
        ];

        // Select random signature-like font
        const selectedFont = signatureFonts[Math.floor(Math.random() * signatureFonts.length)];

        // Initial font size
        let fontSize = 24;
        ctx.font = `${fontSize}px ${selectedFont}`;
        ctx.fillStyle = 'black';

        // Measure text
        let textWidth = ctx.measureText(signatureText).width;
        const maxWidth = canvas.width - 15; // Padding

        // Scale down if needed
        while (textWidth > maxWidth && fontSize > 12) {
          fontSize -= 1;
          ctx.font = `${fontSize}px ${selectedFont}`;
          textWidth = ctx.measureText(signatureText).width;
        }

        // Signature positioning and styling
        const x = 2; // Left-align
        const y = canvas.height / 2 + fontSize / 3;

        // Save context to apply transformations
        ctx.save();

        // Apply slight rotation (-2 to 2 degrees) for natural look
        const rotation = Math.random() * 4 - 2;
        ctx.translate(x, y);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-x, -y);

        // Draw with slight opacity variation
        ctx.globalAlpha = 0.9 + Math.random() * 0.1;

        // Draw main signature
        ctx.fillText(signatureText, x, y);

        // Optional: Add subtle second pass with slight offset for ink effect
        ctx.globalAlpha = 0.3;
        ctx.fillText(signatureText, x + 0.1, y + 0.5);

        ctx.restore();
      }
    } else if (!signatureText && sigCanvas.current) {
      // Show faint "Sign here" hint when empty
      const canvas = sigCanvas.current.getCanvas();
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = 'italic 14px Arial';
        ctx.fillStyle = '#ccc';
        ctx.fillText('Sign here', 10, canvas.height / 2);
      }
    }
  }, [signatureText]);
  
  return (
    <FlexCol>
      <Typography sx={{ fontSize: '1.5rem', textAlign: 'center', marginBottom: '1rem' }}>
        Marketing Review Report
      </Typography>
      <Box sx={{ margin: '0.5rem 0' }}>
        {fieldData.map((field) => (
          <Box key={field.id}>
            {field.type !== 'upload' && formik?.values[field.name] && (
              <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {field.fieldTitle}{' '}
                </Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  {formik?.values[field.name] || 'Not provided'}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
        <Line />
      </Box>

      {questions.map((question) => {
        const answer = answers.find((a) => a.id === question.id);

        return (
          <div key={question.id} style={{ marginBottom: '10px' }}>
            {/* Main Question */}
            <Box sx={{ display: 'flex', alignItems: 'start', columnGap: '0.2rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{question.display_order}.</span>
              <Typography
                dangerouslySetInnerHTML={{ __html: question.html_question_text }}
                sx={{ marginTop: '0.02rem' }}
              />
            </Box>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '5px 15px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={answer?.mainAnswer === 'Yes'}
                  readOnly
                  style={{ marginRight: '5px' }}
                />
                Yes
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={answer?.mainAnswer === 'No'}
                  readOnly
                  style={{ marginRight: '5px' }}
                />
                No
              </label>
            </div>

            {/* Sub Questions */}
            {question.subquestions && answer?.subAnswers && answer.mainAnswer === question.show_subquestions && (
              <div style={{ marginLeft: '15px' }}>
                {question.subquestions.map((subQ, subIndex) => (
                  <div key={subIndex} style={{ marginBottom: '5px' }}>
                    <RegularText sx={{ fontWeight: 'bold' }}>{subQ.text}</RegularText>
                    {subQ.field_type==='checkbox' ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '15px',
                          margin: '5px 15px'
                        }}
                      >
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              answer?.subAnswers && answer?.subAnswers[`sub_${subIndex}`] === 'Yes'
                            }
                            readOnly
                            style={{ marginRight: '5px' }}
                          />
                          Yes
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={
                              answer?.subAnswers && answer?.subAnswers[`sub_${subIndex}`] === 'No'
                            }
                            readOnly
                            style={{ marginRight: '5px' }}
                          />
                          No
                        </label>
                      </div>
                    ) : subQ.field_type==='radio' ? (
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly
                        style={{ marginRight: '5px' }}
                      />
                    ) : (
                      <div>
                        <Typography sx={{ fontSize: '0.9rem' }}>
                          {(answer?.subAnswers && answer?.subAnswers[`sub_${subIndex}`]) || ''}
                        </Typography>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Is Updated Question */}
            {/* {question.isUpdated && answer?.mainAnswer === question.note && (
              <div style={{ marginTop: '10px', marginLeft: '15px' }}>
                <RegularText sx={{ fontWeight: 'bold' }}>{question.isUpdated}</RegularText>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '5px 0px' }}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={answer?.isUpdated === 'Yes'}
                      readOnly
                      style={{ marginRight: '5px' }}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={answer?.isUpdated === 'No'}
                      readOnly
                      style={{ marginRight: '5px' }}
                    />
                    No
                  </label>
                </div>
              </div>
            )} */}

            {/* <Line /> */}
          </div>
        );
      })}
      <Line />

      <Footer>
        <RegularText sx={{ marginBottom: '15px' }}>
          I have reviewed the attached marketing piece and answered all questions for the review
          truthfully and to the best of my knowledge.
        </RegularText>
        <UserDataBox>
          <ReportRow>
            <BoldText style={{ minWidth: '3rem' }}>CCO Name:</BoldText>
            {/* <Col> */}
            <RegularText>Name</RegularText>
            {/* </Col> */}
          </ReportRow>
          <ReportRow>
            <BoldText style={{ minWidth: '5rem' }}>Date:</BoldText>
            {/* <Col> */}
            <RegularText>{moment().format('MM-DD-YYYY')}</RegularText>
            {/* </Col> */}
          </ReportRow>
          <ReportRow>
            <BoldText style={{ minWidth: '3rem' }}>Signature:</BoldText>
            {/* <Col> */}
            <ReactSignatureCanvas
              ref={sigCanvas}
              penColor="black"
              canvasProps={{
                width: 150,
                height: 30,
                className: 'sigCanvas',
                style: { borderBottom: '1px solid #ccc', fontSize: '0.5rem', pointerEvents: 'none' }
              }}
              backgroundColor="transparent"
              clearOnResize={false}
            />
            {/* </Col> */}
          </ReportRow>
        </UserDataBox>
      </Footer>
      {/* <Line /> */}
    </FlexCol>
  );
};

export default ReviewReport;
