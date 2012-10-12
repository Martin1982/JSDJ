Ext.define('JSDJ.view.AreaFwdFx',{
    extend: 'Ext.Panel',
    xtype: 'areafwdfx',

    config: {
        layout: 'vbox',
        margin: 5,
        items: [
            {
                xtype: 'devicebutton',
                cls: 'jsdj-shift jsdj-centercmp',
                text: 'shift'
            },
            {
                layout: 'hbox',
                items: [
                    {
                        xtype: 'devicebutton',
                        cls: 'jsdj-fx',
                        text: '1'
                    },
                    {
                        xtype: 'devicebutton',
                        cls: 'jsdj-fx',
                        text: '2'
                    }
                ]
            },
            {
                layout: 'hbox',
                items: [
                    {
                        xtype: 'devicebutton',
                        cls: 'jsdj-fx',
                        text: '3'
                    },
                    {
                        xtype: 'devicebutton',
                        cls: 'jsdj-fx',
                        text: '4'
                    }
                ]
            },
            {
                layout: 'hbox',
                items: [
                    {
                        xtype: 'devicebutton',
                        iconCls: 'fbackward',
                        iconMask: true
                    },
                    {
                        xtype: 'devicebutton',
                        iconCls: 'fforward',
                        iconMask: true
                    }
                ]
            }
        ]
    }
});