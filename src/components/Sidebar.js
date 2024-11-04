import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 200px;
  height:100vh;
  background-color: #f6f8fa;
  padding: 20px;
  border-right:1px solid #eee;
`;

const NavList = styled.div`
  overflow-y:auto;
  display: flex;
  flex-direction: column;
`

function Sidebar() {
  return (
    <SidebarContainer>
      <h2>메뉴</h2>
      <NavList>
        <Link to="/">테이블 목록</Link>
        <Link to="/fields">필드 관리</Link>
        <Link to="/records">레코드 화면 관리</Link>
        <Link to="/create">페이지 만들기</Link>
      </NavList>
    </SidebarContainer>
  );
}

export default Sidebar;
