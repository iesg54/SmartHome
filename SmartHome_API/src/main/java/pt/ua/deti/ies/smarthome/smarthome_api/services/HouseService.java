package pt.ua.deti.ies.smarthome.smarthome_api.services;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.*;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.InvalidTypeException;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.*;
import pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos.Dispositivo;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.*;
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

        Casa casa = houseRepository.findById(id_casa).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma Casa com o ID: " + id_casa));

        List<Divisao> divisoes = casa.getDivisoesCasa();
        for (Divisao divisao : divisoes){
            divisao.getSensorsDiv().forEach(sensores::add);
        }

        return new ResponseEntity<List<Sensors>>(sensores, HttpStatus.OK);
    }

    public List<Divisao> getDivisions(Integer id_casa) throws ResourceNotFoundException{
        
        Casa casa = houseRepository.findById(id_casa).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma Casa com o ID: " + id_casa));
        return casa.getDivisoesCasa();
    }

    public void addDivisao(Integer id_casa, String tipo, String name) throws ResourceNotFoundException {
        Casa house = houseRepository.findById(id_casa).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma Casa com o ID: " + id_casa));
        Divisao newDiv;

        // Adicionar a nova Divisão
        if(tipo.equals(TipoDivisao.COZINHA.toString())){
            newDiv = new Divisao(name, TipoDivisao.COZINHA, house);
        }else if(tipo.equals(TipoDivisao.SALA.toString())){
            newDiv = new Divisao(name, TipoDivisao.SALA, house);
        }else if(tipo.equals(TipoDivisao.QUARTO.toString())){
            newDiv = new Divisao(name, TipoDivisao.QUARTO, house);
        }else{
            newDiv = new Divisao(name, TipoDivisao.EXTERIOR, house);
        }

        divisionRepository.save(newDiv);
    }

    public Map<Integer, Double> getLatestConsumo(Integer id_casa) throws ResourceNotFoundException, InvalidTypeException{
        Casa house = houseRepository.findById(id_casa).orElseThrow(() ->
                new ResourceNotFoundException("Não foi encontrada uma Casa com o ID: " + id_casa));

        Map<Integer, Double> consumoDivs = new HashMap<>();

        // Para cada divisão associada à Casa
        for (Divisao div : divisionRepository.findAllByCasa(house)){
            // Ver dispositivos que estão ligados atualmente, e determinar o consumo da divisão a partir do valor de consumo destes
            Double consumo_div= 0.0;

            for (Dispositivo disp : div.getDispositivos()){
                if(disp.isEstado()) {
                    consumo_div += disp.getConsumo_energy();
                }
            }

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
            }else{
                throw new InvalidTypeException("O tipo de Divisão passado não é suportado na BD! Tipo deve ser SALA, QUARTO, COZINHA ou EXTERIOR.");
            }

            consumoDivs.put(div.getId(), consumo_div);
        }

        return consumoDivs;
    }

    public Map<Integer, Map<Date, Double>> consumoLastWeek(Integer id_casa) throws ResourceNotFoundException, InvalidTypeException{
        // TODO: Alterar para trabalhar com qualquer dia de query?
        Casa house = houseRepository.findById(id_casa).orElseThrow(() ->
                new ResourceNotFoundException("Não foi encontrada uma Casa com o ID: " + id_casa));

        return getConsumoAllDivs(Date.valueOf("2022-11-30"), 7, house);
        
    }

    public Map<Integer, Map<Date, Double>> consumoLastMonth(Integer id_casa) throws ResourceNotFoundException, InvalidTypeException{
        // TODO: Alterar para trabalhar com qualquer dia de query?
        Casa house = houseRepository.findById(id_casa).orElseThrow(() ->
                new ResourceNotFoundException("Não foi encontrada uma Casa com o ID: " + id_casa));

        return getConsumoAllDivs(Date.valueOf("2022-11-06"), 30, house);
    }
    
    public Map<Integer, Map<Date, Double>> getConsumoAllDivs(Date startDay, Integer period, Casa house) throws InvalidTypeException{
        Map<Integer, Map<Date, Double>> consumoPorDiv = new HashMap<>();
        ArrayList<Double> values = new ArrayList<>();
        Double consumoMedio = 0.0;

        Date lastDay;
        Calendar cal = Calendar.getInstance();
        cal.setTime(startDay);

        for(Integer i = 0; i < period; i++){
            cal.add(Calendar.DATE, 1);
            lastDay = new Date(cal.getTimeInMillis());

            // Para cada divisão associada à Casa
            for (Divisao div : divisionRepository.findAllByCasa(house)){
                if(!consumoPorDiv.containsKey(div.getId())){
                    consumoPorDiv.put(div.getId(), new HashMap<Date, Double>());
                }

                if (div.getTipo().toString().equals("QUARTO")){
                    consumoQuartoRepository.findAllByDiaEquals(startDay).forEach(cq -> values.add(cq.getValor()));
                    consumoMedio = values.stream().mapToDouble(x -> x).average().orElse(0);
                }else if(div.getTipo().toString().equals("COZINHA")){
                    consumoCozinhaRepository.findAllByDiaEquals(startDay).forEach(cq -> values.add(cq.getValor()));
                    consumoMedio = values.stream().mapToDouble(x -> x).average().orElse(0);
                }else if(div.getTipo().toString().equals("EXTERIOR")){
                    consumoExternoRepository.findAllByDiaEquals(startDay).forEach(cq -> values.add(cq.getValor()));
                    consumoMedio = values.stream().mapToDouble(x -> x).average().orElse(0);
                }else if(div.getTipo().toString().equals("SALA")){
                    consumoSalaRepository.findAllByDiaEquals(startDay).forEach(cq -> values.add(cq.getValor()));
                    consumoMedio = values.stream().mapToDouble(x -> x).average().orElse(0);
                }else{
                    throw new InvalidTypeException("O tipo de Divisão passado não é suportado na BD! Tipo deve ser SALA, QUARTO, COZINHA ou EXTERIOR.");
                }

                values.clear();

                Map<Date, Double> old = consumoPorDiv.get(div.getId());
                old.put(startDay, consumoMedio);
                consumoPorDiv.put(div.getId(), old);

            }

            startDay = lastDay;
        }
        
        return consumoPorDiv;
    }

    public ResponseEntity<List<Utilizador>> getAllUsers(int idCasa) throws ResourceNotFoundException{
        Casa casa = houseRepository.findById(idCasa).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma Casa com o ID: " + idCasa));
        return new ResponseEntity<List<Utilizador>>(casa.getUtilizadoresCasa(), HttpStatus.OK);
    }

    public SuccessfulRequest addUser(int idCasa, String email) throws ResourceNotFoundException{
        Casa casa = houseRepository.findById(idCasa).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma Casa com o ID: " + idCasa));
        if (userRepository.existsByEmail(email)){
            List<Utilizador> users = casa.getUtilizadoresCasa();
            Utilizador user = userRepository.findByEmail(email);
            users.add(user);
            casa.setUtilizadoresCasa(users);
            user.setCasa(casa);
            userRepository.save(user);
            houseRepository.save(casa);
            return new SuccessfulRequest("Utilizador adicionado com sucesso!");
        } else {
            throw new ResourceNotFoundException("Não foi encontrado um Utilizador com o email: " + email);
        }
    }

    public void removeUser(int idCasa, String email) throws ResourceNotFoundException{
        Casa casa = houseRepository.findById(idCasa).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma Casa com o ID: " + idCasa));
        if (userRepository.existsByEmail(email)){
            List<Utilizador> users = casa.getUtilizadoresCasa();
            Utilizador user = userRepository.findByEmail(email);
            users.remove(user);
            user.setCasa(null);
            userRepository.save(user);
            houseRepository.save(casa);
        }
    }


}
