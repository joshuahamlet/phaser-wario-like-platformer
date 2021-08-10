import Phaser, { Physics } from 'phaser'
import Chest from './Chest'
import Player from './Player'

class Crown extends Phaser.Physics.Arcade.Sprite {
  public treasureCount : Event
  public open : boolean
  public count : number
  public animationFinished : boolean
  public rollAnimation : boolean
  public player : Player
  public chest : Chest

  constructor(scene:Phaser.Scene, x:number, y:number, player:Player, chest:Chest) {
    super(scene, x, y, `crown`)

    scene.add.existing(this)
    scene.physics.add.existing(this)
    
    this.treasureCount = new Event('treasureCount')
    this.open = false
    this.count = 0
    this.animationFinished = false
    this.rollAnimation = false
    this.player = player
    this.chest = chest

    this.init()
    this.initEvents()
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
  }

  init() {
    this.setVisible(false)
    this.setImmovable(true)
    this.setOrigin(0, 0)
  }

  update() {
    const body = this.body as Phaser.Physics.Arcade.Body
    if (!body) { return }
    const checkOverlap = (spriteA, spriteB) => {
      let boundsA = spriteA.getBounds()
      let boundsB = spriteB.getBounds()

      return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    }
    
    if(this.animationFinished && checkOverlap(this.player, this)) {
      this.setVisible(false)
      this.count ++
      if (this.count === 1) {
        window.dispatchEvent(this.treasureCount)
      }
    }
  
    if (this.chest.showTreasure && !this.rollAnimation) {
      this.rollAnimation = true  
      this.setVisible(true)
      this.play('crown', false)
      this.once('animationcomplete', () => {
        this.animationFinished = true
      })
    }
   }
}

export default Crown
