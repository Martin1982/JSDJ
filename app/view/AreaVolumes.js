Ext.define('JSDJ.view.AreaVolumes',{
    extend: 'Ext.Panel',
    xtype: 'areavolumes',

    config: {
        layout: 'vbox',
        cls: 'jsdj-tones',
        margin: 15,
        items: [
            {
                xtype: 'knob',
                label: 'Treble'
            },
            {
                xtype: 'knob',
                label: 'Medium'
            },
            {
                xtype: 'knob',
                label: 'Bass'
            },
            {
                xtype: 'devicebutton',
                cls: 'jsdj-centercmp',
                iconCls: 'headphones',
                iconMask: true
            },
            {
                xtype: 'vsliderfield',
                value: 100,
                minValue: 0,
                maxValue: 100,
                label: 'Volume'
            }
        ]
    }
});