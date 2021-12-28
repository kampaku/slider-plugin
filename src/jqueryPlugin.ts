import './slider/style.scss';
import jQuery from 'jquery';
import SuperSlider from './slider/superSlider';

(function ($) {
  $.fn.superSlider = function (settings) {
    return new SuperSlider(this, settings);
  };
})(jQuery);

