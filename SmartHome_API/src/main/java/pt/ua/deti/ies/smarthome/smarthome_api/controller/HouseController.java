package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.InvalidTypeException;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceAlreadyExistsException;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Sensors;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Utilizador;
import pt.ua.deti.ies.smarthome.smarthome_api.services.HouseService;
import pt.ua.deti.ies.smarthome.smarthome_api.utils.SuccessfulRequest;

import java.sql.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("smarthome/private/house")
@CrossOrigin
public class HouseController {
    // DASHBOARD PAGE API METHODS

    @Autowired
    private HouseService houseService;

    // Lists all the Sensors installed in a given House
    @GetMapping("/{idCasa}")
    public ResponseEntity<List<Sensors>> getSensors(@PathVariable(value="idCasa") int idCasa) throws ResourceNotFoundException{
        return houseService.getSensors(idCasa);
    }

    // Returns all the divisions registered for a given House
    @GetMapping("/{idCasa}/divisions")
    public ResponseEntity<List<Divisao>> getDivisions(@PathVariable(value="idCasa") int idCasa) throws ResourceNotFoundException{
        return ResponseEntity.ok(houseService.getDivisions(idCasa));
    }

    // Associates a new division to a House
    @PostMapping("/{idCasa}/divisions")
    public SuccessfulRequest addDivision(@PathVariable(value="idCasa") int idCasa, @RequestParam(name="idDiv", required = true) Integer idDiv, @RequestParam(name="tipo", required = true) String type,
                                         @RequestParam(name="nome", required = true) String name)
    throws ResourceNotFoundException, ResourceAlreadyExistsException {
        houseService.addDivisao(idCasa, idDiv, type, name);
        SuccessfulRequest successfulRequest = new SuccessfulRequest("Nova divisão adicionada com sucesso.");
        return successfulRequest;
    }

    // ENERGY CONSUMPTION
    // Returns the latest information stored in the DB regarding energy consumption. Must return the value for each division associated with the house.
    @GetMapping("/{idCasa}/energy/current")
    public ResponseEntity<Map<Integer, Double>> getCurrentEnergyDivision(@PathVariable(value="idCasa") int idCasa)
            throws ResourceNotFoundException, InvalidTypeException {
        return ResponseEntity.ok(houseService.getLatestConsumo(idCasa));
    }

    // Returns the information stored in the DB regarding energy consumption in the current month. Must return the value for each division associated with the house.
    @GetMapping("/{idCasa}/energy/month")
    public ResponseEntity<Map<Integer, Map<Date, Double>>> getMonthlyEnergyDivision(@PathVariable(value="idCasa") int idCasa)
            throws ResourceNotFoundException, InvalidTypeException {
        return ResponseEntity.ok(houseService.consumoLastMonth(idCasa));
    }

    // Returns the information stored in the DB regarding energy consumption in the last week. Must return the value for each division associated with the house.
    @GetMapping("/{idCasa}/energy/week")
    public ResponseEntity<Map<Integer, Map<Date, Double>>> getWeeklyEnergyDivision(@PathVariable(value="idCasa") int idCasa)
            throws ResourceNotFoundException, InvalidTypeException{
        return ResponseEntity.ok(houseService.consumoLastWeek(idCasa));
    }

    // USERS PAGE API METHODS

    // Returns the Users associated with the House
    @GetMapping("/{idCasa}/users")
    public ResponseEntity<List<Utilizador>> getAllUsers(@PathVariable(value="idCasa") int idCasa) throws ResourceNotFoundException{
        return houseService.getAllUsers(idCasa);
    }

    // Adds a new user to the House Page, in case they are already registered in the DB
    @PostMapping("/{idCasa}/users")
    public SuccessfulRequest addUser(@PathVariable(value="idCasa") int idCasa, @RequestParam(value="email") String email) throws ResourceNotFoundException{
        return houseService.addUser(idCasa, email);
    }

}
