import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constant/path';

function AuthProtect({ children }) {
  const { isAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!isAuth) {
    return navigate(PATH.LOGIN);
  }

  return children;
}

export default AuthProtect;
