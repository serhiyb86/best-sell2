package com.best.sell.bestsell2.service.template;

import com.best.sell.bestsell2.repositories.CityRepository;
import com.best.sell.bestsell2.repositories.ClientRepository;
import com.best.sell.bestsell2.repositories.StreetRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;

public enum TableType {
    CLIENT("clients", "tables/clients", ClientRepository.class),
    STREET("streets", "tables/streets", StreetRepository.class),
    CITY("cities", "tables/cities", CityRepository.class);

    TableType(String tableName, String templateName, Class<? extends JpaRepository<?, Integer>> repository) {
        this.repository = repository;
        this.tableName = tableName;
        this.templateName = templateName;
    }

    private final Class<? extends JpaRepository<?, Integer>> repository;
    private final String tableName;
    private final String templateName;

    public Class<? extends JpaRepository<?, Integer>> getRepository() {
        return repository;
    }

    public String getTableName() {
        return tableName;
    }

    public String getTemplateName() {
        return templateName;
    }

    public static TableType getByTableName (String tableName) {
        return Arrays.stream(values()).filter(e->e.getTableName().equals(tableName)).findFirst().orElse(null);
    }
}
