import { Provider } from 'jotai';
import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';

// 懒加载预览页面（无loading，包太小会一闪而过）
const PreviewPage = React.lazy(() =>
  import('./pages/PreviewPage').then((module) => ({ default: module.PreviewPage }))
);

function App() {
  return (
    <Provider>
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
    </Provider>
  );
}

export default App;
