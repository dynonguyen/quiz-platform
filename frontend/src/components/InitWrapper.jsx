import React from 'react';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '~/redux/slices/userSlice';
import TokenExpired from './TokenExpired';

function InitWrapper({ children }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <>
      <TokenExpired />
      {children}
    </>
  );
}

export default InitWrapper;
