import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';


function Sidebar() {

  const location = useLocation();


  const index = location.pathname.split('/').slice(-1)[0]

  console.log(index);
  

  return (
    <SidebarContainer>
      <SidebarTitle>메뉴</SidebarTitle>
      <NavList>
        <StyledLink to="/">테이블 목록</StyledLink>
        <StyledLink to="/fields">필드 관리</StyledLink>
        <StyledLink to="/create">페이지 만들기</StyledLink>
        {location.pathname.includes('tables') && (
          <StyledLink className='record' to={`/tables/records/${index}`}>레코드 화면 관리</StyledLink>
        )}
      </NavList>
    </SidebarContainer>
  );
}

export default Sidebar;







const SidebarContainer = styled.div`
  width: 200px;
  height:100vh;
  background-color: #f6f8fa;
  padding: 20px;
  border-right:1px solid #eee;
`;

const SidebarTitle = styled.h2`
  font-size:24px;
  margin-bottom:20px;
`;

const NavList = styled.div`
  overflow-y:auto;
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 4px;
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  &.active {
    font-weight: bold;
    color: #0056b3;
  }

  &.record {
    padding-top:15px;
    border-top:1px solid #dbdbdb;
    border-radius:0;
  }
`;