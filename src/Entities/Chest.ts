import Phaser from 'phaser'

class Chest extends Phaser.Physics.Arcade.Sprite {
  public showTreasure : boolean
  public open : boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, `chest`)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.showTreasure = false
    this.open = false

    this.init()
    this.initEvents()
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  init() {
    this.setImmovable(true)
    this.setOrigin(0, 0)
  }
}

export default Chest
