package pt.ua.deti.ies.smarthome.smarthome_api.services;

import java.sql.Date;
import java.sql.Time;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos.*;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.*;
import pt.ua.deti.ies.smarthome.smarthome_api.repository.*;
import pt.ua.deti.ies.smarthome.smarthome_api.utils.SuccessfulRequest;

@Service
@Slf4j
public class DivisionService {
    @Autowired
    private ConsumoCozinhaRepository consumoCozinhaRepository;
    @Autowired
    private DispositivoRepository dispositivoRepository;
    @Autowired
    private ConsumoQuartoRepository consumoQuartoRepository;
    @Autowired
    private ConsumoSalaRepository consumoSalaRepository;
    @Autowired
    private ConsumoExternoRepository consumoExternoRepository;
    @Autowired
    private DivisionRepository divisionRepository;

    public SuccessfulRequest toggleDeviceStat(int idDiv, int idDevice) throws ResourceNotFoundException{
        Divisao div = divisionRepository.findById(idDiv).orElseThrow(
            () -> new ResourceNotFoundException("Não encontrada nenhuma divisao com esse id..."));


        for (Dispositivo device : div.getDispositivos()){
            if (device.getId() == idDevice){
                device.setEstado(!(device.isEstado()));
                return new SuccessfulRequest("Changed state");
            }
        }

        throw new ResourceNotFoundException("Coudn't find that device...");
        
    }

    public ResponseEntity<List<Double>> getDivisionEnergyConsumptionS(int idDiv, String type) throws ResourceNotFoundException{

        log.debug("got house info");
        LinkedList<Double> lista = new LinkedList<>();

        Date date1 = Date.valueOf("2022-11-30");    //mudar isto TODO
        Date date2 = null;
        Calendar cal = Calendar.getInstance();
        cal.setTime(date1);
        

        if (type.toLowerCase().equals("cozinha")){
            for (int i = 1; i<=7; i++){
                cal.add(Calendar.DATE, 1);
                date2 = new Date(cal.getTimeInMillis());
                List<ConsumoCozinha> valores = consumoCozinhaRepository.findByDiaGreaterThanEqualAndDiaLessThan(date1, date2);
                Double soma;
                soma = valores.stream().mapToDouble(valor -> valor.getValor()).average().orElse(0);
                lista.add(soma);
                date1 = date2;
            }
            
        }
        else if(type.toLowerCase().equals("quarto")){
            for (int i = 1; i<=7; i++){
                cal.add(Calendar.DATE, 1);
                date2 = new Date(cal.getTimeInMillis());
                List<ConsumoQuarto> valores = consumoQuartoRepository.findByDiaGreaterThanEqualAndDiaLessThan(date1, date2);
                Double soma = 0.0;
                soma = valores.stream().mapToDouble(valor -> valor.getValor()).average().orElse(0);
                lista.add(soma);
                date1 = date2;
            }
        }
        else if(type.toLowerCase().equals("exterior")){ //????
            for (int i = 1; i<=7; i++){
                cal.add(Calendar.DATE, 1);
                date2 = new Date(cal.getTimeInMillis());
                List<ConsumoExterno> valores = consumoExternoRepository.findByDiaGreaterThanEqualAndDiaLessThan(date1, date2);
                Double soma = 0.0;
                soma = valores.stream().mapToDouble(valor -> valor.getValor()).average().orElse(0);
                lista.add(soma);
                date1 = date2;
            }
        }
        else if(type.toLowerCase().equals("sala")){
            for (int i = 1; i<=7; i++){
                cal.add(Calendar.DATE, 1);
                date2 = new Date(cal.getTimeInMillis());
                List<ConsumoSala> valores = consumoSalaRepository.findByDiaGreaterThanEqualAndDiaLessThan(date1, date2);
                Double soma = 0.0;
                soma = valores.stream().mapToDouble(valor -> valor.getValor()).average().orElse(0);
                lista.add(soma);
                date1 = date2;
            }
        }

        return new ResponseEntity<List<Double>> (lista, HttpStatus.OK);


    }

    public SuccessfulRequest updateRegador(int idDiv, Time start_time, Time end_time) throws ResourceNotFoundException{
        Divisao div = divisionRepository.findById(idDiv).orElseThrow(
            () -> new ResourceNotFoundException("Não encontrada nenhuma divisao com esse id..."));

        List<Dispositivo> dispositivos = div.getDispositivos();
        for (Dispositivo disp : dispositivos){
            if (disp instanceof Regador){
                ((Regador) disp).setStart(start_time);
                ((Regador) disp).setFinnish(end_time);
            }
            dispositivoRepository.save(disp);
        }

        divisionRepository.save(div);
        return new SuccessfulRequest("updated successfully");
    }

    public SuccessfulRequest updateAC(int idDiv, Double tautal, Double tmin, Double tmax) throws ResourceNotFoundException{
        Divisao div = divisionRepository.findById(idDiv).orElseThrow(
            () -> new ResourceNotFoundException("Não encontrada nenhuma divisao com esse id..."));

        List<Dispositivo> dispositivos = div.getDispositivos();
        for (Dispositivo disp : dispositivos){
            if (disp instanceof AC){
                ((AC) disp).setTempAtual(tautal);
                ((AC) disp).setTempMax(tmax);
                ((AC) disp).setTempMin(tmin);
            }
            dispositivoRepository.save(disp);
            
        }
        divisionRepository.save(div);
        return new SuccessfulRequest("updated successfully");
    }

    public SuccessfulRequest updateLamapada(int idDiv, Double luminosidade, Time startTime, Time endTime) throws ResourceNotFoundException{
        Divisao div = divisionRepository.findById(idDiv).orElseThrow(
            () -> new ResourceNotFoundException("Não encontrada nenhuma divisao com esse id..."));

        List<Dispositivo> dispositivos = div.getDispositivos();
        for (Dispositivo disp : dispositivos){
            if (disp instanceof Lampada){
                ((Lampada) disp).setLuminosidade(luminosidade);
                ((Lampada) disp).setStartTime(startTime);
                ((Lampada) disp).setEndTime(endTime);
            }
            dispositivoRepository.save(disp);
            
        }
        divisionRepository.save(div);
        return new SuccessfulRequest("updated successfully");
    }

}
