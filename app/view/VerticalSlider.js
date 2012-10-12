Ext.define('JSDJ.view.VerticalSlider', {
    extend: 'Ext.slider.Slider',
    requires: ['JSDJ.view.VerticalThumb'],

    config: {
        baseCls: 'x-vslider',
        thumbConfig: {
            draggable: {
                translatable: {
                    easingX: null,
                    easingY: {
                        duration: 300,
                        type: 'ease-out'
                    }
                }
            }
        }
    },

    elementHeight: 0,

    /**
     * @private
     */
    factoryThumb: function() {
        return Ext.factory(this.getThumbConfig(), JSDJ.view.VerticalThumb);
    },

    refreshOffsetValueRatio: function() {
        var valueRange = this.getMaxValue() - this.getMinValue(),
            trackHeight = this.elementHeight - this.thumbHeight;

        this.offsetValueRatio = trackHeight / valueRange;
    },

    refreshElementHeight: function() {
        this.elementHeight = this.element.dom.offsetHeight;
        var thumb = this.getThumb(0);
        if (thumb) {
            this.thumbHeight = thumb.getElementHeight();
        }
    },

    refresh: function() {
        this.refreshElementHeight();
        this.refreshValue();
    },

    onThumbDragStart: function(thumb, e) {
        if (e.absDeltaY <= e.absDeltaX) {
            return false;
        }
        else {
            e.stopPropagation();
        }

        if (this.getAllowThumbsOverlapping()) {
            this.setActiveThumb(thumb);
        }

        this.dragStartValue = this.getValue()[this.getThumbIndex(thumb)];
        this.fireEvent('dragstart', this, thumb, this.dragStartValue, e);
    },

    onThumbDrag: function(thumb, e, offsetY) {
        var index = this.getThumbIndex(thumb),
            offsetValueRatio = this.offsetValueRatio,
            constrainedValue = this.constrainValue(offsetY / offsetValueRatio);

        e.stopPropagation();

        this.setIndexValue(index, constrainedValue);

        this.fireEvent('drag', this, thumb, this.getValue(), e);

        return false;
    },

    setIndexValue: function(index, value, animation) {
        var thumb = this.getThumb(index),
            values = this.getValue(),
            offsetValueRatio = this.offsetValueRatio,
            draggable = thumb.getDraggable();

        draggable.setOffset(null, value * offsetValueRatio, animation);

        values[index] = this.constrainValue(draggable.getOffset().y / offsetValueRatio);
    },

    refreshThumbConstraints: function(thumb) {
        var allowThumbsOverlapping = this.getAllowThumbsOverlapping(),
            offsetY = thumb.getDraggable().getOffset().y,
            thumbs = this.getThumbs(),
            index = this.getThumbIndex(thumb),
            previousThumb = thumbs[index - 1],
            nextThumb = thumbs[index + 1],
            thumbHeight = this.thumbHeight;

        if (previousThumb) {
            previousThumb.getDraggable().addExtraConstraint({
                max: {
                    y: offsetY - ((allowThumbsOverlapping) ? 0 : thumbHeight)
                }
            });
        }

        if (nextThumb) {
            nextThumb.getDraggable().addExtraConstraint({
                min: {
                    y: offsetY + ((allowThumbsOverlapping) ? 0 : thumbHeight)
                }
            });
        }
    },

    // @private
    onTap: function(e) {
        if (this.isDisabled()) {
            return;
        }

        var targetElement = Ext.get(e.target);

        if (!targetElement || targetElement.hasCls('x-vthumb')) {
            return;
        }

        var touchPointY = e.touch.point.y,
            element = this.element,
            elementY = element.getY(),
            offset = touchPointY - elementY - (this.thumbHeight / 2),
            value = this.constrainValue(offset / this.offsetValueRatio),
            values = this.getValue(),
            minDistance = Infinity,
            ln = values.length,
            i, absDistance, testValue, closestIndex, oldValue, thumb;

        if (ln === 1) {
            closestIndex = 0;
        }
        else {
            for (i = 0; i < ln; i++) {
                testValue = values[i];
                absDistance = Math.abs(testValue - value);

                if (absDistance < minDistance) {
                    minDistance = absDistance;
                    closestIndex = i;
                }
            }
        }

        oldValue = values[closestIndex];
        thumb = this.getThumb(closestIndex);

        this.setIndexValue(closestIndex, value, this.getAnimation());
        this.refreshThumbConstraints(thumb);

        if (oldValue !== value) {
            this.fireEvent('change', this, thumb, value, oldValue);
        }
    }
});