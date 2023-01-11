import { Box, makeStyles } from '@cads-ui/core';
import { Paper } from '@mui/material';
import { MessageLeft, MessageRight } from '~/components/chat/Message';
import { TextInput } from '~/components/chat/TextInput';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    height: '100vh',
    maxWidth: '500px',
    maxHeight: '700px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    padding: '12px 0'
  },
  paper2: {
    width: '80vw',
    maxWidth: '500px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative'
  },
  container: {
    width: '100%',
    maxWidth: '540px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  messagesBody: {
    width: 'calc( 100% - 20px )',
    paddingTop: '12px',
    margin: '10px',
    overflowY: 'scroll',
    height: 'calc( 100% - 80px )'
  },
  titleChat: {
    border: '1px solid #d7d7d7',
    borderRadius: '4px',
    p: '6px',
    w: 1,
    textAlign: 'center',
    backgroundColor: '#dee6ff'
  }
}));

export default function WrapChat() {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Paper className={classes.paper} zDepth={2}>
        <Paper id="style-1" className={classes.messagesBody}>
          {/* <MessageLeft
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo."
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Tên người gửi"
            avatarDisp={true}
          /> */}
          <MessageLeft
            message="Loremikkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
            timestamp="MM/DD 00:00"
            photoURL=""
            displayName="Tên người gửi"
            avatarDisp={false}
          />
          {/* <MessageRight
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non."
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Tên người gửi mới"
            avatarDisp={true}
          /> */}
          <MessageRight
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Tên người gửi mới"
            avatarDisp={false}
          />
        </Paper>
        <TextInput />
      </Paper>
    </Box>
  );
}
