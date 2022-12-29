package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurementsCozinha;

import java.sql.Date;
import java.util.List;

@Repository
public interface SensorMeasurementsCozinhaRepository extends JpaRepository<SensorMeasurementsCozinha, Integer> {
    SensorMeasurementsCozinha findTopByTipoAndDivOrderByIdDesc(String tipo, Divisao div);
    Boolean existsByTipoAndDiv(String tipo, Divisao div);
    List<SensorMeasurementsCozinha> findAllByTipoAndDivAndDiaEquals(String tipo, Divisao div, Date dia);
    void deleteAllByDiv(Divisao div);
}
