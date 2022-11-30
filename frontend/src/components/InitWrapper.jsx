import React from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '~/redux/slices/userSlice';

function InitWrapper({ children }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return <>{children}</>;
}

export default InitWrapper;
