define([], function () {
    let baseController = {
        _ajax: function (ajaxPostAction, data, successFn) {
            console.log(JSON.stringify(data))
            return $.ajax({
                url: ajaxPostAction,
                contentType: 'application/json',
                data: JSON.stringify(data),
                type: 'POST',
                success: function (result, status, xhr) {
                    console.log(JSON.stringify(data))
                    //if (!AjaxUtil.handleErrors(xhr)) return;
                    if (successFn) {
                        successFn(result, status, xhr);
                    }

                }
            });
        }
    }
    return baseController;
})