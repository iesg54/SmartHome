package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoQuarto;

@Repository
public interface ConsumoQuartoRepository extends JpaRepository<ConsumoQuarto, Integer> {

    List<ConsumoQuarto> findByDivAndDiaGreaterThanEqualAndDiaLessThan(Divisao div, Date date1, Date date2);
    List<ConsumoQuarto> findAllByDiaEquals(Date dia);
}
