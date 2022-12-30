package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private UserService userService;

    // Gets the info of the currently logged in User
    @GetMapping("/info")
    public ResponseEntity<Utilizador> getUserInfo() throws ResourceNotFoundException{
        return userService.getUserInfo();
    }

    // Updates Info of the User
    @PutMapping("/{id}")
    public SuccessfulRequest updateUserInfo(@PathVariable(value="id") int id, @RequestBody Utilizador user) throws ResourceNotFoundException{
        return userService.updateUser(id, user);
    }

    // Updates User Profile Pic
    @PutMapping("/profilePic/{id}")
    public SuccessfulRequest updateUserPic(@PathVariable(value="id") int id, @RequestParam(value="profPic") String profPic) throws ResourceNotFoundException{
        return userService.updateProfPic(id, profPic);
    }

    @GetMapping("/logout")
    public SuccessfulRequest logout(@PathVariable(value="id") int id){
        userService.removeSensorsInfo();
        return new SuccessfulRequest("Logout com sucesso");
    }
}
