package com.best.sell.bestsell2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "include")
public class UtilController {

    @GetMapping(value = "/SessionUtil")
    public String register() {
        System.out.println("SessionUtil was retrieved.");
        return "include/SessionUtilJS";
    }
}
