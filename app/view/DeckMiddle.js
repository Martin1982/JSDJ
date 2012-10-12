Ext.define("JSDJ.view.DeckMiddle", {
    extend: 'Ext.Panel',
    xtype: 'middledeck',
    requires: ['Ext.field.Slider'],

    config: {
        flex: 1,
        layout: {
            type: 'vbox',
            align: 'center'
        },
        items: [
            {
                layout: 'hbox',
                items: [
                    {
                        xtype: 'devicebutton',
                        text: 'scratch'
                    },
                    {
                        xtype: 'devicebutton',
                        text: 'automix'
                    }
                ]
            },
            {
                xtype: 'devicebutton',
                iconCls: 'arrow_up',
                iconMask: true
            },
            {
                layout: 'hbox',
                items: [
                    {
                        xtype: 'devicebutton',
                        iconCls: 'folder_black_open',
                        iconMask: true
                    },
                    {
                        xtype: 'devicebutton',
                        text: 'files'
                    }
                ]
            },
            {
                xtype: 'devicebutton',
                iconCls: 'arrow_down',
                iconMask: true
            },
            {
                layout: 'hbox',
                items: [
                    {
                        xtype: 'devicebutton',
                        text: 'load A'
                    },
                    {
                        xtype: 'devicebutton',
                        text: 'load B'
                    }
                ]
            },
            {
                xtype: 'livesliderfield',
                minWidth: 150,
                minValue: 0,
                maxValue: 100,
                value: 50,
                label: 'crossfader'
            }
        ]
    }
});