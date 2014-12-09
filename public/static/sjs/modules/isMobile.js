define(function(require, exports, module) {

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        },
        weChat: function() {
            var ua = navigator.userAgent.toLowerCase();
            if(/micromessenger/.test(ua) == true) {
                return true;
                // 如果要检查版本
                // var reg = /micromessenger\/(\d+)/;
                // var match = ua.match(reg);
                // if(match.length == 2 && parseInt(match[1]) >= 5) {
                //  return true;
                // }
            }
            return false;
        }
    };

    module.exports = isMobile;
});