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
  pointer: HTMLSpanElement | undefined;
  wrap: HTMLDivElement | undefined;
  popover: HTMLDivElement;
  timer: number;
  progress: number;

  constructor(opt: ProcessBarOption) {
    this.audio = opt.audio;
    this.dom = document.createDocumentFragment();
    this.control = opt.control;
    this.timer = 0;
    this.progress = 0;
    this.popover = createDocumentEl("div", { classList: ["bar-popover"] });
  }
  createContainer() {
    const box = createDocumentEl("div", {
      classList: ["process-bar"],
      append: [this.setBar(), this.setMusicTime(), this.popover],
    });
    this.dom.append(box);
    return this.dom;
  }
  setBar() {
    const line = createDocumentEl("div", { classList: ["bar-line"] });
    const fullLine = createDocumentEl("div", { classList: ["full-line"] });
    const wrap = createDocumentEl("div", {
      classList: ["wrap"],
      append: [fullLine],
    });
    const pointer = createDocumentEl("span", { classList: ["bar-pointer"] });
    line.append(wrap, pointer);
    this.wrap = wrap;
    this.pointer = pointer;
    const lineMoveEvent = (e: MouseEvent) => {
      if (e.offsetX !== undefined && e.target === wrap) {
        fullLine.setAttribute("style", `transform:translateX(${e.offsetX}px);`);
        this.popover.setAttribute("style", `transform:translateX(${e.offsetX}px);`);
        const rate = e.offsetX / wrap.offsetWidth;
        this.popover.innerText = this.calcTimeByRate(rate);
      }
    };
    wrap.addEventListener("mouseenter", () => {
      console.log('event')
      wrap.addEventListener("mousemove", lineMoveEvent);
      this.popover.classList.add("popover-show");
    });
    wrap.addEventListener("mouseleave", () => {
      wrap.removeEventListener("mouseover", lineMoveEvent);
      fullLine.setAttribute("style", `transform:translateX(${0}px);`);
      this.popover.classList.remove("popover-show");
    });
    wrap.addEventListener("click", (e) => {
      const rate = e.offsetX / wrap.offsetWidth;
      this.audio.currentTime = this.audio.duration * rate;
      this.progressMove()
    });
    return line;
  }

  progressMove() {
    const current = this.audio.currentTime;
    const progressTime = this.audio.duration - current
    this.progress = 1 - (progressTime / this.audio.duration);
    const x = this.wrap ? this.progress * this.wrap.offsetWidth : 0;
    this.pointer?.setAttribute("style", `transform:translateX(${x}px);`);
  }

  setMusicTime() {
    const time = createDocumentEl("div", {
      classList: ["music-time"],
    });
    this.audio.currentTime = 230;
    if (this.timer) return time;
    this.timer = setInterval(() => {
      const current = this.audio.currentTime;
      const progressTime = this.audio.duration - current
      this.progressMove();
      time.innerText = transformSecond(progressTime);
      if (current === this.audio.duration) {
        console.log("播放完了 下一首");
        this.pointer?.setAttribute("style", `transform:translateX(0px);`);
        this.control.nextAudio();
        this.audio.play();
      }
    }, 1000);
    return time;
  }

  calcTimeByRate(rate: number) {
    const time = this.audio.duration * rate;
    return transformSecond(time);
  }
}
