import { Provider } from 'jotai';
import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';

// 懒加载预览页面（无loading，包太小会一闪而过）
const PreviewPage = React.lazy(() =>
  import('./pages/PreviewPage').then((module) => ({ default: module.PreviewPage }))
);

// 懒加载提示词管理页面
const PromptManagePage = React.lazy(() =>
  import('./pages/PromptManagePage').then((module) => ({ default: module.PromptManagePage }))
);

function App() {
  return (
    <Provider>
      <Router>
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
          <Route
            path="/prompts"
            element={
              <Suspense fallback={null}>
                <PromptManagePage />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
