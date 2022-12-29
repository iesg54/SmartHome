import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React Components
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 React Examples
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Axios
import axios from "axios";

// Dispositivos Component
import DeviceCard from "./components/DeviceCard";
import ActionModal from "./components/ActionModal";

// other
import { findDeviceIcon } from "./findDeviceIcon";

function DivisionDevices({ divisionID, divisionName }) {
    const [deviceOpen, setDeviceOpen] = useState({});

    // Get Devices Data from the API and update the state http://localhost:8080/smarthome/private/division/{divisionID}/devices
    const [devicesState, setDevicesState] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:8080/smarthome/private/division/${divisionID}/devices`)
            .then((response) => {
                setDevicesState((prev) => {
                    const newDevicesState = [...prev];
                    response.data.map((device) => {
                        newDevicesState.push({
                            name: device.nome
                                ? device.nome
                                : device.tipo.charAt(0).toUpperCase() +
                                  device.tipo.slice(1).toLowerCase(),
                            icon: findDeviceIcon(device.tipo),
                            consumption: Math.round(device.consumo_energy),
                            dialog: false,
                            ...device,
                        });
                    });
                    return newDevicesState;
                });
            })
    }, []);

    /* eslint-disable no-param-reassign */
    const handleDeviceState = (id) => {
        const newDevicesState = devicesState.map((device) => {
            if (device.id === id) {
                device.estado = !device.estado;
            }
            return device;
        });
        axios
            .post(
                `http://localhost:8080/smarthome/private/division/${divisionID}/device/${id}`,
                null
            )
        setDevicesState(newDevicesState);
    };
    /* eslint-disable no-param-reassign */

    // Get Energy Data from te API and update the state http://localhost:8080/smarthome/private/division/{divisionID}/energy
    const [energyData, setEnergyData] = useState({
        icon: { color: "warning", component: "bolt" },
        title: "Energia Consumida",
        description: "Energia consumida por esta divisão nos últimos 7 dias.",
        chart: {
            labels: [],
            datasets: [
                {
                    label: "Energia",
                    color: "dark",
                    data: [],
                },
            ],
        },
    });
    useEffect(() => {
        axios
            .get(`http://localhost:8080/smarthome/private/division/${divisionID}/energy`)
            .then((response) => {
                setEnergyData((prev) => {
                    const newEnergyData = { ...prev };

                    Object.keys(response.data).map((key) => {
                        newEnergyData.chart.labels.push(key.split("T")[0]);
                        newEnergyData.chart.datasets[0].data.push(response.data[key]);
                    });

                    return newEnergyData;
                });
            })
    }, []);

    const handleDeviceDialog = (id) => {
        setDevicesState((prev) => {
            const newDevicesState = [...prev];
            newDevicesState.map((device) => {
                if (device.id === id) {
                    device.dialog = !device.dialog;
                }
                return device;
            });
            setDeviceOpen(newDevicesState.find((device) => device.id === id));
            return newDevicesState;
        });
    };

    const handleDeleteDevice = (id) => {
        axios
            .delete(`http://localhost:8080/smarthome/private/division/${divisionID}/devices`, {
                params: {
                    id,
                },
            })
        setDevicesState((prev) => {
            const newDevicesState = [...prev];
            const index = newDevicesState.findIndex((device) => device.id === id);
            newDevicesState.splice(index, 1);
            return newDevicesState;
        });
    };

    return (
        <>
            <Grid container justifyContent="center" mt={4}>
                <MDTypography variant="h2">Consumo Energético</MDTypography>
            </Grid>
            <Grid container mt={4} spacing={2}>
                <Grid item xs={12} sm={12} md={8}>
                    <VerticalBarChart
                        icon={energyData.icon}
                        title={energyData.title}
                        description={energyData.description}
                        chart={{
                            labels: energyData.chart.labels,
                            datasets: energyData.chart.datasets,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Card>
                        <MDBox
                            mx={2}
                            mt={-3}
                            py={2}
                            px={2}
                            variant="gradient"
                            bgColor="warning"
                            borderRadius="lg"
                            coloredShadow="warning"
                        >
                            <MDTypography variant="h6" color="white">
                                Informações do Consumo Energético
                            </MDTypography>
                        </MDBox>
                        <MDBox pt={3}>
                            <MDBox bgColor="light" borderRadius="xl" px={0.5} py={0.5} mb={1}>
                                <ComplexStatisticsCard
                                    title="Previsão de Consumo na próxima hora"
                                    count={devicesState
                                        .filter((device) => device.estado)
                                        .map((device) => device.consumption)
                                        .reduce((a, b) => a + b, 0)}
                                    icon="bolt"
                                    color="warning"
                                />
                            </MDBox>
                            <MDBox bgColor="light" borderRadius="xl" px={0.5} py={0.5} mb={2}>
                                <ComplexStatisticsCard
                                    title="Dispositivos Ligados"
                                    count={devicesState.filter((device) => device.estado).length}
                                    icon="power"
                                    color="dark"
                                />
                            </MDBox>
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
            <Divider />
            <Grid container mt={4} spacing={2} alignItems="center">
                <Grid item>
                    <MDTypography variant="h2">Dispositivos Ligados</MDTypography>
                </Grid>
                <Grid item>
                    <Link to={"/adicionarEquipamento/" + divisionName}>
                        <MDButton variant="gradient" color="dark" iconOnly size="large" circular>
                            <Icon>add</Icon>
                        </MDButton>
                    </Link>
                </Grid>
            </Grid>
            <Grid container mt={4} spacing={3}>
                {devicesState.map((device) => (
                    <Grid item xs={12} sm={12} md={3} key={device.id}>
                        <DeviceCard
                            color="dark"
                            icon={device.icon}
                            type={device.tipo}
                            name={device.name}
                            state={device.estado}
                            consumption={device.consumption}
                            deviceStateHandler={() => handleDeviceState(device.id)}
                            deviceActionHandler={() => handleDeviceDialog(device.id)}
                            deviceDeleteHandler={() => handleDeleteDevice(device.id)}
                        />
                    </Grid>
                ))}
            </Grid>
            {deviceOpen.dialog && (
                <ActionModal
                    open={deviceOpen.dialog}
                    idDisp={deviceOpen.id}
                    tipoDisp={deviceOpen.tipo}
                    idDivision={divisionID}
                    startTime={deviceOpen.startTime ? deviceOpen.startTime : null}
                    endTime={deviceOpen.endTime ? deviceOpen.endTime : null}
                    tempAtual={deviceOpen.tempAtual ? deviceOpen.tempAtual : null}
                    tempMax={deviceOpen.tempMax ? deviceOpen.tempMax : null}
                    tempMin={deviceOpen.tempMin ? deviceOpen.tempMin : null}
                    luminosidade={deviceOpen.luminosidade ? deviceOpen.luminosidade : null}
                    closeAction={() => handleDeviceDialog(deviceOpen.id)}
                />
            )}
        </>
    );
}

export default DivisionDevices;
