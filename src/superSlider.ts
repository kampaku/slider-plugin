import './style.css';
import Model from './model/model';

import View from './view/view';
import Presenter from './presenter/presenter';
import jQuery from 'jquery';
import $ from 'jquery'; 

// const superSlider =()=>{
//   $.fn.superSlider = function() {
//     return new Presenter(new Model(), new View(this));
//   }
// }

// export default superSlider

;(function ($) {
  $.fn.superSlider = function(settings) {
    const view = new View(this);
    const model = new Model(settings);
    return new Presenter(model, view);
  }
})(jQuery)