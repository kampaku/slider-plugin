import jQuery from 'jquery';

import SuperSlider from './slider/SuperSlider';
import './slider/style.scss';

(function ($) {
  $.fn.superSlider = function (settings) {
    return new SuperSlider(this, settings);
  };
})(jQuery);

