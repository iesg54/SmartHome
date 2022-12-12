// react
import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React Examples
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 React Components
import MDTypography from "components/MDTypography";

// Axios
import axios from "axios";

// Sensors Data
import alertsTableData from "./data/alertsTableData";

function DivisionStats(divisionID) {
    // Get sensors data from API http://localhost:8080/smarthome/private/division/{divisionID}/currentInfo
    const [sensorsCurrentData, setSensorsCurrentData] = useState([]);
    useEffect(() => {
        axios
            .get(
                `http://localhost:8080/smarthome/private/division/${divisionID.divisionID}/currentInfo`
            )
            .then((res) => {
                // set data
                const sensorsData = [];
                Object.keys(res.data).map((key) => {
                    let unit = "";
                    let icon = "";
                    let color = "";

                    switch (key) {
                        case "temperatura":
                            unit = "ºC";
                            icon = "device_thermostat";
                            color = "primary";
                            break;
                        case "humidade":
                            unit = "%";
                            icon = "water";
                            color = "info";
                            break;
                        case "ar":
                            unit = "ppm";
                            icon = "gas_meter";
                            color = "success";
                            break;
                        default:
                            break;
                    }

                    if (res.data[key] !== null) {
                        sensorsData.push({
                            name: res.data[key].tipo,
                            value: res.data[key].valor.toFixed(2),
                            unit: unit,
                            icon: icon,
                            color: color,
                        });
                    } else {
                        sensorsData.push({
                            name: key,
                            value: null,
                            unit: unit,
                            icon: icon,
                            color: color,
                        });
                    }
                });

                setSensorsCurrentData(sensorsData);
            });
    }, []);

    // Get weekly sensors data from API http://localhost:8080/smarthome/private/division/{divisionID}/weeklyInfo
    const [sensorsWeeklyData, setSensorsWeeklyData] = useState([
        {
            id: 1,
            name: "Temperatura",
            icon: { component: "device_thermostat", color: "primary" },
            description: "Temperatura nos últimos 7 dias",
            chart: {
                labels: [],
                datasets: [
                    {
                        label: "Temperatura Mínima",
                        color: "primary",
                        data: [],
                    },
                    {
                        label: "Temperatura Máxima",
                        color: "secondary",
                        data: [],
                    },
                ],
            },
        },
        {
            id: 2,
            name: "Humidade",
            icon: { component: "water", color: "info" },
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
            id: 3,
            name: "Ar",
            icon: { component: "gas_meter", color: "success" },
            description: "Qualidade do ar nos últimos 7 dias",
            chart: {
                labels: [],
                datasets: [
                    {
                        label: "Ar",
                        color: "success",
                        data: [],
                    },
                ],
            },
        },
    ]);
    useEffect(() => {
        axios
            .get(
                `http://localhost:8080/smarthome/private/division/${divisionID.divisionID}/weeklyInfo`
            )
            .then((res) => {
                setSensorsWeeklyData((prev) => {
                    const sensorsData = [...prev];

                    Object.keys(res.data).map((key) => {
                        sensorsData[0].chart.labels.push(res.data[key].Dia);
                        sensorsData[0].chart.datasets[0].data.push(res.data[key].Tmin);
                        sensorsData[0].chart.datasets[1].data.push(res.data[key].Tmax);

                        sensorsData[1].chart.labels.push(res.data[key].Dia);
                        sensorsData[1].chart.datasets[0].data.push(res.data[key]["Avg humidade"]);

                        sensorsData[2].chart.labels.push(res.data[key].Dia);
                        sensorsData[2].chart.datasets[0].data.push(res.data[key]["Avg ar"]);
                    });

                    return sensorsData;
                });
            });
    }, []);

    return (
        <>
            <Grid container spacing={3} justifyContent="center" mt={2}>
                {sensorsCurrentData.map((sensor) => (
                    <Grid item xs={12} sm={6} md={3.5} key={sensor.id}>
                        <ComplexStatisticsCard
                            title={sensor.name}
                            count={sensor.value ? sensor.value + sensor.unit : "Sem dados"}
                            icon={sensor.icon}
                            color={sensor.color}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid container justifyContent="center" mt={4}>
                <MDTypography variant="h2">Sensores nos últimos 7 dias</MDTypography>
            </Grid>
            <Grid container justifyContent="center" mt={2} spacing={3}>
                {sensorsWeeklyData.map((sensor) => (
                    <Grid item xs={12} sm={12} md={4} key={sensor.id}>
                        {console.log(sensor)}
                        <DefaultLineChart
                            icon={sensor.icon}
                            title={sensor.name}
                            description={sensor.description}
                            chart={{
                                labels: sensor.chart.labels,
                                datasets: sensor.chart.datasets,
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
            <Grid container justifyContent="center" mt={4}>
                <MDTypography variant="h2">Registo de Alertas</MDTypography>
            </Grid>
            <Grid container justifyContent="center" mt={2}>
                <DataTable
                    tableHeaderColor="primary"
                    table={{
                        columns: [
                            {
                                Header: "sensor",
                                accessor: "sensor",
                                width: 100,
                            },
                            {
                                Header: "mensagem",
                                accessor: "mensagem",
                                width: 100,
                            },
                            {
                                Header: "valor",
                                accessor: "valor",
                                width: 100,
                            },
                            {
                                Header: "timestamp",
                                accessor: "timestamp",
                                width: 100,
                            },
                        ],
                        rows: alertsTableData,
                    }}
                />
            </Grid>
        </>
    );
}

export default DivisionStats;
