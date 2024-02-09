package com.best.sell.bestsell2.model.app;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StaffMenuModel {
    private String illnesses;
    private String salary;
    private String registerWorkingDays;
    private String indexation;


    public StaffMenuModel() {
        this.illnesses = "illnesses";
        this.salary = "salary";
        this.registerWorkingDays = "registerWorkingDays";
        this.indexation = "indexation";
    }
}
