import voiceOffIcon from "@src/assets/voice_off.svg";
import voiceLowIcon from "@src/assets/voice_low.svg";
import voiceNormalIcon from "@src/assets/voice_normal.svg";
import voiceMaxIcon from "@src/assets/voice_max.svg";

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
    this.dom = this.createVoiceIcon();
    this.bar = document.createElement("div");
  }
  createVoiceIcon(): HTMLElement {
    const iconMap = {
      off: voiceOffIcon,
      low: voiceLowIcon,
      normal: voiceNormalIcon,
      max: voiceMaxIcon,
    };
    const voiceBox = document.createElement("div");
    voiceBox.classList.add("voice-icon");
    const voiceIcon = document.createElement("img");
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
