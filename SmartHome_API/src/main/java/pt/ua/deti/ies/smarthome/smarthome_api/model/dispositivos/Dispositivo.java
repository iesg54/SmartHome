package pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;

@Entity
@Table(name = "Dispositivo")
@Inheritance(strategy = InheritanceType.JOINED)
public class Dispositivo {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name ="id_divisao")
    private Divisao div;

    @Column
    private Double consumo_energy;

    @Column
    private boolean estado = false;

    public Dispositivo(Integer id, Divisao div, Double consumo_energy, boolean estado) {
        this.id = id;
        this.div = div;
        this.consumo_energy = consumo_energy;
        this.estado = estado;
    }

    public Dispositivo(Divisao div, Double consumo_energy, boolean estado) {
        this.div = div;
        this.consumo_energy = consumo_energy;
        this.estado = estado;
    }

    public Dispositivo() {
    }

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

    public Double getConsumo_energy() {
        return consumo_energy;
    }

    public void setConsumo_energy(Double consumo_energy) {
        this.consumo_energy = consumo_energy;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    
}
