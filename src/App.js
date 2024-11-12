// App.js - Main Application Entry Point with LNB and Routing
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import CreatePage from './components/CreatePage';
import PageDetail from './components/PageDetail';
import Sidebar from './components/Sidebar';
import TableDetail from './components/TableDetail';
import TableList from './components/TableList';
import TableRecord from './components/TableRecord';
import Main from './pages/Main';

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
            <Route path="/" element={<Main />} />
            <Route path="/table" element={<TableList />} />
            <Route path="/table/:tableName" element={<TableDetail />} />
            <Route path="/table/record/:tableName" element={<TableRecord />} />
            <Route path="/page/create" element={<CreatePage />} />
            <Route path="/page/detail/:index" element={<PageDetail/>} />
          </Routes>
        </MainContent>
      </AppLayout>
    </Router>
  );
}

export default App;