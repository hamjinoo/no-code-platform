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
    navigate(`/tables/${index}`);
  };

  return (
    <>
      <AppBar title="테이블 목록" buttonName="테이블 생성" onConfirm={handleClickOpen} />

      {/* 테이블 리스트 */}
      <List>
        {tableList.map((table, index) => (
          <CustomListItem button key={index} onClick={() => handleTableClick(index)}>
            <ListItemText primary={table} />
          </CustomListItem>
        ))}
      </List>
      
      <h3>페이지 설명서</h3>
      <ul>
        <li>1. 테이블 페이지에서 필요한 테이블을 생성한다.</li>
        <li>
          2. 해당 테이블에 들어가서 테이블에 필요한 필드(컬럼)를 만들어준다. <br />
          &nbsp;&nbsp;&nbsp;&nbsp;현재는 텍스트만 넣을 수 있다.
        </li>
        <li>3. 필드 생성 후 순서 변경이 필요하면 드래그 드롭을 통해 순서를 변경할 수 있고 X버튼을 통해 필드를 삭제할 수 있다.</li>
        <li>4. 레코드 화면 관리는 테이블에서 필드를 만드는 화면에서 볼 수가 있는데 여기서 실제로 화면에 나타내고자 하는 것을 보이기 또는 숨기게 할 수 있다.</li>
        <li>2. </li>
        <li>2. </li>
        <li>2. </li>
      </ul>

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
    </>
  );
}

export default TableList;



const CustomListItem = styled(ListItem)`
  border:1px solid #dbdbdb;
  margin-bottom:4px;
  cursor:pointer;
`