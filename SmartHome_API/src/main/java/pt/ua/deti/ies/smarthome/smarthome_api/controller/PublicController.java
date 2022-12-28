package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smarthome.smarthome_api.Authentication.AuthenticationHandler;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.InvalidCredentialsException;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.jwt_handler.JwtRequest;
import pt.ua.deti.ies.smarthome.smarthome_api.jwt_handler.JwtResponse;
import pt.ua.deti.ies.smarthome.smarthome_api.jwt_handler.JwtTokenUtil;
import pt.ua.deti.ies.smarthome.smarthome_api.jwt_handler.JwtUserDetailsService;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Utilizador;
import pt.ua.deti.ies.smarthome.smarthome_api.services.UserService;
import pt.ua.deti.ies.smarthome.smarthome_api.utils.SuccessfulRequest;

@RestController
@RequestMapping("smarthome/public")
@CrossOrigin
@Slf4j
public class PublicController {

    // Services
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationHandler authenticationHandler;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    /*
    Passwords contas:
    alberto.matias000@gmail.com -> admin
    susana.mendes000@gmail.com -> password
     */

    // Returns the User corresponding to the e-mail and password used for a login, if they exist in the database
    @GetMapping("/login")
    public ResponseEntity<Utilizador> getUser(@RequestParam(name="email", required = true) String email, @RequestParam(name="password", required = true) String password) throws ResourceNotFoundException {
        return userService.getUser(email, password);
    }

    @PostMapping("/login")
    public JwtResponse createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws
            Exception {
        String email = authenticationRequest.getEmail();
        String password = authenticationRequest.getPassword();
        String token;
        UserDetails userDetails;

        if(email == null || password == null){
            throw new InvalidCredentialsException("Deve ser fornecido um email e uma password válidas para realizar o login.");
        }

        userDetails = userDetailsService.loadUserByUsername(email);
        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Credenciais de login inválidas");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        log.info(authenticationHandler.getUserName());

        token = jwtTokenUtil.generateToken(userDetails);
        return new JwtResponse("Autenticação bem-sucedida", token);
    }

    // Registers a new user in the DB
    @PostMapping("/register") 
    public SuccessfulRequest registerUser(@RequestParam(name="name", required = true) String name, 
                                        @RequestParam(name="email", required = true) String email, 
                                        @RequestParam(name="password", required = true) String password, 
                                        @RequestParam(name="prof-pic", required = false) String profile_pic,
                                        @RequestParam(name="isAdmin", required = true) Boolean admin){
        userService.registerUser(name, email, password, profile_pic, admin);
        return new SuccessfulRequest("Registered with success");
    }
}
