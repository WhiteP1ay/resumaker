import { Provider } from 'jotai';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { MainPage } from './pages/MainPage';

function App() {
  return (
    <Provider>
      <TooltipProvider>
        <Router basename="/resume">
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </Provider>
  );
}

export default App;
