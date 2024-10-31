// FieldManagement.js - Field Management with Drag and Drop (dnd-kit)
import { DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';

const FieldContainer = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`;

function SortableField({ field, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.id });

  return (
    <FieldContainer
      ref={setNodeRef}
      style={{ transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`, transition }}
      {...attributes}
      {...listeners}
    >
      <span>{field.name}</span>
      <Button onClick={() => onRemove(field.id)}>삭제</Button>
    </FieldContainer>
  );
}

function FieldManagement() {
  const [fields, setFields] = useState([]);
  const [fieldName, setFieldName] = useState('');

  const handleAddField = () => {
    const newField = { id: `field-${Date.now()}`, name: fieldName };
    setFields([...fields, newField]);
    setFieldName('');
  };

  const handleRemoveField = (fieldId) => {
    setFields(fields.filter((field) => field.id !== fieldId));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      setFields(arrayMove(fields, oldIndex, newIndex));
    }
  };

  return (
    <div>
      <h2>필드 관리</h2>
      <TextField
        label="필드 이름"
        value={fieldName}
        onChange={(e) => setFieldName(e.target.value)}
      />
      <Button onClick={handleAddField} variant="contained">
        필드 추가
      </Button>

      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
          {fields.map((field) => (
            <SortableField key={field.id} field={field} onRemove={handleRemoveField} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default FieldManagement;