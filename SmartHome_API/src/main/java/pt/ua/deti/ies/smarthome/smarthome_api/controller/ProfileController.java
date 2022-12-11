package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Utilizador;
import pt.ua.deti.ies.smarthome.smarthome_api.services.UserService;
import pt.ua.deti.ies.smarthome.smarthome_api.utils.SuccessfulRequest;


@RestController
@RequestMapping("smarthome/private/user")
@CrossOrigin
public class ProfileController {
    // EDIT PROFILE API METHODS
    UserService userService;

    // Gets the info of the currently logged in User
    @GetMapping("/{id}")
    public ResponseEntity<Utilizador> getUserInfo(@PathVariable(value="id") int id) throws ResourceNotFoundException{
        return userService.getUserInfo(id);
    }

    // Updates Info of the User
    @PutMapping("/{id}")
    public SuccessfulRequest updateUserInfo(@PathVariable(value="id") int id, @RequestBody Utilizador user) throws ResourceNotFoundException{
        return userService.updateUserInfo(id, user);
    }

    // Updates User Profile Pic
    @PutMapping("/{id}")
    public SuccessfulRequest updateUserInfo(@PathVariable(value="id") int id, @RequestParam(value="profPic") String profPic) throws ResourceNotFoundException{
        return userService.updateProfPic(id, profPic);
    }
}
