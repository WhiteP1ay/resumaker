import { Provider } from 'jotai';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';

function App() {
  return (
    <Provider>
      <Router basename="/resume">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
