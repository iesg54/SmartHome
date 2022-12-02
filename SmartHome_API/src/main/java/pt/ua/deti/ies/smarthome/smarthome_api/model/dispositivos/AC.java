package pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos;

import jakarta.persistence.Column;

public class AC extends Dispositivo{
    @Column(name = "tAtual")
    private double tempAtual;
    @Column(name = "tMin")
    private double tempMin;
    @Column(name = "tMax")
    private double tempMax;

}
