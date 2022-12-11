package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurementsExterno;

import java.sql.Date;
import java.util.List;

@Repository
public interface SensorMeasurementsExternoRepository extends JpaRepository<SensorMeasurementsExterno, Integer> {
    SensorMeasurementsExterno findTopByTipoAndDivOrderByIdDesc(String tipo, Divisao div);
    Boolean existsByTipoAndDiv(String tipo, Divisao div);
    List<SensorMeasurementsExterno> findAllByTipoAndDivAndDiaEquals(String tipo, Divisao div, Date dia);
}
