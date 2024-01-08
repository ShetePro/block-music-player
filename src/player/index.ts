import playIcon from '../assets/play_icon.svg'
import stopIcon from '../assets/stop_icon.svg'
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
  control = {
    play: false
  }
  constructor(option: BlockMusicPlayerOption) {
    this.container = option.container
    this.audioList = option.audioList
    this.initPlayer()

  }
  initPlayer () {
    if (!this.container) return
    this.renderCover()
    this.renderAudio()
    this.renderControl()
    const playerBody = document.createElement('div')
    playerBody.classList.add('block-music-player', 'is-mini')
    playerBody.append(this.fragment)
    this.container.append(playerBody)
  }

  renderControl () {
    const controlBox = document.createElement('div')
    controlBox.classList.add('music-control')
    const playControl = document.createElement('img')
    playControl.src = this.control.play ? playIcon : stopIcon
    playControl.classList.add('music-control-play')
    playControl.addEventListener('click', () => {
      this.control.play = !this.control.play
      playControl.src = this.control.play ? playIcon : stopIcon
    })
    controlBox.append(playControl)
    this.fragment.append(controlBox)
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
