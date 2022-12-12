package pt.ua.deti.ies.smarthome.smarthome_api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class InvalidValueException extends Exception {
    private static final long serialVersionUID = 1L;

    public InvalidValueException(String message){
        super(message);
    }
}
