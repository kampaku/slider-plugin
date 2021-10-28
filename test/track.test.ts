import Track from '../src/view/track';

describe('test track', () => {
  let track: Track;
  beforeEach(() => {
    track = new Track();
  })
  
  test('track to be defined', () => {
    expect(track).toBeDefined();
  })

  test('track element to be defined', () => {
    const trackEl = track.render(false)
    expect(trackEl).toBeDefined();
  })

  test('track vertical class', () => {
    const trackEl = track.render(true)
    expect(trackEl.classList.contains('track-vertical')).toBeTruthy();
  })

  test('track horisontal class', () => {
    const trackEl = track.render(false)
    expect(trackEl.classList.contains('track')).toBeTruthy();
  })
})