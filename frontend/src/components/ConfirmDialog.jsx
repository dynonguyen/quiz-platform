import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ConfirmDialog(props) {
  const { onConfirm, titleText, contentText, isOpen, handleClose } = props;
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose()}>Hủy</Button>
        <Button onClick={onConfirm()} autoFocus>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
