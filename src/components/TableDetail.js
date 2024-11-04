// TableDetail.js
import { FormControl, ListItem, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import DetailHeader from './DetailHeader';

const Detail = styled.div`
  display:flex;
  min-height: calc(100vh - 60px);
  
`
const FiledArea = styled.div`
  flex:1;
`
const FiledAdd = styled.div`
  width:300px;
  height: calc(100vh - 60px);
  background:#f6f8fa;
  padding:20px;
  border-left:1px solid #eee;
`
const Label = styled.label`
  display:block;
  margin:20px 0 10px;
`

function TableDetail() {
  const [tableData, setTableData] = useState([])
  const [fieldName, setFieldName] = useState([])
  const { tableName } = useParams(); // URL 파라미터로 테이블 이름 가져오기

  // 로컬 스토리지에서 테이블 목록을 가져오는 함수
  useEffect(() => {
    const fields = JSON.parse(localStorage.getItem('table_${tableId}')) || [];
    setTableData(fields);
  }, []);

  return (
    <div>
      <DetailHeader title="일반 설정" buttonName="저장" />
      <Detail>
        <FiledArea>
          <h2>테이블 상세 페이지</h2>
          <p>현재 테이블: {tableName}</p>

          {/* {
            tableData ? <p>{console.log(tableData)
            }</p> : <p>없음</p>
          } */}

          <ListItem>
            <ListItemText>zzz</ListItemText>
            <ListItemText>zzz</ListItemText>
            <ListItemText>zzz</ListItemText>
          </ListItem>
        </FiledArea>
        <FiledAdd>
          <Label>필드 이름</Label>
          <TextField
            required
            id="standard-required"
            defaultValue="필드 1"
            fullWidth
          />

          <Label>유형</Label>
          <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            fullWidth
          >
            <MenuItem value={10}>한 줄 텍스트</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        </FiledAdd>
      </Detail>
    </div>
  );
}

export default TableDetail;
