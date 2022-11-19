import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { LS_KEY } from '~/constant/key';
import { PATH } from '~/constant/path';
import LoadingScreen from '../LoadingScreen';

function AuthProtect({ children }) {
  const { isAuth, isLoading } = useSelector((state) => state.user);
  const accessToken = localStorage.getItem(LS_KEY.ACCESS_TOKEN);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuth || !accessToken) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return children;
}

export default AuthProtect;
