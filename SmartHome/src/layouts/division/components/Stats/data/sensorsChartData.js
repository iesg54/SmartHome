/*
Fazer call a api para obter os dados dos sensores
*/

const sensorsChartData = [
    {
        id: "temperature",
        title: "Temperatura",
        icon: { icon: "device_thermostat", color: "primary" },
        description: "Temperatura ao longo do tempo",
        chart: {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            datasets: [
                {
                    label: "Temperatura",
                    color: "primary",
                    data: [10, 20, 21, 21, 21, 24, 23, 21, 17, 15],
                },
            ],
        },
    },
    {
        id: "humidity",
        title: "Humidade",
        icon: { icon: "water", color: "info" },
        description: "Humidade ao longo do tempo",
        chart: {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            datasets: [
                {
                    label: "Humidade",
                    color: "info",
                    data: [30, 50, 70, 70, 71, 65, 60, 59, 45, 33],
                },
            ],
        },
    },
    {
        id: "air_quality",
        title: "Qualidade do ar",
        icon: { icon: "gas_meter", color: "warning" },
        description: "Qualidade do ar ao longo do tempo",
        chart: {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            datasets: [
                {
                    label: "Qualidade do ar",
                    color: "warning",
                    data: [30, 50, 70, 70, 71, 65, 60, 59, 45, 33],
                },
            ],
        },
    },
];

export default sensorsChartData;
