package pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Tomada extends Dispositivo{
    @Column(nullable = false)
    private String tipo;
}
