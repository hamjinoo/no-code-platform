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

      {/* 테이블 리스트 */}
      <List>
        {tableList.map((table, index) => (
          <CustomListItem key={index} onClick={() => handleTableClick(index)}>
            <ListItemText primary={table} />
          </CustomListItem>
        ))}
      </List>
      
      <div style={{ marginTop: '80px', marginLeft: '20px' }}>
        <h3>페이지 설명서</h3>
        <p>이 제품은 테이블을 직접 추가하여 자신이 필요한 페이지를 직접 구현할 수 있는 No-Code 플랫폼입니다.</p>
        <p>첫번째 제품이 괜찮을 시 추가적인 고도화를 진행하겠습니다.</p>
        
        <br />

        <ul>
          <li>1. '테이블 목록' 페이지에서 필요한 테이블을 생성합니다.</li>
          <li>
            2. 생성한 테이블에 들어가 필요한 필드(컬럼)를 만들어줍니다. <br />
            &nbsp;&nbsp;&nbsp;&nbsp;(현재는 텍스트와 숫자만 넣을 수 있습니다.)
          </li>
          <li>3. 필드 생성 후 순서 변경이 필요하면 드래그 드롭을 통해 순서를 변경할 수 있고, X 버튼을 통해 필드를 삭제할 수 있습니다.</li>
          <li>4. 레코드 생성은 테이블을 통해 만든 이후에 해당 테이블과 비슷한 형태의 페이지를 구현할 수 있게 해줍니다. </li>
          <li>5. '레코드 화면 관리' 페이지는 '테이블 목록' 페이지에서 접속할 수가 있으며, 실제로 화면에 나타내고자 하는 필드를 컨트롤 할 수 있습니다.</li>
          <li>2. </li>
          <li>2. </li>
          </ul>
        </div>

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
  &:hover {
    background: #f2f4f9;
  }
`