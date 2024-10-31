// TablePage.js - Table Creation Component
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

function TablePage() {
  const [tableName, setTableName] = useState('');

  const handleCreateTable = () => {
    // Logic to create a new table (e.g., save to local storage or database)
    console.log(`Table Created: ${tableName}`);
    setTableName('');
  };

  return (
    <Container>
      <h1>테이블 생성</h1>
      <TextField
        label="테이블 이름"
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleCreateTable}>
        테이블 만들기
      </Button>
    </Container>
  );
}

export default TablePage;