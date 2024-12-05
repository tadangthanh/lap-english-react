import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppNavbar from './components/Navbar';
import WordPage from './components/word/WordPage';
import Login from './components/LoginPage';
import MainTopicPage from './components/topic/MainTopicPage';
import { SubTopicPageManager } from './components/topic/SubTopicPageManager';
import HeaderWithTabs from './components/tab/HeaderWithTabs';
import { WebSocketProvider } from './components/websocket/WebSocketProvider';
import { TypeGrammarPage } from './components/typeGrammar/TypeGrammarPage';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <WebSocketProvider>
      <>
        {!isLoginPage && <AppNavbar />}
        <div className="container-fluid">
          <div className="row">
            {!isLoginPage && (
              <div className="col-md-2 p-0">
                <Sidebar />
              </div>
            )}
            <div className={isLoginPage ? 'col-12' : 'col-md-10'}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<h2>Home</h2>} />
                <Route path="/word" element={<WordPage />} />
                <Route path="/topic" element={<MainTopicPage />} />
                <Route path="/type-grammar" element={<TypeGrammarPage />} />
                <Route path="/sub-topic/:subTopicId" element={<HeaderWithTabs />} />
                {/* Thêm các route khác ở đây */}
                <Route path="/sub-topic" element={<SubTopicPageManager />} />
              </Routes>
            </div>
          </div>
        </div>
      </>
    </WebSocketProvider>
  );
};

const App: React.FC = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
