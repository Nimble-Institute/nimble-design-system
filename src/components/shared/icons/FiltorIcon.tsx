import React from 'react';

const FilterIcon: React.FC<{color: string; backgroundcolor?: string}> = ({color, backgroundcolor}) => {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill={backgroundcolor} fill-opacity="0.1" />
      <path
        d="M18.3186 23.0698C18.3186 23.6798 17.9186 24.4798 17.4086 24.7898L15.9986 25.6998C14.6886 26.5098 12.8686 25.5998 12.8686 23.9798V18.6298C12.8686 17.9198 12.4686 17.0098 12.0586 16.5098L8.21859 12.4698C7.70859 11.9598 7.30859 11.0598 7.30859 10.4498V8.12977C7.30859 6.91977 8.21859 6.00977 9.32859 6.00977H22.6686C23.7786 6.00977 24.6886 6.91977 24.6886 8.02977V10.2498C24.6886 11.0598 24.1786 12.0698 23.6786 12.5698"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.8711 21.1191L22.8711 20.1191M20.0711 20.5191C20.9198 20.5191 21.7337 20.182 22.3338 19.5819C22.934 18.9818 23.2711 18.1678 23.2711 17.3191C23.2711 16.4704 22.934 15.6565 22.3338 15.0564C21.7337 14.4563 20.9198 14.1191 20.0711 14.1191C19.2224 14.1191 18.4085 14.4563 17.8084 15.0564C17.2082 15.6565 16.8711 16.4704 16.8711 17.3191C16.8711 18.1678 17.2082 18.9818 17.8084 19.5819C18.4085 20.182 19.2224 20.5191 20.0711 20.5191Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default FilterIcon;
