define(['ractive'], function(Ractive) {
    function oninit() {
        var app = this
        var startX
        // 标志位，是否命中滑动监控
        var monitoring = false

        app.on('onMouseDown', function(e) {
            monitoring = true
            startX = e.original.pageX
        })

        app.on('onMouseMove', function(e) {
            if (!monitoring) return

            var mouseMoveX = e.original.pageX - startX
            var offset = this.get('offset')
            // 如果在边界鼠标移动不做任何效果
            var isBoundary = (offset === 0 && mouseMoveX > 0) || (offset === -1 * (this.get('items').length - 1) && mouseMoveX < 0)
            if (isBoundary) {
                monitoring = false
                return
            }

            app.set('mouseMoveX', mouseMoveX)
        })

        app.on('onMouseUp', function(e) {
            if (!monitoring) return

            monitoring = false

            var data = this.get()

            app.set('offset', data.offset + (e.original.pageX - startX < 0 ? -1 : 1))
            app.set('mouseMoveX', 0)
        })

        app.on('setOffset', function(e, offset) {
            // TODO animation support
            app.set('offset', -1 * offset)
        })
    }

    var widget = Ractive.extend({
        template: TEMPLATE,
        isoldated: true,
        data: {
            // 偏移量，总长度为items的长度
            offset: 0,
            // slide对象
            items: function() {return []},
            // 鼠标滑动相对初始位置的变化距离
            mouseMoveX: 0,
            // 计算container的left
            getContainerLeft: function() {
                var data = this.get()
                return (data.offset * data.width) + data.mouseMoveX
            }
        },
        oninit: oninit
    })

    widget.prototype.appendSlide = function(item) {
        this.get('items').push(item)
    }

    // 移除任意的slide，如果当前偏移处于最后的位置需要更新offset
    widget.prototype.removeSlide = function(index) {
        index = parseInt(index)

        var items = this.get('items')
        if (index < 0 && index >= items.length) return

        // 最后一个元素设置offset为0，避免append出现文体
        if (items.length === 1) {
            this.set('offset', 0)
        } else {
            if (index === items.length - 1) {
                this.set('offset', 2 - items.length)
            }
        }

        items.splice(index, 1)
    }

    Ractive.components.slider = widget

    return widget
})