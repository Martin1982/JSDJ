Ext.define('JSDJ.view.AreaPanels',{
    extend: 'Ext.Panel',

    config: {
        layout: 'vbox',
        margin: 15,
        cls: 'jsdj-buttons-panel',
        items: [
            { xtype: 'areatempofx' },
            { xtype: 'areascratch' },
            { xtype: 'areacueplay' }
        ]
    }
});