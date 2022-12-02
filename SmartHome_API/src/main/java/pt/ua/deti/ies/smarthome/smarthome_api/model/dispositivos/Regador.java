package pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import java.sql.Timestamp;

@Entity
public class Regador extends Dispositivo{
    @Column(name="start_time")
    private Timestamp startTime;

    @Column(name="end_time")
    private Timestamp endTime;
}
