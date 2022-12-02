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

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
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

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}
