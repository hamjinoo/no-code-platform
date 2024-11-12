import { List, ListItem, ListItemText, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from './AppBar';
import Modal from './Modal';

function TableList() {
  const [openModal, setOpenModal] = useState(false);
  const [tableName, setTableName] = useState('');
  const [tableList, setTableList] = useState([]);
  const navigate = useNavigate();

  // 로컬 스토리지에서 테이블 목록을 가져오는 함수
  useEffect(() => {
    const tables = JSON.parse(localStorage.getItem('tables')) || [];
    setTableList(tables);
  }, []);

  // 테이블 이름을 로컬 스토리지에 저장
  const handleSaveTable = () => {
    if (tableName.trim()) {
      // 기존 tableList 배열에 새로운 tableName을 추가한 새 배열
      const updatedTables = [...tableList, tableName];
      localStorage.setItem('tables', JSON.stringify(updatedTables));
      setTableList(updatedTables); // 상태 업데이트
      setTableName(''); // 입력 초기화
      setOpenModal(false); // 모달 닫기
    }
  };

  const handleClickOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);



  // 테이블 클릭 시 페이지 이동
  const handleTableClick = (index) => {
    navigate(`/table/${index}`);
  };

  return (
    <>
      <AppBar title="테이블 목록" buttonName="테이블 생성" onConfirm={handleClickOpen} />
      <Detail>
        {/* 테이블 리스트 */}
        <List>
          {tableList.map((table, index) => (
            <CustomListItem key={index} onClick={() => handleTableClick(index)}>
              <ListItemText primary={table} />
            </CustomListItem>
          ))}
        </List>
  

        <Modal
          open={openModal}
          onClose={handleClose}
          onConfirm={handleSaveTable} // 확인 버튼 클릭 시 저장
          title="새 테이블 만들기"
          confirmText="확인"
          cancelText="취소"
        >
          <TextField
            autoFocus
            required
            label="테이블 이름"
            variant="standard"
            fullWidth
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
        </Modal>
      </Detail>
    </>
  );
}

export default TableList;

const Detail = styled.div`
  display: flex;
  min-height: calc(100vh - 60px);
  padding-left: 20px;
`;

const CustomListItem = styled(ListItem)`
  border:1px solid #dbdbdb;
  margin-bottom:4px;
  cursor:pointer;
  &:hover {
    background: #f2f4f9;
  }
`