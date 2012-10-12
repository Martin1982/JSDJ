Ext.define("JSDJ.view.DeckOuter", {
    extend: 'Ext.Panel',
    xtype: 'outerdeck',
    requires: ['Ext.field.Slider'],

    config: {
        deck: 0,
        side: 'left',
        flex: 3,
        layout: 'hbox',
        items:[]
    }
});