import React from 'react'
import styled from '@emotion/styled'

type ButtonProps = {
  message: string
}

function ActiveButton( { message }) {

  const Active = styled('button') (
    {
      color: '#164b79',
      backgroundColor: '#eee',
      width: '94%',
      padding: '0.2rem 0',
      fontSize: '1.3rem',
      border: 'none',
      borderRadius: '0.2rem',
      boxShadow: '0em 0em 0.5em #000',
      fontWeight: 700
    }
  )

return (
<Active>{message}</Active>
)
}

export default ActiveButton