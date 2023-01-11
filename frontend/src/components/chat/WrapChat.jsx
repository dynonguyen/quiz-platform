import { Divider, makeStyles, Typography } from '@cads-ui/core';
import { Paper } from '@mui/material';
import { MessageLeft, MessageRight } from '~/components/chat/Message';
import { TextInput } from '~/components/chat/TextInput';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '80vw',
    height: '80vh',
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
    width: '100vw',
    height: '100vh',
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
    <div className={classes.container}>
      <Paper className={classes.paper} zDepth={2}>
        <Typography className={classes.titleChat} variant="h4">
          Chat box
        </Typography>
        <Divider variant="dashed" spacing={2} />
        <Paper id="style-1" className={classes.messagesBody}>
          <MessageLeft
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo."
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Tên người gửi"
            avatarDisp={true}
          />
          <MessageLeft
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non."
            timestamp="MM/DD 00:00"
            photoURL=""
            displayName="Tên người gửi"
            avatarDisp={false}
          />
          <MessageRight
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non."
            timestamp="MM/DD 00:00"
            photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
            displayName="Tên người gửi mới"
            avatarDisp={true}
          />
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
    </div>
  );
}
