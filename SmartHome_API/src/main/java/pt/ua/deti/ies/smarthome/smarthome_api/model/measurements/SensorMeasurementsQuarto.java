package pt.ua.deti.ies.smarthome.smarthome_api.model.measurements;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SensorMeasurementsQuarto extends SensorMeasurements {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_div", referencedColumnName = "id")
    private Divisao div;

}
