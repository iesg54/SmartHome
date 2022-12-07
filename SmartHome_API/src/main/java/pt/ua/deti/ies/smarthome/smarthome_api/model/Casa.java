package pt.ua.deti.ies.smarthome.smarthome_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Casa")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Casa {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true)
    private String morada;
    @OneToMany(mappedBy = "casa", cascade = CascadeType.ALL)
    private List<Utilizador> utilizadoresCasa = new ArrayList<>();

    @OneToMany(mappedBy = "casa", cascade = CascadeType.ALL)
    private List<Divisao> divisoesCasa = new ArrayList<>();
}
