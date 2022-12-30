package pt.ua.deti.ies.smarthome.smarthome_api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.InvalidTypeException;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Alerta;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos.*;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoCozinha;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoExterno;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoQuarto;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoSala;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurements;
import pt.ua.deti.ies.smarthome.smarthome_api.repository.*;
import pt.ua.deti.ies.smarthome.smarthome_api.utils.SuccessfulRequest;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.*;

@Slf4j
@Service
public class DivisionService {

    @Autowired
    private DivisionRepository divisionRepository;
    @Autowired
    private SensorMeasurementsCozinhaRepository sensorCozinhaRepository;
    @Autowired
    private SensorMeasurementsQuartoRepository sensorQuartoRepository;
    @Autowired
    private SensorMeasurementsSalaRepository sensorSalaRepository;
    @Autowired
    private SensorMeasurementsExternoRepository sensorExternoRepository;
    @Autowired
    private AlertaRepository alertaRepository;
    @Autowired
    private ConsumoCozinhaRepository consumoCozinhaRepository;
    @Autowired
    private ConsumoQuartoRepository consumoQuartoRepository;
    @Autowired
    private ConsumoExternoRepository consumoExternoRepository;
    @Autowired
    private ConsumoSalaRepository consumoSalaRepository;
    @Autowired
    private DispositivoRepository dispositivoRepository;
    @Autowired
    private ACRepository acRepository;
    @Autowired
    private TomadaRepository tomadaRepository;
    @Autowired
    private LampadaRepository lampadaRepository;
    @Autowired
    private RegadorRepository regadorRepository;

    public Map<String, SensorMeasurements> latestSensorInfo(Integer idDiv) throws ResourceNotFoundException {
        Divisao div =  divisionRepository.findById(idDiv).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma divisão com o ID " + idDiv));
        Map<String, SensorMeasurements> info = new HashMap<>();
        String div_type = div.getTipo().toString();
        SensorMeasurements medidaHumidade, medidaTemperatura, medidaAr;

        if (div_type.equals("QUARTO")) {
            if (sensorQuartoRepository.existsByTipoAndDiv("humidade", div)) {
                medidaHumidade = sensorQuartoRepository.findTopByTipoAndDivOrderByIdDesc("humidade", div);
            } else {
                medidaHumidade = null;
            }

            if (sensorQuartoRepository.existsByTipoAndDiv("temperatura", div)) {
                medidaTemperatura = sensorQuartoRepository.findTopByTipoAndDivOrderByIdDesc("temperatura", div);
            } else {
                medidaTemperatura = null;
            }

            if (sensorQuartoRepository.existsByTipoAndDiv("ar", div)) {
                medidaAr = sensorQuartoRepository.findTopByTipoAndDivOrderByIdDesc("ar", div);
            } else {
                medidaAr = null;
            }

            info.put("humidade", medidaHumidade);
            info.put("temperatura", medidaTemperatura);
            info.put("ar", medidaAr);
        } else if(div_type.equals("COZINHA")){
            if (sensorCozinhaRepository.existsByTipoAndDiv("humidade", div)) {
                medidaHumidade = sensorCozinhaRepository.findTopByTipoAndDivOrderByIdDesc("humidade", div);
            } else {
                medidaHumidade = null;
            }

            if (sensorCozinhaRepository.existsByTipoAndDiv("temperatura", div)) {
                medidaTemperatura = sensorCozinhaRepository.findTopByTipoAndDivOrderByIdDesc("temperatura", div);
            } else {
                medidaTemperatura = null;
            }

            if (sensorCozinhaRepository.existsByTipoAndDiv("ar", div)) {
                medidaAr = sensorCozinhaRepository.findTopByTipoAndDivOrderByIdDesc("ar", div);
            } else {
                medidaAr = null;
            }

            info.put("humidade", medidaHumidade);
            info.put("temperatura", medidaTemperatura);
            info.put("ar", medidaAr);
        }else if(div_type.equals("EXTERIOR")){
            if (sensorExternoRepository.existsByTipoAndDiv("humidade", div)) {
                medidaHumidade = sensorExternoRepository.findTopByTipoAndDivOrderByIdDesc("humidade", div);
            } else {
                medidaHumidade = null;
            }

            if (sensorExternoRepository.existsByTipoAndDiv("temperatura", div)) {
                medidaTemperatura = sensorExternoRepository.findTopByTipoAndDivOrderByIdDesc("temperatura", div);
            } else {
                medidaTemperatura = null;
            }

            if (sensorExternoRepository.existsByTipoAndDiv("ar", div)) {
                medidaAr = sensorExternoRepository.findTopByTipoAndDivOrderByIdDesc("ar", div);
            } else {
                medidaAr = null;
            }

            info.put("humidade", medidaHumidade);
            info.put("temperatura", medidaTemperatura);
            info.put("ar", medidaAr);
        }else if(div_type.equals("SALA")){
            if (sensorSalaRepository.existsByTipoAndDiv("humidade", div)) {
                medidaHumidade = sensorSalaRepository.findTopByTipoAndDivOrderByIdDesc("humidade", div);
            } else {
                medidaHumidade = null;
            }

            if (sensorSalaRepository.existsByTipoAndDiv("temperatura", div)) {
                medidaTemperatura = sensorSalaRepository.findTopByTipoAndDivOrderByIdDesc("temperatura", div);
            } else {
                medidaTemperatura = null;
            }

            if (sensorSalaRepository.existsByTipoAndDiv("ar", div)) {
                medidaAr = sensorSalaRepository.findTopByTipoAndDivOrderByIdDesc("ar", div);
            } else {
                medidaAr = null;
            }

            info.put("humidade", medidaHumidade);
            info.put("temperatura", medidaTemperatura);
            info.put("ar", medidaAr);
        };

        return info;
    }


    public Map<Integer, Map<String, String>> weeklySensorInfo(Integer idDiv) throws ResourceNotFoundException {
        Divisao div =  divisionRepository.findById(idDiv).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma divisão com o ID " + idDiv));
        Map<Integer, Map<String, String>> weeklyInfo = new HashMap<>();

        // Percorrer os últimos 7 dias, e ir buscar os valores de Tmax, Tmin, Hmedia e COmedio para cada dia
        // TODO: Date firstDay = Date.valueOf("2022-12-07");
        Date firstDay = new Date(System.currentTimeMillis());
        Date lastDay;
        Calendar cal = Calendar.getInstance();
        cal.setTime(firstDay);

        for(Integer i = 0; i < 7; i++){
            Map<String, String> dailyInfo = new HashMap<>();
            cal.add(Calendar.DATE, -1);

            lastDay = new Date(cal.getTimeInMillis());

            dailyInfo.put("Dia", firstDay.toString());

            ArrayList<String> tempInfo = getTempInfo(div, firstDay);

            dailyInfo.put("Tmax", tempInfo.get(0));
            dailyInfo.put("Tmin", tempInfo.get(1));
            dailyInfo.put("Avg humidade", getHumidadeInfo(div, firstDay));
            dailyInfo.put("Avg ar", getArInfo(div, firstDay));

            weeklyInfo.put(i, dailyInfo);
            firstDay = lastDay;
        }

        return weeklyInfo;
    }


    public ArrayList<String> getTempInfo(Divisao div, Date day){
        ArrayList<Double> measuredValues = new ArrayList<>();
        ArrayList<String> processedValues = new ArrayList<>();

        if (div.getTipo().toString().equals("QUARTO")) {
            sensorQuartoRepository.findAllByTipoAndDivAndDiaEquals("temperatura", div, day).forEach(cq -> measuredValues.add(cq.getValor()));
            processedValues.add(Double.toString(
                                    measuredValues.stream().mapToDouble(x -> x).max().orElse(0)));

            processedValues.add(Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).min().orElse(0)));
        } else if(div.getTipo().toString().equals("COZINHA")){
            sensorCozinhaRepository.findAllByTipoAndDivAndDiaEquals("temperatura", div, day).forEach(cq -> measuredValues.add(cq.getValor()));
            processedValues.add(Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).max().orElse(0)));

            processedValues.add(Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).min().orElse(0)));
        }else if(div.getTipo().toString().equals("EXTERIOR")){
            sensorExternoRepository.findAllByTipoAndDivAndDiaEquals("temperatura", div, day).forEach(cq -> measuredValues.add(cq.getValor()));
            processedValues.add(Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).max().orElse(0)));

            processedValues.add(Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).min().orElse(0)));
        }else if(div.getTipo().toString().equals("SALA")){
            sensorSalaRepository.findAllByTipoAndDivAndDiaEquals("temperatura", div, day).forEach(cq -> measuredValues.add(cq.getValor()));
            processedValues.add(Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).max().orElse(0)));

            processedValues.add(Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).min().orElse(0)));
        }

        return processedValues;
    }


    public String getHumidadeInfo(Divisao div, Date day){
        ArrayList<Double> measuredValues = new ArrayList<>();
        String processedValue = "0";

        if (div.getTipo().toString().equals("QUARTO")) {
            sensorQuartoRepository.findAllByTipoAndDivAndDiaEquals("humidade", div, day).forEach(cq -> measuredValues.add(cq.getValor()));
            processedValue = Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).average().orElse(0));
        } else if(div.getTipo().toString().equals("COZINHA")){
            sensorCozinhaRepository.findAllByTipoAndDivAndDiaEquals("humidade", div, day).forEach(cq -> measuredValues.add(cq.getValor()));
            processedValue = Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).average().orElse(0));
        }else if(div.getTipo().toString().equals("EXTERIOR")){
            sensorExternoRepository.findAllByTipoAndDivAndDiaEquals("humidade", div, day).forEach(cq -> measuredValues.add(cq.getValor()));
            processedValue = Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).average().orElse(0));
        }else if(div.getTipo().toString().equals("SALA")){
            sensorSalaRepository.findAllByTipoAndDivAndDiaEquals("humidade", div, day).forEach(cq -> measuredValues.add(cq.getValor()));
            processedValue = Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).average().orElse(0));
        }

        return processedValue;
    }

    public String getArInfo(Divisao div, Date day){
        ArrayList<Double> measuredValues = new ArrayList<>();
        String processedValue = "0";

        if (div.getTipo().toString().equals("QUARTO")) {
            sensorQuartoRepository.findAllByTipoAndDivAndDiaEquals("ar", div, day).forEach(cq -> measuredValues.add(cq.getValor()));
            processedValue = Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).average().orElse(0));
        } else if(div.getTipo().toString().equals("COZINHA")){
            sensorCozinhaRepository.findAllByTipoAndDivAndDiaEquals("ar", div, day).forEach(cq -> measuredValues.add(cq.getValor()));
            processedValue = Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).average().orElse(0));
        }else if(div.getTipo().toString().equals("EXTERIOR")){
            sensorExternoRepository.findAllByTipoAndDivAndDiaEquals("ar", div, day).forEach(cq -> measuredValues.add(cq.getValor()));
            processedValue = Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).average().orElse(0));
        }else if(div.getTipo().toString().equals("SALA")){
            sensorSalaRepository.findAllByTipoAndDivAndDiaEquals("ar", div, day).forEach(cq -> measuredValues.add(cq.getValor()));
            processedValue = Double.toString(
                    measuredValues.stream().mapToDouble(x -> x).average().orElse(0));
        }

        return processedValue;
    }

    public List<Alerta> getAlerts(Integer idDiv) throws ResourceNotFoundException {
        Divisao div =  divisionRepository.findById(idDiv).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma divisão com o ID " + idDiv));
        List<Alerta> alertas = alertaRepository.findAllByDiv(div);

        if(alertas.size() > 0){
            return alertas;
        }else{
            throw new ResourceNotFoundException("Não foram encontrados alertas para a divisão com o ID " + idDiv);
        }
    }

    public List<Dispositivo> getDispositivos(Integer idDiv) throws ResourceNotFoundException {
        Divisao div =  divisionRepository.findById(idDiv).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma divisão com o ID " + idDiv));

        return dispositivoRepository.findAllByDiv(div);
    }

    public void addNewDevice(Integer idDiv, String type, String name, Double consumption) throws ResourceNotFoundException, InvalidTypeException{
        Divisao div =  divisionRepository.findById(idDiv).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma divisão com o ID " + idDiv));

        if(type.equals("LAMPADA")){
            Dispositivo d = lampadaRepository.save(new Lampada(100.0, null, null));
            d.setDiv(div);
            d.setConsumo_energy(consumption);
            d.setEstado(false);
            d.setTipo(TipoDispositivo.LAMPADA);
            dispositivoRepository.save(d);
        }else if(type.equals("AC")){
            Dispositivo d = acRepository.save(new AC());
            d.setDiv(div);
            d.setConsumo_energy(consumption);
            d.setEstado(false);
            d.setTipo(TipoDispositivo.AC);
            dispositivoRepository.save(d);
        }else if(type.equals("REGADOR")){
            Dispositivo d = regadorRepository.save(new Regador());
            d.setDiv(div);
            d.setConsumo_energy(consumption);
            d.setEstado(false);
            d.setTipo(TipoDispositivo.REGADOR);
            dispositivoRepository.save(d);
        }else if(type.equals("TOMADA")){
            Dispositivo d = tomadaRepository.save(new Tomada(name));
            d.setDiv(div);
            d.setConsumo_energy(consumption);
            d.setEstado(false);
            d.setTipo(TipoDispositivo.TOMADA);
            dispositivoRepository.save(d);
        }else{
            throw new InvalidTypeException("O tipo de Dispositivo passado não é suportado na BD! Tipo deve ser TOMADA, AC, REGADOR ou LAMPADA.");
        }

    }

    public void removeDevice(Integer idDiv, Integer idDev) throws ResourceNotFoundException, InvalidTypeException{
        Divisao div =  divisionRepository.findById(idDiv).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma divisão com o ID " + idDiv));
        Dispositivo device = dispositivoRepository.findById(idDev).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada um dispositivo com o ID " + idDiv));

        div.getDispositivos().remove(device);
        divisionRepository.save(div);
        dispositivoRepository.delete(device);
    }

    public SuccessfulRequest toggleDeviceStat(int idDiv, int idDevice) throws ResourceNotFoundException{
        Divisao div = divisionRepository.findById(idDiv).orElseThrow(
            () -> new ResourceNotFoundException("Não encontrada nenhuma divisao com o ID " + idDiv));


        for (Dispositivo device : div.getDispositivos()){
            if (device.getId() == idDevice){
                device.setEstado(!(device.isEstado()));
                dispositivoRepository.save(device);
                return new SuccessfulRequest("Changed state");
            }
        }

        throw new ResourceNotFoundException("Não foi encontrado um dispositivo com o ID " + idDevice);
    }

    public ResponseEntity<Map<Date, Double>> getDivisionEnergyConsumption(int idDiv) throws ResourceNotFoundException, InvalidTypeException{
        Divisao div = divisionRepository.findById(idDiv).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma divisão com o ID " + idDiv));
        log.debug("got house info");
        Map<Date, Double> lista = new HashMap<>();

        Date date1 = new Date(System.currentTimeMillis());
        // TODO: Date date1 = Date.valueOf("2022-11-30");
        Date date2 = null;
        Calendar cal = Calendar.getInstance();
        cal.setTime(date1);
        

        if (div.getTipo().toString().equals("COZINHA")){
            for (int i = 1; i<=7; i++){
                cal.add(Calendar.DATE, -1);
                date2 = new Date(cal.getTimeInMillis());
                List<ConsumoCozinha> valores = consumoCozinhaRepository.findByDivAndDiaGreaterThanEqualAndDiaLessThan(div, date2, date1);
                Double soma;
                soma = valores.stream().mapToDouble(valor -> valor.getValor()).average().orElse(0);
                lista.put(date1, soma);
                date1 = date2;
            }
        }else if(div.getTipo().toString().equals("QUARTO")){
            for (int i = 1; i<=7; i++){
                cal.add(Calendar.DATE, -1);
                date2 = new Date(cal.getTimeInMillis());
                List<ConsumoQuarto> valores = consumoQuartoRepository.findByDivAndDiaGreaterThanEqualAndDiaLessThan(div, date2, date1);
                Double soma = 0.0;
                soma = valores.stream().mapToDouble(valor -> valor.getValor()).average().orElse(0);
                lista.put(date1, soma);
                date1 = date2;
            }
        }else if(div.getTipo().toString().equals("EXTERIOR")){ //????
            for (int i = 1; i<=7; i++){
                cal.add(Calendar.DATE, -1);
                date2 = new Date(cal.getTimeInMillis());
                List<ConsumoExterno> valores = consumoExternoRepository.findByDivAndDiaGreaterThanEqualAndDiaLessThan(div, date2, date1);
                Double soma = 0.0;
                soma = valores.stream().mapToDouble(valor -> valor.getValor()).average().orElse(0);
                lista.put(date1, soma);
                date1 = date2;
            }
        }else if(div.getTipo().toString().equals("SALA")){
            for (int i = 1; i<=7; i++){
                cal.add(Calendar.DATE, -1);
                date2 = new Date(cal.getTimeInMillis());
                List<ConsumoSala> valores = consumoSalaRepository.findByDivAndDiaGreaterThanEqualAndDiaLessThan(div, date2, date1);
                Double soma = 0.0;
                soma = valores.stream().mapToDouble(valor -> valor.getValor()).average().orElse(0);
                lista.put(date1, soma);
                date1 = date2;
            }
        }else{
            throw new InvalidTypeException("O tipo de Divisão passado não é suportado na BD! Tipo deve ser SALA, QUARTO, COZINHA ou EXTERIOR.");
        }

        return new ResponseEntity<Map<Date, Double>> (lista, HttpStatus.OK);
    }

    public SuccessfulRequest updateRegador(int idDiv, int idDisp, Time start_time, Time end_time) throws ResourceNotFoundException{
        Divisao div = divisionRepository.findById(idDiv).orElseThrow(
            () -> new ResourceNotFoundException("Não foi encontrada nenhuma divisão com o ID " + idDiv));
        boolean foundDisp = false;

        for (Dispositivo disp : div.getDispositivos()){
            if (idDisp == disp.getId()){
                ((Regador) disp).setStart(start_time);
                ((Regador) disp).setFinnish(end_time);
                dispositivoRepository.save(disp);
                foundDisp = true;
                break;
            }
        }

        if(!foundDisp){
            throw new ResourceNotFoundException("Não foi encontrada nenhum dispositivo com o ID " + idDisp);
        }

        divisionRepository.save(div);
        return new SuccessfulRequest("updated successfully");
    }

    public SuccessfulRequest updateAC(int idDiv, int idDisp, Double tautal, Double tmin, Double tmax) throws ResourceNotFoundException{
        Divisao div = divisionRepository.findById(idDiv).orElseThrow(
            () -> new ResourceNotFoundException("Não encontrada nenhuma divisão com o ID " + idDiv));
        boolean foundDisp = false;

        for (Dispositivo disp : div.getDispositivos()){
            if (idDisp == disp.getId()){
                ((AC) disp).setTempAtual(tautal);
                ((AC) disp).setTempMax(tmax);
                ((AC) disp).setTempMin(tmin);
                foundDisp = true;
                break;
            }
            dispositivoRepository.save(disp);
            
        }

        if(!foundDisp){
            throw new ResourceNotFoundException("Não foi encontrada nenhum dispositivo com o ID " + idDisp);
        }

        divisionRepository.save(div);
        return new SuccessfulRequest("updated successfully");
    }

    public SuccessfulRequest updateLampada(int idDiv, int idDisp, Double luminosidade, Time startTime, Time endTime) throws ResourceNotFoundException{
        Divisao div = divisionRepository.findById(idDiv).orElseThrow(
            () -> new ResourceNotFoundException("Não encontrada nenhuma divisão com o ID " + idDiv));
        boolean foundDisp = false;

        if(luminosidade > 100 || luminosidade < 0){
            throw new ResourceNotFoundException("O valor de luminosidade utilizado não é permitido!");
        }

        for (Dispositivo disp : div.getDispositivos()){
            if (disp instanceof Lampada){
                ((Lampada) disp).setLuminosidade(luminosidade);
                ((Lampada) disp).setStartTime(startTime);
                ((Lampada) disp).setEndTime(endTime);
                foundDisp = true;
                break;
            }
            dispositivoRepository.save(disp);
            
        }

        if(!foundDisp){
            throw new ResourceNotFoundException("Não foi encontrada nenhum dispositivo com o ID " + idDisp);
        }

        divisionRepository.save(div);
        return new SuccessfulRequest("updated successfully");
    }

    public SuccessfulRequest adicionarAlerta(int idDiv, String sensor, Double valor, Timestamp stamp) throws ResourceNotFoundException{
        Divisao div = divisionRepository.findById(idDiv).orElseThrow(() -> new ResourceNotFoundException("Não foi encontrada uma divisão com o ID: " + idDiv));
        Alerta alerta = new Alerta();

        alerta.setDiv(div);
        alerta.setSensor(sensor);
        alerta.setValor(valor);
        alerta.setStamp(stamp);
        alertaRepository.save(alerta);

        return new SuccessfulRequest("updated successfully");
    }

}
