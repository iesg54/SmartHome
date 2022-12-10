package pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Dispositivo")
@Inheritance(strategy = InheritanceType.JOINED)
public class Dispositivo {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name ="id_divisao", nullable = false)
    private Divisao div;

    @Column(nullable = false)
    private Double consumo_energy;

    @Column(nullable = false)
    private boolean estado = false;

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
