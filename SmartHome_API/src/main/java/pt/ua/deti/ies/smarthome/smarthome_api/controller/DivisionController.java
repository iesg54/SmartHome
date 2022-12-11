package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import java.sql.Time;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smarthome.smarthome_api.utils.SuccessfulRequest;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.services.DivisionService;

@RestController
@RequestMapping("smarthome/private/division")
public class DivisionController {
    // Division Page API Methods

    @Autowired
    private DivisionService divisionService;
    // SENSORS SECTION

    // Returns the latest measurement for each Sensor (Temperatura, Humidade, CO) in the given Division. Type refers to the type of division (Cozinha, Sala...) so we know which table to query.
    @GetMapping("/{idDiv}/currentInfo")
    public ResponseEntity<?> getCurrentSensorInfo(@PathVariable(value="idDiv") int idDiv, @RequestParam(name="type", required = true) String type){
        return null;
    }

    // Returns the average daily measurements for each Sensor (Temperatura, Humidade, CO) in the given Division, in the past week. Type refers to the type of division (Cozinha, Sala...) so we know which table to query.
    @GetMapping("/{idDiv}/weeklyInfo")
    public ResponseEntity<?> getWeeklySensorInfo(@PathVariable(value="idDiv") int idDiv,  @RequestParam(name="type", required = true) String type){
        return null;
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
    @PostMapping("{idDiv}/device/{idDevice}")
    public SuccessfulRequest toggleDeviceState(@PathVariable(value="idDiv") int idDiv, @PathVariable(value="idDevice") int idDevice) throws ResourceNotFoundException{
        return divisionService.toggleDeviceStat(idDiv, idDevice);
    }


    // Method to get Energy Consumption in the division in the past 7 days. Type refers to the type of division(Cozinha, Sala,...) so we can use the correct DB table.
    @GetMapping("/{idDiv}/energy") // done - TODO testing
    public ResponseEntity<List<Double>> getDivisionEnergyConsumption(@PathVariable(value="idDiv") int idDiv, @RequestParam(name="type", required = true) String type) throws ResourceNotFoundException{
        return divisionService.getDivisionEnergyConsumptionS(idDiv, type);
    }

    //Update values in regadores
    @PutMapping("/{idDiv}/regadores")
    public SuccessfulRequest updateRegador(@PathVariable(value="idDiv") int idDiv, @RequestParam(value="start_time") Time start_time, @RequestParam(value="end_time") Time end_time) throws ResourceNotFoundException{
        return divisionService.updateRegador(idDiv, start_time, end_time);
    }

    //Update values in AC
    @PutMapping("/{idDiv}/AC")
    public SuccessfulRequest updateAC(@PathVariable(value="idDiv") int idDiv, @RequestParam(value="temp-atual") Double tempAtual, @RequestParam(value="temp-min") Double tempMin, @RequestParam(value="temp-max") Double tempMax) throws ResourceNotFoundException{
        return divisionService.updateAC(idDiv, tempAtual, tempMin, tempMax);
    }

    //Update values in lampadas
    @PutMapping("/{idDiv}/lampadas")
    public SuccessfulRequest updateLampadas(@PathVariable(value="idDiv") int idDiv, @RequestParam(value="luminosidade") Double luminosidade, @RequestParam(value="start-time") Time startTime, @RequestParam(value="endTime") Time endTime) throws ResourceNotFoundException{
        return divisionService.updateLamapada(idDiv, luminosidade, startTime, endTime);
    }

}

