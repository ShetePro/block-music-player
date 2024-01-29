import playIcon from "../../assets/play_icon.svg";
import stopIcon from "@src/assets/stop_icon.svg";
import MusicControl from "./control";
import { transformSecond } from "@src/js/player/utils";
interface BlockMusicPlayerOption {
  container: HTMLElement | null;
  audioList?: AudioConfig[];
}

type AudioConfig = {
  cover: string;
  title: string;
  artist: string;
  url: string;
};
class BlockMusicPlayer {
  container: HTMLElement | null;
  fragment = document.createDocumentFragment();
  playerIndex = 0;
  audioList: AudioConfig[] | undefined;
  audio = document.createElement("audio");
  control: MusicControl;
  constructor(option: BlockMusicPlayerOption) {
    this.container = option.container;
    this.audioList = option.audioList;
    this.control = new MusicControl({
      container: this.container,
      play: false,
      index: 0,
      words: false,
      audio: this.audio,
    });
    this.initPlayer();
  }
  initPlayer() {
    if (!this.container) return;
    this.renderCover();
    this.renderAudio();
    this.renderControl();
    const playerBody = document.createElement("div");
    playerBody.classList.add("block-music-player", "is-mini");
    playerBody.append(this.fragment);
    this.container.append(playerBody);
  }

  renderControl() {
    const controlBox = document.createElement("div");
    controlBox.classList.add("music-control");
    const playControl = document.createElement("img");
    playControl.src = this.control.state.play ? stopIcon : playIcon;
    playControl.classList.add("music-control-play");
    playControl.addEventListener("click", () => {
      this.control?.toggle();
      playControl.src = this.control.state.play ? stopIcon : playIcon;
    });
    controlBox.append(playControl);
    controlBox.append(this.setMusicTime());
    this.fragment.append(controlBox);
  }
  setMusicTime() {
    const time = document.createElement("div");
    time.classList.add("music-time");
    setInterval(() => {
      const current = this.audio.currentTime
      time.innerText = transformSecond(this.audio.duration - current);

    }, 1000);
    return time;
  }
  renderAudio() {
    const audio = this.audio || document.createElement("audio");
    audio.src = "../src/assets/xq.mp3";
    this.fragment.append(audio);
    this.audio = audio;
  }

  renderCover() {
    const cover = document.createElement("div");
    cover.classList.add("music-cover");
    const coverImg = document.createElement("img");
    cover.append(coverImg);
    coverImg.src = "https://w.wallhaven.cc/full/jx/wallhaven-jxl31y.png";
    coverImg.classList.add("music-cover-img");
    this.fragment.append(cover);
  }
}

export default BlockMusicPlayer;
