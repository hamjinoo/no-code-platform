import { Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from './Modal';

const Container = styled.div`
  padding: 20px;
`;

const PageTitle = styled.h2`
  font-size:24px;
  font-weight:600;
  display:flex;
  align-items:center;
  justify-content:space-between;
`

function TablePage() {
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
  const handleTableClick = (table) => {
    navigate(`/tables/${table}`);
  };

  return (
    <main>
      <Container>
        <PageTitle>
          테이블 목록

          <Button variant="outlined" onClick={handleClickOpen}>
            테이블 생성
          </Button>
          {/* 테이블 생성 모달 */}
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
        </PageTitle>

        {/* 테이블 리스트 */}
        <List>
          {tableList.map((table, index) => (
            <ListItem button key={index} onClick={() => handleTableClick(table)}>
              <ListItemText primary={table} />
            </ListItem>
          ))}
        </List>
      </Container>
    </main>
  );
}

export default TablePage;