import { Button } from '@cads-ui/core';
import { Icon } from '@iconify/react';

function GoogleLoginButton() {
  return (
    <Button
      sx={{ justifyContent: 'flex-start' }}
      color="#ea4335"
      fullWidth
      startIcon={<Icon icon="bi:google" />}
    >
      Login with Google
    </Button>
  );
}

export default GoogleLoginButton;
