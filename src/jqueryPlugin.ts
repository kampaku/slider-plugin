import './style.css';
import jQuery from 'jquery';
import SuperSlider from './superSlider';
import $ from 'jquery';

(function ($) {
  $.fn.superSlider = function (settings) {
    return new SuperSlider(this, settings);
  };
})(jQuery);

