import $ from 'jquery';

import '../public/index.scss';

import './jqueryPlugin';
import ConfigurationPanel from './configuration-panel/configuration-panel';

const settings = [
  {
    min: -10,
    max: 10,
  },
  {
    min: -10,
    max: 10,
    step: 1,
    from: 0,
    to: 8,
    range: true,
    tip: true,
    connect: false,
    scale: false,
    vertical: true,
  },
  {
    min: -10,
    max: 10,
    step: 2,
    from: 0,
    range: false,
    tip: true,
    connect: true,
    scale: false,
  },
  {
    min: 0,
    max: 100,
    step: 1,
    from: 55,
    range: false,
    tip: true,
    connect: false,
    scale: false,
  },
];

const plugins = document.querySelectorAll('.js-wrapper') as NodeListOf<HTMLElement>;
const sliders = document.querySelectorAll('.js-slider-container') as NodeListOf<HTMLElement>;

settings.forEach((setting, i) => {
  const slider = $(sliders[i]).superSlider(setting);
  const wrapper = plugins[i];
  new ConfigurationPanel(slider, wrapper);
});
