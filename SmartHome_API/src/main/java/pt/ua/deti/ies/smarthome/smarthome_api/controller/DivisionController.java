package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Date;
import java.sql.Time;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.InvalidTypeException;
import pt.ua.deti.ies.smarthome.smarthome_api.exceptions.ResourceNotFoundException;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Alerta;
import pt.ua.deti.ies.smarthome.smarthome_api.model.dispositivos.Dispositivo;
import pt.ua.deti.ies.smarthome.smarthome_api.model.measurements.SensorMeasurements;
import pt.ua.deti.ies.smarthome.smarthome_api.services.DivisionService;
import pt.ua.deti.ies.smarthome.smarthome_api.utils.SuccessfulRequest;

import java.util.List;
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
    public ResponseEntity<List<Alerta>> getAlerts(@PathVariable(value="idDiv") int idDiv) throws ResourceNotFoundException {
        return ResponseEntity.ok(divisionService.getAlerts(idDiv));
    }

    // DEVICES SECTION

    // Returns the devices present in a given Division
    @GetMapping("/{idDiv}/devices")
    public ResponseEntity<List<Dispositivo>> getDivisionDevices(@PathVariable(value="idDiv") int idDiv) throws ResourceNotFoundException{
        return ResponseEntity.ok(divisionService.getDispositivos(idDiv));
    }

    // Associates a new device to the Division. Depending on the type of device, we need to add a entry do the subtype table! Values associated with each subtype must be default, as well as state which must be off by default (False)
    @PostMapping("/{idDiv}/devices")
    public SuccessfulRequest addDevice(@PathVariable(value="idDiv") int idDiv, @RequestParam(name="tipo", required = true) String type, @RequestParam(name="nome", required = true) String nome, @RequestParam(name="consumo", required = true) Double consumo)
    throws ResourceNotFoundException, InvalidTypeException {
        divisionService.addNewDevice(idDiv, type, nome, consumo);
        return new SuccessfulRequest("Dispositivo adicionado com sucesso.");
    }

    // Toggles the state of a device between on and off.
    @PostMapping("{idDiv}/device/{idDevice}")
    public SuccessfulRequest toggleDeviceState(@PathVariable(value="idDiv") int idDiv, @PathVariable(value="idDevice") int idDevice) throws ResourceNotFoundException{
        return divisionService.toggleDeviceStat(idDiv, idDevice);
    }


    // Method to get Energy Consumption in the division in the past 7 days. Type refers to the type of division(Cozinha, Sala,...) so we can use the correct DB table.
    @GetMapping("/{idDiv}/energy") // done - TODO testing
    public ResponseEntity<Map<Date, Double>> getDivisionEnergyConsumption(@PathVariable(value="idDiv") int idDiv)
            throws ResourceNotFoundException, InvalidTypeException{
        return divisionService.getDivisionEnergyConsumption(idDiv);
    }

    //Update values in regadores
    @PutMapping("/{idDiv}/regadores/{idDisp}")
    public SuccessfulRequest updateRegador(@PathVariable(value="idDiv") int idDiv,
                                           @PathVariable(value="idDisp") int idDisp,
                                           @RequestParam(value="start_time") Time start_time,
                                           @RequestParam(value="end_time") Time end_time)
                                            throws ResourceNotFoundException{
        return divisionService.updateRegador(idDiv, idDisp, start_time, end_time);
    }

    //Update values in AC
    @PutMapping("/{idDiv}/AC/{idDisp}")
    public SuccessfulRequest updateAC(@PathVariable(value="idDiv") int idDiv,
                                      @PathVariable(value="idDisp") int idDisp,
                                      @RequestParam(value="temp_atual", required = false) Double tempAtual,
                                      @RequestParam(value="temp_min", required = false) Double tempMin,
                                      @RequestParam(value="temp_max", required = false) Double tempMax)
                                        throws ResourceNotFoundException{
        return divisionService.updateAC(idDiv, idDisp, tempAtual, tempMin, tempMax);
    }

    //Update values in lampadas
    @PutMapping("/{idDiv}/lampadas/{idDisp}")
    public SuccessfulRequest updateLampadas(@PathVariable(value="idDiv") int idDiv,
                                            @PathVariable(value="idDisp") int idDisp,
                                            @RequestParam(value="luminosidade", required = false) Double luminosidade,
                                            @RequestParam(value="start_time", required = false) Time startTime,
                                            @RequestParam(value="end_time", required = false) Time endTime)
                                            throws ResourceNotFoundException{
        return divisionService.updateLampada(idDiv, idDisp, luminosidade, startTime, endTime);
    }

}

