package com.best.sell.bestsell2.controller.rest;

import com.best.sell.bestsell2.model.client.Street;
import com.best.sell.bestsell2.repositories.StreetRepository;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StreetController {
    public static final Logger logger = LoggerFactory.getLogger(StreetController.class);
    @Autowired
    private StreetRepository streetRepository;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE,
        value = "/streets")
    @ResponseBody
    public List<Street> streetsAction(@RequestBody String json) {
        logger.debug("streetsAction() was called \n{}", json);

        JSONObject body = new JSONObject(json);
        String action = body.getString("action");
        if (action.equals("loadAllStreets")) {
            return streetRepository.findAll();
        }
        logger.error("Unknown action: {}", action);
        return null;
    }
}
