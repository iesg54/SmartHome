package pt.ua.deti.ies.smarthome.smarthome_api.services;

import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Alerta;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.repository.AlertaRepository;
import pt.ua.deti.ies.smarthome.smarthome_api.repository.DivisionRepository;

@Service
public class AlertsService {
    @Autowired 
    AlertaRepository alertaRepository;

    @Autowired 
    DivisionRepository divisionRepository;

    public ResponseEntity<Alerta> adicionarAlerta(int idDiv, String sensor, Double valor, Timestamp stamp) throws ResourceNotFoundException{       //verificar isto depois TODO
        Divisao div = divisionRepository.findById(idDiv).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma divisão com o ID: " + idDiv));
        Alerta alerta = new Alerta(div, sensor, valor, stamp);
        return new ResponseEntity<>(alerta, HttpStatus.OK);
    }           
}
