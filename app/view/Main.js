Ext.define("JSDJ.view.Main", {
    extend: 'Ext.Panel',
    requires: ['Ext.TitleBar'],
    
    config: {
        layout: 'hbox',
        items: [
            {
                docked: 'top',
                xtype: 'titlebar',
                title: 'JSDJ 2012'
            },
            { xtype: 'outerdeck', deck:1, side: 'left'},
            { xtype: 'middledeck' },
            { xtype: 'outerdeck', deck:2, side: 'right'},
            {
                docked: 'bottom',
                cls: 'recordcase',
                layout: 'hbox',
                items: [
                    {
                        html: 'folders',
                        flex: 2
                    },
                    {
                        html: 'files',
                        id: 'filelist',
                        flex: 3
                    },
                    {
                        html: 'upload area',
                        id: 'filedropzone',
                        flex: 1
                    }
                ]
            }
        ]
    }
});