define(['jquery', 'ractive', '../src/slider'], function($, Ractive, Slider) {
    var app = new Ractive({
        template: '#template',
        el: '#el',
        data: {
            items: [1, 2, 3]
        }
    })

    app.on('addSlide', function() {
        app.get('items').push(app.get('items').length + 1)
    })
})