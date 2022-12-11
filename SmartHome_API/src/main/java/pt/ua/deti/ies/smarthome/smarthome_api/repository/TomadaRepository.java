package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos.Tomada;

@Repository
public interface TomadaRepository extends JpaRepository<Tomada, Integer> {
}
