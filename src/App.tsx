import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppNavbar from './components/Navbar';
import Vocabulary from './components/vocabulary/VocabularyAdd';
import MainTopic from './components/topic/MainTopic';

const App: React.FC = () => {
  return (
    <Router>
      <AppNavbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <Routes>
              <Route path="/" element={<h2>Trang chủ</h2>} />
              <Route path="/vocabulary" element={<Vocabulary />} />
              <Route path="/topic" element={<MainTopic />} />
              {/* Thêm các route khác ở đây */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
