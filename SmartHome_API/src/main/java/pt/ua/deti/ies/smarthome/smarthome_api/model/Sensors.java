package pt.ua.deti.ies.smarthome.smarthome_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Sensors {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false)
    private String tipo;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="id_div", nullable = false)
    private Divisao div;
}
