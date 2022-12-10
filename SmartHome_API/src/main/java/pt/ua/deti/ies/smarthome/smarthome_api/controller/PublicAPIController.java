package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pt.ua.deti.ies.smarthome.smarthome_api.model.Utilizador;
import pt.ua.deti.ies.smarthome.smarthome_api.services.UserService;

@RestController
@RequestMapping("public")
public class PublicAPIController {

    @Autowired 
    private UserService userService;

    @PostMapping("/user")
    public Utilizador newUser(@RequestBody Utilizador user){
        return null;
    }
}
