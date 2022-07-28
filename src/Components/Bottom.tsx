import React, { useEffect, useRef } from 'react'
import { useAtom } from 'jotai'
import { mobileControlsAtom, tipTextAtom } from '../Atoms'
import CSS from 'csstype'
import thegame from "../main"

const bottomStyle: CSS.Properties = {
  color: 'white',
  height: '112px',
  width: '840px',
  backgroundColor: 'purple',
  marginTop: '25px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: '25px'
}

const mobileControls : CSS.Properties = {
  backgroundColor: "pink",
  width: "100%",
  height: "100px"
}

const ua = navigator.userAgent;
const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(ua)

const jumpKey = isMobile ? "A" : "Space"
const dashKey = isMobile ? "B" : "Shift"
const directionKey = isMobile ? "D-Pad" : "Arrow Keys"

const Bottom: React.FC = () => {

  const [_mobileControlss, setMobileControls] = useAtom(mobileControlsAtom)

  const upRef = useRef()
  const downRef = useRef()
  const leftRef = useRef()
  const rightRef = useRef()
  
  //  mobile workarounds  //
  const doJump = () => {
    if (thegame.scene.isActive("PlayScene")) {
      thegame.scene.keys.PlayScene.physics.world.bodies.entries[0].gameObject.doJump()
   }
    if (thegame.scene.isActive("EndGame")) {
      thegame.scene.keys.EndGame.doRestart()
   }
  } 

  const stopJump = () => thegame.scene.keys.PlayScene.physics.world.bodies.entries[0].gameObject.stopJump()
  const doDash = () => thegame.scene.keys.PlayScene.physics.world.bodies.entries[0].gameObject.doDash()
  const stopDash = () => thegame.scene.keys.PlayScene.physics.world.bodies.entries[0].gameObject.stopDash()
  const doUp = () => thegame.scene.keys.PlayScene.physics.world.bodies.entries[0].gameObject.doUp()
  const stopUp = () => thegame.scene.keys.PlayScene.physics.world.bodies.entries[0].gameObject.stopUp()
  const doDown = () => thegame.scene.keys.PlayScene.physics.world.bodies.entries[0].gameObject.doDown()
  const stopDown = () => thegame.scene.keys.PlayScene.physics.world.bodies.entries[0].gameObject.stopDown()
  const doLeft = (ev) => {
    thegame.scene.keys.PlayScene.physics.world.bodies.entries[0].gameObject.doLeft()
  }
  const stopLeft = (ev) => {
    thegame.scene.keys.PlayScene.physics.world.bodies.entries[0].gameObject.stopLeft()
  }
  const doRight = (ev) => {
    thegame.scene.keys.PlayScene.physics.world.bodies.entries[0].gameObject.doRight()
  } 
  const stopRight = (ev) => {
    thegame.scene.keys.PlayScene.physics.world.bodies.entries[0].gameObject.stopRight()
  } 
  //////////////////////////
  const dpadTouch = (ev) => {
    const leftCondition = (
      (ev.changedTouches[0].clientX > leftRef.current.offsetLeft) && (ev.changedTouches[0].clientX < leftRef.current.offsetLeft + leftRef.current.offsetWidth) &&
      (ev.changedTouches[0].clientY > leftRef.current.offsetTop) && (ev.changedTouches[0].clientY < leftRef.current.offsetTop + leftRef.current.offsetHeight)
    )
    const rightCondition = (
      (ev.changedTouches[0].clientX > rightRef.current.offsetLeft) && (ev.changedTouches[0].clientX < rightRef.current.offsetLeft + rightRef.current.offsetWidth) &&
      (ev.changedTouches[0].clientY > rightRef.current.offsetTop) && (ev.changedTouches[0].clientY < rightRef.current.offsetTop + rightRef.current.offsetHeight)
    )
    const upCondition = (
      (ev.changedTouches[0].clientX > upRef.current.offsetLeft) && (ev.changedTouches[0].clientX < upRef.current.offsetLeft + upRef.current.offsetWidth) &&
      (ev.changedTouches[0].clientY > upRef.current.offsetTop) && (ev.changedTouches[0].clientY < upRef.current.offsetTop + upRef.current.offsetHeight)
    )
    const downCondition = (
      (ev.changedTouches[0].clientX > downRef.current.offsetLeft) && (ev.changedTouches[0].clientX < downRef.current.offsetLeft + downRef.current.offsetWidth) &&
      (ev.changedTouches[0].clientY > downRef.current.offsetTop) && (ev.changedTouches[0].clientY < downRef.current.offsetTop + downRef.current.offsetHeight)
    )
    
    if (leftCondition){
      doLeft()
      stopRight()
      stopDown()
      stopUp()
    }
    
    if (rightCondition){
      stopLeft()
      doRight()
      stopDown()
      stopUp()
    }

    if (upCondition){
      stopLeft()
      stopRight()
      stopDown()
      doUp()
    }
    
    if (downCondition){
      stopLeft()
      stopRight()
      doDown()
      stopUp()
    }

    if (!upCondition && !downCondition && !leftCondition && !rightCondition) {
      stopLeft()
      stopRight()
      stopDown()
      stopUp()
    } 
  }

  const dpadRelease = () => {
    stopLeft()
    stopRight()
    stopDown()
    stopUp()
  }

  const [tipText, setTipText] = useAtom(tipTextAtom)

  const softGround = `The ground looks soft here. Try Stomping with Jump(${jumpKey}) + Down`
  const letsBegin = `Alright, let's get this quest on the road (use the ${directionKey} to move, ${jumpKey} to Jump, and ${dashKey} to Dash).`
  const treasureFound = `Jackpot! Grab that treasure! (Press ${dashKey} to Dash)`
  const restart = `Good job! Press ${jumpKey} to restart.`
  const doorWallJump = `Press Up to enter doors. Jump(${jumpKey}) and hold Left or Right against a wall to Slide. Press Jump(${jumpKey}) while Sliding to WallJump.`
  const clear = ``
  const dash = `These walls are no match for your Dash(${dashKey}).`
  const leap = `Sometimes an epic quest requires a leap of faith!`
  const wallJump = `Jump(${jumpKey}) and hold Left or Right against a wall to Slide. Press Jump(${jumpKey}) while Sliding to WallJump.`
  const door = `Press Up to enter doors.`

  const handleTip = (tip) => {
    setTipText(tip)
  }

  useEffect(()=> {
    window.addEventListener('keydown', (e)=> console.log(e))
    window.addEventListener('letsBegin', ()=> handleTip(letsBegin))
    window.addEventListener('softGround', ()=> handleTip(softGround))
    window.addEventListener('clear', ()=> handleTip(clear))
    window.addEventListener('treasureFound', ()=> handleTip(treasureFound))
    window.addEventListener('restart', ()=> handleTip(restart))
    window.addEventListener('doorWallJump', ()=> handleTip(doorWallJump))
    window.addEventListener('dash', ()=> handleTip(dash))
    window.addEventListener('leap', ()=> handleTip(leap))
    window.addEventListener('wallJump', ()=> handleTip(wallJump))
    window.addEventListener('door', ()=> handleTip(door))

    return () => {
      window.removeEventListener('letsBegin', ()=> handleTip(letsBegin))
      window.removeEventListener('softGround', ()=> handleTip(softGround))
      window.removeEventListener('clear', ()=> handleTip(clear))
      window.removeEventListener('treasureFound', ()=> handleTip(treasureFound))
      window.removeEventListener('restart', ()=> handleTip(restart))
      window.removeEventListener('doorWallJump', ()=> handleTip(doorWallJump))
      window.removeEventListener('dash', ()=> handleTip(dash))
      window.removeEventListener('leap', ()=> handleTip(leap))
      window.removeEventListener('wallJump', ()=> handleTip(wallJump))
      window.removeEventListener('door', ()=> handleTip(door))

    }
  }, [])

  return(
    <>
    <div style={bottomStyle}>
      <div>
        {tipText}
      </div>
    </div>
    {isMobile &&
      <div onContextMenu={(e)=> e.preventDefault()} style={{paddingTop: "10vw", display: "flex", justifyContent: 'space-between', width: "90%", height: "30vw", alignItems: "center"}}>
         <div onContextMenu={(e)=> e.preventDefault()} style={{width: "100%", height: "100%"}}>
          
          <div onTouchMove={dpadTouch} onTouchEnd={dpadRelease} onContextMenu={(e)=> e.preventDefault()} style={{display: "flex", flexDirection: "column", justifyContent: 'space-between', width: "39vw", height: "39vw", alignItems: "center"}}>
            <div ref={upRef} onContextMenu={(e)=> e.preventDefault()} style={{borderRadius: "15px", backgroundColor: "black", width: "13vw", height: "13vw"}} onTouchStart={doUp} onTouchEnd={stopUp}></div>
            <div onContextMenu={(e)=> e.preventDefault()} style={{display: 'flex', justifyContent: 'space-between', width: "100%"}}>
              <div ref={leftRef} onContextMenu={(e)=> e.preventDefault()} style={{borderRadius: "15px", backgroundColor: "black", width: "13vw", height: "13vw"}} onTouchStart={doLeft} onTouchEnd={stopLeft}></div>
              <div ref={rightRef} onContextMenu={(e)=> e.preventDefault()} style={{borderRadius: "15px", backgroundColor: "black", width: "13vw", height: "13vw"}} onTouchStart={doRight} onTouchEnd={stopRight}></div>
            </div>
            <div ref={downRef} onContextMenu={(e)=> e.preventDefault()} style={{borderRadius: "15px", backgroundColor: "black", width: "13vw", height: "13vw"}} onTouchStart={doDown}></div>
          </div>
         </div>

         <div onContextMenu={(e)=> e.preventDefault()} style={{width: "100%", height: "10vw", display: "flex", justifyContent: 'space-around'}}>
          <div onContextMenu={(e)=> e.preventDefault()} style={{display: "flex", alignItems: "center", justifyContent: "Center", backgroundColor: "black", width: "15vw", height: "15vw", alignSelf: "flex-start", borderRadius: "100px", textAlign: "center"}} onTouchStart={doDash} onTouchEnd={stopDash}>
            <div style={{fontSize: "5vw", color: "white"}}>
              B
            </div>
          </div>
          <div onDoubleClick={e => e.preventDefault()} onContextMenu={(e)=> e.preventDefault()} style={{display: "flex", alignItems: "center", justifyContent: "Center", backgroundColor: "black", width: "15vw", height: "15vw", alignSelf: "flex-end", borderRadius: "100px", textAlign: "center"}} onTouchStart={doJump} onTouchEnd={stopJump}>
            <div onDoubleClick={e => e.preventDefault()} style={{fontSize: "5vw", color: "white"}}>
              A
            </div>
          </div>
         </div>
      </div>
    }
    </>
  )
}

export default Bottom