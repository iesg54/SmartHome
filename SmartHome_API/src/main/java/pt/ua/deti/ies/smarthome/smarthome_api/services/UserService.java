package pt.ua.deti.ies.smarthome.smarthome_api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Casa;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Utilizador;
import pt.ua.deti.ies.smarthome.smarthome_api.repository.HouseRepository;
import pt.ua.deti.ies.smarthome.smarthome_api.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HouseRepository houseRepository;

    public ResponseEntity<Utilizador> getUser(String email, String password) throws ResourceNotFoundException {
        if(userRepository.existsByEmail(email)){
            Utilizador account = userRepository.findByEmail(email);

            if (account.getPassword().equals(password)){
                return new ResponseEntity<>(account, HttpStatus.OK);
            }else{
                return new ResponseEntity<>(null, HttpStatus.OK);
            }
        }else{
            throw new ResourceNotFoundException("Não foi encontrada uma conta para o e-mail: " + email);
        }
    }

    public void registerUser(String email, String nome, String password, String profile_image, Boolean isAdmin){
        
        // criar nova casa assim que o admin se regista
        Utilizador novo = new Utilizador();
        if (isAdmin){   // se for administrador, tem uma casa registada -> criar essa casa
            Casa nova = new Casa();
            novo.setCasa(nova);
            houseRepository.save(nova);
        }
        novo.setEmail(email);
        novo.setNome(nome);
        novo.setPassword(password);
        novo.setProfileImage(profile_image);
        novo.setAdmin(isAdmin);

        userRepository.save(novo);
    }
}
