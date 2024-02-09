package com.best.sell.bestsell2.service.template;

import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface TemplateService {
    String getTable (TableType tableType, Pageable pageable);
}


