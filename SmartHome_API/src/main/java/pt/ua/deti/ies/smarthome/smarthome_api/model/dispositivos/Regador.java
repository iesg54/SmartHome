package pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos;

import java.sql.Time;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    public void setStart(Time start){
        this.startTime = start;
    }

    public void setFinnish(Time finish){
        this.endTime = finish;
    }

}
