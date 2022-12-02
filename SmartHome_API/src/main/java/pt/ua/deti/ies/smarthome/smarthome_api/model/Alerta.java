package pt.ua.deti.ies.smarthome.smarthome_api.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class Alerta {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name ="id_divisao", nullable = false)
    private Divisao div;

    @Column(nullable = false)
    private String mensagem;

    @Column(nullable = false)
    private String sensor;

    @Column(nullable = false)
    private Double valor;

    @Column
    private Timestamp timestamp;
}
