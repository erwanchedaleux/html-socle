/*!
 *  Socle HTML
 *  @author: Erwan Chedaleux
 *  @version: 0.0.1
 *  
*/

!function n(e,o,r){function i(c,u){if(!o[c]){if(!e[c]){var s="function"==typeof require&&require;if(!u&&s)return s(c,!0);if(t)return t(c,!0);throw new Error("Cannot find module '"+c+"'")}var f=o[c]={exports:{}};e[c][0].call(f.exports,function(n){var o=e[c][1][n];return i(o||n)},f,f.exports,n,e,o,r)}return o[c].exports}for(var t="function"==typeof require&&require,c=0;c<r.length;c++)i(r[c]);return i}({1:[function(n,e,o){(function(){function e(){o()}var o;o=n("./scripts/init/main.js"),jQuery(document).ready(function(){e()})}).call(this)},{"./scripts/init/main.js":3}],2:[function(n,e,o){e.exports=function(n){function e(e){function o(){n.cookie(t,c,{expires:365}),e.removeClass(i)}var r,i,t,c;r=e.find(".sco-close"),i="active",t="use_of_cookies",c=!0,n.cookie(t)&&!1!==n.cookie(t)||(e.prependTo("#main"),e.addClass(i)),r.on("click",o)}return e}(jQuery)},{}],3:[function(n,e,o){e.exports=function(e){function o(){var o,r;o=n("../cookies.js"),r=e(".site-cookies"),r.length&&new o(r)}return o}(jQuery)},{"../cookies.js":2}]},{},[1]);