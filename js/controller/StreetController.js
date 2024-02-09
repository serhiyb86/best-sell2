define(['js/controller/BaseController'], function (baseController) {


    const streetAction = 'streets';

    function loadAllStreets(options) {
        options || (options = {});
        return baseController._ajax(streetAction, {action: 'loadAllStreets'}, options.success);
    };

    return {
        loadAllStreets: loadAllStreets
    };
})