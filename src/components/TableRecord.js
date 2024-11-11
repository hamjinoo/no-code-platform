import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FormControl, List, ListItem, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from './AppBar';

function TableRecord() {
  const [fieldList, setFieldList] = useState([]);
  const [recordList, setRecordList] = useState({});
  const [recordTypeList, setRecordTypeList] = useState([]);
  const location = useLocation();

  const index = location.pathname.split('/').slice(-1)[0];

  const handleSavePage = () => {
    // 필드 중 보이는 것만 필터링하여 저장
    const filteredRecordList = fieldList.reduce((acc, field, i) => {
      if (recordTypeList[i] && recordList[field.name]) {
        acc[field.name] = recordList[field.name];
      }
      return acc;
    }, {});

    console.log(filteredRecordList); // 현재 레코드 상태 확인용 로그

    

    localStorage.setItem(`table/${index}/record`, JSON.stringify(filteredRecordList));
  };


  useEffect(() => {
    // 로컬 스토리지에서 필드 목록 가져오기
    const data = JSON.parse(localStorage.getItem(`table/${index}`)) || [];
    setFieldList(data);
    
    // 각 필드의 초기값 설정
    const initialRecordState = data.reduce((acc, field) => {
      acc[field.name] = ''; // 초기값을 빈 문자열로 설정
      return acc;
    }, {});
    setRecordList(initialRecordState);

    // 필드 가시성 초기 상태 설정
    setRecordTypeList(data.map(() => false)); // 모든 필드를 숨긴 상태로 초기화
  }, [location.pathname, index]);

  // 필드의 타입에 따라 입력 필드 생성
  const choiceField = (data) => {
    if (data.type === 'select') {
      return (
        <FormControl fullWidth>
          <Select
            value={recordList[data.name] || ''}
            onChange={(e) =>
              setRecordList((prev) => ({
                ...prev,
                [data.name]: e.target.value,
              }))
            }
          >
            {data.options && data.options.map((option, i) => (
              <MenuItem key={i} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
    
    return (
      <TextField
        autoFocus
        required
        variant="standard"
        fullWidth
        type={data.type === 'number' ? 'number' : 'text'} // 타입에 따라 입력 필드 지정
        value={recordList[data.name] || ''} // recordList에서 해당 필드의 값 가져오기
        onChange={(e) =>
          setRecordList((prev) => ({
            ...prev,
            [data.name]: e.target.value,
          }))
        }
      />
    );
  };

  // 필드 가시성 토글
  const handleChangeLabel = (index) => {
    setRecordTypeList((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          // 토글이 `false`가 될 때 해당 필드의 데이터를 삭제
          if (!item) {
            setRecordList((prevRecordList) => {
              const updatedRecordList = { ...prevRecordList };
              delete updatedRecordList[fieldList[i].name]; // 필드 데이터 삭제
              return updatedRecordList;
            });
          }
          return !item;
        }
        return item;
      })
    );
  };

  // 필드의 가시성 아이콘 표시
  const handleLabel = (isVisible) => {
    return isVisible ? (
      <VisibilityIcon style={{ cursor: 'pointer' }} />
    ) : (
      <VisibilityOffIcon style={{ cursor: 'pointer' }} />
    );
  };

  return (
    <div>
      <AppBar title="레코드 만들기" buttonName="만들기" onConfirm={handleSavePage} />
      <Detail>
        {/* 왼쪽 레코드 필드 */}
        <FiledArea>
          <List>
            {fieldList.map((data, index) =>
              recordTypeList[index] ? ( // isVisible이 true일 때만 렌더링
                <ListItem key={index}>
                  <Label>{data.name}</Label>
                  {choiceField(data)}
                </ListItem>
              ) : null
            )}
          </List>
        </FiledArea>

        {/* 오른쪽 필드 목록 */}
        <FiledAdd>
          <Label>필드</Label>
          <List>
            {fieldList.map((field, index) => (
              <CustomListItem key={index} onClick={() => handleChangeLabel(index)}>
                <ListItemText primary={field.name} />
                {handleLabel(recordTypeList[index])} {/* 필드의 가시성 상태에 따라 아이콘 표시 */}
              </CustomListItem>
            ))}
          </List>
        </FiledAdd>
      </Detail>
    </div>
  );
}

export default TableRecord;

const Detail = styled.div`
  display: flex;
  min-height: calc(100vh - 60px);
  padding-left: 20px;
`;

const Label = styled.label`
  display: block;
  width: 240px;
  margin: 20px 0 10px;
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

const CustomListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #dbdbdb;
  box-shadow: 0 4px 4px 0 #f2f4f9;
  padding: 6px 10px;
  margin-bottom: 14px !important;
  background: #fff;

  &:hover {
    background: #f2f4f9;
  }
`;
