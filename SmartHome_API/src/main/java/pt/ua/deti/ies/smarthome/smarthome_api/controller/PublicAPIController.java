package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Utilizador;
import pt.ua.deti.ies.smarthome.smarthome_api.services.UserService;

@RestController
@RequestMapping("smarthome/public")
public class PublicAPIController {

    // Services
    @Autowired
    private UserService userService;

    // construtor

    // Returns the User corresponding to the e-mail and password used for a login, if they exist in the database
    @GetMapping("/login")
    public ResponseEntity<Utilizador> getUser(@RequestParam(name="email", required = true) String email, @RequestParam(name="password", required = true) String password) throws ResourceNotFoundException {
        return userService.getUser(email, password);
    }

}
