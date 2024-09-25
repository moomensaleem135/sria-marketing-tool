/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

import CheckboxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckboxIcon from '@mui/icons-material/CheckBox';

import { COLORS } from '@/constants/colors';

import { useState } from 'react';


const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
`;

const Icon = styled.div`
  font-size: 14px;
`;

const Text = styled.div`
  font-family: Inter SemiBold;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`;

const YesNoSelector = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <OptionContainer>
      <Option onClick={() => handleSelect('Yes')}>
        <Icon>
          {selectedOption === 'Yes' ? (
            <CheckboxIcon sx={{ color: COLORS.BLUE_TEXT }} />
          ) : (
            <CheckboxOutlineBlankIcon sx={{ color: COLORS.GRAY_400 }} />
          )}
        </Icon>
        <Text>Yes</Text>
      </Option>
      <Option onClick={() => handleSelect('No')}>
        <Icon>
          {selectedOption === 'No' ? (
            <CheckboxIcon sx={{ color: COLORS.BLUE_TEXT }} />
          ) : (
            <CheckboxOutlineBlankIcon sx={{ color: COLORS.GRAY_400 }} />
          )}
        </Icon>
        <Text>No</Text>
      </Option>
    </OptionContainer>
  );
};

export default YesNoSelector;
