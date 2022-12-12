package pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AC extends Dispositivo{
    @Column(name = "tAtual")
    private double tempAtual;
    @Column(name = "tMin")
    private double tempMin;
    @Column(name = "tMax")
    private double tempMax;

    public void setTempAtual(Double tempa){
        this.tempAtual = tempa;
    }

    public void setTempMin(Double tempmin){
        this.tempMin = tempmin;
    }

    public void setTempMax(Double tempmax){
        this.tempMax = tempmax;
    }
}
