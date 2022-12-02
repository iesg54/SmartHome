package pt.ua.deti.ies.smarthome.smarthome_api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smarthome.smarthome_api.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
}
