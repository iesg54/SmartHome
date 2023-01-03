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

// Other
import getAlertMessage from "./getAlertMessage";

function DivisionStats({ divisionID }) {
    const token = localStorage.getItem("token");

    // Get sensors data from API http://localhost:8080/smarthome/private/division/{divisionID}/currentInfo
    const [sensorsCurrentData, setSensorsCurrentData] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:8080/smarthome/private/division/${divisionID}/currentInfo`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // set data
                const sensorsData = [];
                Object.keys(res.data).map((key) => {
                    // calculate time difference
                    let timeDiff = "";
                    if (res.data[key] !== null) {
                        const stamp = new Date(res.data[key].stamp);
                        const now = new Date();
                        const diff = new Date(2022-12-30) - stamp;
                        const diffInMinutes = Math.floor(diff / 1000 / 60);
                        const diffInHours = Math.floor(diffInMinutes / 60);
                        const diffInDays = Math.floor(diffInHours / 24);

                        // concatenate time difference
                        if (diffInDays > 0) {
                            timeDiff = `${diffInDays}dias`;
                        } else if (diffInHours > 0) {
                            timeDiff = `${diffInHours}horas`;
                        } else if (diffInMinutes > 0) {
                            timeDiff = `${diffInMinutes}minutos`;
                        } else {
                            timeDiff = "agora";
                        }
                    } else {
                        timeDiff = "n/a";
                    }

                    // set unit, icon and color

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
                            unit,
                            icon,
                            color,
                            timeDiff,
                        });
                    } else {
                        sensorsData.push({
                            name: key,
                            value: null,
                            unit,
                            icon,
                            color,
                            timeDiff,
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
                        color: "info",
                        data: [],
                    },
                    {
                        label: "Temperatura Máxima",
                        color: "primary",
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
            .get(`http://localhost:8080/smarthome/private/division/${divisionID}/weeklyInfo`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
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

    // Get alerts data from API http://localhost:8080/smarthome/private/division/{divisionID}/alerts
    const [alertsData, setAlertsData] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:8080/smarthome/private/division/${divisionID}/alerts`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                res.data.map((alert) => {
                    setAlertsData((prev) => [
                        ...prev,
                        {
                            sensor: alert.sensor,
                            mensagem: getAlertMessage(alert.sensor, alert.valor),
                            valor: alert.valor,
                            timestamp: alert.stamp,
                        },
                    ]);
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
                            percentage={{
                                label: sensor.timeDiff,
                            }}
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
                        rows: alertsData,
                    }}
                />
            </Grid>
        </>
    );
}

export default DivisionStats;
