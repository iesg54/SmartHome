package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Utilizador;
import pt.ua.deti.ies.smarthome.smarthome_api.services.UserService;
import pt.ua.deti.ies.smarthome.smarthome_api.utils.SuccessfulRequest;

@RestController
@RequestMapping("smarthome/public")
public class PublicController {

    // Services
    @Autowired
    private UserService userService;

    // construtor

    @GetMapping("/user")
    public ResponseEntity<List<Utilizador>> getUtilizador(){
        return userService.getUsers();
    }

    // Returns the User corresponding to the e-mail and password used for a login, if they exist in the database
    @GetMapping("/login")
    public ResponseEntity<Utilizador> getUser(@RequestParam(name="email", required = true) String email, @RequestParam(name="password", required = true) String password) throws ResourceNotFoundException {
        return userService.getUser(email, password);
    }

    // Registers a new user in the DB
    @PostMapping("/register")
    public SuccessfulRequest registerUser(@RequestParam(name="name", required = true) String name, @RequestParam(name="email", required = true) String email, @RequestParam(name="password", required = true) String password){
        return null;
    }
}
