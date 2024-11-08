import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const AppBarArea = styled.div`
  height:60px;
  background-color: #f6f8fa;
  padding: 0 20px;
  border-bottom:1px solid #eee;
  display:flex;
  align-items:center;
  justify-content:space-between;
` 

const StyledHeader = styled.h2`
  font-size:20px;
  font-weight:600;
`

function AppBar({title, buttonName, onConfirm }) {
  return (
    <AppBarArea>
      <StyledHeader>{title}</StyledHeader>
      <Button variant='contained' onClick={onConfirm}>{buttonName}</Button>
    </AppBarArea>
  )
}

export default AppBar;