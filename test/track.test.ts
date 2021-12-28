import Track from '../src/slider/view/track';

describe('test track', () => {
  let track: Track;
  beforeEach(() => {
    track = new Track();
  })
  
  test('track to be defined', () => {
    expect(track).toBeDefined();
  })

  test('track element to be defined', () => {
    const trackEl = track.create(false)
    expect(trackEl).toBeDefined();
  })

  test('track vertical class', () => {
    const trackEl = track.create(true)
    expect(trackEl.classList.contains('track-vertical')).toBeTruthy();
  })

  test('track horisontal class', () => {
    const trackEl = track.create(false)
    expect(trackEl.classList.contains('track')).toBeTruthy();
  })
})