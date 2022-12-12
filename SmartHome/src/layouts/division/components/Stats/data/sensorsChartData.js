/*
Fazer call a api para obter os dados dos sensores
*/

const sensorsChartData = [
    {
        id: "temperature",
        title: "Temperatura",
        icon: { icon: "device_thermostat", color: "primary" },
        description: "Temperatura nos últimos 7 dias",
        chart: {
            labels: [],
            datasets: [
                {
                    label: "Temperatura",
                    color: "primary",
                    data: [],
                },
            ],
        },
    },
    {
        id: "humidity",
        title: "Humidade",
        icon: { icon: "water", color: "info" },
        description: "Humidade nos últimos 7 dias",
        chart: {
            labels: [],
            datasets: [
                {
                    label: "Humidade",
                    color: "info",
                    data: [],
                },
            ],
        },
    },
    {
        id: "air_quality",
        title: "Qualidade do ar",
        icon: { icon: "gas_meter", color: "warning" },
        description: "Qualidade do ar nos últimos 7 dias",
        chart: {
            labels: [],
            datasets: [
                {
                    label: "Qualidade do ar",
                    color: "warning",
                    data: [],
                },
            ],
        },
    },
];

export default sensorsChartData;
