define(["js/controller/StreetController",
        "js/backbone/doc/views/LightboxDocument"],
    function (Controller, LightboxDocument) {

        let streetView = Backbone.View.extend({
            constructor: function(options) {
                if(options) {
                    this.options = options;
                } else {
                    this.options = {};
                }
            },
                initialize: function () {

                    this.lightbox = new LightboxDocument({
                        clickableBackground: true,
                        topGutterColour: 'lightbox-top-gutter-color',
                        topGutterText: 'mi.text.details',
                        noGutter: false,
                        windowWidth: 580,
                        windowHeight: 400,
                        zindex: 10000,
                        show: true,
                        alternativeCloseButton: false,
                        newBroadLightTheme: true,
                    });

                    //this.contentId = this.options.contentId;
                    if (this.options.streetId) {
                        let streets = Controller.loadAllStreets();
                        console.log(this.options.streetId);
                        streets.then((result => console.log(result)))
                    }
                    this._setViews()
                },
                _setViews() {
                    this.contentTitleView = new TextInputView({
                        model: this.model,
                        property: 'title',
                        textClassName: 'broadcastInput',
                        width: '230px',
                        // inputHeading : TemplateLocaliser.getLocalisedText('mi.text.title'),
                        // placeholder : TemplateLocaliser.getLocalisedText('mi.text.title'),
                        inputHeading: 'mi.text.title',
                        placeholder: 'mi.text.title',
                        maxStringLength: 260
                    });

                    this.viewsSetUp = true;
                },
                render: function () {
                    // this.$el.html(this.templateFn({
                    //     imageUrl: this.model.get('thumbnailURL')
                    // }));

                    if (this.viewsSetUp) {
                        this.contentTitleView.setElement(this.$('.contentName')).render();
                        // this.contentDescView.setElement(this.$('.contentDescription')).render();
                        // this.contentCategoryView.setElement(this.$('.categoryDropdown')).render();
                        // this.saveButton.setElement(this.$('.submitButton')).render();
                        // this.cancelButton.setElement(this.$('.cancelButton')).render();
                        // if (this.uniqueReportName) {
                        //     var msgDiv = $('<div class="reportErrorMsg"></div>').css('display', 'none');
                        //
                        //     if (SessionUtil.getSessionOption('uniqueReportNames') == 'WARN') {
                        //         msgDiv.text(TemplateLocaliser.getLocalisedText('mi.text.unique.report.names.warn.msg'));
                        //     } else {
                        //         msgDiv.text(TemplateLocaliser.getLocalisedText('mi.text.unique.report.names.on.msg'));
                        //     }
                        //
                        //     this.$('.contentName').append(msgDiv);
                        // }
                    }
                    return this;
                }
            }
        )


       // this.editMetaData.setElement(this.lightbox.$innerContentDiv).render()
return streetView;
    })