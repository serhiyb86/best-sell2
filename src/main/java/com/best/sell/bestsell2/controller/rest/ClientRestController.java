package com.best.sell.bestsell2.controller.rest;

import com.best.sell.bestsell2.model.client.Client;
import com.best.sell.bestsell2.repositories.ClientRepository;
import com.best.sell.bestsell2.service.template.TableType;
import com.best.sell.bestsell2.service.template.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
public class ClientRestController {

    @Autowired
    private TemplateService templateService;

    @GetMapping("/table")
    public String allClients (@RequestParam(name = "name") String tableName) {
        return templateService.getTable(TableType.getByTableName(tableName), null);

    }

}
