package pt.ua.deti.ies.smarthome.smarthome_api.Authentication;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationHandler {
    public Authentication getAuthenticationInstance(){
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public String getUserName(){
        return getAuthenticationInstance().getName();
    }
}