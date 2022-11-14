import React from 'react';

function AuthProtect({ children }) {
  // Logic authentication here
  console.log('RUN');

  return <>{children}</>;
}

export default AuthProtect;
