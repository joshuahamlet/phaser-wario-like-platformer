import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import { tipTextAtom } from '../Atoms'
import CSS from 'csstype'

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


const Bottom: React.FC = () => {
  const [tipText, setTipText] = useAtom(tipTextAtom)

  const softGround = `The ground looks soft here. Try Stomping with Jump(Space) + Down`
  const letsBegin = `Alright, let's get this quest on the road (use the arrow keys to move, Space to Jump, and Shift to Dash).`
  const treasureFound = 'Jackpot! Grab that treasure! (Press shift to Dash)'
  const restart = 'Good job! Press Space to restart.'
  const doorWallJump = 'Press Up to enter doors. Jump(Space) and hold Left or Right against a wall to Slide. Press Jump(Space) while Sliding to WallJump.'
  const clear = ''
  const dash = `These walls are no match for your Dash(Shift).`
  const leap = `Sometimes an epic quest requires a leap of faith!`
  const wallJump = `Jump(Space) and hold Left or Right against a wall to Slide. Press Jump(Space) while Sliding to WallJump.`
  const door = `Press Up to enter doors.`

  const handleTip = (tip) => {
    setTipText(tip)
  }

  useEffect(()=> {
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
    <div style={bottomStyle}>
      <div>
        {tipText}
      </div>
    </div>
  )
}

export default Bottom