import Track from '../src/view/track';

describe('test track', () => {
  let track: Track
  beforeEach(() => {
    track = new Track()
  })
  
  test('track to be defined', () => {
    expect(track).toBeDefined();
  })

  test('track element to be defined', () => {
    track.render(false)
    expect(track.element).toBeDefined()
  })

  test('track vertical class', () => {
    track.render(true)
    expect(track.element.classList.contains('track-vertical')).toBeTruthy();
  })

  test('track horisontal class', () => {
    track.render(false)
    expect(track.element.classList.contains('track')).toBeTruthy();
  })
})