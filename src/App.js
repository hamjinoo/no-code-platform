// App.js - Main Application Entry Point with LNB and Routing
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import CreatePage from './components/CreatePage';
import FieldManagement from './components/FieldManagement';
import RecordManagement from './components/RecordManagement';
import Sidebar from './components/Sidebar';
import TableDetail from './components/TableDetail';
import TablePage from './components/TablePage';

const AppLayout = styled.div`
  display: flex;
`;

const MainContent = styled.main`
  flex: 1;
  min-height:100vh;
`;

function App() {
  return (
    <Router>
      <AppLayout>
        {/* LNB (Left Navigation Bar) */}
        <Sidebar />
        {/* Main Content */}
        <MainContent>
          <Routes>
            <Route path="/" element={<TablePage />} />
             <Route path="/tables/:tableName" element={<TableDetail />} />
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