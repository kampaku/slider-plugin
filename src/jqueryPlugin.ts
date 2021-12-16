import './style.css';
import jQuery from 'jquery';
import SuperSlider from './superSlider';

(function ($) {
  $.fn.superSlider = function (settings) {
    return new SuperSlider(this, settings);
  };
})(jQuery);

