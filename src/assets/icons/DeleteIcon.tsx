import React from 'react';

const DeleteIcon: React.FC<{color?: string}> = ({color = '#EC4C29'}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill={color} />
      <path
        d="M18 7.98659C15.78 7.76659 13.5467 7.65325 11.32 7.65325C10 7.65325 8.68 7.71992 7.36 7.85325L6 7.98659M9.66667 7.31325L9.81333 6.43992C9.92 5.80659 10 5.33325 11.1267 5.33325H12.8733C14 5.33325 14.0867 5.83325 14.1867 6.44659L14.3333 7.31325M16.5667 10.0933L16.1333 16.8066C16.06 17.8533 16 18.6666 14.14 18.6666H9.86C8 18.6666 7.94 17.8533 7.86667 16.8066L7.43333 10.0933M10.8867 14.9999H13.1067M10.3333 12.3333H13.6667"
        stroke="white"
        stroke-width="0.9"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default DeleteIcon;
