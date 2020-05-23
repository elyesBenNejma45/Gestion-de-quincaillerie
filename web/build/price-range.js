(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["price-range"],{

/***/ "./assets/css/price-range.css":
/*!************************************!*\
  !*** ./assets/css/price-range.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./assets/js/price-range.js":
/*!**********************************!*\
  !*** ./assets/js/price-range.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* =========================================================
 * bootstrap-slider.js v2.0.0
 * http://www.eyecon.ro/bootstrap-slider
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
__webpack_require__(/*! ../css/price-range.css */ "./assets/css/price-range.css");

!function ($) {
  var Slider = function Slider(element, options) {
    this.element = $(element);
    this.picker = $('<div class="slider">' + '<div class="slider-track">' + '<div class="slider-selection"></div>' + '<div class="slider-handle"></div>' + '<div class="slider-handle"></div>' + '</div>' + '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' + '</div>').insertBefore(this.element).append(this.element);
    this.id = this.element.data('slider-id') || options.id;

    if (this.id) {
      this.picker[0].id = this.id;
    }

    if (typeof Modernizr !== 'undefined' && Modernizr.touch) {
      this.touchCapable = true;
    }

    var tooltip = this.element.data('slider-tooltip') || options.tooltip;
    this.tooltip = this.picker.find('.tooltip');
    this.tooltipInner = this.tooltip.find('div.tooltip-inner');
    this.orientation = this.element.data('slider-orientation') || options.orientation;

    switch (this.orientation) {
      case 'vertical':
        this.picker.addClass('slider-vertical');
        this.stylePos = 'top';
        this.mousePos = 'pageY';
        this.sizePos = 'offsetHeight';
        this.tooltip.addClass('right')[0].style.left = '100%';
        break;

      default:
        this.picker.addClass('slider-horizontal').css('width', this.element.outerWidth());
        this.orientation = 'horizontal';
        this.stylePos = 'left';
        this.mousePos = 'pageX';
        this.sizePos = 'offsetWidth';
        this.tooltip.addClass('top')[0].style.top = -this.tooltip.outerHeight() - 14 + 'px';
        break;
    }

    this.min = this.element.data('slider-min') || options.min;
    this.max = this.element.data('slider-max') || options.max;
    this.step = this.element.data('slider-step') || options.step;
    this.value = this.element.data('slider-value') || options.value;

    if (this.value[1]) {
      this.range = true;
    }

    this.selection = this.element.data('slider-selection') || options.selection;
    this.selectionEl = this.picker.find('.slider-selection');

    if (this.selection === 'none') {
      this.selectionEl.addClass('hide');
    }

    this.selectionElStyle = this.selectionEl[0].style;
    this.handle1 = this.picker.find('.slider-handle:first');
    this.handle1Stype = this.handle1[0].style;
    this.handle2 = this.picker.find('.slider-handle:last');
    this.handle2Stype = this.handle2[0].style;
    var handle = this.element.data('slider-handle') || options.handle;

    switch (handle) {
      case 'round':
        this.handle1.addClass('round left-round');
        this.handle2.addClass('round');
        break;

      case 'triangle':
        this.handle1.addClass('triangle');
        this.handle2.addClass('triangle');
        break;
    }

    if (this.range) {
      this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0]));
      this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]));
    } else {
      this.value = [Math.max(this.min, Math.min(this.max, this.value))];
      this.handle2.addClass('hide');

      if (this.selection == 'after') {
        this.value[1] = this.max;
      } else {
        this.value[1] = this.min;
      }
    }

    this.diff = this.max - this.min;
    this.percentage = [(this.value[0] - this.min) * 100 / this.diff, (this.value[1] - this.min) * 100 / this.diff, this.step * 100 / this.diff];
    this.offset = this.picker.offset();
    this.size = this.picker[0][this.sizePos];
    this.formater = options.formater;
    this.layout();

    if (this.touchCapable) {
      // Touch: Bind touch events:
      this.picker.on({
        touchstart: $.proxy(this.mousedown, this)
      });
    } else {
      this.picker.on({
        mousedown: $.proxy(this.mousedown, this)
      });
    }

    if (tooltip === 'show') {
      this.picker.on({
        mouseenter: $.proxy(this.showTooltip, this),
        mouseleave: $.proxy(this.hideTooltip, this)
      });
    } else {
      this.tooltip.addClass('hide');
    }
  };

  Slider.prototype = {
    constructor: Slider,
    over: false,
    inDrag: false,
    showTooltip: function showTooltip() {
      this.tooltip.addClass('in'); //var left = Math.round(this.percent*this.width);
      //this.tooltip.css('left', left - this.tooltip.outerWidth()/2);

      this.over = true;
    },
    hideTooltip: function hideTooltip() {
      if (this.inDrag === false) {
        this.tooltip.removeClass('in');
      }

      this.over = false;
    },
    layout: function layout() {
      this.handle1Stype[this.stylePos] = this.percentage[0] + '%';
      this.handle2Stype[this.stylePos] = this.percentage[1] + '%';

      if (this.orientation == 'vertical') {
        this.selectionElStyle.top = Math.min(this.percentage[0], this.percentage[1]) + '%';
        this.selectionElStyle.height = Math.abs(this.percentage[0] - this.percentage[1]) + '%';
      } else {
        this.selectionElStyle.left = Math.min(this.percentage[0], this.percentage[1]) + '%';
        this.selectionElStyle.width = Math.abs(this.percentage[0] - this.percentage[1]) + '%';
      }

      if (this.range) {
        this.tooltipInner.text(this.formater(this.value[0]) + ' : ' + this.formater(this.value[1]));
        this.tooltip[0].style[this.stylePos] = this.size * (this.percentage[0] + (this.percentage[1] - this.percentage[0]) / 2) / 100 - (this.orientation === 'vertical' ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + 'px';
      } else {
        this.tooltipInner.text(this.formater(this.value[0]));
        this.tooltip[0].style[this.stylePos] = this.size * this.percentage[0] / 100 - (this.orientation === 'vertical' ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + 'px';
      }
    },
    mousedown: function mousedown(ev) {
      // Touch: Get the original event:
      if (this.touchCapable && ev.type === 'touchstart') {
        ev = ev.originalEvent;
      }

      this.offset = this.picker.offset();
      this.size = this.picker[0][this.sizePos];
      var percentage = this.getPercentage(ev);

      if (this.range) {
        var diff1 = Math.abs(this.percentage[0] - percentage);
        var diff2 = Math.abs(this.percentage[1] - percentage);
        this.dragged = diff1 < diff2 ? 0 : 1;
      } else {
        this.dragged = 0;
      }

      this.percentage[this.dragged] = percentage;
      this.layout();

      if (this.touchCapable) {
        // Touch: Bind touch events:
        $(document).on({
          touchmove: $.proxy(this.mousemove, this),
          touchend: $.proxy(this.mouseup, this)
        });
      } else {
        $(document).on({
          mousemove: $.proxy(this.mousemove, this),
          mouseup: $.proxy(this.mouseup, this)
        });
      }

      this.inDrag = true;
      var val = this.calculateValue();
      this.element.trigger({
        type: 'slideStart',
        value: val
      }).trigger({
        type: 'slide',
        value: val
      });
      return false;
    },
    mousemove: function mousemove(ev) {
      // Touch: Get the original event:
      if (this.touchCapable && ev.type === 'touchmove') {
        ev = ev.originalEvent;
      }

      var percentage = this.getPercentage(ev);

      if (this.range) {
        if (this.dragged === 0 && this.percentage[1] < percentage) {
          this.percentage[0] = this.percentage[1];
          this.dragged = 1;
        } else if (this.dragged === 1 && this.percentage[0] > percentage) {
          this.percentage[1] = this.percentage[0];
          this.dragged = 0;
        }
      }

      this.percentage[this.dragged] = percentage;
      this.layout();
      var val = this.calculateValue();
      this.element.trigger({
        type: 'slide',
        value: val
      }).data('value', val).prop('value', val);
      return false;
    },
    mouseup: function mouseup(ev) {
      if (this.touchCapable) {
        // Touch: Bind touch events:
        $(document).off({
          touchmove: this.mousemove,
          touchend: this.mouseup
        });
      } else {
        $(document).off({
          mousemove: this.mousemove,
          mouseup: this.mouseup
        });
      }

      this.inDrag = false;

      if (this.over == false) {
        this.hideTooltip();
      }

      this.element;
      var val = this.calculateValue();
      this.element.trigger({
        type: 'slideStop',
        value: val
      }).data('value', val).prop('value', val);
      return false;
    },
    calculateValue: function calculateValue() {
      var val;

      if (this.range) {
        val = [this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step, this.min + Math.round(this.diff * this.percentage[1] / 100 / this.step) * this.step];
        this.value = val;
      } else {
        val = this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step;
        this.value = [val, this.value[1]];
      }

      return val;
    },
    getPercentage: function getPercentage(ev) {
      if (this.touchCapable) {
        ev = ev.touches[0];
      }

      var percentage = (ev[this.mousePos] - this.offset[this.stylePos]) * 100 / this.size;
      percentage = Math.round(percentage / this.percentage[2]) * this.percentage[2];
      return Math.max(0, Math.min(100, percentage));
    },
    getValue: function getValue() {
      if (this.range) {
        return this.value;
      }

      return this.value[0];
    },
    setValue: function setValue(val) {
      this.value = val;

      if (this.range) {
        this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0]));
        this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]));
      } else {
        this.value = [Math.max(this.min, Math.min(this.max, this.value))];
        this.handle2.addClass('hide');

        if (this.selection == 'after') {
          this.value[1] = this.max;
        } else {
          this.value[1] = this.min;
        }
      }

      this.diff = this.max - this.min;
      this.percentage = [(this.value[0] - this.min) * 100 / this.diff, (this.value[1] - this.min) * 100 / this.diff, this.step * 100 / this.diff];
      this.layout();
    }
  };

  $.fn.slider = function (option, val) {
    return this.each(function () {
      var $this = $(this),
          data = $this.data('slider'),
          options = _typeof(option) === 'object' && option;

      if (!data) {
        $this.data('slider', data = new Slider(this, $.extend({}, $.fn.slider.defaults, options)));
      }

      if (typeof option == 'string') {
        data[option](val);
      }
    });
  };

  $.fn.slider.defaults = {
    min: 0,
    max: 10,
    step: 1,
    orientation: 'horizontal',
    value: 5,
    selection: 'before',
    tooltip: 'show',
    handle: 'round',
    formater: function formater(value) {
      return value;
    }
  };
  $.fn.slider.Constructor = Slider;
}(window.jQuery);

/***/ })

},[["./assets/js/price-range.js","runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvY3NzL3ByaWNlLXJhbmdlLmNzcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcHJpY2UtcmFuZ2UuanMiXSwibmFtZXMiOlsicmVxdWlyZSIsIiQiLCJTbGlkZXIiLCJlbGVtZW50Iiwib3B0aW9ucyIsInBpY2tlciIsImluc2VydEJlZm9yZSIsImFwcGVuZCIsImlkIiwiZGF0YSIsIk1vZGVybml6ciIsInRvdWNoIiwidG91Y2hDYXBhYmxlIiwidG9vbHRpcCIsImZpbmQiLCJ0b29sdGlwSW5uZXIiLCJvcmllbnRhdGlvbiIsImFkZENsYXNzIiwic3R5bGVQb3MiLCJtb3VzZVBvcyIsInNpemVQb3MiLCJzdHlsZSIsImxlZnQiLCJjc3MiLCJvdXRlcldpZHRoIiwidG9wIiwib3V0ZXJIZWlnaHQiLCJtaW4iLCJtYXgiLCJzdGVwIiwidmFsdWUiLCJyYW5nZSIsInNlbGVjdGlvbiIsInNlbGVjdGlvbkVsIiwic2VsZWN0aW9uRWxTdHlsZSIsImhhbmRsZTEiLCJoYW5kbGUxU3R5cGUiLCJoYW5kbGUyIiwiaGFuZGxlMlN0eXBlIiwiaGFuZGxlIiwiTWF0aCIsImRpZmYiLCJwZXJjZW50YWdlIiwib2Zmc2V0Iiwic2l6ZSIsImZvcm1hdGVyIiwibGF5b3V0Iiwib24iLCJ0b3VjaHN0YXJ0IiwicHJveHkiLCJtb3VzZWRvd24iLCJtb3VzZWVudGVyIiwic2hvd1Rvb2x0aXAiLCJtb3VzZWxlYXZlIiwiaGlkZVRvb2x0aXAiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsIm92ZXIiLCJpbkRyYWciLCJyZW1vdmVDbGFzcyIsImhlaWdodCIsImFicyIsIndpZHRoIiwidGV4dCIsImV2IiwidHlwZSIsIm9yaWdpbmFsRXZlbnQiLCJnZXRQZXJjZW50YWdlIiwiZGlmZjEiLCJkaWZmMiIsImRyYWdnZWQiLCJkb2N1bWVudCIsInRvdWNobW92ZSIsIm1vdXNlbW92ZSIsInRvdWNoZW5kIiwibW91c2V1cCIsInZhbCIsImNhbGN1bGF0ZVZhbHVlIiwidHJpZ2dlciIsInByb3AiLCJvZmYiLCJyb3VuZCIsInRvdWNoZXMiLCJnZXRWYWx1ZSIsInNldFZhbHVlIiwiZm4iLCJzbGlkZXIiLCJvcHRpb24iLCJlYWNoIiwiJHRoaXMiLCJleHRlbmQiLCJkZWZhdWx0cyIsIkNvbnN0cnVjdG9yIiwid2luZG93IiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx1Qzs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkNBLG1CQUFPLENBQUMsNERBQUQsQ0FBUDs7QUFDRCxDQUFDLFVBQVVDLENBQVYsRUFBYztBQUVkLE1BQUlDLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQVNDLE9BQVQsRUFBa0JDLE9BQWxCLEVBQTJCO0FBQ3ZDLFNBQUtELE9BQUwsR0FBZUYsQ0FBQyxDQUFDRSxPQUFELENBQWhCO0FBQ0EsU0FBS0UsTUFBTCxHQUFjSixDQUFDLENBQUMseUJBQ1gsNEJBRFcsR0FFVixzQ0FGVSxHQUdWLG1DQUhVLEdBSVYsbUNBSlUsR0FLWCxRQUxXLEdBTVgsK0ZBTlcsR0FPWixRQVBXLENBQUQsQ0FRUkssWUFSUSxDQVFLLEtBQUtILE9BUlYsRUFTUkksTUFUUSxDQVNELEtBQUtKLE9BVEosQ0FBZDtBQVVBLFNBQUtLLEVBQUwsR0FBVSxLQUFLTCxPQUFMLENBQWFNLElBQWIsQ0FBa0IsV0FBbEIsS0FBZ0NMLE9BQU8sQ0FBQ0ksRUFBbEQ7O0FBQ0EsUUFBSSxLQUFLQSxFQUFULEVBQWE7QUFDWixXQUFLSCxNQUFMLENBQVksQ0FBWixFQUFlRyxFQUFmLEdBQW9CLEtBQUtBLEVBQXpCO0FBQ0E7O0FBRUQsUUFBSSxPQUFPRSxTQUFQLEtBQXFCLFdBQXJCLElBQW9DQSxTQUFTLENBQUNDLEtBQWxELEVBQXlEO0FBQ3hELFdBQUtDLFlBQUwsR0FBb0IsSUFBcEI7QUFDQTs7QUFFRCxRQUFJQyxPQUFPLEdBQUcsS0FBS1YsT0FBTCxDQUFhTSxJQUFiLENBQWtCLGdCQUFsQixLQUFxQ0wsT0FBTyxDQUFD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QUFFLFFBTlc7QUFPdEJuQixXQUFPLEVBQUUsTUFQYTtBQVF0QjBCLFVBQU0sRUFBRSxPQVJjO0FBU3RCTSxZQUFRLEVBQUUsa0JBQVNmLEtBQVQsRUFBZ0I7QUFDekIsYUFBT0EsS0FBUDtBQUNBO0FBWHFCLEdBQXZCO0FBY0E3QixHQUFDLENBQUNvRixFQUFGLENBQUtDLE1BQUwsQ0FBWU0sV0FBWixHQUEwQjFGLE1BQTFCO0FBRUEsQ0FoWEEsQ0FnWEUyRixNQUFNLENBQUNDLE1BaFhULENBQUQsQyIsImZpbGUiOiJwcmljZS1yYW5nZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiBib290c3RyYXAtc2xpZGVyLmpzIHYyLjAuMFxyXG4gKiBodHRwOi8vd3d3LmV5ZWNvbi5yby9ib290c3RyYXAtc2xpZGVyXHJcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gKiBDb3B5cmlnaHQgMjAxMiBTdGVmYW4gUGV0cmVcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbiByZXF1aXJlKFwiLi4vY3NzL3ByaWNlLXJhbmdlLmNzc1wiKTtcclxuIWZ1bmN0aW9uKCAkICkge1xyXG5cclxuXHR2YXIgU2xpZGVyID0gZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuXHRcdHRoaXMucGlja2VyID0gJCgnPGRpdiBjbGFzcz1cInNsaWRlclwiPicrXHJcblx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJzbGlkZXItdHJhY2tcIj4nK1xyXG5cdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJzbGlkZXItc2VsZWN0aW9uXCI+PC9kaXY+JytcclxuXHRcdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwic2xpZGVyLWhhbmRsZVwiPjwvZGl2PicrXHJcblx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInNsaWRlci1oYW5kbGVcIj48L2Rpdj4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8L2Rpdj4nK1xyXG5cdFx0XHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwidG9vbHRpcFwiPjxkaXYgY2xhc3M9XCJ0b29sdGlwLWFycm93XCI+PC9kaXY+PGRpdiBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj48L2Rpdj48L2Rpdj4nK1xyXG5cdFx0XHRcdFx0XHQnPC9kaXY+JylcclxuXHRcdFx0XHRcdFx0XHQuaW5zZXJ0QmVmb3JlKHRoaXMuZWxlbWVudClcclxuXHRcdFx0XHRcdFx0XHQuYXBwZW5kKHRoaXMuZWxlbWVudCk7XHJcblx0XHR0aGlzLmlkID0gdGhpcy5lbGVtZW50LmRhdGEoJ3NsaWRlci1pZCcpfHxvcHRpb25zLmlkO1xyXG5cdFx0aWYgKHRoaXMuaWQpIHtcclxuXHRcdFx0dGhpcy5waWNrZXJbMF0uaWQgPSB0aGlzLmlkO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgTW9kZXJuaXpyICE9PSAndW5kZWZpbmVkJyAmJiBNb2Rlcm5penIudG91Y2gpIHtcclxuXHRcdFx0dGhpcy50b3VjaENhcGFibGUgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB0b29sdGlwID0gdGhpcy5lbGVtZW50LmRhdGEoJ3NsaWRlci10b29sdGlwJyl8fG9wdGlvbnMudG9vbHRpcDtcclxuXHJcblx0XHR0aGlzLnRvb2x0aXAgPSB0aGlzLnBpY2tlci5maW5kKCcudG9vbHRpcCcpO1xyXG5cdFx0dGhpcy50b29sdGlwSW5uZXIgPSB0aGlzLnRvb2x0aXAuZmluZCgnZGl2LnRvb2x0aXAtaW5uZXInKTtcclxuXHJcblx0XHR0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5lbGVtZW50LmRhdGEoJ3NsaWRlci1vcmllbnRhdGlvbicpfHxvcHRpb25zLm9yaWVudGF0aW9uO1xyXG5cdFx0c3dpdGNoKHRoaXMub3JpZW50YXRpb24pIHtcclxuXHRcdFx0Y2FzZSAndmVydGljYWwnOlxyXG5cdFx0XHRcdHRoaXMucGlja2VyLmFkZENsYXNzKCdzbGlkZXItdmVydGljYWwnKTtcclxuXHRcdFx0XHR0aGlzLnN0eWxlUG9zID0gJ3RvcCc7XHJcblx0XHRcdFx0dGhpcy5tb3VzZVBvcyA9ICdwYWdlWSc7XHJcblx0XHRcdFx0dGhpcy5zaXplUG9zID0gJ29mZnNldEhlaWdodCc7XHJcblx0XHRcdFx0dGhpcy50b29sdGlwLmFkZENsYXNzKCdyaWdodCcpWzBdLnN0eWxlLmxlZnQgPSAnMTAwJSc7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dGhpcy5waWNrZXJcclxuXHRcdFx0XHRcdC5hZGRDbGFzcygnc2xpZGVyLWhvcml6b250YWwnKVxyXG5cdFx0XHRcdFx0LmNzcygnd2lkdGgnLCB0aGlzLmVsZW1lbnQub3V0ZXJXaWR0aCgpKTtcclxuXHRcdFx0XHR0aGlzLm9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xyXG5cdFx0XHRcdHRoaXMuc3R5bGVQb3MgPSAnbGVmdCc7XHJcblx0XHRcdFx0dGhpcy5tb3VzZVBvcyA9ICdwYWdlWCc7XHJcblx0XHRcdFx0dGhpcy5zaXplUG9zID0gJ29mZnNldFdpZHRoJztcclxuXHRcdFx0XHR0aGlzLnRvb2x0aXAuYWRkQ2xhc3MoJ3RvcCcpWzBdLnN0eWxlLnRvcCA9IC10aGlzLnRvb2x0aXAub3V0ZXJIZWlnaHQoKSAtIDE0ICsgJ3B4JztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLm1pbiA9IHRoaXMuZWxlbWVudC5kYXRhKCdzbGlkZXItbWluJyl8fG9wdGlvbnMubWluO1xyXG5cdFx0dGhpcy5tYXggPSB0aGlzLmVsZW1lbnQuZGF0YSgnc2xpZGVyLW1heCcpfHxvcHRpb25zLm1heDtcclxuXHRcdHRoaXMuc3RlcCA9IHRoaXMuZWxlbWVudC5kYXRhKCdzbGlkZXItc3RlcCcpfHxvcHRpb25zLnN0ZXA7XHJcblx0XHR0aGlzLnZhbHVlID0gdGhpcy5lbGVtZW50LmRhdGEoJ3NsaWRlci12YWx1ZScpfHxvcHRpb25zLnZhbHVlO1xyXG5cdFx0aWYgKHRoaXMudmFsdWVbMV0pIHtcclxuXHRcdFx0dGhpcy5yYW5nZSA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5zZWxlY3Rpb24gPSB0aGlzLmVsZW1lbnQuZGF0YSgnc2xpZGVyLXNlbGVjdGlvbicpfHxvcHRpb25zLnNlbGVjdGlvbjtcclxuXHRcdHRoaXMuc2VsZWN0aW9uRWwgPSB0aGlzLnBpY2tlci5maW5kKCcuc2xpZGVyLXNlbGVjdGlvbicpO1xyXG5cdFx0aWYgKHRoaXMuc2VsZWN0aW9uID09PSAnbm9uZScpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3Rpb25FbC5hZGRDbGFzcygnaGlkZScpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zZWxlY3Rpb25FbFN0eWxlID0gdGhpcy5zZWxlY3Rpb25FbFswXS5zdHlsZTtcclxuXHJcblxyXG5cdFx0dGhpcy5oYW5kbGUxID0gdGhpcy5waWNrZXIuZmluZCgnLnNsaWRlci1oYW5kbGU6Zmlyc3QnKTtcclxuXHRcdHRoaXMuaGFuZGxlMVN0eXBlID0gdGhpcy5oYW5kbGUxWzBdLnN0eWxlO1xyXG5cdFx0dGhpcy5oYW5kbGUyID0gdGhpcy5waWNrZXIuZmluZCgnLnNsaWRlci1oYW5kbGU6bGFzdCcpO1xyXG5cdFx0dGhpcy5oYW5kbGUyU3R5cGUgPSB0aGlzLmhhbmRsZTJbMF0uc3R5bGU7XHJcblxyXG5cdFx0dmFyIGhhbmRsZSA9IHRoaXMuZWxlbWVudC5kYXRhKCdzbGlkZXItaGFuZGxlJyl8fG9wdGlvbnMuaGFuZGxlO1xyXG5cdFx0c3dpdGNoKGhhbmRsZSkge1xyXG5cdFx0XHRjYXNlICdyb3VuZCc6XHJcblx0XHRcdFx0dGhpcy5oYW5kbGUxLmFkZENsYXNzKCdyb3VuZCBsZWZ0LXJvdW5kJyk7XHJcblx0XHRcdFx0dGhpcy5oYW5kbGUyLmFkZENsYXNzKCdyb3VuZCcpO1xyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgJ3RyaWFuZ2xlJzpcclxuXHRcdFx0XHR0aGlzLmhhbmRsZTEuYWRkQ2xhc3MoJ3RyaWFuZ2xlJyk7XHJcblx0XHRcdFx0dGhpcy5oYW5kbGUyLmFkZENsYXNzKCd0cmlhbmdsZScpO1xyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMucmFuZ2UpIHtcclxuXHRcdFx0dGhpcy52YWx1ZVswXSA9IE1hdGgubWF4KHRoaXMubWluLCBNYXRoLm1pbih0aGlzLm1heCwgdGhpcy52YWx1ZVswXSkpO1xyXG5cdFx0XHR0aGlzLnZhbHVlWzFdID0gTWF0aC5tYXgodGhpcy5taW4sIE1hdGgubWluKHRoaXMubWF4LCB0aGlzLnZhbHVlWzFdKSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnZhbHVlID0gWyBNYXRoLm1heCh0aGlzLm1pbiwgTWF0aC5taW4odGhpcy5tYXgsIHRoaXMudmFsdWUpKV07XHJcblx0XHRcdHRoaXMuaGFuZGxlMi5hZGRDbGFzcygnaGlkZScpO1xyXG5cdFx0XHRpZiAodGhpcy5zZWxlY3Rpb24gPT0gJ2FmdGVyJykge1xyXG5cdFx0XHRcdHRoaXMudmFsdWVbMV0gPSB0aGlzLm1heDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnZhbHVlWzFdID0gdGhpcy5taW47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHRoaXMuZGlmZiA9IHRoaXMubWF4IC0gdGhpcy5taW47XHJcblx0XHR0aGlzLnBlcmNlbnRhZ2UgPSBbXHJcblx0XHRcdCh0aGlzLnZhbHVlWzBdLXRoaXMubWluKSoxMDAvdGhpcy5kaWZmLFxyXG5cdFx0XHQodGhpcy52YWx1ZVsxXS10aGlzLm1pbikqMTAwL3RoaXMuZGlmZixcclxuXHRcdFx0dGhpcy5zdGVwKjEwMC90aGlzLmRpZmZcclxuXHRcdF07XHJcblxyXG5cdFx0dGhpcy5vZmZzZXQgPSB0aGlzLnBpY2tlci5vZmZzZXQoKTtcclxuXHRcdHRoaXMuc2l6ZSA9IHRoaXMucGlja2VyWzBdW3RoaXMuc2l6ZVBvc107XHJcblxyXG5cdFx0dGhpcy5mb3JtYXRlciA9IG9wdGlvbnMuZm9ybWF0ZXI7XHJcblxyXG5cdFx0dGhpcy5sYXlvdXQoKTtcclxuXHJcblx0XHRpZiAodGhpcy50b3VjaENhcGFibGUpIHtcclxuXHRcdFx0Ly8gVG91Y2g6IEJpbmQgdG91Y2ggZXZlbnRzOlxyXG5cdFx0XHR0aGlzLnBpY2tlci5vbih7XHJcblx0XHRcdFx0dG91Y2hzdGFydDogJC5wcm94eSh0aGlzLm1vdXNlZG93biwgdGhpcylcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnBpY2tlci5vbih7XHJcblx0XHRcdFx0bW91c2Vkb3duOiAkLnByb3h5KHRoaXMubW91c2Vkb3duLCB0aGlzKVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodG9vbHRpcCA9PT0gJ3Nob3cnKSB7XHJcblx0XHRcdHRoaXMucGlja2VyLm9uKHtcclxuXHRcdFx0XHRtb3VzZWVudGVyOiAkLnByb3h5KHRoaXMuc2hvd1Rvb2x0aXAsIHRoaXMpLFxyXG5cdFx0XHRcdG1vdXNlbGVhdmU6ICQucHJveHkodGhpcy5oaWRlVG9vbHRpcCwgdGhpcylcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnRvb2x0aXAuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRTbGlkZXIucHJvdG90eXBlID0ge1xyXG5cdFx0Y29uc3RydWN0b3I6IFNsaWRlcixcclxuXHJcblx0XHRvdmVyOiBmYWxzZSxcclxuXHRcdGluRHJhZzogZmFsc2UsXHJcblx0XHRcclxuXHRcdHNob3dUb29sdGlwOiBmdW5jdGlvbigpe1xyXG5cdFx0XHR0aGlzLnRvb2x0aXAuYWRkQ2xhc3MoJ2luJyk7XHJcblx0XHRcdC8vdmFyIGxlZnQgPSBNYXRoLnJvdW5kKHRoaXMucGVyY2VudCp0aGlzLndpZHRoKTtcclxuXHRcdFx0Ly90aGlzLnRvb2x0aXAuY3NzKCdsZWZ0JywgbGVmdCAtIHRoaXMudG9vbHRpcC5vdXRlcldpZHRoKCkvMik7XHJcblx0XHRcdHRoaXMub3ZlciA9IHRydWU7XHJcblx0XHR9LFxyXG5cdFx0XHJcblx0XHRoaWRlVG9vbHRpcDogZnVuY3Rpb24oKXtcclxuXHRcdFx0aWYgKHRoaXMuaW5EcmFnID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdHRoaXMudG9vbHRpcC5yZW1vdmVDbGFzcygnaW4nKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLm92ZXIgPSBmYWxzZTtcclxuXHRcdH0sXHJcblxyXG5cdFx0bGF5b3V0OiBmdW5jdGlvbigpe1xyXG5cdFx0XHR0aGlzLmhhbmRsZTFTdHlwZVt0aGlzLnN0eWxlUG9zXSA9IHRoaXMucGVyY2VudGFnZVswXSsnJSc7XHJcblx0XHRcdHRoaXMuaGFuZGxlMlN0eXBlW3RoaXMuc3R5bGVQb3NdID0gdGhpcy5wZXJjZW50YWdlWzFdKyclJztcclxuXHRcdFx0aWYgKHRoaXMub3JpZW50YXRpb24gPT0gJ3ZlcnRpY2FsJykge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0aW9uRWxTdHlsZS50b3AgPSBNYXRoLm1pbih0aGlzLnBlcmNlbnRhZ2VbMF0sIHRoaXMucGVyY2VudGFnZVsxXSkgKyclJztcclxuXHRcdFx0XHR0aGlzLnNlbGVjdGlvbkVsU3R5bGUuaGVpZ2h0ID0gTWF0aC5hYnModGhpcy5wZXJjZW50YWdlWzBdIC0gdGhpcy5wZXJjZW50YWdlWzFdKSArJyUnO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0aW9uRWxTdHlsZS5sZWZ0ID0gTWF0aC5taW4odGhpcy5wZXJjZW50YWdlWzBdLCB0aGlzLnBlcmNlbnRhZ2VbMV0pICsnJSc7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3Rpb25FbFN0eWxlLndpZHRoID0gTWF0aC5hYnModGhpcy5wZXJjZW50YWdlWzBdIC0gdGhpcy5wZXJjZW50YWdlWzFdKSArJyUnO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLnJhbmdlKSB7XHJcblx0XHRcdFx0dGhpcy50b29sdGlwSW5uZXIudGV4dChcclxuXHRcdFx0XHRcdHRoaXMuZm9ybWF0ZXIodGhpcy52YWx1ZVswXSkgKyBcclxuXHRcdFx0XHRcdCcgOiAnICsgXHJcblx0XHRcdFx0XHR0aGlzLmZvcm1hdGVyKHRoaXMudmFsdWVbMV0pXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0XHR0aGlzLnRvb2x0aXBbMF0uc3R5bGVbdGhpcy5zdHlsZVBvc10gPSB0aGlzLnNpemUgKiAodGhpcy5wZXJjZW50YWdlWzBdICsgKHRoaXMucGVyY2VudGFnZVsxXSAtIHRoaXMucGVyY2VudGFnZVswXSkvMikvMTAwIC0gKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgPyB0aGlzLnRvb2x0aXAub3V0ZXJIZWlnaHQoKS8yIDogdGhpcy50b29sdGlwLm91dGVyV2lkdGgoKS8yKSArJ3B4JztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnRvb2x0aXBJbm5lci50ZXh0KFxyXG5cdFx0XHRcdFx0dGhpcy5mb3JtYXRlcih0aGlzLnZhbHVlWzBdKVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdFx0dGhpcy50b29sdGlwWzBdLnN0eWxlW3RoaXMuc3R5bGVQb3NdID0gdGhpcy5zaXplICogdGhpcy5wZXJjZW50YWdlWzBdLzEwMCAtICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gdGhpcy50b29sdGlwLm91dGVySGVpZ2h0KCkvMiA6IHRoaXMudG9vbHRpcC5vdXRlcldpZHRoKCkvMikgKydweCc7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0bW91c2Vkb3duOiBmdW5jdGlvbihldikge1xyXG5cclxuXHRcdFx0Ly8gVG91Y2g6IEdldCB0aGUgb3JpZ2luYWwgZXZlbnQ6XHJcblx0XHRcdGlmICh0aGlzLnRvdWNoQ2FwYWJsZSAmJiBldi50eXBlID09PSAndG91Y2hzdGFydCcpIHtcclxuXHRcdFx0XHRldiA9IGV2Lm9yaWdpbmFsRXZlbnQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMub2Zmc2V0ID0gdGhpcy5waWNrZXIub2Zmc2V0KCk7XHJcblx0XHRcdHRoaXMuc2l6ZSA9IHRoaXMucGlja2VyWzBdW3RoaXMuc2l6ZVBvc107XHJcblxyXG5cdFx0XHR2YXIgcGVyY2VudGFnZSA9IHRoaXMuZ2V0UGVyY2VudGFnZShldik7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5yYW5nZSkge1xyXG5cdFx0XHRcdHZhciBkaWZmMSA9IE1hdGguYWJzKHRoaXMucGVyY2VudGFnZVswXSAtIHBlcmNlbnRhZ2UpO1xyXG5cdFx0XHRcdHZhciBkaWZmMiA9IE1hdGguYWJzKHRoaXMucGVyY2VudGFnZVsxXSAtIHBlcmNlbnRhZ2UpO1xyXG5cdFx0XHRcdHRoaXMuZHJhZ2dlZCA9IChkaWZmMSA8IGRpZmYyKSA/IDAgOiAxO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZHJhZ2dlZCA9IDA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMucGVyY2VudGFnZVt0aGlzLmRyYWdnZWRdID0gcGVyY2VudGFnZTtcclxuXHRcdFx0dGhpcy5sYXlvdXQoKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLnRvdWNoQ2FwYWJsZSkge1xyXG5cdFx0XHRcdC8vIFRvdWNoOiBCaW5kIHRvdWNoIGV2ZW50czpcclxuXHRcdFx0XHQkKGRvY3VtZW50KS5vbih7XHJcblx0XHRcdFx0XHR0b3VjaG1vdmU6ICQucHJveHkodGhpcy5tb3VzZW1vdmUsIHRoaXMpLFxyXG5cdFx0XHRcdFx0dG91Y2hlbmQ6ICQucHJveHkodGhpcy5tb3VzZXVwLCB0aGlzKVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQoZG9jdW1lbnQpLm9uKHtcclxuXHRcdFx0XHRcdG1vdXNlbW92ZTogJC5wcm94eSh0aGlzLm1vdXNlbW92ZSwgdGhpcyksXHJcblx0XHRcdFx0XHRtb3VzZXVwOiAkLnByb3h5KHRoaXMubW91c2V1cCwgdGhpcylcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5pbkRyYWcgPSB0cnVlO1xyXG5cdFx0XHR2YXIgdmFsID0gdGhpcy5jYWxjdWxhdGVWYWx1ZSgpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnQudHJpZ2dlcih7XHJcblx0XHRcdFx0XHR0eXBlOiAnc2xpZGVTdGFydCcsXHJcblx0XHRcdFx0XHR2YWx1ZTogdmFsXHJcblx0XHRcdFx0fSkudHJpZ2dlcih7XHJcblx0XHRcdFx0XHR0eXBlOiAnc2xpZGUnLFxyXG5cdFx0XHRcdFx0dmFsdWU6IHZhbFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9LFxyXG5cclxuXHRcdG1vdXNlbW92ZTogZnVuY3Rpb24oZXYpIHtcclxuXHRcdFx0XHJcblx0XHRcdC8vIFRvdWNoOiBHZXQgdGhlIG9yaWdpbmFsIGV2ZW50OlxyXG5cdFx0XHRpZiAodGhpcy50b3VjaENhcGFibGUgJiYgZXYudHlwZSA9PT0gJ3RvdWNobW92ZScpIHtcclxuXHRcdFx0XHRldiA9IGV2Lm9yaWdpbmFsRXZlbnQ7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBwZXJjZW50YWdlID0gdGhpcy5nZXRQZXJjZW50YWdlKGV2KTtcclxuXHRcdFx0aWYgKHRoaXMucmFuZ2UpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5kcmFnZ2VkID09PSAwICYmIHRoaXMucGVyY2VudGFnZVsxXSA8IHBlcmNlbnRhZ2UpIHtcclxuXHRcdFx0XHRcdHRoaXMucGVyY2VudGFnZVswXSA9IHRoaXMucGVyY2VudGFnZVsxXTtcclxuXHRcdFx0XHRcdHRoaXMuZHJhZ2dlZCA9IDE7XHJcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmRyYWdnZWQgPT09IDEgJiYgdGhpcy5wZXJjZW50YWdlWzBdID4gcGVyY2VudGFnZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5wZXJjZW50YWdlWzFdID0gdGhpcy5wZXJjZW50YWdlWzBdO1xyXG5cdFx0XHRcdFx0dGhpcy5kcmFnZ2VkID0gMDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5wZXJjZW50YWdlW3RoaXMuZHJhZ2dlZF0gPSBwZXJjZW50YWdlO1xyXG5cdFx0XHR0aGlzLmxheW91dCgpO1xyXG5cdFx0XHR2YXIgdmFsID0gdGhpcy5jYWxjdWxhdGVWYWx1ZSgpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnRcclxuXHRcdFx0XHQudHJpZ2dlcih7XHJcblx0XHRcdFx0XHR0eXBlOiAnc2xpZGUnLFxyXG5cdFx0XHRcdFx0dmFsdWU6IHZhbFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmRhdGEoJ3ZhbHVlJywgdmFsKVxyXG5cdFx0XHRcdC5wcm9wKCd2YWx1ZScsIHZhbCk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH0sXHJcblxyXG5cdFx0bW91c2V1cDogZnVuY3Rpb24oZXYpIHtcclxuXHRcdFx0aWYgKHRoaXMudG91Y2hDYXBhYmxlKSB7XHJcblx0XHRcdFx0Ly8gVG91Y2g6IEJpbmQgdG91Y2ggZXZlbnRzOlxyXG5cdFx0XHRcdCQoZG9jdW1lbnQpLm9mZih7XHJcblx0XHRcdFx0XHR0b3VjaG1vdmU6IHRoaXMubW91c2Vtb3ZlLFxyXG5cdFx0XHRcdFx0dG91Y2hlbmQ6IHRoaXMubW91c2V1cFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdCQoZG9jdW1lbnQpLm9mZih7XHJcblx0XHRcdFx0XHRtb3VzZW1vdmU6IHRoaXMubW91c2Vtb3ZlLFxyXG5cdFx0XHRcdFx0bW91c2V1cDogdGhpcy5tb3VzZXVwXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuaW5EcmFnID0gZmFsc2U7XHJcblx0XHRcdGlmICh0aGlzLm92ZXIgPT0gZmFsc2UpIHtcclxuXHRcdFx0XHR0aGlzLmhpZGVUb29sdGlwKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5lbGVtZW50O1xyXG5cdFx0XHR2YXIgdmFsID0gdGhpcy5jYWxjdWxhdGVWYWx1ZSgpO1xyXG5cdFx0XHR0aGlzLmVsZW1lbnRcclxuXHRcdFx0XHQudHJpZ2dlcih7XHJcblx0XHRcdFx0XHR0eXBlOiAnc2xpZGVTdG9wJyxcclxuXHRcdFx0XHRcdHZhbHVlOiB2YWxcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5kYXRhKCd2YWx1ZScsIHZhbClcclxuXHRcdFx0XHQucHJvcCgndmFsdWUnLCB2YWwpO1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9LFxyXG5cclxuXHRcdGNhbGN1bGF0ZVZhbHVlOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0dmFyIHZhbDtcclxuXHRcdFx0aWYgKHRoaXMucmFuZ2UpIHtcclxuXHRcdFx0XHR2YWwgPSBbXHJcblx0XHRcdFx0XHQodGhpcy5taW4gKyBNYXRoLnJvdW5kKCh0aGlzLmRpZmYgKiB0aGlzLnBlcmNlbnRhZ2VbMF0vMTAwKS90aGlzLnN0ZXApKnRoaXMuc3RlcCksXHJcblx0XHRcdFx0XHQodGhpcy5taW4gKyBNYXRoLnJvdW5kKCh0aGlzLmRpZmYgKiB0aGlzLnBlcmNlbnRhZ2VbMV0vMTAwKS90aGlzLnN0ZXApKnRoaXMuc3RlcClcclxuXHRcdFx0XHRdO1xyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSB2YWw7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dmFsID0gKHRoaXMubWluICsgTWF0aC5yb3VuZCgodGhpcy5kaWZmICogdGhpcy5wZXJjZW50YWdlWzBdLzEwMCkvdGhpcy5zdGVwKSp0aGlzLnN0ZXApO1xyXG5cdFx0XHRcdHRoaXMudmFsdWUgPSBbdmFsLCB0aGlzLnZhbHVlWzFdXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdmFsO1xyXG5cdFx0fSxcclxuXHJcblx0XHRnZXRQZXJjZW50YWdlOiBmdW5jdGlvbihldikge1xyXG5cdFx0XHRpZiAodGhpcy50b3VjaENhcGFibGUpIHtcclxuXHRcdFx0XHRldiA9IGV2LnRvdWNoZXNbMF07XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIHBlcmNlbnRhZ2UgPSAoZXZbdGhpcy5tb3VzZVBvc10gLSB0aGlzLm9mZnNldFt0aGlzLnN0eWxlUG9zXSkqMTAwL3RoaXMuc2l6ZTtcclxuXHRcdFx0cGVyY2VudGFnZSA9IE1hdGgucm91bmQocGVyY2VudGFnZS90aGlzLnBlcmNlbnRhZ2VbMl0pKnRoaXMucGVyY2VudGFnZVsyXTtcclxuXHRcdFx0cmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgcGVyY2VudGFnZSkpO1xyXG5cdFx0fSxcclxuXHJcblx0XHRnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRcdGlmICh0aGlzLnJhbmdlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMudmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRoaXMudmFsdWVbMF07XHJcblx0XHR9LFxyXG5cclxuXHRcdHNldFZhbHVlOiBmdW5jdGlvbih2YWwpIHtcclxuXHRcdFx0dGhpcy52YWx1ZSA9IHZhbDtcclxuXHJcblx0XHRcdGlmICh0aGlzLnJhbmdlKSB7XHJcblx0XHRcdFx0dGhpcy52YWx1ZVswXSA9IE1hdGgubWF4KHRoaXMubWluLCBNYXRoLm1pbih0aGlzLm1heCwgdGhpcy52YWx1ZVswXSkpO1xyXG5cdFx0XHRcdHRoaXMudmFsdWVbMV0gPSBNYXRoLm1heCh0aGlzLm1pbiwgTWF0aC5taW4odGhpcy5tYXgsIHRoaXMudmFsdWVbMV0pKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnZhbHVlID0gWyBNYXRoLm1heCh0aGlzLm1pbiwgTWF0aC5taW4odGhpcy5tYXgsIHRoaXMudmFsdWUpKV07XHJcblx0XHRcdFx0dGhpcy5oYW5kbGUyLmFkZENsYXNzKCdoaWRlJyk7XHJcblx0XHRcdFx0aWYgKHRoaXMuc2VsZWN0aW9uID09ICdhZnRlcicpIHtcclxuXHRcdFx0XHRcdHRoaXMudmFsdWVbMV0gPSB0aGlzLm1heDtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy52YWx1ZVsxXSA9IHRoaXMubWluO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmRpZmYgPSB0aGlzLm1heCAtIHRoaXMubWluO1xyXG5cdFx0XHR0aGlzLnBlcmNlbnRhZ2UgPSBbXHJcblx0XHRcdFx0KHRoaXMudmFsdWVbMF0tdGhpcy5taW4pKjEwMC90aGlzLmRpZmYsXHJcblx0XHRcdFx0KHRoaXMudmFsdWVbMV0tdGhpcy5taW4pKjEwMC90aGlzLmRpZmYsXHJcblx0XHRcdFx0dGhpcy5zdGVwKjEwMC90aGlzLmRpZmZcclxuXHRcdFx0XTtcclxuXHRcdFx0dGhpcy5sYXlvdXQoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHQkLmZuLnNsaWRlciA9IGZ1bmN0aW9uICggb3B0aW9uLCB2YWwgKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcclxuXHRcdFx0XHRkYXRhID0gJHRoaXMuZGF0YSgnc2xpZGVyJyksXHJcblx0XHRcdFx0b3B0aW9ucyA9IHR5cGVvZiBvcHRpb24gPT09ICdvYmplY3QnICYmIG9wdGlvbjtcclxuXHRcdFx0aWYgKCFkYXRhKSAge1xyXG5cdFx0XHRcdCR0aGlzLmRhdGEoJ3NsaWRlcicsIChkYXRhID0gbmV3IFNsaWRlcih0aGlzLCAkLmV4dGVuZCh7fSwgJC5mbi5zbGlkZXIuZGVmYXVsdHMsb3B0aW9ucykpKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRkYXRhW29wdGlvbl0odmFsKTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9O1xyXG5cclxuXHQkLmZuLnNsaWRlci5kZWZhdWx0cyA9IHtcclxuXHRcdG1pbjogMCxcclxuXHRcdG1heDogMTAsXHJcblx0XHRzdGVwOiAxLFxyXG5cdFx0b3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcclxuXHRcdHZhbHVlOiA1LFxyXG5cdFx0c2VsZWN0aW9uOiAnYmVmb3JlJyxcclxuXHRcdHRvb2x0aXA6ICdzaG93JyxcclxuXHRcdGhhbmRsZTogJ3JvdW5kJyxcclxuXHRcdGZvcm1hdGVyOiBmdW5jdGlvbih2YWx1ZSkge1xyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0JC5mbi5zbGlkZXIuQ29uc3RydWN0b3IgPSBTbGlkZXI7XHJcblxyXG59KCB3aW5kb3cualF1ZXJ5ICk7Il0sInNvdXJjZVJvb3QiOiIifQ==