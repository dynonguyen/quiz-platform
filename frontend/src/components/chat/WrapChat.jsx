import { Box, makeStyles } from '@cads-ui/core';
import { Divider, Paper, Typography } from '@mui/material';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { MessageLeft, MessageRight } from '~/components/chat/Message';
import { TextInput } from '~/components/chat/TextInput';
import useSelectorOnly from '~/hooks/useOnlySelector';
import { savePresentation } from '~/redux/slices/presentationSlice';
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

function WrapChat() {
  const { chats } = useSelectorOnly('presentation', ['chats']);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  const onClickSendMessage = (textMessages) => {
    const chat = {
      ownerId: {
        _id: user.userId,
        avt: user.avt,
        name: user.name
      },
      chatText: textMessages,
      seen: [user.userId]
    };
    dispatch(
      savePresentation({
        userId: user.userId,
        chats: [...chats, chat],
        updateChat: true
      })
    );
  };
  return (
    <Box className={classes.container}>
      <Paper className={classes.paper}>
        <Typography className={classes.titleChat} variant="h4">
          Chat box
        </Typography>
        <Divider variant="dashed" spacing={2} />
        <Paper id="style-1" className={classes.messagesBody}>
          {chats.length > 0
            ? chats.map((chat) =>
                chat.ownerId._id === user.userId ? (
                  <MessageRight
                    key={chat._id ? chat._id : new Date().getTime()}
                    message={chat.chatText}
                    timestamp={moment(chat.createdAt).format('hh:mm DD/MM/YY')}
                    photoURL={chat.ownerId.avt}
                    displayName={chat.ownerId.name}
                  />
                ) : (
                  <MessageLeft
                    key={chat._id ? chat._id : new Date().getTime()}
                    message={chat.chatText}
                    timestamp={moment(chat.createdAt).format('hh:mm DD/MM/YY')}
                    photoURL={chat.ownerId.avt}
                    displayName={chat.ownerId.name}
                  />
                )
              )
            : 'chưa có tin nhắn nào'}
        </Paper>
        {user.userId && (
          <TextInput
            chats={chats}
            user={user}
            onClickSendMessage={onClickSendMessage}
          />
        )}
      </Paper>
    </Box>
  );
}

export default WrapChat;
