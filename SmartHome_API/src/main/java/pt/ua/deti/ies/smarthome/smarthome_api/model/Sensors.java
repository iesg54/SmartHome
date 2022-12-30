package pt.ua.deti.ies.smarthome.smarthome_api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private Integer generatorType;                   // 1 - Temp_hum 2 - Air
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="division_id", nullable = false)
    @JsonIgnore
    private Divisao div;
}
