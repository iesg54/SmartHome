package pt.ua.deti.ies.smarthome.smarthome_api.model.measurements;

import jakarta.persistence.*;

import java.sql.Timestamp;

@MappedSuperclass
public class Sensor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column
    private String tipo;
    @Column
    private Timestamp timestamp;
    @Column
    private Double valor;
}
