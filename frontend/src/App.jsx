import { ToastContainer } from 'react-toastify';
import ThemeConfig from './components/ThemeConfig';
import 'react-toastify/dist/ReactToastify.css';
import '@cads-ui/core/override/react-toastify.css';

// -----------------------------
function App() {
  return (
    <ThemeConfig>
      <ToastContainer />
    </ThemeConfig>
  );
}

export default App;
