import Phaser from 'phaser'
import Player from './Player'

class PlatformSinking extends Phaser.Physics.Arcade.Sprite {
  public player : Player
  public gravity : number
  
  constructor(scene:Phaser.Scene, x:number, y:number, player:Player) {
    super(scene, x, y, `platform-Sinking`)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.player = player
    this.gravity = 0

    this.init()
    this.initEvents()
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  init() {
    const body = this.body as Phaser.Physics.Arcade.Body
    body.setGravityY(this.gravity)
    this.setPushable(false)
    this.setOrigin(0, 0)
  }

  update() {
    const body = this.body as Phaser.Physics.Arcade.Body
    if (!body) { return }
    const inBounds = this.player.body.right > body.left && this.player.body.left < body.right

    if (Math.abs(this.player.body.bottom - body.top) < 2 && inBounds) {
      body.setVelocityY(70)
    }

    if (Math.abs(this.player.body.bottom - body.top) > 2) {
      body.setVelocityY(-20)
    } 

    if (body.y <= 1408 && Math.abs(this.player.body.bottom - body.top) > 2) {
      body.setVelocityY(0)
    }
  }
}

export default PlatformSinking  
