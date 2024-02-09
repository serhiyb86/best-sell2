package com.best.sell.bestsell2.model.app;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ToolbarModel {
    private DropDownMenuItem[] salesMenuModel;
    private DropDownMenuItem[] stuffMenuModel;

    public ToolbarModel() {
        this.salesMenuModel = new DropDownMenuItem[]{new DropDownMenuItem("Income Doc", "incm"),
            new DropDownMenuItem("outcome Doc", "outc"),
            new DropDownMenuItem("Clients", "clients"),
            new DropDownMenuItem("Streets", "streets"),
            new DropDownMenuItem("Invoices", "inv")};
        this.stuffMenuModel = new DropDownMenuItem[]{new DropDownMenuItem("Ilnesses", "iln"),
            new DropDownMenuItem("Salary Doc", "salary"),
            new DropDownMenuItem("registerWorkingDays", "workd"),
            new DropDownMenuItem("indexation", "indexation")};
    }

    @Getter
    @Setter
    class DropDownMenuItem {
        private String name;
        private String action;

        public DropDownMenuItem(String name, String action) {
            this.name = name;
            this.action = action;
        }
    }
}
