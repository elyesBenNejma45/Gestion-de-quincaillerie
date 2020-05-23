(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["contact"],{

/***/ "./assets/js/contact.js":
/*!******************************!*\
  !*** ./assets/js/contact.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

jQuery(function ($) {
  'use strict', form = $('.contact-form');
  form.submit(function () {
    'use strict', $this = $(this);
    $.post("sendemail.php", $(".contact-form").serialize(), function (result) {
      if (result.type == 'success') {
        $this.prev().text(result.message).fadeIn().delay(3000).fadeOut();
      }
    });
    return false;
  });
}); // Google Map Customization

(function () {
  var map;
  map = new GMaps({
    el: '#gmap',
    lat: 43.1580159,
    lng: -77.6030777,
    scrollwheel: false,
    zoom: 14,
    zoomControl: false,
    panControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    overviewMapControl: false,
    clickable: false
  });
  var image = 'images/map-icon.png';
  map.addMarker({
    lat: 43.1580159,
    lng: -77.6030777,
    // icon: image,
    animation: google.maps.Animation.DROP,
    verticalAlign: 'bottom',
    horizontalAlign: 'center',
    backgroundColor: '#ffffff'
  });
  var styles = [{
    "featureType": "road",
    "stylers": [{
      "color": ""
    }]
  }, {
    "featureType": "water",
    "stylers": [{
      "color": "#A2DAF2"
    }]
  }, {
    "featureType": "landscape",
    "stylers": [{
      "color": "#ABCE83"
    }]
  }, {
    "elementType": "labels.text.fill",
    "stylers": [{
      "color": "#000000"
    }]
  }, {
    "featureType": "poi",
    "stylers": [{
      "color": "#2ECC71"
    }]
  }, {
    "elementType": "labels.text",
    "stylers": [{
      "saturation": 1
    }, {
      "weight": 0.1
    }, {
      "color": "#111111"
    }]
  }];
  map.addStyle({
    styledMapName: "Styled Map",
    styles: styles,
    mapTypeId: "map_style"
  });
  map.setStyle("map_style");
})();

/***/ })

},[["./assets/js/contact.js","runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY29udGFjdC5qcyJdLCJuYW1lcyI6WyJqUXVlcnkiLCIkIiwiZm9ybSIsInN1Ym1pdCIsIiR0aGlzIiwicG9zdCIsInNlcmlhbGl6ZSIsInJlc3VsdCIsInR5cGUiLCJwcmV2IiwidGV4dCIsIm1lc3NhZ2UiLCJmYWRlSW4iLCJkZWxheSIsImZhZGVPdXQiLCJtYXAiLCJHTWFwcyIsImVsIiwibGF0IiwibG5nIiwic2Nyb2xsd2hlZWwiLCJ6b29tIiwiem9vbUNvbnRyb2wiLCJwYW5Db250cm9sIiwic3RyZWV0Vmlld0NvbnRyb2wiLCJtYXBUeXBlQ29udHJvbCIsIm92ZXJ2aWV3TWFwQ29udHJvbCIsImNsaWNrYWJsZSIsImltYWdlIiwiYWRkTWFya2VyIiwiYW5pbWF0aW9uIiwiZ29vZ2xlIiwibWFwcyIsIkFuaW1hdGlvbiIsIkRST1AiLCJ2ZXJ0aWNhbEFsaWduIiwiaG9yaXpvbnRhbEFsaWduIiwiYmFja2dyb3VuZENvbG9yIiwic3R5bGVzIiwiYWRkU3R5bGUiLCJzdHlsZWRNYXBOYW1lIiwibWFwVHlwZUlkIiwic2V0U3R5bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUMsVUFBU0MsQ0FBVCxFQUFZO0FBQUMsZ0JBRWxCQyxJQUFJLEdBQUdELENBQUMsQ0FBQyxlQUFELENBRlU7QUFHbkJDLE1BQUksQ0FBQ0MsTUFBTCxDQUFZLFlBQVk7QUFBQyxrQkFDeEJDLEtBQUssR0FBR0gsQ0FBQyxDQUFDLElBQUQsQ0FEZTtBQUV4QkEsS0FBQyxDQUFDSSxJQUFGLENBQU8sZUFBUCxFQUF3QkosQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQkssU0FBbkIsRUFBeEIsRUFBdUQsVUFBU0MsTUFBVCxFQUFnQjtBQUN0RSxVQUFHQSxNQUFNLENBQUNDLElBQVAsSUFBZSxTQUFsQixFQUE0QjtBQUMzQkosYUFBSyxDQUFDSyxJQUFOLEdBQWFDLElBQWIsQ0FBa0JILE1BQU0sQ0FBQ0ksT0FBekIsRUFBa0NDLE1BQWxDLEdBQTJDQyxLQUEzQyxDQUFpRCxJQUFqRCxFQUF1REMsT0FBdkQ7QUFDQTtBQUNELEtBSkQ7QUFLQSxXQUFPLEtBQVA7QUFDQSxHQVJEO0FBVUEsQ0FiSyxDQUFOLEMsQ0FlQTs7QUFDQyxhQUFVO0FBRVYsTUFBSUMsR0FBSjtBQUVBQSxLQUFHLEdBQUcsSUFBSUMsS0FBSixDQUFVO0FBQ2ZDLE1BQUUsRUFBRSxPQURXO0FBRWZDLE9BQUcsRUFBRSxVQUZVO0FBR2ZDLE9BQUcsRUFBRSxDQUFDLFVBSFM7QUFJZkMsZUFBVyxFQUFDLEtBSkc7QUFLZkMsUUFBSSxFQUFFLEVBTFM7QUFNZkMsZUFBVyxFQUFHLEtBTkM7QUFPZkMsY0FBVSxFQUFHLEtBUEU7QUFRZkMscUJBQWlCLEVBQUcsS0FSTDtBQVNmQyxrQkFBYyxFQUFFLEtBVEQ7QUFVZkMsc0JBQWtCLEVBQUUsS0FWTDtBQVdmQyxhQUFTLEVBQUU7QUFYSSxHQUFWLENBQU47QUFjQSxNQUFJQyxLQUFLLEdBQUcscUJBQVo7QUFDQWIsS0FBRyxDQUFDYyxTQUFKLENBQWM7QUFDYlgsT0FBRyxFQUFFLFVBRFE7QUFFYkMsT0FBRyxFQUFFLENBQUMsVUFGTztBQUdiO0FBQ0FXLGFBQVMsRUFBRUMsTUFBTSxDQUFDQyxJQUFQLENBQVlDLFNBQVosQ0FBc0JDLElBSnBCO0FBS2JDLGlCQUFhLEVBQUUsUUFMRjtBQU1iQyxtQkFBZSxFQUFFLFFBTko7QUFPYkMsbUJBQWUsRUFBRTtBQVBKLEdBQWQ7QUFVQSxNQUFJQyxNQUFNLEdBQUcsQ0FFYjtBQUNDLG1CQUFlLE1BRGhCO0FBRUMsZUFBVyxDQUNYO0FBQUUsZUFBUztBQUFYLEtBRFc7QUFGWixHQUZhLEVBT1g7QUFDRCxtQkFBZSxPQURkO0FBRUQsZUFBVyxDQUNYO0FBQUUsZUFBUztBQUFYLEtBRFc7QUFGVixHQVBXLEVBWVg7QUFDRCxtQkFBZSxXQURkO0FBRUQsZUFBVyxDQUNYO0FBQUUsZUFBUztBQUFYLEtBRFc7QUFGVixHQVpXLEVBaUJYO0FBQ0QsbUJBQWUsa0JBRGQ7QUFFRCxlQUFXLENBQ1g7QUFBRSxlQUFTO0FBQVgsS0FEVztBQUZWLEdBakJXLEVBc0JYO0FBQ0QsbUJBQWUsS0FEZDtBQUVELGVBQVcsQ0FDWDtBQUFFLGVBQVM7QUFBWCxLQURXO0FBRlYsR0F0QlcsRUEyQlg7QUFDRCxtQkFBZSxhQURkO0FBRUQsZUFBVyxDQUNYO0FBQUUsb0JBQWM7QUFBaEIsS0FEVyxFQUVYO0FBQUUsZ0JBQVU7QUFBWixLQUZXLEVBR1g7QUFBRSxlQUFTO0FBQVgsS0FIVztBQUZWLEdBM0JXLENBQWI7QUFzQ0F2QixLQUFHLENBQUN3QixRQUFKLENBQWE7QUFDWkMsaUJBQWEsRUFBQyxZQURGO0FBRVpGLFVBQU0sRUFBRUEsTUFGSTtBQUdaRyxhQUFTLEVBQUU7QUFIQyxHQUFiO0FBTUExQixLQUFHLENBQUMyQixRQUFKLENBQWEsV0FBYjtBQUNBLENBMUVBLEdBQUQsQyIsImZpbGUiOiJjb250YWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGZ1bmN0aW9uKCQpIHsndXNlIHN0cmljdCcsXG5cblx0IGZvcm0gPSAkKCcuY29udGFjdC1mb3JtJyk7XG5cdGZvcm0uc3VibWl0KGZ1bmN0aW9uICgpIHsndXNlIHN0cmljdCcsXG5cdFx0JHRoaXMgPSAkKHRoaXMpO1xuXHRcdCQucG9zdChcInNlbmRlbWFpbC5waHBcIiwgJChcIi5jb250YWN0LWZvcm1cIikuc2VyaWFsaXplKCksZnVuY3Rpb24ocmVzdWx0KXtcblx0XHRcdGlmKHJlc3VsdC50eXBlID09ICdzdWNjZXNzJyl7XG5cdFx0XHRcdCR0aGlzLnByZXYoKS50ZXh0KHJlc3VsdC5tZXNzYWdlKS5mYWRlSW4oKS5kZWxheSgzMDAwKS5mYWRlT3V0KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KTtcblxufSk7XG5cbi8vIEdvb2dsZSBNYXAgQ3VzdG9taXphdGlvblxuKGZ1bmN0aW9uKCl7XG5cblx0dmFyIG1hcDtcblxuXHRtYXAgPSBuZXcgR01hcHMoe1xuXHRcdGVsOiAnI2dtYXAnLFxuXHRcdGxhdDogNDMuMTU4MDE1OSxcblx0XHRsbmc6IC03Ny42MDMwNzc3LFxuXHRcdHNjcm9sbHdoZWVsOmZhbHNlLFxuXHRcdHpvb206IDE0LFxuXHRcdHpvb21Db250cm9sIDogZmFsc2UsXG5cdFx0cGFuQ29udHJvbCA6IGZhbHNlLFxuXHRcdHN0cmVldFZpZXdDb250cm9sIDogZmFsc2UsXG5cdFx0bWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxuXHRcdG92ZXJ2aWV3TWFwQ29udHJvbDogZmFsc2UsXG5cdFx0Y2xpY2thYmxlOiBmYWxzZVxuXHR9KTtcblxuXHR2YXIgaW1hZ2UgPSAnaW1hZ2VzL21hcC1pY29uLnBuZyc7XG5cdG1hcC5hZGRNYXJrZXIoe1xuXHRcdGxhdDogNDMuMTU4MDE1OSxcblx0XHRsbmc6IC03Ny42MDMwNzc3LFxuXHRcdC8vIGljb246IGltYWdlLFxuXHRcdGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1AsXG5cdFx0dmVydGljYWxBbGlnbjogJ2JvdHRvbScsXG5cdFx0aG9yaXpvbnRhbEFsaWduOiAnY2VudGVyJyxcblx0XHRiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcblx0fSk7XG5cblx0dmFyIHN0eWxlcyA9IFsgXG5cblx0e1xuXHRcdFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG5cdFx0XCJzdHlsZXJzXCI6IFtcblx0XHR7IFwiY29sb3JcIjogXCJcIiB9XG5cdFx0XVxuXHR9LHtcblx0XHRcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcblx0XHRcInN0eWxlcnNcIjogW1xuXHRcdHsgXCJjb2xvclwiOiBcIiNBMkRBRjJcIiB9XG5cdFx0XVxuXHR9LHtcblx0XHRcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXG5cdFx0XCJzdHlsZXJzXCI6IFtcblx0XHR7IFwiY29sb3JcIjogXCIjQUJDRTgzXCIgfVxuXHRcdF1cblx0fSx7XG5cdFx0XCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcblx0XHRcInN0eWxlcnNcIjogW1xuXHRcdHsgXCJjb2xvclwiOiBcIiMwMDAwMDBcIiB9XG5cdFx0XVxuXHR9LHtcblx0XHRcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG5cdFx0XCJzdHlsZXJzXCI6IFtcblx0XHR7IFwiY29sb3JcIjogXCIjMkVDQzcxXCIgfVxuXHRcdF1cblx0fSx7XG5cdFx0XCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0XCIsXG5cdFx0XCJzdHlsZXJzXCI6IFtcblx0XHR7IFwic2F0dXJhdGlvblwiOiAxIH0sXG5cdFx0eyBcIndlaWdodFwiOiAwLjEgfSxcblx0XHR7IFwiY29sb3JcIjogXCIjMTExMTExXCIgfVxuXHRcdF1cblx0fVxuXG5cdF07XG5cblx0bWFwLmFkZFN0eWxlKHtcblx0XHRzdHlsZWRNYXBOYW1lOlwiU3R5bGVkIE1hcFwiLFxuXHRcdHN0eWxlczogc3R5bGVzLFxuXHRcdG1hcFR5cGVJZDogXCJtYXBfc3R5bGVcIiAgXG5cdH0pO1xuXG5cdG1hcC5zZXRTdHlsZShcIm1hcF9zdHlsZVwiKTtcbn0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==