package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Utilizador;
import pt.ua.deti.ies.smarthome.smarthome_api.services.UserService;
import pt.ua.deti.ies.smarthome.smarthome_api.utils.SuccessfulRequest;

@RestController
@RequestMapping("smarthome/public")
@CrossOrigin
public class PublicController {

    // Services
    @Autowired
    private UserService userService;

    // construtor

    // Returns the User corresponding to the e-mail and password used for a login, if they exist in the database
    @GetMapping("/login")   // WORKING!!
    public ResponseEntity<Utilizador> getUser(@RequestParam(name="email", required = true) String email, @RequestParam(name="password", required = true) String password) throws ResourceNotFoundException {
        return userService.getUser(email, password);
    }

    // Registers a new user in the DB
    @PostMapping("/register") // DID NOT CHECK IF WORKING TODO!!!!!!
    public SuccessfulRequest registerUser(@RequestParam(name="name", required = true) String name, 
                                        @RequestParam(name="email", required = true) String email, 
                                        @RequestParam(name="password", required = true) String password, 
                                        @RequestParam(name="prof-pic", required = true) String profile_pic, 
                                        @RequestParam(name="isAdmin", required = true) Boolean admin){
        userService.registerUser(name, email, password, profile_pic, admin);
        return new SuccessfulRequest("Registered with success");
    }
}
