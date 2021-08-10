import Phaser from 'phaser'

class Door extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x:number, y:number) {
    super(scene, x, y, `door`)

    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.init()
    this.initEvents()
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  init() {
    const body = this.body as Phaser.Physics.Arcade.Body
    this.setImmovable(true)
    body.setEnable(false)
    this.setOrigin(0, 0)
  }
}

export default Door
