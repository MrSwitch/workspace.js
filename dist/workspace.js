!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function mobile(){return _utilsDomDocumentElement2["default"].offsetWidth<MOBILE_WIDTH}function initFrameset(frameset){_utilsDomAddClass2["default"](frameset,"frameset");var frames=frameset.children;_utilsDomAddClass2["default"](frames,"frame");var active_frame=_utilsDomFind2["default"](frames,".active");active_frame||(active_frame=_utilsDomFind2["default"](frames,".frame-main")||frames[0],_utilsDomAddClass2["default"](active_frame,"active")),_utilsDomEach2["default"](frames,function(frame){_utilsEventsOn2["default"](frame,"active",function(){return showFrame(frame)})});var frames_controls=_utilsDetectFlex2["default"]?_utilsDomFilter2["default"](frames,":not(.flex)"):frames;return _utilsDomEach2["default"](frames_controls,createFrameControls),_utilsEventsOn2["default"](frameset,"fillframe",function(){if(!mobile()){var diff=_utilsDomCssCalc2["default"](frameset).width,fill_frames=_utilsDomFilter2["default"](frames,":not(.pinned)");_utilsDomEach2["default"](fill_frames,function(frame){var w=_utilsDomCssCalc2["default"](frame).width;diff-=w,setFrameWidth(frame,w)}),_utilsDomEach2["default"](fill_frames,function(frame){if(0!==diff){var style=_utilsDomCssCalc2["default"](frame),min=parseInt(style.minWidth,10)||0,max=parseInt(style.maxWidth,10)||0,wid=frame.offsetWidth;min>wid+diff?(diff+=wid-min,wid=min):wid+diff>max&&max>0?(diff-=wid-max,wid=max):(wid+=diff,diff=0),setFrameWidth(frame,wid)}})}}),_utilsEventsSwipe2["default"](frameset.parentNode,function(e){if(mobile()){var a=_utilsDomFind2["default"](frames,".active"),W=frameset.parentNode.offsetWidth,n=frames.length,i=_utilsDomIndex2["default"](a),b=a;switch(e.gesture.type){case"dragleft":case"dragright":e.preventDefault(),e.stopPropagation();var fo=-(100/n*i),dx=100/W*e.gesture.deltaX/n;return(0===i&&"right"===e.gesture.direction||i===n-1&&"left"===e.gesture.direction)&&(dx*=.3),_utilsDomTransform2["default"](frameset,"translateX",fo+dx+"%"),void _utilsDomCss2["default"](frameset,{WebkitTransition:"-webkit-transform 0s",mozTransition:"-moz-transform 0s",transition:"transform 0s"});case"swipeleft":b=a.nextElementSibling;break;case"swiperight":b=a.previousElementSibling;break;case"release":Math.abs(e.gesture.deltaX)>W/2&&(b="right"===e.gesture.direction?a.previousElementSibling:a.nextElementSibling)}return _utilsDomCss2["default"](frameset,{WebkitTransition:"",mozTransition:"",transition:""}),b||(b=a),_utilsEventsEmit2["default"](b,"active"),!0}}),_utilsDetectTouch2["default"]||(_utilsEventsOn2["default"](window,"resize",function(){_utilsEventsEmit2["default"](frameset,"fillframe")}),_utilsEventsEmit2["default"](frameset,"fillframe")),frameset}function showFrame(frame){var toggle=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],frameset=frame.parentNode,frames=frameset.children,i=_utilsDomIndex2["default"](frame),links=_utilsDomEach2["default"](".frame-nav a"),link=links[i];if(link&&_utilsDomToggleClass2["default"](links,"active",function(el){return el===link}),_utilsDomToggleClass2["default"](frames,"active",function(el){return el===frame}),mobile()){var x="-"+i/frames.length*100+"%";_utilsDomTransform2["default"](frameset,"translateX",x)}else toggle?_utilsDomToggleClass2["default"]([frame,link],"pinned"):_utilsDomRemoveClass2["default"]([frame,link],"pinned");_utilsEventsEmit2["default"](frameset,"fillframe")}function createFrameControls(frame){var btn=_utilsDomCreateElement2["default"]("button",{className:"resize"});frame.appendChild(btn),_utilsEventsTouch2["default"](btn,function(e,o){if(!o)return!1;var diff=e.screenX-o.screenX;if(0!==diff){var style,width,frm=frame,prev=frame;"0px"===_utilsDomCssCalc2["default"](btn).left&&(prev=frm=prev.previousElementSibling);do if(width=prev.offsetWidth+diff,style=_utilsDomCssCalc2["default"](prev),!(width>parseInt(style.maxWidth,10)||width<parseInt(style.minWidth,10))){passed=!0;break}while((prev=prev.previousElementSibling)&&prev);if(prev){for(var nwidth,next=frm,passed=!1;next.nextElementSibling;)if(next=next.nextElementSibling,nwidth=next.offsetWidth-diff,style=_utilsDomCssCalc2["default"](next),!(nwidth>parseInt(style.maxWidth,10)||nwidth<parseInt(style.minWidth,10))){passed=!0;break}passed&&(setFrameWidth(prev,width),setFrameWidth(next,nwidth))}}})}function setFrameWidth(frame,width){frame=_utilsDetectFlex2["default"]?_utilsDomFilter2["default"](frame,":not(.flex)"):frame,_utilsDomCss2["default"](frame,{width:width+"px"})}Object.defineProperty(exports,"__esModule",{value:!0});var _utilsDetectFlex=require("./utils/detect/flex"),_utilsDetectFlex2=_interopRequireDefault(_utilsDetectFlex);require("./utils/detect/legacyflex"),require("./utils/detect/transform");var _utilsDetectTouch=require("./utils/detect/touch"),_utilsDetectTouch2=_interopRequireDefault(_utilsDetectTouch),_utilsEventsEmit=require("./utils/events/emit"),_utilsEventsEmit2=_interopRequireDefault(_utilsEventsEmit),_utilsEventsOn=require("./utils/events/on"),_utilsEventsOn2=_interopRequireDefault(_utilsEventsOn),_utilsEventsDelegate=require("./utils/events/delegate"),_utilsEventsDelegate2=_interopRequireDefault(_utilsEventsDelegate),_utilsEventsReady=require("./utils/events/ready"),_utilsEventsReady2=_interopRequireDefault(_utilsEventsReady),_utilsEventsSwipe=require("./utils/events/swipe"),_utilsEventsSwipe2=_interopRequireDefault(_utilsEventsSwipe),_utilsEventsTouch=require("./utils/events/touch"),_utilsEventsTouch2=_interopRequireDefault(_utilsEventsTouch),_utilsDomTransform=require("./utils/dom/transform"),_utilsDomTransform2=_interopRequireDefault(_utilsDomTransform),_utilsDomDocumentElement=require("./utils/dom/documentElement"),_utilsDomDocumentElement2=_interopRequireDefault(_utilsDomDocumentElement),_utilsDomCreateElement=require("./utils/dom/createElement"),_utilsDomCreateElement2=_interopRequireDefault(_utilsDomCreateElement),_utilsDomParents=require("./utils/dom/parents"),_utilsDomParents2=_interopRequireDefault(_utilsDomParents),_utilsDomAttr=require("./utils/dom/attr"),_utilsDomIndex=(_interopRequireDefault(_utilsDomAttr),require("./utils/dom/index")),_utilsDomIndex2=_interopRequireDefault(_utilsDomIndex),_utilsDomEach=require("./utils/dom/each"),_utilsDomEach2=_interopRequireDefault(_utilsDomEach),_utilsDomQuery=require("./utils/dom/query"),_utilsDomQuery2=_interopRequireDefault(_utilsDomQuery),_utilsDomFilter=require("./utils/dom/filter"),_utilsDomFilter2=_interopRequireDefault(_utilsDomFilter),_utilsDomFind=require("./utils/dom/find"),_utilsDomFind2=_interopRequireDefault(_utilsDomFind),_utilsDomCss=require("./utils/dom/css"),_utilsDomCss2=_interopRequireDefault(_utilsDomCss),_utilsDomCssCalc=require("./utils/dom/cssCalc"),_utilsDomCssCalc2=_interopRequireDefault(_utilsDomCssCalc),_utilsDomAddClass=require("./utils/dom/addClass"),_utilsDomAddClass2=_interopRequireDefault(_utilsDomAddClass),_utilsDomToggleClass=require("./utils/dom/toggleClass"),_utilsDomToggleClass2=_interopRequireDefault(_utilsDomToggleClass),_utilsDomRemoveClass=require("./utils/dom/removeClass"),_utilsDomRemoveClass2=_interopRequireDefault(_utilsDomRemoveClass),_utilsDomHasClass=require("./utils/dom/hasClass"),MOBILE_WIDTH=(_interopRequireDefault(_utilsDomHasClass),650);_utilsEventsDelegate2["default"](".frames .workspace-back","click",function(e){var frame=_utilsDomParents2["default"](e.target,".frame");frame&&(prev=frame.previousElementSibling,prev&&_utilsEventsEmit2["default"](prev,"active"))}),_utilsEventsOn2["default"](window,"resize",function(){_utilsDomEach2["default"](".frameset",function(frameset){var frames=frameset.querySelectorAll(".frame"),frameWidth="",setWidth="";mobile()?(frameWidth=frameset.parentNode.offsetWidth,setWidth=frames.length*frameWidth,setWidth+="px",frameWidth+="px"):_utilsDomTransform2["default"](frameset,"translateX",""),_utilsDomCss2["default"](frameset,{width:setWidth}),_utilsDomCss2["default"](frames,{width:frameWidth});var selected=_utilsDomQuery2["default"](".frame.active",frameset);_utilsEventsEmit2["default"](selected,"active")})}),_utilsEventsReady2["default"](function(){_utilsEventsOn2["default"](document.body,"keydown",function(e){var el;switch(e.which){case 37:el=_utilsDomQuery2["default"](".frameset .frame.active").previousElementSibling;break;case 39:el=_utilsDomQuery2["default"](".frameset .frame.active").nextElementSibling}el&&_utilsEventsEmit2["default"](el,"active")})}),exports["default"]=function(match){_utilsDomEach2["default"](match,initFrameset)},module.exports=exports["default"]},{"./utils/detect/flex":4,"./utils/detect/legacyflex":5,"./utils/detect/touch":7,"./utils/detect/transform":8,"./utils/dom/addClass":10,"./utils/dom/attr":11,"./utils/dom/createElement":12,"./utils/dom/css":13,"./utils/dom/cssCalc":14,"./utils/dom/documentElement":15,"./utils/dom/each":16,"./utils/dom/filter":17,"./utils/dom/find":18,"./utils/dom/hasClass":19,"./utils/dom/index":20,"./utils/dom/parents":22,"./utils/dom/query":23,"./utils/dom/removeClass":24,"./utils/dom/toggleClass":25,"./utils/dom/transform":26,"./utils/events/delegate":28,"./utils/events/emit":29,"./utils/events/on":30,"./utils/events/ready":31,"./utils/events/swipe":32,"./utils/events/touch":33}],2:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function sidemenu(query){_utilsDomEach2["default"](query,function(nav){var toggle=_utilsDomCreateElement2["default"]("button",{innerText:"Close",className:"toggle-frame-nav"});nav.appendChild(toggle),_utilsEventsOn2["default"](".toggle-frame-nav","click",function(e){e.preventDefault(),e.stopPropagation(),_utilsDomToggleClass2["default"](_utilsDomDocumentElement2["default"],"show-frame-nav")}),_utilsDomEach2["default"](".frameset .frame",function(frame){var name=frame.getAttribute("data-framename")||frame.title,link=_utilsDomCreateElement2["default"]("a",{innerText:name});_utilsDomAttr2["default"](link,{"data-frmindex":_utilsDomIndex2["default"](frame)}),nav.appendChild(link),_utilsEventsOn2["default"](link,"click",function(){_utilsEventsEmit2["default"](frame,"active")}),_utilsEventsOn2["default"](frame,"pinned",function(e){_utilsDomToggleClass2["default"](link,"pinned")})}),_utilsEventsOn2["default"](document.body,"click",function(e){_utilsDomHasClass2["default"](_utilsDomDocumentElement2["default"],"show-frame-nav")&&!_utilsDomParents2["default"](e.target,".frame-nav").length&&(e.preventDefault(),e.stopPropagation(),_utilsDomRemoveClass2["default"](_utilsDomDocumentElement2["default"],"show-frame-nav"))}),document.body.appendChild(nav)})}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=sidemenu;var _utilsEventsEmit=require("./utils/events/emit"),_utilsEventsEmit2=_interopRequireDefault(_utilsEventsEmit),_utilsEventsOn=require("./utils/events/on"),_utilsEventsOn2=_interopRequireDefault(_utilsEventsOn),_utilsDomCss=require("./utils/dom/css"),_utilsDomDocumentElement=(_interopRequireDefault(_utilsDomCss),require("./utils/dom/documentElement")),_utilsDomDocumentElement2=_interopRequireDefault(_utilsDomDocumentElement),_utilsDomCreateElement=require("./utils/dom/createElement"),_utilsDomCreateElement2=_interopRequireDefault(_utilsDomCreateElement),_utilsDomParents=require("./utils/dom/parents"),_utilsDomParents2=_interopRequireDefault(_utilsDomParents),_utilsDomToggleClass=require("./utils/dom/toggleClass"),_utilsDomToggleClass2=_interopRequireDefault(_utilsDomToggleClass),_utilsDomRemoveClass=require("./utils/dom/removeClass"),_utilsDomRemoveClass2=_interopRequireDefault(_utilsDomRemoveClass),_utilsDomHasClass=require("./utils/dom/hasClass"),_utilsDomHasClass2=_interopRequireDefault(_utilsDomHasClass),_utilsDomAttr=require("./utils/dom/attr"),_utilsDomAttr2=_interopRequireDefault(_utilsDomAttr),_utilsDomIndex=require("./utils/dom/index"),_utilsDomIndex2=_interopRequireDefault(_utilsDomIndex),_utilsDomEach=require("./utils/dom/each"),_utilsDomEach2=_interopRequireDefault(_utilsDomEach);module.exports=exports["default"]},{"./utils/dom/attr":11,"./utils/dom/createElement":12,"./utils/dom/css":13,"./utils/dom/documentElement":15,"./utils/dom/each":16,"./utils/dom/hasClass":19,"./utils/dom/index":20,"./utils/dom/parents":22,"./utils/dom/removeClass":24,"./utils/dom/toggleClass":25,"./utils/events/emit":29,"./utils/events/on":30}],3:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=function(property,enabled){document.documentElement.className=document.documentElement.className+" "+(enabled?"":"no-")+property},module.exports=exports["default"]},{}],4:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _prefix=require("./prefix"),_prefix2=_interopRequireDefault(_prefix),_CSSSupports=require("./CSSSupports"),_CSSSupports2=_interopRequireDefault(_CSSSupports),result=_prefix2["default"]("FlexWrap");_CSSSupports2["default"]("flex",result),exports["default"]=result,module.exports=exports["default"]},{"./CSSSupports":3,"./prefix":6}],5:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _prefix=require("./prefix"),_prefix2=_interopRequireDefault(_prefix),_CSSSupports=require("./CSSSupports"),_CSSSupports2=_interopRequireDefault(_CSSSupports),result=_prefix2["default"]("BoxDirection");_CSSSupports2["default"]("legacyflex",result),exports["default"]=result,module.exports=exports["default"]},{"./CSSSupports":3,"./prefix":6}],6:[function(require,module,exports){"use strict";function prefix(prop){var s=document.createElement("div").style;return void 0!==s[prop]||void 0!==s["Moz"+prop]||void 0!==s["Webkit"+prop]||void 0!==s["ms"+prop]||void 0!==s[prop.replace(/^./,function(m){return m.toUpperCase()})]}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=prefix,module.exports=exports["default"]},{}],7:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _CSSSupports=require("./CSSSupports"),_CSSSupports2=_interopRequireDefault(_CSSSupports),result="ontouchstart"in window;_CSSSupports2["default"]("touch",result),exports["default"]=result,module.exports=exports["default"]},{"./CSSSupports":3}],8:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _prefix=require("./prefix"),_prefix2=_interopRequireDefault(_prefix),_CSSSupports=require("./CSSSupports"),_CSSSupports2=_interopRequireDefault(_CSSSupports),result=_prefix2["default"]("transform");_CSSSupports2["default"]("transform",result),exports["default"]=result,module.exports=exports["default"]},{"./CSSSupports":3,"./prefix":6}],9:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _prefix=require("./prefix"),_prefix2=_interopRequireDefault(_prefix),_CSSSupports=require("./CSSSupports"),_CSSSupports2=_interopRequireDefault(_CSSSupports),result=_prefix2["default"]("perspective");_CSSSupports2["default"]("transform3d",result),exports["default"]=result,module.exports=exports["default"]},{"./CSSSupports":3,"./prefix":6}],10:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _each=require("./each"),_each2=_interopRequireDefault(_each),_hasClass=require("./hasClass"),_hasClass2=_interopRequireDefault(_hasClass);exports["default"]=function(elements,className){return _each2["default"](elements,function(el){_hasClass2["default"](el,className)||(el.className+=" "+className)})},module.exports=exports["default"]},{"./each":16,"./hasClass":19}],11:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _each=require("./each"),_each2=_interopRequireDefault(_each);exports["default"]=function(elements,props){return _each2["default"](elements,function(element){for(var x in props)element.setAttribute(x,props[x])})},module.exports=exports["default"]},{"./each":16}],12:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _objectExtend=require("../object/extend"),_objectExtend2=_interopRequireDefault(_objectExtend);exports["default"]=function(tagName,prop){var elm=document.createElement(tagName);return _objectExtend2["default"](elm,prop),elm},module.exports=exports["default"]},{"../object/extend":35}],13:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function css(elements,props){return _each2["default"](elements,function(el){for(var key in props)el.style[key]=props[key]})}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=css;var _each=require("./each"),_each2=_interopRequireDefault(_each);module.exports=exports["default"]},{"./each":16}],14:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _each=require("./each"),_each2=_interopRequireDefault(_each);exports["default"]=function(elements){var elm=_each2["default"](elements)[0];return window.getComputedStyle(elm)},module.exports=exports["default"]},{"./each":16}],15:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=document.documentElement,module.exports=exports["default"]},{}],16:[function(require,module,exports){"use strict";function each(matches){var callback=arguments.length<=1||void 0===arguments[1]?function(){}:arguments[1];if(matches instanceof Element||matches instanceof HTMLDocument||matches instanceof Window)return callback(matches),[matches];if("string"==typeof matches&&(matches=document.querySelectorAll(matches)),callback)for(var i=0;i<matches.length;i++)callback.call(matches[i],matches[i],i);return matches||[]}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=each,module.exports=exports["default"]},{}],17:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _each=require("./each"),_each2=_interopRequireDefault(_each),_matches=require("./matches"),_matches2=_interopRequireDefault(_matches);exports["default"]=function(elements,match){var a=[];return _each2["default"](elements,function(el){_matches2["default"](el,match)&&a.push(el)}),a},module.exports=exports["default"]},{"./each":16,"./matches":21}],18:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _until=require("./until"),_until2=_interopRequireDefault(_until),_matches=require("./matches"),_matches2=_interopRequireDefault(_matches);exports["default"]=function(elements,match){return _until2["default"](elements,function(el){return _matches2["default"](el,match)?el:void 0})},module.exports=exports["default"]},{"./matches":21,"./until":27}],19:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _until=require("./until"),_until2=_interopRequireDefault(_until);exports["default"]=function(elements,className){var reg=new RegExp("(^|\\s)"+className+"($|\\s)","i");return _until2["default"](elements,function(el){return el.className&&el.className.match(reg)})},module.exports=exports["default"]},{"./until":27}],20:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=function(elem){return Array.prototype.indexOf.call(elem.parentNode.children,elem)},module.exports=exports["default"]},{}],21:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _until=require("./until"),_until2=_interopRequireDefault(_until);exports["default"]=function(elements,query){var handler=query;return"string"==typeof query&&(handler=function(el){var func=el.matches||el.mozMatchesSelector||el.webkitMatchesSelector||el.msMatchesSelector||el.oMatchesSelector;return func.call(el,query)}),_until2["default"](elements,handler)},module.exports=exports["default"]},{"./until":27}],22:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _each=require("./each"),_each2=_interopRequireDefault(_each),_matches=require("./matches"),_matches2=_interopRequireDefault(_matches),documentElement=document.documentElement;exports["default"]=function(elements,match){var m=[];return _each2["default"](elements,function(el){for(;el&&el.parentNode&&(el=el.parentNode,el===document&&(el=documentElement),_matches2["default"](el,match)&&m.push(el),el!==documentElement););}),m},module.exports=exports["default"]},{"./each":16,"./matches":21}],23:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=function(query){var parent=arguments.length<=1||void 0===arguments[1]?document:arguments[1];return parent.querySelector(query)},module.exports=exports["default"]},{}],24:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _each=require("./each"),_each2=_interopRequireDefault(_each);exports["default"]=function(elements,className){var reg=new RegExp("(^|\\s)"+className+"($|\\s)","ig");return _each2["default"](elements,function(el){el.className=el.className.replace(reg," ")})},module.exports=exports["default"]},{"./each":16}],25:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _each=require("./each"),_each2=_interopRequireDefault(_each),_addClass=require("./addClass"),_addClass2=_interopRequireDefault(_addClass),_removeClass=require("./removeClass"),_removeClass2=_interopRequireDefault(_removeClass),_hasClass=require("./hasClass"),_hasClass2=_interopRequireDefault(_hasClass);exports["default"]=function(elements,className,condition){return"function"!=typeof condition&&(condition=function(el){return!_hasClass2["default"](el,className)}),_each2["default"](elements,function(el){condition(el)?_addClass2["default"](el,className):_removeClass2["default"](el,className)})},module.exports=exports["default"]},{"./addClass":10,"./each":16,"./hasClass":19,"./removeClass":24}],26:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function transform(element,prop,value){var x=prop+"("+value+")";_detectTransform3d2["default"]&&"translateX"===prop&&(x="translate3d(0,0,0) translate("+(value||"0")+",0)");var o={transform:x,msTransform:x,MozTransform:x,WebkitTransform:x};return _css2["default"](element,o)}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=transform;var _css=require("./css"),_css2=_interopRequireDefault(_css),_detectTransform3d=require("../detect/transform3d"),_detectTransform3d2=_interopRequireDefault(_detectTransform3d);module.exports=exports["default"]},{"../detect/transform3d":9,"./css":13}],27:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _each=require("./each"),_each2=_interopRequireDefault(_each);exports["default"]=function(elements,callback){var bool;return _each2["default"](elements,function(el){bool||(bool=callback(el))}),bool},module.exports=exports["default"]},{"./each":16}],28:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function delegate(match,eventName,handler){var root=arguments.length<=3||void 0===arguments[3]?document:arguments[3];return _on2["default"](root,eventName,function(e){_domMatches2["default"](e.target,match)&&handler(e)})}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=delegate;var _on=require("./on"),_on2=_interopRequireDefault(_on),_domMatches=require("../dom/matches"),_domMatches2=_interopRequireDefault(_domMatches);module.exports=exports["default"]},{"../dom/matches":21,"./on":30}],29:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function emit(elements,eventname){return _domEach2["default"](elements,function(el){el.dispatchEvent(new Event(eventname))})}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=emit;var _domEach=require("../dom/each"),_domEach2=_interopRequireDefault(_domEach);module.exports=exports["default"]},{"../dom/each":16}],30:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function on(elements,eventnames,callback){var useCapture=arguments.length<=3||void 0===arguments[3]?!1:arguments[3];return eventnames=eventnames.split(/\s+/),_domEach2["default"](elements,function(el){eventnames.forEach(function(eventname){return el.addEventListener(eventname,callback,useCapture)})})}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=on;var _domEach=require("../dom/each"),_domEach2=_interopRequireDefault(_domEach);module.exports=exports["default"]},{"../dom/each":16}],31:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function ready(callback){"loading"!==document.readyState&&document.body?callback():_on2["default"](document,"DOMContentLoaded",callback)}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=ready;var _on=require("./on"),_on2=_interopRequireDefault(_on);module.exports=exports["default"]},{"./on":30}],32:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function swipe(elements,callback){return _touch2["default"](elements,function(e,o,s){e.gesture.type="drag"+e.gesture.direction,callback.call(this,e)},function(e){},function(e,s){e.gesture.deltaTime<200&&e.gesture.distance>20&&e.gesture.velocity>.3?e.gesture.type="swipe"+e.gesture.direction:e.gesture.type="release",callback.call(this,e)})}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=swipe;var _touch=require("./touch"),_touch2=_interopRequireDefault(_touch);module.exports=exports["default"]},{"./touch":33}],33:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function touch(elements,callback,start,complete){var _this=this;_domEach2["default"](elements,function(element){var cb={},mv={},fin={};_on2["default"](document,"mousemove MSPointerMove touchmove",function(e){if(e.type.match(/touch/i),!e.type.match(/mouse/i)||1===e.which){var i=e.pointerId||0,func=cb[i],o=mv[i];gesture(e,o),func&&"function"==typeof func&&func.call(_this,e,o),mv[i]=e}}),_on2["default"](document,"mouseup MSPointerUp touchend touchcancel",function(e){var i=e.pointerId||0;cb[i]=null,("touchend"===e.type||"touchcancel"===e.type)&&(e=mv[i]);var func=fin[i];func&&func.call(_this,e),fin[i]=null}),_on2["default"](element,"touchend",function(e){console.log("el:touchend"),console.log(e)}),_on2["default"](element,"selectstart",function(e){return!1}),_on2["default"](element,"mousedown MSPointerDown touchstart",function(e){if(!("mousemove"===e.type&&"msPointerEnabled"in window.navigator)){var i=e.pointerId=e.pointerId||0;if(e.touches&&e.touches.length){var ts=e.timeStamp;e=e.touches[0],e.timeStamp=ts}gesture(e),mv[i]=e,cb[i]=function(_e,o){gesture(_e,e),callback.call(element,_e,o,e)},fin[i]=function(_e){complete&&(gesture(_e,e),complete.call(element,_e,e))},start&&start.call(element,e)}})})}function gesture(e,o){if(e.gesture={},e&&e.touches&&e.touches.length>0?e.gesture.touches=e.touches:e.gesture.touches=[e],e.gesture.screenX=e.gesture.touches[0].screenX,e.gesture.screenY=e.gesture.touches[0].screenY,o){e.gesture.deltaTime=e.timeStamp-o.timeStamp;var dx=e.gesture.deltaX=e.gesture.screenX-o.gesture.screenX,dy=e.gesture.deltaY=e.gesture.screenY-o.gesture.screenY;Math.abs(dy)>Math.abs(dx)?e.gesture.direction=dy>0?"up":"down":e.gesture.direction=dx>0?"right":"left",e.gesture.distance=Math.sqrt(dx*dx+dy*dy),e.gesture.velocity=e.gesture.distance/e.gesture.deltaTime}}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=touch;var _on=require("./on"),_on2=_interopRequireDefault(_on),_domEach=require("../dom/each"),_domEach2=_interopRequireDefault(_domEach);module.exports=exports["default"]},{"../dom/each":16,"./on":30}],34:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function check(el){var h=el.offsetHeight,t=el.scrollTop,a=Array.prototype.slice.call(el.querySelectorAll("img[data-src]"));a=a.filter(function(img){var _t=img.offsetTop,_h=img.offsetHeight;return _t+_h>=t&&t+h>=_t}),a.forEach(function(img){img.src=img.getAttribute("data-src"),img.removeAttribute("data-src");var errorSrc=img.getAttribute("data-src-error");errorSrc&&(img.onerror=function(){img.src=errorSrc}),images.indexOf(img.src)>-1?show(img):img.onload=function(){show(img),images.push(img.src)}})}function show(el){_domCss2["default"](el,{opacity:1})}Object.defineProperty(exports,"__esModule",{value:!0});var _domEach=require("../dom/each"),_domEach2=_interopRequireDefault(_domEach),_domCss=require("../dom/css"),_domCss2=_interopRequireDefault(_domCss),_eventsOn=require("../events/on"),_eventsOn2=_interopRequireDefault(_eventsOn),images=[];exports["default"]=function(elements){return _domEach2["default"](elements,function(el){_eventsOn2["default"](el,"scroll",function(){return check(el)}),check(el)})},module.exports=exports["default"]},{"../dom/css":13,"../dom/each":16,"../events/on":30}],35:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=function(r,o){for(var x in o)r[x]=o[x];return r},module.exports=exports["default"]},{}],36:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}require("./utils/detect/flex"),require("./utils/detect/legacyflex"),require("./utils/detect/transform"),require("./utils/detect/touch");
var _utilsEventsEmit=require("./utils/events/emit"),_utilsEventsEmit2=_interopRequireDefault(_utilsEventsEmit),_utilsEventsReady=require("./utils/events/ready"),_utilsEventsReady2=_interopRequireDefault(_utilsEventsReady),_utilsHelperDataSrc=require("./utils/helper/dataSrc"),_utilsHelperDataSrc2=_interopRequireDefault(_utilsHelperDataSrc),_sidemenu=require("./sidemenu"),_sidemenu2=_interopRequireDefault(_sidemenu),_frameset=require("./frameset"),_frameset2=_interopRequireDefault(_frameset);_utilsEventsReady2["default"](function(){_frameset2["default"](".frameset"),_utilsHelperDataSrc2["default"](".data-src"),_sidemenu2["default"](".frame-nav"),_utilsEventsEmit2["default"](window,"resize")})},{"./frameset":1,"./sidemenu":2,"./utils/detect/flex":4,"./utils/detect/legacyflex":5,"./utils/detect/touch":7,"./utils/detect/transform":8,"./utils/events/emit":29,"./utils/events/ready":31,"./utils/helper/dataSrc":34}]},{},[36]);
//# sourceMappingURL=workspace.js.map