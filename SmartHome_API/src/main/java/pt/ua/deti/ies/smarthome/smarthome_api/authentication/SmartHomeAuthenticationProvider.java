
package pt.ua.deti.ies.smarthome.smarthome_api.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pt.ua.deti.ies.smarthome.smarthome_api.jwtHandler.JwtUserDetailsService;

@Component
public class SmartHomeAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws
            AuthenticationException {
        // Get the User from UserDetailsService
        String providedUsername = authentication.getPrincipal().toString();
        UserDetails user = userDetailsService.loadUserByUsername(providedUsername);

        String providedPassword = authentication.getCredentials().toString();
        String correctPassword = user.getPassword();

        // Authenticate
        // If Passwords don't match throw and exception
        if(!passwordEncoder.matches(providedPassword, correctPassword)){
            throw new BadCredentialsException("Credenciais de login inválidas");
        }

        // return Authentication Object
        return new UsernamePasswordAuthenticationToken(user, authentication.getCredentials(), user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}