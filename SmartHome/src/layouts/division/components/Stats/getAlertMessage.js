function getAlertMessage(type, value) {
    switch (type) {
        case "temperatura":
            if (value < 18) {
                return "Temperatura muito baixa";
            }
            if (value > 25) {
                return "Temperatura muito alta";
            }
            break;
        case "humidade":
            if (value < 40) {
                return "Humidade muito baixa";
            }
            if (value > 60) {
                return "Humidade muito alta";
            }
            break;
        case "ar":
            if (value < 40) {
                return "Níveis de CO muito baixos";
            }
            if (value > 60) {
                return "Níveis de CO muito altos";
            }
            break;
        default:
            return "";
    }
    return "";
}

export default getAlertMessage;
