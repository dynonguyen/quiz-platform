import { Container } from '@cads-ui/core';
import WrapChat from '~/components/chat/WrapChat';

function ChatView() {
  return (
    <Container maxWidth="xl" sx={{ mt: 10 }}>
      <WrapChat />
    </Container>
  );
}

export default ChatView;
