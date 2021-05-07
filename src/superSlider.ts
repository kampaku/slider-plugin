import './style.css';
import Model from './model/model';
import View from './view/view';
import Presenter from './presenter/presenter';
import $ from 'jquery';

const superSlider =()=>{
$.fn.superSlider = function() {
  return new Presenter(new Model(), new View(this));
}

}

export default superSlider