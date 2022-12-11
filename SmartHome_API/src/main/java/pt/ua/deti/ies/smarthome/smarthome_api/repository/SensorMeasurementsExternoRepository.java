package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurementsExterno;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurementsQuarto;

@Repository
public interface SensorMeasurementsExternoRepository extends JpaRepository<SensorMeasurementsExterno, Integer> {
    SensorMeasurementsExterno findTopByTipoAndAndDivOrderByIdDesc(String tipo, Divisao div);
    Boolean existsByTipoAndDiv(String tipo, Divisao div);
}
