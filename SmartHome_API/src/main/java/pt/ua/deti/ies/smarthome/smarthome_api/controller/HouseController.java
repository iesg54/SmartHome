package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Sensors;
import pt.ua.deti.ies.smarthome.smarthome_api.services.HouseService;
import pt.ua.deti.ies.smarthome.smarthome_api.utils.SuccessfulRequest;

import java.util.List;

@RestController
@RequestMapping("smarthome/private/house")
@CrossOrigin
public class HouseController {
    // DASHBOARD PAGE API METHODS

    @Autowired
    private HouseService houseService;

    // Lists all the Sensors installed in a given House
    @GetMapping("/{idCasa}")
    public ResponseEntity<List<Sensors>> getSensors(@PathVariable(value="idCasa") int idCasa){
        return houseService.getSensors(idCasa);
    }

    // Returns all the divisions registered for a given House
    @GetMapping("/{idCasa}/divisions")
    public ResponseEntity<List<Divisao>> getDivisions(@PathVariable(value="idCasa") int idCasa){
        return ResponseEntity.ok(houseService.getDivisions(idCasa));
    }

    // Associates a new division to a House
    @PostMapping("/{idCasa}/divisions")
    public SuccessfulRequest addDivision(@PathVariable(value="idCasa") int idCasa, @RequestParam(name="idDiv", required = true) Integer idDiv){
        houseService.addDivisao(idCasa, idDiv);
        SuccessfulRequest successfulRequest = new SuccessfulRequest("added new division");
        return successfulRequest;
    }

    // ENERGY CONSUMPTION
    // Returns the latest information stored in the DB regarding energy consumption. Must return the value for each division associated with the house.
    @GetMapping("/{idCasa}/energy/current/{idDiv}")
    public ResponseEntity<?> getCurrentEnergyDivision(@PathVariable(value="idCasa") int idCasa, @PathVariable(value="idDiv") int idDiv){
        return houseService.getConsumo(idDiv, idCasa);
    }

    // Returns the information stored in the DB regarding energy consumption in the current month. Must return the value for each division associated with the house.
    @GetMapping("/{idCasa}/energy/month/{idDiv}")
    public ResponseEntity<?> getMonthlyEnergyDivision(@PathVariable(value="idCasa") int idCasa, @PathVariable(value="idDiv") int idDiv){
        return null;
    }

    // Returns the information stored in the DB regarding energy consumption in the last week. Must return the value for each division associated with the house.
    @GetMapping("/{idCasa}/energy/weekly/{idDiv}")
    public ResponseEntity<?> getWeeklyEnergyDivision(@PathVariable(value="idCasa") int idCasa, @PathVariable(value="idDiv") int idDiv){
        return null;
    }

    // USERS PAGE API METHODS

    // Returns the Users associated with the House
    @GetMapping("/{idCasa}/users")
    public ResponseEntity<?> getAllUsers(@PathVariable(value="idCasa") int idCasa){
        return null;
    }

    // Adds a new user to the House Page, in case they are already registered in the DB
    @PostMapping("/{idCasa}/users")
    public SuccessfulRequest addUser(@PathVariable(value="idCasa") int idCasa){
        return null;
    }

}
