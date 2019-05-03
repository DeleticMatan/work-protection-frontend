import * as React from 'react'

import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const HeroImage = styled.div`
  height: 50vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(static/images/hero.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  margin: -50px -50px 0 -50px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 25px;

  @media (max-width: 768px) {
    margin: -25px -25px 0 -25px;
  }

  @media (max-width: 600px) {
    margin: -10px -10px 0 -10px;
  }
`

const HeroText = styled.div`
  width: 100%;
  text-transform: uppercase;
  text-align: center;
`

const Hero = () => {
  return (
    <HeroImage>
      <HeroText>
        <Typography variant="h2" color="textSecondary">
          Zaštita na radu
        </Typography>
      </HeroText>
    </HeroImage>
  )
}

export default Hero
