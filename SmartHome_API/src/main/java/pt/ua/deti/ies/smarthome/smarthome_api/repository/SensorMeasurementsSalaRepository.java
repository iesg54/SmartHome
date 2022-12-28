package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurementsSala;

import java.sql.Date;
import java.util.List;

@Repository
public interface SensorMeasurementsSalaRepository extends JpaRepository<SensorMeasurementsSala, Integer> {
    SensorMeasurementsSala findTopByTipoAndDivOrderByIdDesc(String tipo, Divisao div);
    Boolean existsByTipoAndDiv(String tipo, Divisao div);
    List<SensorMeasurementsSala> findAllByTipoAndDivAndDiaEquals(String tipo, Divisao div, Date dia);
    List<SensorMeasurementsSala> findAllByDiv(Divisao div);
    void deleteAllByDiv(Divisao div);

}
