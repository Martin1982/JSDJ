Ext.define('JSDJ.view.VerticalThumb', {
    extend: 'Ext.slider.Thumb',
    xtype: 'verticalthumb',

    config: {
        baseCls: Ext.baseCSSPrefix + 'vthumb',
        draggable: {
            direction: 'vertical'
        }
    },

    elementHeight: 0,

    onPainted: function() {
        this.elementHeight = this.element.dom.offsetHeight;
    },

    getElementHeight: function() {
        return this.elementHeight;
    }
});