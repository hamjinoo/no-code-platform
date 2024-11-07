import React from 'react';
import { useLocation } from 'react-router-dom';
import AppBar from './AppBar';



function TableRecord() {

  const location = useLocation();

  const index = location.pathname.split('/').slice(-1)[0]

  return (
    <div>
      <AppBar title="레코드 화면 관리" />
    </div>
  )
}

export default TableRecord