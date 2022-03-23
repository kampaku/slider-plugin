import Track from '../src/slider/view/Track';

describe('test track', () => {
  let track: Track;
  const div = document.createElement('div');
  let func = jest.fn();
  const settings = {
    min: 1,
    max: 5,
    step: 1,
    from: 0,
    to: 8,
    tip: true,
    connect: true,
    scale: true,
    vertical: false,
    range: true,
    valueArray: [1, 2, 3, 4, 5],
  };
  beforeEach(() => {
    track = new Track(func, settings);
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
    expect(track.element?.classList.contains('slider__track_type_vertical')).toBeTruthy();
  })

  test('track horizontal class', () => {
    track.render(false, div);
    expect(track.element?.classList.contains('slider__track')).toBeTruthy();
  })
})
