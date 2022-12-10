package pt.ua.deti.ies.smarthome.smarthome_api.services;

import java.lang.StackWalker.Option;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.internal.util.privilegedactions.IsClassPresent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Casa;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Sensors;
import pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos.Dispositivo;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoCozinha;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoExterno;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoQuarto;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoSala;
import pt.ua.deti.ies.smarthome.smarthome_api.repository.*;

@Service
@Slf4j
public class HouseService {
    
    @Autowired
    private HouseRepository houseRepository;
    @Autowired
    private ConsumoCozinhaRepository consumoCozinhaRepository;
    @Autowired
    private ConsumoQuartoRepository consumoQuartoRepository;
    @Autowired
    private ConsumoSalaRepository consumoSalaRepository;
    @Autowired
    private ConsumoExternoRepository consumoExternoRepository;
    @Autowired
    private DivisionRepository divisionRepository;

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

    public Double getConsumo(Integer id_casa) throws ResourceNotFoundException{
        Casa house = houseRepository.findById(id_casa).orElseThrow(() ->
                new ResourceNotFoundException("Não foi encontrada uma Casa com o ID: " + id_casa));

        Double total_consumo = 0.0;
        log.warn("Inside function");
        log.warn(house.toString());

        // Para cada divisão associada à Casa
        for (Divisao div : divisionRepository.findAllByCasa(house)){
            // Ver dispositivos que estão ligados atualmente, e determinar o consumo da divisão a partir do valor de consumo destes
            Double consumo_div= 0.0;

            log.warn(div.toString());
            log.warn("Inside div loop");

            for (Dispositivo disp : div.getDispositivos()){
                log.warn(disp.toString());
                if(disp.isEstado()) {
                    consumo_div += disp.getConsumo_energy();
                }
            }

            /*
            // Adicionar a nova medição à tabela de Consumos do respetivo tipo de Divisão
            java.sql.Date date = new Date(System.currentTimeMillis());
            java.sql.Timestamp stamp = new Timestamp(System.currentTimeMillis());

            if (div.getTipo().toString().equals("QUARTO")){
                ConsumoQuarto cq = new ConsumoQuarto(div);
                cq.setValor(consumo_div);
                cq.setDia(date);
                cq.setStamp(stamp);
                consumoQuartoRepository.save(cq);
            }else if(div.getTipo().toString().equals("COZINHA")){
                ConsumoCozinha cq = new ConsumoCozinha(div);
                cq.setValor(consumo_div);
                cq.setDia(date);
                cq.setStamp(stamp);
                consumoCozinhaRepository.save(cq);
            }else if(div.getTipo().toString().equals("EXTERIOR")){
                ConsumoExterno cq = new ConsumoExterno(div);
                cq.setValor(consumo_div);
                cq.setDia(date);
                cq.setStamp(stamp);
                consumoExternoRepository.save(cq);
            }else if(div.getTipo().toString().equals("SALA")){
                ConsumoSala cq = new ConsumoSala(div);
                cq.setValor(consumo_div);
                cq.setDia(date);
                cq.setStamp(stamp);
                consumoSalaRepository.save(cq);
            };
            */

            total_consumo += consumo_div;
        }

        return total_consumo;
    }
}
