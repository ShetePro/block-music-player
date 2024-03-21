import playIcon from "../../assets/play_icon.svg";
import stopIcon from "@src/assets/stop_icon.svg";
import MusicControl from "./control";
import { transformSecond } from "@src/js/player/utils";
import { createDocumentEl } from "@src/js/player/create";
import {ProcessBar} from "@src/js/player/processBar";
interface BlockMusicPlayerOption {
  container: HTMLElement | null;
  playerList?: AudioConfig[];
}

export type AudioConfig = {
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
  changeEvent: ((current: AudioConfig) => void)[];
  constructor(option: BlockMusicPlayerOption) {
    const that = this
    this.container = option.container;
    this.playerList = option.playerList || [];
    this.control = new MusicControl({
      container: this.container,
      playerList: this.playerList,
      play: false,
      index: this.playerIndex,
      words: false,
      audio: this.audio,
      renderEvent: () => {
        this.changeEvent.forEach((event) => {
          event(this.control.current);
        });
      },
    });
    this.changeEvent = [];
    this.initPlayer();
  }
  renderEvent() {
    console.log(this)

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
    const processBar = new ProcessBar({control: this.control, audio: this.audio})
    controlBox.append(
      playControl,
      this.control.voiceIcon,
      this.setMusicTitle(),
      processBar.createContainer(),
    );
    this.fragment.append(controlBox);
  }
  setMusicTitle() {
    const title = createDocumentEl("span", {
      classList: ["music-title"],
    });
    title.innerText = this.control.current.title;
    this.changeEvent.push((current) => {
      title.innerText = current.title;
    });
    return title;
  }
  renderAudio() {
    const audio = this.audio || document.createElement("audio");
    audio.src = this.control.current.url;
    this.changeEvent.push((current) => {
      audio.src = current.url;
    });
    this.fragment.append(audio);
    this.audio = audio;
  }

  renderCover() {
    const cover = createDocumentEl("div", { classList: ["music-cover"] });
    const coverImg = createDocumentEl("img", {
      classList: ["music-cover-img"],
    });
    coverImg.src = this.control.current.cover;
    this.changeEvent.push((current) => {
      coverImg.src = current.cover;
    });
    cover.append(coverImg);
    this.fragment.append(cover);
  }
}

export default BlockMusicPlayer;
