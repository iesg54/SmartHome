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

    // Setters e Getters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Casa getCasa() {
        return casa;
    }

    public void setCasa(Casa casa) {
        this.casa = casa;
    }

    public List<Dispositivo> getDispositivos() {
        return dispositivos;
    }

    public void setDispositivos(List<Dispositivo> dispositivos) {
        this.dispositivos = dispositivos;
    }

    public List<Alerta> getAlertas() {
        return alertas;
    }

    public void setAlertas(List<Alerta> alertas) {
        this.alertas = alertas;
    }

    public SensorMeasurementsQuarto getSensorQuarto() {
        return sensorQuarto;
    }

    public void setSensorQuarto(SensorMeasurementsQuarto sensorQuarto) {
        this.sensorQuarto = sensorQuarto;
    }

    public SensorMeasurementsCozinha getSensorCozinha() {
        return sensorCozinha;
    }

    public void setSensorCozinha(SensorMeasurementsCozinha sensorCozinha) {
        this.sensorCozinha = sensorCozinha;
    }

    public SensorMeasurementsSala getSensorSala() {
        return sensorSala;
    }

    public void setSensorSala(SensorMeasurementsSala sensorSala) {
        this.sensorSala = sensorSala;
    }

    public SensorMeasurementsExterno getSensorExterno() {
        return sensorExterno;
    }

    public void setSensorExterno(SensorMeasurementsExterno sensorExterno) {
        this.sensorExterno = sensorExterno;
    }

    public ConsumoCozinha getConsumoCozinha() {
        return consumoCozinha;
    }

    public void setConsumoCozinha(ConsumoCozinha consumoCozinha) {
        this.consumoCozinha = consumoCozinha;
    }

    public ConsumoExterno getConsumoExterno() {
        return consumoExterno;
    }

    public void setConsumoExterno(ConsumoExterno consumoExterno) {
        this.consumoExterno = consumoExterno;
    }

    public ConsumoSala getConsumoSala() {
        return consumoSala;
    }

    public void setConsumoSala(ConsumoSala consumoSala) {
        this.consumoSala = consumoSala;
    }

    public ConsumoQuarto getConsumoQuarto() {
        return consumoQuarto;
    }

    public void setConsumoQuarto(ConsumoQuarto consumoQuarto) {
        this.consumoQuarto = consumoQuarto;
    }

    public List<Sensors> getSensorsDiv() {
        return sensorsDiv;
    }

    public void setSensorsDiv(List<Sensors> sensorsDiv) {
        this.sensorsDiv = sensorsDiv;
    }
}
