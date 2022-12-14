package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Alerta;
import pt.ua.deti.ies.smarthome.smarthome_api.services.AlertService;

@RestController
@RequestMapping("smarthome/alert")
@CrossOrigin
public class AlertController {
    
    @Autowired 
    AlertService alertaService;

    @PostMapping("{idDiv}/addAlert")
    public ResponseEntity<Alerta> addAlert(@PathVariable(name="idDiv") int div, 
                                            @RequestParam(name="sensor") String sensor, 
                                            @RequestParam(name="valor") Double valor, 
                                            @RequestParam(name="stamp") Timestamp stamp) throws ResourceNotFoundException{   
        return alertaService.adicionarAlerta(div, sensor, valor, stamp);
    }

}
