package com.best.sell.bestsell2.service.template;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TemplateServiceImpl implements TemplateService {
    @Autowired
    private ApplicationContext context;
    @Autowired
    private TemplateEngine templateEngine;

    @Override
    public String getTable(TableType tableType, Pageable pageable) {
        if (tableType == null) return "";

        Map<String, Object> modelMap = new HashMap<>();
        List<?> rows = context.getBean(tableType.getRepository()).findAll();
        modelMap.put(tableType.getTableName(), rows);
        Context thymeleafContext = new Context();
        thymeleafContext.setVariables(modelMap);
        return templateEngine.process(tableType.getTemplateName(), thymeleafContext);
    }
}
