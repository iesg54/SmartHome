package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Alerta;
import pt.ua.deti.ies.smarthome.smarthome_api.services.AlertsService;

@RestController
@RequestMapping("smarthome/alert")
@CrossOrigin
public class AlertsController {
    
    @Autowired
    AlertsService alertaService;


}
