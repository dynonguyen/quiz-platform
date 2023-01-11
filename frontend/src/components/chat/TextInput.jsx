import { makeStyles } from '@cads-ui/core';
import { Icon } from '@iconify/react';
import { Button, TextField } from '@mui/material';
import { useRef } from 'react';
const useStyles = makeStyles((theme) => ({
  wrapForm: {
    display: 'flex',
    justifyContent: 'center',
    width: '95%',
    margin: `${theme.spacing(0)} auto`
  },
  wrapText: {
    width: '100%'
  },
  button: {
    marginLeft: '6px'
  }
}));

export const TextInput = ({ onClickSendMessage }) => {
  const classes = useStyles();
  const textMessages = useRef('');

  return (
    <div className={classes.wrapForm} noValidate autoComplete="off">
      <TextField
        id="standard-text"
        label="Nội dung"
        className={classes.wrapText}
        inputRef={textMessages}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => {
          onClickSendMessage(textMessages.current.value);
          textMessages.current.value = '';
        }}
      >
        <Icon icon="material-symbols:send-outline" />
      </Button>
    </div>
  );
};
