import CheckboxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckboxIcon from '@mui/icons-material/CheckBox';
import styled from '@emotion/styled';
import { COLORS } from '@/constants/colors';
import { useState } from 'react';

const Icon = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

interface Props {
  onSelect: (isChecked: boolean) => void;
  checked?: boolean;
  readOnly?: boolean;
}

const SingleCheckbox: React.FC<Props> = ({ onSelect, checked = false, readOnly = false }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleSelect = () => {
    if (!readOnly) {
      const newCheckedState = !isChecked;
      setIsChecked(newCheckedState);
      onSelect(newCheckedState); // Pass the updated checked state
    }
  };

  return (
    <Icon onClick={handleSelect}>
      {isChecked ? (
        <CheckboxIcon sx={{ color: COLORS.BLUE_600 }} />
      ) : (
        <CheckboxOutlineBlankIcon sx={{ color: COLORS.GREY_400 }} />
      )}
    </Icon>
  );
};

export default SingleCheckbox;
