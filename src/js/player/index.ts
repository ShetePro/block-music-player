import playIcon from "../../assets/play_icon.svg";
import stopIcon from "@src/assets/stop_icon.svg";
import MusicControl from "./control";
import { transformSecond } from "@src/js/player/utils";
import { createDocumentEl } from "@src/js/player/create";
interface BlockMusicPlayerOption {
  container: HTMLElement | null;
  playerList?: AudioConfig[];
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
  playerList: AudioConfig[];
  audio = createDocumentEl("audio");
  control: MusicControl;
  constructor(option: BlockMusicPlayerOption) {
    this.container = option.container;
    this.playerList = option.playerList || [];
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
    const playerBody = createDocumentEl("div", {
      classList: ["block-music-player", "is-mini"],
    });
    playerBody.append(this.fragment);
    this.container.append(playerBody);
  }

  renderControl() {
    const controlBox = createDocumentEl("div", {
      classList: ["music-control"],
    });
    const playControl = createDocumentEl("img", {
      classList: ["music-control-play"],
    });
    playControl.src = this.control.state.play ? stopIcon : playIcon;
    playControl.addEventListener("click", () => {
      this.control?.toggle();
      playControl.src = this.control.state.play ? stopIcon : playIcon;
    });
    controlBox.append(playControl, this.control.voiceIcon, this.setMusicTitle(), this.setMusicTime());
    this.fragment.append(controlBox);
  }
  setMusicTitle () {
    const title = createDocumentEl('span', {
      classList: ['music-title']
    })
    title.innerText = this.playerList[this.playerIndex].title
    return title
  }
  setMusicTime() {
    const time = createDocumentEl("div", {
      classList: ["music-time"],
    });
    setInterval(() => {
      const current = this.audio.currentTime;
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
    const cover = createDocumentEl("div", { classList: ["music-cover"] });
    const coverImg = createDocumentEl("img", {
      classList: ["music-cover-img"],
    });
    coverImg.src = "https://w.wallhaven.cc/full/jx/wallhaven-jxl31y.png";
    cover.append(coverImg);
    this.fragment.append(cover);
  }
}

export default BlockMusicPlayer;
