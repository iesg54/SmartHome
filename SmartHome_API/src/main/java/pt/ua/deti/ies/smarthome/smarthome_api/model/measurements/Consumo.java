package pt.ua.deti.ies.smarthome.smarthome_api.model.measurements;

import jakarta.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

@MappedSuperclass
public class Consumo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column
    private Date dia;
    @Column
    private Timestamp timestamp;
    @Column
    private Double valor;

}
