import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React from 'react';

interface NimbleStepperProps {
  steps: string[];
  labelSize?: string;
  activeStep: number;
  fontFamily?: string;
  primaryColor?: string;
  inactiveColor?: string;
  completedColor?: string;
  alternativeLabel?: boolean;
}

export const NimbleStepper: React.FC<NimbleStepperProps> = ({
  steps,
  activeStep,
  fontFamily,
  labelSize = '14px',
  primaryColor = '#0057A2',
  completedColor = '#B4D74B',
  inactiveColor = '#B8DEFF',
  alternativeLabel = false,
}) => {
  return (
    <Box sx={{width: '100%'}}>
      <Stepper
        activeStep={activeStep - 1}
        alternativeLabel={alternativeLabel}
        sx={{
          padding: 2,
          '& .Mui-active': {
            '&.MuiStepIcon-root': {
              color: primaryColor,
              fontSize: '1.4rem',
            },
          },
          '& .Mui-completed': {
            '&.MuiStepIcon-root': {
              color: completedColor,
              fontSize: '1.4rem',
            },
          },
          '& .MuiStepIcon-root': {
            fontSize: '1.4rem',
            color: inactiveColor,
          },
        }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <Typography
                sx={{fontFamily, fontSize: labelSize, fontWeight: index <= activeStep - 1 ? '500' : undefined}}>
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
