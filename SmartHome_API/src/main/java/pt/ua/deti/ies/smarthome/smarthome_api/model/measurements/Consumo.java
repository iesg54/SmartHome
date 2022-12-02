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

    // Setters e Getters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDia() {
        return dia;
    }

    public void setDia(Date dia) {
        this.dia = dia;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }
}
