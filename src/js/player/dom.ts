import voiceOffIcon from '@src/assets/voice_off.svg'
import voiceLowIcon from '@src/assets/voice_low.svg'
import voiceNormalIcon from '@src/assets/voice_normal.svg'
import voiceMaxIcon from '@src/assets/voice_max.svg'
export function createVoiceIcon (): HTMLElement {
  const iconMap = {
    off: voiceOffIcon,
    low: voiceLowIcon,
    normal: voiceNormalIcon,
    max: voiceMaxIcon
  }
  const voiceIcon = document.createElement('img');
  voiceIcon.src = iconMap.off
  voiceIcon.classList.add('music-control-icon', 'voice-icon')
  return voiceIcon
}
