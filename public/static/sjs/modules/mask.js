define(function(require, exports, module) {

    function Mask() {
        this.$div = $('<div style="display:none;"><div class="__private_mask_show">正在载入...</div></div>').appendTo('body').css({
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 3000,
            backgroundColor: '#000',
            opacity: '0.5',
        });
        $(".__private_mask_show").css({
            position: 'absolute',
            width: '100px',
            height: '24px',
            background: '#000',
            borderRadius: '3px',
            fontSize: '14px',
            color: '#fff',
            lineHeight: '24px',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-50px',
            textAlign: 'center',
        });
    }

    Mask.prototype.show = function() {
        this.$div.show().parent().css({overflow:'hidden'});
        return this;
    };

    Mask.prototype.zIndex = function(zindex) {
        this.$div.css({
            zIndex: zindex,
        });
        return this;
    }

    Mask.prototype.hide = function() {
        this.$div.hide().parent().css({overflow:'auto'});
        return this;
    };

    Mask.prototype.pureWhite = function() {
        this.$div.css({
            backgroundColor: '#fff',
            opacity: '1'
        });
        return this;
    }

    Mask.prototype.trans = function() {
        this.$div.css({
            backgroundColor: 'transparent',
            opacity: '0'
        });
        return this;
    };

    Mask.prototype.setColor = function(colorStr) {
        this.$div.css({
            backgroundColor: colorStr,
            opacity: '0.5'
        });
        return this;
    };

    module.exports = Mask;

});