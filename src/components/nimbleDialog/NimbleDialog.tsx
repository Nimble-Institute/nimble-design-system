import React, {useEffect, useState} from 'react';
import {
  IconButton,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Dialog,
  Breakpoint,
} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';

import {PrimaryActionButton, SecondaryActionButton, TextActionButton, TitleWrapper, Title} from './StyledWrappers';
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
  fontFamily,
  primaryColor = '#0057A2',
  parimaryActionLabel,
  isSecondaryActionAvailable,
  secondaryActionlabel = 'Back',
  onClickSecondaryAction,
  mainActionInProgress,
  onClickPrimaryAction,
  onClickClose,
  maxWidth = 'sm',
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
          <IconButton onClick={handleClose}>
            <img src={CloseSVG} />
          </IconButton>
        </TitleWrapper>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{padding: '30px'}}>
        <TextActionButton onClick={handleClose} variant="text" size="small" buttoncolor={primaryColor}>
          Cancel
        </TextActionButton>
        {isSecondaryActionAvailable && (
          <SecondaryActionButton
            onClick={handleSecondaryAction}
            variant="outlined"
            size="small"
            buttoncolor={primaryColor}>
            {secondaryActionlabel}
          </SecondaryActionButton>
        )}
        <PrimaryActionButton
          onClick={handlePrimaryAction}
          variant="contained"
          size="small"
          buttoncolor={primaryColor}
          startIcon={mainActionInProgress && <CircularProgress size={12} sx={{color: '#fff'}} />}>
          {parimaryActionLabel}
        </PrimaryActionButton>
      </DialogActions>
    </Dialog>
  );
};
