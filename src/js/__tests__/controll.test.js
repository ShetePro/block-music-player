import MusicControl from "../player/control.ts";

describe('music control test', () => {
  const control = new MusicControl(
    {
      play: false,
      index: 0,
      words: false,
    }
  )
  test('play music', () => {
    control.play()
    expect(control.state.play).toBe(true);
  });
  test('stop music', () => {
    control.stop()
    expect(control.state.play).toBe(false);
  });
})
