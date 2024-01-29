export type ControlOption = {
  play: boolean
  index: number
  words: boolean
  audio: null | HTMLAudioElement
  container: HTMLElement | null;
}
export default class MusicControl {
  state: ControlOption;
  constructor(option: ControlOption) {
    this.state = option;
  }


  toggle () {
    this.state.play ? this.stop() : this.play()
  }
  play() {
    this.state.play = true
    this.state.audio?.play()
    this.state.container?.classList.add('music-rotate')
  }
  stop() {
    this.state.play = false
    this.state.audio?.pause()
    this.state.container?.classList.remove('music-rotate')
  }

  next() {}
}
