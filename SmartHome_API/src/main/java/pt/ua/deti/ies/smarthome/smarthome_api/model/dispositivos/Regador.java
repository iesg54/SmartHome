package pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

@Entity
public class Regador extends Dispositivo{
    @Column(name="start_time")
    private Time startTime;

    @Column(name="end_time")
    private Time endTime;
}
