package pt.ua.deti.ies.smarthome.smarthome_api.model.measurements;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;

@Entity
public class SensorMeasurementsQuarto extends SensorMeasurements {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_div", referencedColumnName = "id")
    private Divisao div;

}
