// RecordManagement.js - Record Screen Management Component
import { Button, Checkbox, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

function RecordManagement({ fields }) {
  const [selectedFields, setSelectedFields] = useState({});

  const toggleField = (field) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleCreateRecord = () => {
    const selectedFieldNames = Object.keys(selectedFields).filter((field) => selectedFields[field]);
    console.log('Record Created with Fields:', selectedFieldNames);
  };

  return (
    <Container>
      <h2>레코드 화면 관리</h2>
      <List>
        {fields.map((field) => (
          <ListItem key={field.id} button onClick={() => toggleField(field.name)}>
            <Checkbox checked={!!selectedFields[field.name]} />
            <ListItemText primary={field.name} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={handleCreateRecord}>레코드 생성</Button>
    </Container>
  );
}

export default RecordManagement;