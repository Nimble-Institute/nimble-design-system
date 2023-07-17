interface InputLabelProps {
  label?: string;
  labelSize?: number;
  labelWeight?: '400' | '500' | '600' | '700';
  fontFamily?: string;
  isRequired?: boolean;
  disabled?: boolean;
}

interface InputBoxProps {
  width?: string;
  borderColor?: string;
  activeBoxShadow?: string;
  hoverBoxShadow?: string;
}

export {InputLabelProps, InputBoxProps};
