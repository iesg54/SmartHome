package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoSala;

@Repository
public interface ConsumoSalaRepository extends JpaRepository<ConsumoSala, Integer> {

    List<ConsumoSala> findByDivAndDiaGreaterThanEqualAndDiaLessThan(Divisao div, Date date1, Date date2);
    List<ConsumoSala> findAllByDiaEquals(Date dia);
    void deleteAllByDiv(Divisao div);
}
