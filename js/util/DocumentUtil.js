define(['js/backbone/register/views/StreetRegisterView'], function (StreetRegister) {
    let documentUtil = {

        getDocumentView: function (action, options) {
            if (action === "streets") {
                return new StreetRegister(options);
            } else if (action === "clients") {
                alert('Action ' + action + ' should be implemented soon');
            } else {
                alert('Unknown menu action: ' + action);
            }
        }
    }
    return documentUtil;
})