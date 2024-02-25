import { CreateVolume } from "@src/js/player/volume";

export type ControlOption = {
  play: boolean;
  index: number;
  words: boolean;
  audio: null | HTMLAudioElement;
  container: HTMLElement | null;
};
export default class MusicControl {
  state: ControlOption;
  voiceIcon: HTMLElement;
  constructor(option: ControlOption) {
    this.state = option;
    this.voiceIcon = new CreateVolume({
      change: this.volumeChange,
      audio: this.state.audio
    }).dom;
  }

  volumeChange(value: number) {
    const audio = this.state.audio;
    if (audio) {
      audio.volume = value;
    }
  }
  toggle() {
    this.state.play ? this.stop() : this.play();
  }
  play() {
    this.state.play = true;
    this.state.audio?.play();
    this.state.container?.classList.add("music-rotate");
  }
  stop() {
    this.state.play = false;
    this.state.audio?.pause();
    this.state.container?.classList.remove("music-rotate");
  }

  next() {}
}
