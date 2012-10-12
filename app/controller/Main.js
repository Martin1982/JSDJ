Ext.define('JSDJ.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        control: {
            'deckvolume': {
                change: 'onDeckvolumeChanged'
            },
            'pauseplay': {
                tap: 'onPlaypauseTap'
            },
            'crossfader': {
                change: 'onFaderChanged'
            },
            'filedropzone': {
                'drop': 'onFileDrop',
                'dragover': 'onFileDrag'
            },
            shift: {
                tap: 'onShiftTap'
            },
            fx: {
                tap: 'onFxTap'
            },
            pitchknob: {
                change: 'onPitchChanged'
            }
        },
        refs: {
            deckvolume : 'sliderfield[label=Volume]',
            pauseplay: 'devicebutton[iconCls=playpause]',
            crossfader: 'sliderfield[label=crossfader]',
            pitchknob: 'knob[cls=jsdj-centercmp jsdj-pitchknob]',
            shift: 'devicebutton[cls=jsdj-shift jsdj-centercmp]',
            fx: 'devicebutton[cls=jsdj-fx]',
            outerdeck: 'outerdeck',

            // @todo Safari only now
            filedropzone : '#filedropzone',
            filelist: '#filelist'
        }
    },

    decks: [],
    effects: [],
    masterVolume: 100,
    deckVolumePercentages: 100,
    crossFaderValue: 50,
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        var decks = Ext.ComponentQuery.query('outerdeck');
        Ext.each(decks, function(deck){
            this.onDeckAvailable(deck)
        }, this);

        /** debug sounds **/
        this.mySoundOne = new buzz.sound('resources/musiclib/a2_defusion-mirror_image.mp3');
        this.mySoundOne.load();

        this.mySoundTwo = new buzz.sound('resources/musiclib/b1_cadra___saiko-path_of_the_wizard.mp3');
        this.mySoundTwo.load();

        this.effects = [
            new buzz.sound('resources/musiclib/effect1.wav').load(),
            new buzz.sound('resources/musiclib/effect2.wav').load(),
            new buzz.sound('resources/musiclib/effect3.wav').load(),
            new buzz.sound('resources/musiclib/effect4.mp3').load(),
            new buzz.sound('resources/musiclib/effect5.mp3').load(),
            new buzz.sound('resources/musiclib/effect6.mp3').load(),
            new buzz.sound('resources/musiclib/effect7.mp3').load(),
            new buzz.sound('resources/musiclib/effect7.mp8').load()
        ];
        /** debug sounds end **/
    },

    onFxTap: function(cmp) {
        var fxNumber = parseInt(cmp.getText())-1,
            effect = this.effects[fxNumber];

        effect.togglePlay();
    },

    onShiftTap: function(cmp) {
        var shiftingDeck = cmp.deck,
            fxButtons = Ext.ComponentQuery.query('devicebutton[cls=jsdj-fx]', cmp.getParent()),
            buttonValueSetter = fxButtons.length;

        if (!cmp.pressed) {
            buttonState = 'pressed';
            cmp.pressed = true;
        } else {
            cmp.pressed = false;
        }

        Ext.each(fxButtons, function(button){
            var buttonValue = parseInt(button.getText());
            if (cmp.pressed == true) {
                button.setText(buttonValue+buttonValueSetter);
            } else {
                button.setText(buttonValue-buttonValueSetter);
            }
        });

    },

    onFileDrop: function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files; // FileList object.

        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
          output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                      f.size, ' bytes, last modified: ',
                      f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                      '</li>');
        }
        this.getFilelist().setHtml("<ul>" + output.join(' ') + "</ul>");
    },

    onFileDrag: function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    },

    onPitchChanged: function(cmp, thumb, newValue) {
        var audioTrack = this.getAudio(cmp.deck),
            pitchValue = parseFloat(newValue)/100;
        audioTrack.setSpeed(pitchValue);
    },

    onDeckvolumeChanged: function(cmp, thumb, newValue) {
        var audioTrack = this.getAudio(cmp.deck);
        audioTrack.setVolume(newValue);
    },

    onFaderChanged: function(cmp, thumb, newValue) {
        this.mySoundOne.setVolume(100 - newValue);
        this.mySoundTwo.setVolume(newValue);
    },

    onPlaypauseTap: function(cmp) {
        var audioTrack = this.getAudio(cmp.deck);
        audioTrack.togglePlay();
    },

    onDeckAvailable: function(cmp) {
        this.setVolumesAlign(cmp);
        this.assignDeck(cmp);
    },

    setVolumesAlign: function(cmp) {
        var side      = cmp.getSide(),
            volumeCmp = Ext.create('JSDJ.view.AreaVolumes'),
            panelsCmp = Ext.create('JSDJ.view.AreaPanels'),
            tempoCmp  = Ext.create('JSDJ.view.AreaTempo'),
            fwdfxCmp  = Ext.create('JSDJ.view.AreaFwdFx');

        if (side == 'left') {
            cmp.add(panelsCmp);
            cmp.add(volumeCmp);
            var tempofx = cmp.query('areatempofx')[0];
            tempofx.add(tempoCmp);
            tempofx.add(fwdfxCmp);
        } else {
            cmp.add(volumeCmp);
            cmp.add(panelsCmp);
            var tempofx = cmp.query('areatempofx')[0];
            tempofx.add(fwdfxCmp);
            tempofx.add(tempoCmp);
        }
    },

    assignDeck: function(cmp) {
        var components = cmp.query('sliderfield, knob, devicebutton'),
            deck = cmp.getDeck();

        Ext.each(components, function(component) {
            component.deck = deck;
        });
    },
    
    getAudio: function(deck) {
        if (deck === 1) {
            return this.mySoundOne;
        }
        if (deck == 2) {
            return this.mySoundTwo;
        }
    }
});