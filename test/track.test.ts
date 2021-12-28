import Track from '../src/slider/view/Track';

describe('test track', () => {
  let track: Track;
  const div = document.createElement('div');
  beforeEach(() => {
    track = new Track();
  })
  
  test('track to be defined', () => {
    expect(track).toBeDefined();
  })

  test('track element to be defined', () => {
    track.render(false, div);
    expect(track.element).toBeDefined();
  })

  test('track vertical class', () => {
    track.render(true, div);
    expect(track.element?.classList.contains('slider__track_vertical')).toBeTruthy();
  })

  test('track horisontal class', () => {
    track.render(false, div);
    expect(track.element?.classList.contains('slider__track')).toBeTruthy();
  })
})