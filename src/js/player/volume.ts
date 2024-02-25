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
  constructor(opt: VolumeOption) {
    this.option = opt;
    this.bar = createDocumentEl("div");
    this.volumeLine = createDocumentEl("span", { classList: ["voice-bar-line"] });
    this.startY = 0;
    this.endY = 0;
    this.volumeValue = opt.volumeValue || 20;
    this.dom = this.createVoiceIcon();
    this.changeVolumeLine()
  }
  createVoiceIcon(): HTMLElement {
    const iconMap = {
      off: voiceOffIcon,
      low: voiceLowIcon,
      normal: voiceNormalIcon,
      max: voiceMaxIcon,
    };
    const voiceBox = createDocumentEl("div", { classList: ["voice-icon"] });
    const voiceIcon = createDocumentEl("img", {
      classList: ["music-control-icon"],
    });
    voiceIcon.src = iconMap.off;
    this.icon = voiceIcon;
    this.createVoiceBar();
    voiceBox.append(voiceIcon, this.bar);
    return voiceBox;
  }

  createVoiceBar() {
    this.bar.classList.add("voice-bar");
    this.bar.addEventListener("mousedown", (e) => {
      console.log(e)
      const dom = e.target as HTMLSpanElement;
      const { offsetY } = e;
      if (offsetY !== undefined) {
        this.volumeValue = (dom.clientHeight - offsetY) / dom.clientHeight;
        this.changeVolumeLine()
      }
      this.openDrop();
      this.startY = offsetY
    });
    console.log(this)
    this.bar.append(this.volumeLine);
  }
  openDrop() {
    this.bar.addEventListener("mousemove", (e) => {
      console.log(e.offsetY);
      this.endY = e.offsetY
      this.changeVolumeLine()
    });
  }
  changeVolumeLine () {
    console.log(this.volumeValue)
    this.volumeLine.style.transform = `translateY(-${this.volumeValue}%)`;
  }
}
