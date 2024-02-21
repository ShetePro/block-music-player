import voiceOffIcon from "@src/assets/voice_off.svg";
import voiceLowIcon from "@src/assets/voice_low.svg";
import voiceNormalIcon from "@src/assets/voice_normal.svg";
import voiceMaxIcon from "@src/assets/voice_max.svg";
import { createDocumentEl } from "@src/js/player/create";

type VolumeOption = {
  change: (value: number) => void;
};
export class CreateVolume {
  dom: HTMLElement;
  icon: HTMLImageElement | undefined;
  bar: HTMLElement;
  option: VolumeOption;
  constructor(opt: VolumeOption) {
    this.option = opt;
    this.bar = createDocumentEl("div");
    this.dom = this.createVoiceIcon();
  }
  createVoiceIcon(): HTMLElement {
    const iconMap = {
      off: voiceOffIcon,
      low: voiceLowIcon,
      normal: voiceNormalIcon,
      max: voiceMaxIcon,
    };
    const voiceBox = createDocumentEl("div", { classList: ["voice-icon"] });
    const voiceIcon = createDocumentEl("img", { classList: ["voice-icon"] });
    voiceIcon.src = iconMap.off;
    voiceIcon.classList.add("music-control-icon");
    this.icon = voiceIcon;
    this.createVoiceBar();
    voiceBox.append(voiceIcon, this.bar);
    return voiceBox;
  }

  createVoiceBar() {
    this.bar.classList.add("voice-bar");
  }
}
