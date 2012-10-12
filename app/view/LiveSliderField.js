Ext.define('JSDJ.view.LiveSliderField', {
    extend  : 'Ext.field.Slider',
    requires: ['JSDJ.view.LiveSlider'],
    xtype: 'livesliderfield',

    // @private
    applyComponent: function(config) {
        return Ext.factory(config, JSDJ.view.LiveSlider);
    }
});