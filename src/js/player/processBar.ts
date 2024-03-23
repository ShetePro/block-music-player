import { createDocumentEl } from "@src/js/player/create";
import { transformSecond } from "@src/js/player/utils";
import MusicControl from "@src/js/player/control";

type ProcessBarOption = {
  audio: HTMLAudioElement;
  control: MusicControl;
};
export class ProcessBar {
  audio: HTMLAudioElement;
  dom: DocumentFragment;
  control: MusicControl;
  timer: number;

  constructor(opt: ProcessBarOption) {
    this.audio = opt.audio;
    this.dom = document.createDocumentFragment();
    this.control = opt.control;
    this.timer = 0;
  }
  createContainer() {
    const box = createDocumentEl("div", {
      classList: ["process-bar"],
      append: [this.setBar(), this.setMusicTime()],
    });

    this.dom.append(box);
    return this.dom;
  }
  setBar() {
    const line = createDocumentEl("div", { classList: ["bar-line"] });
    const fullLine = createDocumentEl("div", { classList: ["full-line"] });
    const wrap = createDocumentEl("div", { classList: ["wrap"], append: [fullLine] });
    const pointer = createDocumentEl("span", { classList: ["bar-pointer"] });
    line.append(wrap, pointer);
    const lineMoveEvent = (e: MouseEvent) => {
      if (e.offsetX !== undefined && e.target === wrap) {
        fullLine.setAttribute('style',  `transform:translateX(${e.offsetX}px);`)
      }
    };
    wrap.addEventListener("mouseenter", () => {
      wrap.addEventListener("mousemove", lineMoveEvent);
    });
    wrap.addEventListener("mouseleave", () => {
      wrap.removeEventListener("mouseover", lineMoveEvent);
      fullLine.setAttribute('style',  `transform:translateX(${0}px);`)
    });
    return line;
  }

  setMusicTime() {
    const time = createDocumentEl("div", {
      classList: ["music-time"],
    });
    this.audio.currentTime = 230;
    if (this.timer) return time;
    this.timer = setInterval(() => {
      const current = this.audio.currentTime;
      time.innerText = transformSecond(this.audio.duration - current);
      if (current === this.audio.duration) {
        console.log("播放完了 下一首");
        this.control.nextAudio();
        this.audio.play();
      }
    }, 1000);
    return time;
  }
}
