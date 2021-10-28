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
    from: 0,
    to: 8,
    range: true,
    tip: true,
    connect: true,
    scale: true,
  }
  
  // superSlider();
  
  let plugin = document.querySelector('.wrapper')
  const slider: Presenter = $('#root').superSlider(settings);
  let panel = new Panel(slider, '.wrapper');
  panel.renderPanel();
