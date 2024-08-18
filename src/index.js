import { Provider } from 'react-redux';
import { App } from 'app';
import { createRoot } from 'react-dom/client';
import { store } from 'app/store';

const $root = document.querySelector('#root');

if ($root) {
  const root = createRoot($root);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};
