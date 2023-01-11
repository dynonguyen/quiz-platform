import { makeStyles } from '@cads-ui/core';
import { Avatar } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  messageRow: {
    display: 'flex'
  },
  messageRowRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  messageBlue: {
    position: 'relative',
    marginLeft: '20px',
    marginBottom: '10px',
    padding: '10px',
    color: 'black',
    backgroundColor: '#A8DDFD',
    width: '60%',
    minW: '140px',
    maxW: '320px',
    wordWrap: 'break-word',
    textAlign: 'left',
    font: "400 .9em 'Open Sans', sans-serif",
    border: '1px solid #97C6E3',
    borderRadius: '10px',
    '&:after': {
      content: "''",
      position: 'absolute',
      width: '0',
      height: '0',
      borderTop: '15px solid #A8DDFD',
      borderLeft: '15px solid transparent',
      borderRight: '15px solid transparent',
      top: '0',
      left: '-15px'
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '0',
      height: '0',
      borderTop: '17px solid #97C6E3',
      borderLeft: '16px solid transparent',
      borderRight: '16px solid transparent',
      top: '-1px',
      left: '-17px'
    }
  },
  messageOrange: {
    position: 'relative',
    marginRight: '20px',
    marginBottom: '10px',
    padding: '20px',
    color: 'black',
    backgroundColor: '#dee6ff',
    width: '60%',
    minW: '140px',
    maxW: '320px',
    wordWrap: 'break-word',
    textAlign: 'left',
    font: "400 .9em 'Open Sans', sans-serif",
    border: '1px solid #abc0ff',
    borderRadius: '10px',
    '&:after': {
      content: "''",
      position: 'absolute',
      width: '0',
      height: '0',
      borderTop: '15px solid #dee6ff',
      borderLeft: '15px solid transparent',
      borderRight: '15px solid transparent',
      top: '0',
      right: '-15px'
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '0',
      height: '0',
      borderTop: '17px solid #abc0ff',
      borderLeft: '16px solid transparent',
      borderRight: '16px solid transparent',
      top: '-1px',
      right: '-17px'
    }
  },

  messageContent: {
    padding: 0,
    margin: 0,
    marginBottom: '10px'
  },
  messageTimeStampRight: {
    position: 'absolute',
    fontSize: '.85em',
    fontWeight: '300',
    marginTop: '8px',
    padding: '6px 0',
    bottom: '-3px',
    right: '5px'
  },

  orange: {
    color: 'green',
    backgroundColor: 'orange',
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  avatarNothing: {
    color: 'transparent',
    backgroundColor: 'transparent',
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  displayName: {
    marginLeft: '20px',
    fontSize: '0.8rem',
    marginBottom: '2px'
  }
}));

//avatar
export const MessageLeft = (props) => {
  const message = props.message
    ? props.message
    : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non.';
  const timestamp = props.timestamp ? props.timestamp : '';
  const photoURL = props.photoURL ? props.photoURL : 'dummy.js';
  const displayName = props.displayName ? props.displayName : 'Tên người gửi';
  const classes = useStyles();
  return (
    <>
      <div className={classes.messageRow}>
        <Avatar
          alt={displayName}
          className={classes.orange}
          src={photoURL}
        ></Avatar>
        <div>
          <div className={classes.displayName}>{displayName}</div>
          <div className={classes.messageBlue}>
            <div>
              <p className={classes.messageContent}>{message}</p>
            </div>
            <div className={classes.messageTimeStampRight}>{timestamp}</div>
          </div>
        </div>
      </div>
    </>
  );
};

//avatar
export const MessageRight = (props) => {
  const classes = useStyles();
  const message = props.message ? props.message : 'no message';
  const timestamp = props.timestamp ? props.timestamp : '';
  return (
    <div className={classes.messageRowRight}>
      <div className={classes.messageOrange}>
        <p className={classes.messageContent}>{message}</p>
        <div className={classes.messageTimeStampRight}>{timestamp}</div>
      </div>
    </div>
  );
};
