package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos.Dispositivo;

import java.util.List;

public interface DispositivoRepository extends JpaRepository<Dispositivo, Integer> {
    List<Dispositivo> findAllByDiv(Divisao div);
}
