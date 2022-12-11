package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurementsQuarto;

@Repository
public interface SensorMeasurementsQuartoRepository extends JpaRepository<SensorMeasurementsQuarto, Integer> {
    SensorMeasurementsQuarto findTopByTipoAndAndDivOrderByIdDesc(String tipo, Divisao div);
    Boolean existsByTipoAndDiv(String tipo, Divisao div);
}
