import Phaser from 'phaser'
import initAnimations from './playerAnims'

class Player extends Phaser.Physics.Arcade.Sprite {

  //  mobile workarounds  //
  public doJump: Function
  public stopJump: Function
  public doDash: Function
  public stopDash: Function
  public doUp: Function
  public stopUp: Function
  public doDown: Function
  public stopDown: Function
  public doRight: Function
  public stopRight: Function
  public doLeft: Function
  public stopLeft: Function
  public mobileJump: boolean
  public mobileDash: boolean
  public mobileUp: boolean
  public mobileDown: boolean
  public mobileLeft: boolean
  public mobileRight: boolean
  public mobileLeftHold: boolean
  public mobileRightHold: boolean
  //////////////////////////

  public buttStomp: boolean
  public treasureCount: number
  public gravity: number
  public playerSpeed: number
  public walkSpeedMax: number
  public crawlAccel: number
  public walkAccel: number
  public walkSpeed: number
  public jumpCount: number
  public dashSpeed: number
  public dashDecelerate: boolean
  public dashLock: boolean
  public rebounding: boolean 
  public wallJumpLeft: boolean
  public wallJumpRight: boolean
  public holdSlideLeft: boolean
  public holdSlideRight: boolean
  public buttStompLock: boolean
  public floorTouchCount: number 
  public cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private dash: Event
  private door: Event
  private leap: Event
  private clear: Event
  private death: Event
  private letsBegin: Event
  private wallJump: Event
  private softGround: Event
  private doorWallJump: Event
  private treasureFound: Event

  constructor(scene : Phaser.Scene, x : number, y : number) {
    super(scene, x, y, 'player')

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.dash = new Event('dash')
    this.door = new Event('door')
    this.leap = new Event('leap')
    this.clear = new Event('clear')
    this.death = new Event('death')
    this.letsBegin = new Event('letsBegin')
    this.wallJump = new Event('wallJump')
    this.softGround = new Event('softGround')
    this.doorWallJump = new Event('doorWallJump')
    this.treasureFound = new Event('treasureFound')

    //  mobile workarounds  //
    this.mobileJump = false
    this.mobileDash = false
    this.mobileUp = false
    this.mobileDown = false
    this.mobileLeft = false
    this.mobileRight = false
    this.mobileLeftHold = false
    this.mobileRightHold = false
    //////////////////////////
    
    this.buttStomp = false
    this.treasureCount = 0
    this.gravity = 500
    this.playerSpeed = 200
    this.walkSpeedMax = 200
    this.crawlAccel = 2
    this.walkAccel = 5
    this.walkSpeed = 0
    this.jumpCount = 0
    this.dashSpeed = 0
    this.dashDecelerate = false
    this.dashLock = false
    this.rebounding = false 
    this.wallJumpLeft = false
    this.wallJumpRight = false
    this.holdSlideLeft = true
    this.holdSlideRight = true
    this.buttStompLock = false
    this.floorTouchCount = 0 
    this.cursors = this.scene.input.keyboard.createCursorKeys()
    this.init(scene)
    this.initEvents()
    
    //  mobile workarounds  //
    this.doJump = () => this.mobileJump = true
    this.stopJump = () => this.mobileJump = false 
    this.doDash = () => this.mobileDash = true
    this.stopDash = () => this.mobileDash = false
    this.doUp = () => this.mobileUp = true
    this.stopUp = () => this.mobileUp = false
    this.doDown = () => this.mobileDown = true
    this.stopDown = () => this.mobileDown = false
    this.doLeft = () => {
      this.mobileLeft = true
      this.mobileLeftHold = true
    } 
    this.stopLeft = () => {
      this.mobileLeft = false
      this.mobileLeftHold = false
    } 
    this.doRight = () => {
      this.mobileRight = true
      this.mobileRightHold = true
    } 
    this.stopRight = () => {
      this.mobileRight = false
      this.mobileRightHold = false
    } 
    //////////////////////////

  }

  

  init(scene: Phaser.Scene) {
    const body = this.body as Phaser.Physics.Arcade.Body
    this.scene = scene

   
    // window.addEventListener('gamepadconnected', function(e) {
    //   console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    //   e.gamepad.index, e.gamepad.id,
    //   e.gamepad.buttons.length, e.gamepad.axes.length);
    // });

    body.setGravityY(this.gravity)
    this.setBodySize(24, 32, true)
    this.setDepth(10)
    body.setCollideWorldBounds(true)
    body.onWorldBounds = true 
    
    this.scene.physics.world.on('worldbounds', (body, up, down) => {
      if (down) {
        console.log(down)
        this.body.reset(32, 1536)
        window.dispatchEvent(this.death)
      }
    })

    initAnimations(this.scene.anims)
  }


  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  update() {
    const body = this.body as Phaser.Physics.Arcade.Body
    if (!body) { return }

    // let gamepad = navigator.getGamepads ? navigator.getGamepads()[0] : ''
    // if (gamepad) {
    // gamepad.buttons.map((button,index) => {
    //   if (button.touched){
    //     console.log(`button ${index} pressed!`)
    //     console.log(gamepad)
    //     if(index === 0 && !this.jumpButtonState) {
    //       this.jumpButtonstate = button.touched
    //       this.jumpButton = true
    //     } else {
    //       this.jumpButtonstate = button.touched
    //       this.jumpButton = false
    //     }
    //   }
    // })
    // }

    const { left, right, up, space, shift, down } = this.cursors
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space) || this.mobileJump
    const isShiftJustDown = Phaser.Input.Keyboard.JustDown(shift) || this.mobileDash
    const isDownJustDown = Phaser.Input.Keyboard.JustDown(down) || this.mobileDown
    const isUpJustDown = Phaser.Input.Keyboard.JustDown(up) || this.mobileUp
    const onFloor = body.onFloor() ////////////////////////////////////////////CHECK

    //######## HIT TESTS ########################################
    if (this.body.hitTest(464, 1536) && isUpJustDown) {
      this.walkSpeed = 0
      this.scene.input.keyboard.enabled = false
      this.scene.cameras.main.fade(300, 0, 0, 0)
      this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.body.reset(160,191)
        this.scene.input.keyboard.resetKeys()
        this.scene.input.keyboard.enabled = true
        this.scene.cameras.main.stopFollow()
        this.scene.cameras.main.centerOn(208,112)
        if (onFloor) { ////////////////////////////////////////////CHECK
          this.scene.cameras.main.resetFX()
        }
      })
    }
    if (this.body.hitTest(160, 176) && isUpJustDown) {
      this.walkSpeed = 0
      this.scene.input.keyboard.enabled = false
      this.scene.cameras.main.fade(300, 0, 0, 0)
      this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.body.reset(464, 1535)
        this.scene.input.keyboard.resetKeys()
        this.scene.input.keyboard.enabled = true
        this.scene.cameras.main.startFollow(this, true, .09, .09)
        if (onFloor) { ////////////////////////////////////////////CHECK
          this.scene.cameras.main.resetFX()
        }
      })
    }
    if (this.body.hitTest(1232, 1536) && isUpJustDown) {
      this.walkSpeed = 0
      this.scene.input.keyboard.enabled = false
      this.scene.cameras.main.fade(300, 0, 0, 0)
      this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.body.reset(592,191)
        this.scene.input.keyboard.resetKeys()
        this.scene.input.keyboard.enabled = true
        this.scene.cameras.main.stopFollow()
        this.scene.cameras.main.centerOn(640,112)
        if (onFloor) { ////////////////////////////////////////////CHECK
          this.scene.cameras.main.resetFX()
        }
      })
    }
    if (this.body.hitTest(592, 176) && isUpJustDown) {
      this.walkSpeed = 0
      this.scene.input.keyboard.enabled = false
      this.scene.cameras.main.fade(300, 0, 0, 0)
      this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.body.reset(1232, 1535)
        this.scene.input.keyboard.resetKeys()
        this.scene.input.keyboard.enabled = true
        this.scene.cameras.main.startFollow(this, true, .09, .09)
        if (onFloor) { ////////////////////////////////////////////CHECK
          this.scene.cameras.main.resetFX()
        }
      })
    }
    if (this.body.hitTest(2208, 1216) && isUpJustDown) {
      this.walkSpeed = 0
      this.scene.input.keyboard.enabled = false
      this.scene.cameras.main.fade(300, 0, 0, 0)
      this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.body.reset(1024,191)
        this.scene.input.keyboard.resetKeys()
        this.scene.input.keyboard.enabled = true
        this.scene.cameras.main.stopFollow()
        this.scene.cameras.main.centerOn(1072,112)
        if (onFloor) { ////////////////////////////////////////////CHECK
          this.scene.cameras.main.resetFX()
        }
      })    
    }
    if (this.body.hitTest(1024, 176) && isUpJustDown) {
      this.walkSpeed = 0
      this.scene.input.keyboard.enabled = false
      this.scene.cameras.main.fade(300, 0, 0, 0)
      this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.body.reset(2208, 1215)
        this.scene.input.keyboard.resetKeys()
        this.scene.input.keyboard.enabled = true
        this.scene.cameras.main.startFollow(this, true, .09, .09)
        if (onFloor) { ////////////////////////////////////////////CHECK
          this.scene.cameras.main.resetFX()
        }
      })
    }
    
    if (this.body.hitTest(32, 1536)) {
      window.dispatchEvent(this.letsBegin)
    } else if (this.body.hitTest(464, 1376)){
      window.dispatchEvent(this.softGround)
    } else if (this.body.hitTest(160, 176)){
      window.dispatchEvent(this.treasureFound)
    } else if (this.body.hitTest(592, 176)){
      window.dispatchEvent(this.treasureFound)
    } else if (this.body.hitTest(1024, 176)){
      window.dispatchEvent(this.treasureFound)
    }  else {
      window.dispatchEvent(this.clear)
    }

    if (this.body.hitTest(464,1536)) {
      window.dispatchEvent(this.doorWallJump)
    }
    if (this.body.hitTest(1232,1536)) {
      window.dispatchEvent(this.door)
    }
    if (this.body.hitTest(2208,1216)) {
      window.dispatchEvent(this.door)
    }

    if (this.body.hitTest(1056,1536)) {
      window.dispatchEvent(this.dash)
    }

    if (this.getTopLeft().x > 1760 && this.getTopLeft().x < 1920 && this.getTopLeft().y < 912) {
      window.dispatchEvent(this.leap)
    }
    if (this.getTopLeft().x > 2160 && this.getTopLeft().x < 2368 && this.getTopLeft().y > 1520) {
      window.dispatchEvent(this.wallJump)
    }

    if (this.body.hitTest(1080,976)) {
      this.walkSpeed = 0
      this.scene.input.enabled = false
      this.scene.cameras.main.zoomTo(20)
      this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.ZOOM_COMPLETE, () => {
        this.scene.cameras.main.fade(700, 255, 255, 255)
          this.scene.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.scene.scene.start('EndGame')
        })
      })
    }
    ////////////////////////////////////////////////////////

    //######## WALK ########################################
    this.setVelocityX(this.walkSpeed) 

    if ((down.isDown) && onFloor ) {
      this.walkSpeedMax = 20
      if (Math.abs(this.walkSpeed) > this.walkSpeedMax) {
        if (this.walkSpeed > 0) {this.walkSpeed = 20}
        if (this.walkSpeed < 0) {this.walkSpeed = -20}
      }
    } else {
      this.walkSpeedMax = 200
    }

    if (left.isDown || this.mobileLeft) {
      if (this.walkSpeed >= -this.walkSpeedMax) {
        this.walkSpeed = this.walkSpeed -(this.walkAccel*2)
      }
      this.setFlipX(true)
    } else if (right.isDown || this.mobileRight) {
      if (this.walkSpeed <= this.walkSpeedMax) {
        this.walkSpeed = this.walkSpeed + (this.walkAccel*2)
      }
      this.setFlipX(false)
    }

    if (this.walkSpeed > 0 ) {
      this.walkSpeed = this.walkSpeed - this.walkAccel
    } else if (this.walkSpeed < 0) {
      this.walkSpeed = this.walkSpeed + this.walkAccel
    }
    ////////////////////////////////////////////////////////

    //####### BUTTSTOMP ###################################
    if (isDownJustDown && !onFloor && !this.buttStompLock) {
      this.setVelocityY(500)
      this.buttStomp = true
    }
    
    if (this.buttStomp) {
      this.setVelocityX(0)
      this.walkSpeed = 0
    }

    if (this.body.blocked.down && !this.buttStomp) {
      this.buttStompLock = false
    }
    if (this.body.blocked.down && this.buttStomp) {
      this.scene.cameras.main.shake(100, .0004)
      body.setVelocityY(-100) ////////////////////////////////////////////CHECK
      this.buttStomp = false
      this.buttStompLock = true
    } 
    ///////////////////////////////////////////////////////

    //######## WALLJUMP ####################################
    if (!this.dashLock && !onFloor && this.body.blocked.right && (right.isDown || this.mobileRightHold) && (this.holdSlideRight || this.mobileRightHold)) {
      this.holdSlideLeft = true
      this.wallJumpLeft = false
      this.body.offset.x = 8
      this.play('slideRight', true)
      this.setVelocityY(10)
      if (isSpaceJustDown && !this.wallJumpRight) {
        this.wallJumpRight = true
        this.holdSlideRight = false
        this.setVelocityY(-250)
        this.walkSpeed = -300
      }  
    }  
    
    if (!this.dashLock && !onFloor && this.body.blocked.left && (left.isDown || this.mobileLeftHold) && (this.holdSlideLeft || this.mobileLeftHold)) {
      this.holdSlideRight = true
      this.wallJumpRight = false
      this.body.offset.x = 0
      this.setFlipX(false)
      this.play('slideLeft', true)
      this.setVelocityY(10)
      if (isSpaceJustDown && !this.wallJumpLeft) {
        this.wallJumpLeft = true
        this.holdSlideLeft = false
        this.setVelocityY(-250)
        this.walkSpeed = 300
      } 
    }

    if (this.body.blocked.left && this.jumpCount > 1) {
      this.walkSpeed =  0
    }
    if (this.body.blocked.right && this.jumpCount > 1) {
      this.walkSpeed =  0
    }
    ////////////////////////////////////////////////////////

    //####### DASH ########################################
    if (isShiftJustDown && !this.dashLock) {
      this.dashSpeed = 500
    }

    if (this.dashSpeed !== 0 || this.rebounding) {
      this.dashLock = true
    } else if (this.dashSpeed === 0) {
      this.dashLock = false
    }

    if (this.dashSpeed === 0) {
      this.dashDecelerate = false
    } 

    const handleDash = () => {
      if (this.dashSpeed === 500) {
        this.setBodySize(30, 32, true)
        this.play('dash', true)
        this.walkSpeed = 0
      }

      if (this.flipX) {
        this.setVelocityX(-this.dashSpeed)
      } else if (!this.flipX) {
        this.setVelocityX(this.dashSpeed)
      }
      
      if (this.anims.currentFrame.isLast) {
        this.dashDecelerate = true
      }

      if(this.body.blocked.right && !this.flipX) {
        this.scene.cameras.main.shake(100, .0004)
        this.rebounding = true
        this.dashDecelerate = true 
        this.dashSpeed = -200
        this.setVelocityY(-150)
      } else if (this.body.blocked.left && this.flipX) {
        this.scene.cameras.main.shake(100, .0004)
        this.rebounding = true
        this.dashDecelerate = true
        this.dashSpeed = -200
        this.setVelocityY(-150)
      }

      if (this.dashDecelerate) {
        if (onFloor) {
          Math.abs(this.dashSpeed) < 80 ?
          this.dashSpeed = 0 :
          this.dashSpeed = this.dashSpeed * .90
        } else if (!onFloor) {
          Math.abs(this.dashSpeed) < 25 ? 
          this.dashSpeed = 0 :
          this.dashSpeed = this.dashSpeed * .90
        } 
      }  
    }
    /////////////////////////////////////////////////////


    if ((isSpaceJustDown) && (onFloor || (this.jumpCount < 1 && this.dashSpeed <= 0))) {
      this.setVelocityY(-this.playerSpeed * 1.35)
      this.jumpCount++
    }

    if (onFloor) {
      this.jumpCount = 0
      this.rebounding = false
      this.wallJumpRight = false
      this.wallJumpLeft = false
      this.holdSlideLeft = true
      this.holdSlideRight = true
    }

    if (this.dashSpeed !== 0) {
      handleDash()
    } else if (this.jumpCount > 0 && !onFloor && this.body.velocity.y < 0) {
      this.setBodySize(24, 32, true)
      this.play('doublejump', true)
    } else if (!onFloor && this.body.velocity.y < 0) {
      this.setBodySize(24, 32, true)
      this.play('jump', true)
    } else if (this.body.velocity.y > 0 && this.dashSpeed <= 0 && this.body.velocity.y !== 10 && !onFloor) {
      this.setBodySize(24, 32, true)
      this.play('fall', true)
    } else if (this.body.velocity.x !== 0 && this.body.velocity.y !== 10 && (down.isDown)) {
      this.body.offset.y = 10
      this.setBodySize(24, 22, false)
      this.play('crawl', true)
    } else if (this.body.velocity.x !== 0 && this.body.velocity.y !== 10) {
      this.setBodySize(24, 32, true)
      this.play('run', true)
    } else if (this.dashSpeed <= 0 && onFloor && this.body.velocity.y !== 10 && down.isDown) {
      this.body.offset.y = 10
      this.setBodySize(24, 22, false)
      this.play('crouch', true)
    } else if (this.dashSpeed <= 0 && onFloor && this.body.velocity.y !== 10 && !down.isDown) {
      this.setBodySize(24, 32, true)
      this.play('idle', true)
    }

    this.mobileJump = false
    this.mobileDash = false
    this.mobileUp = false
    this.mobileDown = false
    //this.mobileLeft = false
    //this.mobileRight = false
  }

}

export default Player  
