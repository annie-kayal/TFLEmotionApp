import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'

import { useState, useEffect } from 'react'
import Axios from 'axios'

import JourneyPlanner from './components/JourneyPlanner'

function App(props) {

  useEffect(() => {
    try {
      Axios.get('https://api.tfl.gov.uk/line/mode/tube/status')
        .then(resp => {
          const data = resp.data.forEach(line => {
            if (line.id === 'hammersmith-city') {
              const CapH = line.id.charAt(0).toUpperCase() + line.id.slice(1, 12)
              const CapC = line.id.slice(12).charAt(0).toUpperCase() + line.id.slice(13)
              line.id = CapH + CapC
            } else if (line.id === 'waterloo-city') {
              const CapW = line.id.charAt(0).toUpperCase() + line.id.slice(1, 9)
              const CapC = line.id.slice(9).charAt(0).toUpperCase() + line.id.slice(10)
              line.id = CapW + CapC
            } else {
              line.id = line.id.charAt(0).toUpperCase() + line.id.slice(1)
            }
          })
          setData(resp.data)
        })
    } catch (error) {
      console.error(error)
    }
  

  }, [])


  const [data, setData] = useState([])
  const tubeColors = {
    bakerloo: '#b36305',
    central: '#e32017',
    circle: '#ffd300',
    district: '#00782a',
    hammersmithCity: '#f3a9bb',
    jubilee: '#a0a5a9',
    metropolitan: '#9b0056',
    nothern: '#000000',
    waterlooCity: '#95cdba',
    victoria: '#0098d4',
    piccadilly: '#003688'
  }


  const Body = styled('main')`
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${props => props.color};
`

  const TubeStatusSection = styled('section')
    (
      {
        backgroundColor: 'rgb(255, 255, 255)',
        width: '98vw',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }
    )


  const LineCard = styled('div')`
  
  margin: 0.2rem;
  height: 15%;
  width: 97%;
  display: flex;
  padding: 1rem 2rem;
  color: white;
  background-color: ${line => {
      switch (line.id) {
      case 'Bakerloo':
          return tubeColors.bakerloo
      case 'Central':
          return tubeColors.central
      case 'Circle':
        return tubeColors.circle
      case 'District':
          return tubeColors.district
        case 'Hammersmith-City':
          return tubeColors.hammersmithCity
        case 'Jubilee':
          return tubeColors.jubilee
        case 'Metropolitan':
            return tubeColors.metropolitan
        case 'Northern':
          return tubeColors.nothern
        case 'Piccadilly': 
          return tubeColors.piccadilly
        case 'Victoria':
          return tubeColors.victoria
        case 'Waterloo-City':
          return tubeColors.waterlooCity
        default:
          return
      }
    }
    }
  `

  const ErrorMessage = styled('p') `
  color: ${line => {

    if (line.children !== 'Good Service') {
      return 'red'
    }
  }}
  
  `

  console.log(data)
  return (
    <>

      <Global
        styles={css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Noto Sans JP', sans-serif
    }

    body {
      height: 100%;
    }
    `}
      />
      <Body color='#000' >
        <h1>Status Updates</h1>
        <h2>Tube</h2>
      <JourneyPlanner />
        <TubeStatusSection>
          {data && data.map(line => {
            return <LineCard key={line.id} id={line.id}>
              <p>{line.name}</p>
              <ErrorMessage>{line.lineStatuses[0].statusSeverityDescription}</ErrorMessage>
            </LineCard>
          })}
        </TubeStatusSection>
      </Body>
    </>
  )
}

export default App;
