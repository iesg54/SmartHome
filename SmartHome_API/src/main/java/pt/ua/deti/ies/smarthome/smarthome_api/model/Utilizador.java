package pt.ua.deti.ies.smarthome.smarthome_api.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Utilizador")
public class Utilizador {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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


    // Getters e Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public Casa getCasa() {
        return casa;
    }

    public void setCasa(Casa casa) {
        this.casa = casa;
    }
}
