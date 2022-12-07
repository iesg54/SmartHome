package pt.ua.deti.ies.smarthome.smarthome_api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Utilizador")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Utilizador {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private boolean isAdmin;
    @ManyToOne
    @JoinColumn(name ="id_casa", nullable = false)
    private Casa casa;
}
