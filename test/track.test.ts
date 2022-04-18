import Events from '../src/helpers/Events';
import Track from '../src/slider/view/Track';

describe('test track', () => {
  let track: Track;
  const div = document.createElement('div');
  let callback = jest.fn();
  let settings = {
    min: 1,
    max: 5,
    step: 1,
    from: 2,
    to: 5,
    tip: true,
    connect: true,
    scale: true,
    vertical: false,
    range: false,
    valueArray: [1, 2, 3, 4, 5],
  };
  beforeEach(() => {
    track = new Track(callback, settings);
  })

  test('track to be defined', () => {
    expect(track).toBeDefined();
  })

  test('track element should be defined', () => {
    track.render(false, div);
    expect(track.element).toBeDefined();
  })

  test('track vertical class', () => {
    track.render(true, div);
    expect(track.element?.classList.contains('slider__track_type_vertical')).toBeTruthy();
  })

  test('track should have horizontal class', () => {
    track.render(false, div);
    expect(track.element?.classList.contains('slider__track')).toBeTruthy();
  })

  test('test click', () => {
    track.render(false, div);
    if(!track.element) return;
    const rect: DOMRect = {
      ...track.element.getBoundingClientRect(),
      left: 0,
      width: 100,
      height: 40
    }
    track.element.getBoundingClientRect = jest.fn(() => rect);
    const event = new MouseEvent('pointerdown', {
      clientX: 50,
      clientY: 10
    });
    track.element.dispatchEvent(event);
    expect(track.notify).toHaveBeenCalledWith(Events.moveFrom, { ...settings, from: 3 });
  })

  test('should click', () => {
    track.settings.to = 4
    track.settings.from = 2
    track.settings.range = true
    track.render(false, div);
    if(!track.element) return;
    const rect: DOMRect = {
      ...track.element.getBoundingClientRect(),
      left: 0,
      width: 100,
      height: 40
    }
    track.element.getBoundingClientRect = jest.fn(() => rect);
    const event = new MouseEvent('pointerdown', {
      clientX: 10,
      clientY: 0
    });
    track.element.dispatchEvent(event);
    expect(track.notify).toHaveBeenCalled();
  })

  test('should click', () => {
    track.settings.to = 2
    track.settings.from = 2
    track.settings.range = true
    track.render(false, div);
    if(!track.element) return;
    const rect: DOMRect = {
      ...track.element.getBoundingClientRect(),
      left: 0,
      width: 100,
      height: 40
    }
    track.element.getBoundingClientRect = jest.fn(() => rect);
    const event = new MouseEvent('pointerdown', {
      clientX: 10,
      clientY: 0
    });
    track.element.dispatchEvent(event);
    expect(track.notify).toHaveBeenCalled();
  })
})
