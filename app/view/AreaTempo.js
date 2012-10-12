Ext.define('JSDJ.view.AreaTempo',{
    extend: 'Ext.Panel',
    xtype: 'areatempo',

    config: {
        layout: 'vbox',
        margin: 5,
        items: [
            {
                xtype: 'devicebutton',
                cls: 'jsdj-centercmp',
                iconCls: 'music2',
                iconMask: true
            },
            {
                xtype: 'knob',
                cls: 'jsdj-centercmp jsdj-pitchknob',
                label: 'pitchknob',
                minValue: 1,
                maxValue: 200,
                value: 100
            },
            {
                layout: 'hbox',
                items: [
                    {
                        xtype: 'devicebutton',
                        iconCls: 'minus1',
                        iconMask: true
                    },
                    {
                        xtype: 'devicebutton',
                        iconCls: 'add',
                        iconMask: true
                    }
                ]
            },
            {
                xtype: 'devicebutton',
                cls: 'jsdj-centercmp',
                text: 'Sync'
            }

        ]
    }
});