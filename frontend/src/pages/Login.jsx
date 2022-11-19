import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { PATH } from '~/constant/path';

function Login() {
  const { isAuth } = useSelector((state) => state.user);

  if (isAuth) {
    return <Navigate to={PATH.HOME} />;
  }

  return <div>Hello login</div>;
}

export default Login;
