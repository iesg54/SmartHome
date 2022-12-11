package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Casa;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;

import java.util.List;

public interface DivisionRepository extends JpaRepository<Divisao, Integer> {
    List<Divisao> findAllByCasa(Casa casa);

}
