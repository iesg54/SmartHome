package pt.ua.deti.ies.smarthome.smarthome_api.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Casa;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Sensors;
import pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos.Dispositivo;
import pt.ua.deti.ies.smarthome.smarthome_api.repository.HouseRepository;

@Service
public class HouseService {
    
    @Autowired
    private HouseRepository houseRepository;

    public List<Sensors> getSensors(Integer id_casa){
        ArrayList<Sensors> sensores = new ArrayList<>();

        Optional<Casa> casaOptional = houseRepository.findById(id_casa);
        if (!(casaOptional.isPresent())){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }

        Casa house = casaOptional.get();

        List<Divisao> divisoes = house.getDivisoesCasa();
        for (Divisao divisao : divisoes){
            divisao.getSensorsDiv().forEach(sensores::add);
        }

        return sensores;
    }

    public List<Divisao> getDivisions(Integer id_casa){
        Optional<Casa> casaOptional = houseRepository.findById(id_casa);
        if (!(casaOptional.isPresent())){
            return null;
        }

        Casa house = casaOptional.get();

        return house.getDivisoesCasa();
    }

    public Divisao addDivisao(Integer id_casa, Integer id_div, String tipo){

        //TODO - mudar isto para aceitar o tipo
        Optional<Casa> casaOptional = houseRepository.findById(id_casa);
        if (!(casaOptional.isPresent())){
            return null;
        }

        Casa house = casaOptional.get();
        for (Divisao div : house.getDivisoesCasa()){
            if (div.getId() == id_div){
                return div;
            }
        }

        return null;
    }

    public Double getConsumo(Integer id_div, Integer id_casa, String type) throws ResourceNotFoundException{
        Casa house = houseRepository.findById(id_casa).orElseThrow(() ->
                new ResourceNotFoundException("Não foi encontrada uma Casa com o ID: " + id_casa));

        Divisao division = null;

        for (Divisao div : house.getDivisoesCasa()){
            if (div.getId().equals(id_div)){
                division = div;
            }
        }

        if (division == null){
            throw new ResourceNotFoundException("Não foi encontrada uma Divisão com o ID: " + id_div + "associada à Casa " + id_casa);
        }

        Double soma= 0.0;
        for (Dispositivo disp : division.getDispositivos()){
            soma += disp.getConsumo_energy();
        }

        return soma;
    }
}
