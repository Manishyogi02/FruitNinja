import { Howl } from "howler"

export const gamesoundTrack = new Howl({
    src: ["/src/audio/soundtrack.mp3"]
})
gamesoundTrack.play()

export const gameOverSound = new Howl({
    src: ["/src/audio/gameover.mp3"]
})

export const fruitMissSound = (new Howl({
    src: "/src/audio/boing_fruit.mp3"
}))

export const fruitsliceSound = new Howl({
    src: ["/src/audio/fruit_slice_3.mp3"]
})

export const bladSlashSound = new Howl({
    src: ["/src/audio/sword_swing.mp3"]
})

export const btnClickSound = new Howl({
    src: ["/src/audio/click.mp3"]
})
btnClickSound.play()

export const bombThrowSound = new Howl({
    src : ["/src/audio/bomb_fuse.mp3"]
})

export const bombBlastSound = new Howl({
    src : ["/src/audio/bomb_blast.mp3"]
})

export const fruitThrowSound = new Howl({
    src : ["/src/audio/fruit_throw.mp3"]
})