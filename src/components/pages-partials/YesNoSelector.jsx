/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { COLORS } from '@/constants/colors';

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
  cursor: ${({ readOnly }) => (readOnly ? 'default' : 'pointer')};
`;

const Text = styled.span`
  font-family: Inter SemiBold;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
`;

const YesNoSelector = ({ options = ['Yes', 'No'], onSelect, selectedOption, readOnly = false }) => {
  const handleSelect = (option) => {
    if (!readOnly) {
      onSelect?.(option);
    }
  };

  return (
    <OptionContainer>
      {options.map((option) => (
        <Option key={option} onClick={() => handleSelect(option)} readOnly={readOnly}>
          {selectedOption === option ? (
            <CheckBoxIcon sx={{ color: COLORS.BLUE_600, fontSize: 20 }} />
          ) : (
            <CheckBoxOutlineBlankIcon sx={{ color: COLORS.GREY_400, fontSize: 20 }} />
          )}
          <Text>{option}</Text>
        </Option>
      ))}
    </OptionContainer>
  );
};

export default YesNoSelector;
