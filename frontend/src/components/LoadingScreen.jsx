import { useToggleGlobalLoading } from '@cads-ui/core';
import React from 'react';

function LoadingScreen() {
  const { loading, toggleLoading } = useToggleGlobalLoading();

  React.useEffect(() => {
    if (!loading) {
      toggleLoading(true);
    }

    return () => {
      toggleLoading(false);
    };
  }, []);

  return null;
}

export default LoadingScreen;
