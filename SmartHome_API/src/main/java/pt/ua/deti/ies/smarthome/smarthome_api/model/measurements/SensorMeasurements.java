package pt.ua.deti.ies.smarthome.smarthome_api.model.measurements;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.sql.Timestamp;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SensorMeasurements {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    @Column
    private String tipo;
    @Column
    private Date dia;
    @Column
    private Timestamp stamp;
    @Column
    private Double valor;
}
