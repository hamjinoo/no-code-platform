import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import ClearIcon from '@mui/icons-material/Clear';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { List, ListItemText, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from './AppBar';

// SortableItem Component
function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <CustomListItem ref={setNodeRef} style={style} {...attributes}>
      <DragIndicatorIcon {...listeners} style={{ cursor: 'grab' }} />
      {children}
    </CustomListItem>
  );
}

function TableDetail() {
  const [fieldName, setFieldName] = useState('');
  const [fieldList, setFieldList] = useState([]);
  const [activeId, setActiveId] = useState(null); // 드래그 중인 아이템의 ID
  const location = useLocation();

  // useSensors 호출을 컴포넌트 내부로 이동
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const fields = JSON.parse(localStorage.getItem(`table${location.pathname}`)) || [];
    setFieldList(fields);
  }, [location.pathname]);

  const handleSaveField = () => {
    if (fieldName.trim()) {
      const updatedFields = [...fieldList, fieldName];
      localStorage.setItem(`table${location.pathname}`, JSON.stringify(updatedFields));
      setFieldList(updatedFields);
      setFieldName('');
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = fieldList.indexOf(active.id);
      const newIndex = fieldList.indexOf(over.id);
      const newFieldList = arrayMove(fieldList, oldIndex, newIndex);
      setFieldList(newFieldList);
      localStorage.setItem(`table${location.pathname}`, JSON.stringify(newFieldList));
    }
    setActiveId(null);  
  };

  const handleDeleteField = (index) => {
    const updatedFields = fieldList.filter((_, i) => i !== index);
    setFieldList(updatedFields);
    localStorage.setItem(`table${location.pathname}`, JSON.stringify(updatedFields));
  };

  return (
    <div>
      <AppBar title="테이블 상세 페이지" buttonName="저장" onConfirm={handleSaveField} />
      <Detail>
        <FiledArea>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={(event) => setActiveId(event.active.id)}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={fieldList} strategy={verticalListSortingStrategy}>
              <List>
                {fieldList.map((field, index) => (
                  <SortableItem key={field} id={field}>
                    <ListItemText primary={field} />
                    <ClearIcon onClick={() => handleDeleteField(index)} style={{ cursor: 'pointer' }} />
                  </SortableItem>
                ))}
              </List>
            </SortableContext>

            <DragOverlay>
              {activeId ? (
                <CustomListItem>
                  <ListItemText primary={activeId} />
                </CustomListItem>
              ) : null}
            </DragOverlay>
          </DndContext>
        </FiledArea>
        <FiledAdd>
          <Label>필드 이름</Label>
          <TextField
            required
            id="standard-required"
            placeholder="필드 1"
            fullWidth
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
          />
        </FiledAdd>
      </Detail>
    </div>
  );
}

export default TableDetail;


const Detail = styled.div`
  display: flex;
  min-height: calc(100vh - 60px);
  padding-left: 20px;
`;

const FiledArea = styled.div`
  flex: 1;
`;

const FiledAdd = styled.div`
  width: 300px;
  height: calc(100vh - 60px);
  background: #f6f8fa;
  padding: 20px;
  border-left: 1px solid #eee;
`;

const Label = styled.label`
  display: block;
  margin: 20px 0 10px;
`;

const CustomListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 340px;
  border: 1px solid #dbdbdb;
  box-shadow: 0 4px 4px 0 #f2f4f9;
  padding: 6px 10px;
  margin-bottom: 14px !important;
  background: #fff;

  &:hover {
    background: #f2f4f9;
  }
`;
