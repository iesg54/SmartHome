package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurementsQuarto;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurementsSala;

@Repository
public interface SensorMeasurementsSalaRepository extends JpaRepository<SensorMeasurementsSala, Integer> {
    SensorMeasurementsSala findTopByTipoAndAndDivOrderByIdDesc(String tipo, Divisao div);
    Boolean existsByTipoAndDiv(String tipo, Divisao div);
}
