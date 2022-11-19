import TokenIdleTimer from '@cads-ui/x/TokenIdleTimer';
import { useSelector } from 'react-redux';
import { handleUnAuthentication } from '~/helper/authentication';

function TokenExpired() {
  const { isAuth } = useSelector((state) => state.user);

  if (isAuth)
    return (
      <TokenIdleTimer
        showAlertPopup={true}
        onTokenExpired={handleUnAuthentication}
      />
    );

  return null;
}

export default TokenExpired;
