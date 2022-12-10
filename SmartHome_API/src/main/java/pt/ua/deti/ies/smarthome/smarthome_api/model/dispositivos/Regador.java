package pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Regador extends Dispositivo{
    @Column(name="start_time")
    private Time startTime;

    @Column(name="end_time")
    private Time endTime;
}
