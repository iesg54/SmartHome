/*
Fazer chamada à API para obter os dados dos sensores
*/

const sensorsData = [
    {
        id: 1,
        name: "Temperatura",
        icon: "device_thermostat",
        value: "",
        color: "primary",
        units: "ºC",
    },
    {
        id: 2,
        name: "Humidade",
        icon: "water",
        value: "",
        color: "info",
        units: "%",
    },
    {
        id: 3,
        name: "CO",
        icon: "gas_meter",
        value: "",
        color: "warning",
        units: "ppm",
    },
];

export default sensorsData;
