import Phaser from 'phaser'
import Player from './Player'

class Platform extends Phaser.Physics.Arcade.Sprite {
    public player :  Phaser.Physics.Arcade.Sprite
    public gravity : number

  constructor(scene:Phaser.Scene, x:number, y:number, player:Player, size:number) {
    super(scene, x, y, `platform${size}`)

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
    this.setImmovable(true)
    this.setOrigin(0, 0)
  }

  update() {
    const body = this.body as Phaser.Physics.Arcade.Body
    if (!body) { return }
    if (body.top >= this.player.body.bottom) {
      body.setEnable(true)    
    } else {
      body.setEnable(false)
    }
  }
}

export default Platform  
