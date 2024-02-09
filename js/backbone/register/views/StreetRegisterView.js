define(["underscore",
    "js/controller/StreetController",
    "js/backbone/doc/views/LightboxDocument"
], function (_, controller, LightboxDocument) {

    let StreetRegisterView = Backbone.View.extend({
        initialize: function (options) {

            this.model = new Backbone.Model();
            controller.loadDetails({
                success: $.proxy(function (result, status, xhr) {
                    this.model.set(result);
                    this.render();
                }, this)
            });

            return this;
        },
        render: function () {
            var lbOptions = {
                // title: TemplateLocaliser.getLocalisedText('mi.text.viewsummary'),
                zindex: 1000,
                height: 600,
                width: 880,
                additionalCssClasses: ['browseViewSummary'],
                disableBodyScroll: true,
                newBroadLightTheme: true,
            }
            this.lightbox = new LightboxDocument(_.extend(lbOptions, this.options));

            this.lightbox.render();

        }
    })

    return StreetRegisterView;
})