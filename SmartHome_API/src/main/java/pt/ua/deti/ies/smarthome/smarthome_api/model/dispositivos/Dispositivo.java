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
    @Enumerated(EnumType.STRING)
    private TipoDispositivo tipo;

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

    public TipoDispositivo getTipo() {
        return tipo;
    }

    public void setTipo(TipoDispositivo tipo) {
        this.tipo = tipo;
    }
}
