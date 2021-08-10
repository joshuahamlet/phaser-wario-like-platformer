import Phaser from 'phaser'
import warioMap from '../Assets/wario-like-intro-stage.json'
import warbulWalk from '../Assets/Player/warbul-Walk.png'
import warbulIdle from '../Assets/Player/warbul-Idle.png'
import warbulDash from '../Assets/Player/warbul-Charge.png'
import warbulJump from '../Assets/Player/warbul-Jump.png'
import warbulCrouch from '../Assets/Player/warbul-Crouch.png'
import warbulSlide from '../Assets/Player/warbul-Slide.png'
import greenlands from '../Assets/GB_Greenlands_Tile_Set.png'
import colliderBlue from '../Assets/collider_blue.png'
import platform9  from '../Assets/platform9.png'
import platform4 from '../Assets/platform4.png'
import platform2 from  '../Assets/platform2.png'
import blockBreakableTop from '../Assets/block-Breakable-Top.png'
import blockBreakable from '../Assets/block-Breakable.png'
import blockBreakableTopAnim from '../Assets/block-Breakable-Top-Anim.png'
import blockBreakableAnim from '../Assets/block-Breakable-Anim.png'
import platformSinking from '../Assets/platform-Sinking.png'
import door from '../Assets/door.png'
import chest from '../Assets/chest.png'
import crown from '../Assets/crown.png'
import endGameAnim from '../Assets/endGame-Anim.png'

class Preload extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.tilemapTiledJSON('map', warioMap)
    this.load.image('greenlands', greenlands)
    this.load.image('colliderBlue', colliderBlue)

    this.load.spritesheet('endGame-Anim', endGameAnim, {
      frameWidth: 84, frameHeight: 56 
    })
    this.load.spritesheet('warbul-walk', warbulWalk, {
      frameWidth: 32, frameHeight: 32 
    })
    this.load.spritesheet('warbul-dash', warbulDash, {
      frameWidth: 32, frameHeight: 32
    })
    this.load.spritesheet('warbul-idle', warbulIdle, {
      frameWidth: 32, frameHeight: 32
    })
    this.load.spritesheet('warbul-jump', warbulJump, {
      frameWidth: 32, frameHeight: 32
    })
    this.load.spritesheet('warbul-crouch', warbulCrouch, {
      frameWidth: 32, frameHeight:32
    })
    this.load.spritesheet('warbul-slide', warbulSlide, {
      frameWidth: 32, frameHeight:32
    })
    this.load.spritesheet('platform9', platform9, {
      frameWidth: 144, frameHeight: 16
    })
    this.load.spritesheet('platform4', platform4, {
      frameWidth: 64, frameHeight: 16
    })
    this.load.spritesheet('platform2', platform2, {
      frameWidth: 32, frameHeight: 16
    })
    this.load.spritesheet('platform-Sinking', platformSinking, {
      frameWidth: 46, frameHeight:16  
    })
    this.load.spritesheet('block-Breakable', blockBreakable, {
      frameWidth: 32, frameHeight: 32
    })
    this.load.spritesheet('block-Breakable-Top', blockBreakableTop, {
      frameWidth: 32, frameHeight: 32
    })
    this.load.spritesheet('block-Breakable-Top-Anim', blockBreakableTopAnim, {
      frameWidth: 32, frameHeight:32
    })
    this.load.spritesheet('block-Breakable-Anim', blockBreakableAnim, {
      frameWidth: 32, frameHeight:32
    })
    this.load.spritesheet('door', door, {
      frameWidth: 32, frameHeight: 32  
    })
    this.load.spritesheet('chest', chest, {
      frameWidth: 32, frameHeight: 32  
    })
    this.load.spritesheet('crown', crown, {
      frameWidth: 17, frameHeight: 16  
    })
  }

  create() {
    this.scene.start('PlayScene')
  }
}

export default Preload;