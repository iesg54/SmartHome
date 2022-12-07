package pt.ua.deti.ies.smarthome.smarthome_api.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class Alerta {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name ="id_divisao", nullable = false)
    private Divisao div;
    @Column(nullable = false)
    private String sensor;
    @Column(nullable = false)
    private Double valor;
    @Column
    private Timestamp stamp;

    // Setters e Getters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Divisao getDiv() {
        return div;
    }

    public void setDiv(Divisao div) {
        this.div = div;
    }

    public String getSensor() {
        return sensor;
    }

    public void setSensor(String sensor) {
        this.sensor = sensor;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Timestamp getStamp() {
        return stamp;
    }

    public void setStamp(Timestamp timestamp) {
        this.stamp = timestamp;
    }
}
