!function e(t,i,n){function a(s,o){if(!i[s]){if(!t[s]){var u="function"==typeof require&&require;if(!o&&u)return u(s,!0);if(r)return r(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var c=i[s]={exports:{}};t[s][0].call(c.exports,function(e){var i=t[s][1][e];return a(i?i:e)},c,c.exports,e,t,i,n)}return i[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)a(n[s]);return a}({1:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n={num_rows:4,num_cols:4,tile_width:document.getElementById("game").offsetWidth/4,tile_height:document.getElementById("game").offsetWidth/4,images:["../img/tiles/img1","../img/tiles/img2","../img/tiles/img3","../img/tiles/img4","../img/tiles/img5","../img/tiles/img6","../img/tiles/img7","../img/tiles/img8"],hashids:{salt:"sgdN78tYeYd3rGIyMVDW2CWetDHq8xp5",length:8,alphabet:"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"}};i["default"]=n},{}],2:[function(e,t,i){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=function(){window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}()},a=function(e){var t=e+".jpg",i=new Image;return i.src=t,i};i.helpers=n,i.getImage=a},{}],3:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}var a=e("./tile"),r=n(a),s=e("./config"),o=n(s),u=e("./helpers");(0,u.helpers)();var l=function(){function e(){console.log("clear"),s=setTimeout(function(e){for(var t=0;t<d.length;t++)d[t].isMatch||d[t].fix||d[t].drawFaceDown();h=[]},1e3)}function t(e,t){if(t){$("#game").addClass("done"),$(".overlay").addClass("active");var i=[(f+"").slice(0,-2),(f+"").slice(-2)];$(".is-time").text(i[0]+"', "+i[1]+'"'),$(".is-clicks").text(m),setTimeout(function(){$(".overlay").addClass("fadein"),$("body").addClass("is-finished")},1e3)}}$("#game").replaceWith('<canvas id="game"></canvas>');var i=document.getElementById("game"),n=i.getContext("2d"),a=(new Image,!1),s=void 0,l=0,c=0,f=0,d=[],h=[],m=0,g=0,w=document.getElementById("game").offsetWidth;document.getElementById("game").width=w,document.getElementById("game").height=w,n.fillStyle="#ffffff",n.fillRect(0,0,w,w);for(var v=o["default"].images.map(function(e){return(0,u.getImage)(e)}),p=v.slice(0),y=[],_=0;_<o["default"].num_cols*o["default"].num_rows/2;_++){var x=Math.floor(p.length*Math.random(p.length)),M=p[x];y.push(M),y.push(M),p.splice(x,1)}y.sort(function(){return.5-Math.random()});for(var F=0;F<o["default"].num_cols;F++)for(var b=0;b<o["default"].num_rows;b++)d.push(new r["default"]({x:F*o["default"].tile_width,y:b*o["default"].tile_height,face:y.pop(),context:n}));for(var D=0;D<d.length;D++)d[D].drawFaceDown();h=[],m=0,g=0,i.addEventListener("click",function(i){if(!a){var n;!function(){var e=function(e){return 10>e?"0"+e:e},t=function r(){window.requestAnimFrame(function(){new Date;c=(new Date).getTime()-i;var t=new Date(c);l=Math.floor(c/10),$(".user__time").text(e(t.getMinutes())+":"+e(t.getSeconds())),a&&r()})};n=new Hashids(o["default"].hashids.salt,o["default"].hashids.length,o["default"].hashids.alphabet),a=!0;var i=((new Date).getMinutes(),(new Date).getSeconds(),(new Date).getTime());t()}()}if(2===h.length){clearTimeout(s);for(var r=0;r<d.length;r++)d[r].isMatch||d[r].drawFaceDown();h=[]}for(var u=0;u<d.length;u++)d[u].isUnderMouse(i.offsetX,i.offsetY)&&(d[u].isFaceUp||h.length<2&&(d[u].drawFaceUp(),h.push(d[u]),2===h.length&&(m++,$(".user__clicks").text(m),h[0].face===h[1].face?(h[0].isMatch=!0,h[1].isMatch=!0):requestAnimFrame(e))));for(var g=!0,w=0;w<d.length;w++)g=g&&d[w].isMatch;if(g){var n=new Hashids(o["default"].hashids.salt,o["default"].hashids.length,o["default"].hashids.alphabet);a=!1,f=c+"",f=f.slice(0,-1),t({clicks:m,time:f,nonce:n.encode([m,l])},!0)}})};$(".js-restart").click(function(e){e.preventDefault(),$(".user__time").text("00:00"),$(".user__clicks").text("0"),$("#game").removeClass("done"),$(".overlay").removeClass("active"),$(".overlay").removeClass("fadein"),$("body").removeClass("is-finished"),l()}),l()},{"./config":1,"./helpers":2,"./tile":4}],4:[function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(i,"__esModule",{value:!0});var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),s=e("./config"),o=n(s),u=function(){function e(t,i){a(this,e),this.x=t.x,this.y=t.y,this.face=t.face,this.isFaceUp=!1,this.isMatch=!1,this.width=o["default"].tile_width,this.context=t.context}return r(e,[{key:"drawFaceDown",value:function(){var e=this,t=new Image;t.src="../img/tiles/tile.jpg",t.width=this.width,t.onload=function(){e.context.clearRect(e.x,e.y,e.width,e.height),e.context.globalCompositeOperation="source-atop",e.context.drawImage(t,e.x,e.y,e.width,e.width)},this.isFaceUp=!1}},{key:"drawFaceUp",value:function(){var e=this;this.context.fillStyle="white",setTimeout(function(){e.context.drawImage(e.face,e.x,e.y,e.width,e.width),e.isFaceUp=!0},100)}},{key:"isUnderMouse",value:function(e,t){return e>=this.x&&e<=this.x+this.width&&t>=this.y&&t<=this.y+this.width}}]),e}();i["default"]=u},{"./config":1}]},{},[3]);