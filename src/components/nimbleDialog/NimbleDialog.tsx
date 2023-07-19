import React, {useEffect, useState} from 'react';
import {IconButton, DialogActions, DialogContent, DialogTitle, Slide, Dialog, Breakpoint, Box} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';

import {TitleWrapper, Title} from './StyledWrappers';
import {NimbleButtonProps, NimbleButton} from '../nimbleButton/NimbleButton';
import CloseSVG from '../../assets/images/dialog/close.svg';

interface NimbleDialogProps {
  open: boolean;
  title: string;
  fontFamily?: string;
  primaryColor?: string;
  parimaryActionLabel: string;
  isSecondaryActionAvailable?: boolean;
  secondaryActionlabel?: string;
  onClickSecondaryAction?: () => void;
  mainActionInProgress?: boolean;
  onClickPrimaryAction?: () => void;
  onClickClose: () => void;
  maxWidth: Breakpoint;
  topActionPanel?: boolean;
  topActionPanalData?: NimbleButtonProps[];
  children: any;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const NimbleDialog: React.FC<NimbleDialogProps> = ({
  open,
  title,
  fontFamily = 'Roboto,Helvetica,Arial,sans-serif',
  primaryColor = '#0057A2',
  parimaryActionLabel,
  isSecondaryActionAvailable,
  secondaryActionlabel = 'Back',
  onClickSecondaryAction,
  mainActionInProgress,
  onClickPrimaryAction,
  onClickClose,
  maxWidth = 'sm',
  topActionPanel,
  topActionPanalData,
  children,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setOpenDialog(open);
  }, [open]);

  const handleClose = () => {
    if (!mainActionInProgress) {
      setOpenDialog(false);
      onClickClose();
    }
  };

  const handleSecondaryAction = () => {
    onClickSecondaryAction && !mainActionInProgress && onClickSecondaryAction();
  };

  const handlePrimaryAction = () => {
    onClickPrimaryAction && !mainActionInProgress && onClickPrimaryAction();
  };

  const renderTopActionPanal = () => {
    return (
      topActionPanalData &&
      topActionPanalData.map((item, index) => (
        <Box sx={{marginLeft: '5px'}}>
          <NimbleButton {...item} key={`action-panal-${index}-item`} />
        </Box>
      ))
    );
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={maxWidth}
      open={openDialog}
      TransitionComponent={Transition}
      transitionDuration={400}
      keepMounted
      onClose={handleClose}
      PaperProps={{
        style: {borderRadius: '12px'},
      }}>
      <DialogTitle>
        <TitleWrapper>
          <Title fontFamily={fontFamily}>{title}</Title>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            {!topActionPanel ? (
              <IconButton onClick={handleClose}>
                <img src={CloseSVG} />
              </IconButton>
            ) : (
              renderTopActionPanal()
            )}
          </Box>
        </TitleWrapper>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{padding: topActionPanel ? '25px' : '30px'}}>
        <NimbleButton onClick={handleClose} label={'Cancel'} variant="text" color={primaryColor} />
        {isSecondaryActionAvailable && (
          <NimbleButton
            onClick={handleSecondaryAction}
            label={secondaryActionlabel}
            variant="outlined"
            color={primaryColor}
          />
        )}
        <NimbleButton
          onClick={handlePrimaryAction}
          label={parimaryActionLabel}
          color={primaryColor}
          loading={mainActionInProgress}
        />
      </DialogActions>
    </Dialog>
  );
};
