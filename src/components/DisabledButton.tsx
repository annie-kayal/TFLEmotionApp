import React from 'react'
import styled from '@emotion/styled'

type ButtonProps = {
  message: string
}

function DisabledButton( { message }) {

  const Disabled = styled('button') (
    {
      backgroundColor: '#e2e2e2',
      width: '94%',
      padding: '0.2rem 0',
      fontSize: '1.3rem',
      border: 'none',
      borderRadius: '0.2rem',
    }
  )

return (
<Disabled disabled={true}>{message}</Disabled>
)
}

export default DisabledButton