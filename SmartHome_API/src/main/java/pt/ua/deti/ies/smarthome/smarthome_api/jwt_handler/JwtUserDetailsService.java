package pt.ua.deti.ies.smarthome.smarthome_api.jwt_handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.InvalidUserException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Utilizador;
import pt.ua.deti.ies.smarthome.smarthome_api.repository.UserRepository;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Utilizador user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("Não foi encontrado um Utilizador com o email: " + email);
        }
        return user;
    }
}
