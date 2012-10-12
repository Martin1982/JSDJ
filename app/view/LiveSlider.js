Ext.define('JSDJ.view.LiveSlider', {
    extend: 'Ext.slider.Slider',

    onThumbDrag: function(thumb, e, offsetX) {
        var index = this.getThumbIndex(thumb),
            offsetValueRatio = this.offsetValueRatio,
            constrainedValue = this.constrainValue(offsetX / offsetValueRatio);

        e.stopPropagation();

        this.setIndexValue(index, constrainedValue);

        this.fireEvent('change', this, thumb, this.getValue(), e);
        this.fireEvent('drag', this, thumb, this.getValue(), e);

        return false;
    }
})