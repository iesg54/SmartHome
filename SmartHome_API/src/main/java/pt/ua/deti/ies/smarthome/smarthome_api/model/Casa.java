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

}
