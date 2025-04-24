import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Box, Radio, TextField } from '@mui/material';
import { RedLine, FlexRow, BoldText, Text, SignatureCol, DateCol } from './index.styles';
import Button from '../../Button';
import { COLORS } from '@/constants/colors';
import { Line } from '@/components/pages-partials/index.styles';
import ButtonWitnLoading from '../../ButtonWithLoading';
import moment from 'moment';

interface SignModalProps {
  closeFunction: () => void;
  handleApprove: () => void;
  signatureText: string;
  setSignatureText: (value: string) => void;
}

const SignModal = ({
  closeFunction,
  handleApprove,
  signatureText,
  setSignatureText
}: SignModalProps) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isApproved, setIsApproved] = useState(false);

  // Draw the text signature on canvas when it changes
  useEffect(() => {
    if (signatureText && sigCanvas.current) {
      const canvas = sigCanvas.current.getCanvas();
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set font style to look like handwriting
        ctx.font = 'italic 40px "Dancing Script", cursive';
        ctx.fillStyle = 'black';

        // Calculate text position (centered)
        const textWidth = ctx.measureText(signatureText).width;
        const x = (canvas.width - textWidth) / 2;
        const y = canvas.height / 2;

        // Draw the text
        ctx.fillText(signatureText, x, y);
      }
    } else if (!signatureText && sigCanvas.current) {
      // Clear canvas if text is empty
      sigCanvas.current.clear();
    }
  }, [signatureText]);

  const handleClear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
    setSignatureText('');
  };

  const handleRadioClick = () => {
    setIsApproved(!isApproved);
  };

  const handleTextSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignatureText(e.target.value);
  };

  // Check if canvas has any drawing or text
  const hasSignature = () => {
    if (!sigCanvas.current) return false;
    const canvas = sigCanvas.current.getCanvas();
    const ctx = canvas.getContext('2d');

    if (!ctx) return false;

    // Check if canvas is not empty
    const pixelBuffer = new Uint32Array(
      ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );

    return pixelBuffer.some((color) => color !== 0);
  };

  return (
    <Box>
      <Line />

      {/* Signature Canvas - will show either drawn or typed signature */}
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{
          width: 600,
          height: 200,
          className: 'sigCanvas',
          style: { border: '1px solid #ccc', margin: '1rem' }
        }}
        backgroundColor="transparent"
        clearOnResize={false}
      />
      {/* <RedLine /> */}
      {/* Text input for signature */}

      {/* <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <Button onClick={handleClear}>Clear Signature</Button>
      </Box> */}

      <FlexRow>
        <SignatureCol>
          {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Radio
              checked={isApproved}
              onClick={handleRadioClick}
              sx={{
                padding: '0',
                color: isApproved ? 'green' : COLORS.BLUE_600,
                '&.Mui-checked': {
                  color: 'green'
                }
              }}
            />
            <Text>Click to Approve Signature</Text>
          </Box> */}
          <input
            value={signatureText}
            onChange={handleTextSignatureChange}
            placeholder="Type your name to generate a signature"
            style={{
              margin: '20px 0 5px 0',
              borderTop: 'none !important',
              borderRight: 'none',
              borderLeft: 'none',
              outline: 'none',
              borderBottom: '1px solid red'
            }}
          />
          {/* <Line /> */}
          <BoldText>Signature</BoldText>
        </SignatureCol>

        <SignatureCol>
          <input
            value={moment().format('MM/DD/YYYY')}
            onChange={handleTextSignatureChange}
            placeholder="Type your name to generate a signature"
            style={{
              margin: '20px 0 5px 0',
              borderTop: 'none !important',
              borderRight: 'none',
              borderLeft: 'none',
              outline: 'none',
              borderBottom: '1px solid red',
              maxWidth: '7rem'
            }}
            disabled
          />
          {/* <Line /> */}
          <BoldText>Date</BoldText>
        </SignatureCol>
      </FlexRow>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', columnGap: '1rem' }}>
        <ButtonWitnLoading
          text="Clear Signature"
          handleClick={handleClear}
          bg="white"
          border={`1px solid ${COLORS.BLUE_600}`}
          textColor={COLORS.BLUE_600}
        />
        <ButtonWitnLoading
          text="Approve"
          handleClick={handleApprove}
          disable={signatureText === ''}
          textColor="white"
        />

        {/* <Button
          onClick={handleApprove}
          disabled={!isApproved || !hasSignature()}
        >
          Approve
        </Button> */}
      </Box>
    </Box>
  );
};

export default SignModal;
