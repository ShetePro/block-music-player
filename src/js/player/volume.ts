import voiceOffIcon from "@src/assets/voice_off.svg";
import voiceLowIcon from "@src/assets/voice_low.svg";
import voiceNormalIcon from "@src/assets/voice_normal.svg";
import voiceMaxIcon from "@src/assets/voice_max.svg";
import { createDocumentEl } from "@src/js/player/create";

type VolumeOption = {
  change: (value: number) => void;
  audio: HTMLAudioElement | null;
  volumeValue?: number;
};
export class CreateVolume {
  dom: HTMLElement;
  icon: HTMLImageElement | undefined;
  bar: HTMLElement;
  volumeLine: HTMLSpanElement;
  option: VolumeOption;
  volumeValue: number;
  startY: number;
  endY: number;
  isOver: boolean;
  constructor(opt: VolumeOption) {
    this.option = opt;
    this.bar = createDocumentEl("div");
    this.volumeLine = createDocumentEl("span", {
      classList: ["voice-bar-line"],
    });
    this.isOver = true;
    this.startY = 0;
    this.endY = 0;
    this.volumeValue = opt.volumeValue || 20;
    this.dom = this.createVoiceIcon();
    this.changeVolumeLine();
    this.initIconEvent();
  }
  createVoiceIcon(): HTMLElement {
    const iconMap = {
      off: voiceOffIcon,
      low: voiceLowIcon,
      normal: voiceNormalIcon,
      max: voiceMaxIcon,
    };
    const voiceBox = createDocumentEl("div", { classList: ["voice-icon"] });
    this.icon = createDocumentEl("img", {
      classList: ["music-control-icon"],
    });
    this.icon.src = iconMap.off;
    this.createVoiceBar();
    voiceBox.append(this.icon, this.bar);
    return voiceBox;
  }
  initIconEvent() {
    this.icon?.addEventListener("mouseover", () => {
      this.isOver = false;
      this.bar.classList.add("bar-show");
    });
    this.dom?.addEventListener("mouseleave", () => {
      console.log("remove");
      this.isOver = true;
      if (!this.startY) {
        this.bar.classList.remove("bar-show");
      }
    });
  }
  createVoiceBar() {
    this.bar.classList.add("voice-bar");
    const moveChange = (e: MouseEvent) => {
      const dom = e.target as HTMLSpanElement;
      this.endY = e.offsetY;
      this.volumeValue = (1 - this.endY / dom.clientHeight) * 100;
      this.changeVolumeLine();
    };
    this.bar.addEventListener("mousedown", (e) => {
      const dom = e.target as HTMLSpanElement;
      const { offsetY } = e;
      if (offsetY !== undefined) {
        this.volumeValue = (1 - offsetY / dom.clientHeight) * 100;
        this.changeVolumeLine();
      }
      this.bar.addEventListener("mousemove", moveChange);
      this.startY = offsetY;
    });
    this.bar.addEventListener("mouseup", () => {
      this.startY = 0;
      this.endY = 0;
      this.bar.removeEventListener("mousemove", moveChange);
      if (this.isOver) {
        this.bar.classList.remove('bar-show')
      }
    });
    this.bar.append(this.volumeLine);
  }
  changeVolumeLine() {
    this.volumeLine.style.transform = `translateY(-${this.volumeValue}%)`;
  }
}
