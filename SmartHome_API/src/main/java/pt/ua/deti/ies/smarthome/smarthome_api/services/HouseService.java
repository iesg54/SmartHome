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
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Casa;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Sensors;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Utilizador;
import pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos.Dispositivo;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoCozinha;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoExterno;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoQuarto;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoSala;
import pt.ua.deti.ies.smarthome.smarthome_api.repository.*;
import pt.ua.deti.ies.smarthome.smarthome_api.utils.SuccessfulRequest;

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
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<List<Sensors>> getSensors(Integer id_casa) throws ResourceNotFoundException{
        ArrayList<Sensors> sensores = new ArrayList<>();

        Casa casa = houseRepository.findById(id_casa).orElseThrow(() -> new ResourceNotFoundException("Could not found a house with that id"));

        List<Divisao> divisoes = casa.getDivisoesCasa();
        for (Divisao divisao : divisoes){
            divisao.getSensorsDiv().forEach(sensores::add);
        }

        return new ResponseEntity<List<Sensors>>(sensores, HttpStatus.OK);
    }

    public List<Divisao> getDivisions(Integer id_casa) throws ResourceNotFoundException{
        
        Casa casa = houseRepository.findById(id_casa).orElseThrow(() -> new ResourceNotFoundException("Could not found a house with that id"));
        return casa.getDivisoesCasa();
    }

    public Divisao addDivisao(Integer id_casa, Integer id_div) throws ResourceNotFoundException{

        //TODO - mudar isto para aceitar o tipo
        Casa house = houseRepository.findById(id_casa).orElseThrow(() -> new ResourceNotFoundException("Could not found a house with that id"));

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

    public ResponseEntity<List<Utilizador>> getAllUsers(int idCasa) throws ResourceNotFoundException{
        Casa casa = houseRepository.findById(idCasa).orElseThrow(() -> new ResourceNotFoundException("Could not found a house with that id"));
        return new ResponseEntity<List<Utilizador>>(casa.getUtilizadoresCasa(), HttpStatus.OK);
    }

    public SuccessfulRequest addUser(int idCasa, int idUser) throws ResourceNotFoundException{
        Casa casa = houseRepository.findById(idCasa).orElseThrow(() -> new ResourceNotFoundException("Could not found a house with that id"));
        if (userRepository.findById(idUser).isPresent()){
            List<Utilizador> users = casa.getUtilizadoresCasa();
            users.add(userRepository.findById(idUser).orElseThrow(()-> new ResourceNotFoundException("Could not find that user...")));
            casa.setUtilizadoresCasa(users);
        }
        houseRepository.save(casa);
        return new SuccessfulRequest("Added user sucessfully");
    }


}
