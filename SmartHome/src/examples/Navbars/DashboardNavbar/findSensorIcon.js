function findSensorIcon(sensorName) {
    switch (sensorName) {
        case "temperatura":
            return "device_thermostat";
        case "humidade":
            return "water";
        case "ar":
            return "air";
    }
}

export default findSensorIcon;
