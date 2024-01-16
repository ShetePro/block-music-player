export type ControlOption = {
  play: boolean
  index: number
  words: boolean
  audio: null | HTMLAudioElement
}
export default class MusicControl {
  state: ControlOption;
  constructor(option: ControlOption) {
    this.state = option;
  }


  toggle () {
    this.state.play ? this.stop() : this.play()
    console.log(this.state.audio)
  }
  play() {
    this.state.play = true
    this.state.audio?.play()
  }
  stop() {
    this.state.play = false
    this.state.audio?.pause()
  }

  next() {}
}
