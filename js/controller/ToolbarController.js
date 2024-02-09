define(['js/controller/BaseController'], function (baseContriller) {

    // const toolBarAction = SessionUtil.getUrl('FolderEditAjax.i4');
    const toolBarAction = 'toolbar';

    function loadDetails(options) {
        options || (options = {});
        return baseContriller._ajax(toolBarAction, {action: 'loadToolbarDetails'}, options.success);
    };

    return {
        loadDetails: loadDetails
    };
})