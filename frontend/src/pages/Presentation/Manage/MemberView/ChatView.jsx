import { Container } from '@cads-ui/core';
import WrapChat from '~/components/chat/WrapChat';

function ChatView() {
  return (
    <Container maxWidth="340px" sx={{ mt: 0 }}>
      <WrapChat />
    </Container>
  );
}

export default ChatView;
