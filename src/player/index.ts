interface BlockMusicPlayerOption {
  container: HTMLElement | null
  audioList?: AudioConfig[]
}

type AudioConfig = {
  cover: string
  title: string
  artist: string
  url: string
}
class BlockMusicPlayer {
  container;
  fragment = document.createDocumentFragment();
  playerIndex = 0;
  audioList;
  audio = document.createElement('audio');
  constructor(option: BlockMusicPlayerOption) {
    this.container = option.container
    this.audioList = option.audioList
    console.log(this.container)
    this.initPlayer()

  }
  initPlayer () {
    if (!this.container) return
    this.renderCover()
    this.renderAudio()
    const playerBody = document.createElement('div')
    playerBody.classList.add('block-music-player', 'is-mini')
    playerBody.append(this.fragment)
    this.container.append(playerBody)
  }

  renderAudio () {
    const audio = this.audio || document.createElement('audio')
    audio.src = '../assets/xq.mp3'
    this.fragment.append(audio)
  }

  renderCover () {
    const cover = document.createElement('div')
    cover.classList.add('music-cover')
    const coverImg = document.createElement('img')
    cover.append(coverImg)
    coverImg.src = 'https://w.wallhaven.cc/full/jx/wallhaven-jxl31y.png'
    coverImg.classList.add('music-cover-img')
    this.fragment.append(cover)
  }
}

export default BlockMusicPlayer
