import './style.css';
import $ from 'jquery';
// import superSlider from './superSlider';
import './superSlider';
import Panel from './configuration-panel/panel';
import type Presenter from './presenter/presenter';

const settings = {
  min: -10,
  max: 10,
  step: 1,
  from: -10,
  tip: true,
  connect: true,
  scale: true,
}

// superSlider();
const slider: Presenter = $('#root').superSlider();
slider.create(settings);
slider.setMin(-100);
slider.setMax(100);
let panel = new Panel(slider, '.wrapper')
panel.renderPanel();

