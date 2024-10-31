// App.js - Main Application Entry Point with LNB and Routing
import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import CreatePage from './components/CreatePage';
import FieldManagement from './components/FieldManagement';
import RecordManagement from './components/RecordManagement';
import TablePage from './components/TablePage';

const AppLayout = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #f5f5f5;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
`;

function App() {
  return (
    <Router>
      <AppLayout>
        {/* LNB (Left Navigation Bar) */}
        <Sidebar>
          <h2>메뉴</h2>
          <Link to="/">테이블 생성</Link>
          <Link to="/fields">필드 관리</Link>
          <Link to="/records">레코드 화면 관리</Link>
          <Link to="/create">페이지 만들기</Link>
        </Sidebar>
        {/* Main Content */}
        <MainContent>
          <Routes>
            <Route path="/" element={<TablePage />} />
            <Route path="/fields" element={<FieldManagement />} />
            <Route path="/records" element={<RecordManagement />} />
            <Route path="/create" element={<CreatePage />} />
          </Routes>
        </MainContent>
      </AppLayout>
    </Router>
  );
}

export default App;