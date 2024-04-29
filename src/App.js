import './styles/index.scss';
import { Router } from './pages';

export const App = () => {
  return (
    <div className={`app`}>   
      <Router />
    </div>
  );
};
