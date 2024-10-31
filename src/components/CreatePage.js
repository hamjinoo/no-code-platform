// CreatePage.js - Page Creation Component
import { Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

function CreatePage({ records }) {
  const [pageName, setPageName] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleAddPage = () => {
    if (pageName && selectedRecord) {
      console.log('Page Created:', pageName, 'with Record:', selectedRecord);
      setPageName('');
    }
  };

  return (
    <Container>
      <h2>페이지 만들기</h2>
      <TextField label="페이지 이름" value={pageName} onChange={(e) => setPageName(e.target.value)} />
      <List>
        {records.map((record, index) => (
          <ListItem key={index} button onClick={() => setSelectedRecord(record)}>
            <ListItemText primary={`Record ${index + 1}`} />
          </ListItem>
        ))}
      </List>
      <Button onClick={handleAddPage} variant="contained">페이지 추가</Button>
    </Container>
  );
}

export default CreatePage;