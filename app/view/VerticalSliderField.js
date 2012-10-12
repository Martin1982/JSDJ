Ext.define('JSDJ.view.VerticalSliderField', {
    extend: 'Ext.field.Slider',
    xtype: 'vsliderfield',

    config: {
        cls: Ext.baseCSSPrefix + 'vslider-field'
    },

    // @private
    applyComponent: function(config) {
        return Ext.factory(config, JSDJ.view.VerticalSlider);
    }
});