define(['jquery', 'ractive', '../src/slider'], function($, Ractive, Slider) {
    var app = new Ractive({
        template: '#template',
        el: '#el',
        data: {
            items: [1, 2, 3]
        }
    })

    app.on('addSlide', function() {
        var slider = app.findComponent('slider')
        slider.appendSlide(app.get('items').length + 1)
    })

    app.on('removeSlide', function() {
        var slider = app.findComponent('slider')
        slider.removeSlide(app.get('index'))
    })
})