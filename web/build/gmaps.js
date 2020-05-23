(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["gmaps"],{

/***/ "./assets/js/gmaps.js":
/*!****************************!*\
  !*** ./assets/js/gmaps.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (root, factory) {
  if (( false ? undefined : _typeof(exports)) === 'object') {
    module.exports = factory();
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }

  root.GMaps = factory();
})(this, function () {
  /*!
   * GMaps.js v0.4.9
   * http://hpneo.github.com/gmaps/
   *
   * Copyright 2013, Gustavo Leon
   * Released under the MIT License.
   */
  if (!(_typeof(window.google) === 'object' && window.google.maps)) {
    throw 'Google Maps API is required. Please register the following JavaScript library http://maps.google.com/maps/api/js?sensor=true.';
  }

  var extend_object = function extend_object(obj, new_obj) {
    var name;

    if (obj === new_obj) {
      return obj;
    }

    for (name in new_obj) {
      obj[name] = new_obj[name];
    }

    return obj;
  };

  var replace_object = function replace_object(obj, replace) {
    var name;

    if (obj === replace) {
      return obj;
    }

    for (name in replace) {
      if (obj[name] != undefined) {
        obj[name] = replace[name];
      }
    }

    return obj;
  };

  var array_map = function array_map(array, callback) {
    var original_callback_params = Array.prototype.slice.call(arguments, 2),
        array_return = [],
        array_length = array.length,
        i;

    if (Array.prototype.map && array.map === Array.prototype.map) {
      array_return = Array.prototype.map.call(array, function (item) {
        callback_params = original_callback_params;
        callback_params.splice(0, 0, item);
        return callback.apply(this, callback_params);
      });
    } else {
      for (i = 0; i < array_length; i++) {
        callback_params = original_callback_params;
        callback_params.splice(0, 0, array[i]);
        array_return.push(callback.apply(this, callback_params));
      }
    }

    return array_return;
  };

  var array_flat = function array_flat(array) {
    var new_array = [],
        i;

    for (i = 0; i < array.length; i++) {
      new_array = new_array.concat(array[i]);
    }

    return new_array;
  };

  var coordsToLatLngs = function coordsToLatLngs(coords, useGeoJSON) {
    var first_coord = coords[0],
        second_coord = coords[1];

    if (useGeoJSON) {
      first_coord = coords[1];
      second_coord = coords[0];
    }

    return new google.maps.LatLng(first_coord, second_coord);
  };

  var arrayToLatLng = function arrayToLatLng(coords, useGeoJSON) {
    var i;

    for (i = 0; i < coords.length; i++) {
      if (coords[i].length > 0 && _typeof(coords[i][0]) == "object") {
        coords[i] = arrayToLatLng(coords[i], useGeoJSON);
      } else {
        coords[i] = coordsToLatLngs(coords[i], useGeoJSON);
      }
    }

    return coords;
  };

  var getElementById = function getElementById(id, context) {
    var element,
        id = id.replace('#', '');

    if ('jQuery' in this && context) {
      element = $("#" + id, context)[0];
    } else {
      element = document.getElementById(id);
    }

    ;
    return element;
  };

  var findAbsolutePosition = function findAbsolutePosition(obj) {
    var curleft = 0,
        curtop = 0;

    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
    }

    return [curleft, curtop];
  };

  var GMaps = function (global) {
    "use strict";

    var doc = document;

    var GMaps = function GMaps(options) {
      if (!this) return new GMaps(options);
      options.zoom = options.zoom || 15;
      options.mapType = options.mapType || 'roadmap';
      var self = this,
          i,
          events_that_hide_context_menu = ['bounds_changed', 'center_changed', 'click', 'dblclick', 'drag', 'dragend', 'dragstart', 'idle', 'maptypeid_changed', 'projection_changed', 'resize', 'tilesloaded', 'zoom_changed'],
          events_that_doesnt_hide_context_menu = ['mousemove', 'mouseout', 'mouseover'],
          options_to_be_deleted = ['el', 'lat', 'lng', 'mapType', 'width', 'height', 'markerClusterer', 'enableNewStyle'],
          container_id = options.el || options.div,
          markerClustererFunction = options.markerClusterer,
          mapType = google.maps.MapTypeId[options.mapType.toUpperCase()],
          map_center = new google.maps.LatLng(options.lat, options.lng),
          zoomControl = options.zoomControl || true,
          zoomControlOpt = options.zoomControlOpt || {
        style: 'DEFAULT',
        position: 'TOP_LEFT'
      },
          zoomControlStyle = zoomControlOpt.style || 'DEFAULT',
          zoomControlPosition = zoomControlOpt.position || 'TOP_LEFT',
          panControl = options.panControl || true,
          mapTypeControl = options.mapTypeControl || true,
          scaleControl = options.scaleControl || true,
          streetViewControl = options.streetViewControl || true,
          overviewMapControl = overviewMapControl || true,
          map_options = {},
          map_base_options = {
        zoom: this.zoom,
        center: map_center,
        mapTypeId: mapType
      },
          map_controls_options = {
        panControl: panControl,
        zoomControl: zoomControl,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle[zoomControlStyle],
          position: google.maps.ControlPosition[zoomControlPosition]
        },
        mapTypeControl: mapTypeControl,
        scaleControl: scaleControl,
        streetViewControl: streetViewControl,
        overviewMapControl: overviewMapControl
      };

      if (typeof options.el === 'string' || typeof options.div === 'string') {
        this.el = getElementById(container_id, options.context);
      } else {
        this.el = container_id;
      }

      if (typeof this.el === 'undefined' || this.el === null) {
        throw 'No element defined.';
      }

      window.context_menu = window.context_menu || {};
      window.context_menu[self.el.id] = {};
      this.controls = [];
      this.overlays = [];
      this.layers = []; // array with kml/georss and fusiontables layers, can be as many

      this.singleLayers = {}; // object with the other layers, only one per layer

      this.markers = [];
      this.polylines = [];
      this.routes = [];
      this.polygons = [];
      this.infoWindow = null;
      this.overlay_el = null;
      this.zoom = options.zoom;
      this.registered_events = {};
      this.el.style.width = options.width || this.el.scrollWidth || this.el.offsetWidth;
      this.el.style.height = options.height || this.el.scrollHeight || this.el.offsetHeight;
      google.maps.visualRefresh = options.enableNewStyle;

      for (i = 0; i < options_to_be_deleted.length; i++) {
        delete options[options_to_be_deleted[i]];
      }

      if (options.disableDefaultUI != true) {
        map_base_options = extend_object(map_base_options, map_controls_options);
      }

      map_options = extend_object(map_base_options, options);

      for (i = 0; i < events_that_hide_context_menu.length; i++) {
        delete map_options[events_that_hide_context_menu[i]];
      }

      for (i = 0; i < events_that_doesnt_hide_context_menu.length; i++) {
        delete map_options[events_that_doesnt_hide_context_menu[i]];
      }

      this.map = new google.maps.Map(this.el, map_options);

      if (markerClustererFunction) {
        this.markerClusterer = markerClustererFunction.apply(this, [this.map]);
      }

      var buildContextMenuHTML = function buildContextMenuHTML(control, e) {
        var html = '',
            options = window.context_menu[self.el.id][control];

        for (var i in options) {
          if (options.hasOwnProperty(i)) {
            var option = options[i];
            html += '<li><a id="' + control + '_' + i + '" href="#">' + option.title + '</a></li>';
          }
        }

        if (!getElementById('gmaps_context_menu')) return;
        var context_menu_element = getElementById('gmaps_context_menu');
        context_menu_element.innerHTML = html;
        var context_menu_items = context_menu_element.getElementsByTagName('a'),
            context_menu_items_count = context_menu_items.length;
        i;

        for (i = 0; i < context_menu_items_count; i++) {
          var context_menu_item = context_menu_items[i];

          var assign_menu_item_action = function assign_menu_item_action(ev) {
            ev.preventDefault();
            options[this.id.replace(control + '_', '')].action.apply(self, [e]);
            self.hideContextMenu();
          };

          google.maps.event.clearListeners(context_menu_item, 'click');
          google.maps.event.addDomListenerOnce(context_menu_item, 'click', assign_menu_item_action, false);
        }

        var position = findAbsolutePosition.apply(this, [self.el]),
            left = position[0] + e.pixel.x - 15,
            top = position[1] + e.pixel.y - 15;
        context_menu_element.style.left = left + "px";
        context_menu_element.style.top = top + "px";
        context_menu_element.style.display = 'block';
      };

      this.buildContextMenu = function (control, e) {
        if (control === 'marker') {
          e.pixel = {};
          var overlay = new google.maps.OverlayView();
          overlay.setMap(self.map);

          overlay.draw = function () {
            var projection = overlay.getProjection(),
                position = e.marker.getPosition();
            e.pixel = projection.fromLatLngToContainerPixel(position);
            buildContextMenuHTML(control, e);
          };
        } else {
          buildContextMenuHTML(control, e);
        }
      };

      this.setContextMenu = function (options) {
        window.context_menu[self.el.id][options.control] = {};
        var i,
            ul = doc.createElement('ul');

        for (i in options.options) {
          if (options.options.hasOwnProperty(i)) {
            var option = options.options[i];
            window.context_menu[self.el.id][options.control][option.name] = {
              title: option.title,
              action: option.action
            };
          }
        }

        ul.id = 'gmaps_context_menu';
        ul.style.display = 'none';
        ul.style.position = 'absolute';
        ul.style.minWidth = '100px';
        ul.style.background = 'white';
        ul.style.listStyle = 'none';
        ul.style.padding = '8px';
        ul.style.boxShadow = '2px 2px 6px #ccc';
        doc.body.appendChild(ul);
        var context_menu_element = getElementById('gmaps_context_menu');
        google.maps.event.addDomListener(context_menu_element, 'mouseout', function (ev) {
          if (!ev.relatedTarget || !this.contains(ev.relatedTarget)) {
            window.setTimeout(function () {
              context_menu_element.style.display = 'none';
            }, 400);
          }
        }, false);
      };

      this.hideContextMenu = function () {
        var context_menu_element = getElementById('gmaps_context_menu');

        if (context_menu_element) {
          context_menu_element.style.display = 'none';
        }
      };

      var setupListener = function setupListener(object, name) {
        google.maps.event.addListener(object, name, function (e) {
          if (e == undefined) {
            e = this;
          }

          options[name].apply(this, [e]);
          self.hideContextMenu();
        });
      };

      for (var ev = 0; ev < events_that_hide_context_menu.length; ev++) {
        var name = events_that_hide_context_menu[ev];

        if (name in options) {
          setupListener(this.map, name);
        }
      }

      for (var ev = 0; ev < events_that_doesnt_hide_context_menu.length; ev++) {
        var name = events_that_doesnt_hide_context_menu[ev];

        if (name in options) {
          setupListener(this.map, name);
        }
      }

      google.maps.event.addListener(this.map, 'rightclick', function (e) {
        if (options.rightclick) {
          options.rightclick.apply(this, [e]);
        }

        if (window.context_menu[self.el.id]['map'] != undefined) {
          self.buildContextMenu('map', e);
        }
      });

      this.refresh = function () {
        google.maps.event.trigger(this.map, 'resize');
      };

      this.fitZoom = function () {
        var latLngs = [],
            markers_length = this.markers.length,
            i;

        for (i = 0; i < markers_length; i++) {
          if (typeof this.markers[i].visible === 'boolean' && this.markers[i].visible) {
            latLngs.push(this.markers[i].getPosition());
          }
        }

        this.fitLatLngBounds(latLngs);
      };

      this.fitLatLngBounds = function (latLngs) {
        var total = latLngs.length;
        var bounds = new google.maps.LatLngBounds();

        for (var i = 0; i < total; i++) {
          bounds.extend(latLngs[i]);
        }

        this.map.fitBounds(bounds);
      };

      this.setCenter = function (lat, lng, callback) {
        this.map.panTo(new google.maps.LatLng(lat, lng));

        if (callback) {
          callback();
        }
      };

      this.getElement = function () {
        return this.el;
      };

      this.zoomIn = function (value) {
        value = value || 1;
        this.zoom = this.map.getZoom() + value;
        this.map.setZoom(this.zoom);
      };

      this.zoomOut = function (value) {
        value = value || 1;
        this.zoom = this.map.getZoom() - value;
        this.map.setZoom(this.zoom);
      };

      var native_methods = [],
          method;

      for (method in this.map) {
        if (typeof this.map[method] == 'function' && !this[method]) {
          native_methods.push(method);
        }
      }

      for (i = 0; i < native_methods.length; i++) {
        (function (gmaps, scope, method_name) {
          gmaps[method_name] = function () {
            return scope[method_name].apply(scope, arguments);
          };
        })(this, this.map, native_methods[i]);
      }
    };

    return GMaps;
  }(this);

  GMaps.prototype.createControl = function (options) {
    var control = document.createElement('div');
    control.style.cursor = 'pointer';
    control.style.fontFamily = 'Arial, sans-serif';
    control.style.fontSize = '13px';
    control.style.boxShadow = 'rgba(0, 0, 0, 0.398438) 0px 2px 4px';

    for (var option in options.style) {
      control.style[option] = options.style[option];
    }

    if (options.id) {
      control.id = options.id;
    }

    if (options.classes) {
      control.className = options.classes;
    }

    if (options.content) {
      control.innerHTML = options.content;
    }

    for (var ev in options.events) {
      (function (object, name) {
        google.maps.event.addDomListener(object, name, function () {
          options.events[name].apply(this, [this]);
        });
      })(control, ev);
    }

    control.index = 1;
    return control;
  };

  GMaps.prototype.addControl = function (options) {
    var position = google.maps.ControlPosition[options.position.toUpperCase()];
    delete options.position;
    var control = this.createControl(options);
    this.controls.push(control);
    this.map.controls[position].push(control);
    return control;
  };

  GMaps.prototype.createMarker = function (options) {
    if (options.lat == undefined && options.lng == undefined && options.position == undefined) {
      throw 'No latitude or longitude defined.';
    }

    var self = this,
        details = options.details,
        fences = options.fences,
        outside = options.outside,
        base_options = {
      position: new google.maps.LatLng(options.lat, options.lng),
      map: null
    };
    delete options.lat;
    delete options.lng;
    delete options.fences;
    delete options.outside;
    var marker_options = extend_object(base_options, options),
        marker = new google.maps.Marker(marker_options);
    marker.fences = fences;

    if (options.infoWindow) {
      marker.infoWindow = new google.maps.InfoWindow(options.infoWindow);
      var info_window_events = ['closeclick', 'content_changed', 'domready', 'position_changed', 'zindex_changed'];

      for (var ev = 0; ev < info_window_events.length; ev++) {
        (function (object, name) {
          if (options.infoWindow[name]) {
            google.maps.event.addListener(object, name, function (e) {
              options.infoWindow[name].apply(this, [e]);
            });
          }
        })(marker.infoWindow, info_window_events[ev]);
      }
    }

    var marker_events = ['animation_changed', 'clickable_changed', 'cursor_changed', 'draggable_changed', 'flat_changed', 'icon_changed', 'position_changed', 'shadow_changed', 'shape_changed', 'title_changed', 'visible_changed', 'zindex_changed'];
    var marker_events_with_mouse = ['dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup'];

    for (var ev = 0; ev < marker_events.length; ev++) {
      (function (object, name) {
        if (options[name]) {
          google.maps.event.addListener(object, name, function () {
            options[name].apply(this, [this]);
          });
        }
      })(marker, marker_events[ev]);
    }

    for (var ev = 0; ev < marker_events_with_mouse.length; ev++) {
      (function (map, object, name) {
        if (options[name]) {
          google.maps.event.addListener(object, name, function (me) {
            if (!me.pixel) {
              me.pixel = map.getProjection().fromLatLngToPoint(me.latLng);
            }

            options[name].apply(this, [me]);
          });
        }
      })(this.map, marker, marker_events_with_mouse[ev]);
    }

    google.maps.event.addListener(marker, 'click', function () {
      this.details = details;

      if (options.click) {
        options.click.apply(this, [this]);
      }

      if (marker.infoWindow) {
        self.hideInfoWindows();
        marker.infoWindow.open(self.map, marker);
      }
    });
    google.maps.event.addListener(marker, 'rightclick', function (e) {
      e.marker = this;

      if (options.rightclick) {
        options.rightclick.apply(this, [e]);
      }

      if (window.context_menu[self.el.id]['marker'] != undefined) {
        self.buildContextMenu('marker', e);
      }
    });

    if (marker.fences) {
      google.maps.event.addListener(marker, 'dragend', function () {
        self.checkMarkerGeofence(marker, function (m, f) {
          outside(m, f);
        });
      });
    }

    return marker;
  };

  GMaps.prototype.addMarker = function (options) {
    var marker;

    if (options.hasOwnProperty('gm_accessors_')) {
      // Native google.maps.Marker object
      marker = options;
    } else {
      if (options.hasOwnProperty('lat') && options.hasOwnProperty('lng') || options.position) {
        marker = this.createMarker(options);
      } else {
        throw 'No latitude or longitude defined.';
      }
    }

    marker.setMap(this.map);

    if (this.markerClusterer) {
      this.markerClusterer.addMarker(marker);
    }

    this.markers.push(marker);
    GMaps.fire('marker_added', marker, this);
    return marker;
  };

  GMaps.prototype.addMarkers = function (array) {
    for (var i = 0, marker; marker = array[i]; i++) {
      this.addMarker(marker);
    }

    return this.markers;
  };

  GMaps.prototype.hideInfoWindows = function () {
    for (var i = 0, marker; marker = this.markers[i]; i++) {
      if (marker.infoWindow) {
        marker.infoWindow.close();
      }
    }
  };

  GMaps.prototype.removeMarker = function (marker) {
    for (var i = 0; i < this.markers.length; i++) {
      if (this.markers[i] === marker) {
        this.markers[i].setMap(null);
        this.markers.splice(i, 1);

        if (this.markerClusterer) {
          this.markerClusterer.removeMarker(marker);
        }

        GMaps.fire('marker_removed', marker, this);
        break;
      }
    }

    return marker;
  };

  GMaps.prototype.removeMarkers = function (collection) {
    var collection = collection || this.markers;

    for (var i = 0; i < this.markers.length; i++) {
      if (this.markers[i] === collection[i]) {
        this.markers[i].setMap(null);
      }
    }

    var new_markers = [];

    for (var i = 0; i < this.markers.length; i++) {
      if (this.markers[i].getMap() != null) {
        new_markers.push(this.markers[i]);
      }
    }

    this.markers = new_markers;
  };

  GMaps.prototype.drawOverlay = function (options) {
    var overlay = new google.maps.OverlayView(),
        auto_show = true;
    overlay.setMap(this.map);

    if (options.auto_show != null) {
      auto_show = options.auto_show;
    }

    overlay.onAdd = function () {
      var el = document.createElement('div');
      el.style.borderStyle = "none";
      el.style.borderWidth = "0px";
      el.style.position = "absolute";
      el.style.zIndex = 100;
      el.innerHTML = options.content;
      overlay.el = el;

      if (!options.layer) {
        options.layer = 'overlayLayer';
      }

      var panes = this.getPanes(),
          overlayLayer = panes[options.layer],
          stop_overlay_events = ['contextmenu', 'DOMMouseScroll', 'dblclick', 'mousedown'];
      overlayLayer.appendChild(el);

      for (var ev = 0; ev < stop_overlay_events.length; ev++) {
        (function (object, name) {
          google.maps.event.addDomListener(object, name, function (e) {
            if (navigator.userAgent.toLowerCase().indexOf('msie') != -1 && document.all) {
              e.cancelBubble = true;
              e.returnValue = false;
            } else {
              e.stopPropagation();
            }
          });
        })(el, stop_overlay_events[ev]);
      }

      google.maps.event.trigger(this, 'ready');
    };

    overlay.draw = function () {
      var projection = this.getProjection(),
          pixel = projection.fromLatLngToDivPixel(new google.maps.LatLng(options.lat, options.lng));
      options.horizontalOffset = options.horizontalOffset || 0;
      options.verticalOffset = options.verticalOffset || 0;
      var el = overlay.el,
          content = el.children[0],
          content_height = content.clientHeight,
          content_width = content.clientWidth;

      switch (options.verticalAlign) {
        case 'top':
          el.style.top = pixel.y - content_height + options.verticalOffset + 'px';
          break;

        default:
        case 'middle':
          el.style.top = pixel.y - content_height / 2 + options.verticalOffset + 'px';
          break;

        case 'bottom':
          el.style.top = pixel.y + options.verticalOffset + 'px';
          break;
      }

      switch (options.horizontalAlign) {
        case 'left':
          el.style.left = pixel.x - content_width + options.horizontalOffset + 'px';
          break;

        default:
        case 'center':
          el.style.left = pixel.x - content_width / 2 + options.horizontalOffset + 'px';
          break;

        case 'right':
          el.style.left = pixel.x + options.horizontalOffset + 'px';
          break;
      }

      el.style.display = auto_show ? 'block' : 'none';

      if (!auto_show) {
        options.show.apply(this, [el]);
      }
    };

    overlay.onRemove = function () {
      var el = overlay.el;

      if (options.remove) {
        options.remove.apply(this, [el]);
      } else {
        overlay.el.parentNode.removeChild(overlay.el);
        overlay.el = null;
      }
    };

    this.overlays.push(overlay);
    return overlay;
  };

  GMaps.prototype.removeOverlay = function (overlay) {
    for (var i = 0; i < this.overlays.length; i++) {
      if (this.overlays[i] === overlay) {
        this.overlays[i].setMap(null);
        this.overlays.splice(i, 1);
        break;
      }
    }
  };

  GMaps.prototype.removeOverlays = function () {
    for (var i = 0, item; item = this.overlays[i]; i++) {
      item.setMap(null);
    }

    this.overlays = [];
  };

  GMaps.prototype.drawPolyline = function (options) {
    var path = [],
        points = options.path;

    if (points.length) {
      if (points[0][0] === undefined) {
        path = points;
      } else {
        for (var i = 0, latlng; latlng = points[i]; i++) {
          path.push(new google.maps.LatLng(latlng[0], latlng[1]));
        }
      }
    }

    var polyline_options = {
      map: this.map,
      path: path,
      strokeColor: options.strokeColor,
      strokeOpacity: options.strokeOpacity,
      strokeWeight: options.strokeWeight,
      geodesic: options.geodesic,
      clickable: true,
      editable: false,
      visible: true
    };

    if (options.hasOwnProperty("clickable")) {
      polyline_options.clickable = options.clickable;
    }

    if (options.hasOwnProperty("editable")) {
      polyline_options.editable = options.editable;
    }

    if (options.hasOwnProperty("icons")) {
      polyline_options.icons = options.icons;
    }

    if (options.hasOwnProperty("zIndex")) {
      polyline_options.zIndex = options.zIndex;
    }

    var polyline = new google.maps.Polyline(polyline_options);
    var polyline_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

    for (var ev = 0; ev < polyline_events.length; ev++) {
      (function (object, name) {
        if (options[name]) {
          google.maps.event.addListener(object, name, function (e) {
            options[name].apply(this, [e]);
          });
        }
      })(polyline, polyline_events[ev]);
    }

    this.polylines.push(polyline);
    GMaps.fire('polyline_added', polyline, this);
    return polyline;
  };

  GMaps.prototype.removePolyline = function (polyline) {
    for (var i = 0; i < this.polylines.length; i++) {
      if (this.polylines[i] === polyline) {
        this.polylines[i].setMap(null);
        this.polylines.splice(i, 1);
        GMaps.fire('polyline_removed', polyline, this);
        break;
      }
    }
  };

  GMaps.prototype.removePolylines = function () {
    for (var i = 0, item; item = this.polylines[i]; i++) {
      item.setMap(null);
    }

    this.polylines = [];
  };

  GMaps.prototype.drawCircle = function (options) {
    options = extend_object({
      map: this.map,
      center: new google.maps.LatLng(options.lat, options.lng)
    }, options);
    delete options.lat;
    delete options.lng;
    var polygon = new google.maps.Circle(options),
        polygon_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

    for (var ev = 0; ev < polygon_events.length; ev++) {
      (function (object, name) {
        if (options[name]) {
          google.maps.event.addListener(object, name, function (e) {
            options[name].apply(this, [e]);
          });
        }
      })(polygon, polygon_events[ev]);
    }

    this.polygons.push(polygon);
    return polygon;
  };

  GMaps.prototype.drawRectangle = function (options) {
    options = extend_object({
      map: this.map
    }, options);
    var latLngBounds = new google.maps.LatLngBounds(new google.maps.LatLng(options.bounds[0][0], options.bounds[0][1]), new google.maps.LatLng(options.bounds[1][0], options.bounds[1][1]));
    options.bounds = latLngBounds;
    var polygon = new google.maps.Rectangle(options),
        polygon_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

    for (var ev = 0; ev < polygon_events.length; ev++) {
      (function (object, name) {
        if (options[name]) {
          google.maps.event.addListener(object, name, function (e) {
            options[name].apply(this, [e]);
          });
        }
      })(polygon, polygon_events[ev]);
    }

    this.polygons.push(polygon);
    return polygon;
  };

  GMaps.prototype.drawPolygon = function (options) {
    var useGeoJSON = false;

    if (options.hasOwnProperty("useGeoJSON")) {
      useGeoJSON = options.useGeoJSON;
    }

    delete options.useGeoJSON;
    options = extend_object({
      map: this.map
    }, options);

    if (useGeoJSON == false) {
      options.paths = [options.paths.slice(0)];
    }

    if (options.paths.length > 0) {
      if (options.paths[0].length > 0) {
        options.paths = array_flat(array_map(options.paths, arrayToLatLng, useGeoJSON));
      }
    }

    var polygon = new google.maps.Polygon(options),
        polygon_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

    for (var ev = 0; ev < polygon_events.length; ev++) {
      (function (object, name) {
        if (options[name]) {
          google.maps.event.addListener(object, name, function (e) {
            options[name].apply(this, [e]);
          });
        }
      })(polygon, polygon_events[ev]);
    }

    this.polygons.push(polygon);
    GMaps.fire('polygon_added', polygon, this);
    return polygon;
  };

  GMaps.prototype.removePolygon = function (polygon) {
    for (var i = 0; i < this.polygons.length; i++) {
      if (this.polygons[i] === polygon) {
        this.polygons[i].setMap(null);
        this.polygons.splice(i, 1);
        GMaps.fire('polygon_removed', polygon, this);
        break;
      }
    }
  };

  GMaps.prototype.removePolygons = function () {
    for (var i = 0, item; item = this.polygons[i]; i++) {
      item.setMap(null);
    }

    this.polygons = [];
  };

  GMaps.prototype.getFromFusionTables = function (options) {
    var events = options.events;
    delete options.events;
    var fusion_tables_options = options,
        layer = new google.maps.FusionTablesLayer(fusion_tables_options);

    for (var ev in events) {
      (function (object, name) {
        google.maps.event.addListener(object, name, function (e) {
          events[name].apply(this, [e]);
        });
      })(layer, ev);
    }

    this.layers.push(layer);
    return layer;
  };

  GMaps.prototype.loadFromFusionTables = function (options) {
    var layer = this.getFromFusionTables(options);
    layer.setMap(this.map);
    return layer;
  };

  GMaps.prototype.getFromKML = function (options) {
    var url = options.url,
        events = options.events;
    delete options.url;
    delete options.events;
    var kml_options = options,
        layer = new google.maps.KmlLayer(url, kml_options);

    for (var ev in events) {
      (function (object, name) {
        google.maps.event.addListener(object, name, function (e) {
          events[name].apply(this, [e]);
        });
      })(layer, ev);
    }

    this.layers.push(layer);
    return layer;
  };

  GMaps.prototype.loadFromKML = function (options) {
    var layer = this.getFromKML(options);
    layer.setMap(this.map);
    return layer;
  };

  GMaps.prototype.addLayer = function (layerName, options) {
    //var default_layers = ['weather', 'clouds', 'traffic', 'transit', 'bicycling', 'panoramio', 'places'];
    options = options || {};
    var layer;

    switch (layerName) {
      case 'weather':
        this.singleLayers.weather = layer = new google.maps.weather.WeatherLayer();
        break;

      case 'clouds':
        this.singleLayers.clouds = layer = new google.maps.weather.CloudLayer();
        break;

      case 'traffic':
        this.singleLayers.traffic = layer = new google.maps.TrafficLayer();
        break;

      case 'transit':
        this.singleLayers.transit = layer = new google.maps.TransitLayer();
        break;

      case 'bicycling':
        this.singleLayers.bicycling = layer = new google.maps.BicyclingLayer();
        break;

      case 'panoramio':
        this.singleLayers.panoramio = layer = new google.maps.panoramio.PanoramioLayer();
        layer.setTag(options.filter);
        delete options.filter; //click event

        if (options.click) {
          google.maps.event.addListener(layer, 'click', function (event) {
            options.click(event);
            delete options.click;
          });
        }

        break;

      case 'places':
        this.singleLayers.places = layer = new google.maps.places.PlacesService(this.map); //search and  nearbySearch callback, Both are the same

        if (options.search || options.nearbySearch) {
          var placeSearchRequest = {
            bounds: options.bounds || null,
            keyword: options.keyword || null,
            location: options.location || null,
            name: options.name || null,
            radius: options.radius || null,
            rankBy: options.rankBy || null,
            types: options.types || null
          };

          if (options.search) {
            layer.search(placeSearchRequest, options.search);
          }

          if (options.nearbySearch) {
            layer.nearbySearch(placeSearchRequest, options.nearbySearch);
          }
        } //textSearch callback


        if (options.textSearch) {
          var textSearchRequest = {
            bounds: options.bounds || null,
            location: options.location || null,
            query: options.query || null,
            radius: options.radius || null
          };
          layer.textSearch(textSearchRequest, options.textSearch);
        }

        break;
    }

    if (layer !== undefined) {
      if (typeof layer.setOptions == 'function') {
        layer.setOptions(options);
      }

      if (typeof layer.setMap == 'function') {
        layer.setMap(this.map);
      }

      return layer;
    }
  };

  GMaps.prototype.removeLayer = function (layer) {
    if (typeof layer == "string" && this.singleLayers[layer] !== undefined) {
      this.singleLayers[layer].setMap(null);
      delete this.singleLayers[layer];
    } else {
      for (var i = 0; i < this.layers.length; i++) {
        if (this.layers[i] === layer) {
          this.layers[i].setMap(null);
          this.layers.splice(i, 1);
          break;
        }
      }
    }
  };

  var travelMode, unitSystem;

  GMaps.prototype.getRoutes = function (options) {
    switch (options.travelMode) {
      case 'bicycling':
        travelMode = google.maps.TravelMode.BICYCLING;
        break;

      case 'transit':
        travelMode = google.maps.TravelMode.TRANSIT;
        break;

      case 'driving':
        travelMode = google.maps.TravelMode.DRIVING;
        break;

      default:
        travelMode = google.maps.TravelMode.WALKING;
        break;
    }

    if (options.unitSystem === 'imperial') {
      unitSystem = google.maps.UnitSystem.IMPERIAL;
    } else {
      unitSystem = google.maps.UnitSystem.METRIC;
    }

    var base_options = {
      avoidHighways: false,
      avoidTolls: false,
      optimizeWaypoints: false,
      waypoints: []
    },
        request_options = extend_object(base_options, options);
    request_options.origin = /string/.test(_typeof(options.origin)) ? options.origin : new google.maps.LatLng(options.origin[0], options.origin[1]);
    request_options.destination = /string/.test(_typeof(options.destination)) ? options.destination : new google.maps.LatLng(options.destination[0], options.destination[1]);
    request_options.travelMode = travelMode;
    request_options.unitSystem = unitSystem;
    delete request_options.callback;
    delete request_options.error;
    var self = this,
        service = new google.maps.DirectionsService();
    service.route(request_options, function (result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        for (var r in result.routes) {
          if (result.routes.hasOwnProperty(r)) {
            self.routes.push(result.routes[r]);
          }
        }

        if (options.callback) {
          options.callback(self.routes);
        }
      } else {
        if (options.error) {
          options.error(result, status);
        }
      }
    });
  };

  GMaps.prototype.removeRoutes = function () {
    this.routes = [];
  };

  GMaps.prototype.getElevations = function (options) {
    options = extend_object({
      locations: [],
      path: false,
      samples: 256
    }, options);

    if (options.locations.length > 0) {
      if (options.locations[0].length > 0) {
        options.locations = array_flat(array_map([options.locations], arrayToLatLng, false));
      }
    }

    var callback = options.callback;
    delete options.callback;
    var service = new google.maps.ElevationService(); //location request

    if (!options.path) {
      delete options.path;
      delete options.samples;
      service.getElevationForLocations(options, function (result, status) {
        if (callback && typeof callback === "function") {
          callback(result, status);
        }
      }); //path request
    } else {
      var pathRequest = {
        path: options.locations,
        samples: options.samples
      };
      service.getElevationAlongPath(pathRequest, function (result, status) {
        if (callback && typeof callback === "function") {
          callback(result, status);
        }
      });
    }
  };

  GMaps.prototype.cleanRoute = GMaps.prototype.removePolylines;

  GMaps.prototype.drawRoute = function (options) {
    var self = this;
    this.getRoutes({
      origin: options.origin,
      destination: options.destination,
      travelMode: options.travelMode,
      waypoints: options.waypoints,
      unitSystem: options.unitSystem,
      error: options.error,
      callback: function callback(e) {
        if (e.length > 0) {
          self.drawPolyline({
            path: e[e.length - 1].overview_path,
            strokeColor: options.strokeColor,
            strokeOpacity: options.strokeOpacity,
            strokeWeight: options.strokeWeight
          });

          if (options.callback) {
            options.callback(e[e.length - 1]);
          }
        }
      }
    });
  };

  GMaps.prototype.travelRoute = function (options) {
    if (options.origin && options.destination) {
      this.getRoutes({
        origin: options.origin,
        destination: options.destination,
        travelMode: options.travelMode,
        waypoints: options.waypoints,
        error: options.error,
        callback: function callback(e) {
          //start callback
          if (e.length > 0 && options.start) {
            options.start(e[e.length - 1]);
          } //step callback


          if (e.length > 0 && options.step) {
            var route = e[e.length - 1];

            if (route.legs.length > 0) {
              var steps = route.legs[0].steps;

              for (var i = 0, step; step = steps[i]; i++) {
                step.step_number = i;
                options.step(step, route.legs[0].steps.length - 1);
              }
            }
          } //end callback


          if (e.length > 0 && options.end) {
            options.end(e[e.length - 1]);
          }
        }
      });
    } else if (options.route) {
      if (options.route.legs.length > 0) {
        var steps = options.route.legs[0].steps;

        for (var i = 0, step; step = steps[i]; i++) {
          step.step_number = i;
          options.step(step);
        }
      }
    }
  };

  GMaps.prototype.drawSteppedRoute = function (options) {
    var self = this;

    if (options.origin && options.destination) {
      this.getRoutes({
        origin: options.origin,
        destination: options.destination,
        travelMode: options.travelMode,
        waypoints: options.waypoints,
        error: options.error,
        callback: function callback(e) {
          //start callback
          if (e.length > 0 && options.start) {
            options.start(e[e.length - 1]);
          } //step callback


          if (e.length > 0 && options.step) {
            var route = e[e.length - 1];

            if (route.legs.length > 0) {
              var steps = route.legs[0].steps;

              for (var i = 0, step; step = steps[i]; i++) {
                step.step_number = i;
                self.drawPolyline({
                  path: step.path,
                  strokeColor: options.strokeColor,
                  strokeOpacity: options.strokeOpacity,
                  strokeWeight: options.strokeWeight
                });
                options.step(step, route.legs[0].steps.length - 1);
              }
            }
          } //end callback


          if (e.length > 0 && options.end) {
            options.end(e[e.length - 1]);
          }
        }
      });
    } else if (options.route) {
      if (options.route.legs.length > 0) {
        var steps = options.route.legs[0].steps;

        for (var i = 0, step; step = steps[i]; i++) {
          step.step_number = i;
          self.drawPolyline({
            path: step.path,
            strokeColor: options.strokeColor,
            strokeOpacity: options.strokeOpacity,
            strokeWeight: options.strokeWeight
          });
          options.step(step);
        }
      }
    }
  };

  GMaps.Route = function (options) {
    this.origin = options.origin;
    this.destination = options.destination;
    this.waypoints = options.waypoints;
    this.map = options.map;
    this.route = options.route;
    this.step_count = 0;
    this.steps = this.route.legs[0].steps;
    this.steps_length = this.steps.length;
    this.polyline = this.map.drawPolyline({
      path: new google.maps.MVCArray(),
      strokeColor: options.strokeColor,
      strokeOpacity: options.strokeOpacity,
      strokeWeight: options.strokeWeight
    }).getPath();
  };

  GMaps.Route.prototype.getRoute = function (options) {
    var self = this;
    this.map.getRoutes({
      origin: this.origin,
      destination: this.destination,
      travelMode: options.travelMode,
      waypoints: this.waypoints || [],
      error: options.error,
      callback: function callback() {
        self.route = e[0];

        if (options.callback) {
          options.callback.call(self);
        }
      }
    });
  };

  GMaps.Route.prototype.back = function () {
    if (this.step_count > 0) {
      this.step_count--;
      var path = this.route.legs[0].steps[this.step_count].path;

      for (var p in path) {
        if (path.hasOwnProperty(p)) {
          this.polyline.pop();
        }
      }
    }
  };

  GMaps.Route.prototype.forward = function () {
    if (this.step_count < this.steps_length) {
      var path = this.route.legs[0].steps[this.step_count].path;

      for (var p in path) {
        if (path.hasOwnProperty(p)) {
          this.polyline.push(path[p]);
        }
      }

      this.step_count++;
    }
  };

  GMaps.prototype.checkGeofence = function (lat, lng, fence) {
    return fence.containsLatLng(new google.maps.LatLng(lat, lng));
  };

  GMaps.prototype.checkMarkerGeofence = function (marker, outside_callback) {
    if (marker.fences) {
      for (var i = 0, fence; fence = marker.fences[i]; i++) {
        var pos = marker.getPosition();

        if (!this.checkGeofence(pos.lat(), pos.lng(), fence)) {
          outside_callback(marker, fence);
        }
      }
    }
  };

  GMaps.prototype.toImage = function (options) {
    var options = options || {},
        static_map_options = {};
    static_map_options['size'] = options['size'] || [this.el.clientWidth, this.el.clientHeight];
    static_map_options['lat'] = this.getCenter().lat();
    static_map_options['lng'] = this.getCenter().lng();

    if (this.markers.length > 0) {
      static_map_options['markers'] = [];

      for (var i = 0; i < this.markers.length; i++) {
        static_map_options['markers'].push({
          lat: this.markers[i].getPosition().lat(),
          lng: this.markers[i].getPosition().lng()
        });
      }
    }

    if (this.polylines.length > 0) {
      var polyline = this.polylines[0];
      static_map_options['polyline'] = {};
      static_map_options['polyline']['path'] = google.maps.geometry.encoding.encodePath(polyline.getPath());
      static_map_options['polyline']['strokeColor'] = polyline.strokeColor;
      static_map_options['polyline']['strokeOpacity'] = polyline.strokeOpacity;
      static_map_options['polyline']['strokeWeight'] = polyline.strokeWeight;
    }

    return GMaps.staticMapURL(static_map_options);
  };

  GMaps.staticMapURL = function (options) {
    var parameters = [],
        data,
        static_root = 'http://maps.googleapis.com/maps/api/staticmap';

    if (options.url) {
      static_root = options.url;
      delete options.url;
    }

    static_root += '?';
    var markers = options.markers;
    delete options.markers;

    if (!markers && options.marker) {
      markers = [options.marker];
      delete options.marker;
    }

    var styles = options.styles;
    delete options.styles;
    var polyline = options.polyline;
    delete options.polyline;
    /** Map options **/

    if (options.center) {
      parameters.push('center=' + options.center);
      delete options.center;
    } else if (options.address) {
      parameters.push('center=' + options.address);
      delete options.address;
    } else if (options.lat) {
      parameters.push(['center=', options.lat, ',', options.lng].join(''));
      delete options.lat;
      delete options.lng;
    } else if (options.visible) {
      var visible = encodeURI(options.visible.join('|'));
      parameters.push('visible=' + visible);
    }

    var size = options.size;

    if (size) {
      if (size.join) {
        size = size.join('x');
      }

      delete options.size;
    } else {
      size = '630x300';
    }

    parameters.push('size=' + size);

    if (!options.zoom && options.zoom !== false) {
      options.zoom = 15;
    }

    var sensor = options.hasOwnProperty('sensor') ? !!options.sensor : true;
    delete options.sensor;
    parameters.push('sensor=' + sensor);

    for (var param in options) {
      if (options.hasOwnProperty(param)) {
        parameters.push(param + '=' + options[param]);
      }
    }
    /** Markers **/


    if (markers) {
      var marker, loc;

      for (var i = 0; data = markers[i]; i++) {
        marker = [];

        if (data.size && data.size !== 'normal') {
          marker.push('size:' + data.size);
          delete data.size;
        } else if (data.icon) {
          marker.push('icon:' + encodeURI(data.icon));
          delete data.icon;
        }

        if (data.color) {
          marker.push('color:' + data.color.replace('#', '0x'));
          delete data.color;
        }

        if (data.label) {
          marker.push('label:' + data.label[0].toUpperCase());
          delete data.label;
        }

        loc = data.address ? data.address : data.lat + ',' + data.lng;
        delete data.address;
        delete data.lat;
        delete data.lng;

        for (var param in data) {
          if (data.hasOwnProperty(param)) {
            marker.push(param + ':' + data[param]);
          }
        }

        if (marker.length || i === 0) {
          marker.push(loc);
          marker = marker.join('|');
          parameters.push('markers=' + encodeURI(marker));
        } // New marker without styles
        else {
            marker = parameters.pop() + encodeURI('|' + loc);
            parameters.push(marker);
          }
      }
    }
    /** Map Styles **/


    if (styles) {
      for (var i = 0; i < styles.length; i++) {
        var styleRule = [];

        if (styles[i].featureType && styles[i].featureType != 'all') {
          styleRule.push('feature:' + styles[i].featureType);
        }

        if (styles[i].elementType && styles[i].elementType != 'all') {
          styleRule.push('element:' + styles[i].elementType);
        }

        for (var j = 0; j < styles[i].stylers.length; j++) {
          for (var p in styles[i].stylers[j]) {
            var ruleArg = styles[i].stylers[j][p];

            if (p == 'hue' || p == 'color') {
              ruleArg = '0x' + ruleArg.substring(1);
            }

            styleRule.push(p + ':' + ruleArg);
          }
        }

        var rule = styleRule.join('|');

        if (rule != '') {
          parameters.push('style=' + rule);
        }
      }
    }
    /** Polylines **/


    function parseColor(color, opacity) {
      if (color[0] === '#') {
        color = color.replace('#', '0x');

        if (opacity) {
          opacity = parseFloat(opacity);
          opacity = Math.min(1, Math.max(opacity, 0));

          if (opacity === 0) {
            return '0x00000000';
          }

          opacity = (opacity * 255).toString(16);

          if (opacity.length === 1) {
            opacity += opacity;
          }

          color = color.slice(0, 8) + opacity;
        }
      }

      return color;
    }

    if (polyline) {
      data = polyline;
      polyline = [];

      if (data.strokeWeight) {
        polyline.push('weight:' + parseInt(data.strokeWeight, 10));
      }

      if (data.strokeColor) {
        var color = parseColor(data.strokeColor, data.strokeOpacity);
        polyline.push('color:' + color);
      }

      if (data.fillColor) {
        var fillcolor = parseColor(data.fillColor, data.fillOpacity);
        polyline.push('fillcolor:' + fillcolor);
      }

      var path = data.path;

      if (path.join) {
        for (var j = 0, pos; pos = path[j]; j++) {
          polyline.push(pos.join(','));
        }
      } else {
        polyline.push('enc:' + path);
      }

      polyline = polyline.join('|');
      parameters.push('path=' + encodeURI(polyline));
    }
    /** Retina support **/


    var dpi = window.devicePixelRatio || 1;
    parameters.push('scale=' + dpi);
    parameters = parameters.join('&');
    return static_root + parameters;
  };

  GMaps.prototype.addMapType = function (mapTypeId, options) {
    if (options.hasOwnProperty("getTileUrl") && typeof options["getTileUrl"] == "function") {
      options.tileSize = options.tileSize || new google.maps.Size(256, 256);
      var mapType = new google.maps.ImageMapType(options);
      this.map.mapTypes.set(mapTypeId, mapType);
    } else {
      throw "'getTileUrl' function required.";
    }
  };

  GMaps.prototype.addOverlayMapType = function (options) {
    if (options.hasOwnProperty("getTile") && typeof options["getTile"] == "function") {
      var overlayMapTypeIndex = options.index;
      delete options.index;
      this.map.overlayMapTypes.insertAt(overlayMapTypeIndex, options);
    } else {
      throw "'getTile' function required.";
    }
  };

  GMaps.prototype.removeOverlayMapType = function (overlayMapTypeIndex) {
    this.map.overlayMapTypes.removeAt(overlayMapTypeIndex);
  };

  GMaps.prototype.addStyle = function (options) {
    var styledMapType = new google.maps.StyledMapType(options.styles, {
      name: options.styledMapName
    });
    this.map.mapTypes.set(options.mapTypeId, styledMapType);
  };

  GMaps.prototype.setStyle = function (mapTypeId) {
    this.map.setMapTypeId(mapTypeId);
  };

  GMaps.prototype.createPanorama = function (streetview_options) {
    if (!streetview_options.hasOwnProperty('lat') || !streetview_options.hasOwnProperty('lng')) {
      streetview_options.lat = this.getCenter().lat();
      streetview_options.lng = this.getCenter().lng();
    }

    this.panorama = GMaps.createPanorama(streetview_options);
    this.map.setStreetView(this.panorama);
    return this.panorama;
  };

  GMaps.createPanorama = function (options) {
    var el = getElementById(options.el, options.context);
    options.position = new google.maps.LatLng(options.lat, options.lng);
    delete options.el;
    delete options.context;
    delete options.lat;
    delete options.lng;
    var streetview_events = ['closeclick', 'links_changed', 'pano_changed', 'position_changed', 'pov_changed', 'resize', 'visible_changed'],
        streetview_options = extend_object({
      visible: true
    }, options);

    for (var i = 0; i < streetview_events.length; i++) {
      delete streetview_options[streetview_events[i]];
    }

    var panorama = new google.maps.StreetViewPanorama(el, streetview_options);

    for (var i = 0; i < streetview_events.length; i++) {
      (function (object, name) {
        if (options[name]) {
          google.maps.event.addListener(object, name, function () {
            options[name].apply(this);
          });
        }
      })(panorama, streetview_events[i]);
    }

    return panorama;
  };

  GMaps.prototype.on = function (event_name, handler) {
    return GMaps.on(event_name, this, handler);
  };

  GMaps.prototype.off = function (event_name) {
    GMaps.off(event_name, this);
  };

  GMaps.custom_events = ['marker_added', 'marker_removed', 'polyline_added', 'polyline_removed', 'polygon_added', 'polygon_removed', 'geolocated', 'geolocation_failed'];

  GMaps.on = function (event_name, object, handler) {
    if (GMaps.custom_events.indexOf(event_name) == -1) {
      return google.maps.event.addListener(object, event_name, handler);
    } else {
      var registered_event = {
        handler: handler,
        eventName: event_name
      };
      object.registered_events[event_name] = object.registered_events[event_name] || [];
      object.registered_events[event_name].push(registered_event);
      return registered_event;
    }
  };

  GMaps.off = function (event_name, object) {
    if (GMaps.custom_events.indexOf(event_name) == -1) {
      google.maps.event.clearListeners(object, event_name);
    } else {
      object.registered_events[event_name] = [];
    }
  };

  GMaps.fire = function (event_name, object, scope) {
    if (GMaps.custom_events.indexOf(event_name) == -1) {
      google.maps.event.trigger(object, event_name, Array.prototype.slice.apply(arguments).slice(2));
    } else {
      if (event_name in scope.registered_events) {
        var firing_events = scope.registered_events[event_name];

        for (var i = 0; i < firing_events.length; i++) {
          (function (handler, scope, object) {
            handler.apply(scope, [object]);
          })(firing_events[i]['handler'], scope, object);
        }
      }
    }
  };

  GMaps.geolocate = function (options) {
    var complete_callback = options.always || options.complete;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        options.success(position);

        if (complete_callback) {
          complete_callback();
        }
      }, function (error) {
        options.error(error);

        if (complete_callback) {
          complete_callback();
        }
      }, options.options);
    } else {
      options.not_supported();

      if (complete_callback) {
        complete_callback();
      }
    }
  };

  GMaps.geocode = function (options) {
    this.geocoder = new google.maps.Geocoder();
    var callback = options.callback;

    if (options.hasOwnProperty('lat') && options.hasOwnProperty('lng')) {
      options.latLng = new google.maps.LatLng(options.lat, options.lng);
    }

    delete options.lat;
    delete options.lng;
    delete options.callback;
    this.geocoder.geocode(options, function (results, status) {
      callback(results, status);
    });
  }; //==========================
  // Polygon containsLatLng
  // https://github.com/tparkin/Google-Maps-Point-in-Polygon
  // Poygon getBounds extension - google-maps-extensions
  // http://code.google.com/p/google-maps-extensions/source/browse/google.maps.Polygon.getBounds.js


  if (!google.maps.Polygon.prototype.getBounds) {
    google.maps.Polygon.prototype.getBounds = function (latLng) {
      var bounds = new google.maps.LatLngBounds();
      var paths = this.getPaths();
      var path;

      for (var p = 0; p < paths.getLength(); p++) {
        path = paths.getAt(p);

        for (var i = 0; i < path.getLength(); i++) {
          bounds.extend(path.getAt(i));
        }
      }

      return bounds;
    };
  }

  if (!google.maps.Polygon.prototype.containsLatLng) {
    // Polygon containsLatLng - method to determine if a latLng is within a polygon
    google.maps.Polygon.prototype.containsLatLng = function (latLng) {
      // Exclude points outside of bounds as there is no way they are in the poly
      var bounds = this.getBounds();

      if (bounds !== null && !bounds.contains(latLng)) {
        return false;
      } // Raycast point in polygon method


      var inPoly = false;
      var numPaths = this.getPaths().getLength();

      for (var p = 0; p < numPaths; p++) {
        var path = this.getPaths().getAt(p);
        var numPoints = path.getLength();
        var j = numPoints - 1;

        for (var i = 0; i < numPoints; i++) {
          var vertex1 = path.getAt(i);
          var vertex2 = path.getAt(j);

          if (vertex1.lng() < latLng.lng() && vertex2.lng() >= latLng.lng() || vertex2.lng() < latLng.lng() && vertex1.lng() >= latLng.lng()) {
            if (vertex1.lat() + (latLng.lng() - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < latLng.lat()) {
              inPoly = !inPoly;
            }
          }

          j = i;
        }
      }

      return inPoly;
    };
  }

  google.maps.LatLngBounds.prototype.containsLatLng = function (latLng) {
    return this.contains(latLng);
  };

  google.maps.Marker.prototype.setFences = function (fences) {
    this.fences = fences;
  };

  google.maps.Marker.prototype.addFence = function (fence) {
    this.fences.push(fence);
  };

  google.maps.Marker.prototype.getId = function () {
    return this['__gm_id'];
  }; //==========================
  // Array indexOf
  // https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf


  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement
    /*, fromIndex */
    ) {
      "use strict";

      if (this == null) {
        throw new TypeError();
      }

      var t = Object(this);
      var len = t.length >>> 0;

      if (len === 0) {
        return -1;
      }

      var n = 0;

      if (arguments.length > 1) {
        n = Number(arguments[1]);

        if (n != n) {
          // shortcut for verifying if it's NaN
          n = 0;
        } else if (n != 0 && n != Infinity && n != -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }

      if (n >= len) {
        return -1;
      }

      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);

      for (; k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }

      return -1;
    };
  }

  return GMaps;
});

/***/ })

},[["./assets/js/gmaps.js","runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZ21hcHMuanMiXSwibmFtZXMiOlsicm9vdCIsImZhY3RvcnkiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiR01hcHMiLCJ3aW5kb3ciLCJnb29nbGUiLCJtYXBzIiwiZXh0ZW5kX29iamVjdCIsIm9iaiIsIm5ld19vYmoiLCJuYW1lIiwicmVwbGFjZV9vYmplY3QiLCJyZXBsYWNlIiwidW5kZWZpbmVkIiwiYXJyYXlfbWFwIiwiYXJyYXkiLCJjYWxsYmFjayIsIm9yaWdpbmFsX2NhbGxiYWNrX3BhcmFtcyIsIkFycmF5IiwicHJvdG90eXBlIiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwiYXJyYXlfcmV0dXJuIiwiYXJyYXlfbGVuZ3RoIiwibGVuZ3RoIiwiaSIsIm1hcCIsIml0ZW0iLCJjYWxsYmFja19wYXJhbXMiLCJzcGxpY2UiLCJhcHBseSIsInB1c2giLCJhcnJheV9mbGF0IiwibmV3X2FycmF5IiwiY29uY2F0IiwiY29vcmRzVG9MYXRMbmdzIiwiY29vcmRzIiwidXNlR2VvSlNPTiIsImZpcnN0X2Nvb3JkIiwic2Vjb25kX2Nvb3JkIiwiTGF0TG5nIiwiYXJyYXlUb0xhdExuZyIsImdldEVsZW1lbnRCeUlkIiwiaWQiLCJjb250ZXh0IiwiZWxlbWVudCIsIiQiLCJkb2N1bWVudCIsImZpbmRBYnNvbHV0ZVBvc2l0aW9uIiwiY3VybGVmdCIsImN1cnRvcCIsIm9mZnNldFBhcmVudCIsIm9mZnNldExlZnQiLCJvZmZzZXRUb3AiLCJnbG9iYWwiLCJkb2MiLCJvcHRpb25zIiwiem9vbSIsIm1hcFR5cGUiLCJzZWxmIiwiZXZlbnRzX3RoYXRfaGlkZV9jb250ZXh0X21lbnUiLCJldmVudHNfdGhhdF9kb2VzbnRfaGlkZV9jb250ZXh0X21lbnUiLCJvcHRpb25zX3RvX2JlX2RlbGV0ZWQiLCJjb250YWluZXJfaWQiLCJlbCIsImRpdiIsIm1hcmtlckNsdXN0ZXJlckZ1bmN0aW9uIiwibWFya2VyQ2x1c3RlcmVyIiwiTWFwVHlwZUlkIiwidG9VcHBlckNhc2UiLCJtYXBfY2VudGVyIiwibGF0IiwibG5nIiwiem9vbUNvbnRyb2wiLCJ6b29tQ29udHJvbE9wdCIsInN0eWxlIiwicG9zaXRpb24iLCJ6b29tQ29udHJvbFN0eWxlIiwiem9vbUNvbnRyb2xQb3NpdGlvbiIsInBhbkNvbnRyb2wiLCJtYXBUeXBlQ29udHJvbCIsInNjYWxlQ29udHJvbCIsInN0cmVldFZpZXdDb250cm9sIiwib3ZlcnZpZXdNYXBDb250cm9sIiwibWFwX29wdGlvbnMiLCJtYXBfYmFzZV9vcHRpb25zIiwiY2VudGVyIiwibWFwVHlwZUlkIiwibWFwX2NvbnRyb2xzX29wdGlvbnMiLCJ6b29tQ29udHJvbE9wdGlvbnMiLCJab29tQ29udHJvbFN0eWxlIiwiQ29udHJvbFBvc2l0aW9uIiwiY29udGV4dF9tZW51IiwiY29udHJvbHMiLCJvdmVybGF5cyIsImxheWVycyIsInNpbmdsZUxheWVycyIsIm1hcmtlcnMiLCJwb2x5bGluZXMiLCJyb3V0ZXMiLCJwb2x5Z29ucyIsImluZm9XaW5kb3ciLCJvdmVybGF5X2VsIiwicmVnaXN0ZXJlZF9ldmVudHMiLCJ3aWR0aCIsInNjcm9sbFdpZHRoIiwib2Zmc2V0V2lkdGgiLCJoZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJ2aXN1YWxSZWZyZXNoIiwiZW5hYmxlTmV3U3R5bGUiLCJkaXNhYmxlRGVmYXVsdFVJIiwiTWFwIiwiYnVpbGRDb250ZXh0TWVudUhUTUwiLCJjb250cm9sIiwiZSIsImh0bWwiLCJoYXNPd25Qcm9wZXJ0eSIsIm9wdGlvbiIsInRpdGxlIiwiY29udGV4dF9tZW51X2VsZW1lbnQiLCJpbm5lckhUTUwiLCJjb250ZXh0X21lbnVfaXRlbXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNvbnRleHRfbWVudV9pdGVtc19jb3VudCIsImNvbnRleHRfbWVudV9pdGVtIiwiYXNzaWduX21lbnVfaXRlbV9hY3Rpb24iLCJldiIsInByZXZlbnREZWZhdWx0IiwiYWN0aW9uIiwiaGlkZUNvbnRleHRNZW51IiwiZXZlbnQiLCJjbGVhckxpc3RlbmVycyIsImFkZERvbUxpc3RlbmVyT25jZSIsImxlZnQiLCJwaXhlbCIsIngiLCJ0b3AiLCJ5IiwiZGlzcGxheSIsImJ1aWxkQ29udGV4dE1lbnUiLCJvdmVybGF5IiwiT3ZlcmxheVZpZXciLCJzZXRNYXAiLCJkcmF3IiwicHJvamVjdGlvbiIsImdldFByb2plY3Rpb24iLCJtYXJrZXIiLCJnZXRQb3NpdGlvbiIsImZyb21MYXRMbmdUb0NvbnRhaW5lclBpeGVsIiwic2V0Q29udGV4dE1lbnUiLCJ1bCIsImNyZWF0ZUVsZW1lbnQiLCJtaW5XaWR0aCIsImJhY2tncm91bmQiLCJsaXN0U3R5bGUiLCJwYWRkaW5nIiwiYm94U2hhZG93IiwiYm9keSIsImFwcGVuZENoaWxkIiwiYWRkRG9tTGlzdGVuZXIiLCJyZWxhdGVkVGFyZ2V0IiwiY29udGFpbnMiLCJzZXRUaW1lb3V0Iiwic2V0dXBMaXN0ZW5lciIsIm9iamVjdCIsImFkZExpc3RlbmVyIiwicmlnaHRjbGljayIsInJlZnJlc2giLCJ0cmlnZ2VyIiwiZml0Wm9vbSIsImxhdExuZ3MiLCJtYXJrZXJzX2xlbmd0aCIsInZpc2libGUiLCJmaXRMYXRMbmdCb3VuZHMiLCJ0b3RhbCIsImJvdW5kcyIsIkxhdExuZ0JvdW5kcyIsImV4dGVuZCIsImZpdEJvdW5kcyIsInNldENlbnRlciIsInBhblRvIiwiZ2V0RWxlbWVudCIsInpvb21JbiIsInZhbHVlIiwiZ2V0Wm9vbSIsInNldFpvb20iLCJ6b29tT3V0IiwibmF0aXZlX21ldGhvZHMiLCJtZXRob2QiLCJnbWFwcyIsInNjb3BlIiwibWV0aG9kX25hbWUiLCJjcmVhdGVDb250cm9sIiwiY3Vyc29yIiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiY2xhc3NlcyIsImNsYXNzTmFtZSIsImNvbnRlbnQiLCJldmVudHMiLCJpbmRleCIsImFkZENvbnRyb2wiLCJjcmVhdGVNYXJrZXIiLCJkZXRhaWxzIiwiZmVuY2VzIiwib3V0c2lkZSIsImJhc2Vfb3B0aW9ucyIsIm1hcmtlcl9vcHRpb25zIiwiTWFya2VyIiwiSW5mb1dpbmRvdyIsImluZm9fd2luZG93X2V2ZW50cyIsIm1hcmtlcl9ldmVudHMiLCJtYXJrZXJfZXZlbnRzX3dpdGhfbW91c2UiLCJtZSIsImZyb21MYXRMbmdUb1BvaW50IiwibGF0TG5nIiwiY2xpY2siLCJoaWRlSW5mb1dpbmRvd3MiLCJvcGVuIiwiY2hlY2tNYXJrZXJHZW9mZW5jZSIsIm0iLCJmIiwiYWRkTWFya2VyIiwiZmlyZSIsImFkZE1hcmtlcnMiLCJjbG9zZSIsInJlbW92ZU1hcmtlciIsInJlbW92ZU1hcmtlcnMiLCJjb2xsZWN0aW9uIiwibmV3X21hcmtlcnMiLCJnZXRNYXAiLCJkcmF3T3ZlcmxheSIsImF1dG9fc2hvdyIsIm9uQWRkIiwiYm9yZGVyU3R5bGUiLCJib3JkZXJXaWR0aCIsInpJbmRleCIsImxheWVyIiwicGFuZXMiLCJnZXRQYW5lcyIsIm92ZXJsYXlMYXllciIsInN0b3Bfb3ZlcmxheV9ldmVudHMiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJhbGwiLCJjYW5jZWxCdWJibGUiLCJyZXR1cm5WYWx1ZSIsInN0b3BQcm9wYWdhdGlvbiIsImZyb21MYXRMbmdUb0RpdlBpeGVsIiwiaG9yaXpvbnRhbE9mZnNldCIsInZlcnRpY2FsT2Zmc2V0IiwiY2hpbGRyZW4iLCJjb250ZW50X2hlaWdodCIsImNsaWVudEhlaWdodCIsImNvbnRlbnRfd2lkdGgiLCJjbGllbnRXaWR0aCIsInZlcnRpY2FsQWxpZ24iLCJob3Jpem9udGFsQWxpZ24iLCJzaG93Iiwib25SZW1vdmUiLCJyZW1vdmUiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJyZW1vdmVPdmVybGF5IiwicmVtb3ZlT3ZlcmxheXMiLCJkcmF3UG9seWxpbmUiLCJwYXRoIiwicG9pbnRzIiwibGF0bG5nIiwicG9seWxpbmVfb3B0aW9ucyIsInN0cm9rZUNvbG9yIiwic3Ryb2tlT3BhY2l0eSIsInN0cm9rZVdlaWdodCIsImdlb2Rlc2ljIiwiY2xpY2thYmxlIiwiZWRpdGFibGUiLCJpY29ucyIsInBvbHlsaW5lIiwiUG9seWxpbmUiLCJwb2x5bGluZV9ldmVudHMiLCJyZW1vdmVQb2x5bGluZSIsInJlbW92ZVBvbHlsaW5lcyIsImRyYXdDaXJjbGUiLCJwb2x5Z29uIiwiQ2lyY2xlIiwicG9seWdvbl9ldmVudHMiLCJkcmF3UmVjdGFuZ2xlIiwibGF0TG5nQm91bmRzIiwiUmVjdGFuZ2xlIiwiZHJhd1BvbHlnb24iLCJwYXRocyIsIlBvbHlnb24iLCJyZW1vdmVQb2x5Z29uIiwicmVtb3ZlUG9seWdvbnMiLCJnZXRGcm9tRnVzaW9uVGFibGVzIiwiZnVzaW9uX3RhYmxlc19vcHRpb25zIiwiRnVzaW9uVGFibGVzTGF5ZXIiLCJsb2FkRnJvbUZ1c2lvblRhYmxlcyIsImdldEZyb21LTUwiLCJ1cmwiLCJrbWxfb3B0aW9ucyIsIkttbExheWVyIiwibG9hZEZyb21LTUwiLCJhZGRMYXllciIsImxheWVyTmFtZSIsIndlYXRoZXIiLCJXZWF0aGVyTGF5ZXIiLCJjbG91ZHMiLCJDbG91ZExheWVyIiwidHJhZmZpYyIsIlRyYWZmaWNMYXllciIsInRyYW5zaXQiLCJUcmFuc2l0TGF5ZXIiLCJiaWN5Y2xpbmciLCJCaWN5Y2xpbmdMYXllciIsInBhbm9yYW1pbyIsIlBhbm9yYW1pb0xheWVyIiwic2V0VGFnIiwiZmlsdGVyIiwicGxhY2VzIiwiUGxhY2VzU2VydmljZSIsInNlYXJjaCIsIm5lYXJieVNlYXJjaCIsInBsYWNlU2VhcmNoUmVxdWVzdCIsImtleXdvcmQiLCJsb2NhdGlvbiIsInJhZGl1cyIsInJhbmtCeSIsInR5cGVzIiwidGV4dFNlYXJjaCIsInRleHRTZWFyY2hSZXF1ZXN0IiwicXVlcnkiLCJzZXRPcHRpb25zIiwicmVtb3ZlTGF5ZXIiLCJ0cmF2ZWxNb2RlIiwidW5pdFN5c3RlbSIsImdldFJvdXRlcyIsIlRyYXZlbE1vZGUiLCJCSUNZQ0xJTkciLCJUUkFOU0lUIiwiRFJJVklORyIsIldBTEtJTkciLCJVbml0U3lzdGVtIiwiSU1QRVJJQUwiLCJNRVRSSUMiLCJhdm9pZEhpZ2h3YXlzIiwiYXZvaWRUb2xscyIsIm9wdGltaXplV2F5cG9pbnRzIiwid2F5cG9pbnRzIiwicmVxdWVzdF9vcHRpb25zIiwib3JpZ2luIiwidGVzdCIsImRlc3RpbmF0aW9uIiwiZXJyb3IiLCJzZXJ2aWNlIiwiRGlyZWN0aW9uc1NlcnZpY2UiLCJyb3V0ZSIsInJlc3VsdCIsInN0YXR1cyIsIkRpcmVjdGlvbnNTdGF0dXMiLCJPSyIsInIiLCJyZW1vdmVSb3V0ZXMiLCJnZXRFbGV2YXRpb25zIiwibG9jYXRpb25zIiwic2FtcGxlcyIsIkVsZXZhdGlvblNlcnZpY2UiLCJnZXRFbGV2YXRpb25Gb3JMb2NhdGlvbnMiLCJwYXRoUmVxdWVzdCIsImdldEVsZXZhdGlvbkFsb25nUGF0aCIsImNsZWFuUm91dGUiLCJkcmF3Um91dGUiLCJvdmVydmlld19wYXRoIiwidHJhdmVsUm91dGUiLCJzdGFydCIsInN0ZXAiLCJsZWdzIiwic3RlcHMiLCJzdGVwX251bWJlciIsImVuZCIsImRyYXdTdGVwcGVkUm91dGUiLCJSb3V0ZSIsInN0ZXBfY291bnQiLCJzdGVwc19sZW5ndGgiLCJNVkNBcnJheSIsImdldFBhdGgiLCJnZXRSb3V0ZSIsImJhY2siLCJwIiwicG9wIiwiZm9yd2FyZCIsImNoZWNrR2VvZmVuY2UiLCJmZW5jZSIsImNvbnRhaW5zTGF0TG5nIiwib3V0c2lkZV9jYWxsYmFjayIsInBvcyIsInRvSW1hZ2UiLCJzdGF0aWNfbWFwX29wdGlvbnMiLCJnZXRDZW50ZXIiLCJnZW9tZXRyeSIsImVuY29kaW5nIiwiZW5jb2RlUGF0aCIsInN0YXRpY01hcFVSTCIsInBhcmFtZXRlcnMiLCJkYXRhIiwic3RhdGljX3Jvb3QiLCJzdHlsZXMiLCJhZGRyZXNzIiwiam9pbiIsImVuY29kZVVSSSIsInNpemUiLCJzZW5zb3IiLCJwYXJhbSIsImxvYyIsImljb24iLCJjb2xvciIsImxhYmVsIiwic3R5bGVSdWxlIiwiZmVhdHVyZVR5cGUiLCJlbGVtZW50VHlwZSIsImoiLCJzdHlsZXJzIiwicnVsZUFyZyIsInN1YnN0cmluZyIsInJ1bGUiLCJwYXJzZUNvbG9yIiwib3BhY2l0eSIsInBhcnNlRmxvYXQiLCJNYXRoIiwibWluIiwibWF4IiwidG9TdHJpbmciLCJwYXJzZUludCIsImZpbGxDb2xvciIsImZpbGxjb2xvciIsImZpbGxPcGFjaXR5IiwiZHBpIiwiZGV2aWNlUGl4ZWxSYXRpbyIsImFkZE1hcFR5cGUiLCJ0aWxlU2l6ZSIsIlNpemUiLCJJbWFnZU1hcFR5cGUiLCJtYXBUeXBlcyIsInNldCIsImFkZE92ZXJsYXlNYXBUeXBlIiwib3ZlcmxheU1hcFR5cGVJbmRleCIsIm92ZXJsYXlNYXBUeXBlcyIsImluc2VydEF0IiwicmVtb3ZlT3ZlcmxheU1hcFR5cGUiLCJyZW1vdmVBdCIsImFkZFN0eWxlIiwic3R5bGVkTWFwVHlwZSIsIlN0eWxlZE1hcFR5cGUiLCJzdHlsZWRNYXBOYW1lIiwic2V0U3R5bGUiLCJzZXRNYXBUeXBlSWQiLCJjcmVhdGVQYW5vcmFtYSIsInN0cmVldHZpZXdfb3B0aW9ucyIsInBhbm9yYW1hIiwic2V0U3RyZWV0VmlldyIsInN0cmVldHZpZXdfZXZlbnRzIiwiU3RyZWV0Vmlld1Bhbm9yYW1hIiwib24iLCJldmVudF9uYW1lIiwiaGFuZGxlciIsIm9mZiIsImN1c3RvbV9ldmVudHMiLCJyZWdpc3RlcmVkX2V2ZW50IiwiZXZlbnROYW1lIiwiZmlyaW5nX2V2ZW50cyIsImdlb2xvY2F0ZSIsImNvbXBsZXRlX2NhbGxiYWNrIiwiYWx3YXlzIiwiY29tcGxldGUiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsInN1Y2Nlc3MiLCJub3Rfc3VwcG9ydGVkIiwiZ2VvY29kZSIsImdlb2NvZGVyIiwiR2VvY29kZXIiLCJyZXN1bHRzIiwiZ2V0Qm91bmRzIiwiZ2V0UGF0aHMiLCJnZXRMZW5ndGgiLCJnZXRBdCIsImluUG9seSIsIm51bVBhdGhzIiwibnVtUG9pbnRzIiwidmVydGV4MSIsInZlcnRleDIiLCJzZXRGZW5jZXMiLCJhZGRGZW5jZSIsImdldElkIiwic2VhcmNoRWxlbWVudCIsIlR5cGVFcnJvciIsInQiLCJPYmplY3QiLCJsZW4iLCJuIiwiTnVtYmVyIiwiSW5maW5pdHkiLCJmbG9vciIsImFicyIsImsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUMsV0FBU0EsSUFBVCxFQUFlQyxPQUFmLEVBQXdCO0FBQ3ZCLE1BQUcsOEJBQU9DLE9BQVAsT0FBbUIsUUFBdEIsRUFBZ0M7QUFDOUJDLFVBQU0sQ0FBQ0QsT0FBUCxHQUFpQkQsT0FBTyxFQUF4QjtBQUNELEdBRkQsTUFHSyxJQUFHLElBQUgsRUFBK0M7QUFDbERHLHFDQUFnQixFQUFWLG9DQUFjSCxPQUFkO0FBQUE7QUFBQTtBQUFBLG9HQUFOO0FBQ0Q7O0FBRURELE1BQUksQ0FBQ0ssS0FBTCxHQUFhSixPQUFPLEVBQXBCO0FBRUQsQ0FWQSxFQVVDLElBVkQsRUFVTyxZQUFXO0FBRW5COzs7Ozs7O0FBUUEsTUFBSSxFQUFFLFFBQU9LLE1BQU0sQ0FBQ0MsTUFBZCxNQUF5QixRQUF6QixJQUFxQ0QsTUFBTSxDQUFDQyxNQUFQLENBQWNDLElBQXJELENBQUosRUFBZ0U7QUFDOUQsVUFBTSwrSEFBTjtBQUNEOztBQUVELE1BQUlDLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBU0MsR0FBVCxFQUFjQyxPQUFkLEVBQXVCO0FBQ3pDLFFBQUlDLElBQUo7O0FBRUEsUUFBSUYsR0FBRyxLQUFLQyxPQUFaLEVBQXFCO0FBQ25CLGFBQU9ELEdBQVA7QUFDRDs7QUFFRCxTQUFLRSxJQUFMLElBQWFELE9BQWIsRUFBc0I7QUFDcEJELFNBQUcsQ0FBQ0UsSUFBRCxDQUFILEdBQVlELE9BQU8sQ0FBQ0MsSUFBRCxDQUFuQjtBQUNEOztBQUVELFdBQU9GLEdBQVA7QUFDRCxHQVpEOztBQWNBLE1BQUlHLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FBU0gsR0FBVCxFQUFjSSxPQUFkLEVBQXVCO0FBQzFDLFFB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bUIsQ0FBdkIsRUFBMEI7QUFDdEIrZCxTQUFDLEdBQUdDLE1BQU0sQ0FBQ25lLFNBQVMsQ0FBQyxDQUFELENBQVYsQ0FBVjs7QUFDQSxZQUFJa2UsQ0FBQyxJQUFJQSxDQUFULEVBQVk7QUFBRTtBQUNWQSxXQUFDLEdBQUcsQ0FBSjtBQUNILFNBRkQsTUFFTyxJQUFJQSxDQUFDLElBQUksQ0FBTCxJQUFVQSxDQUFDLElBQUlFLFFBQWYsSUFBMkJGLENBQUMsSUFBSSxDQUFDRSxRQUFyQyxFQUErQztBQUNsREYsV0FBQyxHQUFHLENBQUNBLENBQUMsR0FBRyxDQUFKLElBQVMsQ0FBQyxDQUFYLElBQWdCdkUsSUFBSSxDQUFDMEUsS0FBTCxDQUFXMUUsSUFBSSxDQUFDMkUsR0FBTCxDQUFTSixDQUFULENBQVgsQ0FBcEI7QUFDSDtBQUNKOztBQUNELFVBQUlBLENBQUMsSUFBSUQsR0FBVCxFQUFjO0FBQ1YsZUFBTyxDQUFDLENBQVI7QUFDSDs7QUFDRCxVQUFJTSxDQUFDLEdBQUdMLENBQUMsSUFBSSxDQUFMLEdBQVNBLENBQVQsR0FBYXZFLElBQUksQ0FBQ0UsR0FBTCxDQUFTb0UsR0FBRyxHQUFHdEUsSUFBSSxDQUFDMkUsR0FBTCxDQUFTSixDQUFULENBQWYsRUFBNEIsQ0FBNUIsQ0FBckI7O0FBQ0EsYUFBT0ssQ0FBQyxHQUFHTixHQUFYLEVBQWdCTSxDQUFDLEVBQWpCLEVBQXFCO0FBQ2pCLFlBQUlBLENBQUMsSUFBSVIsQ0FBTCxJQUFVQSxDQUFDLENBQUNRLENBQUQsQ0FBRCxLQUFTVixhQUF2QixFQUFzQztBQUNsQyxpQkFBT1UsQ0FBUDtBQUNIO0FBQ0o7O0FBQ0QsYUFBTyxDQUFDLENBQVI7QUFDSCxLQTdCRDtBQThCRDs7QUFFRCxTQUFPMWYsS0FBUDtBQUNDLENBaGhFQSxDQUFELEMiLCJmaWxlIjoiZ21hcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfVxuICBlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZSgnR01hcHMnLCBbXSwgZmFjdG9yeSk7XG4gIH1cblxuICByb290LkdNYXBzID0gZmFjdG9yeSgpO1xuXG59KHRoaXMsIGZ1bmN0aW9uKCkge1xuXG4vKiFcbiAqIEdNYXBzLmpzIHYwLjQuOVxuICogaHR0cDovL2hwbmVvLmdpdGh1Yi5jb20vZ21hcHMvXG4gKlxuICogQ29weXJpZ2h0IDIwMTMsIEd1c3Rhdm8gTGVvblxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbmlmICghKHR5cGVvZiB3aW5kb3cuZ29vZ2xlID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuZ29vZ2xlLm1hcHMpKSB7XG4gIHRocm93ICdHb29nbGUgTWFwcyBBUEkgaXMgcmVxdWlyZWQuIFBsZWFzZSByZWdpc3RlciB0aGUgZm9sbG93aW5nIEphdmFTY3JpcHQgbGlicmFyeSBodHRwOi8vbWFwcy5nb29nbGUuY29tL21hcHMvYXBpL2pzP3NlbnNvcj10cnVlLidcbn1cblxudmFyIGV4dGVuZF9vYmplY3QgPSBmdW5jdGlvbihvYmosIG5ld19vYmopIHtcbiAgdmFyIG5hbWU7XG5cbiAgaWYgKG9iaiA9PT0gbmV3X29iaikge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBmb3IgKG5hbWUgaW4gbmV3X29iaikge1xuICAgIG9ialtuYW1lXSA9IG5ld19vYmpbbmFtZV07XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIHJlcGxhY2Vfb2JqZWN0ID0gZnVuY3Rpb24ob2JqLCByZXBsYWNlKSB7XG4gIHZhciBuYW1lO1xuXG4gIGlmIChvYmogPT09IHJlcGxhY2UpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgZm9yIChuYW1lIGluIHJlcGxhY2UpIHtcbiAgICBpZiAob2JqW25hbWVdICE9IHVuZGVmaW5lZCkge1xuICAgICAgb2JqW25hbWVdID0gcmVwbGFjZVtuYW1lXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIGFycmF5X21hcCA9IGZ1bmN0aW9uKGFycmF5LCBjYWxsYmFjaykge1xuICB2YXIgb3JpZ2luYWxfY2FsbGJhY2tfcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSxcbiAgICAgIGFycmF5X3JldHVybiA9IFtdLFxuICAgICAgYXJyYXlfbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaTtcblxuICBpZiAoQXJyYXkucHJvdG90eXBlLm1hcCAmJiBhcnJheS5tYXAgPT09IEFycmF5LnByb3RvdHlwZS5tYXApIHtcbiAgICBhcnJheV9yZXR1cm4gPSBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoYXJyYXksIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIGNhbGxiYWNrX3BhcmFtcyA9IG9yaWdpbmFsX2NhbGxiYWNrX3BhcmFtcztcbiAgICAgIGNhbGxiYWNrX3BhcmFtcy5zcGxpY2UoMCwgMCwgaXRlbSk7XG5cbiAgICAgIHJldHVybiBjYWxsYmFjay5hcHBseSh0aGlzLCBjYWxsYmFja19wYXJhbXMpO1xuICAgIH0pO1xuICB9XG4gIGVsc2Uge1xuICAgIGZvciAoaSA9IDA7IGkgPCBhcnJheV9sZW5ndGg7IGkrKykge1xuICAgICAgY2FsbGJhY2tfcGFyYW1zID0gb3JpZ2luYWxfY2FsbGJhY2tfcGFyYW1zO1xuICAgICAgY2FsbGJhY2tfcGFyYW1zLnNwbGljZSgwLCAwLCBhcnJheVtpXSk7XG4gICAgICBhcnJheV9yZXR1cm4ucHVzaChjYWxsYmFjay5hcHBseSh0aGlzLCBjYWxsYmFja19wYXJhbXMpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXJyYXlfcmV0dXJuO1xufTtcblxudmFyIGFycmF5X2ZsYXQgPSBmdW5jdGlvbihhcnJheSkge1xuICB2YXIgbmV3X2FycmF5ID0gW10sXG4gICAgICBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgIG5ld19hcnJheSA9IG5ld19hcnJheS5jb25jYXQoYXJyYXlbaV0pO1xuICB9XG5cbiAgcmV0dXJuIG5ld19hcnJheTtcbn07XG5cbnZhciBjb29yZHNUb0xhdExuZ3MgPSBmdW5jdGlvbihjb29yZHMsIHVzZUdlb0pTT04pIHtcbiAgdmFyIGZpcnN0X2Nvb3JkID0gY29vcmRzWzBdLFxuICAgICAgc2Vjb25kX2Nvb3JkID0gY29vcmRzWzFdO1xuXG4gIGlmICh1c2VHZW9KU09OKSB7XG4gICAgZmlyc3RfY29vcmQgPSBjb29yZHNbMV07XG4gICAgc2Vjb25kX2Nvb3JkID0gY29vcmRzWzBdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBnb29nbGUubWFwcy5MYXRMbmcoZmlyc3RfY29vcmQsIHNlY29uZF9jb29yZCk7XG59O1xuXG52YXIgYXJyYXlUb0xhdExuZyA9IGZ1bmN0aW9uKGNvb3JkcywgdXNlR2VvSlNPTikge1xuICB2YXIgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgY29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGNvb3Jkc1tpXS5sZW5ndGggPiAwICYmIHR5cGVvZihjb29yZHNbaV1bMF0pID09IFwib2JqZWN0XCIpIHtcbiAgICAgIGNvb3Jkc1tpXSA9IGFycmF5VG9MYXRMbmcoY29vcmRzW2ldLCB1c2VHZW9KU09OKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb29yZHNbaV0gPSBjb29yZHNUb0xhdExuZ3MoY29vcmRzW2ldLCB1c2VHZW9KU09OKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29vcmRzO1xufTtcblxudmFyIGdldEVsZW1lbnRCeUlkID0gZnVuY3Rpb24oaWQsIGNvbnRleHQpIHtcbiAgdmFyIGVsZW1lbnQsXG4gIGlkID0gaWQucmVwbGFjZSgnIycsICcnKTtcblxuICBpZiAoJ2pRdWVyeScgaW4gdGhpcyAmJiBjb250ZXh0KSB7XG4gICAgZWxlbWVudCA9ICQoXCIjXCIgKyBpZCwgY29udGV4dClbMF07XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgfTtcblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbnZhciBmaW5kQWJzb2x1dGVQb3NpdGlvbiA9IGZ1bmN0aW9uKG9iaikgIHtcbiAgdmFyIGN1cmxlZnQgPSAwLFxuICAgICAgY3VydG9wID0gMDtcblxuICBpZiAob2JqLm9mZnNldFBhcmVudCkge1xuICAgIGRvIHtcbiAgICAgIGN1cmxlZnQgKz0gb2JqLm9mZnNldExlZnQ7XG4gICAgICBjdXJ0b3AgKz0gb2JqLm9mZnNldFRvcDtcbiAgICB9IHdoaWxlIChvYmogPSBvYmoub2Zmc2V0UGFyZW50KTtcbiAgfVxuXG4gIHJldHVybiBbY3VybGVmdCwgY3VydG9wXTtcbn07XG5cbnZhciBHTWFwcyA9IChmdW5jdGlvbihnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGRvYyA9IGRvY3VtZW50O1xuXG4gIHZhciBHTWFwcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBpZiAoIXRoaXMpIHJldHVybiBuZXcgR01hcHMob3B0aW9ucyk7XG5cbiAgICBvcHRpb25zLnpvb20gPSBvcHRpb25zLnpvb20gfHwgMTU7XG4gICAgb3B0aW9ucy5tYXBUeXBlID0gb3B0aW9ucy5tYXBUeXBlIHx8ICdyb2FkbWFwJztcblxuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgaSxcbiAgICAgICAgZXZlbnRzX3RoYXRfaGlkZV9jb250ZXh0X21lbnUgPSBbJ2JvdW5kc19jaGFuZ2VkJywgJ2NlbnRlcl9jaGFuZ2VkJywgJ2NsaWNrJywgJ2RibGNsaWNrJywgJ2RyYWcnLCAnZHJhZ2VuZCcsICdkcmFnc3RhcnQnLCAnaWRsZScsICdtYXB0eXBlaWRfY2hhbmdlZCcsICdwcm9qZWN0aW9uX2NoYW5nZWQnLCAncmVzaXplJywgJ3RpbGVzbG9hZGVkJywgJ3pvb21fY2hhbmdlZCddLFxuICAgICAgICBldmVudHNfdGhhdF9kb2VzbnRfaGlkZV9jb250ZXh0X21lbnUgPSBbJ21vdXNlbW92ZScsICdtb3VzZW91dCcsICdtb3VzZW92ZXInXSxcbiAgICAgICAgb3B0aW9uc190b19iZV9kZWxldGVkID0gWydlbCcsICdsYXQnLCAnbG5nJywgJ21hcFR5cGUnLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ21hcmtlckNsdXN0ZXJlcicsICdlbmFibGVOZXdTdHlsZSddLFxuICAgICAgICBjb250YWluZXJfaWQgPSBvcHRpb25zLmVsIHx8IG9wdGlvbnMuZGl2LFxuICAgICAgICBtYXJrZXJDbHVzdGVyZXJGdW5jdGlvbiA9IG9wdGlvbnMubWFya2VyQ2x1c3RlcmVyLFxuICAgICAgICBtYXBUeXBlID0gZ29vZ2xlLm1hcHMuTWFwVHlwZUlkW29wdGlvbnMubWFwVHlwZS50b1VwcGVyQ2FzZSgpXSxcbiAgICAgICAgbWFwX2NlbnRlciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcob3B0aW9ucy5sYXQsIG9wdGlvbnMubG5nKSxcbiAgICAgICAgem9vbUNvbnRyb2wgPSBvcHRpb25zLnpvb21Db250cm9sIHx8IHRydWUsXG4gICAgICAgIHpvb21Db250cm9sT3B0ID0gb3B0aW9ucy56b29tQ29udHJvbE9wdCB8fCB7XG4gICAgICAgICAgc3R5bGU6ICdERUZBVUxUJyxcbiAgICAgICAgICBwb3NpdGlvbjogJ1RPUF9MRUZUJ1xuICAgICAgICB9LFxuICAgICAgICB6b29tQ29udHJvbFN0eWxlID0gem9vbUNvbnRyb2xPcHQuc3R5bGUgfHwgJ0RFRkFVTFQnLFxuICAgICAgICB6b29tQ29udHJvbFBvc2l0aW9uID0gem9vbUNvbnRyb2xPcHQucG9zaXRpb24gfHwgJ1RPUF9MRUZUJyxcbiAgICAgICAgcGFuQ29udHJvbCA9IG9wdGlvbnMucGFuQ29udHJvbCB8fCB0cnVlLFxuICAgICAgICBtYXBUeXBlQ29udHJvbCA9IG9wdGlvbnMubWFwVHlwZUNvbnRyb2wgfHwgdHJ1ZSxcbiAgICAgICAgc2NhbGVDb250cm9sID0gb3B0aW9ucy5zY2FsZUNvbnRyb2wgfHwgdHJ1ZSxcbiAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2wgPSBvcHRpb25zLnN0cmVldFZpZXdDb250cm9sIHx8IHRydWUsXG4gICAgICAgIG92ZXJ2aWV3TWFwQ29udHJvbCA9IG92ZXJ2aWV3TWFwQ29udHJvbCB8fCB0cnVlLFxuICAgICAgICBtYXBfb3B0aW9ucyA9IHt9LFxuICAgICAgICBtYXBfYmFzZV9vcHRpb25zID0ge1xuICAgICAgICAgIHpvb206IHRoaXMuem9vbSxcbiAgICAgICAgICBjZW50ZXI6IG1hcF9jZW50ZXIsXG4gICAgICAgICAgbWFwVHlwZUlkOiBtYXBUeXBlXG4gICAgICAgIH0sXG4gICAgICAgIG1hcF9jb250cm9sc19vcHRpb25zID0ge1xuICAgICAgICAgIHBhbkNvbnRyb2w6IHBhbkNvbnRyb2wsXG4gICAgICAgICAgem9vbUNvbnRyb2w6IHpvb21Db250cm9sLFxuICAgICAgICAgIHpvb21Db250cm9sT3B0aW9uczoge1xuICAgICAgICAgICAgc3R5bGU6IGdvb2dsZS5tYXBzLlpvb21Db250cm9sU3R5bGVbem9vbUNvbnRyb2xTdHlsZV0sXG4gICAgICAgICAgICBwb3NpdGlvbjogZ29vZ2xlLm1hcHMuQ29udHJvbFBvc2l0aW9uW3pvb21Db250cm9sUG9zaXRpb25dXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtYXBUeXBlQ29udHJvbDogbWFwVHlwZUNvbnRyb2wsXG4gICAgICAgICAgc2NhbGVDb250cm9sOiBzY2FsZUNvbnRyb2wsXG4gICAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IHN0cmVldFZpZXdDb250cm9sLFxuICAgICAgICAgIG92ZXJ2aWV3TWFwQ29udHJvbDogb3ZlcnZpZXdNYXBDb250cm9sXG4gICAgICAgIH07XG5cbiAgICBpZiAodHlwZW9mKG9wdGlvbnMuZWwpID09PSAnc3RyaW5nJyB8fCB0eXBlb2Yob3B0aW9ucy5kaXYpID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5lbCA9IGdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcl9pZCwgb3B0aW9ucy5jb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbCA9IGNvbnRhaW5lcl9pZDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mKHRoaXMuZWwpID09PSAndW5kZWZpbmVkJyB8fCB0aGlzLmVsID09PSBudWxsKSB7XG4gICAgICB0aHJvdyAnTm8gZWxlbWVudCBkZWZpbmVkLic7XG4gICAgfVxuXG4gICAgd2luZG93LmNvbnRleHRfbWVudSA9IHdpbmRvdy5jb250ZXh0X21lbnUgfHwge307XG4gICAgd2luZG93LmNvbnRleHRfbWVudVtzZWxmLmVsLmlkXSA9IHt9O1xuXG4gICAgdGhpcy5jb250cm9scyA9IFtdO1xuICAgIHRoaXMub3ZlcmxheXMgPSBbXTtcbiAgICB0aGlzLmxheWVycyA9IFtdOyAvLyBhcnJheSB3aXRoIGttbC9nZW9yc3MgYW5kIGZ1c2lvbnRhYmxlcyBsYXllcnMsIGNhbiBiZSBhcyBtYW55XG4gICAgdGhpcy5zaW5nbGVMYXllcnMgPSB7fTsgLy8gb2JqZWN0IHdpdGggdGhlIG90aGVyIGxheWVycywgb25seSBvbmUgcGVyIGxheWVyXG4gICAgdGhpcy5tYXJrZXJzID0gW107XG4gICAgdGhpcy5wb2x5bGluZXMgPSBbXTtcbiAgICB0aGlzLnJvdXRlcyA9IFtdO1xuICAgIHRoaXMucG9seWdvbnMgPSBbXTtcbiAgICB0aGlzLmluZm9XaW5kb3cgPSBudWxsO1xuICAgIHRoaXMub3ZlcmxheV9lbCA9IG51bGw7XG4gICAgdGhpcy56b29tID0gb3B0aW9ucy56b29tO1xuICAgIHRoaXMucmVnaXN0ZXJlZF9ldmVudHMgPSB7fTtcblxuICAgIHRoaXMuZWwuc3R5bGUud2lkdGggPSBvcHRpb25zLndpZHRoIHx8IHRoaXMuZWwuc2Nyb2xsV2lkdGggfHwgdGhpcy5lbC5vZmZzZXRXaWR0aDtcbiAgICB0aGlzLmVsLnN0eWxlLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IHRoaXMuZWwuc2Nyb2xsSGVpZ2h0IHx8IHRoaXMuZWwub2Zmc2V0SGVpZ2h0O1xuXG4gICAgZ29vZ2xlLm1hcHMudmlzdWFsUmVmcmVzaCA9IG9wdGlvbnMuZW5hYmxlTmV3U3R5bGU7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgb3B0aW9uc190b19iZV9kZWxldGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZWxldGUgb3B0aW9uc1tvcHRpb25zX3RvX2JlX2RlbGV0ZWRbaV1dO1xuICAgIH1cblxuICAgIGlmKG9wdGlvbnMuZGlzYWJsZURlZmF1bHRVSSAhPSB0cnVlKSB7XG4gICAgICBtYXBfYmFzZV9vcHRpb25zID0gZXh0ZW5kX29iamVjdChtYXBfYmFzZV9vcHRpb25zLCBtYXBfY29udHJvbHNfb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgbWFwX29wdGlvbnMgPSBleHRlbmRfb2JqZWN0KG1hcF9iYXNlX29wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGV2ZW50c190aGF0X2hpZGVfY29udGV4dF9tZW51Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZWxldGUgbWFwX29wdGlvbnNbZXZlbnRzX3RoYXRfaGlkZV9jb250ZXh0X21lbnVbaV1dO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBldmVudHNfdGhhdF9kb2VzbnRfaGlkZV9jb250ZXh0X21lbnUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlbGV0ZSBtYXBfb3B0aW9uc1tldmVudHNfdGhhdF9kb2VzbnRfaGlkZV9jb250ZXh0X21lbnVbaV1dO1xuICAgIH1cblxuICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcCh0aGlzLmVsLCBtYXBfb3B0aW9ucyk7XG5cbiAgICBpZiAobWFya2VyQ2x1c3RlcmVyRnVuY3Rpb24pIHtcbiAgICAgIHRoaXMubWFya2VyQ2x1c3RlcmVyID0gbWFya2VyQ2x1c3RlcmVyRnVuY3Rpb24uYXBwbHkodGhpcywgW3RoaXMubWFwXSk7XG4gICAgfVxuXG4gICAgdmFyIGJ1aWxkQ29udGV4dE1lbnVIVE1MID0gZnVuY3Rpb24oY29udHJvbCwgZSkge1xuICAgICAgdmFyIGh0bWwgPSAnJyxcbiAgICAgICAgICBvcHRpb25zID0gd2luZG93LmNvbnRleHRfbWVudVtzZWxmLmVsLmlkXVtjb250cm9sXTtcblxuICAgICAgZm9yICh2YXIgaSBpbiBvcHRpb25zKXtcbiAgICAgICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICB2YXIgb3B0aW9uID0gb3B0aW9uc1tpXTtcblxuICAgICAgICAgIGh0bWwgKz0gJzxsaT48YSBpZD1cIicgKyBjb250cm9sICsgJ18nICsgaSArICdcIiBocmVmPVwiI1wiPicgKyBvcHRpb24udGl0bGUgKyAnPC9hPjwvbGk+JztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWdldEVsZW1lbnRCeUlkKCdnbWFwc19jb250ZXh0X21lbnUnKSkgcmV0dXJuO1xuXG4gICAgICB2YXIgY29udGV4dF9tZW51X2VsZW1lbnQgPSBnZXRFbGVtZW50QnlJZCgnZ21hcHNfY29udGV4dF9tZW51Jyk7XG4gICAgICBcbiAgICAgIGNvbnRleHRfbWVudV9lbGVtZW50LmlubmVySFRNTCA9IGh0bWw7XG5cbiAgICAgIHZhciBjb250ZXh0X21lbnVfaXRlbXMgPSBjb250ZXh0X21lbnVfZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpLFxuICAgICAgICAgIGNvbnRleHRfbWVudV9pdGVtc19jb3VudCA9IGNvbnRleHRfbWVudV9pdGVtcy5sZW5ndGhcbiAgICAgICAgICBpO1xuXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgY29udGV4dF9tZW51X2l0ZW1zX2NvdW50OyBpKyspIHtcbiAgICAgICAgdmFyIGNvbnRleHRfbWVudV9pdGVtID0gY29udGV4dF9tZW51X2l0ZW1zW2ldO1xuXG4gICAgICAgIHZhciBhc3NpZ25fbWVudV9pdGVtX2FjdGlvbiA9IGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgb3B0aW9uc1t0aGlzLmlkLnJlcGxhY2UoY29udHJvbCArICdfJywgJycpXS5hY3Rpb24uYXBwbHkoc2VsZiwgW2VdKTtcbiAgICAgICAgICBzZWxmLmhpZGVDb250ZXh0TWVudSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmNsZWFyTGlzdGVuZXJzKGNvbnRleHRfbWVudV9pdGVtLCAnY2xpY2snKTtcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXJPbmNlKGNvbnRleHRfbWVudV9pdGVtLCAnY2xpY2snLCBhc3NpZ25fbWVudV9pdGVtX2FjdGlvbiwgZmFsc2UpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcG9zaXRpb24gPSBmaW5kQWJzb2x1dGVQb3NpdGlvbi5hcHBseSh0aGlzLCBbc2VsZi5lbF0pLFxuICAgICAgICAgIGxlZnQgPSBwb3NpdGlvblswXSArIGUucGl4ZWwueCAtIDE1LFxuICAgICAgICAgIHRvcCA9IHBvc2l0aW9uWzFdICsgZS5waXhlbC55LSAxNTtcblxuICAgICAgY29udGV4dF9tZW51X2VsZW1lbnQuc3R5bGUubGVmdCA9IGxlZnQgKyBcInB4XCI7XG4gICAgICBjb250ZXh0X21lbnVfZWxlbWVudC5zdHlsZS50b3AgPSB0b3AgKyBcInB4XCI7XG5cbiAgICAgIGNvbnRleHRfbWVudV9lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH07XG5cbiAgICB0aGlzLmJ1aWxkQ29udGV4dE1lbnUgPSBmdW5jdGlvbihjb250cm9sLCBlKSB7XG4gICAgICBpZiAoY29udHJvbCA9PT0gJ21hcmtlcicpIHtcbiAgICAgICAgZS5waXhlbCA9IHt9O1xuXG4gICAgICAgIHZhciBvdmVybGF5ID0gbmV3IGdvb2dsZS5tYXBzLk92ZXJsYXlWaWV3KCk7XG4gICAgICAgIG92ZXJsYXkuc2V0TWFwKHNlbGYubWFwKTtcbiAgICAgICAgXG4gICAgICAgIG92ZXJsYXkuZHJhdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwcm9qZWN0aW9uID0gb3ZlcmxheS5nZXRQcm9qZWN0aW9uKCksXG4gICAgICAgICAgICAgIHBvc2l0aW9uID0gZS5tYXJrZXIuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgICBcbiAgICAgICAgICBlLnBpeGVsID0gcHJvamVjdGlvbi5mcm9tTGF0TG5nVG9Db250YWluZXJQaXhlbChwb3NpdGlvbik7XG5cbiAgICAgICAgICBidWlsZENvbnRleHRNZW51SFRNTChjb250cm9sLCBlKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBidWlsZENvbnRleHRNZW51SFRNTChjb250cm9sLCBlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5zZXRDb250ZXh0TWVudSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHdpbmRvdy5jb250ZXh0X21lbnVbc2VsZi5lbC5pZF1bb3B0aW9ucy5jb250cm9sXSA9IHt9O1xuXG4gICAgICB2YXIgaSxcbiAgICAgICAgICB1bCA9IGRvYy5jcmVhdGVFbGVtZW50KCd1bCcpO1xuXG4gICAgICBmb3IgKGkgaW4gb3B0aW9ucy5vcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICB2YXIgb3B0aW9uID0gb3B0aW9ucy5vcHRpb25zW2ldO1xuXG4gICAgICAgICAgd2luZG93LmNvbnRleHRfbWVudVtzZWxmLmVsLmlkXVtvcHRpb25zLmNvbnRyb2xdW29wdGlvbi5uYW1lXSA9IHtcbiAgICAgICAgICAgIHRpdGxlOiBvcHRpb24udGl0bGUsXG4gICAgICAgICAgICBhY3Rpb246IG9wdGlvbi5hY3Rpb25cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHVsLmlkID0gJ2dtYXBzX2NvbnRleHRfbWVudSc7XG4gICAgICB1bC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgdWwuc3R5bGUubWluV2lkdGggPSAnMTAwcHgnO1xuICAgICAgdWwuc3R5bGUuYmFja2dyb3VuZCA9ICd3aGl0ZSc7XG4gICAgICB1bC5zdHlsZS5saXN0U3R5bGUgPSAnbm9uZSc7XG4gICAgICB1bC5zdHlsZS5wYWRkaW5nID0gJzhweCc7XG4gICAgICB1bC5zdHlsZS5ib3hTaGFkb3cgPSAnMnB4IDJweCA2cHggI2NjYyc7XG5cbiAgICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKHVsKTtcblxuICAgICAgdmFyIGNvbnRleHRfbWVudV9lbGVtZW50ID0gZ2V0RWxlbWVudEJ5SWQoJ2dtYXBzX2NvbnRleHRfbWVudScpXG5cbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKGNvbnRleHRfbWVudV9lbGVtZW50LCAnbW91c2VvdXQnLCBmdW5jdGlvbihldikge1xuICAgICAgICBpZiAoIWV2LnJlbGF0ZWRUYXJnZXQgfHwgIXRoaXMuY29udGFpbnMoZXYucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgY29udGV4dF9tZW51X2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICB9LCA0MDApO1xuICAgICAgICB9XG4gICAgICB9LCBmYWxzZSk7XG4gICAgfTtcblxuICAgIHRoaXMuaGlkZUNvbnRleHRNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY29udGV4dF9tZW51X2VsZW1lbnQgPSBnZXRFbGVtZW50QnlJZCgnZ21hcHNfY29udGV4dF9tZW51Jyk7XG5cbiAgICAgIGlmIChjb250ZXh0X21lbnVfZWxlbWVudCkge1xuICAgICAgICBjb250ZXh0X21lbnVfZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgc2V0dXBMaXN0ZW5lciA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZSkge1xuICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYgKGUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZSA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zW25hbWVdLmFwcGx5KHRoaXMsIFtlXSk7XG5cbiAgICAgICAgc2VsZi5oaWRlQ29udGV4dE1lbnUoKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmb3IgKHZhciBldiA9IDA7IGV2IDwgZXZlbnRzX3RoYXRfaGlkZV9jb250ZXh0X21lbnUubGVuZ3RoOyBldisrKSB7XG4gICAgICB2YXIgbmFtZSA9IGV2ZW50c190aGF0X2hpZGVfY29udGV4dF9tZW51W2V2XTtcblxuICAgICAgaWYgKG5hbWUgaW4gb3B0aW9ucykge1xuICAgICAgICBzZXR1cExpc3RlbmVyKHRoaXMubWFwLCBuYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBldiA9IDA7IGV2IDwgZXZlbnRzX3RoYXRfZG9lc250X2hpZGVfY29udGV4dF9tZW51Lmxlbmd0aDsgZXYrKykge1xuICAgICAgdmFyIG5hbWUgPSBldmVudHNfdGhhdF9kb2VzbnRfaGlkZV9jb250ZXh0X21lbnVbZXZdO1xuXG4gICAgICBpZiAobmFtZSBpbiBvcHRpb25zKSB7XG4gICAgICAgIHNldHVwTGlzdGVuZXIodGhpcy5tYXAsIG5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwLCAncmlnaHRjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChvcHRpb25zLnJpZ2h0Y2xpY2spIHtcbiAgICAgICAgb3B0aW9ucy5yaWdodGNsaWNrLmFwcGx5KHRoaXMsIFtlXSk7XG4gICAgICB9XG5cbiAgICAgIGlmKHdpbmRvdy5jb250ZXh0X21lbnVbc2VsZi5lbC5pZF1bJ21hcCddICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBzZWxmLmJ1aWxkQ29udGV4dE1lbnUoJ21hcCcsIGUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5yZWZyZXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKHRoaXMubWFwLCAncmVzaXplJyk7XG4gICAgfTtcblxuICAgIHRoaXMuZml0Wm9vbSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGxhdExuZ3MgPSBbXSxcbiAgICAgICAgICBtYXJrZXJzX2xlbmd0aCA9IHRoaXMubWFya2Vycy5sZW5ndGgsXG4gICAgICAgICAgaTtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IG1hcmtlcnNfbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYodHlwZW9mKHRoaXMubWFya2Vyc1tpXS52aXNpYmxlKSA9PT0gJ2Jvb2xlYW4nICYmIHRoaXMubWFya2Vyc1tpXS52aXNpYmxlKSB7XG4gICAgICAgICAgbGF0TG5ncy5wdXNoKHRoaXMubWFya2Vyc1tpXS5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmZpdExhdExuZ0JvdW5kcyhsYXRMbmdzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5maXRMYXRMbmdCb3VuZHMgPSBmdW5jdGlvbihsYXRMbmdzKSB7XG4gICAgICB2YXIgdG90YWwgPSBsYXRMbmdzLmxlbmd0aDtcbiAgICAgIHZhciBib3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG5cbiAgICAgIGZvcih2YXIgaT0wOyBpIDwgdG90YWw7IGkrKykge1xuICAgICAgICBib3VuZHMuZXh0ZW5kKGxhdExuZ3NbaV0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1hcC5maXRCb3VuZHMoYm91bmRzKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zZXRDZW50ZXIgPSBmdW5jdGlvbihsYXQsIGxuZywgY2FsbGJhY2spIHtcbiAgICAgIHRoaXMubWFwLnBhblRvKG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsbmcpKTtcblxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0RWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZWw7XG4gICAgfTtcblxuICAgIHRoaXMuem9vbUluID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUgfHwgMTtcblxuICAgICAgdGhpcy56b29tID0gdGhpcy5tYXAuZ2V0Wm9vbSgpICsgdmFsdWU7XG4gICAgICB0aGlzLm1hcC5zZXRab29tKHRoaXMuem9vbSk7XG4gICAgfTtcblxuICAgIHRoaXMuem9vbU91dCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlIHx8IDE7XG5cbiAgICAgIHRoaXMuem9vbSA9IHRoaXMubWFwLmdldFpvb20oKSAtIHZhbHVlO1xuICAgICAgdGhpcy5tYXAuc2V0Wm9vbSh0aGlzLnpvb20pO1xuICAgIH07XG5cbiAgICB2YXIgbmF0aXZlX21ldGhvZHMgPSBbXSxcbiAgICAgICAgbWV0aG9kO1xuXG4gICAgZm9yIChtZXRob2QgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0eXBlb2YodGhpcy5tYXBbbWV0aG9kXSkgPT0gJ2Z1bmN0aW9uJyAmJiAhdGhpc1ttZXRob2RdKSB7XG4gICAgICAgIG5hdGl2ZV9tZXRob2RzLnB1c2gobWV0aG9kKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGk9MDsgaSA8IG5hdGl2ZV9tZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAoZnVuY3Rpb24oZ21hcHMsIHNjb3BlLCBtZXRob2RfbmFtZSkge1xuICAgICAgICBnbWFwc1ttZXRob2RfbmFtZV0gPSBmdW5jdGlvbigpe1xuICAgICAgICAgIHJldHVybiBzY29wZVttZXRob2RfbmFtZV0uYXBwbHkoc2NvcGUsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzLCB0aGlzLm1hcCwgbmF0aXZlX21ldGhvZHNbaV0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gR01hcHM7XG59KSh0aGlzKTtcblxuR01hcHMucHJvdG90eXBlLmNyZWF0ZUNvbnRyb2wgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHZhciBjb250cm9sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgY29udHJvbC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gIGNvbnRyb2wuc3R5bGUuZm9udEZhbWlseSA9ICdBcmlhbCwgc2Fucy1zZXJpZic7XG4gIGNvbnRyb2wuc3R5bGUuZm9udFNpemUgPSAnMTNweCc7XG4gIGNvbnRyb2wuc3R5bGUuYm94U2hhZG93ID0gJ3JnYmEoMCwgMCwgMCwgMC4zOTg0MzgpIDBweCAycHggNHB4JztcblxuICBmb3IgKHZhciBvcHRpb24gaW4gb3B0aW9ucy5zdHlsZSkge1xuICAgIGNvbnRyb2wuc3R5bGVbb3B0aW9uXSA9IG9wdGlvbnMuc3R5bGVbb3B0aW9uXTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmlkKSB7XG4gICAgY29udHJvbC5pZCA9IG9wdGlvbnMuaWQ7XG4gIH1cblxuICBpZiAob3B0aW9ucy5jbGFzc2VzKSB7XG4gICAgY29udHJvbC5jbGFzc05hbWUgPSBvcHRpb25zLmNsYXNzZXM7XG4gIH1cblxuICBpZiAob3B0aW9ucy5jb250ZW50KSB7XG4gICAgY29udHJvbC5pbm5lckhUTUwgPSBvcHRpb25zLmNvbnRlbnQ7XG4gIH1cblxuICBmb3IgKHZhciBldiBpbiBvcHRpb25zLmV2ZW50cykge1xuICAgIChmdW5jdGlvbihvYmplY3QsIG5hbWUpIHtcbiAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgZnVuY3Rpb24oKXtcbiAgICAgICAgb3B0aW9ucy5ldmVudHNbbmFtZV0uYXBwbHkodGhpcywgW3RoaXNdKTtcbiAgICAgIH0pO1xuICAgIH0pKGNvbnRyb2wsIGV2KTtcbiAgfVxuXG4gIGNvbnRyb2wuaW5kZXggPSAxO1xuXG4gIHJldHVybiBjb250cm9sO1xufTtcblxuR01hcHMucHJvdG90eXBlLmFkZENvbnRyb2wgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHZhciBwb3NpdGlvbiA9IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbltvcHRpb25zLnBvc2l0aW9uLnRvVXBwZXJDYXNlKCldO1xuXG4gIGRlbGV0ZSBvcHRpb25zLnBvc2l0aW9uO1xuXG4gIHZhciBjb250cm9sID0gdGhpcy5jcmVhdGVDb250cm9sKG9wdGlvbnMpO1xuICB0aGlzLmNvbnRyb2xzLnB1c2goY29udHJvbCk7XG4gIFxuICB0aGlzLm1hcC5jb250cm9sc1twb3NpdGlvbl0ucHVzaChjb250cm9sKTtcblxuICByZXR1cm4gY29udHJvbDtcbn07XG5cbkdNYXBzLnByb3RvdHlwZS5jcmVhdGVNYXJrZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zLmxhdCA9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5sbmcgPT0gdW5kZWZpbmVkICYmIG9wdGlvbnMucG9zaXRpb24gPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgJ05vIGxhdGl0dWRlIG9yIGxvbmdpdHVkZSBkZWZpbmVkLic7XG4gIH1cblxuICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICBkZXRhaWxzID0gb3B0aW9ucy5kZXRhaWxzLFxuICAgICAgZmVuY2VzID0gb3B0aW9ucy5mZW5jZXMsXG4gICAgICBvdXRzaWRlID0gb3B0aW9ucy5vdXRzaWRlLFxuICAgICAgYmFzZV9vcHRpb25zID0ge1xuICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhvcHRpb25zLmxhdCwgb3B0aW9ucy5sbmcpLFxuICAgICAgICBtYXA6IG51bGxcbiAgICAgIH07XG5cbiAgZGVsZXRlIG9wdGlvbnMubGF0O1xuICBkZWxldGUgb3B0aW9ucy5sbmc7XG4gIGRlbGV0ZSBvcHRpb25zLmZlbmNlcztcbiAgZGVsZXRlIG9wdGlvbnMub3V0c2lkZTtcblxuICB2YXIgbWFya2VyX29wdGlvbnMgPSBleHRlbmRfb2JqZWN0KGJhc2Vfb3B0aW9ucywgb3B0aW9ucyksXG4gICAgICBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKG1hcmtlcl9vcHRpb25zKTtcblxuICBtYXJrZXIuZmVuY2VzID0gZmVuY2VzO1xuXG4gIGlmIChvcHRpb25zLmluZm9XaW5kb3cpIHtcbiAgICBtYXJrZXIuaW5mb1dpbmRvdyA9IG5ldyBnb29nbGUubWFwcy5JbmZvV2luZG93KG9wdGlvbnMuaW5mb1dpbmRvdyk7XG5cbiAgICB2YXIgaW5mb193aW5kb3dfZXZlbnRzID0gWydjbG9zZWNsaWNrJywgJ2NvbnRlbnRfY2hhbmdlZCcsICdkb21yZWFkeScsICdwb3NpdGlvbl9jaGFuZ2VkJywgJ3ppbmRleF9jaGFuZ2VkJ107XG5cbiAgICBmb3IgKHZhciBldiA9IDA7IGV2IDwgaW5mb193aW5kb3dfZXZlbnRzLmxlbmd0aDsgZXYrKykge1xuICAgICAgKGZ1bmN0aW9uKG9iamVjdCwgbmFtZSkge1xuICAgICAgICBpZiAob3B0aW9ucy5pbmZvV2luZG93W25hbWVdKSB7XG4gICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIG9wdGlvbnMuaW5mb1dpbmRvd1tuYW1lXS5hcHBseSh0aGlzLCBbZV0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KShtYXJrZXIuaW5mb1dpbmRvdywgaW5mb193aW5kb3dfZXZlbnRzW2V2XSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIG1hcmtlcl9ldmVudHMgPSBbJ2FuaW1hdGlvbl9jaGFuZ2VkJywgJ2NsaWNrYWJsZV9jaGFuZ2VkJywgJ2N1cnNvcl9jaGFuZ2VkJywgJ2RyYWdnYWJsZV9jaGFuZ2VkJywgJ2ZsYXRfY2hhbmdlZCcsICdpY29uX2NoYW5nZWQnLCAncG9zaXRpb25fY2hhbmdlZCcsICdzaGFkb3dfY2hhbmdlZCcsICdzaGFwZV9jaGFuZ2VkJywgJ3RpdGxlX2NoYW5nZWQnLCAndmlzaWJsZV9jaGFuZ2VkJywgJ3ppbmRleF9jaGFuZ2VkJ107XG5cbiAgdmFyIG1hcmtlcl9ldmVudHNfd2l0aF9tb3VzZSA9IFsnZGJsY2xpY2snLCAnZHJhZycsICdkcmFnZW5kJywgJ2RyYWdzdGFydCcsICdtb3VzZWRvd24nLCAnbW91c2VvdXQnLCAnbW91c2VvdmVyJywgJ21vdXNldXAnXTtcblxuICBmb3IgKHZhciBldiA9IDA7IGV2IDwgbWFya2VyX2V2ZW50cy5sZW5ndGg7IGV2KyspIHtcbiAgICAoZnVuY3Rpb24ob2JqZWN0LCBuYW1lKSB7XG4gICAgICBpZiAob3B0aW9uc1tuYW1lXSkge1xuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgb3B0aW9uc1tuYW1lXS5hcHBseSh0aGlzLCBbdGhpc10pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KShtYXJrZXIsIG1hcmtlcl9ldmVudHNbZXZdKTtcbiAgfVxuXG4gIGZvciAodmFyIGV2ID0gMDsgZXYgPCBtYXJrZXJfZXZlbnRzX3dpdGhfbW91c2UubGVuZ3RoOyBldisrKSB7XG4gICAgKGZ1bmN0aW9uKG1hcCwgb2JqZWN0LCBuYW1lKSB7XG4gICAgICBpZiAob3B0aW9uc1tuYW1lXSkge1xuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGZ1bmN0aW9uKG1lKXtcbiAgICAgICAgICBpZighbWUucGl4ZWwpe1xuICAgICAgICAgICAgbWUucGl4ZWwgPSBtYXAuZ2V0UHJvamVjdGlvbigpLmZyb21MYXRMbmdUb1BvaW50KG1lLmxhdExuZylcbiAgICAgICAgICB9XG4gICAgICAgICAgXG4gICAgICAgICAgb3B0aW9uc1tuYW1lXS5hcHBseSh0aGlzLCBbbWVdKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSkodGhpcy5tYXAsIG1hcmtlciwgbWFya2VyX2V2ZW50c193aXRoX21vdXNlW2V2XSk7XG4gIH1cblxuICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XG5cbiAgICBpZiAob3B0aW9ucy5jbGljaykge1xuICAgICAgb3B0aW9ucy5jbGljay5hcHBseSh0aGlzLCBbdGhpc10pO1xuICAgIH1cblxuICAgIGlmIChtYXJrZXIuaW5mb1dpbmRvdykge1xuICAgICAgc2VsZi5oaWRlSW5mb1dpbmRvd3MoKTtcbiAgICAgIG1hcmtlci5pbmZvV2luZG93Lm9wZW4oc2VsZi5tYXAsIG1hcmtlcik7XG4gICAgfVxuICB9KTtcblxuICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdyaWdodGNsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUubWFya2VyID0gdGhpcztcblxuICAgIGlmIChvcHRpb25zLnJpZ2h0Y2xpY2spIHtcbiAgICAgIG9wdGlvbnMucmlnaHRjbGljay5hcHBseSh0aGlzLCBbZV0pO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuY29udGV4dF9tZW51W3NlbGYuZWwuaWRdWydtYXJrZXInXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHNlbGYuYnVpbGRDb250ZXh0TWVudSgnbWFya2VyJywgZSk7XG4gICAgfVxuICB9KTtcblxuICBpZiAobWFya2VyLmZlbmNlcykge1xuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcmtlciwgJ2RyYWdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuY2hlY2tNYXJrZXJHZW9mZW5jZShtYXJrZXIsIGZ1bmN0aW9uKG0sIGYpIHtcbiAgICAgICAgb3V0c2lkZShtLCBmKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIG1hcmtlcjtcbn07XG5cbkdNYXBzLnByb3RvdHlwZS5hZGRNYXJrZXIgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHZhciBtYXJrZXI7XG4gIGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2dtX2FjY2Vzc29yc18nKSkge1xuICAgIC8vIE5hdGl2ZSBnb29nbGUubWFwcy5NYXJrZXIgb2JqZWN0XG4gICAgbWFya2VyID0gb3B0aW9ucztcbiAgfVxuICBlbHNlIHtcbiAgICBpZiAoKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2xhdCcpICYmIG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2xuZycpKSB8fCBvcHRpb25zLnBvc2l0aW9uKSB7XG4gICAgICBtYXJrZXIgPSB0aGlzLmNyZWF0ZU1hcmtlcihvcHRpb25zKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aHJvdyAnTm8gbGF0aXR1ZGUgb3IgbG9uZ2l0dWRlIGRlZmluZWQuJztcbiAgICB9XG4gIH1cblxuICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwKTtcblxuICBpZih0aGlzLm1hcmtlckNsdXN0ZXJlcikge1xuICAgIHRoaXMubWFya2VyQ2x1c3RlcmVyLmFkZE1hcmtlcihtYXJrZXIpO1xuICB9XG5cbiAgdGhpcy5tYXJrZXJzLnB1c2gobWFya2VyKTtcblxuICBHTWFwcy5maXJlKCdtYXJrZXJfYWRkZWQnLCBtYXJrZXIsIHRoaXMpO1xuXG4gIHJldHVybiBtYXJrZXI7XG59O1xuXG5HTWFwcy5wcm90b3R5cGUuYWRkTWFya2VycyA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlcj1hcnJheVtpXTsgaSsrKSB7XG4gICAgdGhpcy5hZGRNYXJrZXIobWFya2VyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLm1hcmtlcnM7XG59O1xuXG5HTWFwcy5wcm90b3R5cGUuaGlkZUluZm9XaW5kb3dzID0gZnVuY3Rpb24oKSB7XG4gIGZvciAodmFyIGkgPSAwLCBtYXJrZXI7IG1hcmtlciA9IHRoaXMubWFya2Vyc1tpXTsgaSsrKXtcbiAgICBpZiAobWFya2VyLmluZm9XaW5kb3cpe1xuICAgICAgbWFya2VyLmluZm9XaW5kb3cuY2xvc2UoKTtcbiAgICB9XG4gIH1cbn07XG5cbkdNYXBzLnByb3RvdHlwZS5yZW1vdmVNYXJrZXIgPSBmdW5jdGlvbihtYXJrZXIpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1hcmtlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodGhpcy5tYXJrZXJzW2ldID09PSBtYXJrZXIpIHtcbiAgICAgIHRoaXMubWFya2Vyc1tpXS5zZXRNYXAobnVsbCk7XG4gICAgICB0aGlzLm1hcmtlcnMuc3BsaWNlKGksIDEpO1xuXG4gICAgICBpZih0aGlzLm1hcmtlckNsdXN0ZXJlcikge1xuICAgICAgICB0aGlzLm1hcmtlckNsdXN0ZXJlci5yZW1vdmVNYXJrZXIobWFya2VyKTtcbiAgICAgIH1cblxuICAgICAgR01hcHMuZmlyZSgnbWFya2VyX3JlbW92ZWQnLCBtYXJrZXIsIHRoaXMpO1xuXG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWFya2VyO1xufTtcblxuR01hcHMucHJvdG90eXBlLnJlbW92ZU1hcmtlcnMgPSBmdW5jdGlvbihjb2xsZWN0aW9uKSB7XG4gIHZhciBjb2xsZWN0aW9uID0gKGNvbGxlY3Rpb24gfHwgdGhpcy5tYXJrZXJzKTtcblxuICBmb3IgKHZhciBpID0gMDtpIDwgdGhpcy5tYXJrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYodGhpcy5tYXJrZXJzW2ldID09PSBjb2xsZWN0aW9uW2ldKSB7XG4gICAgICB0aGlzLm1hcmtlcnNbaV0uc2V0TWFwKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBuZXdfbWFya2VycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwO2kgPCB0aGlzLm1hcmtlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZih0aGlzLm1hcmtlcnNbaV0uZ2V0TWFwKCkgIT0gbnVsbCkge1xuICAgICAgbmV3X21hcmtlcnMucHVzaCh0aGlzLm1hcmtlcnNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMubWFya2VycyA9IG5ld19tYXJrZXJzO1xufTtcblxuR01hcHMucHJvdG90eXBlLmRyYXdPdmVybGF5ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgb3ZlcmxheSA9IG5ldyBnb29nbGUubWFwcy5PdmVybGF5VmlldygpLFxuICAgICAgYXV0b19zaG93ID0gdHJ1ZTtcblxuICBvdmVybGF5LnNldE1hcCh0aGlzLm1hcCk7XG5cbiAgaWYgKG9wdGlvbnMuYXV0b19zaG93ICE9IG51bGwpIHtcbiAgICBhdXRvX3Nob3cgPSBvcHRpb25zLmF1dG9fc2hvdztcbiAgfVxuXG4gIG92ZXJsYXkub25BZGQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGVsLnN0eWxlLmJvcmRlclN0eWxlID0gXCJub25lXCI7XG4gICAgZWwuc3R5bGUuYm9yZGVyV2lkdGggPSBcIjBweFwiO1xuICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIGVsLnN0eWxlLnpJbmRleCA9IDEwMDtcbiAgICBlbC5pbm5lckhUTUwgPSBvcHRpb25zLmNvbnRlbnQ7XG5cbiAgICBvdmVybGF5LmVsID0gZWw7XG5cbiAgICBpZiAoIW9wdGlvbnMubGF5ZXIpIHtcbiAgICAgIG9wdGlvbnMubGF5ZXIgPSAnb3ZlcmxheUxheWVyJztcbiAgICB9XG4gICAgXG4gICAgdmFyIHBhbmVzID0gdGhpcy5nZXRQYW5lcygpLFxuICAgICAgICBvdmVybGF5TGF5ZXIgPSBwYW5lc1tvcHRpb25zLmxheWVyXSxcbiAgICAgICAgc3RvcF9vdmVybGF5X2V2ZW50cyA9IFsnY29udGV4dG1lbnUnLCAnRE9NTW91c2VTY3JvbGwnLCAnZGJsY2xpY2snLCAnbW91c2Vkb3duJ107XG5cbiAgICBvdmVybGF5TGF5ZXIuYXBwZW5kQ2hpbGQoZWwpO1xuXG4gICAgZm9yICh2YXIgZXYgPSAwOyBldiA8IHN0b3Bfb3ZlcmxheV9ldmVudHMubGVuZ3RoOyBldisrKSB7XG4gICAgICAoZnVuY3Rpb24ob2JqZWN0LCBuYW1lKSB7XG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKG9iamVjdCwgbmFtZSwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdtc2llJykgIT0gLTEgJiYgZG9jdW1lbnQuYWxsKSB7XG4gICAgICAgICAgICBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSkoZWwsIHN0b3Bfb3ZlcmxheV9ldmVudHNbZXZdKTtcbiAgICB9XG5cbiAgICBnb29nbGUubWFwcy5ldmVudC50cmlnZ2VyKHRoaXMsICdyZWFkeScpO1xuICB9O1xuXG4gIG92ZXJsYXkuZHJhdyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwcm9qZWN0aW9uID0gdGhpcy5nZXRQcm9qZWN0aW9uKCksXG4gICAgICAgIHBpeGVsID0gcHJvamVjdGlvbi5mcm9tTGF0TG5nVG9EaXZQaXhlbChuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG9wdGlvbnMubGF0LCBvcHRpb25zLmxuZykpO1xuXG4gICAgb3B0aW9ucy5ob3Jpem9udGFsT2Zmc2V0ID0gb3B0aW9ucy5ob3Jpem9udGFsT2Zmc2V0IHx8IDA7XG4gICAgb3B0aW9ucy52ZXJ0aWNhbE9mZnNldCA9IG9wdGlvbnMudmVydGljYWxPZmZzZXQgfHwgMDtcblxuICAgIHZhciBlbCA9IG92ZXJsYXkuZWwsXG4gICAgICAgIGNvbnRlbnQgPSBlbC5jaGlsZHJlblswXSxcbiAgICAgICAgY29udGVudF9oZWlnaHQgPSBjb250ZW50LmNsaWVudEhlaWdodCxcbiAgICAgICAgY29udGVudF93aWR0aCA9IGNvbnRlbnQuY2xpZW50V2lkdGg7XG5cbiAgICBzd2l0Y2ggKG9wdGlvbnMudmVydGljYWxBbGlnbikge1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgZWwuc3R5bGUudG9wID0gKHBpeGVsLnkgLSBjb250ZW50X2hlaWdodCArIG9wdGlvbnMudmVydGljYWxPZmZzZXQpICsgJ3B4JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSAnbWlkZGxlJzpcbiAgICAgICAgZWwuc3R5bGUudG9wID0gKHBpeGVsLnkgLSAoY29udGVudF9oZWlnaHQgLyAyKSArIG9wdGlvbnMudmVydGljYWxPZmZzZXQpICsgJ3B4JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICBlbC5zdHlsZS50b3AgPSAocGl4ZWwueSArIG9wdGlvbnMudmVydGljYWxPZmZzZXQpICsgJ3B4JztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoIChvcHRpb25zLmhvcml6b250YWxBbGlnbikge1xuICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgIGVsLnN0eWxlLmxlZnQgPSAocGl4ZWwueCAtIGNvbnRlbnRfd2lkdGggKyBvcHRpb25zLmhvcml6b250YWxPZmZzZXQpICsgJ3B4JztcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgZWwuc3R5bGUubGVmdCA9IChwaXhlbC54IC0gKGNvbnRlbnRfd2lkdGggLyAyKSArIG9wdGlvbnMuaG9yaXpvbnRhbE9mZnNldCkgKyAncHgnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgZWwuc3R5bGUubGVmdCA9IChwaXhlbC54ICsgb3B0aW9ucy5ob3Jpem9udGFsT2Zmc2V0KSArICdweCc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSBhdXRvX3Nob3cgPyAnYmxvY2snIDogJ25vbmUnO1xuXG4gICAgaWYgKCFhdXRvX3Nob3cpIHtcbiAgICAgIG9wdGlvbnMuc2hvdy5hcHBseSh0aGlzLCBbZWxdKTtcbiAgICB9XG4gIH07XG5cbiAgb3ZlcmxheS5vblJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbCA9IG92ZXJsYXkuZWw7XG5cbiAgICBpZiAob3B0aW9ucy5yZW1vdmUpIHtcbiAgICAgIG9wdGlvbnMucmVtb3ZlLmFwcGx5KHRoaXMsIFtlbF0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG92ZXJsYXkuZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvdmVybGF5LmVsKTtcbiAgICAgIG92ZXJsYXkuZWwgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLm92ZXJsYXlzLnB1c2gob3ZlcmxheSk7XG4gIHJldHVybiBvdmVybGF5O1xufTtcblxuR01hcHMucHJvdG90eXBlLnJlbW92ZU92ZXJsYXkgPSBmdW5jdGlvbihvdmVybGF5KSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vdmVybGF5cy5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0aGlzLm92ZXJsYXlzW2ldID09PSBvdmVybGF5KSB7XG4gICAgICB0aGlzLm92ZXJsYXlzW2ldLnNldE1hcChudWxsKTtcbiAgICAgIHRoaXMub3ZlcmxheXMuc3BsaWNlKGksIDEpO1xuXG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn07XG5cbkdNYXBzLnByb3RvdHlwZS5yZW1vdmVPdmVybGF5cyA9IGZ1bmN0aW9uKCkge1xuICBmb3IgKHZhciBpID0gMCwgaXRlbTsgaXRlbSA9IHRoaXMub3ZlcmxheXNbaV07IGkrKykge1xuICAgIGl0ZW0uc2V0TWFwKG51bGwpO1xuICB9XG5cbiAgdGhpcy5vdmVybGF5cyA9IFtdO1xufTtcblxuR01hcHMucHJvdG90eXBlLmRyYXdQb2x5bGluZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgdmFyIHBhdGggPSBbXSxcbiAgICAgIHBvaW50cyA9IG9wdGlvbnMucGF0aDtcblxuICBpZiAocG9pbnRzLmxlbmd0aCkge1xuICAgIGlmIChwb2ludHNbMF1bMF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGF0aCA9IHBvaW50cztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBmb3IgKHZhciBpPTAsIGxhdGxuZzsgbGF0bG5nPXBvaW50c1tpXTsgaSsrKSB7XG4gICAgICAgIHBhdGgucHVzaChuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdGxuZ1swXSwgbGF0bG5nWzFdKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHBvbHlsaW5lX29wdGlvbnMgPSB7XG4gICAgbWFwOiB0aGlzLm1hcCxcbiAgICBwYXRoOiBwYXRoLFxuICAgIHN0cm9rZUNvbG9yOiBvcHRpb25zLnN0cm9rZUNvbG9yLFxuICAgIHN0cm9rZU9wYWNpdHk6IG9wdGlvbnMuc3Ryb2tlT3BhY2l0eSxcbiAgICBzdHJva2VXZWlnaHQ6IG9wdGlvbnMuc3Ryb2tlV2VpZ2h0LFxuICAgIGdlb2Rlc2ljOiBvcHRpb25zLmdlb2Rlc2ljLFxuICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICBlZGl0YWJsZTogZmFsc2UsXG4gICAgdmlzaWJsZTogdHJ1ZVxuICB9O1xuXG4gIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KFwiY2xpY2thYmxlXCIpKSB7XG4gICAgcG9seWxpbmVfb3B0aW9ucy5jbGlja2FibGUgPSBvcHRpb25zLmNsaWNrYWJsZTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KFwiZWRpdGFibGVcIikpIHtcbiAgICBwb2x5bGluZV9vcHRpb25zLmVkaXRhYmxlID0gb3B0aW9ucy5lZGl0YWJsZTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KFwiaWNvbnNcIikpIHtcbiAgICBwb2x5bGluZV9vcHRpb25zLmljb25zID0gb3B0aW9ucy5pY29ucztcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KFwiekluZGV4XCIpKSB7XG4gICAgcG9seWxpbmVfb3B0aW9ucy56SW5kZXggPSBvcHRpb25zLnpJbmRleDtcbiAgfVxuXG4gIHZhciBwb2x5bGluZSA9IG5ldyBnb29nbGUubWFwcy5Qb2x5bGluZShwb2x5bGluZV9vcHRpb25zKTtcblxuICB2YXIgcG9seWxpbmVfZXZlbnRzID0gWydjbGljaycsICdkYmxjbGljaycsICdtb3VzZWRvd24nLCAnbW91c2Vtb3ZlJywgJ21vdXNlb3V0JywgJ21vdXNlb3ZlcicsICdtb3VzZXVwJywgJ3JpZ2h0Y2xpY2snXTtcblxuICBmb3IgKHZhciBldiA9IDA7IGV2IDwgcG9seWxpbmVfZXZlbnRzLmxlbmd0aDsgZXYrKykge1xuICAgIChmdW5jdGlvbihvYmplY3QsIG5hbWUpIHtcbiAgICAgIGlmIChvcHRpb25zW25hbWVdKSB7XG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgb3B0aW9uc1tuYW1lXS5hcHBseSh0aGlzLCBbZV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KShwb2x5bGluZSwgcG9seWxpbmVfZXZlbnRzW2V2XSk7XG4gIH1cblxuICB0aGlzLnBvbHlsaW5lcy5wdXNoKHBvbHlsaW5lKTtcblxuICBHTWFwcy5maXJlKCdwb2x5bGluZV9hZGRlZCcsIHBvbHlsaW5lLCB0aGlzKTtcblxuICByZXR1cm4gcG9seWxpbmU7XG59O1xuXG5HTWFwcy5wcm90b3R5cGUucmVtb3ZlUG9seWxpbmUgPSBmdW5jdGlvbihwb2x5bGluZSkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucG9seWxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHRoaXMucG9seWxpbmVzW2ldID09PSBwb2x5bGluZSkge1xuICAgICAgdGhpcy5wb2x5bGluZXNbaV0uc2V0TWFwKG51bGwpO1xuICAgICAgdGhpcy5wb2x5bGluZXMuc3BsaWNlKGksIDEpO1xuXG4gICAgICBHTWFwcy5maXJlKCdwb2x5bGluZV9yZW1vdmVkJywgcG9seWxpbmUsIHRoaXMpO1xuXG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn07XG5cbkdNYXBzLnByb3RvdHlwZS5yZW1vdmVQb2x5bGluZXMgPSBmdW5jdGlvbigpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGl0ZW07IGl0ZW0gPSB0aGlzLnBvbHlsaW5lc1tpXTsgaSsrKSB7XG4gICAgaXRlbS5zZXRNYXAobnVsbCk7XG4gIH1cblxuICB0aGlzLnBvbHlsaW5lcyA9IFtdO1xufTtcblxuR01hcHMucHJvdG90eXBlLmRyYXdDaXJjbGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSAgZXh0ZW5kX29iamVjdCh7XG4gICAgbWFwOiB0aGlzLm1hcCxcbiAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcob3B0aW9ucy5sYXQsIG9wdGlvbnMubG5nKVxuICB9LCBvcHRpb25zKTtcblxuICBkZWxldGUgb3B0aW9ucy5sYXQ7XG4gIGRlbGV0ZSBvcHRpb25zLmxuZztcblxuICB2YXIgcG9seWdvbiA9IG5ldyBnb29nbGUubWFwcy5DaXJjbGUob3B0aW9ucyksXG4gICAgICBwb2x5Z29uX2V2ZW50cyA9IFsnY2xpY2snLCAnZGJsY2xpY2snLCAnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZW91dCcsICdtb3VzZW92ZXInLCAnbW91c2V1cCcsICdyaWdodGNsaWNrJ107XG5cbiAgZm9yICh2YXIgZXYgPSAwOyBldiA8IHBvbHlnb25fZXZlbnRzLmxlbmd0aDsgZXYrKykge1xuICAgIChmdW5jdGlvbihvYmplY3QsIG5hbWUpIHtcbiAgICAgIGlmIChvcHRpb25zW25hbWVdKSB7XG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgb3B0aW9uc1tuYW1lXS5hcHBseSh0aGlzLCBbZV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KShwb2x5Z29uLCBwb2x5Z29uX2V2ZW50c1tldl0pO1xuICB9XG5cbiAgdGhpcy5wb2x5Z29ucy5wdXNoKHBvbHlnb24pO1xuXG4gIHJldHVybiBwb2x5Z29uO1xufTtcblxuR01hcHMucHJvdG90eXBlLmRyYXdSZWN0YW5nbGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBleHRlbmRfb2JqZWN0KHtcbiAgICBtYXA6IHRoaXMubWFwXG4gIH0sIG9wdGlvbnMpO1xuXG4gIHZhciBsYXRMbmdCb3VuZHMgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKFxuICAgIG5ldyBnb29nbGUubWFwcy5MYXRMbmcob3B0aW9ucy5ib3VuZHNbMF1bMF0sIG9wdGlvbnMuYm91bmRzWzBdWzFdKSxcbiAgICBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG9wdGlvbnMuYm91bmRzWzFdWzBdLCBvcHRpb25zLmJvdW5kc1sxXVsxXSlcbiAgKTtcblxuICBvcHRpb25zLmJvdW5kcyA9IGxhdExuZ0JvdW5kcztcblxuICB2YXIgcG9seWdvbiA9IG5ldyBnb29nbGUubWFwcy5SZWN0YW5nbGUob3B0aW9ucyksXG4gICAgICBwb2x5Z29uX2V2ZW50cyA9IFsnY2xpY2snLCAnZGJsY2xpY2snLCAnbW91c2Vkb3duJywgJ21vdXNlbW92ZScsICdtb3VzZW91dCcsICdtb3VzZW92ZXInLCAnbW91c2V1cCcsICdyaWdodGNsaWNrJ107XG5cbiAgZm9yICh2YXIgZXYgPSAwOyBldiA8IHBvbHlnb25fZXZlbnRzLmxlbmd0aDsgZXYrKykge1xuICAgIChmdW5jdGlvbihvYmplY3QsIG5hbWUpIHtcbiAgICAgIGlmIChvcHRpb25zW25hbWVdKSB7XG4gICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG9iamVjdCwgbmFtZSwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgb3B0aW9uc1tuYW1lXS5hcHBseSh0aGlzLCBbZV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KShwb2x5Z29uLCBwb2x5Z29uX2V2ZW50c1tldl0pO1xuICB9XG5cbiAgdGhpcy5wb2x5Z29ucy5wdXNoKHBvbHlnb24pO1xuXG4gIHJldHVybiBwb2x5Z29uO1xufTtcblxuR01hcHMucHJvdG90eXBlLmRyYXdQb2x5Z29uID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgdXNlR2VvSlNPTiA9IGZhbHNlO1xuXG4gIGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJ1c2VHZW9KU09OXCIpKSB7XG4gICAgdXNlR2VvSlNPTiA9IG9wdGlvbnMudXNlR2VvSlNPTjtcbiAgfVxuXG4gIGRlbGV0ZSBvcHRpb25zLnVzZUdlb0pTT047XG5cbiAgb3B0aW9ucyA9IGV4dGVuZF9vYmplY3Qoe1xuICAgIG1hcDogdGhpcy5tYXBcbiAgfSwgb3B0aW9ucyk7XG5cbiAgaWYgKHVzZUdlb0pTT04gPT0gZmFsc2UpIHtcbiAgICBvcHRpb25zLnBhdGhzID0gW29wdGlvbnMucGF0aHMuc2xpY2UoMCldO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMucGF0aHMubGVuZ3RoID4gMCkge1xuICAgIGlmIChvcHRpb25zLnBhdGhzWzBdLmxlbmd0aCA+IDApIHtcbiAgICAgIG9wdGlvbnMucGF0aHMgPSBhcnJheV9mbGF0KGFycmF5X21hcChvcHRpb25zLnBhdGhzLCBhcnJheVRvTGF0TG5nLCB1c2VHZW9KU09OKSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHBvbHlnb24gPSBuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbihvcHRpb25zKSxcbiAgICAgIHBvbHlnb25fZXZlbnRzID0gWydjbGljaycsICdkYmxjbGljaycsICdtb3VzZWRvd24nLCAnbW91c2Vtb3ZlJywgJ21vdXNlb3V0JywgJ21vdXNlb3ZlcicsICdtb3VzZXVwJywgJ3JpZ2h0Y2xpY2snXTtcblxuICBmb3IgKHZhciBldiA9IDA7IGV2IDwgcG9seWdvbl9ldmVudHMubGVuZ3RoOyBldisrKSB7XG4gICAgKGZ1bmN0aW9uKG9iamVjdCwgbmFtZSkge1xuICAgICAgaWYgKG9wdGlvbnNbbmFtZV0pIHtcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICBvcHRpb25zW25hbWVdLmFwcGx5KHRoaXMsIFtlXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pKHBvbHlnb24sIHBvbHlnb25fZXZlbnRzW2V2XSk7XG4gIH1cblxuICB0aGlzLnBvbHlnb25zLnB1c2gocG9seWdvbik7XG5cbiAgR01hcHMuZmlyZSgncG9seWdvbl9hZGRlZCcsIHBvbHlnb24sIHRoaXMpO1xuXG4gIHJldHVybiBwb2x5Z29uO1xufTtcblxuR01hcHMucHJvdG90eXBlLnJlbW92ZVBvbHlnb24gPSBmdW5jdGlvbihwb2x5Z29uKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wb2x5Z29ucy5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0aGlzLnBvbHlnb25zW2ldID09PSBwb2x5Z29uKSB7XG4gICAgICB0aGlzLnBvbHlnb25zW2ldLnNldE1hcChudWxsKTtcbiAgICAgIHRoaXMucG9seWdvbnMuc3BsaWNlKGksIDEpO1xuXG4gICAgICBHTWFwcy5maXJlKCdwb2x5Z29uX3JlbW92ZWQnLCBwb2x5Z29uLCB0aGlzKTtcblxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59O1xuXG5HTWFwcy5wcm90b3R5cGUucmVtb3ZlUG9seWdvbnMgPSBmdW5jdGlvbigpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGl0ZW07IGl0ZW0gPSB0aGlzLnBvbHlnb25zW2ldOyBpKyspIHtcbiAgICBpdGVtLnNldE1hcChudWxsKTtcbiAgfVxuXG4gIHRoaXMucG9seWdvbnMgPSBbXTtcbn07XG5cbkdNYXBzLnByb3RvdHlwZS5nZXRGcm9tRnVzaW9uVGFibGVzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgZXZlbnRzID0gb3B0aW9ucy5ldmVudHM7XG5cbiAgZGVsZXRlIG9wdGlvbnMuZXZlbnRzO1xuXG4gIHZhciBmdXNpb25fdGFibGVzX29wdGlvbnMgPSBvcHRpb25zLFxuICAgICAgbGF5ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuRnVzaW9uVGFibGVzTGF5ZXIoZnVzaW9uX3RhYmxlc19vcHRpb25zKTtcblxuICBmb3IgKHZhciBldiBpbiBldmVudHMpIHtcbiAgICAoZnVuY3Rpb24ob2JqZWN0LCBuYW1lKSB7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZXZlbnRzW25hbWVdLmFwcGx5KHRoaXMsIFtlXSk7XG4gICAgICB9KTtcbiAgICB9KShsYXllciwgZXYpO1xuICB9XG5cbiAgdGhpcy5sYXllcnMucHVzaChsYXllcik7XG5cbiAgcmV0dXJuIGxheWVyO1xufTtcblxuR01hcHMucHJvdG90eXBlLmxvYWRGcm9tRnVzaW9uVGFibGVzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgbGF5ZXIgPSB0aGlzLmdldEZyb21GdXNpb25UYWJsZXMob3B0aW9ucyk7XG4gIGxheWVyLnNldE1hcCh0aGlzLm1hcCk7XG5cbiAgcmV0dXJuIGxheWVyO1xufTtcblxuR01hcHMucHJvdG90eXBlLmdldEZyb21LTUwgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHZhciB1cmwgPSBvcHRpb25zLnVybCxcbiAgICAgIGV2ZW50cyA9IG9wdGlvbnMuZXZlbnRzO1xuXG4gIGRlbGV0ZSBvcHRpb25zLnVybDtcbiAgZGVsZXRlIG9wdGlvbnMuZXZlbnRzO1xuXG4gIHZhciBrbWxfb3B0aW9ucyA9IG9wdGlvbnMsXG4gICAgICBsYXllciA9IG5ldyBnb29nbGUubWFwcy5LbWxMYXllcih1cmwsIGttbF9vcHRpb25zKTtcblxuICBmb3IgKHZhciBldiBpbiBldmVudHMpIHtcbiAgICAoZnVuY3Rpb24ob2JqZWN0LCBuYW1lKSB7XG4gICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihvYmplY3QsIG5hbWUsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZXZlbnRzW25hbWVdLmFwcGx5KHRoaXMsIFtlXSk7XG4gICAgICB9KTtcbiAgICB9KShsYXllciwgZXYpO1xuICB9XG5cbiAgdGhpcy5sYXllcnMucHVzaChsYXllcik7XG5cbiAgcmV0dXJuIGxheWVyO1xufTtcblxuR01hcHMucHJvdG90eXBlLmxvYWRGcm9tS01MID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgbGF5ZXIgPSB0aGlzLmdldEZyb21LTUwob3B0aW9ucyk7XG4gIGxheWVyLnNldE1hcCh0aGlzLm1hcCk7XG5cbiAgcmV0dXJuIGxheWVyO1xufTtcblxuR01hcHMucHJvdG90eXBlLmFkZExheWVyID0gZnVuY3Rpb24obGF5ZXJOYW1lLCBvcHRpb25zKSB7XG4gIC8vdmFyIGRlZmF1bHRfbGF5ZXJzID0gWyd3ZWF0aGVyJywgJ2Nsb3VkcycsICd0cmFmZmljJywgJ3RyYW5zaXQnLCAnYmljeWNsaW5nJywgJ3Bhbm9yYW1pbycsICdwbGFjZXMnXTtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBsYXllcjtcblxuICBzd2l0Y2gobGF5ZXJOYW1lKSB7XG4gICAgY2FzZSAnd2VhdGhlcic6IHRoaXMuc2luZ2xlTGF5ZXJzLndlYXRoZXIgPSBsYXllciA9IG5ldyBnb29nbGUubWFwcy53ZWF0aGVyLldlYXRoZXJMYXllcigpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnY2xvdWRzJzogdGhpcy5zaW5nbGVMYXllcnMuY2xvdWRzID0gbGF5ZXIgPSBuZXcgZ29vZ2xlLm1hcHMud2VhdGhlci5DbG91ZExheWVyKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd0cmFmZmljJzogdGhpcy5zaW5nbGVMYXllcnMudHJhZmZpYyA9IGxheWVyID0gbmV3IGdvb2dsZS5tYXBzLlRyYWZmaWNMYXllcigpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndHJhbnNpdCc6IHRoaXMuc2luZ2xlTGF5ZXJzLnRyYW5zaXQgPSBsYXllciA9IG5ldyBnb29nbGUubWFwcy5UcmFuc2l0TGF5ZXIoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2JpY3ljbGluZyc6IHRoaXMuc2luZ2xlTGF5ZXJzLmJpY3ljbGluZyA9IGxheWVyID0gbmV3IGdvb2dsZS5tYXBzLkJpY3ljbGluZ0xheWVyKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwYW5vcmFtaW8nOlxuICAgICAgICB0aGlzLnNpbmdsZUxheWVycy5wYW5vcmFtaW8gPSBsYXllciA9IG5ldyBnb29nbGUubWFwcy5wYW5vcmFtaW8uUGFub3JhbWlvTGF5ZXIoKTtcbiAgICAgICAgbGF5ZXIuc2V0VGFnKG9wdGlvbnMuZmlsdGVyKTtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnMuZmlsdGVyO1xuXG4gICAgICAgIC8vY2xpY2sgZXZlbnRcbiAgICAgICAgaWYgKG9wdGlvbnMuY2xpY2spIHtcbiAgICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihsYXllciwgJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuY2xpY2soZXZlbnQpO1xuICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnMuY2xpY2s7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncGxhY2VzJzpcbiAgICAgICAgdGhpcy5zaW5nbGVMYXllcnMucGxhY2VzID0gbGF5ZXIgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLlBsYWNlc1NlcnZpY2UodGhpcy5tYXApO1xuXG4gICAgICAgIC8vc2VhcmNoIGFuZCAgbmVhcmJ5U2VhcmNoIGNhbGxiYWNrLCBCb3RoIGFyZSB0aGUgc2FtZVxuICAgICAgICBpZiAob3B0aW9ucy5zZWFyY2ggfHwgb3B0aW9ucy5uZWFyYnlTZWFyY2gpIHtcbiAgICAgICAgICB2YXIgcGxhY2VTZWFyY2hSZXF1ZXN0ICA9IHtcbiAgICAgICAgICAgIGJvdW5kcyA6IG9wdGlvbnMuYm91bmRzIHx8IG51bGwsXG4gICAgICAgICAgICBrZXl3b3JkIDogb3B0aW9ucy5rZXl3b3JkIHx8IG51bGwsXG4gICAgICAgICAgICBsb2NhdGlvbiA6IG9wdGlvbnMubG9jYXRpb24gfHwgbnVsbCxcbiAgICAgICAgICAgIG5hbWUgOiBvcHRpb25zLm5hbWUgfHwgbnVsbCxcbiAgICAgICAgICAgIHJhZGl1cyA6IG9wdGlvbnMucmFkaXVzIHx8IG51bGwsXG4gICAgICAgICAgICByYW5rQnkgOiBvcHRpb25zLnJhbmtCeSB8fCBudWxsLFxuICAgICAgICAgICAgdHlwZXMgOiBvcHRpb25zLnR5cGVzIHx8IG51bGxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKG9wdGlvbnMuc2VhcmNoKSB7XG4gICAgICAgICAgICBsYXllci5zZWFyY2gocGxhY2VTZWFyY2hSZXF1ZXN0LCBvcHRpb25zLnNlYXJjaCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG9wdGlvbnMubmVhcmJ5U2VhcmNoKSB7XG4gICAgICAgICAgICBsYXllci5uZWFyYnlTZWFyY2gocGxhY2VTZWFyY2hSZXF1ZXN0LCBvcHRpb25zLm5lYXJieVNlYXJjaCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy90ZXh0U2VhcmNoIGNhbGxiYWNrXG4gICAgICAgIGlmIChvcHRpb25zLnRleHRTZWFyY2gpIHtcbiAgICAgICAgICB2YXIgdGV4dFNlYXJjaFJlcXVlc3QgID0ge1xuICAgICAgICAgICAgYm91bmRzIDogb3B0aW9ucy5ib3VuZHMgfHwgbnVsbCxcbiAgICAgICAgICAgIGxvY2F0aW9uIDogb3B0aW9ucy5sb2NhdGlvbiB8fCBudWxsLFxuICAgICAgICAgICAgcXVlcnkgOiBvcHRpb25zLnF1ZXJ5IHx8IG51bGwsXG4gICAgICAgICAgICByYWRpdXMgOiBvcHRpb25zLnJhZGl1cyB8fCBudWxsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGxheWVyLnRleHRTZWFyY2godGV4dFNlYXJjaFJlcXVlc3QsIG9wdGlvbnMudGV4dFNlYXJjaCk7XG4gICAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgaWYgKGxheWVyICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIGxheWVyLnNldE9wdGlvbnMgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGF5ZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsYXllci5zZXRNYXAgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGF5ZXIuc2V0TWFwKHRoaXMubWFwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGF5ZXI7XG4gIH1cbn07XG5cbkdNYXBzLnByb3RvdHlwZS5yZW1vdmVMYXllciA9IGZ1bmN0aW9uKGxheWVyKSB7XG4gIGlmICh0eXBlb2YobGF5ZXIpID09IFwic3RyaW5nXCIgJiYgdGhpcy5zaW5nbGVMYXllcnNbbGF5ZXJdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgdGhpcy5zaW5nbGVMYXllcnNbbGF5ZXJdLnNldE1hcChudWxsKTtcblxuICAgICBkZWxldGUgdGhpcy5zaW5nbGVMYXllcnNbbGF5ZXJdO1xuICB9XG4gIGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmxheWVyc1tpXSA9PT0gbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5sYXllcnNbaV0uc2V0TWFwKG51bGwpO1xuICAgICAgICB0aGlzLmxheWVycy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG52YXIgdHJhdmVsTW9kZSwgdW5pdFN5c3RlbTtcblxuR01hcHMucHJvdG90eXBlLmdldFJvdXRlcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgc3dpdGNoIChvcHRpb25zLnRyYXZlbE1vZGUpIHtcbiAgICBjYXNlICdiaWN5Y2xpbmcnOlxuICAgICAgdHJhdmVsTW9kZSA9IGdvb2dsZS5tYXBzLlRyYXZlbE1vZGUuQklDWUNMSU5HO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndHJhbnNpdCc6XG4gICAgICB0cmF2ZWxNb2RlID0gZ29vZ2xlLm1hcHMuVHJhdmVsTW9kZS5UUkFOU0lUO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZHJpdmluZyc6XG4gICAgICB0cmF2ZWxNb2RlID0gZ29vZ2xlLm1hcHMuVHJhdmVsTW9kZS5EUklWSU5HO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRyYXZlbE1vZGUgPSBnb29nbGUubWFwcy5UcmF2ZWxNb2RlLldBTEtJTkc7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGlmIChvcHRpb25zLnVuaXRTeXN0ZW0gPT09ICdpbXBlcmlhbCcpIHtcbiAgICB1bml0U3lzdGVtID0gZ29vZ2xlLm1hcHMuVW5pdFN5c3RlbS5JTVBFUklBTDtcbiAgfVxuICBlbHNlIHtcbiAgICB1bml0U3lzdGVtID0gZ29vZ2xlLm1hcHMuVW5pdFN5c3RlbS5NRVRSSUM7XG4gIH1cblxuICB2YXIgYmFzZV9vcHRpb25zID0ge1xuICAgICAgICBhdm9pZEhpZ2h3YXlzOiBmYWxzZSxcbiAgICAgICAgYXZvaWRUb2xsczogZmFsc2UsXG4gICAgICAgIG9wdGltaXplV2F5cG9pbnRzOiBmYWxzZSxcbiAgICAgICAgd2F5cG9pbnRzOiBbXVxuICAgICAgfSxcbiAgICAgIHJlcXVlc3Rfb3B0aW9ucyA9ICBleHRlbmRfb2JqZWN0KGJhc2Vfb3B0aW9ucywgb3B0aW9ucyk7XG5cbiAgcmVxdWVzdF9vcHRpb25zLm9yaWdpbiA9IC9zdHJpbmcvLnRlc3QodHlwZW9mIG9wdGlvbnMub3JpZ2luKSA/IG9wdGlvbnMub3JpZ2luIDogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhvcHRpb25zLm9yaWdpblswXSwgb3B0aW9ucy5vcmlnaW5bMV0pO1xuICByZXF1ZXN0X29wdGlvbnMuZGVzdGluYXRpb24gPSAvc3RyaW5nLy50ZXN0KHR5cGVvZiBvcHRpb25zLmRlc3RpbmF0aW9uKSA/IG9wdGlvbnMuZGVzdGluYXRpb24gOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG9wdGlvbnMuZGVzdGluYXRpb25bMF0sIG9wdGlvbnMuZGVzdGluYXRpb25bMV0pO1xuICByZXF1ZXN0X29wdGlvbnMudHJhdmVsTW9kZSA9IHRyYXZlbE1vZGU7XG4gIHJlcXVlc3Rfb3B0aW9ucy51bml0U3lzdGVtID0gdW5pdFN5c3RlbTtcblxuICBkZWxldGUgcmVxdWVzdF9vcHRpb25zLmNhbGxiYWNrO1xuICBkZWxldGUgcmVxdWVzdF9vcHRpb25zLmVycm9yO1xuXG4gIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIHNlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1NlcnZpY2UoKTtcblxuICBzZXJ2aWNlLnJvdXRlKHJlcXVlc3Rfb3B0aW9ucywgZnVuY3Rpb24ocmVzdWx0LCBzdGF0dXMpIHtcbiAgICBpZiAoc3RhdHVzID09PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9LKSB7XG4gICAgICBmb3IgKHZhciByIGluIHJlc3VsdC5yb3V0ZXMpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5yb3V0ZXMuaGFzT3duUHJvcGVydHkocikpIHtcbiAgICAgICAgICBzZWxmLnJvdXRlcy5wdXNoKHJlc3VsdC5yb3V0ZXNbcl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLmNhbGxiYWNrKSB7XG4gICAgICAgIG9wdGlvbnMuY2FsbGJhY2soc2VsZi5yb3V0ZXMpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlmIChvcHRpb25zLmVycm9yKSB7XG4gICAgICAgIG9wdGlvbnMuZXJyb3IocmVzdWx0LCBzdGF0dXMpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG5HTWFwcy5wcm90b3R5cGUucmVtb3ZlUm91dGVzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucm91dGVzID0gW107XG59O1xuXG5HTWFwcy5wcm90b3R5cGUuZ2V0RWxldmF0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IGV4dGVuZF9vYmplY3Qoe1xuICAgIGxvY2F0aW9uczogW10sXG4gICAgcGF0aCA6IGZhbHNlLFxuICAgIHNhbXBsZXMgOiAyNTZcbiAgfSwgb3B0aW9ucyk7XG5cbiAgaWYgKG9wdGlvbnMubG9jYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICBpZiAob3B0aW9ucy5sb2NhdGlvbnNbMF0ubGVuZ3RoID4gMCkge1xuICAgICAgb3B0aW9ucy5sb2NhdGlvbnMgPSBhcnJheV9mbGF0KGFycmF5X21hcChbb3B0aW9ucy5sb2NhdGlvbnNdLCBhcnJheVRvTGF0TG5nLCAgZmFsc2UpKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrO1xuICBkZWxldGUgb3B0aW9ucy5jYWxsYmFjaztcblxuICB2YXIgc2VydmljZSA9IG5ldyBnb29nbGUubWFwcy5FbGV2YXRpb25TZXJ2aWNlKCk7XG5cbiAgLy9sb2NhdGlvbiByZXF1ZXN0XG4gIGlmICghb3B0aW9ucy5wYXRoKSB7XG4gICAgZGVsZXRlIG9wdGlvbnMucGF0aDtcbiAgICBkZWxldGUgb3B0aW9ucy5zYW1wbGVzO1xuXG4gICAgc2VydmljZS5nZXRFbGV2YXRpb25Gb3JMb2NhdGlvbnMob3B0aW9ucywgZnVuY3Rpb24ocmVzdWx0LCBzdGF0dXMpIHtcbiAgICAgIGlmIChjYWxsYmFjayAmJiB0eXBlb2YoY2FsbGJhY2spID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2socmVzdWx0LCBzdGF0dXMpO1xuICAgICAgfVxuICAgIH0pO1xuICAvL3BhdGggcmVxdWVzdFxuICB9IGVsc2Uge1xuICAgIHZhciBwYXRoUmVxdWVzdCA9IHtcbiAgICAgIHBhdGggOiBvcHRpb25zLmxvY2F0aW9ucyxcbiAgICAgIHNhbXBsZXMgOiBvcHRpb25zLnNhbXBsZXNcbiAgICB9O1xuXG4gICAgc2VydmljZS5nZXRFbGV2YXRpb25BbG9uZ1BhdGgocGF0aFJlcXVlc3QsIGZ1bmN0aW9uKHJlc3VsdCwgc3RhdHVzKSB7XG4gICAgIGlmIChjYWxsYmFjayAmJiB0eXBlb2YoY2FsbGJhY2spID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2socmVzdWx0LCBzdGF0dXMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG5HTWFwcy5wcm90b3R5cGUuY2xlYW5Sb3V0ZSA9IEdNYXBzLnByb3RvdHlwZS5yZW1vdmVQb2x5bGluZXM7XG5cbkdNYXBzLnByb3RvdHlwZS5kcmF3Um91dGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLmdldFJvdXRlcyh7XG4gICAgb3JpZ2luOiBvcHRpb25zLm9yaWdpbixcbiAgICBkZXN0aW5hdGlvbjogb3B0aW9ucy5kZXN0aW5hdGlvbixcbiAgICB0cmF2ZWxNb2RlOiBvcHRpb25zLnRyYXZlbE1vZGUsXG4gICAgd2F5cG9pbnRzOiBvcHRpb25zLndheXBvaW50cyxcbiAgICB1bml0U3lzdGVtOiBvcHRpb25zLnVuaXRTeXN0ZW0sXG4gICAgZXJyb3I6IG9wdGlvbnMuZXJyb3IsXG4gICAgY2FsbGJhY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc2VsZi5kcmF3UG9seWxpbmUoe1xuICAgICAgICAgIHBhdGg6IGVbZS5sZW5ndGggLSAxXS5vdmVydmlld19wYXRoLFxuICAgICAgICAgIHN0cm9rZUNvbG9yOiBvcHRpb25zLnN0cm9rZUNvbG9yLFxuICAgICAgICAgIHN0cm9rZU9wYWNpdHk6IG9wdGlvbnMuc3Ryb2tlT3BhY2l0eSxcbiAgICAgICAgICBzdHJva2VXZWlnaHQ6IG9wdGlvbnMuc3Ryb2tlV2VpZ2h0XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaWYgKG9wdGlvbnMuY2FsbGJhY2spIHtcbiAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrKGVbZS5sZW5ndGggLSAxXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufTtcblxuR01hcHMucHJvdG90eXBlLnRyYXZlbFJvdXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICBpZiAob3B0aW9ucy5vcmlnaW4gJiYgb3B0aW9ucy5kZXN0aW5hdGlvbikge1xuICAgIHRoaXMuZ2V0Um91dGVzKHtcbiAgICAgIG9yaWdpbjogb3B0aW9ucy5vcmlnaW4sXG4gICAgICBkZXN0aW5hdGlvbjogb3B0aW9ucy5kZXN0aW5hdGlvbixcbiAgICAgIHRyYXZlbE1vZGU6IG9wdGlvbnMudHJhdmVsTW9kZSxcbiAgICAgIHdheXBvaW50cyA6IG9wdGlvbnMud2F5cG9pbnRzLFxuICAgICAgZXJyb3I6IG9wdGlvbnMuZXJyb3IsXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24oZSkge1xuICAgICAgICAvL3N0YXJ0IGNhbGxiYWNrXG4gICAgICAgIGlmIChlLmxlbmd0aCA+IDAgJiYgb3B0aW9ucy5zdGFydCkge1xuICAgICAgICAgIG9wdGlvbnMuc3RhcnQoZVtlLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc3RlcCBjYWxsYmFja1xuICAgICAgICBpZiAoZS5sZW5ndGggPiAwICYmIG9wdGlvbnMuc3RlcCkge1xuICAgICAgICAgIHZhciByb3V0ZSA9IGVbZS5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAocm91dGUubGVncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgc3RlcHMgPSByb3V0ZS5sZWdzWzBdLnN0ZXBzO1xuICAgICAgICAgICAgZm9yICh2YXIgaT0wLCBzdGVwOyBzdGVwPXN0ZXBzW2ldOyBpKyspIHtcbiAgICAgICAgICAgICAgc3RlcC5zdGVwX251bWJlciA9IGk7XG4gICAgICAgICAgICAgIG9wdGlvbnMuc3RlcChzdGVwLCAocm91dGUubGVnc1swXS5zdGVwcy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9lbmQgY2FsbGJhY2tcbiAgICAgICAgaWYgKGUubGVuZ3RoID4gMCAmJiBvcHRpb25zLmVuZCkge1xuICAgICAgICAgICBvcHRpb25zLmVuZChlW2UubGVuZ3RoIC0gMV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZWxzZSBpZiAob3B0aW9ucy5yb3V0ZSkge1xuICAgIGlmIChvcHRpb25zLnJvdXRlLmxlZ3MubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHN0ZXBzID0gb3B0aW9ucy5yb3V0ZS5sZWdzWzBdLnN0ZXBzO1xuICAgICAgZm9yICh2YXIgaT0wLCBzdGVwOyBzdGVwPXN0ZXBzW2ldOyBpKyspIHtcbiAgICAgICAgc3RlcC5zdGVwX251bWJlciA9IGk7XG4gICAgICAgIG9wdGlvbnMuc3RlcChzdGVwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbkdNYXBzLnByb3RvdHlwZS5kcmF3U3RlcHBlZFJvdXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIFxuICBpZiAob3B0aW9ucy5vcmlnaW4gJiYgb3B0aW9ucy5kZXN0aW5hdGlvbikge1xuICAgIHRoaXMuZ2V0Um91dGVzKHtcbiAgICAgIG9yaWdpbjogb3B0aW9ucy5vcmlnaW4sXG4gICAgICBkZXN0aW5hdGlvbjogb3B0aW9ucy5kZXN0aW5hdGlvbixcbiAgICAgIHRyYXZlbE1vZGU6IG9wdGlvbnMudHJhdmVsTW9kZSxcbiAgICAgIHdheXBvaW50cyA6IG9wdGlvbnMud2F5cG9pbnRzLFxuICAgICAgZXJyb3I6IG9wdGlvbnMuZXJyb3IsXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24oZSkge1xuICAgICAgICAvL3N0YXJ0IGNhbGxiYWNrXG4gICAgICAgIGlmIChlLmxlbmd0aCA+IDAgJiYgb3B0aW9ucy5zdGFydCkge1xuICAgICAgICAgIG9wdGlvbnMuc3RhcnQoZVtlLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc3RlcCBjYWxsYmFja1xuICAgICAgICBpZiAoZS5sZW5ndGggPiAwICYmIG9wdGlvbnMuc3RlcCkge1xuICAgICAgICAgIHZhciByb3V0ZSA9IGVbZS5sZW5ndGggLSAxXTtcbiAgICAgICAgICBpZiAocm91dGUubGVncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgc3RlcHMgPSByb3V0ZS5sZWdzWzBdLnN0ZXBzO1xuICAgICAgICAgICAgZm9yICh2YXIgaT0wLCBzdGVwOyBzdGVwPXN0ZXBzW2ldOyBpKyspIHtcbiAgICAgICAgICAgICAgc3RlcC5zdGVwX251bWJlciA9IGk7XG4gICAgICAgICAgICAgIHNlbGYuZHJhd1BvbHlsaW5lKHtcbiAgICAgICAgICAgICAgICBwYXRoOiBzdGVwLnBhdGgsXG4gICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IG9wdGlvbnMuc3Ryb2tlQ29sb3IsXG4gICAgICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eTogb3B0aW9ucy5zdHJva2VPcGFjaXR5LFxuICAgICAgICAgICAgICAgIHN0cm9rZVdlaWdodDogb3B0aW9ucy5zdHJva2VXZWlnaHRcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIG9wdGlvbnMuc3RlcChzdGVwLCAocm91dGUubGVnc1swXS5zdGVwcy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9lbmQgY2FsbGJhY2tcbiAgICAgICAgaWYgKGUubGVuZ3RoID4gMCAmJiBvcHRpb25zLmVuZCkge1xuICAgICAgICAgICBvcHRpb25zLmVuZChlW2UubGVuZ3RoIC0gMV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZWxzZSBpZiAob3B0aW9ucy5yb3V0ZSkge1xuICAgIGlmIChvcHRpb25zLnJvdXRlLmxlZ3MubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHN0ZXBzID0gb3B0aW9ucy5yb3V0ZS5sZWdzWzBdLnN0ZXBzO1xuICAgICAgZm9yICh2YXIgaT0wLCBzdGVwOyBzdGVwPXN0ZXBzW2ldOyBpKyspIHtcbiAgICAgICAgc3RlcC5zdGVwX251bWJlciA9IGk7XG4gICAgICAgIHNlbGYuZHJhd1BvbHlsaW5lKHtcbiAgICAgICAgICBwYXRoOiBzdGVwLnBhdGgsXG4gICAgICAgICAgc3Ryb2tlQ29sb3I6IG9wdGlvbnMuc3Ryb2tlQ29sb3IsXG4gICAgICAgICAgc3Ryb2tlT3BhY2l0eTogb3B0aW9ucy5zdHJva2VPcGFjaXR5LFxuICAgICAgICAgIHN0cm9rZVdlaWdodDogb3B0aW9ucy5zdHJva2VXZWlnaHRcbiAgICAgICAgfSk7XG4gICAgICAgIG9wdGlvbnMuc3RlcChzdGVwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbkdNYXBzLlJvdXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB0aGlzLm9yaWdpbiA9IG9wdGlvbnMub3JpZ2luO1xuICB0aGlzLmRlc3RpbmF0aW9uID0gb3B0aW9ucy5kZXN0aW5hdGlvbjtcbiAgdGhpcy53YXlwb2ludHMgPSBvcHRpb25zLndheXBvaW50cztcblxuICB0aGlzLm1hcCA9IG9wdGlvbnMubWFwO1xuICB0aGlzLnJvdXRlID0gb3B0aW9ucy5yb3V0ZTtcbiAgdGhpcy5zdGVwX2NvdW50ID0gMDtcbiAgdGhpcy5zdGVwcyA9IHRoaXMucm91dGUubGVnc1swXS5zdGVwcztcbiAgdGhpcy5zdGVwc19sZW5ndGggPSB0aGlzLnN0ZXBzLmxlbmd0aDtcblxuICB0aGlzLnBvbHlsaW5lID0gdGhpcy5tYXAuZHJhd1BvbHlsaW5lKHtcbiAgICBwYXRoOiBuZXcgZ29vZ2xlLm1hcHMuTVZDQXJyYXkoKSxcbiAgICBzdHJva2VDb2xvcjogb3B0aW9ucy5zdHJva2VDb2xvcixcbiAgICBzdHJva2VPcGFjaXR5OiBvcHRpb25zLnN0cm9rZU9wYWNpdHksXG4gICAgc3Ryb2tlV2VpZ2h0OiBvcHRpb25zLnN0cm9rZVdlaWdodFxuICB9KS5nZXRQYXRoKCk7XG59O1xuXG5HTWFwcy5Sb3V0ZS5wcm90b3R5cGUuZ2V0Um91dGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLm1hcC5nZXRSb3V0ZXMoe1xuICAgIG9yaWdpbiA6IHRoaXMub3JpZ2luLFxuICAgIGRlc3RpbmF0aW9uIDogdGhpcy5kZXN0aW5hdGlvbixcbiAgICB0cmF2ZWxNb2RlIDogb3B0aW9ucy50cmF2ZWxNb2RlLFxuICAgIHdheXBvaW50cyA6IHRoaXMud2F5cG9pbnRzIHx8IFtdLFxuICAgIGVycm9yOiBvcHRpb25zLmVycm9yLFxuICAgIGNhbGxiYWNrIDogZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnJvdXRlID0gZVswXTtcblxuICAgICAgaWYgKG9wdGlvbnMuY2FsbGJhY2spIHtcbiAgICAgICAgb3B0aW9ucy5jYWxsYmFjay5jYWxsKHNlbGYpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG5HTWFwcy5Sb3V0ZS5wcm90b3R5cGUuYmFjayA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5zdGVwX2NvdW50ID4gMCkge1xuICAgIHRoaXMuc3RlcF9jb3VudC0tO1xuICAgIHZhciBwYXRoID0gdGhpcy5yb3V0ZS5sZWdzWzBdLnN0ZXBzW3RoaXMuc3RlcF9jb3VudF0ucGF0aDtcblxuICAgIGZvciAodmFyIHAgaW4gcGF0aCl7XG4gICAgICBpZiAocGF0aC5oYXNPd25Qcm9wZXJ0eShwKSl7XG4gICAgICAgIHRoaXMucG9seWxpbmUucG9wKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5HTWFwcy5Sb3V0ZS5wcm90b3R5cGUuZm9yd2FyZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5zdGVwX2NvdW50IDwgdGhpcy5zdGVwc19sZW5ndGgpIHtcbiAgICB2YXIgcGF0aCA9IHRoaXMucm91dGUubGVnc1swXS5zdGVwc1t0aGlzLnN0ZXBfY291bnRdLnBhdGg7XG5cbiAgICBmb3IgKHZhciBwIGluIHBhdGgpe1xuICAgICAgaWYgKHBhdGguaGFzT3duUHJvcGVydHkocCkpe1xuICAgICAgICB0aGlzLnBvbHlsaW5lLnB1c2gocGF0aFtwXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc3RlcF9jb3VudCsrO1xuICB9XG59O1xuXG5HTWFwcy5wcm90b3R5cGUuY2hlY2tHZW9mZW5jZSA9IGZ1bmN0aW9uKGxhdCwgbG5nLCBmZW5jZSkge1xuICByZXR1cm4gZmVuY2UuY29udGFpbnNMYXRMbmcobmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxuZykpO1xufTtcblxuR01hcHMucHJvdG90eXBlLmNoZWNrTWFya2VyR2VvZmVuY2UgPSBmdW5jdGlvbihtYXJrZXIsIG91dHNpZGVfY2FsbGJhY2spIHtcbiAgaWYgKG1hcmtlci5mZW5jZXMpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgZmVuY2U7IGZlbmNlID0gbWFya2VyLmZlbmNlc1tpXTsgaSsrKSB7XG4gICAgICB2YXIgcG9zID0gbWFya2VyLmdldFBvc2l0aW9uKCk7XG4gICAgICBpZiAoIXRoaXMuY2hlY2tHZW9mZW5jZShwb3MubGF0KCksIHBvcy5sbmcoKSwgZmVuY2UpKSB7XG4gICAgICAgIG91dHNpZGVfY2FsbGJhY2sobWFya2VyLCBmZW5jZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5HTWFwcy5wcm90b3R5cGUudG9JbWFnZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgdmFyIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9LFxuICAgICAgc3RhdGljX21hcF9vcHRpb25zID0ge307XG5cbiAgc3RhdGljX21hcF9vcHRpb25zWydzaXplJ10gPSBvcHRpb25zWydzaXplJ10gfHwgW3RoaXMuZWwuY2xpZW50V2lkdGgsIHRoaXMuZWwuY2xpZW50SGVpZ2h0XTtcbiAgc3RhdGljX21hcF9vcHRpb25zWydsYXQnXSA9IHRoaXMuZ2V0Q2VudGVyKCkubGF0KCk7XG4gIHN0YXRpY19tYXBfb3B0aW9uc1snbG5nJ10gPSB0aGlzLmdldENlbnRlcigpLmxuZygpO1xuXG4gIGlmICh0aGlzLm1hcmtlcnMubGVuZ3RoID4gMCkge1xuICAgIHN0YXRpY19tYXBfb3B0aW9uc1snbWFya2VycyddID0gW107XG4gICAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1hcmtlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN0YXRpY19tYXBfb3B0aW9uc1snbWFya2VycyddLnB1c2goe1xuICAgICAgICBsYXQ6IHRoaXMubWFya2Vyc1tpXS5nZXRQb3NpdGlvbigpLmxhdCgpLFxuICAgICAgICBsbmc6IHRoaXMubWFya2Vyc1tpXS5nZXRQb3NpdGlvbigpLmxuZygpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpZiAodGhpcy5wb2x5bGluZXMubGVuZ3RoID4gMCkge1xuICAgIHZhciBwb2x5bGluZSA9IHRoaXMucG9seWxpbmVzWzBdO1xuICAgIFxuICAgIHN0YXRpY19tYXBfb3B0aW9uc1sncG9seWxpbmUnXSA9IHt9O1xuICAgIHN0YXRpY19tYXBfb3B0aW9uc1sncG9seWxpbmUnXVsncGF0aCddID0gZ29vZ2xlLm1hcHMuZ2VvbWV0cnkuZW5jb2RpbmcuZW5jb2RlUGF0aChwb2x5bGluZS5nZXRQYXRoKCkpO1xuICAgIHN0YXRpY19tYXBfb3B0aW9uc1sncG9seWxpbmUnXVsnc3Ryb2tlQ29sb3InXSA9IHBvbHlsaW5lLnN0cm9rZUNvbG9yXG4gICAgc3RhdGljX21hcF9vcHRpb25zWydwb2x5bGluZSddWydzdHJva2VPcGFjaXR5J10gPSBwb2x5bGluZS5zdHJva2VPcGFjaXR5XG4gICAgc3RhdGljX21hcF9vcHRpb25zWydwb2x5bGluZSddWydzdHJva2VXZWlnaHQnXSA9IHBvbHlsaW5lLnN0cm9rZVdlaWdodFxuICB9XG5cbiAgcmV0dXJuIEdNYXBzLnN0YXRpY01hcFVSTChzdGF0aWNfbWFwX29wdGlvbnMpO1xufTtcblxuR01hcHMuc3RhdGljTWFwVVJMID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gIHZhciBwYXJhbWV0ZXJzID0gW10sXG4gICAgICBkYXRhLFxuICAgICAgc3RhdGljX3Jvb3QgPSAnaHR0cDovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvc3RhdGljbWFwJztcblxuICBpZiAob3B0aW9ucy51cmwpIHtcbiAgICBzdGF0aWNfcm9vdCA9IG9wdGlvbnMudXJsO1xuICAgIGRlbGV0ZSBvcHRpb25zLnVybDtcbiAgfVxuXG4gIHN0YXRpY19yb290ICs9ICc/JztcblxuICB2YXIgbWFya2VycyA9IG9wdGlvbnMubWFya2VycztcbiAgXG4gIGRlbGV0ZSBvcHRpb25zLm1hcmtlcnM7XG5cbiAgaWYgKCFtYXJrZXJzICYmIG9wdGlvbnMubWFya2VyKSB7XG4gICAgbWFya2VycyA9IFtvcHRpb25zLm1hcmtlcl07XG4gICAgZGVsZXRlIG9wdGlvbnMubWFya2VyO1xuICB9XG5cbiAgdmFyIHN0eWxlcyA9IG9wdGlvbnMuc3R5bGVzO1xuXG4gIGRlbGV0ZSBvcHRpb25zLnN0eWxlcztcblxuICB2YXIgcG9seWxpbmUgPSBvcHRpb25zLnBvbHlsaW5lO1xuICBkZWxldGUgb3B0aW9ucy5wb2x5bGluZTtcblxuICAvKiogTWFwIG9wdGlvbnMgKiovXG4gIGlmIChvcHRpb25zLmNlbnRlcikge1xuICAgIHBhcmFtZXRlcnMucHVzaCgnY2VudGVyPScgKyBvcHRpb25zLmNlbnRlcik7XG4gICAgZGVsZXRlIG9wdGlvbnMuY2VudGVyO1xuICB9XG4gIGVsc2UgaWYgKG9wdGlvbnMuYWRkcmVzcykge1xuICAgIHBhcmFtZXRlcnMucHVzaCgnY2VudGVyPScgKyBvcHRpb25zLmFkZHJlc3MpO1xuICAgIGRlbGV0ZSBvcHRpb25zLmFkZHJlc3M7XG4gIH1cbiAgZWxzZSBpZiAob3B0aW9ucy5sYXQpIHtcbiAgICBwYXJhbWV0ZXJzLnB1c2goWydjZW50ZXI9Jywgb3B0aW9ucy5sYXQsICcsJywgb3B0aW9ucy5sbmddLmpvaW4oJycpKTtcbiAgICBkZWxldGUgb3B0aW9ucy5sYXQ7XG4gICAgZGVsZXRlIG9wdGlvbnMubG5nO1xuICB9XG4gIGVsc2UgaWYgKG9wdGlvbnMudmlzaWJsZSkge1xuICAgIHZhciB2aXNpYmxlID0gZW5jb2RlVVJJKG9wdGlvbnMudmlzaWJsZS5qb2luKCd8JykpO1xuICAgIHBhcmFtZXRlcnMucHVzaCgndmlzaWJsZT0nICsgdmlzaWJsZSk7XG4gIH1cblxuICB2YXIgc2l6ZSA9IG9wdGlvbnMuc2l6ZTtcbiAgaWYgKHNpemUpIHtcbiAgICBpZiAoc2l6ZS5qb2luKSB7XG4gICAgICBzaXplID0gc2l6ZS5qb2luKCd4Jyk7XG4gICAgfVxuICAgIGRlbGV0ZSBvcHRpb25zLnNpemU7XG4gIH1cbiAgZWxzZSB7XG4gICAgc2l6ZSA9ICc2MzB4MzAwJztcbiAgfVxuICBwYXJhbWV0ZXJzLnB1c2goJ3NpemU9JyArIHNpemUpO1xuXG4gIGlmICghb3B0aW9ucy56b29tICYmIG9wdGlvbnMuem9vbSAhPT0gZmFsc2UpIHtcbiAgICBvcHRpb25zLnpvb20gPSAxNTtcbiAgfVxuXG4gIHZhciBzZW5zb3IgPSBvcHRpb25zLmhhc093blByb3BlcnR5KCdzZW5zb3InKSA/ICEhb3B0aW9ucy5zZW5zb3IgOiB0cnVlO1xuICBkZWxldGUgb3B0aW9ucy5zZW5zb3I7XG4gIHBhcmFtZXRlcnMucHVzaCgnc2Vuc29yPScgKyBzZW5zb3IpO1xuXG4gIGZvciAodmFyIHBhcmFtIGluIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwYXJhbSkpIHtcbiAgICAgIHBhcmFtZXRlcnMucHVzaChwYXJhbSArICc9JyArIG9wdGlvbnNbcGFyYW1dKTtcbiAgICB9XG4gIH1cblxuICAvKiogTWFya2VycyAqKi9cbiAgaWYgKG1hcmtlcnMpIHtcbiAgICB2YXIgbWFya2VyLCBsb2M7XG5cbiAgICBmb3IgKHZhciBpPTA7IGRhdGE9bWFya2Vyc1tpXTsgaSsrKSB7XG4gICAgICBtYXJrZXIgPSBbXTtcblxuICAgICAgaWYgKGRhdGEuc2l6ZSAmJiBkYXRhLnNpemUgIT09ICdub3JtYWwnKSB7XG4gICAgICAgIG1hcmtlci5wdXNoKCdzaXplOicgKyBkYXRhLnNpemUpO1xuICAgICAgICBkZWxldGUgZGF0YS5zaXplO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZGF0YS5pY29uKSB7XG4gICAgICAgIG1hcmtlci5wdXNoKCdpY29uOicgKyBlbmNvZGVVUkkoZGF0YS5pY29uKSk7XG4gICAgICAgIGRlbGV0ZSBkYXRhLmljb247XG4gICAgICB9XG5cbiAgICAgIGlmIChkYXRhLmNvbG9yKSB7XG4gICAgICAgIG1hcmtlci5wdXNoKCdjb2xvcjonICsgZGF0YS5jb2xvci5yZXBsYWNlKCcjJywgJzB4JykpO1xuICAgICAgICBkZWxldGUgZGF0YS5jb2xvcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGRhdGEubGFiZWwpIHtcbiAgICAgICAgbWFya2VyLnB1c2goJ2xhYmVsOicgKyBkYXRhLmxhYmVsWzBdLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICBkZWxldGUgZGF0YS5sYWJlbDtcbiAgICAgIH1cblxuICAgICAgbG9jID0gKGRhdGEuYWRkcmVzcyA/IGRhdGEuYWRkcmVzcyA6IGRhdGEubGF0ICsgJywnICsgZGF0YS5sbmcpO1xuICAgICAgZGVsZXRlIGRhdGEuYWRkcmVzcztcbiAgICAgIGRlbGV0ZSBkYXRhLmxhdDtcbiAgICAgIGRlbGV0ZSBkYXRhLmxuZztcblxuICAgICAgZm9yKHZhciBwYXJhbSBpbiBkYXRhKXtcbiAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkocGFyYW0pKSB7XG4gICAgICAgICAgbWFya2VyLnB1c2gocGFyYW0gKyAnOicgKyBkYXRhW3BhcmFtXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1hcmtlci5sZW5ndGggfHwgaSA9PT0gMCkge1xuICAgICAgICBtYXJrZXIucHVzaChsb2MpO1xuICAgICAgICBtYXJrZXIgPSBtYXJrZXIuam9pbignfCcpO1xuICAgICAgICBwYXJhbWV0ZXJzLnB1c2goJ21hcmtlcnM9JyArIGVuY29kZVVSSShtYXJrZXIpKTtcbiAgICAgIH1cbiAgICAgIC8vIE5ldyBtYXJrZXIgd2l0aG91dCBzdHlsZXNcbiAgICAgIGVsc2Uge1xuICAgICAgICBtYXJrZXIgPSBwYXJhbWV0ZXJzLnBvcCgpICsgZW5jb2RlVVJJKCd8JyArIGxvYyk7XG4gICAgICAgIHBhcmFtZXRlcnMucHVzaChtYXJrZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBNYXAgU3R5bGVzICoqL1xuICBpZiAoc3R5bGVzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzdHlsZVJ1bGUgPSBbXTtcbiAgICAgIGlmIChzdHlsZXNbaV0uZmVhdHVyZVR5cGUgJiYgc3R5bGVzW2ldLmZlYXR1cmVUeXBlICE9ICdhbGwnICkge1xuICAgICAgICBzdHlsZVJ1bGUucHVzaCgnZmVhdHVyZTonICsgc3R5bGVzW2ldLmZlYXR1cmVUeXBlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0eWxlc1tpXS5lbGVtZW50VHlwZSAmJiBzdHlsZXNbaV0uZWxlbWVudFR5cGUgIT0gJ2FsbCcpIHtcbiAgICAgICAgc3R5bGVSdWxlLnB1c2goJ2VsZW1lbnQ6JyArIHN0eWxlc1tpXS5lbGVtZW50VHlwZSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3R5bGVzW2ldLnN0eWxlcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzdHlsZXNbaV0uc3R5bGVyc1tqXSkge1xuICAgICAgICAgIHZhciBydWxlQXJnID0gc3R5bGVzW2ldLnN0eWxlcnNbal1bcF07XG4gICAgICAgICAgaWYgKHAgPT0gJ2h1ZScgfHwgcCA9PSAnY29sb3InKSB7XG4gICAgICAgICAgICBydWxlQXJnID0gJzB4JyArIHJ1bGVBcmcuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdHlsZVJ1bGUucHVzaChwICsgJzonICsgcnVsZUFyZyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHJ1bGUgPSBzdHlsZVJ1bGUuam9pbignfCcpO1xuICAgICAgaWYgKHJ1bGUgIT0gJycpIHtcbiAgICAgICAgcGFyYW1ldGVycy5wdXNoKCdzdHlsZT0nICsgcnVsZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIFBvbHlsaW5lcyAqKi9cbiAgZnVuY3Rpb24gcGFyc2VDb2xvcihjb2xvciwgb3BhY2l0eSkge1xuICAgIGlmIChjb2xvclswXSA9PT0gJyMnKXtcbiAgICAgIGNvbG9yID0gY29sb3IucmVwbGFjZSgnIycsICcweCcpO1xuXG4gICAgICBpZiAob3BhY2l0eSkge1xuICAgICAgICBvcGFjaXR5ID0gcGFyc2VGbG9hdChvcGFjaXR5KTtcbiAgICAgICAgb3BhY2l0eSA9IE1hdGgubWluKDEsIE1hdGgubWF4KG9wYWNpdHksIDApKTtcbiAgICAgICAgaWYgKG9wYWNpdHkgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gJzB4MDAwMDAwMDAnO1xuICAgICAgICB9XG4gICAgICAgIG9wYWNpdHkgPSAob3BhY2l0eSAqIDI1NSkudG9TdHJpbmcoMTYpO1xuICAgICAgICBpZiAob3BhY2l0eS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBvcGFjaXR5ICs9IG9wYWNpdHk7XG4gICAgICAgIH1cblxuICAgICAgICBjb2xvciA9IGNvbG9yLnNsaWNlKDAsOCkgKyBvcGFjaXR5O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG4gIH1cblxuICBpZiAocG9seWxpbmUpIHtcbiAgICBkYXRhID0gcG9seWxpbmU7XG4gICAgcG9seWxpbmUgPSBbXTtcblxuICAgIGlmIChkYXRhLnN0cm9rZVdlaWdodCkge1xuICAgICAgcG9seWxpbmUucHVzaCgnd2VpZ2h0OicgKyBwYXJzZUludChkYXRhLnN0cm9rZVdlaWdodCwgMTApKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5zdHJva2VDb2xvcikge1xuICAgICAgdmFyIGNvbG9yID0gcGFyc2VDb2xvcihkYXRhLnN0cm9rZUNvbG9yLCBkYXRhLnN0cm9rZU9wYWNpdHkpO1xuICAgICAgcG9seWxpbmUucHVzaCgnY29sb3I6JyArIGNvbG9yKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5maWxsQ29sb3IpIHtcbiAgICAgIHZhciBmaWxsY29sb3IgPSBwYXJzZUNvbG9yKGRhdGEuZmlsbENvbG9yLCBkYXRhLmZpbGxPcGFjaXR5KTtcbiAgICAgIHBvbHlsaW5lLnB1c2goJ2ZpbGxjb2xvcjonICsgZmlsbGNvbG9yKTtcbiAgICB9XG5cbiAgICB2YXIgcGF0aCA9IGRhdGEucGF0aDtcbiAgICBpZiAocGF0aC5qb2luKSB7XG4gICAgICBmb3IgKHZhciBqPTAsIHBvczsgcG9zPXBhdGhbal07IGorKykge1xuICAgICAgICBwb2x5bGluZS5wdXNoKHBvcy5qb2luKCcsJykpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBvbHlsaW5lLnB1c2goJ2VuYzonICsgcGF0aCk7XG4gICAgfVxuXG4gICAgcG9seWxpbmUgPSBwb2x5bGluZS5qb2luKCd8Jyk7XG4gICAgcGFyYW1ldGVycy5wdXNoKCdwYXRoPScgKyBlbmNvZGVVUkkocG9seWxpbmUpKTtcbiAgfVxuXG4gIC8qKiBSZXRpbmEgc3VwcG9ydCAqKi9cbiAgdmFyIGRwaSA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gIHBhcmFtZXRlcnMucHVzaCgnc2NhbGU9JyArIGRwaSk7XG5cbiAgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnMuam9pbignJicpO1xuICByZXR1cm4gc3RhdGljX3Jvb3QgKyBwYXJhbWV0ZXJzO1xufTtcblxuR01hcHMucHJvdG90eXBlLmFkZE1hcFR5cGUgPSBmdW5jdGlvbihtYXBUeXBlSWQsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJnZXRUaWxlVXJsXCIpICYmIHR5cGVvZihvcHRpb25zW1wiZ2V0VGlsZVVybFwiXSkgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgb3B0aW9ucy50aWxlU2l6ZSA9IG9wdGlvbnMudGlsZVNpemUgfHwgbmV3IGdvb2dsZS5tYXBzLlNpemUoMjU2LCAyNTYpO1xuXG4gICAgdmFyIG1hcFR5cGUgPSBuZXcgZ29vZ2xlLm1hcHMuSW1hZ2VNYXBUeXBlKG9wdGlvbnMpO1xuXG4gICAgdGhpcy5tYXAubWFwVHlwZXMuc2V0KG1hcFR5cGVJZCwgbWFwVHlwZSk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhyb3cgXCInZ2V0VGlsZVVybCcgZnVuY3Rpb24gcmVxdWlyZWQuXCI7XG4gIH1cbn07XG5cbkdNYXBzLnByb3RvdHlwZS5hZGRPdmVybGF5TWFwVHlwZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoXCJnZXRUaWxlXCIpICYmIHR5cGVvZihvcHRpb25zW1wiZ2V0VGlsZVwiXSkgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIG92ZXJsYXlNYXBUeXBlSW5kZXggPSBvcHRpb25zLmluZGV4O1xuXG4gICAgZGVsZXRlIG9wdGlvbnMuaW5kZXg7XG5cbiAgICB0aGlzLm1hcC5vdmVybGF5TWFwVHlwZXMuaW5zZXJ0QXQob3ZlcmxheU1hcFR5cGVJbmRleCwgb3B0aW9ucyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhyb3cgXCInZ2V0VGlsZScgZnVuY3Rpb24gcmVxdWlyZWQuXCI7XG4gIH1cbn07XG5cbkdNYXBzLnByb3RvdHlwZS5yZW1vdmVPdmVybGF5TWFwVHlwZSA9IGZ1bmN0aW9uKG92ZXJsYXlNYXBUeXBlSW5kZXgpIHtcbiAgdGhpcy5tYXAub3ZlcmxheU1hcFR5cGVzLnJlbW92ZUF0KG92ZXJsYXlNYXBUeXBlSW5kZXgpO1xufTtcblxuR01hcHMucHJvdG90eXBlLmFkZFN0eWxlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgc3R5bGVkTWFwVHlwZSA9IG5ldyBnb29nbGUubWFwcy5TdHlsZWRNYXBUeXBlKG9wdGlvbnMuc3R5bGVzLCB7IG5hbWU6IG9wdGlvbnMuc3R5bGVkTWFwTmFtZSB9KTtcblxuICB0aGlzLm1hcC5tYXBUeXBlcy5zZXQob3B0aW9ucy5tYXBUeXBlSWQsIHN0eWxlZE1hcFR5cGUpO1xufTtcblxuR01hcHMucHJvdG90eXBlLnNldFN0eWxlID0gZnVuY3Rpb24obWFwVHlwZUlkKSB7XG4gIHRoaXMubWFwLnNldE1hcFR5cGVJZChtYXBUeXBlSWQpO1xufTtcblxuR01hcHMucHJvdG90eXBlLmNyZWF0ZVBhbm9yYW1hID0gZnVuY3Rpb24oc3RyZWV0dmlld19vcHRpb25zKSB7XG4gIGlmICghc3RyZWV0dmlld19vcHRpb25zLmhhc093blByb3BlcnR5KCdsYXQnKSB8fCAhc3RyZWV0dmlld19vcHRpb25zLmhhc093blByb3BlcnR5KCdsbmcnKSkge1xuICAgIHN0cmVldHZpZXdfb3B0aW9ucy5sYXQgPSB0aGlzLmdldENlbnRlcigpLmxhdCgpO1xuICAgIHN0cmVldHZpZXdfb3B0aW9ucy5sbmcgPSB0aGlzLmdldENlbnRlcigpLmxuZygpO1xuICB9XG5cbiAgdGhpcy5wYW5vcmFtYSA9IEdNYXBzLmNyZWF0ZVBhbm9yYW1hKHN0cmVldHZpZXdfb3B0aW9ucyk7XG5cbiAgdGhpcy5tYXAuc2V0U3RyZWV0Vmlldyh0aGlzLnBhbm9yYW1hKTtcblxuICByZXR1cm4gdGhpcy5wYW5vcmFtYTtcbn07XG5cbkdNYXBzLmNyZWF0ZVBhbm9yYW1hID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgZWwgPSBnZXRFbGVtZW50QnlJZChvcHRpb25zLmVsLCBvcHRpb25zLmNvbnRleHQpO1xuXG4gIG9wdGlvbnMucG9zaXRpb24gPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG9wdGlvbnMubGF0LCBvcHRpb25zLmxuZyk7XG5cbiAgZGVsZXRlIG9wdGlvbnMuZWw7XG4gIGRlbGV0ZSBvcHRpb25zLmNvbnRleHQ7XG4gIGRlbGV0ZSBvcHRpb25zLmxhdDtcbiAgZGVsZXRlIG9wdGlvbnMubG5nO1xuXG4gIHZhciBzdHJlZXR2aWV3X2V2ZW50cyA9IFsnY2xvc2VjbGljaycsICdsaW5rc19jaGFuZ2VkJywgJ3Bhbm9fY2hhbmdlZCcsICdwb3NpdGlvbl9jaGFuZ2VkJywgJ3Bvdl9jaGFuZ2VkJywgJ3Jlc2l6ZScsICd2aXNpYmxlX2NoYW5nZWQnXSxcbiAgICAgIHN0cmVldHZpZXdfb3B0aW9ucyA9IGV4dGVuZF9vYmplY3Qoe3Zpc2libGUgOiB0cnVlfSwgb3B0aW9ucyk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJlZXR2aWV3X2V2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGRlbGV0ZSBzdHJlZXR2aWV3X29wdGlvbnNbc3RyZWV0dmlld19ldmVudHNbaV1dO1xuICB9XG5cbiAgdmFyIHBhbm9yYW1hID0gbmV3IGdvb2dsZS5tYXBzLlN0cmVldFZpZXdQYW5vcmFtYShlbCwgc3RyZWV0dmlld19vcHRpb25zKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmVldHZpZXdfZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgKGZ1bmN0aW9uKG9iamVjdCwgbmFtZSkge1xuICAgICAgaWYgKG9wdGlvbnNbbmFtZV0pIHtcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIob2JqZWN0LCBuYW1lLCBmdW5jdGlvbigpe1xuICAgICAgICAgIG9wdGlvbnNbbmFtZV0uYXBwbHkodGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pKHBhbm9yYW1hLCBzdHJlZXR2aWV3X2V2ZW50c1tpXSk7XG4gIH1cblxuICByZXR1cm4gcGFub3JhbWE7XG59O1xuXG5HTWFwcy5wcm90b3R5cGUub24gPSBmdW5jdGlvbihldmVudF9uYW1lLCBoYW5kbGVyKSB7XG4gIHJldHVybiBHTWFwcy5vbihldmVudF9uYW1lLCB0aGlzLCBoYW5kbGVyKTtcbn07XG5cbkdNYXBzLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbihldmVudF9uYW1lKSB7XG4gIEdNYXBzLm9mZihldmVudF9uYW1lLCB0aGlzKTtcbn07XG5cbkdNYXBzLmN1c3RvbV9ldmVudHMgPSBbJ21hcmtlcl9hZGRlZCcsICdtYXJrZXJfcmVtb3ZlZCcsICdwb2x5bGluZV9hZGRlZCcsICdwb2x5bGluZV9yZW1vdmVkJywgJ3BvbHlnb25fYWRkZWQnLCAncG9seWdvbl9yZW1vdmVkJywgJ2dlb2xvY2F0ZWQnLCAnZ2VvbG9jYXRpb25fZmFpbGVkJ107XG5cbkdNYXBzLm9uID0gZnVuY3Rpb24oZXZlbnRfbmFtZSwgb2JqZWN0LCBoYW5kbGVyKSB7XG4gIGlmIChHTWFwcy5jdXN0b21fZXZlbnRzLmluZGV4T2YoZXZlbnRfbmFtZSkgPT0gLTEpIHtcbiAgICByZXR1cm4gZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIob2JqZWN0LCBldmVudF9uYW1lLCBoYW5kbGVyKTtcbiAgfVxuICBlbHNlIHtcbiAgICB2YXIgcmVnaXN0ZXJlZF9ldmVudCA9IHtcbiAgICAgIGhhbmRsZXIgOiBoYW5kbGVyLFxuICAgICAgZXZlbnROYW1lIDogZXZlbnRfbmFtZVxuICAgIH07XG5cbiAgICBvYmplY3QucmVnaXN0ZXJlZF9ldmVudHNbZXZlbnRfbmFtZV0gPSBvYmplY3QucmVnaXN0ZXJlZF9ldmVudHNbZXZlbnRfbmFtZV0gfHwgW107XG4gICAgb2JqZWN0LnJlZ2lzdGVyZWRfZXZlbnRzW2V2ZW50X25hbWVdLnB1c2gocmVnaXN0ZXJlZF9ldmVudCk7XG5cbiAgICByZXR1cm4gcmVnaXN0ZXJlZF9ldmVudDtcbiAgfVxufTtcblxuR01hcHMub2ZmID0gZnVuY3Rpb24oZXZlbnRfbmFtZSwgb2JqZWN0KSB7XG4gIGlmIChHTWFwcy5jdXN0b21fZXZlbnRzLmluZGV4T2YoZXZlbnRfbmFtZSkgPT0gLTEpIHtcbiAgICBnb29nbGUubWFwcy5ldmVudC5jbGVhckxpc3RlbmVycyhvYmplY3QsIGV2ZW50X25hbWUpO1xuICB9XG4gIGVsc2Uge1xuICAgIG9iamVjdC5yZWdpc3RlcmVkX2V2ZW50c1tldmVudF9uYW1lXSA9IFtdO1xuICB9XG59O1xuXG5HTWFwcy5maXJlID0gZnVuY3Rpb24oZXZlbnRfbmFtZSwgb2JqZWN0LCBzY29wZSkge1xuICBpZiAoR01hcHMuY3VzdG9tX2V2ZW50cy5pbmRleE9mKGV2ZW50X25hbWUpID09IC0xKSB7XG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQudHJpZ2dlcihvYmplY3QsIGV2ZW50X25hbWUsIEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShhcmd1bWVudHMpLnNsaWNlKDIpKTtcbiAgfVxuICBlbHNlIHtcbiAgICBpZihldmVudF9uYW1lIGluIHNjb3BlLnJlZ2lzdGVyZWRfZXZlbnRzKSB7XG4gICAgICB2YXIgZmlyaW5nX2V2ZW50cyA9IHNjb3BlLnJlZ2lzdGVyZWRfZXZlbnRzW2V2ZW50X25hbWVdO1xuXG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZmlyaW5nX2V2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAoZnVuY3Rpb24oaGFuZGxlciwgc2NvcGUsIG9iamVjdCkge1xuICAgICAgICAgIGhhbmRsZXIuYXBwbHkoc2NvcGUsIFtvYmplY3RdKTtcbiAgICAgICAgfSkoZmlyaW5nX2V2ZW50c1tpXVsnaGFuZGxlciddLCBzY29wZSwgb2JqZWN0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbkdNYXBzLmdlb2xvY2F0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgdmFyIGNvbXBsZXRlX2NhbGxiYWNrID0gb3B0aW9ucy5hbHdheXMgfHwgb3B0aW9ucy5jb21wbGV0ZTtcblxuICBpZiAobmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XG4gICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihmdW5jdGlvbihwb3NpdGlvbikge1xuICAgICAgb3B0aW9ucy5zdWNjZXNzKHBvc2l0aW9uKTtcblxuICAgICAgaWYgKGNvbXBsZXRlX2NhbGxiYWNrKSB7XG4gICAgICAgIGNvbXBsZXRlX2NhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgIG9wdGlvbnMuZXJyb3IoZXJyb3IpO1xuXG4gICAgICBpZiAoY29tcGxldGVfY2FsbGJhY2spIHtcbiAgICAgICAgY29tcGxldGVfY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9LCBvcHRpb25zLm9wdGlvbnMpO1xuICB9XG4gIGVsc2Uge1xuICAgIG9wdGlvbnMubm90X3N1cHBvcnRlZCgpO1xuXG4gICAgaWYgKGNvbXBsZXRlX2NhbGxiYWNrKSB7XG4gICAgICBjb21wbGV0ZV9jYWxsYmFjaygpO1xuICAgIH1cbiAgfVxufTtcblxuR01hcHMuZ2VvY29kZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgdGhpcy5nZW9jb2RlciA9IG5ldyBnb29nbGUubWFwcy5HZW9jb2RlcigpO1xuICB2YXIgY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrO1xuICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnbGF0JykgJiYgb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnbG5nJykpIHtcbiAgICBvcHRpb25zLmxhdExuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcob3B0aW9ucy5sYXQsIG9wdGlvbnMubG5nKTtcbiAgfVxuXG4gIGRlbGV0ZSBvcHRpb25zLmxhdDtcbiAgZGVsZXRlIG9wdGlvbnMubG5nO1xuICBkZWxldGUgb3B0aW9ucy5jYWxsYmFjaztcbiAgXG4gIHRoaXMuZ2VvY29kZXIuZ2VvY29kZShvcHRpb25zLCBmdW5jdGlvbihyZXN1bHRzLCBzdGF0dXMpIHtcbiAgICBjYWxsYmFjayhyZXN1bHRzLCBzdGF0dXMpO1xuICB9KTtcbn07XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFBvbHlnb24gY29udGFpbnNMYXRMbmdcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90cGFya2luL0dvb2dsZS1NYXBzLVBvaW50LWluLVBvbHlnb25cbi8vIFBveWdvbiBnZXRCb3VuZHMgZXh0ZW5zaW9uIC0gZ29vZ2xlLW1hcHMtZXh0ZW5zaW9uc1xuLy8gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2dvb2dsZS1tYXBzLWV4dGVuc2lvbnMvc291cmNlL2Jyb3dzZS9nb29nbGUubWFwcy5Qb2x5Z29uLmdldEJvdW5kcy5qc1xuaWYgKCFnb29nbGUubWFwcy5Qb2x5Z29uLnByb3RvdHlwZS5nZXRCb3VuZHMpIHtcbiAgZ29vZ2xlLm1hcHMuUG9seWdvbi5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24obGF0TG5nKSB7XG4gICAgdmFyIGJvdW5kcyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcbiAgICB2YXIgcGF0aHMgPSB0aGlzLmdldFBhdGhzKCk7XG4gICAgdmFyIHBhdGg7XG5cbiAgICBmb3IgKHZhciBwID0gMDsgcCA8IHBhdGhzLmdldExlbmd0aCgpOyBwKyspIHtcbiAgICAgIHBhdGggPSBwYXRocy5nZXRBdChwKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICAgIGJvdW5kcy5leHRlbmQocGF0aC5nZXRBdChpKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfTtcbn1cblxuaWYgKCFnb29nbGUubWFwcy5Qb2x5Z29uLnByb3RvdHlwZS5jb250YWluc0xhdExuZykge1xuICAvLyBQb2x5Z29uIGNvbnRhaW5zTGF0TG5nIC0gbWV0aG9kIHRvIGRldGVybWluZSBpZiBhIGxhdExuZyBpcyB3aXRoaW4gYSBwb2x5Z29uXG4gIGdvb2dsZS5tYXBzLlBvbHlnb24ucHJvdG90eXBlLmNvbnRhaW5zTGF0TG5nID0gZnVuY3Rpb24obGF0TG5nKSB7XG4gICAgLy8gRXhjbHVkZSBwb2ludHMgb3V0c2lkZSBvZiBib3VuZHMgYXMgdGhlcmUgaXMgbm8gd2F5IHRoZXkgYXJlIGluIHRoZSBwb2x5XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCk7XG5cbiAgICBpZiAoYm91bmRzICE9PSBudWxsICYmICFib3VuZHMuY29udGFpbnMobGF0TG5nKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFJheWNhc3QgcG9pbnQgaW4gcG9seWdvbiBtZXRob2RcbiAgICB2YXIgaW5Qb2x5ID0gZmFsc2U7XG5cbiAgICB2YXIgbnVtUGF0aHMgPSB0aGlzLmdldFBhdGhzKCkuZ2V0TGVuZ3RoKCk7XG4gICAgZm9yICh2YXIgcCA9IDA7IHAgPCBudW1QYXRoczsgcCsrKSB7XG4gICAgICB2YXIgcGF0aCA9IHRoaXMuZ2V0UGF0aHMoKS5nZXRBdChwKTtcbiAgICAgIHZhciBudW1Qb2ludHMgPSBwYXRoLmdldExlbmd0aCgpO1xuICAgICAgdmFyIGogPSBudW1Qb2ludHMgLSAxO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVBvaW50czsgaSsrKSB7XG4gICAgICAgIHZhciB2ZXJ0ZXgxID0gcGF0aC5nZXRBdChpKTtcbiAgICAgICAgdmFyIHZlcnRleDIgPSBwYXRoLmdldEF0KGopO1xuXG4gICAgICAgIGlmICh2ZXJ0ZXgxLmxuZygpIDwgbGF0TG5nLmxuZygpICYmIHZlcnRleDIubG5nKCkgPj0gbGF0TG5nLmxuZygpIHx8IHZlcnRleDIubG5nKCkgPCBsYXRMbmcubG5nKCkgJiYgdmVydGV4MS5sbmcoKSA+PSBsYXRMbmcubG5nKCkpIHtcbiAgICAgICAgICBpZiAodmVydGV4MS5sYXQoKSArIChsYXRMbmcubG5nKCkgLSB2ZXJ0ZXgxLmxuZygpKSAvICh2ZXJ0ZXgyLmxuZygpIC0gdmVydGV4MS5sbmcoKSkgKiAodmVydGV4Mi5sYXQoKSAtIHZlcnRleDEubGF0KCkpIDwgbGF0TG5nLmxhdCgpKSB7XG4gICAgICAgICAgICBpblBvbHkgPSAhaW5Qb2x5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGogPSBpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpblBvbHk7XG4gIH07XG59XG5cbmdvb2dsZS5tYXBzLkxhdExuZ0JvdW5kcy5wcm90b3R5cGUuY29udGFpbnNMYXRMbmcgPSBmdW5jdGlvbihsYXRMbmcpIHtcbiAgcmV0dXJuIHRoaXMuY29udGFpbnMobGF0TG5nKTtcbn07XG5cbmdvb2dsZS5tYXBzLk1hcmtlci5wcm90b3R5cGUuc2V0RmVuY2VzID0gZnVuY3Rpb24oZmVuY2VzKSB7XG4gIHRoaXMuZmVuY2VzID0gZmVuY2VzO1xufTtcblxuZ29vZ2xlLm1hcHMuTWFya2VyLnByb3RvdHlwZS5hZGRGZW5jZSA9IGZ1bmN0aW9uKGZlbmNlKSB7XG4gIHRoaXMuZmVuY2VzLnB1c2goZmVuY2UpO1xufTtcblxuZ29vZ2xlLm1hcHMuTWFya2VyLnByb3RvdHlwZS5nZXRJZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpc1snX19nbV9pZCddO1xufTtcblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQXJyYXkgaW5kZXhPZlxuLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9pbmRleE9mXG5pZiAoIUFycmF5LnByb3RvdHlwZS5pbmRleE9mKSB7XG4gIEFycmF5LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKHNlYXJjaEVsZW1lbnQgLyosIGZyb21JbmRleCAqLyApIHtcbiAgICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgaWYgKHRoaXMgPT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKTtcbiAgICAgIH1cbiAgICAgIHZhciB0ID0gT2JqZWN0KHRoaXMpO1xuICAgICAgdmFyIGxlbiA9IHQubGVuZ3RoID4+PiAwO1xuICAgICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIHZhciBuID0gMDtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIG4gPSBOdW1iZXIoYXJndW1lbnRzWzFdKTtcbiAgICAgICAgICBpZiAobiAhPSBuKSB7IC8vIHNob3J0Y3V0IGZvciB2ZXJpZnlpbmcgaWYgaXQncyBOYU5cbiAgICAgICAgICAgICAgbiA9IDA7XG4gICAgICAgICAgfSBlbHNlIGlmIChuICE9IDAgJiYgbiAhPSBJbmZpbml0eSAmJiBuICE9IC1JbmZpbml0eSkge1xuICAgICAgICAgICAgICBuID0gKG4gPiAwIHx8IC0xKSAqIE1hdGguZmxvb3IoTWF0aC5hYnMobikpO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChuID49IGxlbikge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIHZhciBrID0gbiA+PSAwID8gbiA6IE1hdGgubWF4KGxlbiAtIE1hdGguYWJzKG4pLCAwKTtcbiAgICAgIGZvciAoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgICAgICBpZiAoayBpbiB0ICYmIHRba10gPT09IHNlYXJjaEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGs7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICB9XG59XG4gIFxucmV0dXJuIEdNYXBzO1xufSkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==