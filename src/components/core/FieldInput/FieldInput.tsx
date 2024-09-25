import { FieldInputStyled } from './FieldInput.styles';
import { IInputProps } from './FieldInput.types';

const FieldInput = ({
  isShadow,
  isEndContent,
  customPadding,
  fontWeight,
  Left,
  ...props
}: IInputProps) => {
  const style = Left ? { paddingLeft: `${Left}rem` } : {};

  return (
    <FieldInputStyled
      isShadow={isShadow}
      isEndContent={isEndContent}
      customPadding={customPadding}
      fontWeight={fontWeight}
      {...props}
      InputProps={{
        style: { ...style }
      }}
    />
  );
};

export default FieldInput;
