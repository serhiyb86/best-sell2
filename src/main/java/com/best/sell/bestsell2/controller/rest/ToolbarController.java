package com.best.sell.bestsell2.controller.rest;

import com.best.sell.bestsell2.model.app.SalesMenuModel;
import com.best.sell.bestsell2.model.app.ToolbarModel;
import org.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping(path = "/toolbar")
public class ToolbarController {


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE,
        value = "/toolbar")
    @ResponseBody
    public ToolbarModel toolbarAction(@RequestBody String json) {
        System.out.println("toolbarAction() was called \n" + json);
        JSONObject body = new JSONObject(json);
        String action = body.getString("action");
        if (action.equals("loadToolbarDetails")) {
            return new ToolbarModel();
        }
        return null;
    }


}
