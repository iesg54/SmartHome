package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.InvalidTypeException;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Alerta;
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
    public SuccessfulRequest addDivision(@PathVariable(value="idCasa") int idCasa, @RequestParam(name="tipo", required = true) String type,
                                         @RequestParam(name="nome", required = true) String name)
    throws ResourceNotFoundException {
        houseService.addDivisao(idCasa, type, name);
        SuccessfulRequest successfulRequest = new SuccessfulRequest("Nova divisão adicionada com sucesso.");
        return successfulRequest;
    }

    // Removes a division from the House
    @DeleteMapping("/{idCasa}/divisions")
    public SuccessfulRequest removeDivision(@PathVariable(value="idCasa") int idCasa, @RequestParam(name="idDiv", required = true) int idDiv)
            throws ResourceNotFoundException {
        houseService.removeDivisao(idCasa, idDiv);
        SuccessfulRequest successfulRequest = new SuccessfulRequest("Divisão removida com sucesso.");
        return successfulRequest;
    }


    // Return the info about a given division
    @GetMapping("/{idCasa}/division/{idDiv}")
    public ResponseEntity<Divisao> getDivisionInfo(@PathVariable(value="idCasa") int idCasa, @PathVariable(value="idDiv") int idDiv)
            throws ResourceNotFoundException {
        return ResponseEntity.ok(houseService.getDivisionInfo(idCasa, idDiv).getBody());
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

    // Delete a user from the House Page
    @DeleteMapping("/{idCasa}/users")
    public SuccessfulRequest removeUser(@PathVariable(value="idCasa") int idCasa, @RequestParam(value="email") String email) throws ResourceNotFoundException{
        houseService.removeUser(idCasa, email);
        return new SuccessfulRequest("Utilizador removido com sucesso");
    }

    // Get latest Alerts
    @GetMapping("{idCasa}/latestAlerts")
    public ResponseEntity<List<Alerta>> getLatestAlerts(@PathVariable(value="idCasa") int idCasa) throws ResourceNotFoundException {
        List<Alerta> alertas = houseService.getLatestAlerts(idCasa);

        if(alertas.size() > 0){
            return ResponseEntity.ok(alertas);
        }else{
            throw new ResourceNotFoundException("Não existem alertas associados à Casa com ID " + idCasa);
        }
    }

}
