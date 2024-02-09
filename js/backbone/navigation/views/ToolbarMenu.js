define([
    "backbone.radio",
    "backbone",
    "underscore",
    'jquery-ui/ui/effects/effect-slide',
    'js/backbone/template/MainToolbarTemplate.html',
    'js/controller/ToolbarController'
], function (Radio, Backbone, _, ui, toolbarTemplate, controller) {

    let template = _.template(toolbarTemplate);

    let toolbarMain = Backbone.View.extend({


        initialize: function (options) {

            this.model = new Backbone.Model();
            controller.loadDetails({
                success: $.proxy(function (result, status, xhr) {
                    this.model.set(result);
                    this.render();
                }, this)
            })
            return this;
        },
        render: function () {


            var opts = {
                saleMenuItems: this.model.get('salesMenuModel'),
                staffMenuItems: this.model.get('stuffMenuModel')
                //     guest: this.model.get('guest'),
                //     avatarImg: this.model.get('avatarImg'),
                //     hasProfile: this.model.get('profile') != null,
                //     hasSearch: this.model.get('search') == true
                // };
                // if (this.model.get('nameFormat') == 'LF') {
                //     opts.firstName = this.model.get('lastName');
                //     opts.lastName = this.model.get('firstName');
                // } else {
                //     opts.firstName = this.model.get('firstName');
                //     opts.lastName = this.model.get('lastName');

            }

            this.$el.html(template(opts));
            return this;

        },
    });
    return toolbarMain;
})