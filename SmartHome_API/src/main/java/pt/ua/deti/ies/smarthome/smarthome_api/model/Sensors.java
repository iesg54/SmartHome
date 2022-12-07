package pt.ua.deti.ies.smarthome.smarthome_api.model;

import jakarta.persistence.*;

@Entity
public class Sensors {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String tipo;
    @ManyToOne
    @JoinColumn(name ="id_div", nullable = false)
    private Divisao div;

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Divisao getDiv() {
        return div;
    }

    public void setDiv(Divisao div) {
        this.div = div;
    }
}
