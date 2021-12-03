
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
  vertical: true
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

let plugin = document.querySelector('.wrapper1') as HTMLElement;
let plugin2 = document.querySelector('.wrapper2') as HTMLElement;
let plugin3 = document.querySelector('.wrapper3') as HTMLElement;
let plugin4 = document.querySelector('.wrapper4') as HTMLElement;
const slider = $('.slider1').superSlider(settings);
const slider2 = $('.slider2').superSlider(settings2);
const slider3 = $('.slider3').superSlider(settings3);
const slider4 = $('.slider4').superSlider(settings4);

new Panel(slider, plugin);
new Panel(slider2, plugin2);
new Panel(slider3, plugin3);
new Panel(slider4, plugin4);
