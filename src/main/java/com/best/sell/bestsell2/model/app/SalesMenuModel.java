package com.best.sell.bestsell2.model.app;

public class SalesMenuModel {
    private String clients;
    private String outcomeDocs;
    private String incomeDocs;
    private String products;

    public SalesMenuModel() {
        this.clients = "clients";
        this.outcomeDocs = "outcomeDocs";
        this.incomeDocs = "incomeDocs";
        this.products = "products";
    }

    public String getClients() {
        return clients;
    }

    public void setClients(String clients) {
        this.clients = clients;
    }

    public String getOutcomeDocs() {
        return outcomeDocs;
    }

    public void setOutcomeDocs(String outcomeDocs) {
        this.outcomeDocs = outcomeDocs;
    }

    public String getIncomeDocs() {
        return incomeDocs;
    }

    public void setIncomeDocs(String incomeDocs) {
        this.incomeDocs = incomeDocs;
    }

    public String getProducts() {
        return products;
    }

    public void setProducts(String products) {
        this.products = products;
    }
}
