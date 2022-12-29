package pt.ua.deti.ies.smarthome.smarthome_api.model.measurements;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsumoExterno extends Consumo {
    @ManyToOne
    @JoinColumn(name = "id_div", referencedColumnName = "id")
    @JsonIgnore
    private Divisao div;
}
