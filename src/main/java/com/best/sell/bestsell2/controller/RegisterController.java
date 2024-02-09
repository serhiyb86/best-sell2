package com.best.sell.bestsell2.controller;

import com.best.sell.bestsell2.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class RegisterController {
    @Autowired
    private ClientRepository clientRepository;


    @GetMapping(value = "/register")
    public String register() {
        System.out.println("register was called");
        return "register";
    }

    @GetMapping(value = "/clients")
    public ModelAndView clients() {
        System.out.println("clients was called");
        ModelAndView model = new ModelAndView();
        model.addObject("clients", clientRepository.findAll());
        model.setViewName("tables/clients");
        System.out.println("=========");
        System.out.println(model);
        System.out.println("=========");
        System.out.println(model.getView());
        return model;
    }
}
