package pt.ua.deti.ies.smarthome.smarthome_api.services;

import java.lang.StackWalker.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.hibernate.validator.internal.util.privilegedactions.IsClassPresent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

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
            return null;
        }

        Casa house = casaOptional.get();

        List<Divisao> divisoes = house.getDivisoesCasa();
        for (Divisao divisao : divisoes){
            divisao.getSensorsDiv().forEach(sensores::add); //ig this works???
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

    public Divisao addDivisao(Integer id_casa, Integer id_div){
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

    public Double getConsumo(Integer id_div, Integer id_casa){
        Optional<Casa> casaOptional = houseRepository.findById(id_casa);
        if (!(casaOptional.isPresent())){
            return null;    // nao foi encontrada casa
        }
        Divisao division = null;
        Casa house = casaOptional.get();
        for (Divisao div : house.getDivisoesCasa()){
            if (div.getId() == id_div){
                division = div;
            }
        }
        if (division == null){
            return null;
        }

        Double soma= 0.0;
        for (Dispositivo disp : division.getDispositivos()){
            soma += disp.getConsumo_energy();
        }

        return soma;

    }

    
}
