define([], function () {

    let LightBox = function Lightbox() {

            let $c = $('<div>');
            this.createdContainer = true;
            $c.addClass('lightbox').css('display', 'none');

            this.$outerContentDiv = $c.find('div.outerlightboxContent');
            this.$innerContentDiv = $c.find('div.lightboxContent');

            let myself = this;
            // close button
            this.$outerContentDiv.find('div.closeLightboxPopup')
                .on('click', function () {
                    myself.close();
                });

            // maximise button
            this.$outerContentDiv.find('div.maximiseLightboxPopup')
                .on('click', function () {
                    myself.maximise();
                });

            $c.on('mousedown', function (e) {//when anywhere is clicked on the page
                if ($(e.target).closest("div.lightboxContent").length === 0 &&
                    $(e.target).closest("div.outerlightboxContent").length === 0) {
                    myself.close();
                }
            });

            this.$container = $c;
            $('body').append($c);

        this.$container.show();


}
return LightBox

})