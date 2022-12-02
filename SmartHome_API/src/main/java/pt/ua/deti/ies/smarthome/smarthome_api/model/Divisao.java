package pt.ua.deti.ies.smarthome.smarthome_api.model;

import jakarta.persistence.*;
import pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos.Dispositivo;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Divisao")
public class Divisao {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(nullable = false)
    private String nome;
    @ManyToOne
    @JoinColumn(name ="id_casa", nullable = false)
    private Casa casa;
    @OneToMany(mappedBy = "div", cascade = CascadeType.ALL)
    private List<Dispositivo> dispositivos = new ArrayList<>();
    @OneToMany(mappedBy = "div", cascade = CascadeType.ALL)
    private List<Alerta> alertas = new ArrayList<>();

    // Atributos de Relações One-To-One
    @OneToOne(mappedBy = "div")
    private SensorQuarto sensorQuarto;
    @OneToOne(mappedBy = "div")
    private SensorCozinha sensorCozinha;
    @OneToOne(mappedBy = "div")
    private SensorSala sensorSala;
    @OneToOne(mappedBy = "div")
    private SensorExterno sensorExterno;
    @OneToOne(mappedBy = "div")
    private ConsumoCozinha consumoCozinha;
    @OneToOne(mappedBy = "div")
    private ConsumoExterno consumoExterno;
    @OneToOne(mappedBy = "div")
    private ConsumoSala consumoSala;
    @OneToOne(mappedBy = "div")
    private ConsumoQuarto consumoQuarto;

}
