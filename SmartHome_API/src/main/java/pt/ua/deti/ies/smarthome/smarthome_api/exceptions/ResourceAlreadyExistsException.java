package pt.ua.deti.ies.smarthome.smarthome_api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.IM_USED)
public class ResourceAlreadyExistsException extends Exception {
    private static final long serialVersionUID = 1L;

    public ResourceAlreadyExistsException(String message){
        super(message);
    }
}
