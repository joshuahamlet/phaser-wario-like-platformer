import React from 'react'
import Top from './Components/Top'
import Bottom from './Components/Bottom'
import PhaserCanvas from './Components/PhaserCanvas'
import CSS from 'csstype'
import { Provider } from 'jotai'

const ua = navigator.userAgent;
const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(ua)

const appStyle: CSS.Properties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: isMobile? 'flex-start' : 'flex-start',
  height: '100%', 
  width: '100%',
  background: 'linear-gradient(to right, #221749 0%, #36254e 25%, #36254e 75%, #221749 100%)',
  touchAction: 'manipulation'
}

const App: React.FC = () => {
  return(
    <Provider>
    <div style={appStyle}>
      <Top/>
      <PhaserCanvas/>
      <Bottom/>
    </div>
    </Provider>
  )
}

export default App