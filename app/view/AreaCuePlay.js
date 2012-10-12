Ext.define('JSDJ.view.AreaCuePlay',{
    extend: 'Ext.Panel',
    xtype: 'areacueplay',

    config: {
        layout: 'hbox',
        cls: 'jsdj-cueplay',
        margin: 5,
        items: [
            {
                xtype: 'devicebutton',
                text: 'cue'
            },
            {
                xtype: 'devicebutton',
                iconCls: 'playpause',
                iconMask: true
            }
        ]
    }
});