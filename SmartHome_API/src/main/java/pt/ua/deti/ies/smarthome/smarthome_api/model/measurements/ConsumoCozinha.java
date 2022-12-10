package pt.ua.deti.ies.smarthome.smarthome_api.model.measurements;

import jakarta.persistence.*;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;

@Entity
public class ConsumoCozinha extends Consumo{
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_div", referencedColumnName = "id")
    private Divisao div;

    public ConsumoCozinha(Divisao div) {
        this.div = div;
    }

    public ConsumoCozinha() {
    }

    public Divisao getDiv() {
        return this.div;
    }

    public void setDiv(Divisao div) {
        this.div = div;
    }
}
