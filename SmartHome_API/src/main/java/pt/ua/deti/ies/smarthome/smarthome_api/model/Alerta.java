package pt.ua.deti.ies.smarthome.smarthome_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Alerta {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="id_divisao", nullable = false)
    private Divisao div;
    @Column(nullable = false)
    private String sensor;
    @Column(nullable = false)
    private Double valor;
    @Column
    private Timestamp stamp;

    public Alerta(Divisao div, String sensor, Double valor, Timestamp stamp){
        this.div = div;
        this.sensor = sensor;
        this.valor = valor;
        this.stamp = stamp;
    }
}
