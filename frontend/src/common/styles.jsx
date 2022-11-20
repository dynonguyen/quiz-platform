import { makeStyles } from '@cads-ui/core';

export const useLeftMenuStyles = makeStyles((_) => ({
  box: {
    shadow: 4,
    p: 4,
    borderRadius: '8px',
    '&.content': { h: 1 }
  }
}));
