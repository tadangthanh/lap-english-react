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
import { GrammarPage } from './components/grammar/GrammarPage';
import { GrammaticalStructurePage } from './components/grammaticalStructure/GrammaticalStructurePage';
import { ExercisePage } from './components/exercise/ExercisePage';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <WebSocketProvider>
      <>
        {/* Header */}
        {!isLoginPage && <AppNavbar />}

        {/* Layout với Sidebar và Content */}
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          {!isLoginPage && (
            <div className="w-64 bg-gray-800 text-white h-full fixed top-0 left-0 pt-16">
              <Sidebar />
            </div>
          )}

          {/* Main Content */}
          <div
            className={`flex-1 overflow-y-auto pt-16 pl-0 ${!isLoginPage ? 'pl-64' : ''} bg-gray-100`}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/word" element={<WordPage />} />
              <Route path="/topic" element={<MainTopicPage />} />
              <Route path="/type-grammar" element={<TypeGrammarPage />} />
              <Route path="/type-grammar/:typeId/grammar" element={<GrammarPage />} />
              <Route path="/type-grammar/:typeId/grammar/:grammarId/grammatical-structure" element={<GrammaticalStructurePage />} />
              <Route path="/type-grammar/:typeId/grammar/:grammarId/grammatical-structure/:grammaticalStructureId/exercises-management" element={<ExercisePage />} />
              <Route path="/sub-topic/:subTopicId" element={<HeaderWithTabs />} />
              <Route path="/sub-topic" element={<SubTopicPageManager />} />
            </Routes>
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
