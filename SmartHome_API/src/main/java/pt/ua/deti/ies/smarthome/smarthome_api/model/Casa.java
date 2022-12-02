package pt.ua.deti.ies.smarthome.smarthome_api.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Casa")
public class Casa {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(unique = true)
    private String morada;
    @OneToMany(mappedBy = "casa", cascade = CascadeType.ALL)
    private List<Utilizador> utilizadoresCasa = new ArrayList<>();

    @OneToMany(mappedBy = "casa", cascade = CascadeType.ALL)
    private List<Divisao> divisoesCasa = new ArrayList<>();

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMorada() {
        return morada;
    }

    public void setMorada(String morada) {
        this.morada = morada;
    }

    public List<Utilizador> getUtilizadoresCasa() {
        return utilizadoresCasa;
    }

    public void setUtilizadoresCasa(List<Utilizador> utilizadoresCasa) {
        this.utilizadoresCasa = utilizadoresCasa;
    }

    public List<Divisao> getDivisoesCasa() {
        return divisoesCasa;
    }

    public void setDivisoesCasa(List<Divisao> divisoesCasa) {
        this.divisoesCasa = divisoesCasa;
    }
}
