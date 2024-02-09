package com.best.sell.bestsell2.service;

import com.best.sell.bestsell2.service.template.TableType;
import org.json.JSONObject;

import java.time.LocalDateTime;

public class TestClass {
    public static void main(String[] args) {


        System.out.println(new JSONObject("{action: 'loadToolbarDetails'}").getString("action"));

        System.out.println(new JSONObject("{\"action\":\"loadToolbarDetails\"}").getString("action"));

        System.out.println(JSONObject.stringToValue("r:h"));

    }
}
