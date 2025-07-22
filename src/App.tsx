// src/App.tsx
import { Provider } from 'react-redux';
import { Suspense } from 'react';
import Routes from './routes';
import { store } from './redux/store';
import LoadingSpinner from './components/common/LoadingSpinner';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes />
      </Suspense>
    </Provider>
  );
};

export default App;