import React from 'react'
import styled from 'styled-components'
import AppBar from './AppBar'

function PageDetail() {

  const handleClickSave = () => {

  }

  return (
    <>
      <AppBar title="상세 페이지" buttonName="저장" onConfirm={handleClickSave} />
      <Detail>
        ddd

      </Detail>
    </>
  )
}

export default PageDetail

const Detail = styled.div`
  display: flex;
  min-height: calc(100vh - 60px);
  padding-left: 20px;
`;























































