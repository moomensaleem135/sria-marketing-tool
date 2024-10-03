import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Box, Radio } from '@mui/material';
import { Line, RedLine, FlexRow, BoldText, Text, SignatureCol, DateCol } from './index.styles';
import Button from '../../Button';
import { COLORS } from '@/constants/colors';

interface SignModalProps {
  closeFunction: () => void;
  handleApprove: () => void; // Function to handle approval logic
}

const SignModal = ({ closeFunction, handleApprove }: SignModalProps) => {
  const sigCanvas = useRef<SignatureCanvas>(null); // Reference for signature canvas
  const [isApproved, setIsApproved] = useState(false); // State to track approval

  const handleClear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  const handleRadioClick = () => {
    setIsApproved(!isApproved); // Toggle the approval state
  };

  return (
    <Box>
      <Line />
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} // Customize the size as per need
        backgroundColor="transparent"
        clearOnResize={false}
      />
      <RedLine />

      <FlexRow>
        <SignatureCol>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
          </Box>
          <Line />
          <BoldText>Signature</BoldText>
        </SignatureCol>

        <DateCol>
          <Text>{new Date().toLocaleDateString()}</Text>
          <Line />
          <BoldText>Date</BoldText>
        </DateCol>
      </FlexRow>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={handleApprove}
          disabled={!isApproved} // Disable approve button unless signature is approved
        >
          Approve
        </Button>
      </Box>
    </Box>
  );
};

export default SignModal;
