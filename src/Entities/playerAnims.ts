export default initAnimations => {
  initAnimations.create({
    key: 'fall',
    frames: initAnimations.generateFrameNumbers('warbul-jump', {start: 2, end: 2}),
    frameRate: 1,
    repeat: -1
  })

  initAnimations.create({
    key: 'idle',
    frames: initAnimations.generateFrameNumbers('warbul-idle', {start: 0, end: 13}),
    frameRate: 1,
    repeat: -1
  })
  
  initAnimations.create({
    key: 'run',
    frames: initAnimations.generateFrameNumbers('warbul-walk', {start: 0, end: 7}),
    frameRate: 16,
    repeat: -1
  })

  initAnimations.create({
    key: 'jump',
    frames: initAnimations.generateFrameNumbers('warbul-jump', {start: 0, end: 0}),
    frameRate: 1,
    repeat: -1
  })

  initAnimations.create({
    key: 'doublejump',
    frames: initAnimations.generateFrameNumbers('warbul-jump', {start: 1, end: 1}),
    frameRate: 1,
    repeat: -1
  })

  initAnimations.create({
    key: 'dash',
    frames: initAnimations.generateFrameNumbers('warbul-dash', {start: 0, end: 7}),
    frameRate: 24,
    repeat: -1
  })

  initAnimations.create({
    key: 'crawl',
    frames: initAnimations.generateFrameNumbers('warbul-crouch', {start: 0, end: 1}),
    frameRate: 2,
    repeat: -1
  })

  initAnimations.create({
    key: 'crouch',
    frames: initAnimations.generateFrameNumbers('warbul-crouch', {start: 0, end: 0}),
    frameRate: 1,
    repeat: -1
  })

  initAnimations.create({
    key: 'slideLeft',
    frames: initAnimations.generateFrameNumbers('warbul-slide', {start: 0, end:0  }),
    frameRate: 1,
    repeat: -1
  })

  initAnimations.create({
    key: 'slideRight',
    frames: initAnimations.generateFrameNumbers('warbul-slide', {start: 1, end:1}),
    frameRate: 1,
    repeat: -1
  })
  initAnimations.create({
    key: 'blockTop',
    frames: initAnimations.generateFrameNumbers('block-Breakable-Top-Anim', {start: 0, end: 6}),
    frameRate: 20, 
    repeat: 0
  })
  initAnimations.create({
    key: 'block',
    frames: initAnimations.generateFrameNumbers('block-Breakable-Anim', {start: 0, end: 6}),
    frameRate: 20, 
    repeat: 0
  })
  initAnimations.create({
    key: 'chest',
    frames: initAnimations.generateFrameNumbers('chest', {start: 0, end: 0}),
    frameRate: 1, 
    repeat: 0
  })
  initAnimations.create({
    key: 'chestOpen',
    frames: initAnimations.generateFrameNumbers('chest', {start: 0, end: 6}),
    frameRate: 10, 
    repeat: 0
  })
  initAnimations.create({
    key: 'crown',
    frames: initAnimations.generateFrameNumbers('crown', {start: 0, end: 18}),
    frameRate: 10, 
    repeat: 0
  })
  initAnimations.create({
    key: 'endGame-Anim',
    frames: initAnimations.generateFrameNumbers('endGame-Anim', {start: 0, end: 17}),
    frameRate: 10, 
    repeat: -1
  })
}

