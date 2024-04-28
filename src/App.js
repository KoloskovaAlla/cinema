import './styles/index.scss';
import { Films, Header } from './components';

export const App = () => {
  return (
    <div className={`app`}>
      <Header />
      {/* <Router /> */}
      <Films />
    </div>
  );
};
