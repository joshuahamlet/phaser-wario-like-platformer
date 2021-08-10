import Phaser from 'phaser'



class EndGame extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private clearIcons: Event
  private restart: Event

  constructor() {
    super('EndGame')
    
    this.clearIcons = new Event('clearIcons')
    this.restart = new Event('restart')
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
    window.dispatchEvent(this.clearIcons)
    window.dispatchEvent(this.restart)
  }

  create() {
    let endGame = this.add.sprite(0, 0, 'endGame-Anim')
    endGame.play('endGame-Anim', true)

    endGame.setOrigin(0,0)
    this.cameras.main.setZoom(30)
    this.cameras.main.setBounds(0, 0, 84, 56)
  }

  update() {
    const { left, right, up, space, shift, down } = this.cursors
    if (space.isDown) {
      this.scene.start('PlayScene')
    }
  }
}

export default EndGame