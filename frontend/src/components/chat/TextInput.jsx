import { makeStyles } from '@cads-ui/core';
import { Icon } from '@iconify/react';
import { Button, TextField } from '@mui/material';

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

export const TextInput = () => {
  const classes = useStyles();
  return (
    <>
      <form className={classes.wrapForm} noValidate autoComplete="off">
        <TextField
          id="standard-text"
          label="Tên người gửi tin nhắn"
          className={classes.wrapText}
          //margin="normal"
        />
        <Button variant="contained" color="primary" className={classes.button}>
          <Icon icon="material-symbols:send-outline" />
        </Button>
      </form>
    </>
  );
};
