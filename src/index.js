import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';

//
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/FirebaseContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// redux
import { store } from './redux/store';

// ----------------------------------------------------------------------

ReactDOM.render(
  <AuthProvider>
    <HelmetProvider>
      <ReduxProvider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </ReduxProvider>
    </HelmetProvider>
  </AuthProvider>,
  document.getElementById('root')
);

// for the app work offline and load faster, can change
// unregister() to register() below.
serviceWorkerRegistration.unregister();

// to start measuring perfomance pass a function
// to log results (for example: reportWebVitals(console.log))
reportWebVitals();
