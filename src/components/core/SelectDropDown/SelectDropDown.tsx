import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { PlaceHolder } from 'src/app/index.styles';

interface MultipleSelectProps {
  names: string[];
  placeholder: string;
  defaultValue?: string[];
  multiple: boolean;
  setValue: any;
  value: string;
  width?: string;
}

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const MultipleSelectPlaceholder: React.FC<MultipleSelectProps> = ({
  names,
  multiple,
  setValue,
  value,
  width
}) => {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setValue(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, ml: 0, width: width ? width : 300 }}>
        <Select
          multiple={multiple}
          displayEmpty
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            return <PlaceHolder sx={{ fontSize: '0.9rem' }}>{value}</PlaceHolder>;
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ height: '2.5rem', fontSize: '0.8rem' }}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} sx={{ fontSize: '0.9rem' }}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelectPlaceholder;
