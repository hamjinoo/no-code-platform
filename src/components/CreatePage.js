// CreatePage.js - Page Creation Component
import { ListItemText, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from './AppBar';
import Modal from './Modal';



function CreatePage() {
  const [openModal, setOpenModal] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuList, setMenuList] = useState([]);
  const handleClickOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  
  useEffect(() => {
    const menus = JSON.parse(localStorage.getItem('menus')) || [];
    setMenuList(menus);

  }, [location.pathname]);

  const handleSaveTable = () => {
    if (menuName.trim()) {
      const updatedMenus = [...menuList, menuName];
      localStorage.setItem('menus', JSON.stringify(updatedMenus));
      setMenuList(updatedMenus);
      setMenuName('');
      setOpenModal(false);
    }
  }

  const handlePageClick = (index) => {
    navigate(`/page/detail/${index}`)
  }


  return (
    <>
      <AppBar title="페이지 설정" buttonName="새로 만들기" onConfirm={handleClickOpen} />
      <Detail>
        <Container>
          <UlList>
            {menuList.map((menuName, index) => (
              <LiList key={index} onClick={() => handlePageClick(index)}>
                <ListItemText primary={menuName} />
              </LiList>
            ))}
          </UlList>
        </Container>
      </Detail>
      
        <Modal
          open={openModal}
          onClose={handleClose}
          onConfirm={handleSaveTable} // 확인 버튼 클릭 시 저장
          title="메뉴 만들기"
          confirmText="확인"
          cancelText="취소"
        >
          <TextField
            autoFocus
            required
            label="메뉴 이름"
            variant="standard"
            fullWidth
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
          />
        </Modal>

    </>
  );
}

export default CreatePage;




const Detail = styled.div`
  display: flex;
  min-height: calc(100vh - 60px);
  padding-left: 20px;
`;

const Container = styled.div`
  max-width:640px;
  width:100%;
  padding:40px 0;
  margin-left: auto;
  margin-right: auto;
`;

const UlList = styled.ul`
  display:flex;
  flex-wrap:wrap;
  gap: 14px;
`

const LiList = styled.li`
  width:calc(50% - 7px);
  padding:20px;
  border:1px solid #dbdbdb;
  border-radius:5px;
  cursor: pointer;
`