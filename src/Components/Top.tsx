import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import { treasureCountAtom, deathCountAtom } from '../Atoms'
import skull from '../Assets/skull.png'
import crownIcon from '../Assets/crownIcon.png'
import CSS from 'csstype'


const TopStyle: CSS.Properties = {
  color: 'white',
  height: '112px',
  width: '960px',
  backgroundColor: '#3c17d3',
  marginBottom: '25px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '35px',
  marginTop: '10vw'
} 

const ImgStyle: CSS.Properties = {
  height: '55px', 
  width: '55px',
  imageRendering: 'pixelated',
}

const LeftStyle: CSS.Properties = {
  display: 'flex',
  flexBasis: '50%',
}

const IconStyle: CSS.Properties = {
  display: 'flex',
  flexBasis: '50%',
  justifyContent: 'flex-end',
  alignItems: 'center'
}

const IconText: CSS.Properties = {
  padding: '20px'
}

const Top: React.FC = () => {
  const [treasureCount, setTreasureCount] = useAtom(treasureCountAtom)
  const [deathCount, setDeathCount] = useAtom(deathCountAtom)

  useEffect(()=> {
    window.addEventListener('clearIcons', handleClearIconEvent)
    window.addEventListener('treasureCount', handleTreasureCountEvent)
    window.addEventListener('death', handleDeathEvent)
    return () => {
      window.removeEventListener('clearIcons', handleClearIconEvent)
      window.removeEventListener('treasureCount', handleTreasureCountEvent)
      window.removeEventListener('death', handleDeathEvent)
    }
  }, [])

  const handleClearIconEvent = () => {
    setDeathCount(0)
    setTreasureCount(0)
  }

  const handleTreasureCountEvent = () => {
    setTreasureCount((oldCount)=> oldCount + 1)
  }

  const handleDeathEvent = () => {
    setDeathCount((oldCount)=> oldCount + 1)
  }

  return(
    <div style={TopStyle}>
      <div style ={LeftStyle}></div>
      <div style={IconStyle}>
        <img style={ImgStyle} src={skull}/> <div style={IconText}>{deathCount}</div>
        <img style={ImgStyle} src={crownIcon}/> <div style={IconText}>{treasureCount}</div>
      </div>
    </div>
  )
}

export default Top