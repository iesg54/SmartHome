package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoQuarto;

import java.sql.Date;
import java.util.List;

@Repository
public interface ConsumoQuartoRepository extends JpaRepository<ConsumoQuarto, Integer> {

    List<ConsumoQuarto> findByDiaGreaterThanEqualAndDiaLessThan(Date date1, Date date2);
    List<ConsumoQuarto> findAllByDiaEquals(Date dia);
}
