package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Utilizador;


@RestController
@RequestMapping("smarthome/private/user")
@CrossOrigin
public class ProfileController {
    // EDIT PROFILE API METHODS

    // Gets the info of the currently logged in User
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserInfo(@PathVariable(value="id") int id){
        return null;
    }

    // Updates Info of the User
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUserInfo(@PathVariable(value="id") int id, @RequestBody Utilizador user){
        return null;
    }
}
