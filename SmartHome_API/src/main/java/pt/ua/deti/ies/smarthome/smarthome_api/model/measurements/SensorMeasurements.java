package pt.ua.deti.ies.smarthome.smarthome_api.model.measurements;

import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Timestamp;

@MappedSuperclass
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
