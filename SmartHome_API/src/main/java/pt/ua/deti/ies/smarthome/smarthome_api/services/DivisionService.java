package pt.ua.deti.ies.smarthome.smarthome_api.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurements;
import pt.ua.deti.ies.smarthome.smarthome_api.repository.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

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
        // TODO: Alterar para trabalhar com qualquer dia de query?
        Date firstDay = Date.valueOf("2022-12-07");
        Date lastDay;
        Calendar cal = Calendar.getInstance();
        cal.setTime(firstDay);

        for(Integer i = 0; i < 7; i++){
            Map<String, String> dailyInfo = new HashMap<>();
            cal.add(Calendar.DATE, 1);

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

}
