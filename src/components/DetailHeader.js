import { Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const TopHeader = styled.div`
  height:60px;
  background-color: #f6f8fa;
  padding: 0 20px;
  border-bottom:1px solid #eee;
  display:flex;
  align-items:center;
  justify-content:space-between;
` 

const StyledHeader = styled.h2`
  font-size:18px;
  font-weight:500;
`

function DetailHeader({title, buttonName}) {
  return (
    <TopHeader>
      <StyledHeader>{title}</StyledHeader>
      <Button variant='contained'>{buttonName}</Button>
    </TopHeader>
  )
}

export default DetailHeader;