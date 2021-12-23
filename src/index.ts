import '../public/index.css';
import $ from 'jquery';
import './jqueryPlugin';
import Panel from './configuration-panel/panel';

const settings = {
  min: -10,
  max: 10,
  step: 1,
  from: 0,
  to: 8,
  range: true,
  tip: true,
  connect: true,
  scale: true,
};
const settings2 = {
  min: -10,
  max: 10,
  step: 1,
  from: 0,
  to: 8,
  range: true,
  tip: true,
  connect: false,
  scale: true,
  vertical: true,
};

const settings3 = {
  min: -10,
  max: 10,
  step: 2,
  from: 0,
  range: false,
  tip: true,
  connect: true,
  scale: false,
};

const settings4 = {
  min: 0,
  max: 100,
  step: 1,
  from: 55,
  range: false,
  tip: true,
  connect: false,
  scale: false,
};

const plugin = document.querySelector('.js-wrapper1') as HTMLElement;
const plugin2 = document.querySelector('.js-wrapper2') as HTMLElement;
const plugin3 = document.querySelector('.js-wrapper3') as HTMLElement;
const plugin4 = document.querySelector('.js-wrapper4') as HTMLElement;
const slider1Container = $('.js-slider1');
const slider2Container = $('.js-slider2');
const slider3Container = $('.js-slider3');
const slider4Container = $('.js-slider4');

const slider = slider1Container.superSlider(settings);
const slider2 = slider2Container.superSlider(settings2);
const slider3 = slider3Container.superSlider(settings3);
const slider4 = slider4Container.superSlider(settings4);

new Panel(slider, plugin);
new Panel(slider2, plugin2);
new Panel(slider3, plugin3);
new Panel(slider4, plugin4);

