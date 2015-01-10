function noty(e){var t=0,n={animateOpen:"animation.open",animateClose:"animation.close",easing:"animation.easing",speed:"animation.speed",onShow:"callback.onShow",onShown:"callback.afterShow",onClose:"callback.onClose",onCloseClick:"callback.onCloseClick",onClosed:"callback.afterClose"};jQuery.each(e,function(r,i){if(n[r]){t++;var s=n[r].split(".");if(!e[s[0]])e[s[0]]={};e[s[0]][s[1]]=i?i:function(){};delete e[r]}});if(!e.closeWith){e.closeWith=jQuery.noty.defaults.closeWith}if(e.hasOwnProperty("closeButton")){t++;if(e.closeButton)e.closeWith.push("button");delete e.closeButton}if(e.hasOwnProperty("closeOnSelfClick")){t++;if(e.closeOnSelfClick)e.closeWith.push("click");delete e.closeOnSelfClick}if(e.hasOwnProperty("closeOnSelfOver")){t++;if(e.closeOnSelfOver)e.closeWith.push("hover");delete e.closeOnSelfOver}if(e.hasOwnProperty("custom")){t++;if(e.custom.container!="null")e.custom=e.custom.container}if(e.hasOwnProperty("cssPrefix")){t++;delete e.cssPrefix}if(e.theme=="noty_theme_default"){t++;e.theme="defaultTheme"}if(!e.hasOwnProperty("dismissQueue")){e.dismissQueue=jQuery.noty.defaults.dismissQueue}if(e.buttons){jQuery.each(e.buttons,function(e,n){if(n.click){t++;n.onClick=n.click;delete n.click}if(n.type){t++;n.addClass=n.type;delete n.type}})}if(t){if(typeof console!=="undefined"&&console.warn){console.warn("You are using noty v2 with v1.x.x options. @deprecated until v2.2.0 - Please update your options.")}}return jQuery.notyRenderer.init(e)}(function(qute){$.fn.quovolver=function(options){"use strict";var opts=$.extend({},$.fn.quovolver.defaults,options);return this.each(function(){function gotoItem(itemNumber){if($items.is(":animated")||$this.is(":animated"))return!1;if($box.is(":hidden"))return!1;itemNumber<1?itemNumber=$total:itemNumber>$total&&(itemNumber=1);var gotoData={current:$($items[$active-1]),upcoming:$($items[itemNumber-1])};gotoData.currentHeight=getHiddenProperty(gotoData.current);gotoData.upcomingHeight=getHiddenProperty(gotoData.upcoming);gotoData.currentOuterHeight=getHiddenProperty(gotoData.current,"outerHeight");gotoData.upcomingOuterHeight=getHiddenProperty(gotoData.upcoming,"outerHeight");gotoData.currentWidth=getHiddenProperty(gotoData.current,"width");gotoData.upcomingWidth=getHiddenProperty(gotoData.upcoming,"width");gotoData.currentOuterWidth=getHiddenProperty(gotoData.current,"outerWidth");gotoData.upcomingOuterWidth=getHiddenProperty(gotoData.upcoming,"outerWidth");o.transition!=="basic"&&typeof o.transition=="string"&&eval("typeof "+o.transition)==="function"?eval(o.transition+"(gotoData)"):basic(gotoData);$active=itemNumber;updateNavNum($nav);updateNavText($nav);return!1}function buildNav(){var e;if(o.navPosition==="above"||o.navPosition==="both"){$box.prepend('<div class="quovolve-nav quovolve-nav-above"></div>');e=$box.find(".quovolve-nav")}if(o.navPosition==="below"||o.navPosition==="both"){$box.append('<div class="quovolve-nav quovolve-nav-below"></div>');e=$box.find(".quovolve-nav")}if(o.navPosition==="custom"&&o.navPositionCustom!==""&&$(o.navPositionCustom).length!==0){$(o.navPositionCustom).append('<div class="quovolve-nav quovolve-nav-custom"></div>');e=$(o.navPositionCustom).find(".quovolve-nav")}o.navPrev&&e.append('<span class="nav-prev"><a href="#">'+o.navPrevText+"</a></span>");o.navNext&&e.append('<span class="nav-next"><a href="#">'+o.navNextText+"</a></span>");if(o.navNum){e.append('<ol class="nav-numbers"></ol>');for(var t=1;t<$total+1;t++)e.find(".nav-numbers").append('<li><a href="#item-'+t+'">'+t+"</a></li>");updateNavNum(e)}if(o.navText){e.append('<span class="nav-text"></span>');updateNavText(e)}return e}function getHiddenProperty(e,t){t||(t="height");$(this).is(":hidden")&&e.show().css({position:"absolute",visibility:"hidden",display:"block"});var n=e[t]();$(this).is(":hidden")&&e.hide().css({position:"static",visibility:"visible",display:"none"});return n}function equalHeight(e){var t=0;e.height("auto");e.each(function(){var e;$(this).is(":visible")?e=$(this).height():e=getHiddenProperty($(this));e>t&&(t=e)});e.height(t)}function updateNavNum(e){if(o.navEnabled){e.find(".nav-numbers li").removeClass("active");e.find('.nav-numbers a[href="#item-'+$active+'"]').parent().addClass("active")}}function updateNavText(e){if(o.navEnabled){var t=o.navTextContent.replace("@a",$active).replace("@b",$total);e.find(".nav-text").text(t)}}function autoPlay(){$box.addClass("play");var e=setInterval(function(){gotoItem($active+1)},o.autoPlaySpeed);return e}function pauseAutoPlay(e){if(o.stopAutoPlay!==!0){$box.hover(function(){$box.addClass("pause").removeClass("play");clearInterval(e)},function(){$box.removeClass("pause").addClass("play");clearInterval(e);e=autoPlay()});return e}}function stopAutoPlay(e){$box.hover(function(){$box.addClass("stop").removeClass("play");clearInterval(e)},function(){});return e}function basic(e){$this.css("height",e.upcomingOuterHeight);e.current.hide();e.upcoming.show();o.equalHeight===!1&&$this.css("height","auto")}function fade(e){$this.height(e.currentOuterHeight);e.current.fadeOut(o.transitionSpeed,function(){$this.animate({height:e.upcomingOuterHeight},o.transitionSpeed,function(){e.upcoming.fadeIn(o.transitionSpeed,function(){$this.height("auto")})})})}var $this=$(this),o=$.meta?$.extend({},opts,$this.data()):opts;$this.addClass("quovolve").css({position:"relative"}).wrap('<div class="quovolve-box"></div>');var groupMethod;o.children?groupMethod="find":groupMethod="children";var $box=$this.parent(".quovolve-box"),$items=$this[groupMethod](o.children),$active=1,$total=$items.length;$items.hide().filter(":first").show();if(o.navPrev||o.navNext||o.navNum||o.navText){o.navEnabled=!0;var $nav=buildNav()}else o.navEnabled=!1;if(o.equalHeight){equalHeight($items);$(window).resize(function(){equalHeight($items);$this.css("height",$($items[$active-1]).outerHeight())})}if(o.autoPlay){var $playID=autoPlay();o.stopOnHover?$playID=stopAutoPlay($playID):o.pauseOnHover&&($playID=pauseAutoPlay($playID))}$(".nav-prev a").click(function(){return gotoItem($active-1)});$(".nav-next a").click(function(){return gotoItem($active+1)});$(".nav-numbers a").click(function(){return gotoItem($(this).text())});$(this).bind("goto",function(e,t){gotoItem(t)})})};$.fn.quovolver.defaults={children:"",transition:"fade",transitionSpeed:300,autoPlay:!0,autoPlaySpeed:6e3,pauseOnHover:!0,stopOnHover:!1,equalHeight:!0,navPosition:"above",navPositionCustom:"",navPrev:!1,navNext:!1,navNum:!1,navText:!1,navPrevText:"Prev",navNextText:"Next",navTextContent:"@a / @b"}})(jQuery);(function(e,t,n){function r(n,r,i){var s=t.createElement(n);return r&&(s.id=et+r),i&&(s.style.cssText=i),e(s)}function i(){return n.innerHeight?n.innerHeight:e(n).height()}function s(e){var t=N.length,n=(z+e)%t;return 0>n?t+n:n}function o(e,t){return Math.round((/%/.test(e)?("x"===t?C.width():i())/100:1)*parseInt(e,10))}function u(e,t){return e.photo||e.photoRegex.test(t)}function a(e,t){return e.retinaUrl&&n.devicePixelRatio>1?t.replace(e.photoRegex,e.retinaSuffix):t}function f(e){"contains"in y[0]&&!y[0].contains(e.target)&&(e.stopPropagation(),y.focus())}function l(){var t,n=e.data(U,Z);null==n?(j=e.extend({},Y),console&&console.log&&console.log("Error: cboxElement missing settings object")):j=e.extend({},n);for(t in j)e.isFunction(j[t])&&"on"!==t.slice(0,2)&&(j[t]=j[t].call(U));j.rel=j.rel||U.rel||e(U).data("rel")||"nofollow",j.href=j.href||e(U).attr("href"),j.title=j.title||U.title,"string"==typeof j.href&&(j.href=e.trim(j.href))}function c(n,r){e(t).trigger(n),at.trigger(n),e.isFunction(r)&&r.call(U)}function h(){var e,t,n,r,i,s=et+"Slideshow_",o="click."+et;j.slideshow&&N[1]?(t=function(){clearTimeout(e)},n=function(){(j.loop||N[z+1])&&(e=setTimeout(K.next,j.slideshowSpeed))},r=function(){_.html(j.slideshowStop).unbind(o).one(o,i),at.bind(it,n).bind(rt,t).bind(st,i),y.removeClass(s+"off").addClass(s+"on")},i=function(){t(),at.unbind(it,n).unbind(rt,t).unbind(st,i),_.html(j.slideshowStart).unbind(o).one(o,function(){K.next(),r()}),y.removeClass(s+"on").addClass(s+"off")},j.slideshowAuto?r():i()):y.removeClass(s+"off "+s+"on")}function p(n){$||(U=n,l(),N=e(U),z=0,"nofollow"!==j.rel&&(N=e("."+tt).filter(function(){var t,n=e.data(this,Z);return n&&(t=e(this).data("rel")||n.rel||this.rel),t===j.rel}),z=N.index(U),-1===z&&(N=N.add(U),z=N.length-1)),g.css({opacity:parseFloat(j.opacity),cursor:j.overlayClose?"pointer":"auto",visibility:"visible"}).show(),Q&&y.add(g).removeClass(Q),j.className&&y.add(g).addClass(j.className),Q=j.className,j.closeButton?H.html(j.close).appendTo(w):H.appendTo("<div/>"),X||(X=V=!0,y.css({visibility:"hidden",display:"block"}),k=r(ft,"LoadedContent","width:0; height:0; overflow:hidden").appendTo(w),F=E.height()+T.height()+w.outerHeight(!0)-w.height(),I=S.width()+x.width()+w.outerWidth(!0)-w.width(),q=k.outerHeight(!0),R=k.outerWidth(!0),j.w=o(j.initialWidth,"x"),j.h=o(j.initialHeight,"y"),K.position(),h(),c(nt,j.onOpen),B.add(O).hide(),y.focus(),j.trapFocus&&t.addEventListener&&(t.addEventListener("focus",f,!0),at.one(ot,function(){t.removeEventListener("focus",f,!0)})),j.returnFocus&&at.one(ot,function(){e(U).focus()})),m())}function d(){!y&&t.body&&(G=!1,C=e(n),y=r(ft).attr({id:Z,"class":e.support.opacity===!1?et+"IE":"",role:"dialog",tabindex:"-1"}).hide(),g=r(ft,"Overlay").hide(),A=e([r(ft,"LoadingOverlay")[0],r(ft,"LoadingGraphic")[0]]),b=r(ft,"Wrapper"),w=r(ft,"Content").append(O=r(ft,"Title"),M=r(ft,"Current"),P=e('<button type="button"/>').attr({id:et+"Previous"}),D=e('<button type="button"/>').attr({id:et+"Next"}),_=r("button","Slideshow"),A),H=e('<button type="button"/>').attr({id:et+"Close"}),b.append(r(ft).append(r(ft,"TopLeft"),E=r(ft,"TopCenter"),r(ft,"TopRight")),r(ft,!1,"clear:left").append(S=r(ft,"MiddleLeft"),w,x=r(ft,"MiddleRight")),r(ft,!1,"clear:left").append(r(ft,"BottomLeft"),T=r(ft,"BottomCenter"),r(ft,"BottomRight"))).find("div div").css({"float":"left"}),L=r(ft,!1,"position:absolute; width:9999px; visibility:hidden; display:none"),B=D.add(P).add(M).add(_),e(t.body).append(g,y.append(b,L)))}function v(){function n(e){e.which>1||e.shiftKey||e.altKey||e.metaKey||e.ctrlKey||(e.preventDefault(),p(this))}return y?(G||(G=!0,D.click(function(){K.next()}),P.click(function(){K.prev()}),H.click(function(){K.close()}),g.click(function(){j.overlayClose&&K.close()}),e(t).bind("keydown."+et,function(e){var t=e.keyCode;X&&j.escKey&&27===t&&(e.preventDefault(),K.close()),X&&j.arrowKey&&N[1]&&!e.altKey&&(37===t?(e.preventDefault(),P.click()):39===t&&(e.preventDefault(),D.click()))}),e.isFunction(e.fn.on)?e(t).on("click."+et,"."+tt,n):e("."+tt).live("click."+et,n)),!0):!1}function m(){var i,s,f,h=K.prep,p=++lt;V=!0,W=!1,U=N[z],l(),c(ut),c(rt,j.onLoad),j.h=j.height?o(j.height,"y")-q-F:j.innerHeight&&o(j.innerHeight,"y"),j.w=j.width?o(j.width,"x")-R-I:j.innerWidth&&o(j.innerWidth,"x"),j.mw=j.w,j.mh=j.h,j.maxWidth&&(j.mw=o(j.maxWidth,"x")-R-I,j.mw=j.w&&j.w<j.mw?j.w:j.mw),j.maxHeight&&(j.mh=o(j.maxHeight,"y")-q-F,j.mh=j.h&&j.h<j.mh?j.h:j.mh),i=j.href,J=setTimeout(function(){A.show()},100),j.inline?(f=r(ft).hide().insertBefore(e(i)[0]),at.one(ut,function(){f.replaceWith(k.children())}),h(e(i))):j.iframe?h(" "):j.html?h(j.html):u(j,i)?(i=a(j,i),W=t.createElement("img"),e(W).addClass(et+"Photo").bind("error",function(){j.title=!1,h(r(ft,"Error").html(j.imgError))}).one("load",function(){var t;p===lt&&(W.alt=e(U).attr("alt")||e(U).attr("data-alt")||"",j.retinaImage&&n.devicePixelRatio>1&&(W.height=W.height/n.devicePixelRatio,W.width=W.width/n.devicePixelRatio),j.scalePhotos&&(s=function(){W.height-=W.height*t,W.width-=W.width*t},j.mw&&W.width>j.mw&&(t=(W.width-j.mw)/W.width,s()),j.mh&&W.height>j.mh&&(t=(W.height-j.mh)/W.height,s())),j.h&&(W.style.marginTop=Math.max(j.mh-W.height,0)/2+"px"),N[1]&&(j.loop||N[z+1])&&(W.style.cursor="pointer",W.onclick=function(){K.next()}),W.style.width=W.width+"px",W.style.height=W.height+"px",setTimeout(function(){h(W)},1))}),setTimeout(function(){W.src=i},1)):i&&L.load(i,j.data,function(t,n){p===lt&&h("error"===n?r(ft,"Error").html(j.xhrError):e(this).contents())})}var g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q,R,U,z,W,X,V,$,J,K,Q,G,Y={transition:"elastic",speed:300,fadeOut:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,className:!1,retinaImage:!1,retinaUrl:!1,retinaSuffix:"@2x.$1",current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:!1,returnFocus:!0,trapFocus:!0,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",photoRegex:/\.(gif|png|jp(e|g|eg)|bmp|ico|webp)((#|\?).*)?$/i,onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:void 0,closeButton:!0},Z="colorbox",et="cbox",tt=et+"Element",nt=et+"_open",rt=et+"_load",it=et+"_complete",st=et+"_cleanup",ot=et+"_closed",ut=et+"_purge",at=e("<a/>"),ft="div",lt=0;e.colorbox||(e(d),K=e.fn[Z]=e[Z]=function(t,n){var r=this;if(t=t||{},d(),v()){if(e.isFunction(r))r=e("<a/>"),t.open=!0;else if(!r[0])return r;n&&(t.onComplete=n),r.each(function(){e.data(this,Z,e.extend({},e.data(this,Z)||Y,t))}).addClass(tt),(e.isFunction(t.open)&&t.open.call(r)||t.open)&&p(r[0])}return r},K.position=function(e,t){function n(e){E[0].style.width=T[0].style.width=w[0].style.width=parseInt(e.style.width,10)-I+"px",w[0].style.height=S[0].style.height=x[0].style.height=parseInt(e.style.height,10)-F+"px"}var r,s,u,a=0,f=0,l=y.offset();C.unbind("resize."+et),y.css({top:-9e4,left:-9e4}),s=C.scrollTop(),u=C.scrollLeft(),j.fixed?(l.top-=s,l.left-=u,y.css({position:"fixed"})):(a=s,f=u,y.css({position:"absolute"})),f+=j.right!==!1?Math.max(C.width()-j.w-R-I-o(j.right,"x"),0):j.left!==!1?o(j.left,"x"):Math.round(Math.max(C.width()-j.w-R-I,0)/2),a+=j.bottom!==!1?Math.max(i()-j.h-q-F-o(j.bottom,"y"),0):j.top!==!1?o(j.top,"y"):Math.round(Math.max(i()-j.h-q-F,0)/2),y.css({top:l.top,left:l.left,visibility:"visible"}),e=y.width()===j.w+R&&y.height()===j.h+q?0:e||0,b[0].style.width=b[0].style.height="9999px",r={width:j.w+R+I,height:j.h+q+F,top:a,left:f},0===e&&y.css(r),y.dequeue().animate(r,{duration:e,complete:function(){n(this),V=!1,b[0].style.width=j.w+R+I+"px",b[0].style.height=j.h+q+F+"px",j.reposition&&setTimeout(function(){C.bind("resize."+et,K.position)},1),t&&t()},step:function(){n(this)}})},K.resize=function(e){var t;X&&(e=e||{},e.width&&(j.w=o(e.width,"x")-R-I),e.innerWidth&&(j.w=o(e.innerWidth,"x")),k.css({width:j.w}),e.height&&(j.h=o(e.height,"y")-q-F),e.innerHeight&&(j.h=o(e.innerHeight,"y")),e.innerHeight||e.height||(t=k.scrollTop(),k.css({height:"auto"}),j.h=k.height()),k.css({height:j.h}),t&&k.scrollTop(t),K.position("none"===j.transition?0:j.speed))},K.prep=function(n){function i(){return j.w=j.w||k.width(),j.w=j.mw&&j.mw<j.w?j.mw:j.w,j.w}function o(){return j.h=j.h||k.height(),j.h=j.mh&&j.mh<j.h?j.mh:j.h,j.h}if(X){var f,l="none"===j.transition?0:j.speed;k.empty().remove(),k=r(ft,"LoadedContent").append(n),k.hide().appendTo(L.show()).css({width:i(),overflow:j.scrolling?"auto":"hidden"}).css({height:o()}).prependTo(w),L.hide(),e(W).css({"float":"none"}),f=function(){function n(){e.support.opacity===!1&&y[0].style.removeAttribute("filter")}var i,o,f=N.length,h="frameBorder",p="allowTransparency";X&&(o=function(){clearTimeout(J),A.hide(),c(it,j.onComplete)},O.html(j.title).add(k).show(),f>1?("string"==typeof j.current&&M.html(j.current.replace("{current}",z+1).replace("{total}",f)).show(),D[j.loop||f-1>z?"show":"hide"]().html(j.next),P[j.loop||z?"show":"hide"]().html(j.previous),j.slideshow&&_.show(),j.preloading&&e.each([s(-1),s(1)],function(){var n,r,i=N[this],s=e.data(i,Z);s&&s.href?(n=s.href,e.isFunction(n)&&(n=n.call(i))):n=e(i).attr("href"),n&&u(s,n)&&(n=a(s,n),r=t.createElement("img"),r.src=n)})):B.hide(),j.iframe?(i=r("iframe")[0],h in i&&(i[h]=0),p in i&&(i[p]="true"),j.scrolling||(i.scrolling="no"),e(i).attr({src:j.href,name:(new Date).getTime(),"class":et+"Iframe",allowFullScreen:!0,webkitAllowFullScreen:!0,mozallowfullscreen:!0}).one("load",o).appendTo(k),at.one(ut,function(){i.src="//about:blank"}),j.fastIframe&&e(i).trigger("load")):o(),"fade"===j.transition?y.fadeTo(l,1,n):n())},"fade"===j.transition?y.fadeTo(l,0,function(){K.position(0,f)}):K.position(l,f)}},K.next=function(){!V&&N[1]&&(j.loop||N[z+1])&&(z=s(1),p(N[z]))},K.prev=function(){!V&&N[1]&&(j.loop||z)&&(z=s(-1),p(N[z]))},K.close=function(){X&&!$&&($=!0,X=!1,c(st,j.onCleanup),C.unbind("."+et),g.fadeTo(j.fadeOut||0,0),y.stop().fadeTo(j.fadeOut||0,0,function(){y.add(g).css({opacity:1,cursor:"auto"}).hide(),c(ut),k.empty().remove(),setTimeout(function(){$=!1,c(ot,j.onClosed)},1)}))},K.remove=function(){y&&(y.stop(),e.colorbox.close(),y.stop().remove(),g.remove(),$=!1,y=null,e("."+tt).removeData(Z).removeClass(tt),e(t).unbind("click."+et))},K.element=function(){return e(U)},K.settings=Y)})(jQuery,document,window);"function"!==typeof Object.create&&(Object.create=function(e){function t(){}t.prototype=e;return new t});(function(e){var t={};var n=0;e.galleriffic={version:"2.0.1",normalizeHash:function(e){return e.replace(/^.*#/,"").replace(/\?.*$/,"")},getImage:function(n){if(!n)return undefined;n=e.galleriffic.normalizeHash(n);return t[n]},gotoImage:function(t){var n=e.galleriffic.getImage(t);if(!n)return false;var r=n.gallery;r.gotoImage(n);return true},removeImageByHash:function(t,n){var r=e.galleriffic.getImage(t);if(!r)return false;var i=r.gallery;if(n&&n!=i)return false;return i.removeImageByIndex(r.index)}};var r={delay:3e3,numThumbs:20,preloadAhead:40,enableTopPager:false,enableBottomPager:true,maxPagesToShow:7,imageContainerSel:"",captionContainerSel:"",controlsContainerSel:"",loadingContainerSel:"",renderSSControls:true,renderNavControls:true,playLinkText:"Play",pauseLinkText:"Pause",prevLinkText:"Previous",nextLinkText:"Next",nextPageLinkText:"Next ›",prevPageLinkText:"‹ Prev",enableHistory:false,enableKeyboardNavigation:true,autoStart:false,syncTransitions:false,defaultTransitionDuration:1e3,onSlideChange:undefined,onTransitionOut:undefined,onTransitionIn:undefined,onPageTransitionOut:undefined,onPageTransitionIn:undefined,onImageAdded:undefined,onImageRemoved:undefined};e.fn.galleriffic=function(s){e.extend(this,{version:e.galleriffic.version,isSlideshowRunning:false,slideshowTimeout:undefined,clickHandler:function(t,n){this.pause();if(!this.enableHistory){var r=e.galleriffic.normalizeHash(e(n).attr("href"));e.galleriffic.gotoImage(r);t.preventDefault()}},appendImage:function(e){this.addImage(e,false,false);return this},insertImage:function(e,t){this.addImage(e,false,true,t);return this},addImage:function(r,i,s,o){var u=typeof r==="string"?e(r):r;var a=u.find("a.thumb");var f=a.attr("href");var l=a.attr("title");var c=u.find(".caption").remove();var h=a.attr("name");n++;if(!h||t[""+h]){h=n}if(!s)o=this.data.length;var p={title:l,slideUrl:f,caption:c,hash:h,gallery:this,index:o};if(s){this.data.splice(o,0,p);this.updateIndices(o)}else{this.data.push(p)}var d=this;if(!i){this.updateThumbs(function(){var e=d.find("ul.thumbs");if(s)e.children(":eq("+o+")").before(u);else e.append(u);if(d.onImageAdded)d.onImageAdded(p,u)})}t[""+h]=p;a.attr("rel","history").attr("href","#"+h).removeAttr("name").click(function(e){d.clickHandler(e,this)});return this},removeImageByIndex:function(e){if(e<0||e>=this.data.length)return false;var t=this.data[e];if(!t)return false;this.removeImage(t);return true},removeImageByHash:function(t){return e.galleriffic.removeImageByHash(t,this)},removeImage:function(e){var n=e.index;this.data.splice(n,1);delete t[""+e.hash];this.updateThumbs(function(){var t=o.find("ul.thumbs").children(":eq("+n+")").remove();if(o.onImageRemoved)o.onImageRemoved(e,t)});this.updateIndices(n);return this},updateIndices:function(e){for(i=e;i<this.data.length;i++){this.data[i].index=i}return this},initializeThumbs:function(){this.data=[];var t=this;this.find("ul.thumbs > li").each(function(n){t.addImage(e(this),true,false)});return this},isPreloadComplete:false,preloadInit:function(){if(this.preloadAhead==0)return this;this.preloadStartIndex=this.currentImage.index;var e=this.getNextIndex(this.preloadStartIndex);return this.preloadRecursive(this.preloadStartIndex,e)},preloadRelocate:function(e){this.preloadStartIndex=e;return this},preloadRecursive:function(e,t){if(e!=this.preloadStartIndex){var n=this.getNextIndex(this.preloadStartIndex);return this.preloadRecursive(this.preloadStartIndex,n)}var r=this;var i=t-e;if(i<0)i=this.data.length-1-e+t;if(this.preloadAhead>=0&&i>this.preloadAhead){setTimeout(function(){r.preloadRecursive(e,t)},500);return this}var s=this.data[t];if(!s)return this;if(s.image)return this.preloadNext(e,t);var o=new Image;o.onload=function(){s.image=this;r.preloadNext(e,t);r.initZoom()};o.alt=s.title;o.src=s.slideUrl;return this},preloadNext:function(e,t){var n=this.getNextIndex(t);if(n==e){this.isPreloadComplete=true}else{var r=this;setTimeout(function(){r.preloadRecursive(e,n)},100)}return this},getNextIndex:function(e){var t=e+1;if(t>=this.data.length)t=0;return t},getPrevIndex:function(e){var t=e-1;if(t<0)t=this.data.length-1;return t},pause:function(){this.isSlideshowRunning=false;if(this.slideshowTimeout){clearTimeout(this.slideshowTimeout);this.slideshowTimeout=undefined}if(this.$controlsContainer){this.$controlsContainer.find("div.ss-controls a").removeClass().addClass("play").attr("title",this.playLinkText).attr("href","#play").html(this.playLinkText)}return this},play:function(){this.isSlideshowRunning=true;if(this.$controlsContainer){this.$controlsContainer.find("div.ss-controls a").removeClass().addClass("pause").attr("title",this.pauseLinkText).attr("href","#pause").html(this.pauseLinkText)}if(!this.slideshowTimeout){var e=this;this.slideshowTimeout=setTimeout(function(){e.ssAdvance()},this.delay)}return this},toggleSlideshow:function(){if(this.isSlideshowRunning)this.pause();else this.play();return this},ssAdvance:function(){if(this.isSlideshowRunning)this.next(true);return this},next:function(e,t){this.gotoIndex(this.getNextIndex(this.currentImage.index),e,t);return this},previous:function(e,t){this.gotoIndex(this.getPrevIndex(this.currentImage.index),e,t);return this},nextPage:function(e,t){var n=this.getCurrentPage();var r=this.getNumPages()-1;if(n<r){var i=n*this.numThumbs;var s=i+this.numThumbs;this.gotoIndex(s,e,t)}return this},previousPage:function(e,t){var n=this.getCurrentPage();if(n>0){var r=n*this.numThumbs;var i=r-this.numThumbs;this.gotoIndex(i,e,t)}return this},gotoIndex:function(t,n,r){if(!n)this.pause();if(t<0)t=0;else if(t>=this.data.length)t=this.data.length-1;var i=this.data[t];if(!r&&this.enableHistory)e.historyLoad(String(i.hash));else this.gotoImage(i);return this},gotoImage:function(e){var t=e.index;if(this.onSlideChange)this.onSlideChange(this.currentImage.index,t);this.currentImage=e;this.preloadRelocate(t);this.refresh();return this},getDefaultTransitionDuration:function(e){if(e)return this.defaultTransitionDuration;return this.defaultTransitionDuration/2},refresh:function(){var e=this.currentImage;if(!e)return this;var t=e.index;if(this.$controlsContainer){this.$controlsContainer.find("div.nav-controls a.prev").attr("href","#"+this.data[this.getPrevIndex(t)].hash).end().find("div.nav-controls a.next").attr("href","#"+this.data[this.getNextIndex(t)].hash)}var n=this.$imageContainer.find("span.current").addClass("previous").removeClass("current");var r=0;if(this.$captionContainer){r=this.$captionContainer.find("span.current").addClass("previous").removeClass("current")}var i=this.syncTransitions&&e.image;var s=true;var o=this;var u=function(){s=false;n.remove();if(r)r.remove();if(!i){if(e.image&&e.hash==o.data[o.currentImage.index].hash){o.buildImage(e,i)}else{if(o.$loadingContainer){o.$loadingContainer.show()}}}};if(n.length==0){u()}else{if(this.onTransitionOut){this.onTransitionOut(n,r,i,u)}else{n.fadeTo(this.getDefaultTransitionDuration(i),0,u);if(r)r.fadeTo(this.getDefaultTransitionDuration(i),0)}}if(i)this.buildImage(e,i);if(!e.image){var a=new Image;a.onload=function(){e.image=this;if(!s&&e.hash==o.data[o.currentImage.index].hash){o.buildImage(e,i)}o.initZoom()};a.alt=e.title;a.src=e.slideUrl}else{o.initZoom()}this.relocatePreload=true;return this.syncThumbs()},initZoom:function(){var t=this.currentImage;if(!e(t.image).data("elevateZoom")){e(t.image).elevateZoom({zoomWindowWidth:458,zoomWindowHeight:375,borderSize:0,zoomWindowPosition:"product-details",zoomWindowFadeIn:500,zoomWindowFadeOut:300,lensFadeIn:800,lensFadeOut:300})}},buildImage:function(e,t){var n=this;var r=this.getNextIndex(e.index);var i=this.$imageContainer.append('<span class="image-wrapper current"><a class="advance-link" rel="history" href="#'+this.data[r].hash+'" title="'+e.title+'"> </a></span>').find("span.current").css("opacity","0");i.find("a").append(e.image).click(function(e){n.clickHandler(e,this)});var s=0;if(this.$captionContainer){s=this.$captionContainer.append('<span class="image-caption current"></span>').find("span.current").css("opacity","0").append(e.caption)}if(this.$loadingContainer){this.$loadingContainer.hide()}if(this.onTransitionIn){this.onTransitionIn(i,s,t)}else{i.fadeTo(this.getDefaultTransitionDuration(t),1);if(s)s.fadeTo(this.getDefaultTransitionDuration(t),1)}if(this.isSlideshowRunning){if(this.slideshowTimeout)clearTimeout(this.slideshowTimeout);this.slideshowTimeout=setTimeout(function(){n.ssAdvance()},this.delay)}return this},getCurrentPage:function(){return Math.floor(this.currentImage.index/this.numThumbs)},syncThumbs:function(){var e=this.getCurrentPage();if(e!=this.displayedPage)this.updateThumbs();var t=this.find("ul.thumbs").children();t.filter(".selected").removeClass("selected");t.eq(this.currentImage.index).addClass("selected");return this},updateThumbs:function(e){var t=this;var n=function(){if(e)e();t.rebuildThumbs();if(t.onPageTransitionIn)t.onPageTransitionIn();else t.show()};if(this.onPageTransitionOut){this.onPageTransitionOut(n)}else{this.hide();n()}return this},rebuildThumbs:function(){var t=this.data.length>this.numThumbs;if(this.enableTopPager){var n=this.find("div.top");if(n.length==0)n=this.prepend('<div class="top pagination"></div>').find("div.top");else n.empty();if(t)this.buildPager(n)}if(this.enableBottomPager){var r=this.find("div.bottom");if(r.length==0)r=this.append('<div class="bottom pagination"></div>').find("div.bottom");else r.empty();if(t)this.buildPager(r)}var i=this.getCurrentPage();var s=i*this.numThumbs;var o=s+this.numThumbs-1;if(o>=this.data.length)o=this.data.length-1;var u=this.find("ul.thumbs");u.find("li").each(function(t){var n=e(this);if(t>=s&&t<=o){n.show()}else{n.hide()}});this.displayedPage=i;u.removeClass("noscript");return this},getNumPages:function(){return Math.ceil(this.data.length/this.numThumbs)},buildPager:function(e){var t=this;var n=this.getNumPages();var r=this.getCurrentPage();var i=r*this.numThumbs;var s=this.maxPagesToShow-1;var o=r-Math.floor((this.maxPagesToShow-1)/2)+1;if(o>0){var u=n-o;if(u<s){o=o-(s-u)}}if(o<0){o=0}if(r>0){var a=i-this.numThumbs;e.append('<a rel="history" href="#'+this.data[a].hash+'" title="'+this.prevPageLinkText+'">'+this.prevPageLinkText+"</a>")}if(o>0){this.buildPageLink(e,0,n);if(o>1)e.append('<span class="ellipsis">…</span>');s--}while(s>0){this.buildPageLink(e,o,n);s--;o++}if(o<n){var f=n-1;if(o<f)e.append('<span class="ellipsis">…</span>');this.buildPageLink(e,f,n)}var l=i+this.numThumbs;if(l<this.data.length){e.append('<a rel="history" href="#'+this.data[l].hash+'" title="'+this.nextPageLinkText+'">'+this.nextPageLinkText+"</a>")}e.find("a").click(function(e){t.clickHandler(e,this)});return this},buildPageLink:function(e,t,n){var r=t+1;var i=this.getCurrentPage();if(t==i)e.append('<span class="current">'+r+"</span>");else if(t<n){var s=t*this.numThumbs;e.append('<a rel="history" href="#'+this.data[s].hash+'" title="'+r+'">'+r+"</a>")}return this}});e.extend(this,r,s);if(this.enableHistory&&!e.historyInit)this.enableHistory=false;if(this.imageContainerSel)this.$imageContainer=e(this.imageContainerSel);if(this.captionContainerSel)this.$captionContainer=e(this.captionContainerSel);if(this.loadingContainerSel)this.$loadingContainer=e(this.loadingContainerSel);this.initializeThumbs();if(this.maxPagesToShow<3)this.maxPagesToShow=3;this.displayedPage=-1;this.currentImage=this.data[0];var o=this;if(this.$loadingContainer)this.$loadingContainer.hide();if(this.controlsContainerSel){this.$controlsContainer=e(this.controlsContainerSel).empty();if(this.renderSSControls){if(this.autoStart){this.$controlsContainer.append('<div class="ss-controls"><a href="#pause" class="pause" title="'+this.pauseLinkText+'">'+this.pauseLinkText+"</a></div>")}else{this.$controlsContainer.append('<div class="ss-controls"><a href="#play" class="play" title="'+this.playLinkText+'">'+this.playLinkText+"</a></div>")}this.$controlsContainer.find("div.ss-controls a").click(function(e){o.toggleSlideshow();e.preventDefault();return false})}if(this.renderNavControls){this.$controlsContainer.append('<div class="nav-controls"><a class="prev" rel="history" title="'+this.prevLinkText+'">'+this.prevLinkText+'</a><a class="next" rel="history" title="'+this.nextLinkText+'">'+this.nextLinkText+"</a></div>").find("div.nav-controls a").click(function(e){o.clickHandler(e,this)})}}var u=!this.enableHistory||!location.hash;if(this.enableHistory&&location.hash){var a=e.galleriffic.normalizeHash(location.hash);var f=t[a];if(!f)u=true}if(u)this.gotoIndex(0,false,true);if(this.enableKeyboardNavigation){e(document).keydown(function(e){var t=e.charCode?e.charCode:e.keyCode?e.keyCode:0;switch(t){case 32:o.next();e.preventDefault();break;case 33:o.previousPage();e.preventDefault();break;case 34:o.nextPage();e.preventDefault();break;case 35:o.gotoIndex(o.data.length-1);e.preventDefault();break;case 36:o.gotoIndex(0);e.preventDefault();break;case 37:o.previous();e.preventDefault();break;case 39:o.next();e.preventDefault();break}})}if(this.autoStart)this.play();setTimeout(function(){o.preloadInit()},1e3);return this}})(jQuery);if(typeof Object.create!=="function"){Object.create=function(e){function t(){}t.prototype=e;return new t}}(function(e){var t={init:function(t){this.options=e.extend({},e.noty.defaults,t);this.options.layout=this.options.custom?e.noty.layouts["inline"]:e.noty.layouts[this.options.layout];this.options.theme=e.noty.themes[this.options.theme];delete t.layout;delete t.theme;this.options=e.extend({},this.options,this.options.layout.options);this.options.id="noty_"+(new Date).getTime()*Math.floor(Math.random()*1e6);this.options=e.extend({},this.options,t);this._build();return this},_build:function(){var t=e('<div class="noty_bar"></div>').attr("id",this.options.id);t.append(this.options.template).find(".noty_text").html(this.options.text);this.$bar=this.options.layout.parent.object!==null?e(this.options.layout.parent.object).css(this.options.layout.parent.css).append(t):t;if(this.options.buttons){this.options.closeWith=[];this.options.timeout=false;var n=e("<div/>").addClass("noty_buttons");this.options.layout.parent.object!==null?this.$bar.find(".noty_bar").append(n):this.$bar.append(n);var r=this;e.each(this.options.buttons,function(t,n){var i=e("<button/>").addClass(n.addClass?n.addClass:"gray").html(n.text).appendTo(r.$bar.find(".noty_buttons")).bind("click",function(){if(e.isFunction(n.onClick)){n.onClick.call(i,r)}})})}this.$message=this.$bar.find(".noty_message");this.$closeButton=this.$bar.find(".noty_close");this.$buttons=this.$bar.find(".noty_buttons");e.noty.store[this.options.id]=this},show:function(){var t=this;e(t.options.layout.container.selector).append(t.$bar);t.options.theme.style.apply(t);e.type(t.options.layout.css)==="function"?this.options.layout.css.apply(t.$bar):t.$bar.css(this.options.layout.css||{});t.$bar.addClass(t.options.layout.addClass);t.options.layout.container.style.apply(e(t.options.layout.container.selector));t.options.theme.callback.onShow.apply(this);if(e.inArray("click",t.options.closeWith)>-1)t.$bar.css("cursor","pointer").one("click",function(){if(t.options.callback.onCloseClick){t.options.callback.onCloseClick.apply(t)}t.close()});if(e.inArray("hover",t.options.closeWith)>-1)t.$bar.one("mouseenter",function(){t.close()});if(e.inArray("button",t.options.closeWith)>-1)t.$closeButton.one("click",function(){t.close()});if(e.inArray("button",t.options.closeWith)==-1)t.$closeButton.remove();if(t.options.callback.onShow)t.options.callback.onShow.apply(t);t.$bar.animate(t.options.animation.open,t.options.animation.speed,t.options.animation.easing,function(){if(t.options.callback.afterShow)t.options.callback.afterShow.apply(t);t.shown=true});if(t.options.timeout)t.$bar.delay(t.options.timeout).promise().done(function(){t.close()});return this},close:function(){if(this.closed)return;if(this.$bar&&this.$bar.hasClass("i-am-closing-now"))return;var t=this;if(!this.shown){var n=[];e.each(e.noty.queue,function(e,r){if(r.options.id!=t.options.id){n.push(r)}});e.noty.queue=n;return}t.$bar.addClass("i-am-closing-now");if(t.options.callback.onClose){t.options.callback.onClose.apply(t)}t.$bar.clearQueue().stop().animate(t.options.animation.close,t.options.animation.speed,t.options.animation.easing,function(){if(t.options.callback.afterClose)t.options.callback.afterClose.apply(t)}).promise().done(function(){if(t.options.modal){e.notyRenderer.setModalCount(-1);if(e.notyRenderer.getModalCount()==0)e(".noty_modal").fadeOut("fast",function(){e(this).remove()})}e.notyRenderer.setLayoutCountFor(t,-1);if(e.notyRenderer.getLayoutCountFor(t)==0)e(t.options.layout.container.selector).remove();if(typeof t.$bar!=="undefined"&&t.$bar!==null){t.$bar.remove();t.$bar=null;t.closed=true}delete e.noty.store[t.options.id];t.options.theme.callback.onClose.apply(t);if(!t.options.dismissQueue){e.noty.ontap=true;e.notyRenderer.render()}})},setText:function(e){if(!this.closed){this.options.text=e;this.$bar.find(".noty_text").html(e)}return this},setType:function(e){if(!this.closed){this.options.type=e;this.options.theme.style.apply(this);this.options.theme.callback.onShow.apply(this)}return this},setTimeout:function(e){if(!this.closed){var t=this;this.options.timeout=e;t.$bar.delay(t.options.timeout).promise().done(function(){t.close()})}return this},closed:false,shown:false};e.notyRenderer={};e.notyRenderer.init=function(n){var r=Object.create(t).init(n);r.options.force?e.noty.queue.unshift(r):e.noty.queue.push(r);e.notyRenderer.render();return e.noty.returns=="object"?r:r.options.id};e.notyRenderer.render=function(){var t=e.noty.queue[0];if(e.type(t)==="object"){if(t.options.dismissQueue){e.notyRenderer.show(e.noty.queue.shift())}else{if(e.noty.ontap){e.notyRenderer.show(e.noty.queue.shift());e.noty.ontap=false}}}else{e.noty.ontap=true}};e.notyRenderer.show=function(t){if(t.options.modal){e.notyRenderer.createModalFor(t);e.notyRenderer.setModalCount(+1)}if(e(t.options.layout.container.selector).length==0){if(t.options.custom){t.options.custom.append(e(t.options.layout.container.object).addClass("i-am-new"))}else{e("body").append(e(t.options.layout.container.object).addClass("i-am-new"))}}else{e(t.options.layout.container.selector).removeClass("i-am-new")}e.notyRenderer.setLayoutCountFor(t,+1);t.show()};e.notyRenderer.createModalFor=function(t){if(e(".noty_modal").length==0)e("<div/>").addClass("noty_modal").data("noty_modal_count",0).css(t.options.theme.modal.css).prependTo(e("body")).fadeIn("fast")};e.notyRenderer.getLayoutCountFor=function(t){return e(t.options.layout.container.selector).data("noty_layout_count")||0};e.notyRenderer.setLayoutCountFor=function(t,n){return e(t.options.layout.container.selector).data("noty_layout_count",e.notyRenderer.getLayoutCountFor(t)+n)};e.notyRenderer.getModalCount=function(){return e(".noty_modal").data("noty_modal_count")||0};e.notyRenderer.setModalCount=function(t){return e(".noty_modal").data("noty_modal_count",e.notyRenderer.getModalCount()+t)};e.fn.noty=function(t){t.custom=e(this);return e.notyRenderer.init(t)};e.noty={};e.noty.queue=[];e.noty.ontap=true;e.noty.layouts={};e.noty.themes={};e.noty.returns="object";e.noty.store={};e.noty.get=function(t){return e.noty.store.hasOwnProperty(t)?e.noty.store[t]:false};e.noty.close=function(t){return e.noty.get(t)?e.noty.get(t).close():false};e.noty.setText=function(t,n){return e.noty.get(t)?e.noty.get(t).setText(n):false};e.noty.setType=function(t,n){return e.noty.get(t)?e.noty.get(t).setType(n):false};e.noty.clearQueue=function(){e.noty.queue=[]};e.noty.closeAll=function(){e.noty.clearQueue();e.each(e.noty.store,function(e,t){t.close()})};var n=window.alert;e.noty.consumeAlert=function(t){window.alert=function(n){if(t)t.text=n;else t={text:n};e.notyRenderer.init(t)}};e.noty.stopConsumeAlert=function(){window.alert=n};e.noty.defaults={layout:"top",theme:"defaultTheme",type:"alert",text:"",dismissQueue:true,template:'<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',animation:{open:{height:"toggle"},close:{height:"toggle"},easing:"swing",speed:500},timeout:false,force:false,modal:false,closeWith:["click"],callback:{onShow:function(){},afterShow:function(){},onClose:function(){},afterClose:function(){},onCloseClick:function(){}},buttons:false};e(window).resize(function(){e.each(e.noty.layouts,function(t,n){n.container.style.apply(e(n.container.selector))})})})(jQuery);$(document).ready(function(){$(".prod-quotes").quovolver({transitionSpeed:500,equalHeight:false,pauseOnHover:true,autoPlay:true,autoPlaySpeed:12e3});var e=$("#thumbs").galleriffic({numThumbs:18,preloadAhead:10,enableTopPager:false,enableBottomPager:false,maxPagesToShow:1,imageContainerSel:"#slideshow",controlsContainerSel:"#controls",captionContainerSel:"#caption",loadingContainerSel:"#loading",renderSSControls:false,renderNavControls:false,enableHistory:false,enableKeyboardNavigation:false,autoStart:false,syncTransitions:true,defaultTransitionDuration:0});if(!e.removeImageByHash("badgif"));if(!e.removeImageByHash("badgif2"));if(!e.removeImageByHash("badgif3"));if(!e.removeImageByHash("badgif4"));if(!e.removeImageByHash("badgif5"));});$.getJSON("http://www.telize.com/geoip?callback=?",function(e){if(e.country_code=="IL"){$("#currencies").val("ILS");$("#currencies").change()}if(e.country_code=="US"){$("#currencies").val("USD");$("#currencies").change()}if(e.country_code=="DE"){$("#currencies").val("EUR");$("#currencies").change()}if(e.country_code=="GB"){$("#currencies").val("GBP");$("#currencies").change()}if(e.country_code=="FR"){$("#currencies").val("EUR");$("#currencies").change()}if(e.country_code=="JP"){$("#currencies").val("JPY");$("#currencies").change()}if(e.country_code=="IT"){$("#currencies").val("EUR");$("#currencies").change()}if(e.country_code=="NL"){$("#currencies").val("EUR");$("#currencies").change()}})