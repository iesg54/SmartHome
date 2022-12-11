package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurements;
import pt.ua.deti.ies.smarthome.smarthome_api.services.DivisionService;
import pt.ua.deti.ies.smarthome.smarthome_api.utils.SuccessfulRequest;

import java.util.Map;

@RestController
@RequestMapping("smarthome/private/division")
@CrossOrigin
public class DivisionController {
    @Autowired
    private DivisionService divisionService;

    // Division Page API Methods
    // SENSORS SECTION

    // Returns the latest measurement for each Sensor (Temperatura, Humidade, CO) in the given Division.
    @GetMapping("/{idDiv}/currentInfo")
    public ResponseEntity<Map<String, SensorMeasurements>> getCurrentSensorInfo(@PathVariable(value="idDiv") int idDiv) throws ResourceNotFoundException {
        return ResponseEntity.ok(divisionService.latestSensorInfo(idDiv));
    }

    // Returns the average daily measurements for each Sensor (Temperatura, Humidade, CO) in the given Division, in the past week.
    @GetMapping("/{idDiv}/weeklyInfo")
    public ResponseEntity<Map<Integer, Map<String, String>>> getWeeklySensorInfo(@PathVariable(value="idDiv") int idDiv) throws ResourceNotFoundException{
        return ResponseEntity.ok(divisionService.weeklySensorInfo(idDiv));
    }

    // Returns the Alerts made for this division
    @GetMapping("/{idDiv}/alerts")
    public ResponseEntity<?> getAlerts(@PathVariable(value="idDiv") int idDiv){
        return null;
    }

    // DEVICES SECTION

    // Returns the devices present in a given Division
    @GetMapping("/{idDiv}/devices")
    public ResponseEntity<?> getDivisionDevices(@PathVariable(value="idDiv") int idDiv){
        return null;
    }

    // Associates a new device to the Division. Depending on the type of device, we need to add a entry do the subtype table! Values associated with each subtype must be default, as well as state which must be off by default (False)
    @PostMapping("/{idDiv}/devices")
    public SuccessfulRequest addDevice(@PathVariable(value="idDiv") int idDiv, @RequestParam(name="type", required = true) String type, @RequestParam(name="nome", required = true) String nome, @RequestParam(name="consumo", required = true) Double consumo){
        return null;
    }

    // Toggles the state of a device between on and off.
    @PostMapping("/{idDiv}/device/{idDevice}")
    public SuccessfulRequest toggleDeviceState(@PathVariable(value="idDiv") int idDiv, @PathVariable(value="idDevice") int idDevice){
        return null;
    }

    // Method to get Energy Consumption in the division in the past 7 days. Type refers to the type of division(Cozinha, Sala,...) so we can use the correct DB table.
    @GetMapping("/{idDiv}/energy")
    public ResponseEntity<?> getDivisionEnergyConsumption(@PathVariable(value="idDiv") int idDiv){
        return null;
    }

    //Update values in regadores
    @PutMapping("/{idDiv}/regadores")
    public ResponseEntity<?> updateRegador(@PathVariable(value="idDiv") int idDiv){
        return null;
    }

    //Update values in regadores
    @PutMapping("/{idDiv}/AC")
    public ResponseEntity<?> updateAC(@PathVariable(value="idDiv") int idDiv){
        return null;
    }

    //Update values in lampadas
    @PutMapping("/{idDiv}/lampadas")
    public ResponseEntity<?> updateLampadas(@PathVariable(value="idDiv") int idDiv){
        return null;
    }

    //Update on/off device
    @PutMapping("/{idDiv}/device")
    public ResponseEntity<?> updateDevice(@PathVariable(value="idDiv") int idDiv){
        return null;
    }
}

