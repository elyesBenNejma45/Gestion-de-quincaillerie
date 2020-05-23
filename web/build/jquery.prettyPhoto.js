(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["jquery.prettyPhoto"],{

/***/ "./assets/js/jquery.prettyPhoto.js":
/*!*****************************************!*\
  !*** ./assets/js/jquery.prettyPhoto.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* ------------------------------------------------------------------------
	Class: prettyPhoto
	Use: Lightbox clone for jQuery
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 3.1.5
------------------------------------------------------------------------- */
(function (e) {
  function t() {
    var e = location.href;
    hashtag = e.indexOf("#prettyPhoto") !== -1 ? decodeURI(e.substring(e.indexOf("#prettyPhoto") + 1, e.length)) : false;
    return hashtag;
  }

  function n() {
    if (typeof theRel == "undefined") return;
    location.hash = theRel + "/" + rel_index + "/";
  }

  function r() {
    if (location.href.indexOf("#prettyPhoto") !== -1) location.hash = "prettyPhoto";
  }

  function i(e, t) {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var n = "[\\?&]" + e + "=([^&#]*)";
    var r = new RegExp(n);
    var i = r.exec(t);
    return i == null ? "" : i[1];
  }

  e.prettyPhoto = {
    version: "3.1.5"
  };

  e.fn.prettyPhoto = function (s) {
    function g() {
      e(".pp_loaderIcon").hide();
      projectedTop = scroll_pos["scrollTop"] + (d / 2 - a["containerHeight"] / 2);
      if (projectedTop < 0) projectedTop = 0;
      $ppt.fadeTo(settings.animation_speed, 1);
      $pp_pic_holder.find(".pp_content").animate({
        height: a["contentHeight"],
        width: a["contentWidth"]
      }, settings.animation_speed);
      $pp_pic_holder.animate({
        top: projectedTop,
        left: v / 2 - a["containerWidth"] / 2 < 0 ? 0 : v / 2 - a["containerWidth"] / 2,
        width: a["containerWidth"]
      }, settings.animation_speed, function () {
        $pp_pic_holder.find(".pp_hoverContainer,#fullResImage").height(a["height"]).width(a["width"]);
        $pp_pic_holder.find(".pp_fade").fadeIn(settings.animation_speed);

        if (isSet && S(pp_images[set_position]) == "image") {
          $pp_pic_holder.find(".pp_hoverContainer").show();
        } else {
          $pp_pic_holder.find(".pp_hoverContainer").hide();
        }

        if (settings.allow_expand) {
          if (a["resized"]) {
            e("a.pp_expand,a.pp_contract").show();
          } else {
            e("a.pp_expand").hide();
          }
        }

        if (settings.autoplay_slideshow && !m && !f) e.prettyPhoto.startSlideshow();
        settings.changepicturecallback();
        f = true;
      });
      C();
      s.ajaxcallback();
    }

    function y(t) {
      $pp_pic_holder.find("#pp_full_res object,#pp_full_res embed").css("visibility", "hidden");
      $pp_pic_holder.find(".pp_fade").fadeOut(settings.animation_speed, function () {
        e(".pp_loaderIcon").show();
        t();
      });
    }

    function b(t) {
      t > 1 ? e(".pp_nav").show() : e(".pp_nav").hide();
    }

    function w(e, t) {
      resized = false;
      E(e, t);
      imageWidth = e, imageHeight = t;

      if ((p > v || h > d) && doresize && settings.allow_resize && !u) {
        resized = true, fitting = false;

        while (!fitting) {
          if (p > v) {
            imageWidth = v - 200;
            imageHeight = t / e * imageWidth;
          } else if (h > d) {
            imageHeight = d - 200;
            imageWidth = e / t * imageHeight;
          } else {
            fitting = true;
          }

          h = imageHeight, p = imageWidth;
        }

        if (p > v || h > d) {
          w(p, h);
        }

        E(imageWidth, imageHeight);
      }

      return {
        width: Math.floor(imageWidth),
        height: Math.floor(imageHeight),
        containerHeight: Math.floor(h),
        containerWidth: Math.floor(p) + settings.horizontal_padding * 2,
        contentHeight: Math.floor(l),
        contentWidth: Math.floor(c),
        resized: resized
      };
    }

    function E(t, n) {
      t = parseFloat(t);
      n = parseFloat(n);
      $pp_details = $pp_pic_holder.find(".pp_details");
      $pp_details.width(t);
      detailsHeight = parseFloat($pp_details.css("marginTop")) + parseFloat($pp_details.css("marginBottom"));
      $pp_details = $pp_details.clone().addClass(settings.theme).width(t).appendTo(e("body")).css({
        position: "absolute",
        top: -1e4
      });
      detailsHeight += $pp_details.height();
      detailsHeight = detailsHeight <= 34 ? 36 : detailsHeight;
      $pp_details.remove();
      $pp_title = $pp_pic_holder.find(".ppt");
      $pp_title.width(t);
      titleHeight = parseFloat($pp_title.css("marginTop")) + parseFloat($pp_title.css("marginBottom"));
      $pp_title = $pp_title.clone().appendTo(e("body")).css({
        position: "absolute",
        top: -1e4
      });
      titleHeight += $pp_title.height();
      $pp_title.remove();
      l = n + detailsHeight;
      c = t;
      h = l + titleHeight + $pp_pic_holder.find(".pp_top").height() + $pp_pic_holder.find(".pp_bottom").height();
      p = t;
    }

    function S(e) {
      if (e.match(/youtube\.com\/watch/i) || e.match(/youtu\.be/i)) {
        return "youtube";
      } else if (e.match(/vimeo\.com/i)) {
        return "vimeo";
      } else if (e.match(/\b.mov\b/i)) {
        return "quicktime";
      } else if (e.match(/\b.swf\b/i)) {
        return "flash";
      } else if (e.match(/\biframe=true\b/i)) {
        return "iframe";
      } else if (e.match(/\bajax=true\b/i)) {
        return "ajax";
      } else if (e.match(/\bcustom=true\b/i)) {
        return "custom";
      } else if (e.substr(0, 1) == "#") {
        return "inline";
      } else {
        return "image";
      }
    }

    function x() {
      if (doresize && typeof $pp_pic_holder != "undefined") {
        scroll_pos = T();
        contentHeight = $pp_pic_holder.height(), contentwidth = $pp_pic_holder.width();
        projectedTop = d / 2 + scroll_pos["scrollTop"] - contentHeight / 2;
        if (projectedTop < 0) projectedTop = 0;
        if (contentHeight > d) return;
        $pp_pic_holder.css({
          top: projectedTop,
          left: v / 2 + scroll_pos["scrollLeft"] - contentwidth / 2
        });
      }
    }

    function T() {
      if (self.pageYOffset) {
        return {
          scrollTop: self.pageYOffset,
          scrollLeft: self.pageXOffset
        };
      } else if (document.documentElement && document.documentElement.scrollTop) {
        return {
          scrollTop: document.documentElement.scrollTop,
          scrollLeft: document.documentElement.scrollLeft
        };
      } else if (document.body) {
        return {
          scrollTop: document.body.scrollTop,
          scrollLeft: document.body.scrollLeft
        };
      }
    }

    function N() {
      d = e(window).height(), v = e(window).width();
      if (typeof $pp_overlay != "undefined") $pp_overlay.height(e(document).height()).width(v);
    }

    function C() {
      if (isSet && settings.overlay_gallery && S(pp_images[set_position]) == "image") {
        itemWidth = 52 + 5;
        navWidth = settings.theme == "facebook" || settings.theme == "pp_default" ? 50 : 30;
        itemsPerPage = Math.floor((a["containerWidth"] - 100 - navWidth) / itemWidth);
        itemsPerPage = itemsPerPage < pp_images.length ? itemsPerPage : pp_images.length;
        totalPage = Math.ceil(pp_images.length / itemsPerPage) - 1;

        if (totalPage == 0) {
          navWidth = 0;
          $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").hide();
        } else {
          $pp_gallery.find(".pp_arrow_next,.pp_arrow_previous").show();
        }

        galleryWidth = itemsPerPage * itemWidth;
        fullGalleryWidth = pp_images.length * itemWidth;
        $pp_gallery.css("margin-left", -(galleryWidth / 2 + navWidth / 2)).find("div:first").width(galleryWidth + 5).find("ul").width(fullGalleryWidth).find("li.selected").removeClass("selected");
        goToPage = Math.floor(set_position / itemsPerPage) < totalPage ? Math.floor(set_position / itemsPerPage) : totalPage;
        e.prettyPhoto.changeGalleryPage(goToPage);
        $pp_gallery_li.filter(":eq(" + set_position + ")").addClass("selected");
      } else {
        $pp_pic_holder.find(".pp_content").unbind("mouseenter mouseleave");
      }
    }

    function k(t) {
      if (settings.social_tools) facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href));
      settings.markup = settings.markup.replace("{pp_social}", "");
      e("body").append(settings.markup);
      $pp_pic_holder = e(".pp_pic_holder"), $ppt = e(".ppt"), $pp_overlay = e("div.pp_overlay");

      if (isSet && settings.overlay_gallery) {
        currentGalleryPage = 0;
        toInject = "";

        for (var n = 0; n < pp_images.length; n++) {
          if (!pp_images[n].match(/\b(jpg|jpeg|png|gif)\b/gi)) {
            classname = "default";
            img_src = "";
          } else {
            classname = "";
            img_src = pp_images[n];
          }

          toInject += "<li class='" + classname + "'><a href='#'><img src='" + img_src + "' width='50' alt='' /></a></li>";
        }

        toInject = settings.gallery_markup.replace(/{gallery}/g, toInject);
        $pp_pic_holder.find("#pp_full_res").after(toInject);
        $pp_gallery = e(".pp_pic_holder .pp_gallery"), $pp_gallery_li = $pp_gallery.find("li");
        $pp_gallery.find(".pp_arrow_next").click(function () {
          e.prettyPhoto.changeGalleryPage("next");
          e.prettyPhoto.stopSlideshow();
          return false;
        });
        $pp_gallery.find(".pp_arrow_previous").click(function () {
          e.prettyPhoto.changeGalleryPage("previous");
          e.prettyPhoto.stopSlideshow();
          return false;
        });
        $pp_pic_holder.find(".pp_content").hover(function () {
          $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeIn();
        }, function () {
          $pp_pic_holder.find(".pp_gallery:not(.disabled)").fadeOut();
        });
        itemWidth = 52 + 5;
        $pp_gallery_li.each(function (t) {
          e(this).find("a").click(function () {
            e.prettyPhoto.changePage(t);
            e.prettyPhoto.stopSlideshow();
            return false;
          });
        });
      }

      if (settings.slideshow) {
        $pp_pic_holder.find(".pp_nav").prepend('<a href="#" class="pp_play">Play</a>');
        $pp_pic_holder.find(".pp_nav .pp_play").click(function () {
          e.prettyPhoto.startSlideshow();
          return false;
        });
      }

      $pp_pic_holder.attr("class", "pp_pic_holder " + settings.theme);
      $pp_overlay.css({
        opacity: 0,
        height: e(document).height(),
        width: e(window).width()
      }).bind("click", function () {
        if (!settings.modal) e.prettyPhoto.close();
      });
      e("a.pp_close").bind("click", function () {
        e.prettyPhoto.close();
        return false;
      });

      if (settings.allow_expand) {
        e("a.pp_expand").bind("click", function (t) {
          if (e(this).hasClass("pp_expand")) {
            e(this).removeClass("pp_expand").addClass("pp_contract");
            doresize = false;
          } else {
            e(this).removeClass("pp_contract").addClass("pp_expand");
            doresize = true;
          }

          y(function () {
            e.prettyPhoto.open();
          });
          return false;
        });
      }

      $pp_pic_holder.find(".pp_previous, .pp_nav .pp_arrow_previous").bind("click", function () {
        e.prettyPhoto.changePage("previous");
        e.prettyPhoto.stopSlideshow();
        return false;
      });
      $pp_pic_holder.find(".pp_next, .pp_nav .pp_arrow_next").bind("click", function () {
        e.prettyPhoto.changePage("next");
        e.prettyPhoto.stopSlideshow();
        return false;
      });
      x();
    }

    s = jQuery.extend({
      hook: "rel",
      animation_speed: "fast",
      ajaxcallback: function ajaxcallback() {},
      slideshow: 5e3,
      autoplay_slideshow: false,
      opacity: .8,
      show_title: true,
      allow_resize: true,
      allow_expand: true,
      default_width: 500,
      default_height: 344,
      counter_separator_label: "/",
      theme: "pp_default",
      horizontal_padding: 20,
      hideflash: false,
      wmode: "opaque",
      autoplay: true,
      modal: false,
      deeplinking: true,
      overlay_gallery: true,
      overlay_gallery_max: 30,
      keyboard_shortcuts: true,
      changepicturecallback: function changepicturecallback() {},
      callback: function callback() {},
      ie6_fallback: true,
      markup: '<div class="pp_pic_holder"> 						<div class="ppt"> </div> 						<div class="pp_top"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 						<div class="pp_content_container"> 							<div class="pp_left"> 							<div class="pp_right"> 								<div class="pp_content"> 									<div class="pp_loaderIcon"></div> 									<div class="pp_fade"> 										<a href="#" class="pp_expand" title="Expand the image">Expand</a> 										<div class="pp_hoverContainer"> 											<a class="pp_next" href="#">next</a> 											<a class="pp_previous" href="#">previous</a> 										</div> 										<div id="pp_full_res"></div> 										<div class="pp_details"> 											<div class="pp_nav"> 												<a href="#" class="pp_arrow_previous">Previous</a> 												<p class="currentTextHolder">0/0</p> 												<a href="#" class="pp_arrow_next">Next</a> 											</div> 											<p class="pp_description"></p> 											<div class="pp_social">{pp_social}</div> 											<a class="pp_close" href="#">Close</a> 										</div> 									</div> 								</div> 							</div> 							</div> 						</div> 						<div class="pp_bottom"> 							<div class="pp_left"></div> 							<div class="pp_middle"></div> 							<div class="pp_right"></div> 						</div> 					</div> 					<div class="pp_overlay"></div>',
      gallery_markup: '<div class="pp_gallery"> 								<a href="#" class="pp_arrow_previous">Previous</a> 								<div> 									<ul> 										{gallery} 									</ul> 								</div> 								<a href="#" class="pp_arrow_next">Next</a> 							</div>',
      image_markup: '<img id="fullResImage" src="{path}" />',
      flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
      quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
      iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
      inline_markup: '<div class="pp_inline">{content}</div>',
      custom_markup: "",
      social_tools: '<div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="//www.facebook.com/plugins/like.php?locale=en_US&href={location_href}&layout=button_count&show_faces=true&width=500&action=like&font&colorscheme=light&height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div>'
    }, s);
    var o = this,
        u = false,
        a,
        f,
        l,
        c,
        h,
        p,
        d = e(window).height(),
        v = e(window).width(),
        m;
    doresize = true, scroll_pos = T();
    e(window).unbind("resize.prettyphoto").bind("resize.prettyphoto", function () {
      x();
      N();
    });

    if (s.keyboard_shortcuts) {
      e(document).unbind("keydown.prettyphoto").bind("keydown.prettyphoto", function (t) {
        if (typeof $pp_pic_holder != "undefined") {
          if ($pp_pic_holder.is(":visible")) {
            switch (t.keyCode) {
              case 37:
                e.prettyPhoto.changePage("previous");
                t.preventDefault();
                break;

              case 39:
                e.prettyPhoto.changePage("next");
                t.preventDefault();
                break;

              case 27:
                if (!settings.modal) e.prettyPhoto.close();
                t.preventDefault();
                break;
            }
          }
        }
      });
    }

    e.prettyPhoto.initialize = function () {
      settings = s;
      if (settings.theme == "pp_default") settings.horizontal_padding = 16;
      theRel = e(this).attr(settings.hook);
      galleryRegExp = /\[(?:.*)\]/;
      isSet = galleryRegExp.exec(theRel) ? true : false;
      pp_images = isSet ? jQuery.map(o, function (t, n) {
        if (e(t).attr(settings.hook).indexOf(theRel) != -1) return e(t).attr("href");
      }) : e.makeArray(e(this).attr("href"));
      pp_titles = isSet ? jQuery.map(o, function (t, n) {
        if (e(t).attr(settings.hook).indexOf(theRel) != -1) return e(t).find("img").attr("alt") ? e(t).find("img").attr("alt") : "";
      }) : e.makeArray(e(this).find("img").attr("alt"));
      pp_descriptions = isSet ? jQuery.map(o, function (t, n) {
        if (e(t).attr(settings.hook).indexOf(theRel) != -1) return e(t).attr("title") ? e(t).attr("title") : "";
      }) : e.makeArray(e(this).attr("title"));
      if (pp_images.length > settings.overlay_gallery_max) settings.overlay_gallery = false;
      set_position = jQuery.inArray(e(this).attr("href"), pp_images);
      rel_index = isSet ? set_position : e("a[" + settings.hook + "^='" + theRel + "']").index(e(this));
      k(this);
      if (settings.allow_resize) e(window).bind("scroll.prettyphoto", function () {
        x();
      });
      e.prettyPhoto.open();
      return false;
    };

    e.prettyPhoto.open = function (t) {
      if (typeof settings == "undefined") {
        settings = s;
        pp_images = e.makeArray(arguments[0]);
        pp_titles = arguments[1] ? e.makeArray(arguments[1]) : e.makeArray("");
        pp_descriptions = arguments[2] ? e.makeArray(arguments[2]) : e.makeArray("");
        isSet = pp_images.length > 1 ? true : false;
        set_position = arguments[3] ? arguments[3] : 0;
        k(t.target);
      }

      if (settings.hideflash) e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "hidden");
      b(e(pp_images).size());
      e(".pp_loaderIcon").show();
      if (settings.deeplinking) n();

      if (settings.social_tools) {
        facebook_like_link = settings.social_tools.replace("{location_href}", encodeURIComponent(location.href));
        $pp_pic_holder.find(".pp_social").html(facebook_like_link);
      }

      if ($ppt.is(":hidden")) $ppt.css("opacity", 0).show();
      $pp_overlay.show().fadeTo(settings.animation_speed, settings.opacity);
      $pp_pic_holder.find(".currentTextHolder").text(set_position + 1 + settings.counter_separator_label + e(pp_images).size());

      if (typeof pp_descriptions[set_position] != "undefined" && pp_descriptions[set_position] != "") {
        $pp_pic_holder.find(".pp_description").show().html(unescape(pp_descriptions[set_position]));
      } else {
        $pp_pic_holder.find(".pp_description").hide();
      }

      movie_width = parseFloat(i("width", pp_images[set_position])) ? i("width", pp_images[set_position]) : settings.default_width.toString();
      movie_height = parseFloat(i("height", pp_images[set_position])) ? i("height", pp_images[set_position]) : settings.default_height.toString();
      u = false;

      if (movie_height.indexOf("%") != -1) {
        movie_height = parseFloat(e(window).height() * parseFloat(movie_height) / 100 - 150);
        u = true;
      }

      if (movie_width.indexOf("%") != -1) {
        movie_width = parseFloat(e(window).width() * parseFloat(movie_width) / 100 - 150);
        u = true;
      }

      $pp_pic_holder.fadeIn(function () {
        settings.show_title && pp_titles[set_position] != "" && typeof pp_titles[set_position] != "undefined" ? $ppt.html(unescape(pp_titles[set_position])) : $ppt.html(" ");
        imgPreloader = "";
        skipInjection = false;

        switch (S(pp_images[set_position])) {
          case "image":
            imgPreloader = new Image();
            nextImage = new Image();
            if (isSet && set_position < e(pp_images).size() - 1) nextImage.src = pp_images[set_position + 1];
            prevImage = new Image();
            if (isSet && pp_images[set_position - 1]) prevImage.src = pp_images[set_position - 1];
            $pp_pic_holder.find("#pp_full_res")[0].innerHTML = settings.image_markup.replace(/{path}/g, pp_images[set_position]);

            imgPreloader.onload = function () {
              a = w(imgPreloader.width, imgPreloader.height);
              g();
            };

            imgPreloader.onerror = function () {
              alert("Image cannot be loaded. Make sure the path is correct and image exist.");
              e.prettyPhoto.close();
            };

            imgPreloader.src = pp_images[set_position];
            break;

          case "youtube":
            a = w(movie_width, movie_height);
            movie_id = i("v", pp_images[set_position]);

            if (movie_id == "") {
              movie_id = pp_images[set_position].split("youtu.be/");
              movie_id = movie_id[1];
              if (movie_id.indexOf("?") > 0) movie_id = movie_id.substr(0, movie_id.indexOf("?"));
              if (movie_id.indexOf("&") > 0) movie_id = movie_id.substr(0, movie_id.indexOf("&"));
            }

            movie = "http://www.youtube.com/embed/" + movie_id;
            i("rel", pp_images[set_position]) ? movie += "?rel=" + i("rel", pp_images[set_position]) : movie += "?rel=1";
            if (settings.autoplay) movie += "&autoplay=1";
            toInject = settings.iframe_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, movie);
            break;

          case "vimeo":
            a = w(movie_width, movie_height);
            movie_id = pp_images[set_position];
            var t = /http(s?):\/\/(www\.)?vimeo.com\/(\d+)/;
            var n = movie_id.match(t);
            movie = "http://player.vimeo.com/video/" + n[3] + "?title=0&byline=0&portrait=0";
            if (settings.autoplay) movie += "&autoplay=1;";
            vimeo_width = a["width"] + "/embed/?moog_width=" + a["width"];
            toInject = settings.iframe_markup.replace(/{width}/g, vimeo_width).replace(/{height}/g, a["height"]).replace(/{path}/g, movie);
            break;

          case "quicktime":
            a = w(movie_width, movie_height);
            a["height"] += 15;
            a["contentHeight"] += 15;
            a["containerHeight"] += 15;
            toInject = settings.quicktime_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, pp_images[set_position]).replace(/{autoplay}/g, settings.autoplay);
            break;

          case "flash":
            a = w(movie_width, movie_height);
            flash_vars = pp_images[set_position];
            flash_vars = flash_vars.substring(pp_images[set_position].indexOf("flashvars") + 10, pp_images[set_position].length);
            filename = pp_images[set_position];
            filename = filename.substring(0, filename.indexOf("?"));
            toInject = settings.flash_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{wmode}/g, settings.wmode).replace(/{path}/g, filename + "?" + flash_vars);
            break;

          case "iframe":
            a = w(movie_width, movie_height);
            frame_url = pp_images[set_position];
            frame_url = frame_url.substr(0, frame_url.indexOf("iframe") - 1);
            toInject = settings.iframe_markup.replace(/{width}/g, a["width"]).replace(/{height}/g, a["height"]).replace(/{path}/g, frame_url);
            break;

          case "ajax":
            doresize = false;
            a = w(movie_width, movie_height);
            doresize = true;
            skipInjection = true;
            e.get(pp_images[set_position], function (e) {
              toInject = settings.inline_markup.replace(/{content}/g, e);
              $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject;
              g();
            });
            break;

          case "custom":
            a = w(movie_width, movie_height);
            toInject = settings.custom_markup;
            break;

          case "inline":
            myClone = e(pp_images[set_position]).clone().append('<br clear="all" />').css({
              width: settings.default_width
            }).wrapInner('<div id="pp_full_res"><div class="pp_inline"></div></div>').appendTo(e("body")).show();
            doresize = false;
            a = w(e(myClone).width(), e(myClone).height());
            doresize = true;
            e(myClone).remove();
            toInject = settings.inline_markup.replace(/{content}/g, e(pp_images[set_position]).html());
            break;
        }

        if (!imgPreloader && !skipInjection) {
          $pp_pic_holder.find("#pp_full_res")[0].innerHTML = toInject;
          g();
        }
      });
      return false;
    };

    e.prettyPhoto.changePage = function (t) {
      currentGalleryPage = 0;

      if (t == "previous") {
        set_position--;
        if (set_position < 0) set_position = e(pp_images).size() - 1;
      } else if (t == "next") {
        set_position++;
        if (set_position > e(pp_images).size() - 1) set_position = 0;
      } else {
        set_position = t;
      }

      rel_index = set_position;
      if (!doresize) doresize = true;

      if (settings.allow_expand) {
        e(".pp_contract").removeClass("pp_contract").addClass("pp_expand");
      }

      y(function () {
        e.prettyPhoto.open();
      });
    };

    e.prettyPhoto.changeGalleryPage = function (e) {
      if (e == "next") {
        currentGalleryPage++;
        if (currentGalleryPage > totalPage) currentGalleryPage = 0;
      } else if (e == "previous") {
        currentGalleryPage--;
        if (currentGalleryPage < 0) currentGalleryPage = totalPage;
      } else {
        currentGalleryPage = e;
      }

      slide_speed = e == "next" || e == "previous" ? settings.animation_speed : 0;
      slide_to = currentGalleryPage * itemsPerPage * itemWidth;
      $pp_gallery.find("ul").animate({
        left: -slide_to
      }, slide_speed);
    };

    e.prettyPhoto.startSlideshow = function () {
      if (typeof m == "undefined") {
        $pp_pic_holder.find(".pp_play").unbind("click").removeClass("pp_play").addClass("pp_pause").click(function () {
          e.prettyPhoto.stopSlideshow();
          return false;
        });
        m = setInterval(e.prettyPhoto.startSlideshow, settings.slideshow);
      } else {
        e.prettyPhoto.changePage("next");
      }
    };

    e.prettyPhoto.stopSlideshow = function () {
      $pp_pic_holder.find(".pp_pause").unbind("click").removeClass("pp_pause").addClass("pp_play").click(function () {
        e.prettyPhoto.startSlideshow();
        return false;
      });
      clearInterval(m);
      m = undefined;
    };

    e.prettyPhoto.close = function () {
      if ($pp_overlay.is(":animated")) return;
      e.prettyPhoto.stopSlideshow();
      $pp_pic_holder.stop().find("object,embed").css("visibility", "hidden");
      e("div.pp_pic_holder,div.ppt,.pp_fade").fadeOut(settings.animation_speed, function () {
        e(this).remove();
      });
      $pp_overlay.fadeOut(settings.animation_speed, function () {
        if (settings.hideflash) e("object,embed,iframe[src*=youtube],iframe[src*=vimeo]").css("visibility", "visible");
        e(this).remove();
        e(window).unbind("scroll.prettyphoto");
        r();
        settings.callback();
        doresize = true;
        f = false;
        delete settings;
      });
    };

    if (!pp_alreadyInitialized && t()) {
      pp_alreadyInitialized = true;
      hashIndex = t();
      hashRel = hashIndex;
      hashIndex = hashIndex.substring(hashIndex.indexOf("/") + 1, hashIndex.length - 1);
      hashRel = hashRel.substring(0, hashRel.indexOf("/"));
      setTimeout(function () {
        e("a[" + s.hook + "^='" + hashRel + "']:eq(" + hashIndex + ")").trigger("click");
      }, 50);
    }

    return this.unbind("click.prettyphoto").bind("click.prettyphoto", e.prettyPhoto.initialize);
  };
})(jQuery);

var pp_alreadyInitialized = false;

/***/ })

},[["./assets/js/jquery.prettyPhoto.js","runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvanF1ZXJ5LnByZXR0eVBob3RvLmpzIl0sIm5hbWVzIjpbImUiLCJ0IiwibG9jYXRpb24iLCJocmVmIiwiaGFzaHRhZyIsImluZGV4T2YiLCJkZWNvZGVVUkkiLCJzdWJzdHJpbmciLCJsZW5ndGgiLCJuIiwidGhlUmVsIiwiaGFzaCIsInJlbF9pbmRleCIsInIiLCJpIiwicmVwbGFjZSIsIlJlZ0V4cCIsImV4ZWMiLCJwcmV0dHlQaG90byIsInZlcnNpb24iLCJmbiIsInMiLCJnIiwiaGlkZSIsInByb2plY3RlZFRvcCIsInNjcm9sbF9wb3MiLCJkIiwiYSIsIiRwcHQiLCJmYWRlVG8iLCJzZXR0aW5ncyIsImFuaW1hdGlvbl9zcGVlZCIsIiRwcF9waWNfaG9sZGVyIiwiZmluZCIsImFuaW1hdGUiLCJoZWlnaHQiLCJ3aWR0aCIsInRvcCIsImxlZnQiLCJ2IiwiZmFkZUluIiwiaXNTZXQiLCJTIiwicHBfaW1hZ2VzIiwic2V0X3Bvc2l0aW9uIiwic2hvdyIsImFsbG93X2V4cGFuZCIsImF1dG9wbGF5X3NsaWRlc2hvdyIsIm0iLCJmIiwic3RhcnRTbGlkZXNob3ciLCJjaGFuZ2VwaWN0dXJlY2FsbGJhY2siLCJDIiwiYWpheGNhbGxiYWNrIiwieSIsImNzcyIsImZhZGVPdXQiLCJiIiwidyIsInJlc2l6ZWQiLCJFIiwiaW1hZ2VXaWR0aCIsImltYWdlSGVpZ2h0IiwicCIsImgiLCJkb3Jlc2l6ZSIsImFsbG93X3Jlc2l6ZSIsInUiLCJmaXR0aW5nIiwiTWF0aCIsImZsb29yIiwiY29udGFpbmVySGVpZ2h0IiwiY29udGFpbmVyV2lkdGgiLCJob3Jpem9udGFsX3BhZGRpbmciLCJjb250ZW50SGVpZ2h0IiwibCIsImNvbnRlbnRXaWR0aCIsImMiLCJwYXJzZUZsb2F0IiwiJHBwX2RldGFpbHMiLCJkZXRhaWxzSGVpZ2h0IiwiY2xvbmUiLCJhZGRDbGFzcyIsInRoZW1lIiwiYXBwZW5kVG8iLCJwb3NpdGlvbiIsInJlbW92ZSIsIiRwcF90aXRsZSIsInRpdGxlSGVpZ2h0IiwibWF0Y2giLCJzdWJzdHIiLCJ4IiwiVCIsImNvbnRlbnR3aWR0aCIsInNlbGYiLCJwYWdlWU9mZnNldCIsInNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJwYWdlWE9mZnNldCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiYm9keSIsIk4iLCJ3aW5kb3ciLCIkcHBfb3ZlcmxheSIsIm92ZXJsYXlfZ2FsbGVyeSIsIml0ZW1XaWR0aCIsIm5hdldpZHRoIiwiaXRlbXNQZXJQYWdlIiwidG90YWxQYWdlIiwiY2VpbCIsIiRwcF9nYWxsZXJ5IiwiZ2FsbGVyeVdpZHRoIiwiZnVsbEdhbGxlcnlXaWR0aCIsInJlbW92ZUNsYXNzIiwiZ29Ub1BhZ2UiLCJjaGFuZ2VHYWxsZXJ5UGFnZSIsIiRwcF9nYWxsZXJ5X2xpIiwiZmlsdGVyIiwidW5iaW5kIiwiayIsInNvY2lhbF90b29scyIsImZhY2Vib29rX2xpa2VfbGluayIsImVuY29kZVVSSUNvbXBvbmVudCIsIm1hcmt1cCIsImFwcGVuZCIsImN1cnJlbnRHYWxsZXJ5UGFnZSIsInRvSW5qZWN0IiwiY2xhc3NuYW1lIiwiaW1nX3NyYyIsImdhbGxlcnlfbWFya3VwIiwiYWZ0ZXIiLCJjbGljayIsInN0b3BTbGlkZXNob3ciLCJob3ZlciIsImVhY2giLCJjaGFuZ2VQYWdlIiwic2xpZGVzaG93IiwicHJlcGVuZCIsImF0dHIiLCJvcGFjaXR5IiwiYmluZCIsIm1vZGFsIiwiY2xvc2UiLCJoYXNDbGFzcyIsIm9wZW4iLCJqUXVlcnkiLCJleHRlbmQiLCJob29rIiwic2hvd190aXRsZSIsImRlZmF1bHRfd2lkdGgiLCJkZWZhdWx0X2hlaWdodCIsImNvdW50ZXJfc2VwYXJhdG9yX2xhYmVsIiwiaGlkZWZsYXNoIiwid21vZGUiLCJhdXRvcGxheSIsImRlZXBsaW5raW5nIiwib3ZlcmxheV9nYWxsZXJ5X21heCIsImtleWJvYXJkX3Nob3J0Y3V0cyIsImNhbGxiYWNrIiwiaWU2X2ZhbGxiYWNrIiwiaW1hZ2VfbWFya3VwIiwiZmxhc2hfbWFya3VwIiwicXVpY2t0aW1lX21hcmt1cCIsImlmcmFtZV9tYXJrdXAiLCJpbmxpbmVfbWFya3VwIiwiY3VzdG9tX21hcmt1cCIsIm8iLCJpcyIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsImluaXRpYWxpemUiLCJnYWxsZXJ5UmVnRXhwIiwibWFwIiwibWFrZUFycmF5IiwicHBfdGl0bGVzIiwicHBfZGVzY3JpcHRpb25zIiwiaW5BcnJheSIsImluZGV4IiwiYXJndW1lbnRzIiwidGFyZ2V0Iiwic2l6ZSIsImh0bWwiLCJ0ZXh0IiwidW5lc2NhcGUiLCJtb3ZpZV93aWR0aCIsInRvU3RyaW5nIiwibW92aWVfaGVpZ2h0IiwiaW1nUHJlbG9hZGVyIiwic2tpcEluamVjdGlvbiIsIkltYWdlIiwibmV4dEltYWdlIiwic3JjIiwicHJldkltYWdlIiwiaW5uZXJIVE1MIiwib25sb2FkIiwib25lcnJvciIsImFsZXJ0IiwibW92aWVfaWQiLCJzcGxpdCIsIm1vdmllIiwidmltZW9fd2lkdGgiLCJmbGFzaF92YXJzIiwiZmlsZW5hbWUiLCJmcmFtZV91cmwiLCJnZXQiLCJteUNsb25lIiwid3JhcElubmVyIiwic2xpZGVfc3BlZWQiLCJzbGlkZV90byIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInVuZGVmaW5lZCIsInN0b3AiLCJwcF9hbHJlYWR5SW5pdGlhbGl6ZWQiLCJoYXNoSW5kZXgiLCJoYXNoUmVsIiwic2V0VGltZW91dCIsInRyaWdnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFNQSxDQUFDLFVBQVNBLENBQVQsRUFBVztBQUFDLFdBQVNDLENBQVQsR0FBWTtBQUFDLFFBQUlELENBQUMsR0FBQ0UsUUFBUSxDQUFDQyxJQUFmO0FBQW9CQyxXQUFPLEdBQUNKLENBQUMsQ0FBQ0ssT0FBRixDQUFVLGNBQVYsTUFBNEIsQ0FBQyxDQUE3QixHQUErQkMsU0FBUyxDQUFDTixDQUFDLENBQUNPLFNBQUYsQ0FBWVAsQ0FBQyxD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QUFGO0FBQVEsZUFBT25CLFFBQVA7QUFBZ0IsT0FBMVI7QUFBNFIsS0FBNWlCOztBQUE2aUIsUUFBRyxDQUFDd0wscUJBQUQsSUFBd0JyTixDQUFDLEVBQTVCLEVBQStCO0FBQUNxTiwyQkFBcUIsR0FBQyxJQUF0QjtBQUEyQkMsZUFBUyxHQUFDdE4sQ0FBQyxFQUFYO0FBQWN1TixhQUFPLEdBQUNELFNBQVI7QUFBa0JBLGVBQVMsR0FBQ0EsU0FBUyxDQUFDaE4sU0FBVixDQUFvQmdOLFNBQVMsQ0FBQ2xOLE9BQVYsQ0FBa0IsR0FBbEIsSUFBdUIsQ0FBM0MsRUFBNkNrTixTQUFTLENBQUMvTSxNQUFWLEdBQWlCLENBQTlELENBQVY7QUFBMkVnTixhQUFPLEdBQUNBLE9BQU8sQ0FBQ2pOLFNBQVIsQ0FBa0IsQ0FBbEIsRUFBb0JpTixPQUFPLENBQUNuTixPQUFSLENBQWdCLEdBQWhCLENBQXBCLENBQVI7QUFBa0RvTixnQkFBVSxDQUFDLFlBQVU7QUFBQ3pOLFNBQUMsQ0FBQyxPQUFLcUIsQ0FBQyxDQUFDK0gsSUFBUCxHQUFZLEtBQVosR0FBa0JvRSxPQUFsQixHQUEwQixRQUExQixHQUFtQ0QsU0FBbkMsR0FBNkMsR0FBOUMsQ0FBRCxDQUFvREcsT0FBcEQsQ0FBNEQsT0FBNUQ7QUFBcUUsT0FBakYsRUFBa0YsRUFBbEYsQ0FBVjtBQUFnRzs7QUFBQSxXQUFPLEtBQUtuRyxNQUFMLENBQVksbUJBQVosRUFBaUNzQixJQUFqQyxDQUFzQyxtQkFBdEMsRUFBMEQ3SSxDQUFDLENBQUNrQixXQUFGLENBQWN5SixVQUF4RSxDQUFQO0FBQTJGLEdBQXJ0cEI7QUFBdXRwQixDQUF0dXFCLEVBQXd1cUJ6QixNQUF4dXFCOztBQUFndnFCLElBQUlvRSxxQkFBcUIsR0FBQyxLQUExQixDIiwiZmlsZSI6ImpxdWVyeS5wcmV0dHlQaG90by5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRDbGFzczogcHJldHR5UGhvdG9cblx0VXNlOiBMaWdodGJveCBjbG9uZSBmb3IgalF1ZXJ5XG5cdEF1dGhvcjogU3RlcGhhbmUgQ2Fyb24gKGh0dHA6Ly93d3cubm8tbWFyZ2luLWZvci1lcnJvcnMuY29tKVxuXHRWZXJzaW9uOiAzLjEuNVxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuKGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQoKXt2YXIgZT1sb2NhdGlvbi5ocmVmO2hhc2h0YWc9ZS5pbmRleE9mKFwiI3ByZXR0eVBob3RvXCIpIT09LTE/ZGVjb2RlVVJJKGUuc3Vic3RyaW5nKGUuaW5kZXhPZihcIiNwcmV0dHlQaG90b1wiKSsxLGUubGVuZ3RoKSk6ZmFsc2U7cmV0dXJuIGhhc2h0YWd9ZnVuY3Rpb24gbigpe2lmKHR5cGVvZiB0aGVSZWw9PVwidW5kZWZpbmVkXCIpcmV0dXJuO2xvY2F0aW9uLmhhc2g9dGhlUmVsK1wiL1wiK3JlbF9pbmRleCtcIi9cIn1mdW5jdGlvbiByKCl7aWYobG9jYXRpb24uaHJlZi5pbmRleE9mKFwiI3ByZXR0eVBob3RvXCIpIT09LTEpbG9jYXRpb24uaGFzaD1cInByZXR0eVBob3RvXCJ9ZnVuY3Rpb24gaShlLHQpe2U9ZS5yZXBsYWNlKC9bXFxbXS8sXCJcXFxcW1wiKS5yZXBsYWNlKC9bXFxdXS8sXCJcXFxcXVwiKTt2YXIgbj1cIltcXFxcPyZdXCIrZStcIj0oW14mI10qKVwiO3ZhciByPW5ldyBSZWdFeHAobik7dmFyIGk9ci5leGVjKHQpO3JldHVybiBpPT1udWxsP1wiXCI6aVsxXX1lLnByZXR0eVBob3RvPXt2ZXJzaW9uOlwiMy4xLjVcIn07ZS5mbi5wcmV0dHlQaG90bz1mdW5jdGlvbihzKXtmdW5jdGlvbiBnKCl7ZShcIi5wcF9sb2FkZXJJY29uXCIpLmhpZGUoKTtwcm9qZWN0ZWRUb3A9c2Nyb2xsX3Bvc1tcInNjcm9sbFRvcFwiXSsoZC8yLWFbXCJjb250YWluZXJIZWlnaHRcIl0vMik7aWYocHJvamVjdGVkVG9wPDApcHJvamVjdGVkVG9wPTA7JHBwdC5mYWRlVG8oc2V0dGluZ3MuYW5pbWF0aW9uX3NwZWVkLDEpOyRwcF9waWNfaG9sZGVyLmZpbmQoXCIucHBfY29udGVudFwiKS5hbmltYXRlKHtoZWlnaHQ6YVtcImNvbnRlbnRIZWlnaHRcIl0sd2lkdGg6YVtcImNvbnRlbnRXaWR0aFwiXX0sc2V0dGluZ3MuYW5pbWF0aW9uX3NwZWVkKTskcHBfcGljX2hvbGRlci5hbmltYXRlKHt0b3A6cHJvamVjdGVkVG9wLGxlZnQ6di8yLWFbXCJjb250YWluZXJXaWR0aFwiXS8yPDA/MDp2LzItYVtcImNvbnRhaW5lcldpZHRoXCJdLzIsd2lkdGg6YVtcImNvbnRhaW5lcldpZHRoXCJdfSxzZXR0aW5ncy5hbmltYXRpb25fc3BlZWQsZnVuY3Rpb24oKXskcHBfcGljX2hvbGRlci5maW5kKFwiLnBwX2hvdmVyQ29udGFpbmVyLCNmdWxsUmVzSW1hZ2VcIikuaGVpZ2h0KGFbXCJoZWlnaHRcIl0pLndpZHRoKGFbXCJ3aWR0aFwiXSk7JHBwX3BpY19ob2xkZXIuZmluZChcIi5wcF9mYWRlXCIpLmZhZGVJbihzZXR0aW5ncy5hbmltYXRpb25fc3BlZWQpO2lmKGlzU2V0JiZTKHBwX2ltYWdlc1tzZXRfcG9zaXRpb25dKT09XCJpbWFnZVwiKXskcHBfcGljX2hvbGRlci5maW5kKFwiLnBwX2hvdmVyQ29udGFpbmVyXCIpLnNob3coKX1lbHNleyRwcF9waWNfaG9sZGVyLmZpbmQoXCIucHBfaG92ZXJDb250YWluZXJcIikuaGlkZSgpfWlmKHNldHRpbmdzLmFsbG93X2V4cGFuZCl7aWYoYVtcInJlc2l6ZWRcIl0pe2UoXCJhLnBwX2V4cGFuZCxhLnBwX2NvbnRyYWN0XCIpLnNob3coKX1lbHNle2UoXCJhLnBwX2V4cGFuZFwiKS5oaWRlKCl9fWlmKHNldHRpbmdzLmF1dG9wbGF5X3NsaWRlc2hvdyYmIW0mJiFmKWUucHJldHR5UGhvdG8uc3RhcnRTbGlkZXNob3coKTtzZXR0aW5ncy5jaGFuZ2VwaWN0dXJlY2FsbGJhY2soKTtmPXRydWV9KTtDKCk7cy5hamF4Y2FsbGJhY2soKX1mdW5jdGlvbiB5KHQpeyRwcF9waWNfaG9sZGVyLmZpbmQoXCIjcHBfZnVsbF9yZXMgb2JqZWN0LCNwcF9mdWxsX3JlcyBlbWJlZFwiKS5jc3MoXCJ2aXNpYmlsaXR5XCIsXCJoaWRkZW5cIik7JHBwX3BpY19ob2xkZXIuZmluZChcIi5wcF9mYWRlXCIpLmZhZGVPdXQoc2V0dGluZ3MuYW5pbWF0aW9uX3NwZWVkLGZ1bmN0aW9uKCl7ZShcIi5wcF9sb2FkZXJJY29uXCIpLnNob3coKTt0KCl9KX1mdW5jdGlvbiBiKHQpe3Q+MT9lKFwiLnBwX25hdlwiKS5zaG93KCk6ZShcIi5wcF9uYXZcIikuaGlkZSgpfWZ1bmN0aW9uIHcoZSx0KXtyZXNpemVkPWZhbHNlO0UoZSx0KTtpbWFnZVdpZHRoPWUsaW1hZ2VIZWlnaHQ9dDtpZigocD52fHxoPmQpJiZkb3Jlc2l6ZSYmc2V0dGluZ3MuYWxsb3dfcmVzaXplJiYhdSl7cmVzaXplZD10cnVlLGZpdHRpbmc9ZmFsc2U7d2hpbGUoIWZpdHRpbmcpe2lmKHA+dil7aW1hZ2VXaWR0aD12LTIwMDtpbWFnZUhlaWdodD10L2UqaW1hZ2VXaWR0aH1lbHNlIGlmKGg+ZCl7aW1hZ2VIZWlnaHQ9ZC0yMDA7aW1hZ2VXaWR0aD1lL3QqaW1hZ2VIZWlnaHR9ZWxzZXtmaXR0aW5nPXRydWV9aD1pbWFnZUhlaWdodCxwPWltYWdlV2lkdGh9aWYocD52fHxoPmQpe3cocCxoKX1FKGltYWdlV2lkdGgsaW1hZ2VIZWlnaHQpfXJldHVybnt3aWR0aDpNYXRoLmZsb29yKGltYWdlV2lkdGgpLGhlaWdodDpNYXRoLmZsb29yKGltYWdlSGVpZ2h0KSxjb250YWluZXJIZWlnaHQ6TWF0aC5mbG9vcihoKSxjb250YWluZXJXaWR0aDpNYXRoLmZsb29yKHApK3NldHRpbmdzLmhvcml6b250YWxfcGFkZGluZyoyLGNvbnRlbnRIZWlnaHQ6TWF0aC5mbG9vcihsKSxjb250ZW50V2lkdGg6TWF0aC5mbG9vcihjKSxyZXNpemVkOnJlc2l6ZWR9fWZ1bmN0aW9uIEUodCxuKXt0PXBhcnNlRmxvYXQodCk7bj1wYXJzZUZsb2F0KG4pOyRwcF9kZXRhaWxzPSRwcF9waWNfaG9sZGVyLmZpbmQoXCIucHBfZGV0YWlsc1wiKTskcHBfZGV0YWlscy53aWR0aCh0KTtkZXRhaWxzSGVpZ2h0PXBhcnNlRmxvYXQoJHBwX2RldGFpbHMuY3NzKFwibWFyZ2luVG9wXCIpKStwYXJzZUZsb2F0KCRwcF9kZXRhaWxzLmNzcyhcIm1hcmdpbkJvdHRvbVwiKSk7JHBwX2RldGFpbHM9JHBwX2RldGFpbHMuY2xvbmUoKS5hZGRDbGFzcyhzZXR0aW5ncy50aGVtZSkud2lkdGgodCkuYXBwZW5kVG8oZShcImJvZHlcIikpLmNzcyh7cG9zaXRpb246XCJhYnNvbHV0ZVwiLHRvcDotMWU0fSk7ZGV0YWlsc0hlaWdodCs9JHBwX2RldGFpbHMuaGVpZ2h0KCk7ZGV0YWlsc0hlaWdodD1kZXRhaWxzSGVpZ2h0PD0zND8zNjpkZXRhaWxzSGVpZ2h0OyRwcF9kZXRhaWxzLnJlbW92ZSgpOyRwcF90aXRsZT0kcHBfcGljX2hvbGRlci5maW5kKFwiLnBwdFwiKTskcHBfdGl0bGUud2lkdGgodCk7dGl0bGVIZWlnaHQ9cGFyc2VGbG9hdCgkcHBfdGl0bGUuY3NzKFwibWFyZ2luVG9wXCIpKStwYXJzZUZsb2F0KCRwcF90aXRsZS5jc3MoXCJtYXJnaW5Cb3R0b21cIikpOyRwcF90aXRsZT0kcHBfdGl0bGUuY2xvbmUoKS5hcHBlbmRUbyhlKFwiYm9keVwiKSkuY3NzKHtwb3NpdGlvbjpcImFic29sdXRlXCIsdG9wOi0xZTR9KTt0aXRsZUhlaWdodCs9JHBwX3RpdGxlLmhlaWdodCgpOyRwcF90aXRsZS5yZW1vdmUoKTtsPW4rZGV0YWlsc0hlaWdodDtjPXQ7aD1sK3RpdGxlSGVpZ2h0KyRwcF9waWNfaG9sZGVyLmZpbmQoXCIucHBfdG9wXCIpLmhlaWdodCgpKyRwcF9waWNfaG9sZGVyLmZpbmQoXCIucHBfYm90dG9tXCIpLmhlaWdodCgpO3A9dH1mdW5jdGlvbiBTKGUpe2lmKGUubWF0Y2goL3lvdXR1YmVcXC5jb21cXC93YXRjaC9pKXx8ZS5tYXRjaCgveW91dHVcXC5iZS9pKSl7cmV0dXJuXCJ5b3V0dWJlXCJ9ZWxzZSBpZihlLm1hdGNoKC92aW1lb1xcLmNvbS9pKSl7cmV0dXJuXCJ2aW1lb1wifWVsc2UgaWYoZS5tYXRjaCgvXFxiLm1vdlxcYi9pKSl7cmV0dXJuXCJxdWlja3RpbWVcIn1lbHNlIGlmKGUubWF0Y2goL1xcYi5zd2ZcXGIvaSkpe3JldHVyblwiZmxhc2hcIn1lbHNlIGlmKGUubWF0Y2goL1xcYmlmcmFtZT10cnVlXFxiL2kpKXtyZXR1cm5cImlmcmFtZVwifWVsc2UgaWYoZS5tYXRjaCgvXFxiYWpheD10cnVlXFxiL2kpKXtyZXR1cm5cImFqYXhcIn1lbHNlIGlmKGUubWF0Y2goL1xcYmN1c3RvbT10cnVlXFxiL2kpKXtyZXR1cm5cImN1c3RvbVwifWVsc2UgaWYoZS5zdWJzdHIoMCwxKT09XCIjXCIpe3JldHVyblwiaW5saW5lXCJ9ZWxzZXtyZXR1cm5cImltYWdlXCJ9fWZ1bmN0aW9uIHgoKXtpZihkb3Jlc2l6ZSYmdHlwZW9mICRwcF9waWNfaG9sZGVyIT1cInVuZGVmaW5lZFwiKXtzY3JvbGxfcG9zPVQoKTtjb250ZW50SGVpZ2h0PSRwcF9waWNfaG9sZGVyLmhlaWdodCgpLGNvbnRlbnR3aWR0aD0kcHBfcGljX2hvbGRlci53aWR0aCgpO3Byb2plY3RlZFRvcD1kLzIrc2Nyb2xsX3Bvc1tcInNjcm9sbFRvcFwiXS1jb250ZW50SGVpZ2h0LzI7aWYocHJvamVjdGVkVG9wPDApcHJvamVjdGVkVG9wPTA7aWYoY29udGVudEhlaWdodD5kKXJldHVybjskcHBfcGljX2hvbGRlci5jc3Moe3RvcDpwcm9qZWN0ZWRUb3AsbGVmdDp2LzIrc2Nyb2xsX3Bvc1tcInNjcm9sbExlZnRcIl0tY29udGVudHdpZHRoLzJ9KX19ZnVuY3Rpb24gVCgpe2lmKHNlbGYucGFnZVlPZmZzZXQpe3JldHVybntzY3JvbGxUb3A6c2VsZi5wYWdlWU9mZnNldCxzY3JvbGxMZWZ0OnNlbGYucGFnZVhPZmZzZXR9fWVsc2UgaWYoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50JiZkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKXtyZXR1cm57c2Nyb2xsVG9wOmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3Asc2Nyb2xsTGVmdDpkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdH19ZWxzZSBpZihkb2N1bWVudC5ib2R5KXtyZXR1cm57c2Nyb2xsVG9wOmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wLHNjcm9sbExlZnQ6ZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0fX19ZnVuY3Rpb24gTigpe2Q9ZSh3aW5kb3cpLmhlaWdodCgpLHY9ZSh3aW5kb3cpLndpZHRoKCk7aWYodHlwZW9mICRwcF9vdmVybGF5IT1cInVuZGVmaW5lZFwiKSRwcF9vdmVybGF5LmhlaWdodChlKGRvY3VtZW50KS5oZWlnaHQoKSkud2lkdGgodil9ZnVuY3Rpb24gQygpe2lmKGlzU2V0JiZzZXR0aW5ncy5vdmVybGF5X2dhbGxlcnkmJlMocHBfaW1hZ2VzW3NldF9wb3NpdGlvbl0pPT1cImltYWdlXCIpe2l0ZW1XaWR0aD01Mis1O25hdldpZHRoPXNldHRpbmdzLnRoZW1lPT1cImZhY2Vib29rXCJ8fHNldHRpbmdzLnRoZW1lPT1cInBwX2RlZmF1bHRcIj81MDozMDtpdGVtc1BlclBhZ2U9TWF0aC5mbG9vcigoYVtcImNvbnRhaW5lcldpZHRoXCJdLTEwMC1uYXZXaWR0aCkvaXRlbVdpZHRoKTtpdGVtc1BlclBhZ2U9aXRlbXNQZXJQYWdlPHBwX2ltYWdlcy5sZW5ndGg/aXRlbXNQZXJQYWdlOnBwX2ltYWdlcy5sZW5ndGg7dG90YWxQYWdlPU1hdGguY2VpbChwcF9pbWFnZXMubGVuZ3RoL2l0ZW1zUGVyUGFnZSktMTtpZih0b3RhbFBhZ2U9PTApe25hdldpZHRoPTA7JHBwX2dhbGxlcnkuZmluZChcIi5wcF9hcnJvd19uZXh0LC5wcF9hcnJvd19wcmV2aW91c1wiKS5oaWRlKCl9ZWxzZXskcHBfZ2FsbGVyeS5maW5kKFwiLnBwX2Fycm93X25leHQsLnBwX2Fycm93X3ByZXZpb3VzXCIpLnNob3coKX1nYWxsZXJ5V2lkdGg9aXRlbXNQZXJQYWdlKml0ZW1XaWR0aDtmdWxsR2FsbGVyeVdpZHRoPXBwX2ltYWdlcy5sZW5ndGgqaXRlbVdpZHRoOyRwcF9nYWxsZXJ5LmNzcyhcIm1hcmdpbi1sZWZ0XCIsLShnYWxsZXJ5V2lkdGgvMituYXZXaWR0aC8yKSkuZmluZChcImRpdjpmaXJzdFwiKS53aWR0aChnYWxsZXJ5V2lkdGgrNSkuZmluZChcInVsXCIpLndpZHRoKGZ1bGxHYWxsZXJ5V2lkdGgpLmZpbmQoXCJsaS5zZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO2dvVG9QYWdlPU1hdGguZmxvb3Ioc2V0X3Bvc2l0aW9uL2l0ZW1zUGVyUGFnZSk8dG90YWxQYWdlP01hdGguZmxvb3Ioc2V0X3Bvc2l0aW9uL2l0ZW1zUGVyUGFnZSk6dG90YWxQYWdlO2UucHJldHR5UGhvdG8uY2hhbmdlR2FsbGVyeVBhZ2UoZ29Ub1BhZ2UpOyRwcF9nYWxsZXJ5X2xpLmZpbHRlcihcIjplcShcIitzZXRfcG9zaXRpb24rXCIpXCIpLmFkZENsYXNzKFwic2VsZWN0ZWRcIil9ZWxzZXskcHBfcGljX2hvbGRlci5maW5kKFwiLnBwX2NvbnRlbnRcIikudW5iaW5kKFwibW91c2VlbnRlciBtb3VzZWxlYXZlXCIpfX1mdW5jdGlvbiBrKHQpe2lmKHNldHRpbmdzLnNvY2lhbF90b29scylmYWNlYm9va19saWtlX2xpbms9c2V0dGluZ3Muc29jaWFsX3Rvb2xzLnJlcGxhY2UoXCJ7bG9jYXRpb25faHJlZn1cIixlbmNvZGVVUklDb21wb25lbnQobG9jYXRpb24uaHJlZikpO3NldHRpbmdzLm1hcmt1cD1zZXR0aW5ncy5tYXJrdXAucmVwbGFjZShcIntwcF9zb2NpYWx9XCIsXCJcIik7ZShcImJvZHlcIikuYXBwZW5kKHNldHRpbmdzLm1hcmt1cCk7JHBwX3BpY19ob2xkZXI9ZShcIi5wcF9waWNfaG9sZGVyXCIpLCRwcHQ9ZShcIi5wcHRcIiksJHBwX292ZXJsYXk9ZShcImRpdi5wcF9vdmVybGF5XCIpO2lmKGlzU2V0JiZzZXR0aW5ncy5vdmVybGF5X2dhbGxlcnkpe2N1cnJlbnRHYWxsZXJ5UGFnZT0wO3RvSW5qZWN0PVwiXCI7Zm9yKHZhciBuPTA7bjxwcF9pbWFnZXMubGVuZ3RoO24rKyl7aWYoIXBwX2ltYWdlc1tuXS5tYXRjaCgvXFxiKGpwZ3xqcGVnfHBuZ3xnaWYpXFxiL2dpKSl7Y2xhc3NuYW1lPVwiZGVmYXVsdFwiO2ltZ19zcmM9XCJcIn1lbHNle2NsYXNzbmFtZT1cIlwiO2ltZ19zcmM9cHBfaW1hZ2VzW25dfXRvSW5qZWN0Kz1cIjxsaSBjbGFzcz0nXCIrY2xhc3NuYW1lK1wiJz48YSBocmVmPScjJz48aW1nIHNyYz0nXCIraW1nX3NyYytcIicgd2lkdGg9JzUwJyBhbHQ9JycgLz48L2E+PC9saT5cIn10b0luamVjdD1zZXR0aW5ncy5nYWxsZXJ5X21hcmt1cC5yZXBsYWNlKC97Z2FsbGVyeX0vZyx0b0luamVjdCk7JHBwX3BpY19ob2xkZXIuZmluZChcIiNwcF9mdWxsX3Jlc1wiKS5hZnRlcih0b0luamVjdCk7JHBwX2dhbGxlcnk9ZShcIi5wcF9waWNfaG9sZGVyIC5wcF9nYWxsZXJ5XCIpLCRwcF9nYWxsZXJ5X2xpPSRwcF9nYWxsZXJ5LmZpbmQoXCJsaVwiKTskcHBfZ2FsbGVyeS5maW5kKFwiLnBwX2Fycm93X25leHRcIikuY2xpY2soZnVuY3Rpb24oKXtlLnByZXR0eVBob3RvLmNoYW5nZUdhbGxlcnlQYWdlKFwibmV4dFwiKTtlLnByZXR0eVBob3RvLnN0b3BTbGlkZXNob3coKTtyZXR1cm4gZmFsc2V9KTskcHBfZ2FsbGVyeS5maW5kKFwiLnBwX2Fycm93X3ByZXZpb3VzXCIpLmNsaWNrKGZ1bmN0aW9uKCl7ZS5wcmV0dHlQaG90by5jaGFuZ2VHYWxsZXJ5UGFnZShcInByZXZpb3VzXCIpO2UucHJldHR5UGhvdG8uc3RvcFNsaWRlc2hvdygpO3JldHVybiBmYWxzZX0pOyRwcF9waWNfaG9sZGVyLmZpbmQoXCIucHBfY29udGVudFwiKS5ob3ZlcihmdW5jdGlvbigpeyRwcF9waWNfaG9sZGVyLmZpbmQoXCIucHBfZ2FsbGVyeTpub3QoLmRpc2FibGVkKVwiKS5mYWRlSW4oKX0sZnVuY3Rpb24oKXskcHBfcGljX2hvbGRlci5maW5kKFwiLnBwX2dhbGxlcnk6bm90KC5kaXNhYmxlZClcIikuZmFkZU91dCgpfSk7aXRlbVdpZHRoPTUyKzU7JHBwX2dhbGxlcnlfbGkuZWFjaChmdW5jdGlvbih0KXtlKHRoaXMpLmZpbmQoXCJhXCIpLmNsaWNrKGZ1bmN0aW9uKCl7ZS5wcmV0dHlQaG90by5jaGFuZ2VQYWdlKHQpO2UucHJldHR5UGhvdG8uc3RvcFNsaWRlc2hvdygpO3JldHVybiBmYWxzZX0pfSl9aWYoc2V0dGluZ3Muc2xpZGVzaG93KXskcHBfcGljX2hvbGRlci5maW5kKFwiLnBwX25hdlwiKS5wcmVwZW5kKCc8YSBocmVmPVwiI1wiIGNsYXNzPVwicHBfcGxheVwiPlBsYXk8L2E+Jyk7JHBwX3BpY19ob2xkZXIuZmluZChcIi5wcF9uYXYgLnBwX3BsYXlcIikuY2xpY2soZnVuY3Rpb24oKXtlLnByZXR0eVBob3RvLnN0YXJ0U2xpZGVzaG93KCk7cmV0dXJuIGZhbHNlfSl9JHBwX3BpY19ob2xkZXIuYXR0cihcImNsYXNzXCIsXCJwcF9waWNfaG9sZGVyIFwiK3NldHRpbmdzLnRoZW1lKTskcHBfb3ZlcmxheS5jc3Moe29wYWNpdHk6MCxoZWlnaHQ6ZShkb2N1bWVudCkuaGVpZ2h0KCksd2lkdGg6ZSh3aW5kb3cpLndpZHRoKCl9KS5iaW5kKFwiY2xpY2tcIixmdW5jdGlvbigpe2lmKCFzZXR0aW5ncy5tb2RhbCllLnByZXR0eVBob3RvLmNsb3NlKCl9KTtlKFwiYS5wcF9jbG9zZVwiKS5iaW5kKFwiY2xpY2tcIixmdW5jdGlvbigpe2UucHJldHR5UGhvdG8uY2xvc2UoKTtyZXR1cm4gZmFsc2V9KTtpZihzZXR0aW5ncy5hbGxvd19leHBhbmQpe2UoXCJhLnBwX2V4cGFuZFwiKS5iaW5kKFwiY2xpY2tcIixmdW5jdGlvbih0KXtpZihlKHRoaXMpLmhhc0NsYXNzKFwicHBfZXhwYW5kXCIpKXtlKHRoaXMpLnJlbW92ZUNsYXNzKFwicHBfZXhwYW5kXCIpLmFkZENsYXNzKFwicHBfY29udHJhY3RcIik7ZG9yZXNpemU9ZmFsc2V9ZWxzZXtlKHRoaXMpLnJlbW92ZUNsYXNzKFwicHBfY29udHJhY3RcIikuYWRkQ2xhc3MoXCJwcF9leHBhbmRcIik7ZG9yZXNpemU9dHJ1ZX15KGZ1bmN0aW9uKCl7ZS5wcmV0dHlQaG90by5vcGVuKCl9KTtyZXR1cm4gZmFsc2V9KX0kcHBfcGljX2hvbGRlci5maW5kKFwiLnBwX3ByZXZpb3VzLCAucHBfbmF2IC5wcF9hcnJvd19wcmV2aW91c1wiKS5iaW5kKFwiY2xpY2tcIixmdW5jdGlvbigpe2UucHJldHR5UGhvdG8uY2hhbmdlUGFnZShcInByZXZpb3VzXCIpO2UucHJldHR5UGhvdG8uc3RvcFNsaWRlc2hvdygpO3JldHVybiBmYWxzZX0pOyRwcF9waWNfaG9sZGVyLmZpbmQoXCIucHBfbmV4dCwgLnBwX25hdiAucHBfYXJyb3dfbmV4dFwiKS5iaW5kKFwiY2xpY2tcIixmdW5jdGlvbigpe2UucHJldHR5UGhvdG8uY2hhbmdlUGFnZShcIm5leHRcIik7ZS5wcmV0dHlQaG90by5zdG9wU2xpZGVzaG93KCk7cmV0dXJuIGZhbHNlfSk7eCgpfXM9alF1ZXJ5LmV4dGVuZCh7aG9vazpcInJlbFwiLGFuaW1hdGlvbl9zcGVlZDpcImZhc3RcIixhamF4Y2FsbGJhY2s6ZnVuY3Rpb24oKXt9LHNsaWRlc2hvdzo1ZTMsYXV0b3BsYXlfc2xpZGVzaG93OmZhbHNlLG9wYWNpdHk6Ljgsc2hvd190aXRsZTp0cnVlLGFsbG93X3Jlc2l6ZTp0cnVlLGFsbG93X2V4cGFuZDp0cnVlLGRlZmF1bHRfd2lkdGg6NTAwLGRlZmF1bHRfaGVpZ2h0OjM0NCxjb3VudGVyX3NlcGFyYXRvcl9sYWJlbDpcIi9cIix0aGVtZTpcInBwX2RlZmF1bHRcIixob3Jpem9udGFsX3BhZGRpbmc6MjAsaGlkZWZsYXNoOmZhbHNlLHdtb2RlOlwib3BhcXVlXCIsYXV0b3BsYXk6dHJ1ZSxtb2RhbDpmYWxzZSxkZWVwbGlua2luZzp0cnVlLG92ZXJsYXlfZ2FsbGVyeTp0cnVlLG92ZXJsYXlfZ2FsbGVyeV9tYXg6MzAsa2V5Ym9hcmRfc2hvcnRjdXRzOnRydWUsY2hhbmdlcGljdHVyZWNhbGxiYWNrOmZ1bmN0aW9uKCl7fSxjYWxsYmFjazpmdW5jdGlvbigpe30saWU2X2ZhbGxiYWNrOnRydWUsbWFya3VwOic8ZGl2IGNsYXNzPVwicHBfcGljX2hvbGRlclwiPiBcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHB0XCI+wqA8L2Rpdj4gXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBwX3RvcFwiPiBcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwcF9sZWZ0XCI+PC9kaXY+IFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBwX21pZGRsZVwiPjwvZGl2PiBcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwcF9yaWdodFwiPjwvZGl2PiBcdFx0XHRcdFx0XHQ8L2Rpdj4gXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBwX2NvbnRlbnRfY29udGFpbmVyXCI+IFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBwX2xlZnRcIj4gXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHBfcmlnaHRcIj4gXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwcF9jb250ZW50XCI+IFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwcF9sb2FkZXJJY29uXCI+PC9kaXY+IFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwcF9mYWRlXCI+IFx0XHRcdFx0XHRcdFx0XHRcdFx0PGEgaHJlZj1cIiNcIiBjbGFzcz1cInBwX2V4cGFuZFwiIHRpdGxlPVwiRXhwYW5kIHRoZSBpbWFnZVwiPkV4cGFuZDwvYT4gXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHBfaG92ZXJDb250YWluZXJcIj4gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxhIGNsYXNzPVwicHBfbmV4dFwiIGhyZWY9XCIjXCI+bmV4dDwvYT4gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxhIGNsYXNzPVwicHBfcHJldmlvdXNcIiBocmVmPVwiI1wiPnByZXZpb3VzPC9hPiBcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PiBcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgaWQ9XCJwcF9mdWxsX3Jlc1wiPjwvZGl2PiBcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwcF9kZXRhaWxzXCI+IFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHBfbmF2XCI+IFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJwcF9hcnJvd19wcmV2aW91c1wiPlByZXZpb3VzPC9hPiBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8cCBjbGFzcz1cImN1cnJlbnRUZXh0SG9sZGVyXCI+MC8wPC9wPiBcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8YSBocmVmPVwiI1wiIGNsYXNzPVwicHBfYXJyb3dfbmV4dFwiPk5leHQ8L2E+IFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj4gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzPVwicHBfZGVzY3JpcHRpb25cIj48L3A+IFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHBfc29jaWFsXCI+e3BwX3NvY2lhbH08L2Rpdj4gXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxhIGNsYXNzPVwicHBfY2xvc2VcIiBocmVmPVwiI1wiPkNsb3NlPC9hPiBcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PiBcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj4gXHRcdFx0XHRcdFx0XHRcdDwvZGl2PiBcdFx0XHRcdFx0XHRcdDwvZGl2PiBcdFx0XHRcdFx0XHRcdDwvZGl2PiBcdFx0XHRcdFx0XHQ8L2Rpdj4gXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBwX2JvdHRvbVwiPiBcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwcF9sZWZ0XCI+PC9kaXY+IFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBwX21pZGRsZVwiPjwvZGl2PiBcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJwcF9yaWdodFwiPjwvZGl2PiBcdFx0XHRcdFx0XHQ8L2Rpdj4gXHRcdFx0XHRcdDwvZGl2PiBcdFx0XHRcdFx0PGRpdiBjbGFzcz1cInBwX292ZXJsYXlcIj48L2Rpdj4nLGdhbGxlcnlfbWFya3VwOic8ZGl2IGNsYXNzPVwicHBfZ2FsbGVyeVwiPiBcdFx0XHRcdFx0XHRcdFx0PGEgaHJlZj1cIiNcIiBjbGFzcz1cInBwX2Fycm93X3ByZXZpb3VzXCI+UHJldmlvdXM8L2E+IFx0XHRcdFx0XHRcdFx0XHQ8ZGl2PiBcdFx0XHRcdFx0XHRcdFx0XHQ8dWw+IFx0XHRcdFx0XHRcdFx0XHRcdFx0e2dhbGxlcnl9IFx0XHRcdFx0XHRcdFx0XHRcdDwvdWw+IFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj4gXHRcdFx0XHRcdFx0XHRcdDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJwcF9hcnJvd19uZXh0XCI+TmV4dDwvYT4gXHRcdFx0XHRcdFx0XHQ8L2Rpdj4nLGltYWdlX21hcmt1cDonPGltZyBpZD1cImZ1bGxSZXNJbWFnZVwiIHNyYz1cIntwYXRofVwiIC8+JyxmbGFzaF9tYXJrdXA6JzxvYmplY3QgY2xhc3NpZD1cImNsc2lkOkQyN0NEQjZFLUFFNkQtMTFjZi05NkI4LTQ0NDU1MzU0MDAwMFwiIHdpZHRoPVwie3dpZHRofVwiIGhlaWdodD1cIntoZWlnaHR9XCI+PHBhcmFtIG5hbWU9XCJ3bW9kZVwiIHZhbHVlPVwie3dtb2RlfVwiIC8+PHBhcmFtIG5hbWU9XCJhbGxvd2Z1bGxzY3JlZW5cIiB2YWx1ZT1cInRydWVcIiAvPjxwYXJhbSBuYW1lPVwiYWxsb3dzY3JpcHRhY2Nlc3NcIiB2YWx1ZT1cImFsd2F5c1wiIC8+PHBhcmFtIG5hbWU9XCJtb3ZpZVwiIHZhbHVlPVwie3BhdGh9XCIgLz48ZW1iZWQgc3JjPVwie3BhdGh9XCIgdHlwZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCIgYWxsb3dmdWxsc2NyZWVuPVwidHJ1ZVwiIGFsbG93c2NyaXB0YWNjZXNzPVwiYWx3YXlzXCIgd2lkdGg9XCJ7d2lkdGh9XCIgaGVpZ2h0PVwie2hlaWdodH1cIiB3bW9kZT1cInt3bW9kZX1cIj48L2VtYmVkPjwvb2JqZWN0PicscXVpY2t0aW1lX21hcmt1cDonPG9iamVjdCBjbGFzc2lkPVwiY2xzaWQ6MDJCRjI1RDUtOEMxNy00QjIzLUJDODAtRDM0ODhBQkREQzZCXCIgY29kZWJhc2U9XCJodHRwOi8vd3d3LmFwcGxlLmNvbS9xdGFjdGl2ZXgvcXRwbHVnaW4uY2FiXCIgaGVpZ2h0PVwie2hlaWdodH1cIiB3aWR0aD1cInt3aWR0aH1cIj48cGFyYW0gbmFtZT1cInNyY1wiIHZhbHVlPVwie3BhdGh9XCI+PHBhcmFtIG5hbWU9XCJhdXRvcGxheVwiIHZhbHVlPVwie2F1dG9wbGF5fVwiPjxwYXJhbSBuYW1lPVwidHlwZVwiIHZhbHVlPVwidmlkZW8vcXVpY2t0aW1lXCI+PGVtYmVkIHNyYz1cIntwYXRofVwiIGhlaWdodD1cIntoZWlnaHR9XCIgd2lkdGg9XCJ7d2lkdGh9XCIgYXV0b3BsYXk9XCJ7YXV0b3BsYXl9XCIgdHlwZT1cInZpZGVvL3F1aWNrdGltZVwiIHBsdWdpbnNwYWdlPVwiaHR0cDovL3d3dy5hcHBsZS5jb20vcXVpY2t0aW1lL2Rvd25sb2FkL1wiPjwvZW1iZWQ+PC9vYmplY3Q+JyxpZnJhbWVfbWFya3VwOic8aWZyYW1lIHNyYyA9XCJ7cGF0aH1cIiB3aWR0aD1cInt3aWR0aH1cIiBoZWlnaHQ9XCJ7aGVpZ2h0fVwiIGZyYW1lYm9yZGVyPVwibm9cIj48L2lmcmFtZT4nLGlubGluZV9tYXJrdXA6JzxkaXYgY2xhc3M9XCJwcF9pbmxpbmVcIj57Y29udGVudH08L2Rpdj4nLGN1c3RvbV9tYXJrdXA6XCJcIixzb2NpYWxfdG9vbHM6JzxkaXYgY2xhc3M9XCJ0d2l0dGVyXCI+PGEgaHJlZj1cImh0dHA6Ly90d2l0dGVyLmNvbS9zaGFyZVwiIGNsYXNzPVwidHdpdHRlci1zaGFyZS1idXR0b25cIiBkYXRhLWNvdW50PVwibm9uZVwiPlR3ZWV0PC9hPjxzY3JpcHQgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiIHNyYz1cImh0dHA6Ly9wbGF0Zm9ybS50d2l0dGVyLmNvbS93aWRnZXRzLmpzXCI+PC9zY3JpcHQ+PC9kaXY+PGRpdiBjbGFzcz1cImZhY2Vib29rXCI+PGlmcmFtZSBzcmM9XCIvL3d3dy5mYWNlYm9vay5jb20vcGx1Z2lucy9saWtlLnBocD9sb2NhbGU9ZW5fVVMmaHJlZj17bG9jYXRpb25faHJlZn0mbGF5b3V0PWJ1dHRvbl9jb3VudCZzaG93X2ZhY2VzPXRydWUmd2lkdGg9NTAwJmFjdGlvbj1saWtlJmZvbnQmY29sb3JzY2hlbWU9bGlnaHQmaGVpZ2h0PTIzXCIgc2Nyb2xsaW5nPVwibm9cIiBmcmFtZWJvcmRlcj1cIjBcIiBzdHlsZT1cImJvcmRlcjpub25lOyBvdmVyZmxvdzpoaWRkZW47IHdpZHRoOjUwMHB4OyBoZWlnaHQ6MjNweDtcIiBhbGxvd1RyYW5zcGFyZW5jeT1cInRydWVcIj48L2lmcmFtZT48L2Rpdj4nfSxzKTt2YXIgbz10aGlzLHU9ZmFsc2UsYSxmLGwsYyxoLHAsZD1lKHdpbmRvdykuaGVpZ2h0KCksdj1lKHdpbmRvdykud2lkdGgoKSxtO2RvcmVzaXplPXRydWUsc2Nyb2xsX3Bvcz1UKCk7ZSh3aW5kb3cpLnVuYmluZChcInJlc2l6ZS5wcmV0dHlwaG90b1wiKS5iaW5kKFwicmVzaXplLnByZXR0eXBob3RvXCIsZnVuY3Rpb24oKXt4KCk7TigpfSk7aWYocy5rZXlib2FyZF9zaG9ydGN1dHMpe2UoZG9jdW1lbnQpLnVuYmluZChcImtleWRvd24ucHJldHR5cGhvdG9cIikuYmluZChcImtleWRvd24ucHJldHR5cGhvdG9cIixmdW5jdGlvbih0KXtpZih0eXBlb2YgJHBwX3BpY19ob2xkZXIhPVwidW5kZWZpbmVkXCIpe2lmKCRwcF9waWNfaG9sZGVyLmlzKFwiOnZpc2libGVcIikpe3N3aXRjaCh0LmtleUNvZGUpe2Nhc2UgMzc6ZS5wcmV0dHlQaG90by5jaGFuZ2VQYWdlKFwicHJldmlvdXNcIik7dC5wcmV2ZW50RGVmYXVsdCgpO2JyZWFrO2Nhc2UgMzk6ZS5wcmV0dHlQaG90by5jaGFuZ2VQYWdlKFwibmV4dFwiKTt0LnByZXZlbnREZWZhdWx0KCk7YnJlYWs7Y2FzZSAyNzppZighc2V0dGluZ3MubW9kYWwpZS5wcmV0dHlQaG90by5jbG9zZSgpO3QucHJldmVudERlZmF1bHQoKTticmVha319fX0pfWUucHJldHR5UGhvdG8uaW5pdGlhbGl6ZT1mdW5jdGlvbigpe3NldHRpbmdzPXM7aWYoc2V0dGluZ3MudGhlbWU9PVwicHBfZGVmYXVsdFwiKXNldHRpbmdzLmhvcml6b250YWxfcGFkZGluZz0xNjt0aGVSZWw9ZSh0aGlzKS5hdHRyKHNldHRpbmdzLmhvb2spO2dhbGxlcnlSZWdFeHA9L1xcWyg/Oi4qKVxcXS87aXNTZXQ9Z2FsbGVyeVJlZ0V4cC5leGVjKHRoZVJlbCk/dHJ1ZTpmYWxzZTtwcF9pbWFnZXM9aXNTZXQ/alF1ZXJ5Lm1hcChvLGZ1bmN0aW9uKHQsbil7aWYoZSh0KS5hdHRyKHNldHRpbmdzLmhvb2spLmluZGV4T2YodGhlUmVsKSE9LTEpcmV0dXJuIGUodCkuYXR0cihcImhyZWZcIil9KTplLm1ha2VBcnJheShlKHRoaXMpLmF0dHIoXCJocmVmXCIpKTtwcF90aXRsZXM9aXNTZXQ/alF1ZXJ5Lm1hcChvLGZ1bmN0aW9uKHQsbil7aWYoZSh0KS5hdHRyKHNldHRpbmdzLmhvb2spLmluZGV4T2YodGhlUmVsKSE9LTEpcmV0dXJuIGUodCkuZmluZChcImltZ1wiKS5hdHRyKFwiYWx0XCIpP2UodCkuZmluZChcImltZ1wiKS5hdHRyKFwiYWx0XCIpOlwiXCJ9KTplLm1ha2VBcnJheShlKHRoaXMpLmZpbmQoXCJpbWdcIikuYXR0cihcImFsdFwiKSk7cHBfZGVzY3JpcHRpb25zPWlzU2V0P2pRdWVyeS5tYXAobyxmdW5jdGlvbih0LG4pe2lmKGUodCkuYXR0cihzZXR0aW5ncy5ob29rKS5pbmRleE9mKHRoZVJlbCkhPS0xKXJldHVybiBlKHQpLmF0dHIoXCJ0aXRsZVwiKT9lKHQpLmF0dHIoXCJ0aXRsZVwiKTpcIlwifSk6ZS5tYWtlQXJyYXkoZSh0aGlzKS5hdHRyKFwidGl0bGVcIikpO2lmKHBwX2ltYWdlcy5sZW5ndGg+c2V0dGluZ3Mub3ZlcmxheV9nYWxsZXJ5X21heClzZXR0aW5ncy5vdmVybGF5X2dhbGxlcnk9ZmFsc2U7c2V0X3Bvc2l0aW9uPWpRdWVyeS5pbkFycmF5KGUodGhpcykuYXR0cihcImhyZWZcIikscHBfaW1hZ2VzKTtyZWxfaW5kZXg9aXNTZXQ/c2V0X3Bvc2l0aW9uOmUoXCJhW1wiK3NldHRpbmdzLmhvb2srXCJePSdcIit0aGVSZWwrXCInXVwiKS5pbmRleChlKHRoaXMpKTtrKHRoaXMpO2lmKHNldHRpbmdzLmFsbG93X3Jlc2l6ZSllKHdpbmRvdykuYmluZChcInNjcm9sbC5wcmV0dHlwaG90b1wiLGZ1bmN0aW9uKCl7eCgpfSk7ZS5wcmV0dHlQaG90by5vcGVuKCk7cmV0dXJuIGZhbHNlfTtlLnByZXR0eVBob3RvLm9wZW49ZnVuY3Rpb24odCl7aWYodHlwZW9mIHNldHRpbmdzPT1cInVuZGVmaW5lZFwiKXtzZXR0aW5ncz1zO3BwX2ltYWdlcz1lLm1ha2VBcnJheShhcmd1bWVudHNbMF0pO3BwX3RpdGxlcz1hcmd1bWVudHNbMV0/ZS5tYWtlQXJyYXkoYXJndW1lbnRzWzFdKTplLm1ha2VBcnJheShcIlwiKTtwcF9kZXNjcmlwdGlvbnM9YXJndW1lbnRzWzJdP2UubWFrZUFycmF5KGFyZ3VtZW50c1syXSk6ZS5tYWtlQXJyYXkoXCJcIik7aXNTZXQ9cHBfaW1hZ2VzLmxlbmd0aD4xP3RydWU6ZmFsc2U7c2V0X3Bvc2l0aW9uPWFyZ3VtZW50c1szXT9hcmd1bWVudHNbM106MDtrKHQudGFyZ2V0KX1pZihzZXR0aW5ncy5oaWRlZmxhc2gpZShcIm9iamVjdCxlbWJlZCxpZnJhbWVbc3JjKj15b3V0dWJlXSxpZnJhbWVbc3JjKj12aW1lb11cIikuY3NzKFwidmlzaWJpbGl0eVwiLFwiaGlkZGVuXCIpO2IoZShwcF9pbWFnZXMpLnNpemUoKSk7ZShcIi5wcF9sb2FkZXJJY29uXCIpLnNob3coKTtpZihzZXR0aW5ncy5kZWVwbGlua2luZyluKCk7aWYoc2V0dGluZ3Muc29jaWFsX3Rvb2xzKXtmYWNlYm9va19saWtlX2xpbms9c2V0dGluZ3Muc29jaWFsX3Rvb2xzLnJlcGxhY2UoXCJ7bG9jYXRpb25faHJlZn1cIixlbmNvZGVVUklDb21wb25lbnQobG9jYXRpb24uaHJlZikpOyRwcF9waWNfaG9sZGVyLmZpbmQoXCIucHBfc29jaWFsXCIpLmh0bWwoZmFjZWJvb2tfbGlrZV9saW5rKX1pZigkcHB0LmlzKFwiOmhpZGRlblwiKSkkcHB0LmNzcyhcIm9wYWNpdHlcIiwwKS5zaG93KCk7JHBwX292ZXJsYXkuc2hvdygpLmZhZGVUbyhzZXR0aW5ncy5hbmltYXRpb25fc3BlZWQsc2V0dGluZ3Mub3BhY2l0eSk7JHBwX3BpY19ob2xkZXIuZmluZChcIi5jdXJyZW50VGV4dEhvbGRlclwiKS50ZXh0KHNldF9wb3NpdGlvbisxK3NldHRpbmdzLmNvdW50ZXJfc2VwYXJhdG9yX2xhYmVsK2UocHBfaW1hZ2VzKS5zaXplKCkpO2lmKHR5cGVvZiBwcF9kZXNjcmlwdGlvbnNbc2V0X3Bvc2l0aW9uXSE9XCJ1bmRlZmluZWRcIiYmcHBfZGVzY3JpcHRpb25zW3NldF9wb3NpdGlvbl0hPVwiXCIpeyRwcF9waWNfaG9sZGVyLmZpbmQoXCIucHBfZGVzY3JpcHRpb25cIikuc2hvdygpLmh0bWwodW5lc2NhcGUocHBfZGVzY3JpcHRpb25zW3NldF9wb3NpdGlvbl0pKX1lbHNleyRwcF9waWNfaG9sZGVyLmZpbmQoXCIucHBfZGVzY3JpcHRpb25cIikuaGlkZSgpfW1vdmllX3dpZHRoPXBhcnNlRmxvYXQoaShcIndpZHRoXCIscHBfaW1hZ2VzW3NldF9wb3NpdGlvbl0pKT9pKFwid2lkdGhcIixwcF9pbWFnZXNbc2V0X3Bvc2l0aW9uXSk6c2V0dGluZ3MuZGVmYXVsdF93aWR0aC50b1N0cmluZygpO21vdmllX2hlaWdodD1wYXJzZUZsb2F0KGkoXCJoZWlnaHRcIixwcF9pbWFnZXNbc2V0X3Bvc2l0aW9uXSkpP2koXCJoZWlnaHRcIixwcF9pbWFnZXNbc2V0X3Bvc2l0aW9uXSk6c2V0dGluZ3MuZGVmYXVsdF9oZWlnaHQudG9TdHJpbmcoKTt1PWZhbHNlO2lmKG1vdmllX2hlaWdodC5pbmRleE9mKFwiJVwiKSE9LTEpe21vdmllX2hlaWdodD1wYXJzZUZsb2F0KGUod2luZG93KS5oZWlnaHQoKSpwYXJzZUZsb2F0KG1vdmllX2hlaWdodCkvMTAwLTE1MCk7dT10cnVlfWlmKG1vdmllX3dpZHRoLmluZGV4T2YoXCIlXCIpIT0tMSl7bW92aWVfd2lkdGg9cGFyc2VGbG9hdChlKHdpbmRvdykud2lkdGgoKSpwYXJzZUZsb2F0KG1vdmllX3dpZHRoKS8xMDAtMTUwKTt1PXRydWV9JHBwX3BpY19ob2xkZXIuZmFkZUluKGZ1bmN0aW9uKCl7c2V0dGluZ3Muc2hvd190aXRsZSYmcHBfdGl0bGVzW3NldF9wb3NpdGlvbl0hPVwiXCImJnR5cGVvZiBwcF90aXRsZXNbc2V0X3Bvc2l0aW9uXSE9XCJ1bmRlZmluZWRcIj8kcHB0Lmh0bWwodW5lc2NhcGUocHBfdGl0bGVzW3NldF9wb3NpdGlvbl0pKTokcHB0Lmh0bWwoXCLCoFwiKTtpbWdQcmVsb2FkZXI9XCJcIjtza2lwSW5qZWN0aW9uPWZhbHNlO3N3aXRjaChTKHBwX2ltYWdlc1tzZXRfcG9zaXRpb25dKSl7Y2FzZVwiaW1hZ2VcIjppbWdQcmVsb2FkZXI9bmV3IEltYWdlO25leHRJbWFnZT1uZXcgSW1hZ2U7aWYoaXNTZXQmJnNldF9wb3NpdGlvbjxlKHBwX2ltYWdlcykuc2l6ZSgpLTEpbmV4dEltYWdlLnNyYz1wcF9pbWFnZXNbc2V0X3Bvc2l0aW9uKzFdO3ByZXZJbWFnZT1uZXcgSW1hZ2U7aWYoaXNTZXQmJnBwX2ltYWdlc1tzZXRfcG9zaXRpb24tMV0pcHJldkltYWdlLnNyYz1wcF9pbWFnZXNbc2V0X3Bvc2l0aW9uLTFdOyRwcF9waWNfaG9sZGVyLmZpbmQoXCIjcHBfZnVsbF9yZXNcIilbMF0uaW5uZXJIVE1MPXNldHRpbmdzLmltYWdlX21hcmt1cC5yZXBsYWNlKC97cGF0aH0vZyxwcF9pbWFnZXNbc2V0X3Bvc2l0aW9uXSk7aW1nUHJlbG9hZGVyLm9ubG9hZD1mdW5jdGlvbigpe2E9dyhpbWdQcmVsb2FkZXIud2lkdGgsaW1nUHJlbG9hZGVyLmhlaWdodCk7ZygpfTtpbWdQcmVsb2FkZXIub25lcnJvcj1mdW5jdGlvbigpe2FsZXJ0KFwiSW1hZ2UgY2Fubm90IGJlIGxvYWRlZC4gTWFrZSBzdXJlIHRoZSBwYXRoIGlzIGNvcnJlY3QgYW5kIGltYWdlIGV4aXN0LlwiKTtlLnByZXR0eVBob3RvLmNsb3NlKCl9O2ltZ1ByZWxvYWRlci5zcmM9cHBfaW1hZ2VzW3NldF9wb3NpdGlvbl07YnJlYWs7Y2FzZVwieW91dHViZVwiOmE9dyhtb3ZpZV93aWR0aCxtb3ZpZV9oZWlnaHQpO21vdmllX2lkPWkoXCJ2XCIscHBfaW1hZ2VzW3NldF9wb3NpdGlvbl0pO2lmKG1vdmllX2lkPT1cIlwiKXttb3ZpZV9pZD1wcF9pbWFnZXNbc2V0X3Bvc2l0aW9uXS5zcGxpdChcInlvdXR1LmJlL1wiKTttb3ZpZV9pZD1tb3ZpZV9pZFsxXTtpZihtb3ZpZV9pZC5pbmRleE9mKFwiP1wiKT4wKW1vdmllX2lkPW1vdmllX2lkLnN1YnN0cigwLG1vdmllX2lkLmluZGV4T2YoXCI/XCIpKTtpZihtb3ZpZV9pZC5pbmRleE9mKFwiJlwiKT4wKW1vdmllX2lkPW1vdmllX2lkLnN1YnN0cigwLG1vdmllX2lkLmluZGV4T2YoXCImXCIpKX1tb3ZpZT1cImh0dHA6Ly93d3cueW91dHViZS5jb20vZW1iZWQvXCIrbW92aWVfaWQ7aShcInJlbFwiLHBwX2ltYWdlc1tzZXRfcG9zaXRpb25dKT9tb3ZpZSs9XCI/cmVsPVwiK2koXCJyZWxcIixwcF9pbWFnZXNbc2V0X3Bvc2l0aW9uXSk6bW92aWUrPVwiP3JlbD0xXCI7aWYoc2V0dGluZ3MuYXV0b3BsYXkpbW92aWUrPVwiJmF1dG9wbGF5PTFcIjt0b0luamVjdD1zZXR0aW5ncy5pZnJhbWVfbWFya3VwLnJlcGxhY2UoL3t3aWR0aH0vZyxhW1wid2lkdGhcIl0pLnJlcGxhY2UoL3toZWlnaHR9L2csYVtcImhlaWdodFwiXSkucmVwbGFjZSgve3dtb2RlfS9nLHNldHRpbmdzLndtb2RlKS5yZXBsYWNlKC97cGF0aH0vZyxtb3ZpZSk7YnJlYWs7Y2FzZVwidmltZW9cIjphPXcobW92aWVfd2lkdGgsbW92aWVfaGVpZ2h0KTttb3ZpZV9pZD1wcF9pbWFnZXNbc2V0X3Bvc2l0aW9uXTt2YXIgdD0vaHR0cChzPyk6XFwvXFwvKHd3d1xcLik/dmltZW8uY29tXFwvKFxcZCspLzt2YXIgbj1tb3ZpZV9pZC5tYXRjaCh0KTttb3ZpZT1cImh0dHA6Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvL1wiK25bM10rXCI/dGl0bGU9MCZieWxpbmU9MCZwb3J0cmFpdD0wXCI7aWYoc2V0dGluZ3MuYXV0b3BsYXkpbW92aWUrPVwiJmF1dG9wbGF5PTE7XCI7dmltZW9fd2lkdGg9YVtcIndpZHRoXCJdK1wiL2VtYmVkLz9tb29nX3dpZHRoPVwiK2FbXCJ3aWR0aFwiXTt0b0luamVjdD1zZXR0aW5ncy5pZnJhbWVfbWFya3VwLnJlcGxhY2UoL3t3aWR0aH0vZyx2aW1lb193aWR0aCkucmVwbGFjZSgve2hlaWdodH0vZyxhW1wiaGVpZ2h0XCJdKS5yZXBsYWNlKC97cGF0aH0vZyxtb3ZpZSk7YnJlYWs7Y2FzZVwicXVpY2t0aW1lXCI6YT13KG1vdmllX3dpZHRoLG1vdmllX2hlaWdodCk7YVtcImhlaWdodFwiXSs9MTU7YVtcImNvbnRlbnRIZWlnaHRcIl0rPTE1O2FbXCJjb250YWluZXJIZWlnaHRcIl0rPTE1O3RvSW5qZWN0PXNldHRpbmdzLnF1aWNrdGltZV9tYXJrdXAucmVwbGFjZSgve3dpZHRofS9nLGFbXCJ3aWR0aFwiXSkucmVwbGFjZSgve2hlaWdodH0vZyxhW1wiaGVpZ2h0XCJdKS5yZXBsYWNlKC97d21vZGV9L2csc2V0dGluZ3Mud21vZGUpLnJlcGxhY2UoL3twYXRofS9nLHBwX2ltYWdlc1tzZXRfcG9zaXRpb25dKS5yZXBsYWNlKC97YXV0b3BsYXl9L2csc2V0dGluZ3MuYXV0b3BsYXkpO2JyZWFrO2Nhc2VcImZsYXNoXCI6YT13KG1vdmllX3dpZHRoLG1vdmllX2hlaWdodCk7Zmxhc2hfdmFycz1wcF9pbWFnZXNbc2V0X3Bvc2l0aW9uXTtmbGFzaF92YXJzPWZsYXNoX3ZhcnMuc3Vic3RyaW5nKHBwX2ltYWdlc1tzZXRfcG9zaXRpb25dLmluZGV4T2YoXCJmbGFzaHZhcnNcIikrMTAscHBfaW1hZ2VzW3NldF9wb3NpdGlvbl0ubGVuZ3RoKTtmaWxlbmFtZT1wcF9pbWFnZXNbc2V0X3Bvc2l0aW9uXTtmaWxlbmFtZT1maWxlbmFtZS5zdWJzdHJpbmcoMCxmaWxlbmFtZS5pbmRleE9mKFwiP1wiKSk7dG9JbmplY3Q9c2V0dGluZ3MuZmxhc2hfbWFya3VwLnJlcGxhY2UoL3t3aWR0aH0vZyxhW1wid2lkdGhcIl0pLnJlcGxhY2UoL3toZWlnaHR9L2csYVtcImhlaWdodFwiXSkucmVwbGFjZSgve3dtb2RlfS9nLHNldHRpbmdzLndtb2RlKS5yZXBsYWNlKC97cGF0aH0vZyxmaWxlbmFtZStcIj9cIitmbGFzaF92YXJzKTticmVhaztjYXNlXCJpZnJhbWVcIjphPXcobW92aWVfd2lkdGgsbW92aWVfaGVpZ2h0KTtmcmFtZV91cmw9cHBfaW1hZ2VzW3NldF9wb3NpdGlvbl07ZnJhbWVfdXJsPWZyYW1lX3VybC5zdWJzdHIoMCxmcmFtZV91cmwuaW5kZXhPZihcImlmcmFtZVwiKS0xKTt0b0luamVjdD1zZXR0aW5ncy5pZnJhbWVfbWFya3VwLnJlcGxhY2UoL3t3aWR0aH0vZyxhW1wid2lkdGhcIl0pLnJlcGxhY2UoL3toZWlnaHR9L2csYVtcImhlaWdodFwiXSkucmVwbGFjZSgve3BhdGh9L2csZnJhbWVfdXJsKTticmVhaztjYXNlXCJhamF4XCI6ZG9yZXNpemU9ZmFsc2U7YT13KG1vdmllX3dpZHRoLG1vdmllX2hlaWdodCk7ZG9yZXNpemU9dHJ1ZTtza2lwSW5qZWN0aW9uPXRydWU7ZS5nZXQocHBfaW1hZ2VzW3NldF9wb3NpdGlvbl0sZnVuY3Rpb24oZSl7dG9JbmplY3Q9c2V0dGluZ3MuaW5saW5lX21hcmt1cC5yZXBsYWNlKC97Y29udGVudH0vZyxlKTskcHBfcGljX2hvbGRlci5maW5kKFwiI3BwX2Z1bGxfcmVzXCIpWzBdLmlubmVySFRNTD10b0luamVjdDtnKCl9KTticmVhaztjYXNlXCJjdXN0b21cIjphPXcobW92aWVfd2lkdGgsbW92aWVfaGVpZ2h0KTt0b0luamVjdD1zZXR0aW5ncy5jdXN0b21fbWFya3VwO2JyZWFrO2Nhc2VcImlubGluZVwiOm15Q2xvbmU9ZShwcF9pbWFnZXNbc2V0X3Bvc2l0aW9uXSkuY2xvbmUoKS5hcHBlbmQoJzxiciBjbGVhcj1cImFsbFwiIC8+JykuY3NzKHt3aWR0aDpzZXR0aW5ncy5kZWZhdWx0X3dpZHRofSkud3JhcElubmVyKCc8ZGl2IGlkPVwicHBfZnVsbF9yZXNcIj48ZGl2IGNsYXNzPVwicHBfaW5saW5lXCI+PC9kaXY+PC9kaXY+JykuYXBwZW5kVG8oZShcImJvZHlcIikpLnNob3coKTtkb3Jlc2l6ZT1mYWxzZTthPXcoZShteUNsb25lKS53aWR0aCgpLGUobXlDbG9uZSkuaGVpZ2h0KCkpO2RvcmVzaXplPXRydWU7ZShteUNsb25lKS5yZW1vdmUoKTt0b0luamVjdD1zZXR0aW5ncy5pbmxpbmVfbWFya3VwLnJlcGxhY2UoL3tjb250ZW50fS9nLGUocHBfaW1hZ2VzW3NldF9wb3NpdGlvbl0pLmh0bWwoKSk7YnJlYWt9aWYoIWltZ1ByZWxvYWRlciYmIXNraXBJbmplY3Rpb24peyRwcF9waWNfaG9sZGVyLmZpbmQoXCIjcHBfZnVsbF9yZXNcIilbMF0uaW5uZXJIVE1MPXRvSW5qZWN0O2coKX19KTtyZXR1cm4gZmFsc2V9O2UucHJldHR5UGhvdG8uY2hhbmdlUGFnZT1mdW5jdGlvbih0KXtjdXJyZW50R2FsbGVyeVBhZ2U9MDtpZih0PT1cInByZXZpb3VzXCIpe3NldF9wb3NpdGlvbi0tO2lmKHNldF9wb3NpdGlvbjwwKXNldF9wb3NpdGlvbj1lKHBwX2ltYWdlcykuc2l6ZSgpLTF9ZWxzZSBpZih0PT1cIm5leHRcIil7c2V0X3Bvc2l0aW9uKys7aWYoc2V0X3Bvc2l0aW9uPmUocHBfaW1hZ2VzKS5zaXplKCktMSlzZXRfcG9zaXRpb249MH1lbHNle3NldF9wb3NpdGlvbj10fXJlbF9pbmRleD1zZXRfcG9zaXRpb247aWYoIWRvcmVzaXplKWRvcmVzaXplPXRydWU7aWYoc2V0dGluZ3MuYWxsb3dfZXhwYW5kKXtlKFwiLnBwX2NvbnRyYWN0XCIpLnJlbW92ZUNsYXNzKFwicHBfY29udHJhY3RcIikuYWRkQ2xhc3MoXCJwcF9leHBhbmRcIil9eShmdW5jdGlvbigpe2UucHJldHR5UGhvdG8ub3BlbigpfSl9O2UucHJldHR5UGhvdG8uY2hhbmdlR2FsbGVyeVBhZ2U9ZnVuY3Rpb24oZSl7aWYoZT09XCJuZXh0XCIpe2N1cnJlbnRHYWxsZXJ5UGFnZSsrO2lmKGN1cnJlbnRHYWxsZXJ5UGFnZT50b3RhbFBhZ2UpY3VycmVudEdhbGxlcnlQYWdlPTB9ZWxzZSBpZihlPT1cInByZXZpb3VzXCIpe2N1cnJlbnRHYWxsZXJ5UGFnZS0tO2lmKGN1cnJlbnRHYWxsZXJ5UGFnZTwwKWN1cnJlbnRHYWxsZXJ5UGFnZT10b3RhbFBhZ2V9ZWxzZXtjdXJyZW50R2FsbGVyeVBhZ2U9ZX1zbGlkZV9zcGVlZD1lPT1cIm5leHRcInx8ZT09XCJwcmV2aW91c1wiP3NldHRpbmdzLmFuaW1hdGlvbl9zcGVlZDowO3NsaWRlX3RvPWN1cnJlbnRHYWxsZXJ5UGFnZSppdGVtc1BlclBhZ2UqaXRlbVdpZHRoOyRwcF9nYWxsZXJ5LmZpbmQoXCJ1bFwiKS5hbmltYXRlKHtsZWZ0Oi1zbGlkZV90b30sc2xpZGVfc3BlZWQpfTtlLnByZXR0eVBob3RvLnN0YXJ0U2xpZGVzaG93PWZ1bmN0aW9uKCl7aWYodHlwZW9mIG09PVwidW5kZWZpbmVkXCIpeyRwcF9waWNfaG9sZGVyLmZpbmQoXCIucHBfcGxheVwiKS51bmJpbmQoXCJjbGlja1wiKS5yZW1vdmVDbGFzcyhcInBwX3BsYXlcIikuYWRkQ2xhc3MoXCJwcF9wYXVzZVwiKS5jbGljayhmdW5jdGlvbigpe2UucHJldHR5UGhvdG8uc3RvcFNsaWRlc2hvdygpO3JldHVybiBmYWxzZX0pO209c2V0SW50ZXJ2YWwoZS5wcmV0dHlQaG90by5zdGFydFNsaWRlc2hvdyxzZXR0aW5ncy5zbGlkZXNob3cpfWVsc2V7ZS5wcmV0dHlQaG90by5jaGFuZ2VQYWdlKFwibmV4dFwiKX19O2UucHJldHR5UGhvdG8uc3RvcFNsaWRlc2hvdz1mdW5jdGlvbigpeyRwcF9waWNfaG9sZGVyLmZpbmQoXCIucHBfcGF1c2VcIikudW5iaW5kKFwiY2xpY2tcIikucmVtb3ZlQ2xhc3MoXCJwcF9wYXVzZVwiKS5hZGRDbGFzcyhcInBwX3BsYXlcIikuY2xpY2soZnVuY3Rpb24oKXtlLnByZXR0eVBob3RvLnN0YXJ0U2xpZGVzaG93KCk7cmV0dXJuIGZhbHNlfSk7Y2xlYXJJbnRlcnZhbChtKTttPXVuZGVmaW5lZH07ZS5wcmV0dHlQaG90by5jbG9zZT1mdW5jdGlvbigpe2lmKCRwcF9vdmVybGF5LmlzKFwiOmFuaW1hdGVkXCIpKXJldHVybjtlLnByZXR0eVBob3RvLnN0b3BTbGlkZXNob3coKTskcHBfcGljX2hvbGRlci5zdG9wKCkuZmluZChcIm9iamVjdCxlbWJlZFwiKS5jc3MoXCJ2aXNpYmlsaXR5XCIsXCJoaWRkZW5cIik7ZShcImRpdi5wcF9waWNfaG9sZGVyLGRpdi5wcHQsLnBwX2ZhZGVcIikuZmFkZU91dChzZXR0aW5ncy5hbmltYXRpb25fc3BlZWQsZnVuY3Rpb24oKXtlKHRoaXMpLnJlbW92ZSgpfSk7JHBwX292ZXJsYXkuZmFkZU91dChzZXR0aW5ncy5hbmltYXRpb25fc3BlZWQsZnVuY3Rpb24oKXtpZihzZXR0aW5ncy5oaWRlZmxhc2gpZShcIm9iamVjdCxlbWJlZCxpZnJhbWVbc3JjKj15b3V0dWJlXSxpZnJhbWVbc3JjKj12aW1lb11cIikuY3NzKFwidmlzaWJpbGl0eVwiLFwidmlzaWJsZVwiKTtlKHRoaXMpLnJlbW92ZSgpO2Uod2luZG93KS51bmJpbmQoXCJzY3JvbGwucHJldHR5cGhvdG9cIik7cigpO3NldHRpbmdzLmNhbGxiYWNrKCk7ZG9yZXNpemU9dHJ1ZTtmPWZhbHNlO2RlbGV0ZSBzZXR0aW5nc30pfTtpZighcHBfYWxyZWFkeUluaXRpYWxpemVkJiZ0KCkpe3BwX2FscmVhZHlJbml0aWFsaXplZD10cnVlO2hhc2hJbmRleD10KCk7aGFzaFJlbD1oYXNoSW5kZXg7aGFzaEluZGV4PWhhc2hJbmRleC5zdWJzdHJpbmcoaGFzaEluZGV4LmluZGV4T2YoXCIvXCIpKzEsaGFzaEluZGV4Lmxlbmd0aC0xKTtoYXNoUmVsPWhhc2hSZWwuc3Vic3RyaW5nKDAsaGFzaFJlbC5pbmRleE9mKFwiL1wiKSk7c2V0VGltZW91dChmdW5jdGlvbigpe2UoXCJhW1wiK3MuaG9vaytcIl49J1wiK2hhc2hSZWwrXCInXTplcShcIitoYXNoSW5kZXgrXCIpXCIpLnRyaWdnZXIoXCJjbGlja1wiKX0sNTApfXJldHVybiB0aGlzLnVuYmluZChcImNsaWNrLnByZXR0eXBob3RvXCIpLmJpbmQoXCJjbGljay5wcmV0dHlwaG90b1wiLGUucHJldHR5UGhvdG8uaW5pdGlhbGl6ZSl9O30pKGpRdWVyeSk7dmFyIHBwX2FscmVhZHlJbml0aWFsaXplZD1mYWxzZSJdLCJzb3VyY2VSb290IjoiIn0=