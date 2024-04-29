import { App } from './App';
import { createRoot } from 'react-dom/client';
const $root = document.querySelector('#root');

if ($root) {
  const root = createRoot($root);

  root.render(
    <App /> 
  );
};
