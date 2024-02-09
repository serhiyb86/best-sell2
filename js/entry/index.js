import ToolbarMenu from 'js/backbone/navigation/views/ToolbarMenu';
import DocumentUtil from'js/util/DocumentUtil';
import AddStreetView from 'js/backbone/views/AddStreetView';
import RegisterPageView from 'js/backbone/views/RegisterPageView';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


$(document).ready(function () {


    function defaultToolbarInit() {
            new ToolbarMenu({
                el: $("#createContentMenuContainer")
            });

        function menuItem(action) {
            console.log(action)
            DocumentUtil.getDocumentView(action);
        }
        window.menuItem = menuItem;
    }
    defaultToolbarInit();

    function registerPageInit() {
        new RegisterPageView({
            el: $(".register-container")
        }).render();
    }


registerPageInit();
    // window.toolbar.toolbarInit = defaultToolbarInit();
    //
    // window.toolbar.toolbarInit.then((toolbar) => toolbar.render());
})





