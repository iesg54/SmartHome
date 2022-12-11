package pt.ua.deti.ies.smarthome.smarthome_api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurements;
import pt.ua.deti.ies.smarthome.smarthome_api.repository.*;

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
                medidaHumidade = sensorQuartoRepository.findTopByTipoAndAndDivOrderByIdDesc("humidade", div);
            } else {
                medidaHumidade = null;
            }

            if (sensorQuartoRepository.existsByTipoAndDiv("temperatura", div)) {
                medidaTemperatura = sensorQuartoRepository.findTopByTipoAndAndDivOrderByIdDesc("temperatura", div);
            } else {
                medidaTemperatura = null;
            }

            if (sensorQuartoRepository.existsByTipoAndDiv("ar", div)) {
                medidaAr = sensorQuartoRepository.findTopByTipoAndAndDivOrderByIdDesc("ar", div);
            } else {
                medidaAr = null;
            }

            info.put("humidade", medidaHumidade);
            info.put("temperatura", medidaTemperatura);
            info.put("ar", medidaAr);
        } else if(div_type.equals("COZINHA")){
            if (sensorCozinhaRepository.existsByTipoAndDiv("humidade", div)) {
                medidaHumidade = sensorCozinhaRepository.findTopByTipoAndAndDivOrderByIdDesc("humidade", div);
            } else {
                medidaHumidade = null;
            }

            if (sensorCozinhaRepository.existsByTipoAndDiv("temperatura", div)) {
                medidaTemperatura = sensorCozinhaRepository.findTopByTipoAndAndDivOrderByIdDesc("temperatura", div);
            } else {
                medidaTemperatura = null;
            }

            if (sensorCozinhaRepository.existsByTipoAndDiv("ar", div)) {
                medidaAr = sensorCozinhaRepository.findTopByTipoAndAndDivOrderByIdDesc("ar", div);
            } else {
                medidaAr = null;
            }

            info.put("humidade", medidaHumidade);
            info.put("temperatura", medidaTemperatura);
            info.put("ar", medidaAr);
        }else if(div_type.equals("EXTERIOR")){
            if (sensorExternoRepository.existsByTipoAndDiv("humidade", div)) {
                medidaHumidade = sensorExternoRepository.findTopByTipoAndAndDivOrderByIdDesc("humidade", div);
            } else {
                medidaHumidade = null;
            }

            if (sensorExternoRepository.existsByTipoAndDiv("temperatura", div)) {
                medidaTemperatura = sensorExternoRepository.findTopByTipoAndAndDivOrderByIdDesc("temperatura", div);
            } else {
                medidaTemperatura = null;
            }

            if (sensorExternoRepository.existsByTipoAndDiv("ar", div)) {
                medidaAr = sensorExternoRepository.findTopByTipoAndAndDivOrderByIdDesc("ar", div);
            } else {
                medidaAr = null;
            }

            info.put("humidade", medidaHumidade);
            info.put("temperatura", medidaTemperatura);
            info.put("ar", medidaAr);
        }else if(div_type.equals("SALA")){
            if (sensorSalaRepository.existsByTipoAndDiv("humidade", div)) {
                medidaHumidade = sensorSalaRepository.findTopByTipoAndAndDivOrderByIdDesc("humidade", div);
            } else {
                medidaHumidade = null;
            }

            if (sensorSalaRepository.existsByTipoAndDiv("temperatura", div)) {
                medidaTemperatura = sensorSalaRepository.findTopByTipoAndAndDivOrderByIdDesc("temperatura", div);
            } else {
                medidaTemperatura = null;
            }

            if (sensorSalaRepository.existsByTipoAndDiv("ar", div)) {
                medidaAr = sensorSalaRepository.findTopByTipoAndAndDivOrderByIdDesc("ar", div);
            } else {
                medidaAr = null;
            }

            info.put("humidade", medidaHumidade);
            info.put("temperatura", medidaTemperatura);
            info.put("ar", medidaAr);
        };

        return info;
    }
}
