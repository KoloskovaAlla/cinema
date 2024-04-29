import './styles/index.scss';
import { Films, Header } from './components';
import { Router } from './pages';

export const App = () => {
  return (
    <div className={`app`}>
      {/* <Header /> */}
      <Router />
      {/* <Films /> */}
    </div>
  );
};
