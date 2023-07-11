import React, {useEffect, useState} from 'react';
import {
  IconButton,
  Box,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Dialog,
} from '@mui/material';
import {DialogProps} from '@mui/material/Dialog';
import {TransitionProps} from '@mui/material/transitions';

import {PrimaryActionButton, SecondaryActionButton, TextActionButton, TitleWrapper, Title} from './StyledWrappers';
import CloseSVG from '../../assets/images/dialog/close.svg';

interface NimbleDialogProps {
  open: boolean;
  title: string;
  content: any;
  fontFamily?: string;
  metaData: any;
  primaryColor?: string;
  parimaryActionLabel: string;
  isSecondaryActionAvailable?: boolean;
  secondaryActionlabel?: string;
  onClickSecondaryAction?: (metaData: any) => void;
  mainActionInProgress?: boolean;
  onClickPrimaryAction?: () => void;
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
  content,
  metaData,
  fontFamily,
  primaryColor = '#0057A2',
  parimaryActionLabel,
  isSecondaryActionAvailable,
  secondaryActionlabel = 'Back',
  onClickSecondaryAction,
  mainActionInProgress,
  onClickPrimaryAction,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setOpenDialog(open);
  }, [open]);

  const handleClose = () => {
    !mainActionInProgress && setOpenDialog(false);
  };

  const handleSecondaryAction = () => {
    onClickSecondaryAction && !mainActionInProgress && onClickSecondaryAction(metaData);
  };

  const handlePrimaryAction = () => {
    onClickPrimaryAction && !mainActionInProgress && onClickPrimaryAction();
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
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
          <IconButton onClick={() => setOpenDialog(false)}>
            <img src={CloseSVG} />
          </IconButton>
        </TitleWrapper>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{content(metaData)}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{padding: '30px'}}>
        <TextActionButton onClick={handleClose} variant="text" size="small" buttonColor={primaryColor}>
          Cancel
        </TextActionButton>
        {isSecondaryActionAvailable && (
          <SecondaryActionButton
            onClick={handleSecondaryAction}
            variant="outlined"
            size="small"
            buttonColor={primaryColor}>
            {secondaryActionlabel}
          </SecondaryActionButton>
        )}
        <PrimaryActionButton
          onClick={handlePrimaryAction}
          variant="contained"
          size="small"
          buttonColor={primaryColor}
          startIcon={mainActionInProgress && <CircularProgress size={12} sx={{color: '#fff'}} />}>
          {parimaryActionLabel}
        </PrimaryActionButton>
      </DialogActions>
    </Dialog>
  );
};
