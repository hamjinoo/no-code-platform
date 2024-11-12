import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';


function Sidebar() {

  const location = useLocation();


  const index = location.pathname.split('/').slice(-1)[0]

  return (
    <SidebarContainer>
      <SwitchMenu>
        <StyledLink to="/">설명서</StyledLink>
        <StyledLink to="/table">테이블 <br />목록</StyledLink>
        <StyledLink to="/page">메뉴 <br />목록</StyledLink>
      </SwitchMenu>
      <MainMenu>
        <SidebarTitle>메뉴</SidebarTitle>
        <NavList>
          {location.pathname.includes('table') && (
            <>
              <StyledLink to="/table">테이블 목록</StyledLink>
              {location.pathname.includes(`table/${index}`) && (
                <>
                  <StyledLink to={`/table/record/${index}`}>레코드 화면 관리</StyledLink>
                </>
              )}
            </>
          )}
          {location.pathname.includes('page') && (
            <>
              <StyledLink to="/page/create">페이지 만들기</StyledLink>
            </>
          )}
          </NavList>
      </MainMenu>
    </SidebarContainer>
  );
}

export default Sidebar;





const SidebarContainer = styled.div`
  display:flex;
  width: 260px;
  height:100vh;
  background-color: #f6f8fa;
  border-right:1px solid #eee;
`;

const SwitchMenu = styled.div`
  padding: 20px 10px;
  border-right:1px solid #eee;
`

const SidebarTitle = styled.h2`
  font-size:24px;
  margin-bottom:20px;
`;

const MainMenu = styled.div`
  flex: 1;
  padding: 20px 14px;
`

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