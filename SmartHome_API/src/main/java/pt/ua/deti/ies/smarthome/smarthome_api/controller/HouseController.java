package pt.ua.deti.ies.smarthome.smarthome_api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pt.ua.deti.ies.smarthome.smarthome_api.model.Divisao;
import pt.ua.deti.ies.smarthome.smarthome_api.model.Sensors;
import pt.ua.deti.ies.smarthome.smarthome_api.services.HouseService;

@RestController
@RequestMapping("house")
public class HouseController {

    @Autowired 
    private HouseService houseService;
    
    @GetMapping("/sensors")
    public List<Sensors> getSensors(@RequestParam(name="id") Integer id_casa){
        return houseService.getSensors(id_casa);
        
    }

    @GetMapping("/divisions")
    public List<Divisao> getDivisions(@RequestParam(name = "id") Integer id_casa){
        return houseService.getDivisions(id_casa); //mudar isto
    }

    @PostMapping("/add-div")
    public Divisao addDivision(@RequestParam(name="id_casa") Integer id_casa, @RequestParam(name="id_div") Integer id_div){
        return houseService.addDivisao(id_casa, id_div);
    }

    @GetMapping("/consumo/{id-div}")
    public Double consumoEnergetico(@PathVariable Integer id_div, @RequestParam(name = "id-casa") Integer id_casa){
        return houseService.getConsumo(id_div, id_casa);
    }

}
