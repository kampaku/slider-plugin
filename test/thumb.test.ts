import Thumb from '../src/view/thumb';
import * as events from 'events';

describe('test thumb', () => {
  let thumb: Thumb;

  beforeEach(() => {
    thumb = new Thumb();
  });

  test('thumb to be defined', () => {
    expect(thumb).toBeDefined();
  })

  test('test render', () => {
    thumb.render(false);
    expect(thumb.element).toBeTruthy();
  });

  test('thumb has horizontal class', () => {
    thumb.render(false);
    expect(thumb.element.classList.contains('thumb-horizontal')).toBeTruthy();
  });

  test('thumb has vertical class', () => {
    thumb.render(true);
    expect(thumb.element.classList.contains('thumb-vertical')).toBeTruthy();
  });

  test('move thumb', () => {
    thumb.render(false);
    thumb.move('left', '25%')
    expect(thumb.element.style.left).toBe('25%');
  })

  test('should have listener', () => {
    let mock = jest.fn()
    thumb.render(false);
    thumb.addListener(mock)

    expect(thumb.element.getAttribute('listener')).toBeTruthy();
  });
});
