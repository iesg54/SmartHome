package pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos;

import jakarta.persistence.*;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;

@Entity
@Table(name = "Dispositivo")
@Inheritance(strategy = InheritanceType.JOINED)
public class Dispositivo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name ="id_divisao", nullable = false)
    private Divisao div;

    @Column(nullable = false)
    private String nome;

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

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
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
