import { Provider } from 'jotai';
import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { GlobalErrorProvider } from './components/ui/GlobalErrorProvider';
import { MainPage } from './pages/MainPage';

// 懒加载预览页面（无loading，包太小会一闪而过）
const PreviewPage = React.lazy(() =>
  import('./pages/PreviewPage').then((module) => ({ default: module.PreviewPage }))
);

function App() {
  return (
    <Provider>
      <GlobalErrorProvider>
        <Router basename="/resume">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/preview"
              element={
                <Suspense fallback={null}>
                  <PreviewPage />
                </Suspense>
              }
            />
          </Routes>
        </Router>
      </GlobalErrorProvider>
    </Provider>
  );
}

export default App;
