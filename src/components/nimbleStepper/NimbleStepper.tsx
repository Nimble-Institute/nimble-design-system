import React from 'react';
import {Box, Stepper, Step, StepLabel, Typography} from '@mui/material';

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
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
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
              fontSize: '2rem',
            },
          },
          '& .Mui-completed': {
            '&.MuiStepIcon-root': {
              color: completedColor,
              fontSize: '2rem',
            },
          },
          '& .MuiStepIcon-root': {
            fontSize: '2rem',
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
