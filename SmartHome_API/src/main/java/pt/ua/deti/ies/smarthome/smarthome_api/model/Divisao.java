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
    @Enumerated(EnumType.STRING)
    private TipoDivisao tipo;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="id_casa", nullable = false)
    private Casa casa;
    @JsonIgnore
    @OneToMany(mappedBy = "div", cascade = CascadeType.ALL)
    private List<Dispositivo> dispositivos = new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "div", cascade = CascadeType.ALL)
    private List<Alerta> alertas = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "div", cascade = CascadeType.ALL)
    private List<Sensors> sensorsDiv = new ArrayList<>();

    // Atributos de Relações One-To-Many
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "div")
    private List<SensorMeasurementsQuarto> sensorQuarto;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "div")
    private List<SensorMeasurementsCozinha> sensorCozinha;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "div")
    private List<SensorMeasurementsSala> sensorSala;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "div")
    private List<SensorMeasurementsExterno> sensorExterno;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "div")
    private List<ConsumoCozinha> consumoCozinha;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "div")
    private List<ConsumoExterno> consumoExterno;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "div")
    private List<ConsumoSala> consumoSala;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "div")
    private List<ConsumoQuarto> consumoQuarto;

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

    @JsonIgnore
    public List<SensorMeasurementsQuarto> getSensorQuarto() {
        return sensorQuarto;
    }

    @JsonIgnore
    public List<SensorMeasurementsCozinha> getSensorCozinha() {
        return sensorCozinha;
    }

    @JsonIgnore
    public List<SensorMeasurementsSala> getSensorSala() {
        return sensorSala;
    }

    @JsonIgnore
    public List<SensorMeasurementsExterno> getSensorExterno() {
        return sensorExterno;
    }

    @JsonIgnore
    public List<ConsumoCozinha> getConsumoCozinha() {
        return consumoCozinha;
    }

    @JsonIgnore
    public List<ConsumoExterno> getConsumoExterno() {
        return consumoExterno;
    }

    @JsonIgnore
    public List<ConsumoSala> getConsumoSala() {
        return consumoSala;
    }

    @JsonIgnore
    public List<ConsumoQuarto> getConsumoQuarto() {
        return consumoQuarto;
    }
}
