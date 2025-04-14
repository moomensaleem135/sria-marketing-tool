import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { RegularityEditBtn } from './index.styles';

interface IButtonWithLoading {
  text: string;
  isLoading?: boolean | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  handleClick?: () => void | Promise<any>;
  bg?: string;
  textColor?: string;
  border?: string;
  loaderColor?: string;
  disable?: boolean;
  icon?: string;
}
const ButtonWitnLoading = ({
  text,
  isLoading,
  type,
  handleClick,
  bg,
  textColor,
  border,
  loaderColor,
  disable = false,
  icon
}: IButtonWithLoading) => {
  return (
    <RegularityEditBtn
      type={type ? type : 'button'}
      onClick={handleClick}
      bg={bg}
      textColor={textColor}
      border={border}
      disabled={disable}
    >
      {isLoading ? (
        <CircularProgress size={25} sx={{ color: loaderColor ? loaderColor : 'white' }} />
      ) : (
        <>
          {text}
          {icon && <Image src={icon} alt={icon} height={25} width={25} />}
        </>
      )}
    </RegularityEditBtn>
  );
};

export default ButtonWitnLoading;
