import React, { useState } from 'react'
import styled from '@emotion/styled'

import DisabledButton from './DisabledButton'
import ActiveButton from './ActiveButton'
import Axios from 'axios'

type JourneyRequest = {
  from: string;
  to: string;
}


const defaultJourney: JourneyRequest = {
  from: '',
  to: ''
}

const JPHeader = styled('div')` 
width: 85%;
background-color: #164b79;
display: flex;
justify-content: space-between;
align-items: center;
font-size: 1.2rem;
text-align: center;
padding: 0.3rem;
font-weight: 500;
color: #fff;
`

const JPButton = styled('button')(
  {
    backgroundColor: '#164b79',
    width: '10%',
    border: 'none',
    color: 'white',
    fontSize: '1.3rem'
  }
)

const ExtendedJourneyPlanner = styled('div')`
background-color: #164b79;
width: 85%;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
height: 30vh;
padding: 0.2rem;
color: #fff;

label, small {
  display: flex;
  align-self: flex-start;
  padding-left: 0.5rem;
}
`


const JourneyInputs = styled('input')`
width: 95%;
border-radius: 0.5em;
padding: 0.5rem;
`

function JourneyPlanner() {

  const [journeyRequest, setJourneyRequest] = useState(defaultJourney)
  const [toggleJourneyPlanner, setToggle] = useState(false)

  const handleChange = (prop: keyof JourneyRequest, value: any) => {
    setJourneyRequest({ ...journeyRequest, [prop]: value })
  }


  return (
    <>
      <JPHeader>

        <p>Plan A Journey</p>
        <JPButton 
        onClick={() => setToggle(!toggleJourneyPlanner)}
        >
          {toggleJourneyPlanner ? '-' : '+'}
          </JPButton>

      </JPHeader>

      {toggleJourneyPlanner ? 

      <ExtendedJourneyPlanner>
        <label >Starting Point</label>
        <small>Enter a station name or postcode</small>
        <JourneyInputs
          placeholder='From'
          value={journeyRequest.from}
          type='text'
          onChange={(e) => handleChange("from", e.target.value)}
          autoComplete='on'
        />

        <label>End Destination</label>
        <small>Enter a station name or postcode</small>
        <JourneyInputs
          name='to'
          placeholder='To'
          type='text'
          value={journeyRequest.to}
          onChange={e => {
            handleChange("to", e.target.value)
          }}
        />

        {journeyRequest.from === '' || journeyRequest.to === '' ? <DisabledButton message={'Plan My Journey'}/> : <ActiveButton message={'Plan My Journey'} />}
      </ExtendedJourneyPlanner> 

      : null }
    </>
  )
}

export default JourneyPlanner