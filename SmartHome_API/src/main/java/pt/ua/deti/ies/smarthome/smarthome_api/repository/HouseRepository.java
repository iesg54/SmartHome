package pt.ua.deti.ies.smarthome.smarthome_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pt.ua.deti.ies.smarthome.smarthome_api.model.Casa;

@Repository
public interface HouseRepository extends JpaRepository<Casa, Integer>{
    
}
