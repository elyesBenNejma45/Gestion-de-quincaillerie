(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["html5shiv"],{

/***/ "./assets/js/html5shiv.js":
/*!********************************!*\
  !*** ./assets/js/html5shiv.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 HTML5 Shiv v3.6.2pre | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
(function (l, f) {
  function m() {
    var a = e.elements;
    return "string" == typeof a ? a.split(" ") : a;
  }

  function i(a) {
    var b = n[a[o]];
    b || (b = {}, h++, a[o] = h, n[h] = b);
    return b;
  }

  function p(a, b, c) {
    b || (b = f);
    if (g) return b.createElement(a);
    c || (c = i(b));
    b = c.cache[a] ? c.cache[a].cloneNode() : r.test(a) ? (c.cache[a] = c.createElem(a)).cloneNode() : c.createElem(a);
    return b.canHaveChildren && !s.test(a) ? c.frag.appendChild(b) : b;
  }

  function t(a, b) {
    if (!b.cache) b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag();

    a.createElement = function (c) {
      return !e.shivMethods ? b.createElem(c) : p(c, a, b);
    };

    a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/\w+/g, function (a) {
      b.createElem(a);
      b.frag.createElement(a);
      return 'c("' + a + '")';
    }) + ");return n}")(e, b.frag);
  }

  function q(a) {
    a || (a = f);
    var b = i(a);

    if (e.shivCSS && !j && !b.hasCSS) {
      var c,
          d = a;
      c = d.createElement("p");
      d = d.getElementsByTagName("head")[0] || d.documentElement;
      c.innerHTML = "x<style>article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}</style>";
      c = d.insertBefore(c.lastChild, d.firstChild);
      b.hasCSS = !!c;
    }

    g || t(a, b);
    return a;
  }

  var k = l.html5 || {},
      s = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
      r = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
      j,
      o = "_html5shiv",
      h = 0,
      n = {},
      g;

  (function () {
    try {
      var a = f.createElement("a");
      a.innerHTML = "<xyz></xyz>";
      j = "hidden" in a;
      var b;

      if (!(b = 1 == a.childNodes.length)) {
        f.createElement("a");
        var c = f.createDocumentFragment();
        b = "undefined" == typeof c.cloneNode || "undefined" == typeof c.createDocumentFragment || "undefined" == typeof c.createElement;
      }

      g = b;
    } catch (d) {
      g = j = !0;
    }
  })();

  var e = {
    elements: k.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
    version: "3.6.2pre",
    shivCSS: !1 !== k.shivCSS,
    supportsUnknownElements: g,
    shivMethods: !1 !== k.shivMethods,
    type: "default",
    shivDocument: q,
    createElement: p,
    createDocumentFragment: function createDocumentFragment(a, b) {
      a || (a = f);
      if (g) return a.createDocumentFragment();

      for (var b = b || i(a), c = b.frag.cloneNode(), d = 0, e = m(), h = e.length; d < h; d++) {
        c.createElement(e[d]);
      }

      return c;
    }
  };
  l.html5 = e;
  q(f);
})(this, document);

/***/ })

},[["./assets/js/html5shiv.js","runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvaHRtbDVzaGl2LmpzIl0sIm5hbWVzIjpbImwiLCJmIiwibSIsImEiLCJlIiwiZWxlbWVudHMiLCJzcGxpdCIsImkiLCJiIiwibiIsIm8iLCJoIiwicCIsImMiLCJnIiwiY3JlYXRlRWxlbWVudCIsImNhY2hlIiwiY2xvbmVOb2RlIiwiciIsInRlc3QiLCJjcmVhdGVFbGVtIiwiY2FuSGF2ZUNoaWxkcmVuIiwicyIsImZyYWciLCJhcHBlbmRDaGlsZCIsInQiLCJjcmVhdGVGcmFnIiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsInNoaXZNZXRob2RzIiwiRnVuY3Rpb24iLCJqb2luIiwicmVwbGFjZSIsInEiLCJzaGl2Q1NTIiwiaiIsImhhc0NTUyIsImQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImRvY3VtZW50RWxlbWVudCIsImlubmVySFRNTCIsImluc2VydEJlZm9yZSIsImxhc3RDaGlsZCIsImZpcnN0Q2hpbGQiLCJrIiwiaHRtbDUiLCJjaGlsZE5vZGVzIiwibGVuZ3RoIiwidmVyc2lvbiIsInN1cHBvcnRzVW5rbm93bkVsZW1lbnRzIiwidHlwZSIsInNoaXZEb2N1bWVudCIsImRvY3VtZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7O0FBR0EsQ0FBQyxVQUFTQSxDQUFULEVBQVdDLENBQVgsRUFBYTtBQUFDLFdBQVNDLENBQVQsR0FBWTtBQUFDLFFBQUlDLENBQUMsR0FBQ0MsQ0FBQyxDQUFDQyxRQUFSO0FBQWlCLFdBQU0sWUFBVSxPQUFPRixDQUFqQixHQUFtQkEsQ0FBQyxDQUFDRyxLQUFGLENBQVEsR0FBUixDQUFuQixHQUFnQ0gsQ0FBdEM7QUFBd0M7O0FBQUEsV0FBU0ksQ0FBVCxDQUFXSixDQUFYLEVBQWE7QUFBQyxRQUFJSyxDQUFDLEdBQUNDLENBQUMsQ0FBQ04sQ0FBQyxDQUFDTyxDQUFELENBQUYsQ0FBUDtBQUFjRixLQUFDLEtBQUdBLENBQUMsR0FBQyxFQUFGLEVBQUtHLENBQUMsRUFBTixFQUFTUixDQUFDLENBQUNPLENBQUQsQ0FBRCxHQUFLQyxDQUFkLEVBQWdCRixDQUFDLENBQUNFLENBQUQsQ0FBRCxHQUFLSCxDQUF4QixDQUFEO0FBQTRCLFdBQU9BLENBQVA7QUFBUzs7QUFBQSxXQUFTSSxDQUFULENBQVdULENBQVgsRUFBYUssQ0FBYixFQUFlSyxDQUFmLEVBQWlCO0FBQUNMLEtBQUMsS0FBR0EsQ0FBQyxHQUFDUCxDQUFMLENBQUQ7QUFBUyxRQUFHYSxDQUFILEVBQUssT0FBT04sQ0FBQyxDQUFDTyxhQUFGLENBQWdCWixDQUFoQixDQUFQO0FBQTBCVSxLQUFDLEtBQUdBLENBQUMsR0FBQ04sQ0FBQyxDQUFDQyxDQUFELENBQU4sQ0FBRDtBQUFZQSxLQUFDLEdBQUNLLENBQUMsQ0FBQ0csS0FBRixDQUFRYixDQUFSLElBQVdVLENBQUMsQ0FBQ0csS0FBRixDQUFRYixDQUFSLEVBQVdjLFNBQVgsRUFBWCxHQUFrQ0MsQ0FBQyxDQUFDQyxJQUFGLENBQU9oQixDQUFQLElBQVUsQ0FBQ1UsQ0FBQyxDQUFDRyxLQUFGLENBQVFiLENBQVIsSUFBV1UsQ0FBQyxDQUFDTyxVQUFGLENBQWFqQixDQUFiLENBQVosRUFBNkJjLFNBQTdCLEVBQVYsR0FBbURKLENBQUMsQ0FBQ08sVUFBRixDQUFhakIsQ0FBYixDQUF2RjtBQUF1RyxXQUFPSyxDQUFDLENBQUNhLGVBQUYsSUFBbUIsQ0FBQ0MsQ0FBQyxDQUFDSCxJQUFGLENBQU9oQixDQUFQLENBQXBCLEdBQThCVSxDQUFDLENBQUNVLElBQUYsQ0FBT0MsV0FBUCxDQUFtQmhCLENBQW5CLENBQTlCLEdBQW9EQSxDQUEzRDtBQUE2RDs7QUFBQSxXQUFTaUIsQ0FBVCxDQUFXdEIsQ0FBWCxFQUFhSyxDQUFiLEVBQWU7QUFBQyxRQUFHLENBQUNBLENBQUMsQ0FBQ1EsS0FBTixFQUFZUixDQUFDLENBQUNRLEtBQUYsR0FBUSxFQUFSLEVBQVdSLENBQUMsQ0FBQ1ksVUFBRixHQUFhakIsQ0FBQyxDQUFDWSxhQUExQixFQUF3Q1AsQ0FBQyxDQUFDa0IsVUFBRixHQUFhdkIsQ0FBQyxDQUFDd0Isc0JBQXZELEVBQThFbkIsQ0FBQyxDQUFDZSxJQUFGLEdBQU9mLENBQUMsQ0FBQ2tCLFVBQUYsRUFBckY7O0FBQzVadkIsS0FBQyxDQUFDWSxhQUFGLEdBQWdCLFVBQVNGLENBQVQsRUFBVztBQUFDLGFBQU0sQ0FBQ1QsQ0FBQyxDQUFDd0IsV0FBSCxHQUFlcEIsQ0FBQyxDQUFDWSxVQUFGLENBQWFQLENBQWIsQ0FBZixHQUErQkQsQ0FBQyxDQUFDQyxDQUFELEVBQUdWLENBQUgsRUFBS0ssQ0FBTCxDQUF0QztBQUE4QyxLQUExRTs7QUFBMkVMLEtBQUMsQ0FBQ3dCLHNCQUFGLEdBQXlCRSxRQUFRLENBQUMsS0FBRCxFQUFPLDZFQUEyRTNCLENBQUMsR0FBRzRCLElBQUosR0FBV0MsT0FBWCxDQUFtQixNQUFuQixFQUEwQixVQUFTNUIsQ0FBVCxFQUFXO0FBQUNLLE9BQUMsQ0FBQ1ksVUFBRixDQUFhakIsQ0FBYjtBQUFnQkssT0FBQyxDQUFDZSxJQUFGLENBQU9SLGFBQVAsQ0FBcUJaLENBQXJCO0FBQXdCLGFBQU0sUUFBTUEsQ0FBTixHQUFRLElBQWQ7QUFBbUIsS0FBakcsQ0FBM0UsR0FBOEssYUFBckwsQ0FBUixDQUE0TUMsQ0FBNU0sRUFBOE1JLENBQUMsQ0FBQ2UsSUFBaE4sQ0FBekI7QUFBK087O0FBQUEsV0FBU1MsQ0FBVCxDQUFXN0IsQ0FBWCxFQUFhO0FBQUNBLEtBQUMsS0FBR0EsQ0FBQyxHQUFDRixDQUFMLENBQUQ7QUFBUyxRQUFJTyxDQUFDLEdBQUNELENBQUMsQ0FBQ0osQ0FBRCxDQUFQOztBQUFXLFFBQUdDLENBQUMsQ0FBQzZCLE9BQUYsSUFBVyxDQUFDQyxDQUFaLElBQWUsQ0FBQzFCLENBQUMsQ0FBQzJCLE1BQXJCLEVBQTRCO0FBQUMsVUFBSXRCLENBQUo7QUFBQSxVQUFNdUIsQ0FBQyxHQUFDakMsQ0FBUjtBQUFVVSxPQUFDLEdBQUN1QixDQUFDLENBQUNyQixhQUFGLENBQWdCLEdBQWhCLENBQUY7QUFBdUJxQixPQUFDLEdBQUNBLENBQUMsQ0FBQ0Msb0JBQUYsQ0FBdUIsTUFBdkIsRUFBK0IsQ0FBL0IsS0FBbUNELENBQUMsQ0FBQ0UsZUFBdkM7QUFBdUR6QixPQUFDLENBQUMwQixTQUFGLEdBQVksaUlBQVo7QUFDamQxQixPQUFDLEdBQUN1QixDQUFDLENBQUNJLFlBQUYsQ0FBZTNCLENBQUMsQ0FBQzRCLFNBQWpCLEVBQTJCTCxDQUFDLENBQUNNLFVBQTdCLENBQUY7QUFBMkNsQyxPQUFDLENBQUMyQixNQUFGLEdBQVMsQ0FBQyxDQUFDdEIsQ0FBWDtBQUFhOztBQUFBQyxLQUFDLElBQUVXLENBQUMsQ0FBQ3RCLENBQUQsRUFBR0ssQ0FBSCxDQUFKO0FBQVUsV0FBT0wsQ0FBUDtBQUFTOztBQUFBLE1BQUl3QyxDQUFDLEdBQUMzQyxDQUFDLENBQUM0QyxLQUFGLElBQVMsRUFBZjtBQUFBLE1BQWtCdEIsQ0FBQyxHQUFDLG9FQUFwQjtBQUFBLE1BQXlGSixDQUFDLEdBQUMsNEdBQTNGO0FBQUEsTUFBd01nQixDQUF4TTtBQUFBLE1BQTBNeEIsQ0FBQyxHQUFDLFlBQTVNO0FBQUEsTUFBeU5DLENBQUMsR0FBQyxDQUEzTjtBQUFBLE1BQTZORixDQUFDLEdBQUMsRUFBL047QUFBQSxNQUFrT0ssQ0FBbE87O0FBQW9PLEdBQUMsWUFBVTtBQUFDLFFBQUc7QUFBQyxVQUFJWCxDQUFDLEdBQUNGLENBQUMsQ0FBQ2MsYUFBRixDQUFnQixHQUFoQixDQUFOO0FBQTJCWixPQUFDLENBQUNvQyxTQUFGLEdBQVksYUFBWjtBQUEwQkwsT0FBQyxHQUFDLFlBQVcvQixDQUFiO0FBQWUsVUFBSUssQ0FBSjs7QUFBTSxVQUFHLEVBQUVBLENBQUMsR0FBQyxLQUFHTCxDQUFDLENBQUMwQyxVQUFGLENBQWFDLE1BQXBCLENBQUgsRUFBK0I7QUFBQzdDLFNBQUMsQ0FBQ2MsYUFBRixDQUFnQixHQUFoQjtBQUFxQixZQUFJRixDQUFDLEdBQUNaLENBQUMsQ0FBQzBCLHNCQUFGLEVBQU47QUFBaUNuQixTQUFDLEdBQUMsZUFBYSxPQUFPSyxDQUFDLENBQUNJLFNBQXRCLElBQ2plLGVBQWEsT0FBT0osQ0FBQyxDQUFDYyxzQkFEMmMsSUFDbmIsZUFBYSxPQUFPZCxDQUFDLENBQUNFLGFBRDJaO0FBQzdZOztBQUFBRCxPQUFDLEdBQUNOLENBQUY7QUFBSSxLQURxTyxDQUNyTyxPQUFNNEIsQ0FBTixFQUFRO0FBQUN0QixPQUFDLEdBQUNvQixDQUFDLEdBQUMsQ0FBQyxDQUFMO0FBQU87QUFBQyxHQUR3TTs7QUFDcE0sTUFBSTlCLENBQUMsR0FBQztBQUFDQyxZQUFRLEVBQUNzQyxDQUFDLENBQUN0QyxRQUFGLElBQVksNEpBQXRCO0FBQW1MMEMsV0FBTyxFQUFDLFVBQTNMO0FBQXNNZCxXQUFPLEVBQUMsQ0FBQyxDQUFELEtBQUtVLENBQUMsQ0FBQ1YsT0FBck47QUFBNk5lLDJCQUF1QixFQUFDbEMsQ0FBclA7QUFBdVBjLGVBQVcsRUFBQyxDQUFDLENBQUQsS0FBS2UsQ0FBQyxDQUFDZixXQUExUTtBQUFzUnFCLFFBQUksRUFBQyxTQUEzUjtBQUFxU0MsZ0JBQVksRUFBQ2xCLENBQWxUO0FBQW9UakIsaUJBQWEsRUFBQ0gsQ0FBbFU7QUFBb1VlLDBCQUFzQixFQUFDLGdDQUFTeEIsQ0FBVCxFQUFXSyxDQUFYLEVBQWE7QUFBQ0wsT0FBQyxLQUFHQSxDQUFDLEdBQUNGLENBQUwsQ0FBRDtBQUFTLFVBQUdhLENBQUgsRUFBSyxPQUFPWCxDQUFDLENBQUN3QixzQkFBRixFQUFQOztBQUN4ZSxXQUFJLElBQUluQixDQUFDLEdBQUNBLENBQUMsSUFBRUQsQ0FBQyxDQUFDSixDQUFELENBQVYsRUFBY1UsQ0FBQyxHQUFDTCxDQUFDLENBQUNlLElBQUYsQ0FBT04sU0FBUCxFQUFoQixFQUFtQ21CLENBQUMsR0FBQyxDQUFyQyxFQUF1Q2hDLENBQUMsR0FBQ0YsQ0FBQyxFQUExQyxFQUE2Q1MsQ0FBQyxHQUFDUCxDQUFDLENBQUMwQyxNQUFyRCxFQUE0RFYsQ0FBQyxHQUFDekIsQ0FBOUQsRUFBZ0V5QixDQUFDLEVBQWpFO0FBQW9FdkIsU0FBQyxDQUFDRSxhQUFGLENBQWdCWCxDQUFDLENBQUNnQyxDQUFELENBQWpCO0FBQXBFOztBQUEwRixhQUFPdkIsQ0FBUDtBQUFTO0FBRGMsR0FBTjtBQUNOYixHQUFDLENBQUM0QyxLQUFGLEdBQVF4QyxDQUFSO0FBQVU0QixHQUFDLENBQUMvQixDQUFELENBQUQ7QUFBSyxDQUpwSCxFQUlzSCxJQUp0SCxFQUkySGtELFFBSjNILEUiLCJmaWxlIjoiaHRtbDVzaGl2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiBIVE1MNSBTaGl2IHYzLjYuMnByZSB8IEBhZmFya2FzIEBqZGFsdG9uIEBqb25fbmVhbCBAcmVtIHwgTUlUL0dQTDIgTGljZW5zZWRcbiovXG4oZnVuY3Rpb24obCxmKXtmdW5jdGlvbiBtKCl7dmFyIGE9ZS5lbGVtZW50cztyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgYT9hLnNwbGl0KFwiIFwiKTphfWZ1bmN0aW9uIGkoYSl7dmFyIGI9blthW29dXTtifHwoYj17fSxoKyssYVtvXT1oLG5baF09Yik7cmV0dXJuIGJ9ZnVuY3Rpb24gcChhLGIsYyl7Ynx8KGI9Zik7aWYoZylyZXR1cm4gYi5jcmVhdGVFbGVtZW50KGEpO2N8fChjPWkoYikpO2I9Yy5jYWNoZVthXT9jLmNhY2hlW2FdLmNsb25lTm9kZSgpOnIudGVzdChhKT8oYy5jYWNoZVthXT1jLmNyZWF0ZUVsZW0oYSkpLmNsb25lTm9kZSgpOmMuY3JlYXRlRWxlbShhKTtyZXR1cm4gYi5jYW5IYXZlQ2hpbGRyZW4mJiFzLnRlc3QoYSk/Yy5mcmFnLmFwcGVuZENoaWxkKGIpOmJ9ZnVuY3Rpb24gdChhLGIpe2lmKCFiLmNhY2hlKWIuY2FjaGU9e30sYi5jcmVhdGVFbGVtPWEuY3JlYXRlRWxlbWVudCxiLmNyZWF0ZUZyYWc9YS5jcmVhdGVEb2N1bWVudEZyYWdtZW50LGIuZnJhZz1iLmNyZWF0ZUZyYWcoKTtcbmEuY3JlYXRlRWxlbWVudD1mdW5jdGlvbihjKXtyZXR1cm4hZS5zaGl2TWV0aG9kcz9iLmNyZWF0ZUVsZW0oYyk6cChjLGEsYil9O2EuY3JlYXRlRG9jdW1lbnRGcmFnbWVudD1GdW5jdGlvbihcImgsZlwiLFwicmV0dXJuIGZ1bmN0aW9uKCl7dmFyIG49Zi5jbG9uZU5vZGUoKSxjPW4uY3JlYXRlRWxlbWVudDtoLnNoaXZNZXRob2RzJiYoXCIrbSgpLmpvaW4oKS5yZXBsYWNlKC9cXHcrL2csZnVuY3Rpb24oYSl7Yi5jcmVhdGVFbGVtKGEpO2IuZnJhZy5jcmVhdGVFbGVtZW50KGEpO3JldHVybidjKFwiJythKydcIiknfSkrXCIpO3JldHVybiBufVwiKShlLGIuZnJhZyl9ZnVuY3Rpb24gcShhKXthfHwoYT1mKTt2YXIgYj1pKGEpO2lmKGUuc2hpdkNTUyYmIWomJiFiLmhhc0NTUyl7dmFyIGMsZD1hO2M9ZC5jcmVhdGVFbGVtZW50KFwicFwiKTtkPWQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdfHxkLmRvY3VtZW50RWxlbWVudDtjLmlubmVySFRNTD1cIng8c3R5bGU+YXJ0aWNsZSxhc2lkZSxmaWdjYXB0aW9uLGZpZ3VyZSxmb290ZXIsaGVhZGVyLGhncm91cCxuYXYsc2VjdGlvbntkaXNwbGF5OmJsb2NrfW1hcmt7YmFja2dyb3VuZDojRkYwO2NvbG9yOiMwMDB9PC9zdHlsZT5cIjtcbmM9ZC5pbnNlcnRCZWZvcmUoYy5sYXN0Q2hpbGQsZC5maXJzdENoaWxkKTtiLmhhc0NTUz0hIWN9Z3x8dChhLGIpO3JldHVybiBhfXZhciBrPWwuaHRtbDV8fHt9LHM9L148fF4oPzpidXR0b258bWFwfHNlbGVjdHx0ZXh0YXJlYXxvYmplY3R8aWZyYW1lfG9wdGlvbnxvcHRncm91cCkkL2kscj0vXig/OmF8Ynxjb2RlfGRpdnxmaWVsZHNldHxoMXxoMnxoM3xoNHxoNXxoNnxpfGxhYmVsfGxpfG9sfHB8cXxzcGFufHN0cm9uZ3xzdHlsZXx0YWJsZXx0Ym9keXx0ZHx0aHx0cnx1bCkkL2ksaixvPVwiX2h0bWw1c2hpdlwiLGg9MCxuPXt9LGc7KGZ1bmN0aW9uKCl7dHJ5e3ZhciBhPWYuY3JlYXRlRWxlbWVudChcImFcIik7YS5pbm5lckhUTUw9XCI8eHl6PjwveHl6PlwiO2o9XCJoaWRkZW5cImluIGE7dmFyIGI7aWYoIShiPTE9PWEuY2hpbGROb2Rlcy5sZW5ndGgpKXtmLmNyZWF0ZUVsZW1lbnQoXCJhXCIpO3ZhciBjPWYuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2I9XCJ1bmRlZmluZWRcIj09dHlwZW9mIGMuY2xvbmVOb2RlfHxcblwidW5kZWZpbmVkXCI9PXR5cGVvZiBjLmNyZWF0ZURvY3VtZW50RnJhZ21lbnR8fFwidW5kZWZpbmVkXCI9PXR5cGVvZiBjLmNyZWF0ZUVsZW1lbnR9Zz1ifWNhdGNoKGQpe2c9aj0hMH19KSgpO3ZhciBlPXtlbGVtZW50czprLmVsZW1lbnRzfHxcImFiYnIgYXJ0aWNsZSBhc2lkZSBhdWRpbyBiZGkgY2FudmFzIGRhdGEgZGF0YWxpc3QgZGV0YWlscyBmaWdjYXB0aW9uIGZpZ3VyZSBmb290ZXIgaGVhZGVyIGhncm91cCBtYXJrIG1ldGVyIG5hdiBvdXRwdXQgcHJvZ3Jlc3Mgc2VjdGlvbiBzdW1tYXJ5IHRpbWUgdmlkZW9cIix2ZXJzaW9uOlwiMy42LjJwcmVcIixzaGl2Q1NTOiExIT09ay5zaGl2Q1NTLHN1cHBvcnRzVW5rbm93bkVsZW1lbnRzOmcsc2hpdk1ldGhvZHM6ITEhPT1rLnNoaXZNZXRob2RzLHR5cGU6XCJkZWZhdWx0XCIsc2hpdkRvY3VtZW50OnEsY3JlYXRlRWxlbWVudDpwLGNyZWF0ZURvY3VtZW50RnJhZ21lbnQ6ZnVuY3Rpb24oYSxiKXthfHwoYT1mKTtpZihnKXJldHVybiBhLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbmZvcih2YXIgYj1ifHxpKGEpLGM9Yi5mcmFnLmNsb25lTm9kZSgpLGQ9MCxlPW0oKSxoPWUubGVuZ3RoO2Q8aDtkKyspYy5jcmVhdGVFbGVtZW50KGVbZF0pO3JldHVybiBjfX07bC5odG1sNT1lO3EoZil9KSh0aGlzLGRvY3VtZW50KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=