package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.ConsumoCozinha;

@Repository
public interface ConsumoCozinhaRepository extends JpaRepository<ConsumoCozinha, Integer> {

    List<ConsumoCozinha> findByDiaGreaterThanEqualAndDiaLessThan(Date today, Date today2);
}
