import { Button } from '@cads-ui/core';
import { Icon } from '@iconify/react';

function FacebookLoginButton() {
  return (
    <Button
      sx={{ justifyContent: 'flex-start' }}
      color="#3b5998"
      fullWidth
      startIcon={<Icon icon="bi:facebook" />}
    >
      Login with Facebook
    </Button>
  );
}

export default FacebookLoginButton;
