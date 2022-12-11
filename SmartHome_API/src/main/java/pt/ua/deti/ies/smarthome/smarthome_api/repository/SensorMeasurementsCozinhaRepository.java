package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurementsCozinha;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurementsQuarto;

@Repository
public interface SensorMeasurementsCozinhaRepository extends JpaRepository<SensorMeasurementsCozinha, Integer> {
    SensorMeasurementsCozinha findTopByTipoAndAndDivOrderByIdDesc(String tipo, Divisao div);
    Boolean existsByTipoAndDiv(String tipo, Divisao div);
}
