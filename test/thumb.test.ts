import Thumb from '../src/view/thumb';
import { Events } from '../src/helpers/Events';
import type { SettingsInterface } from '../src/helpers/SettingsInterface';
import Model from '../src/model/model';
describe('test thumb', () => {
  let thumb: Thumb;
  const settings = {
    min: 1,
    max: 5,
    step: 1,
    from: 1,
    to: 5,
    range: true,
    tip: true,
    connect: true,
    scale: true,
    vertical: false,
    valueArray: [1, 2, 3, 4, 5]
  }
  const model = new Model(settings)
  function handleThumbFromMove(eventName: Events, settings: SettingsInterface) {
    if (eventName !== Events.moveFrom) return;
    const { from } = settings;
    model.setFrom(from);
  }
  beforeEach(() => {
    thumb = new Thumb(handleThumbFromMove, settings);
  });

  test('thumb to be defined', () => {
    expect(thumb).toBeDefined();
  })

  test('test render', () => {
    const thumbEl = thumb.createElement(false);
    expect(thumbEl).toBeTruthy();
  });

  test('thumb has horizontal class', () => {
    const thumbEl = thumb.createElement(false);
    expect(thumbEl.classList.contains('thumb-horizontal')).toBeTruthy();
  });

  test('thumb has vertical class', () => {
    const thumbEl = thumb.createElement(true);
    expect(thumbEl.classList.contains('thumb-vertical')).toBeTruthy();
  });

  test('move thumb without parent', () => {
    const thumbEl = thumb.createElement(false);
    thumb.move(0);
    expect(thumbEl.style.left).toBeFalsy();
  })

  test('move thumb', () => {
    const parent = document.createElement('div');
    document.body.append(parent);
    parent.style.width = '500px';
    parent.style.height = '100px';
    const thumbEl = thumb.createElement(false);
    parent.append(thumbEl);
    thumb.move(3);
    expect(thumbEl.style.left).toBe('0%');
  })
});
