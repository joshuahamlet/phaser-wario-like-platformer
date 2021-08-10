import Phaser from 'phaser'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import './main.css'

import PreloadScene from './Scenes/Preload'
import PlayScene from './Scenes/Play'
import EndGame from './Scenes/EndGame'


const WIDTH = 240*10
const HEIGHT = 160*10

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT
}

const Scenes = [PreloadScene, PlayScene, EndGame];
const createScene = (Scene):Phaser.Scene => new Scene(SHARED_CONFIG)
const initScenes = ():Phaser.Scene[] => Scenes.map(createScene)

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	...SHARED_CONFIG,
	canvasStyle: 'filter: drop-shadow(0 0 2px #4f5861)',
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false
		}
	},
	parent: 'phasercanvas', 
	scene: initScenes(),
	scale: {zoom: .35}
}

ReactDOM.render(<App />, document.getElementById('root'))

export default new Phaser.Game(config)
