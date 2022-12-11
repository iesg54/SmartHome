package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos.Lampada;

@Repository
public interface LampadaRepository extends JpaRepository<Lampada, Integer> {
}
