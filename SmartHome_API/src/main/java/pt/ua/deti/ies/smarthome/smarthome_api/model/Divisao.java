package pt.ua.deti.ies.smarthome.smarthome_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos.Dispositivo;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Divisao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Divisao {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
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

    @OneToMany(mappedBy = "div", cascade = CascadeType.ALL)
    private List<Sensors> sensorsDiv = new ArrayList<>();

    // Atributos de Relações One-To-One
    @OneToOne(mappedBy = "div")
    private SensorMeasurementsQuarto sensorQuarto;
    @OneToOne(mappedBy = "div")
    private SensorMeasurementsCozinha sensorCozinha;
    @OneToOne(mappedBy = "div")
    private SensorMeasurementsSala sensorSala;
    @OneToOne(mappedBy = "div")
    private SensorMeasurementsExterno sensorExterno;
    @OneToOne(mappedBy = "div")
    private ConsumoCozinha consumoCozinha;
    @OneToOne(mappedBy = "div")
    private ConsumoExterno consumoExterno;
    @OneToOne(mappedBy = "div")
    private ConsumoSala consumoSala;
    @OneToOne(mappedBy = "div")
    private ConsumoQuarto consumoQuarto;

    // Getter methods that need to be ignored on JSON replies
    @JsonIgnore
    public List<Dispositivo> getDispositivos() {
        return dispositivos;
    }

    @JsonIgnore
    public List<Alerta> getAlertas() {
        return alertas;
    }

    @JsonIgnore
    public List<Sensors> getSensorsDiv() {
        return sensorsDiv;
    }
}
