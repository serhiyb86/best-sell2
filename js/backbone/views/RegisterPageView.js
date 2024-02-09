define(['js/backbone/views/AddStreetView'], function (AddStreetView) {


    let RegisterPageView = Backbone.View.extend({
        initialize: function () {

        },
        render: function () {

            // new AddStreetView({street:2})
            this.addButton = $('<button type="button" id="form-new-good" className="btn btn-secondary">New client</button>');

            var ButtonView = Backbone.View.extend({
                tagName: 'button',
                render: function() {
                    // Set button text
                    //this.$el.text(this.model.get('text'));
                     this.$el.text('add');
                    return this;
                },});

            this.button = new ButtonView();
            this.listenTo(this.button, 'click', $.proxy(function () {
                alert('hello')
                // new AddStreetView({street:2}).render();
            }, this))

this.$el.append(this.button.render().el)



        }


    })

    return RegisterPageView;
})