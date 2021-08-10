import Phaser from 'phaser'
import Player from '../Entities/Player'
import Platform from '../Entities/Platform'
import BlockBreakable from '../Entities/BlockBreakable'
import PlatformSinking from '../Entities/PlatformSinking'
import Door from '../Entities/Door'
import Chest from '../Entities/Chest'
import Crown from '../Entities/Crown'

class Play extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  create() {
    const map = this.createMap()
    const camera = this.cameras.main
    const layers = this.createLayers(map)
    const player = this.createPlayer()
    const blocks = this.createBlocks()
    const doors = this.createDoors()
    const chests = this.createChests()
    const platforms = this.createPlatforms(player)
    const crowns = this.createCrowns(player, chests)
    const platformsSinking = this.createSinkingPlatforms(player)

    this.physics.add.collider(player, layers.colliders)
    this.physics.add.collider(platforms, player)
    this.physics.add.collider(platformsSinking, player)
    
    chests.map(chest => {
      this.physics.add.collider(chest, player, () => {
        if (player.dashLock && chest.open === false) {
          chest.open = true
          chest.play('chestOpen', false)
          chest.once('animationcomplete', () => {
            chest.showTreasure = true
          })
        }
      })
    })

    blocks.map(block => {
      this.physics.add.collider(block, player, () => {
        if (player.buttStomp) {
          block.blockbody.setEnable(false)
          block.top ? block.play('blockTop', false) : block.play('block', false)
          block.once('animationcomplete', () => {
            block.visible = false
            block.blockbody.setEnable(false)
          })
        } else if (player.dashLock && (player.body.blocked.left || player.body.blocked.right)) {
          block.top ? block.play('blockTop', false) : block.play('block', false)
          block.once('animationcomplete', () => {
            block.blockbody.setEnable(false)
            block.visible = false
          })
        }
      })
    })

    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    camera.startFollow(player, true, .09, .09)
    camera.setZoom(6)
  }

  createMap() {
    const map = this.make.tilemap({key: 'map'})
    map.addTilesetImage('GB_Greenlands_Tile_Set', 'greenlands')
    map.addTilesetImage('collider_blue', 'colliderBlue')
    return map;
  }

  createLayers(map) {
    const tileset = map.getTileset('GB_Greenlands_Tile_Set');
    const tilesetCollide = map.getTileset('collider_blue')
    const colliders = map.createLayer('Colliders', tilesetCollide);
    const background = map.createLayer('Background', tileset);

    colliders.setCollisionByProperty({collides: true});

    return { background, colliders };
  }

  createPlatforms(player) {
    const platformWall = new Platform(this, 2256, 912, player, 9)
    const platformClimb1 = new Platform(this, 2288, 1104, player, 2)
    const platformClimb2 = new Platform(this, 2336, 1040, player, 2)
    const platformClimb3 = new Platform(this, 2288, 976, player, 2)
    const platformStep1 =  new Platform(this, 592, 1392, player, 4)
    const platformStep2 =  new Platform(this, 752, 1392, player, 4)
    const platformStep3 =  new Platform(this, 912, 1392, player, 4)
    const platformClimb0 =  new Platform(this, 2288, 1232, player, 2)

    return [platformWall, platformStep1, platformStep2, platformStep3, platformClimb0, platformClimb1, platformClimb2, platformClimb3]
  }

  createSinkingPlatforms(player) {
    const sinking0 = new PlatformSinking(this, 1344, 1408, player)
    const sinking1 = new PlatformSinking(this, 1472, 1408, player)
    const sinking2 = new PlatformSinking(this, 1600, 1408, player)
    const sinking3 = new PlatformSinking(this, 1728, 1408, player)
    const sinking4 = new PlatformSinking(this, 1856, 1408, player)
    return [sinking0, sinking1, sinking2, sinking3, sinking4]
  }

  createBlocks() {
    const block0 = new BlockBreakable(this, 448, 1392, true)
    const block1 = new BlockBreakable(this, 448, 1424, false)
    const block2 = new BlockBreakable(this, 448, 1456, false)
    const block3 = new BlockBreakable(this, 448, 1488, false)
    const block4 = new BlockBreakable(this, 448, 1520, false)

    const block5 = new BlockBreakable(this, 1072, 1488, false)
    const block6 = new BlockBreakable(this, 1072, 1520, false)
    const block7 = new BlockBreakable(this, 1104, 1488, false)
    const block8 = new BlockBreakable(this, 1104, 1520, false)
    const block9 = new BlockBreakable(this, 1136, 1488, false)
    const block10 = new BlockBreakable(this, 1136, 1520, false)
    const block11 = new BlockBreakable(this, 2256, 1168, false)
    const block12 = new BlockBreakable(this, 2256, 1200, false)
        
    return [block0, block1, block2, block3, block4, block5, block6, block7, block8, block9, block10, block11, block12]
  }

  createDoors() {
    const door0 = new Door(this, 448, 1520)
    const door0x = new Door(this, 144, 160)
    const door1 = new Door(this, 1216, 1520)
    const door1x = new Door(this, 576, 160)
    const door2 = new Door(this, 2192, 1200)
    const door2x = new Door(this, 1008, 160)

    return [door0, door0x, door1, door1x, door2, door2x]
  }

  createChests() {
    const chest0 = new Chest(this, 240, 160)
    const chest1 = new Chest(this, 672, 160)
    const chest2 = new Chest(this, 1104, 160)

    return [chest0, chest1, chest2]
  }

  createCrowns(player, chests) {
    const crown0 = new Crown(this, 248, 128, player, chests[0])
    const crown1 = new Crown(this, 680, 128, player, chests[1])
    const crown2 = new Crown(this, 1112, 128, player, chests[2])

    return [crown0, crown1, crown2]
  }

  createPlayer() {
    return new Player(this, 30, 1500)
  }      
}

export default Play;
