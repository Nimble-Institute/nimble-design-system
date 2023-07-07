import React from 'react';

const FilterIcon: React.FC<{color: string}> = ({color}) => {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.3201 19.07C14.3201 19.68 13.9201 20.48 13.4101 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22006 8.47001C3.71006 7.96001 3.31006 7.06001 3.31006 6.45001V4.13001C3.31006 2.92001 4.22006 2.01001 5.33006 2.01001H18.6701C19.7801 2.01001 20.6901 2.92001 20.6901 4.03001V6.25001C20.6901 7.06001 20.1801 8.07001 19.6801 8.57001"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.8701 17.12L18.8701 16.12M16.0701 16.52C16.9188 16.52 17.7327 16.1829 18.3329 15.5827C18.933 14.9826 19.2701 14.1687 19.2701 13.32C19.2701 12.4713 18.933 11.6574 18.3329 11.0573C17.7327 10.4571 16.9188 10.12 16.0701 10.12C15.2214 10.12 14.4075 10.4571 13.8074 11.0573C13.2073 11.6574 12.8701 12.4713 12.8701 13.32C12.8701 14.1687 13.2073 14.9826 13.8074 15.5827C14.4075 16.1829 15.2214 16.52 16.0701 16.52Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default FilterIcon;
