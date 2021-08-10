import React from 'react'
import CSS from 'csstype'

const canvasStyle: CSS.Properties = {
  borderLeft: '55px solid',
  borderRight: '65px solid',
  borderTop: '30px solid',
  borderBottom: '30px solid',  
  borderRadius: '1% 1% 10% 1%',
  borderColor: '#121111',
  height: '560',
  width: '840'
}

const PhaserCanvas: React.FC = () => {
  return(
    <div style={canvasStyle} id='phasercanvas'/>
  )
}

export default PhaserCanvas