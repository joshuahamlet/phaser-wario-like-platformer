import Phaser from 'phaser'

class BlockBreakable extends Phaser.Physics.Arcade.Sprite {
  public top : boolean
  public blockbody : Phaser.Physics.Arcade.Body

  constructor(scene:Phaser.Scene, x:number, y:number, top:boolean) {
    super(scene, x, y, `block-Breakable${top ? '-Top' : ''}`)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.top = top
    this.blockbody = this.body as Phaser.Physics.Arcade.Body

    this.init()
    this.initEvents()
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  init() {
    this.setImmovable(true)
    this.setOrigin(0, 0)
    this.setDepth(1)
  }
}

export default BlockBreakable
