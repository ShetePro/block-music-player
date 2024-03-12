import { CreateVolume } from "@src/js/player/volume";
import { AudioConfig } from "@src/js/player/index";

export type ControlOption = {
  play: boolean; // 是否播放
  index: number; // 当前播放序号
  words: boolean; // 是否显示歌词
  audio: null | HTMLAudioElement;
  playerList: AudioConfig[]; // 播放列表
  container: HTMLElement | null;
  // 切换歌曲变更dom内容
  renderEvent: () => void;
};
export default class MusicControl {
  state: ControlOption;
  voiceIcon: HTMLElement;
  current: AudioConfig;
  constructor(option: ControlOption) {
    this.state = option;
    this.voiceIcon = new CreateVolume({
      change: this.volumeChange,
      audio: this.state.audio,
    }).dom;
    this.current = option.playerList[option.index];
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

  // 下一首
  nextAudio() {
    const { playerList, index } = this.state;
    this.state.index = playerList.length === index + 1 ?  0 : index + 1;
    this.current = playerList[this.state.index];
    this.state.renderEvent();
  }

  // 上一首
  preAudio() {
    const { playerList, index } = this.state;
    this.state.index = index === 0 ? playerList.length - 1 : index - 1;
    this.state.renderEvent();
  }
}
