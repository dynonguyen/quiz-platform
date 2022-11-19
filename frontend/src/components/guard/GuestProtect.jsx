import { useSelector } from 'react-redux';
import LoadingScreen from '~/components/LoadingScreen';

function GuestProtect({ children }) {
  const { isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return children;
}

export default GuestProtect;
