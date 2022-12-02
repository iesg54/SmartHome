package pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos;

import java.sql.Timestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Lampada extends Dispositivo{
    @Column(nullable = false)
    private Double luminosidade = 100.0;

    @Column(name="start_time")
    private Timestamp startTime;

    @Column(name="end_time")
    private Timestamp endTime;
}
